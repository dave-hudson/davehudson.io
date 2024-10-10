import {assertIsVElement, h, updateElement, VElement, VNode} from '../../lib/dvdi';
import {ExperimentPage} from '../ExperimentPage';
import {pageHeader, pageFooter} from '../../lib/page';
import {MultiQuestionQuiz, Question, Option} from './MultiQuestionQuiz';

const numQuestions = 10;
const quiz = new MultiQuestionQuiz;
let quizVElement: (VElement | null) = null;
let _quizLoaded = false;
let _currentQuestions: Question[] = [];
let _previousQuestions: number[] = [];
let _allAnswered: boolean = false;
let _resultsVisible: boolean = false;
let _totalCorrect: number = 0;
let _results = new Array(numQuestions).fill(false);
let _checkedAnswers: boolean[][];
let _noMoreQuestions = false;

function update() {
    if (quizVElement === null) {
        return;
    }

    assertIsVElement(quizVElement);
    if (quizVElement.parentVNode === null) {
        return;
    }

    const parentElem = (quizVElement.parentVNode as VElement).domElement;
    if (parentElem === null) {
        return;
    }

    if (quizVElement.domElement === null) {
        return;
    }

    const index = Array.from(parentElem.childNodes).indexOf(quizVElement.domElement);
    const newVElement = experimentQuizComponent(
        _quizLoaded, _currentQuestions, _allAnswered, _resultsVisible,
        _results, _totalCorrect, _checkedAnswers, _noMoreQuestions
    );
    newVElement.parentVNode = quizVElement.parentVNode;
    updateElement(
        parentElem, parentElem.childNodes[index], quizVElement.parentVNode as VElement,
        quizVElement, newVElement
    );
    quizVElement = newVElement;
}

function newQuiz() {
    try {
        _currentQuestions = quiz.getQuestions(numQuestions, _previousQuestions);
    } catch (error) {
        _noMoreQuestions = true;
    }

    _currentQuestions.forEach((question: Question) => {
        _previousQuestions.push(question.questionId);
    });

    _allAnswered = false;
    _resultsVisible = false;
    _totalCorrect = 0;
    _results = new Array(numQuestions).fill(false);
    _checkedAnswers = Array.from({length: numQuestions}, () => Array(8).fill(false));

    update();
}

async function loadFile(filePath: string) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const quiz_file = await response.text();
        quiz.loadQuestions(quiz_file);
        _quizLoaded = true;
        newQuiz();
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function checkSubmit() {
    _resultsVisible = true;

    // Loop through each question
    _totalCorrect = 0;
    let index = 0;
    _currentQuestions.forEach(question => {
        let answerRow = _checkedAnswers[index];
        let selected = []
        for (let col = 0; col < question.options.length; col++) {
            if (answerRow[col]) {
                selected.push(question.options[col].optionId)
            }
        }

        const isCorrect = quiz.evaluateAnswers(question.questionId, selected);
        if (isCorrect) {
            _totalCorrect++;
        }

        _results[index++] = isCorrect;
    });

    update();
}

function answerChanged(event: Event, index: number, question: Question, answer: Option) {
    event.preventDefault();

    const checked = (event.target as HTMLInputElement).checked
    const row = _checkedAnswers[index];

    if (question.questionType === 'single') {
        for (let i = 0; i < question.options.length; i++) {
            row[i] = (question.options[i].optionId === answer.optionId);
        }
    } else {
        for (let i = 0; i < question.options.length; i++) {
            if (question.options[i].optionId === answer.optionId) {
                row[i] = checked;
            }
        }
    }

    // Now check if we have enough answers to enable to submit button.
    _allAnswered = true;
    _checkedAnswers.forEach(row => {
        const hasAnswer = Array.from(row).some(check => check === true);
        if (!hasAnswer) {
            _allAnswered = false;
        }
    });

    update()
}

function tryAgainButton() {
    newQuiz();
}

function experimentQuizComponent(
        quizLoaded: boolean, currentQuestions: Question[],
        allAnswered: boolean, resultsVisible: boolean,
        results: boolean[], totalCorrect: number,
        checkedAnswers: boolean[][], noMoreQuestions: boolean): VElement {
    let contents: VElement
    if (!quizLoaded) {
        contents = h('div', {});
    } else {
        let questionElements: VElement[] = []
        let rowIndex = 0;

        for (const question of currentQuestions) {
            let questionText = question.questionText;
            let questionClass = '';
            if (resultsVisible) {
                if (results[rowIndex]) {
                    questionText += ' \u2713';
                    questionClass = 'correct';
                } else {
                    questionText += ' \u2718';
                    questionClass = 'incorrect';
                }
            }

            const questionElem = h('p', {className: questionClass}, questionText);
            let answerElements: VElement[] = []
            let row = rowIndex;

            let colIndex = 0;
            for (const answer of question.options) {
                const answerElem = h('label', {},
                    h('input', {
                        'type': question.questionType === 'single' ? 'radio' : 'checkbox',
                        'name': 'question' + question.questionId,
                        'value': answer.optionId,
                        ...(checkedAnswers[row][colIndex] && {checked: true}),
                        ...(resultsVisible && {disabled: true}),
                        'onchange': (e: Event) => answerChanged(e, row, question, answer)
                    }),
                    answer.optionText
                );
                answerElements.push(answerElem);
                colIndex++;
            }

            const questionDiv = h('div', {className: 'question'},
                questionElem, ...answerElements
            );
            questionElements.push(questionDiv);
            rowIndex++;
        }

        contents = h('div', {},
            ...questionElements,
            h('button', {
                className: 'submit',
                ...(resultsVisible && {hidden: true}),
                ...(!allAnswered && {disabled: true}),
                onclick: (e: Event) => checkSubmit()
            }, 'Submit'),
            h('h3', {
                ...(!resultsVisible && {hidden: true}),
            }, `You scored ${totalCorrect} out of ${numQuestions}`),
            h('button', {
                ...((!resultsVisible || noMoreQuestions) && {hidden: true}),
                onclick: (e: Event) => tryAgainButton()
            }, 'Try Again!'),
            h('h3', {
                ...(!noMoreQuestions && {hidden: true})
            }, 'No more questions - please refresh the page to try again')
        );
    }

    contents.mountCallback = () => {
        quizVElement = contents;
        if (!quizLoaded) {
            loadFile('/experiments/quiz/questions.json');
        }
    }

    contents.unmountCallback = () => {
        quizVElement = null;
    }

    return contents;
}

function experimentQuizPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('article', {},
                h('h1', {}, 'Quiz'),
                experimentQuizComponent(
                    _quizLoaded, _currentQuestions, _allAnswered, _resultsVisible,
                    _results, _totalCorrect, _checkedAnswers, _noMoreQuestions
                )
            ),
        ),
        pageFooter()
    );
}

export const experimentQuiz = new ExperimentPage(
    '/experiments/quiz',
    experimentQuizPage
);
