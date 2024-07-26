import { Lexer, Parser, Token, styles } from './Parser'

styles['AT_RULE'] = 'css-at-rule';
styles['DIMENSION'] = 'number';
styles['HASH'] = 'identifier';
styles['HEX'] = 'number';

/**
 * Lexer for CSS.
 */
export class CSSLexer extends Lexer {
    /**
     * Get the lexing function that matches a given start character
     * @param ch - The start character
     * @returns the lexing function
     */
    protected getLexingFunction(ch: string): () => Token {
        if (ch === '\n') {
            return this.readNewline.bind(this);
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace.bind(this);
        }

        if (this.isLetter(ch)) {
            return this.readIdentifier.bind(this);
        }

        if (this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        if (ch === '"' || ch === "'") {
            return this.readString.bind(this);
        }

        if (ch === '/') {
            return this.readForwardSlash.bind(this);
        }

        if (ch === '#') {
            return this.readHexOrId.bind(this);
        }

        if (ch === '.') {
            return this.readDot.bind(this);
        }

        if (ch === '-') {
            return this.readMinus.bind(this);
        }

        if (ch === '@') {
            return this.readAtRule.bind(this);
        }

        return this.readOperator.bind(this);
    }

    private readDot(): Token {
        if (this.isDigit(this.input[this.position + 1])) {
            return this.readNumber();
        }

        return this.readIdentifier();
    }

    private readForwardSlash(): Token {
        if (this.input[this.position + 1] === '*') {
            return this.readComment();
        }

        return this.readOperator();
    }

    private readMinus(): Token {
        if (this.isDigit(this.input[this.position + 1])) {
            return this.readNumber();
        }

        if (this.isLetter(this.input[this.position + 1]) || this.input[this.position + 1] === '-') {
            return this.readIdentifier();
        }

        return this.readOperator();
    }

    private readIdentifier(): Token {
        const start = this.position;
        while (this.position < this.input.length && /[a-zA-Z0-9.#\[\]=\-]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'IDENTIFIER', value: this.input.slice(start, this.position) };
    }

    private readComment(): Token {
        const start = this.position;
        this.position += 2;
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }

        this.position += 2;
        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    private readAtRule(): Token {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && /[a-zA-Z\-]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'AT_RULE', value: this.input.slice(start, this.position) };
    }

    private readNumber(): Token {
        const start = this.position;
        if (this.input[this.position] === '-') {
            this.position++;
        }

        while (this.position < this.input.length && /[0-9\.]/.test(this.input[this.position])) {
            this.position++;
        }

        if (/[a-zA-Z%]/.test(this.input[this.position])) {
            return this.readDimension(start);
        }

        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
    }

    private readDimension(start: number): Token {
        while (this.position < this.input.length && /[a-zA-Z%]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'DIMENSION', value: this.input.slice(start, this.position) };
    }

    private readHexOrId(): Token {
        const start = this.position;
        this.position++;

        // Peek ahead to determine if this is a hex value or an ID
        const isHex = this.isHexDigit(this.input[this.position]);

        while (this.position < this.input.length && this.isHexDigit(this.input[this.position])) {
            this.position++;
        }

        if (isHex && (this.position - start === 4 || this.position - start === 7)) {
            return { type: 'HEX', value: this.input.slice(start, this.position) };
        }

        // If not a valid hex, treat as ID selector
        while (this.position < this.input.length && /[a-zA-Z0-9._-]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'HASH', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): Token {
        const operators = [
            '~=',
            '$=',
            '^=',
            '|=',
            '*=',
            '-',
            '+',
            '*',
            '|',
            '=',
            '>',
            '(',
            ')',
            '{',
            '}',
            '[',
            ']',
            ';',
            ':',
            ','
        ];

        for (let i = 0; i < operators.length; i++) {
            if (this.input.startsWith(operators[i], this.position)) {
                this.position += operators[i].length;
                return { type: 'OPERATOR', value: operators[i]};
            }
        }

        const ch = this.input[this.position++];
        return { type: 'ERROR', value: ch };
    }
}

/**
 * CSS parser.
 */
export class CSSParser extends Parser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new CSSLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        let token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        if (token.type !== 'IDENTIFIER') {
            return token;
        }

        // Look at the next token.  If it's a '(' operator then we're making a function or method call!
        const nextToken: Token | null = this.lexer.peekNextSyntaxToken();
        if (nextToken?.type === 'OPERATOR') {
            if (nextToken.value === '(') {
                return { type: 'FUNCTION_OR_METHOD', value: token.value };
            }
        }

        return token;
    }
}
