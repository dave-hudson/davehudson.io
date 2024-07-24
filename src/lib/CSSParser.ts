import { Lexer, Parser, Token, styles } from './Parser'

styles['AT_RULE'] = 'css-at-rule';
styles['HEX'] = 'number';
styles['PROPERTY'] = 'error';
styles['PSEUDO'] = 'css-pseudo';
styles['SELECTOR'] = 'css-selector';
styles['UNIT'] = 'number';
styles['VALUE'] = 'number';

/**
 * Lexer for CSS.
 */
export class CSSLexer extends Lexer {
    public getNextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'WHITESPACE_OR_NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
            return this.readWhitespace();
        }

        if (ch === '/' && this.input[this.position + 1] === '*') {
            return this.readComment();
        }

        if (ch === '"' || ch === "'") {
            return this.readString(ch);
        }

        if (/[a-zA-Z\-]/.test(ch)) {
            return this.readIdentifier();
        }

        if (ch === '#') {
            return this.readHex();
        }

        if (ch === '@') {
            return this.readAtRule();
        }

        if (ch === ':' ||
                ch === ';' ||
                ch === '(' ||
                ch === ')' ||
                ch === ',' ||
                ch === '=' ||
                ch === '[' ||
                ch === ']' ||
                ch === '{' ||
                ch === '}') {
            this.position++;
            return { type: 'OPERATOR', value: ch };
        }

        if (/[0-9]/.test(ch) || ch === '.') {
            return this.readNumber();
        }

        this.position++;
        return { type: 'ERROR', value: ch };
    }

    private readIdentifier(): Token {
        const start = this.position;
        while (this.position < this.input.length && /[a-zA-Z0-9\-\_]/.test(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);

        if (this.input[this.position] === '{' || this.input[this.position] === ',') {
            return { type: 'SELECTOR', value };
        }

        if (value.startsWith(':')) {
            return { type: 'PSEUDO', value };
        }

        return { type: 'PROPERTY', value };
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
        while (this.position < this.input.length && /[0-9\.]/.test(this.input[this.position])) {
            this.position++;
        }

        if (/[a-zA-Z%]/.test(this.input[this.position])) {
            return this.readUnit(start);
        }

        return { type: 'VALUE', value: this.input.slice(start, this.position) };
    }

    private readUnit(start: number): Token {
        while (this.position < this.input.length && /[a-zA-Z%]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'UNIT', value: this.input.slice(start, this.position) };
    }

    private readHex(): Token {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && /[0-9a-fA-F]/.test(this.input[this.position])) {
            this.position++;
        }

        return { type: 'HEX', value: this.input.slice(start, this.position) };
    }
}


/**
 * CSS parser.
 */
export class CSSParser extends Parser {
    protected inElement: boolean = false;

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
        return token;
    }
}
