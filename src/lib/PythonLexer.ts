import { Lexer } from './Lexer'

/**
 * Lexer for Python code.
 */
export class PythonLexer extends Lexer {
    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): boolean {
        if (this.position >= this.input.length) {
            return false;
        }

        const ch: string = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            this.tokenStream.push({ type: 'NEWLINE', value: '\n' });
            return true;
        }

        if (/\s/.test(ch)) {
            this.readWhitespace();
            return true;
        }

        if (this.isLetter(ch) || ch === '_') {
            this.readIdentifierOrKeyword();
            return true;
        }

        if (this.isDigit(ch) || (ch === '.' && this.isDigit(this.input[this.position + 1]))) {
            this.readNumber();
            return true;
        }

        if (ch === '"' || ch === "'") {
            if (((this.position + 2) < this.input.length) &&
                    this.input[this.position + 1] === ch &&
                    this.input[this.position + 2] === ch) {
                this.readDocString(ch);
                return true;
            }

            this.readString(ch);
            return true;
        }

        if (ch === '#') {
            this.readComment();
            return true;
        }

        this.readOperatorOrPunctuation();
        return true;
    }

    /**
     * Reads a number in the input.
     * @returns The number token.
     */
    protected override readNumber(): void {
        let start = this.position;

        if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            // Hexadecimal literal
            this.position += 2; // Skip "0x"
            while (this.position < this.input.length && /[0-9a-fA-F]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            // Binary literal
            this.position += 2; // Skip "0b"
            while (this.position < this.input.length && /[01]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'o' || this.input[this.position + 1] === 'O')) {
            // Octal literal
            this.position += 2; // Skip "0o"
            while (this.position < this.input.length && /[0-7]/.test(this.input[this.position])) {
                this.position++;
            }
        } else {
            // Decimal or floating-point literal
            while (this.position < this.input.length && /[0-9]/.test(this.input[this.position])) {
                this.position++;
            }

            if (this.position < this.input.length && this.input[this.position] === '.') {
                this.position++;
                while (this.position < this.input.length && /[0-9]/.test(this.input[this.position])) {
                    this.position++;
                }
            }

            if (this.position < this.input.length && (this.input[this.position] === 'e' || this.input[this.position] === 'E')) {
                this.position++;
                if (this.input[this.position] === '+' || this.input[this.position] === '-') {
                    this.position++;
                }

                while (this.position < this.input.length && /[0-9]/.test(this.input[this.position])) {
                    this.position++;
                }
            }
        }

        // Check for complex number 'j' suffix
        if (this.position < this.input.length && this.input[this.position] === 'j') {
            this.position++;
        }

        this.tokenStream.push({ type: 'NUMBER', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads whitespace in the input.
     * @returns The whitespace token.
     */
    protected override readWhitespace(): void {
        let start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an identifier or keyword in the input.
     * @returns The identifier or keyword token.
     */
    protected override readIdentifierOrKeyword(): void {
        let start = this.position;
        while (this.position < this.input.length && (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_')) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        this.tokenStream.push({ type, value });
    }

    /**
     * Reads a comment in the input.
     * @returns The comment token.
     */
    protected override readComment(): void {
        let start = this.position;
        this.position++; // Skip "#"
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a doc string token.
     * @returns The doc string token.
     */
    protected readDocString(ch: string): void {
        const start = this.position;
        this.position += 3; // Skip the opening of the doc string
        while ((this.position + 2) < this.input.length &&
                !(this.input[this.position] === ch &&
                    this.input[this.position + 1] === ch &&
                    this.input[this.position + 2] === ch)) {
            this.position++;
        }

        this.position += 3; // Skip closing of the doc string
        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Determines if a value is a keyword in Python.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'and',
            'as',
            'assert',
            'async',
            'await',
            'break',
            'class',
            'continue',
            'def',
            'del',
            'elif',
            'else',
            'except',
            'False',
            'finally',
            'for',
            'from',
            'global',
            'if',
            'import',
            'in',
            'is',
            'lambda',
            'None',
            'nonlocal',
            'not',
            'or',
            'pass',
            'raise',
            'return',
            'True',
            'try',
            'while',
            'with',
            'yield'
        ];
        return keywords.includes(value);
    }

    /**
     * Determines if a character is a letter in Python.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected override isLetter(ch: string): boolean {
        return /[a-zA-Z_]/.test(ch);
    }
}
