// MultiQuestionQuiz.ts

/**
 * A class to manage multiple-choice questionnaires.
 */

type QuestionType = 'single' | 'multiple';

export interface Option {
    optionId: string;
    optionText: string;
    isCorrect: boolean;
}

export interface Question {
    questionId: number;
    questionText: string;
    questionType: QuestionType;
    options: Option[];
}

interface QuizData {
    quizTitle?: string;
    questions: Question[];
}

interface QuestionDetails {
    questionId: number;
    questionText: string;
    questionType: QuestionType;
    options: Option[];
}

export class CorruptedQuestionsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CorruptedQuestionsError';
    }
}

export class QuestionNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'QuestionNotFound';
    }
}

export class InsufficientQuestions extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InsufficientQuestions';
    }
}

export class MultiQuestionQuiz {
    private questions: Map<number, Question> = new Map();

    /**
     * Loads questions from a JSON string.
     * @param jsonString - The JSON string containing quiz data.
     */
    loadQuestions(jsonString: string): void {
        try {
            const data: QuizData = JSON.parse(jsonString);
            this.validateQuizData(data);
            data.questions.forEach((question) => {
                this.questions.set(question.questionId, question);
            });
        } catch (error) {
            console.error('Error loading questions:', error);
            throw new CorruptedQuestionsError('The questions data is corrupted.');
        }
    }

    /**
     * Returns a list of unique questions to be answered.
     * @param count - Number of questions to return.
     * @param excludeList - List of questionIds to exclude.
     * @param seed - Optional seed for randomization.
     * @returns An array of Questions.
     */
    getQuestions(count: number, excludeList: number[], seed?: number): Question[] {
        const availableQuestions = Array.from(this.questions.values()).filter(
            (q) => !excludeList.includes(q.questionId)
        );

        if (availableQuestions.length < count) {
            throw new InsufficientQuestions('Not enough questions available.');
        }

        const shuffledQuestions = this.shuffleArray(availableQuestions, seed);
        return shuffledQuestions.slice(0, count);
    }

    /**
     * Returns the details of a specific question.
     * @param questionId - The ID of the question.
     * @returns The details of the question.
     */
    getQuestionDetails(questionId: number): QuestionDetails {
        const question = this.questions.get(questionId);
        if (!question) {
            throw new QuestionNotFound(`Question with ID ${questionId} not found.`);
        }
        return {
            questionId: question.questionId,
            questionText: question.questionText,
            questionType: question.questionType,
            options: question.options,
        };
    }

    /**
     * Evaluates if the provided answers are correct for the question.
     * @param questionId - The ID of the question.
     * @param selectedOptionIds - The list of selected option IDs.
     * @returns True if the answers are correct, false otherwise.
     */
    evaluateAnswers(questionId: number, selectedOptionIds: string[]): boolean {
        const question = this.questions.get(questionId);
        if (!question) {
            throw new QuestionNotFound(`Question with ID ${questionId} not found.`);
        }
        const correctOptionIds = question.options
            .filter((opt) => opt.isCorrect)
            .map((opt) => opt.optionId)
            .sort();

        const selectedIdsSorted = [...selectedOptionIds].sort();

        return (
            correctOptionIds.length === selectedIdsSorted.length &&
            correctOptionIds.every((id, index) => id === selectedIdsSorted[index])
        );
    }

    /**
     * Validates the quiz data structure.
     * @param data - The quiz data to validate.
     */
    private validateQuizData(data: QuizData): void {
        const questionIds = new Set<number>();
        data.questions.forEach((question) => {
            if (
                typeof question.questionId !== 'number' ||
                typeof question.questionText !== 'string' ||
                !['single', 'multiple'].includes(question.questionType) ||
                !Array.isArray(question.options)
            ) {
                throw new Error(`Invalid structure in question ID ${question.questionId}`);
            }

            if (questionIds.has(question.questionId)) {
                throw new Error(`Duplicate questionId: ${question.questionId}`);
            }
            questionIds.add(question.questionId);

            const optionIds = new Set<string>();
            let correctOptionCount = 0;

            question.options.forEach((option) => {
                if (
                    typeof option.optionId !== 'string' ||
                    typeof option.optionText !== 'string' ||
                    typeof option.isCorrect !== 'boolean'
                ) {
                    throw new Error(`Invalid option structure in question ID ${question.questionId}`);
                }

                if (optionIds.has(option.optionId)) {
                    throw new Error(
                        `Duplicate optionId ${option.optionId} in question ID ${question.questionId}`
                    );
                }
                optionIds.add(option.optionId);

                if (option.isCorrect) {
                    correctOptionCount++;
                }
            });

            if (correctOptionCount === 0) {
                throw new Error(`No correct answers in question ID ${question.questionId}`);
            }

            if (question.questionType === 'single' && correctOptionCount !== 1) {
                throw new Error(`Question ID ${question.questionId} should have exactly one correct answer.`);
            }
        });
    }

    /**
     * Shuffles an array using a seed.
     * @param array - The array to shuffle.
     * @param seed - Optional seed for randomization.
     * @returns Shuffled array.
     */
    private shuffleArray<T>(array: T[], seed?: number): T[] {
        const result = [...array];
        let randomFunc: () => number;

        if (seed !== undefined) {
            let seedValue = seed;
            randomFunc = () => {
                const x = Math.sin(seedValue++) * 10000;
                return x - Math.floor(x);
            };
        } else {
            randomFunc = Math.random;
        }

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(randomFunc() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}

