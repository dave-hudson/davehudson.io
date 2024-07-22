import { Lexer, Token, styles } from './Lexer'

styles['REGEXP'] = 'regexp';

/**
 * Lexer for JavaScript code.
 */
export class JavaScriptLexer extends Lexer {
    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public override nextToken(): boolean {
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

        if (this.isLetter(ch) || ch === '_') {
            this.readIdentifierOrKeyword();
            return true;
        }

        if (this.isDigit(ch) || (ch === '.' && this.isDigit(this.input[this.position + 1]))) {
            this.readNumber();
            return true;
        }

        if (ch === '"' || ch === "'" || ch ==='`') {
            this.readString(ch);
            return true;
        }

        if (ch === '/') {
            if (this.input[this.position + 1] === '/') {
                this.readComment();
                return true;
            }

            if (this.input[this.position + 1] === '*') {
                this.readBlockComment();
                return true;
            }

            this.readRegExpOrDivide();
            return true;
        }

        if (ch === '(') {
            const token: Token | null = this.getPrevNonWhitespaceToken(0);
            if (token?.type === 'IDENTIFIER' || token?.type === 'ELEMENT') {
                token.type = 'FUNCTION_OR_METHOD';
            }

            this.readOperator();
            return true;
        }

        this.readOperator();
        return true;
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): void {
        let start = this.position;

        if ((this.input[this.position] === '0') &&
                (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            // Hexadecimal literal
            this.position += 2;
            while (this.position < this.input.length && /[0-9a-fA-F]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if ((this.input[this.position] === '0') &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            // Binary literal
            this.position += 2;
            while (this.position < this.input.length && /[01]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if ((this.input[this.position] === '0') &&
                (this.input[this.position + 1] === 'o' || this.input[this.position + 1] === 'O')) {
            // Octal literal (ES6 syntax)
            this.position += 2;
            while (this.position < this.input.length && /[0-7]/.test(this.input[this.position])) {
                this.position++;
            }
        } else {
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

        // Check for BigInt suffix
        if (this.position < this.input.length && this.input[this.position] === 'n') {
            this.position++;
        }

        if (this.position == start) debugger;
        this.tokenStream.push({ type: 'NUMBER', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads whitespace in the input.
     */
    protected readWhitespace(): void {
        let start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an identifier or keyword in the input.
     */
    protected readIdentifierOrKeyword(): void {
        let start = this.position;
        while (this.position < this.input.length &&
                (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_')) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const prevToken: Token | null = this.getPrevNonWhitespaceToken(0);
        if (prevToken?.type === 'OPERATOR' && (prevToken.value === '.' || prevToken.value === '?.')) {
            const prevToken2: Token | null = this.getPrevNonWhitespaceToken(1);
            if (prevToken2?.type === 'IDENTIFIER' || prevToken2?.type === 'KEYWORD' || prevToken2?.type === 'ELEMENT') {
                this.tokenStream.push({ type: 'ELEMENT', value });
                return;
            }
        }

        if (this.isKeyword(value)) {
            this.tokenStream.push({ type: 'KEYWORD', value });
            return;
        }

        this.tokenStream.push({ type: 'IDENTIFIER', value });
    }

    /**
     * Reads a comment in the input.
     */
    protected readComment(): void {
        let start = this.position;
        this.position += 2; // Skip "//"
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a block comment in the input.
     */
    protected readBlockComment(): void {
        let start = this.position;
        this.position += 2;
        while (this.position < this.input.length && !(this.input[this.position - 1] === '*' && this.input[this.position] === '/')) {
            this.position++;
        }

        this.position++;
        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Read a regular expression literal or divide operator.
     */
    protected readRegExpOrDivide(): void {
        this.position++;

        // Look for a potential end of line.  If we find one then this isn't a regexp literal.
        let index: number = this.position;
        let escaped: boolean = false;
        while (index < this.input.length) {
            const ch = this.input[index++];
            if (ch === '\n') {
                this.tokenStream.push({ type: 'OPERATOR', value: '/' });
                return;
            }

            if (ch === '\\') {
                escaped = !escaped;
                continue;
            }

            if (escaped) {
                escaped = false;
                continue;
            }

            if (ch === '/') {
                break;
            }
        }

        // Check if the next characters seem to be valid regexp flags.
        while (index < this.input.length && 'dgimsuy'.includes(this.input[index])) {
            index++;
        }

        this.tokenStream.push({ type: 'REGEXP', value: this.input.slice(this.position - 1, index) });
        this.position = index;
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): void {
        const operators = [
            '>>>=',
            '>>=',
            '<<=',
            '&&=',
            '||=',
            '??=',
            '**=',
            '!==',
            '===',
            '>>>',
            '...',
            '!=',
            '==',
            '+=',
            '-=',
            '*=',
            '/=',
            '%=',
            '&=',
            '|=',
            '^=',
            '<=',
            '>=',
            '&&',
            '||',
            '??',
            '?.',
            '<<',
            '>>',
            '**',
            '++',
            '--',
            '+',
            '-',
            '*',
            '/',
            '%',
            '&',
            '~',
            '!',
            '|',
            '^',
            '=',
            '<',
            '>',
            '(',
            ')',
            '{',
            '}',
            '[',
            ']',
            ';',
            ':',
            '?',
            '.',
            ','
        ];

        for (let i = 0; i < operators.length; i++) {
            if (this.input.startsWith(operators[i], this.position)) {
                this.position += operators[i].length;
                this.tokenStream.push({ type: 'OPERATOR', value: operators[i]} );
                return;
            }
        }

        const ch = this.input[this.position++];
        this.tokenStream.push({ type: 'ERROR', value: ch });
    }

    /**
     * Checks if a character is a letter.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected override isLetter(ch: string): boolean {
        return /[a-zA-Z]/.test(ch);
    }

    /**
     * Determines if a value is a keyword in JavaScript.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
        const keywords = [
            'abstract',
            'async',
            'await',
            'boolean',
            'break',
            'byte',
            'case',
            'catch',
            'char',
            'class',
            'const',
            'continue',
            'debugger',
            'default',
            'delete',
            'do',
            'double',
            'else',
            'enum',
            'export',
            'extends',
            'false',
            'final',
            'finally',
            'float',
            'for',
            'from',
            'function',
            'goto',
            'if',
            'implements',
            'import',
            'in',
            'instanceof',
            'int',
            'interface',
            'let',
            'long',
            'native',
            'new',
            'null',
            'package',
            'private',
            'protected',
            'public',
            'return',
            'short',
            'static',
            'super',
            'switch',
            'synchronized',
            'this',
            'throw',
            'throws',
            'transient',
            'true',
            'try',
            'typeof',
            'var',
            'void',
            'volatile',
            'while',
            'with',
            'yield'
        ];
        return keywords.includes(value);
    }
}
