import {assertIsVElement, h, updateElement, VElement, VNode} from '../../lib/dvdi';
import {ExperimentPage} from '../ExperimentPage';
import {pageHeader, pageFooter} from '../../lib/page';
import {MultiQuestionQuiz, Question} from './MultiQuestionQuiz';

const quiz = new MultiQuestionQuiz;
let quizVElement: (VElement | null) = null;
let quizLoaded = false;
let currentQuestions: Question[] = [];

async function loadFile(filePath: string) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const quiz_file = await response.text();
        quiz.loadQuestions(quiz_file);
        quizLoaded = true;
        console.log(quiz);
    } catch (error) {
        console.error('Error loading file:', error);
        return;
    }

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

function checkSubmit(event: SubmitEvent) {
    event.preventDefault();

    // Loop through each question
    let totalCorrect = 0;
    currentQuestions.forEach(question => {
        const inputs = document.querySelectorAll(`input[name^="question${question.questionId}"]:checked`);
        const selected = Array.from(inputs).map(input => (input as HTMLInputElement).value);
        console.log(`selected: ${selected}`)
        const isCorrect = quiz.evaluateAnswers(question.questionId, selected);
        if (isCorrect) {
            totalCorrect++;
        }
    });

    console.log(`total correct: ${totalCorrect}`);
}

function toggleSubmitButton() {
    console.log("check submit")
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
    let allAnswered = true;
  
    // Loop through each question
    currentQuestions.forEach(question => {
        const inputs = document.querySelectorAll(`input[name^="question${question.questionId}"]`);
        const hasAnswer = Array.from(inputs).some(input => (input as HTMLInputElement).checked);
  
        if (!hasAnswer) {
            allAnswered = false;
        }
    });
  
    // Enable the submit button if all questions are answered
    submitButton.disabled = !allAnswered;
}

function experimentQuizComponent(): VElement {
    let contents: VElement
    if (!quizLoaded) {
        contents = h('div', {});
    } else {
        let askedQuestions: number[] = [];
        currentQuestions = quiz.getQuestions(3, askedQuestions);
        let questionElements: VElement[] = []
        for (const question of currentQuestions) {
            const questioName = 'question' + question.questionId;
            const questionElem = h('p', {}, question.questionText);
            let answerElements: VElement[] = []
            for (const answer of question.options) {
                const answerElem = h('label', {},
                    h('input', {
                        'type': question.questionType === 'single' ? 'radio' : 'checkbox',
                        'name': questioName,
                        'value': answer.optionId
                    }),
                    answer.optionText
                );
                answerElements.push(answerElem);
            }

            const questionDiv = h('div', {}, questionElem, ...answerElements, h('br', {}));
            questionElements.push(questionDiv);
        }

        contents = h('form', {
                onchange: (e: Event) => toggleSubmitButton(),
                onsubmit: (e: SubmitEvent) => checkSubmit(e)
            },
            ...questionElements,
            h('button', {type: 'submit', id: 'submitButton', disabled: true}, 'Submit')
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
