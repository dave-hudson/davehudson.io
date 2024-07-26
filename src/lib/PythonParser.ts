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
     * Get the lexing function that matches a given start character
     * @param ch - The start character
     * @returns the lexing function
     */
    public override getLexingFunction(ch: string): () => Token {
        if (ch === '\n') {
            return this.readNewline.bind(this);
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace.bind(this);
        }

        if (this.isLetter(ch) || ch === '_') {
            return this.readIdentifierOrKeyword.bind(this);
        }

        if (this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        if (ch === '"' || ch === "'") {
            return this.readQuote.bind(this);
        }

        if (ch === '.') {
            return this.readDot.bind(this);
        }

        if (ch === '#') {
            return this.readComment.bind(this);
        }

        return this.readOperator.bind(this);
    }

    protected readQuote(): Token {
        const ch: string = this.input[this.position];
        if (((this.position + 2) < this.input.length) &&
                this.input[this.position + 1] === ch &&
                this.input[this.position + 2] === ch) {
            return this.readDocString(ch);
        }

        return this.readString();
    }

    protected readDot(): Token {
        if (this.isDigit(this.input[this.position + 1])) {
            return this.readNumber();
        }

        return this.readOperator();
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): Token {
        let start = this.position;

        if (this.input[this.position] === '0' &&
                (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            // Hexadecimal literal
            this.position += 2;
            while (this.position < this.input.length && this.isHexDigit(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            // Binary literal
            this.position += 2;
            while (this.position < this.input.length && this.isBinaryDigit(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                (this.input[this.position + 1] === 'o' || this.input[this.position + 1] === 'O')) {
            // Octal literal
            this.position += 2;
            while (this.position < this.input.length && this.isOctalDigit(this.input[this.position])) {
                this.position++;
            }
        } else {
            // Decimal or floating-point literal
            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }

            if (this.position < this.input.length && this.input[this.position] === '.') {
                this.position++;
                while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                    this.position++;
                }
            }

            if (this.position < this.input.length && (this.input[this.position] === 'e' || this.input[this.position] === 'E')) {
                this.position++;
                if (this.input[this.position] === '+' || this.input[this.position] === '-') {
                    this.position++;
                }

                while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
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
        this.position++;
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
        this.position++;
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
