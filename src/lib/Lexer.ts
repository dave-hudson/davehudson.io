export interface Token {
    type: string;
    value: string;
}

export const styles: { [key: string]: string | null } = {
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    NUMBER: 'number',
    STRING: 'string',
    COMMENT: 'comment',
    OPERATOR_OR_PUNCTUATION: 'operator',
    PREPROCESSOR: 'preprocessor',
    WHITESPACE: null,
    NEWLINE: null,
};

/**
 * Base class for lexers, providing common functionality.
 */
export class Lexer {
    protected input: string;
    protected position: number;

    /**
     * Constructs a lexer.
     * @param input - The input code to lex.
     */
    constructor(input: string) {
        this.input = input;
        this.position = 0;
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public nextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
            return this.readWhitespace();
        }

        if (this.isLetter(ch)) {
            return this.readIdentifierOrKeyword();
        }

        if (this.isDigit(ch)) {
            return this.readNumber();
        }

        if (ch === '"' || ch === "'") {
            return this.readString(ch);
        }

        if (ch === '/' && this.input[this.position + 1] === '/') {
            return this.readComment();
        }

        if (ch === '/' && this.input[this.position + 1] === '*') {
            return this.readBlockComment();
        }

        if (ch === '#' || (ch === '/' && this.input[this.position + 1] === '/')) {
            return this.readComment();
        }

        return this.readOperatorOrPunctuation();
    }

    /**
     * Reads whitespace in the input.
     * @returns The whitespace token.
     */
    protected readWhitespace(): Token {
        const start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position]) && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'WHITESPACE', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an identifier or keyword token.
     * @returns The identifier or keyword token.
     */
    protected readIdentifierOrKeyword(): Token {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        return { type, value };
    }

    /**
     * Reads a number token.
     * @returns The number token.
     */
    protected readNumber(): Token {
        const start = this.position;
        while (this.isDigit(this.input[this.position])) {
            this.position++;
        }

        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     * @returns The string token.
     */
    protected readString(quote: string): Token {
        const start = this.position;
        this.position++; // Skip initial quote
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++; // Skip escape character
            }

            this.position++;
        }

        this.position++; // Skip closing quote
        return { type: 'STRING', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a comment token.
     * @returns The comment token.
     */
    protected readComment(): Token {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a block comment token.
     * @returns The block comment token.
     */
    protected readBlockComment(): Token {
        const start = this.position;
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }

        this.position += 2; // Skip closing */
        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an operator or punctuation token.
     * @returns The operator or punctuation token.
     */
    protected readOperatorOrPunctuation(): Token {
        const ch = this.input[this.position++];
        return { type: 'OPERATOR_OR_PUNCTUATION', value: ch };
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

    /**
     * Determines if a value is a keyword.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
        return false; // To be overridden by subclasses
    }
}
