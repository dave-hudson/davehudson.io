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
    WHITESPACE_OR_NEWLINE: null,
};

/**
 * Base class for lexers, providing common functionality.
 */
export class Lexer {
    protected input: string;
    protected position: number;
    protected tokenStream: Token[];
    protected tokenIndex;

    /**
     * Constructs a lexer.
     * @param input - The input code to lex.
     */
    constructor(input: string) {
        this.input = input;
        this.position = 0;
        this.tokenStream = [];
        this.tokenIndex = 0;
    }

    /**
     * Generate a list of tokens from the input.
     */
    public generateTokens(): void {
        while (this.nextToken());
    }

    /**
     * Get the next token in the token stream.
     */
    public getToken(): Token | null {
        if (this.tokenIndex >= this.tokenStream.length) {
            return null;
        }

        return this.tokenStream[this.tokenIndex++];
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public nextToken(): boolean {
        if (this.position >= this.input.length) {
            return false;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: '\n' });
            return true;
        }

        if (/\s/.test(ch)) {
            this.readWhitespace();
            return true;
        }

        if (this.isLetter(ch)) {
            this.readIdentifierOrKeyword();
            return true;
        }

        if (this.isDigit(ch)) {
            this.readNumber();
            return true;
        }

        if (ch === '"' || ch === "'") {
            this.readString(ch);
            return true;
        }

        if (ch === '/' && this.input[this.position + 1] === '/') {
            this.readComment();
            return true;
        }

        if (ch === '/' && this.input[this.position + 1] === '*') {
            this.readBlockComment();
            return true;
        }

        if (ch === '#' || (ch === '/' && this.input[this.position + 1] === '/')) {
            this.readComment();
            return true;
        }

        this.readOperatorOrPunctuation();
        return true;
    }

    /**
     * Reads whitespace in the input.
     * @returns The whitespace token.
     */
    protected readWhitespace(): void {
        const start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position]) && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an identifier or keyword token.
     * @returns The identifier or keyword token.
     */
    protected readIdentifierOrKeyword(): void {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        this.tokenStream.push({ type, value });
    }

    /**
     * Reads a number token.
     * @returns The number token.
     */
    protected readNumber(): void {
        const start = this.position;
        while (this.isDigit(this.input[this.position])) {
            this.position++;
        }

        this.tokenStream.push({ type: 'NUMBER', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     * @returns The string token.
     */
    protected readString(quote: string): void {
        const start = this.position;
        this.position++; // Skip initial quote
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++; // Skip escape character
            }

            this.position++;
        }

        this.position++; // Skip closing quote
        this.tokenStream.push({ type: 'STRING', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a comment token.
     * @returns The comment token.
     */
    protected readComment(): void {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a block comment token.
     * @returns The block comment token.
     */
    protected readBlockComment(): void {
        const start = this.position;
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }

        this.position += 2; // Skip closing */
        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an operator or punctuation token.
     * @returns The operator or punctuation token.
     */
    protected readOperatorOrPunctuation(): void {
        const ch = this.input[this.position++];
        this.tokenStream.push({ type: 'OPERATOR_OR_PUNCTUATION', value: ch });
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
