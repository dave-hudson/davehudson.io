import {Lexer, styles} from './Lexer'

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
    protected getLexingFunction(ch: string): () => void {
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

    private readDot(): void {
        if (this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        this.readIdentifier();
    }

    private readForwardSlash(): void {
        if (this.input[this.position + 1] === '*') {
            this.readComment();
            return
        }

        this.readOperator();
    }

    private readMinus(): void {
        if (this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        if (this.isLetter(this.input[this.position + 1]) || this.input[this.position + 1] === '-') {
            this.readIdentifier();
            return;
        }

        this.readOperator();
    }

    private readIdentifier(): void {
        const start = this.position;
        while (this.position < this.input.length && /[a-zA-Z0-9.#\[\]=\-]/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokens.push({type: 'IDENTIFIER', value: this.input.slice(start, this.position)});
    }

    private readComment(): void {
        const start = this.position;
        this.position += 2;
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }

        this.position += 2;
        this.tokens.push({type: 'COMMENT', value: this.input.slice(start, this.position)});
    }

    private readAtRule(): void {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && /[a-zA-Z\-]/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokens.push({type: 'AT_RULE', value: this.input.slice(start, this.position)});
    }

    private readNumber(): void {
        const start = this.position;
        if (this.input[this.position] === '-') {
            this.position++;
        }

        while (this.position < this.input.length && /[0-9\.]/.test(this.input[this.position])) {
            this.position++;
        }

        if (/[a-zA-Z%]/.test(this.input[this.position])) {
            this.readDimension(start);
            return;
        }

        this.tokens.push({type: 'NUMBER', value: this.input.slice(start, this.position)});
    }

    private readDimension(start: number): void {
        while (this.position < this.input.length && /[a-zA-Z%]/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokens.push({type: 'DIMENSION', value: this.input.slice(start, this.position)});
    }

    private readHexOrId(): void {
        const start = this.position;
        this.position++;

        // Peek ahead to determine if this is a hex value or an ID
        const isHex = this.isHexDigit(this.input[this.position]);

        while (this.position < this.input.length && this.isHexDigit(this.input[this.position])) {
            this.position++;
        }

        if (isHex && (this.position - start === 4 || this.position - start === 7)) {
            this.tokens.push({type: 'HEX', value: this.input.slice(start, this.position)});
            return;
        }

        // If not a valid hex, treat as ID selector
        while (this.position < this.input.length && /[a-zA-Z0-9._-]/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokens.push({type: 'HASH', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): void {
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
                this.tokens.push({type: 'OPERATOR', value: operators[i]});
                return;
            }
        }

        const ch = this.input[this.position++];
        this.tokens.push({type: 'ERROR', value: ch});
    }
}
