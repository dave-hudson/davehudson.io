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
    protected tokenStream: Token[];
    protected tokenIndex : number;

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
     * Fetch a token pushed earlier into the token stream
     */
    protected getPrevToken(offset: number): Token | null {
        if (offset >= this.tokenStream.length) {
            return null;
        }

        return this.tokenStream[this.tokenStream.length - offset - 1];
    }

    /**
     * Fetch a token pushed earlier into the token stream
     */
    protected getPrevNonWhitespaceToken(offset: number): Token | null {
        let whitespaceCount = 0;
        for (let i = 0; i < offset; i++) {
            if (i + whitespaceCount >= this.tokenStream.length) {
                return null;
            }

            const token: Token = this.tokenStream[this.tokenStream.length - whitespaceCount - i - 1];
            if (token.type === 'WHITESPACE_OR_NEWLINE') {
                whitespaceCount++;
            }
        }

        return this.tokenStream[this.tokenStream.length - offset - 1];
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    abstract nextToken(): boolean;

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     * @returns The string token.
     */
    protected readString(quote: string): void {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++;
            }

            this.position++;
        }

        this.position++;
        this.tokenStream.push({ type: 'STRING', value: this.input.slice(start, this.position) });
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
