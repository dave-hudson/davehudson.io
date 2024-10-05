import {assertIsVElement, h, updateElement, VElement, VNode} from '../../lib/dvdi';
import {ExperimentPage} from '../ExperimentPage';
import {pageHeader, pageFooter} from '../../lib/page';
import {MultiQuestionQuiz, Question, Option} from './MultiQuestionQuiz';

const numQuestions = 3;
const quiz = new MultiQuestionQuiz;
let quizVElement: (VElement | null) = null;
let quizLoaded = false;
let currentQuestions: Question[] = [];
let previousQuestions: number[] = [];
let allAnswered: boolean = false;
let resultsVisible: boolean = false;
let totalCorrect: number = 0;
let results = new Array(numQuestions).fill(false);
let checkedAnswers: boolean[][];
let noMoreQuestions = false;

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
    const newVElement = experimentQuizComponent();
    newVElement.parentVNode = quizVElement.parentVNode;
    updateElement(parentElem,
        parentElem.childNodes[index],
        quizVElement.parentVNode as VElement,
        quizVElement,
        newVElement
    );
    quizVElement = newVElement;
}

function newQuiz() {
    try {
        currentQuestions = quiz.getQuestions(numQuestions, previousQuestions);
    } catch (error) {
        noMoreQuestions = true;
    }

    currentQuestions.forEach((question: Question) => {
        previousQuestions.push(question.questionId);
    });

    allAnswered = false;
    resultsVisible = false;
    totalCorrect = 0;
    results = new Array(numQuestions).fill(false);
    checkedAnswers = Array.from({length: numQuestions}, () => Array(8).fill(false));

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
        quizLoaded = true;
        newQuiz();
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function checkSubmit() {
    resultsVisible = true;

    // Loop through each question
    totalCorrect = 0;
    let index = 0;
    currentQuestions.forEach(question => {
        let answerRow = checkedAnswers[index];
        let selected = []
        for (let col = 0; col < question.options.length; col++) {
            if (answerRow[col]) {
                selected.push(question.options[col].optionId)
            }
        }

        const isCorrect = quiz.evaluateAnswers(question.questionId, selected);
        if (isCorrect) {
            totalCorrect++;
        }

        results[index++] = isCorrect;
    });

    update();
}

function answerChanged(event: Event, index: number, question: Question, answer: Option) {
    event.preventDefault();

    const checked = (event.target as HTMLInputElement).checked
    const row = checkedAnswers[index];

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
    allAnswered = true;
    checkedAnswers.forEach(row => {
        const hasAnswer = Array.from(row).some(check => check === true);
        if (!hasAnswer) {
            allAnswered = false;
        }
    });

    update()
}

function tryAgainButton() {
    newQuiz();
}

function experimentQuizComponent(): VElement {
    let contents: VElement
    if (!quizLoaded) {
        contents = h('div', {});
    } else {
        let questionElements: VElement[] = []
        let rowIndex = 0;

        for (const question of currentQuestions) {
            const questionElem = h('p', {}, question.questionText);
            const correctResultElem = h('span', {
                className: 'result correct',
                ...((!resultsVisible || !results[rowIndex]) && {hidden: true}),
            }, '\u2714')
            const incorrectResultElem = h('span', {
                className: 'result incorrect',
                ...((!resultsVisible || results[rowIndex]) && {hidden: true}),
            }, '\u274c')
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
                questionElem, correctResultElem, incorrectResultElem, ...answerElements
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
        loadFile('/experiments/quiz/questions.json');
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
                experimentQuizComponent()
            ),
        ),
        pageFooter()
    );
}

export const experimentQuiz = new ExperimentPage(
    '/experiments/quiz',
    experimentQuizPage
);
