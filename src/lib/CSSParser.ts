import { Lexer, Parser, Token, styles } from './Parser'

styles['AT_RULE'] = 'error';
styles['HEX'] = 'error';
styles['PROPERTY'] = 'error';
styles['PSEUDO'] = 'error';
styles['SELECTOR'] = 'error';
styles['SYMBOL'] = 'error';
styles['UNIT'] = 'error';
styles['VALUE'] = 'error';

/**
 * Lexer for CSS.
 */
export class CSSLexer extends Lexer {
    public getNextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const char = this.input[this.position];

        if (/\s/.test(char)) {
            this.position++;
            return { type: 'WHITESPACE_OR_NEWLINE', value: char };
        }

        if (char === '/' && this.input[this.position + 1] === '*') {
            return this.readComment();
        }

        if (char === '"' || char === "'") {
            return this.readString(char);
        }

        if (/[a-zA-Z\-]/.test(char)) {
            return this.readIdentifier();
        }

        if (char === '#') {
            return this.readHex();
        }

        if (char === '@') {
            return this.readAtRule();
        }

        if (char === ':' ||
                char === ';' ||
                char === '(' ||
                char === ')' ||
                char === ',' ||
                char === '=' ||
                char === '[' ||
                char === ']' ||
                char === '{' ||
                char === '}') {
            this.position++;
            return { type: 'OPERATOR', value: char };
        }

        if (/[0-9]/.test(char) || char === '.') {
            return this.readNumber();
        }

        this.position++;
        return { type: 'ERROR', value: char };
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
        this.position += 2; // Skip '/*'
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }
        this.position += 2; // Skip '*/'
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
        this.position++; // Skip '#'
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
