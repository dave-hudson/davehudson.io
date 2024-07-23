export interface Token {
    type: string;
    value: string;
}

export const styles: { [key: string]: string | null } = {
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    ELEMENT: 'element',
    FUNCTION_OR_METHOD: 'function',
    NUMBER: 'number',
    STRING: 'string',
    COMMENT: 'comment',
    OPERATOR: 'operator',
    PREPROCESSOR: 'preprocessor',
    WHITESPACE_OR_NEWLINE: null,
    ERROR: 'error'
};

/**
 * Base class for lexers, providing common functionality.
 */
export abstract class Lexer {
    protected input: string;
    protected position: number;

    /**
     * Constructs a Lexer.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        this.input = input;
        this.position = 0;
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    abstract getNextToken(): Token | null;

    /**
     * Get the next syntactic token (not whitespace or comment)
     */
    public peekNextSyntaxToken() : Token | null {
        const curPos = this.position;

        let token: Token | null;
        while ((token = this.getNextToken()) !== null) {
            if (token.type !== 'COMMENT' && token.type !== 'WHITESPACE_OR_NEWLINE') {
                this.position = curPos;
                return token;
            }
        }

        this.position = curPos;
        return null;
    }

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     */
    protected readString(quote: string): Token {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++;
            }

            this.position++;
        }

        this.position++;
        return { type: 'STRING', value: this.input.slice(start, this.position) };
    }

    /**
     * Determines if a character is a letter.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected isLetter(ch: string): boolean {
        return /[a-zA-Z_$]/.test(ch);
    }

    /**
     * Determines if a character is a digit.
     * @param ch - The character to check.
     * @returns True if the character is a digit, false otherwise.
     */
    protected isDigit(ch: string): boolean {
        return /\d/.test(ch);
    }

    /**
     * Determines if a character is a letter or digit.
     * @param ch - The character to check.
     * @returns True if the character is a letter or digit, false otherwise.
     */
    protected isLetterOrDigit(ch: string): boolean {
        return this.isLetter(ch) || this.isDigit(ch);
    }
}

/**
 * Base class for parsers, providing common functionality.
 */
export abstract class Parser {
    protected lexer: Lexer | null;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor() {
        this.lexer = null;
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    abstract getNextToken(): Token | null;
}
