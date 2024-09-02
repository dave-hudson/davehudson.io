export interface Token {
    type: string;
    value: string;
}

export const styles: {[key: string]: string | null} = {
    COMMENT: 'comment',
    ELEMENT: 'element',
    ERROR: 'error',
    FUNCTION_OR_METHOD: 'function',
    IDENTIFIER: 'identifier',
    KEYWORD: 'keyword',
    NEWLINE: null,
    NUMBER: 'number',
    OPERATOR: 'operator',
    PREPROCESSOR: 'preprocessor',
    STRING: 'string',
    WHITESPACE: null
};

/**
 * Base class for lexers, providing common functionality.
 */
export abstract class Lexer {
    protected input: string;
    protected position: number;
    protected tokens: Token[];
    protected nextToken: number;
    protected lexingFunctions: (() => Token)[];

    /**
     * Constructs a Lexer.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
        this.nextToken = 0;

        this.lexingFunctions = new Array(128);
        for (let i = 0; i < 128; i++) {
            this.lexingFunctions[i] = this.getLexingFunction(String.fromCharCode(i));
        }

        this.lexTokens();
    }

    /**
     * Get the lexing function that matches a given start character
     * @param ch - The start character
     * @returns the lexing function
     */
    protected abstract getLexingFunction(ch: string): () => Token;

    /**
     * Lex the tokens in the input
     */
    /**
     * Lex all the tokens in the input
     */
    protected lexTokens(): void {
        while (this.position < this.input.length) {
            const ch = this.input[this.position];
            const chVal = ch.charCodeAt(0);
            let fn;

            if (chVal < 128) {
                fn = this.lexingFunctions[chVal];
            } else {
                fn = this.getLexingFunction(ch)
            }

            this.tokens.push(fn());
        }
    }

    /**
     * Gets the next token from the input.
     * @returns the next Token available or null if there are no tokens left.
     */
    public getNextToken(): Token | null {
        if (this.nextToken >= this.tokens.length) {
            return null;
        }

        return this.tokens[this.nextToken++];
    }

    /**
     * Get the next syntactic token (not whitespace or comment)
     */
    public peekNextSyntaxToken() : Token | null {
        const curPos = this.position;

        let token: Token | null;
        while ((token = this.getNextToken()) !== null) {
            if (token.type !== 'COMMENT' && token.type !== 'WHITESPACE' && token.type != 'NEWLINE') {
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
    protected readString(): Token {
        const quote: string = this.input[this.position];
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++;
            }

            this.position++;
        }

        this.position++;
        return {type: 'STRING', value: this.input.slice(start, this.position)};
    }

    /**
     * Reads a newline in the input.
     */
    protected readNewline(): Token {
        this.position++;
        return {type: 'NEWLINE', value: '\n'};
    }

    /**
     * Reads whitespace in the input.
     */
    protected readWhitespace(): Token {
        let start = this.position;
        this.position++;
        while (this.position < this.input.length && this.isWhitespace(this.input[this.position])) {
            this.position++;
        }

        return {type: 'WHITESPACE', value: this.input.slice(start, this.position)};
    }

    /**
     * Determines if a character is a letter.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected isLetter(ch: string): boolean {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    }

    /**
     * Determines if a character is an octal digit.
     * @param ch - The character to check.
     * @returns True if the character is an octal digit, false otherwise.
     */
    protected isOctalDigit(ch: string): boolean {
        return (ch >= '0' && ch <= '7');
    }

    /**
     * Determines if a character is a binary digit.
     * @param ch - The character to check.
     * @returns True if the character is a binary digit, false otherwise.
     */
    protected isBinaryDigit(ch: string): boolean {
        return (ch == '0' || ch == '1');
    }

    /**
     * Determines if a character is a digit.
     * @param ch - The character to check.
     * @returns True if the character is a digit, false otherwise.
     */
    protected isDigit(ch: string): boolean {
        return (ch >= '0' && ch <= '9');
    }

    /**
     * Determines if a character is a hexadecimal digit.
     * @params ch - The character to check.
     * @returns True if the character is a hexadecimal digit, false otherwise.
     */
    protected isHexDigit(ch: string): boolean {
        return this.isDigit(ch) || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F');
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
     * Determines if a character is a non-newline whitespace.
     * @param ch - the character to check.
     * @returns True if the character is a non-newline whitespace character, false otherwise.
     */
    protected isWhitespace(ch: string): boolean {
        // We know the characters beyond the normal ASCII range are very unlikely to be hit so
        // we exclude them with the value check in the middle.
        return ch === ' ' ||
            ch === '\t' ||
            ch === '\n' ||
            ch === '\r' ||
            ch === '\v' ||
            ch === '\f' ||
            (ch >= '\u00A0' &&
                (ch === '\u00A0' ||
                    ch === '\u1680' ||
                    (ch >= '\u2000' && ch <= '\u200A') ||
                    ch === '\u2028' ||
                    ch === '\u2029' ||
                    ch === '\u202F' ||
                    ch === '\u205F' ||
                    ch === '\u3000'));
    }
}
