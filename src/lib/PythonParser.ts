import { Lexer, Parser, Token } from './Parser'

/**
 * Lexer for Python code.
 */
export class PythonLexer extends Lexer {
    /**
     * Constructs a lexer.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);
    }

    /**
     * Gets the next token from the input.
     */
    public override getNextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch: string = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
            return this.readWhitespace();
        }

        if (this.isLetter(ch) || ch === '_') {
            return this.readIdentifierOrKeyword();
        }

        if (this.isDigit(ch) || (ch === '.' && this.isDigit(this.input[this.position + 1]))) {
            return this.readNumber();
        }

        if (ch === '"' || ch === "'") {
            if (((this.position + 2) < this.input.length) &&
                    this.input[this.position + 1] === ch &&
                    this.input[this.position + 2] === ch) {
                return this.readDocString(ch);
            }

            return this.readString(ch);
        }

        if (ch === '#') {
            return this.readComment();
        }

        return this.readOperator();
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): Token {
        let start = this.position;

        if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            // Hexadecimal literal
            this.position += 2;
            while (this.position < this.input.length && /[0-9a-fA-F]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            // Binary literal
            this.position += 2;
            while (this.position < this.input.length && /[01]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                this.position + 1 <= this.input.length &&
                (this.input[this.position + 1] === 'o' || this.input[this.position + 1] === 'O')) {
            // Octal literal
            this.position += 2;
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

        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an identifier or keyword in the input.
     */
    protected readIdentifierOrKeyword(): Token {
        let start = this.position;
        while (this.position < this.input.length && (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_')) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        if (this.isKeyword(value)) {
            return { type: 'KEYWORD', value };
        }

        return { type: 'IDENTIFIER', value };
    }

    /**
     * Reads a comment in the input.
     */
    protected readComment(): Token {
        let start = this.position;
        this.position++; // Skip "#"
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a doc string token.
     */
    protected readDocString(ch: string): Token {
        const start = this.position;
        this.position += 3;
        while ((this.position + 2) < this.input.length &&
                !(this.input[this.position] === ch &&
                    this.input[this.position + 1] === ch &&
                    this.input[this.position + 2] === ch)) {
            this.position++;
        }

        this.position += 3;
        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): Token {
        const operators = [
            '>>=',
            '<<=',
            '**=',
            '//=',
            '@=',
            ':=',
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
            '<<',
            '>>',
            '++',
            '--',
            '**',
            '//',
            '->',
            '@',
            '+',
            '-',
            '*',
            '/',
            '%',
            '&',
            '~',
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
            ':',
            '.',
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

    /**
     * Determines if a value is a keyword in Python.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
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

/**
 * Python parser.
 */
export class PythonParser extends Parser {
    protected inElement: boolean = false;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new PythonLexer(input);
        this.inElement = false;
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
        const curInElement = this.inElement;
        const nextToken: Token | null = this.lexer.peekNextSyntaxToken();
        this.inElement = curInElement;
        let nextInElement = false;
        if (nextToken?.type === 'OPERATOR') {
            if (nextToken.value === '(') {
                this.inElement = false;
                return { type: 'FUNCTION_OR_METHOD', value: token.value };
            }

            // Is the next token going to be an element?
            if (nextToken.value === '.') {
                nextInElement = true;
            }
        }

        this.inElement = nextInElement;

        if (curInElement) {
            return { type: 'ELEMENT', value: token.value };
        }

        return token;
    }
}
