import { Lexer, Parser, Token, styles } from './Parser'

styles['REGEXP'] = 'regexp';

/**
 * Lexer for JavaScript code.
 */
export class JavaScriptLexer extends Lexer {
    /**
     * Constructs a parser.
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

        const ch = this.input[this.position];

        if (ch === '\n') {
            return this.readNewline();
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace();
        }

        if (this.isLetter(ch) || ch === '_' || ch === '$') {
            return this.readIdentifierOrKeyword();
        }

        if (this.isDigit(ch)) {
            return this.readNumber();
        }

        if (ch === '"' || ch === "'" || ch ==='`') {
            return this.readString(ch);
        }

        if (ch === '.' && this.isDigit(this.input[this.position + 1])) {
            return this.readNumber();
        }

        if (ch === '/') {
            if (this.input[this.position + 1] === '/') {
                return this.readComment();
            }

            if (this.input[this.position + 1] === '*') {
                return this.readBlockComment();
            }

            return this.readRegExpOrDivide();
        }

        return this.readOperator();
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): Token {
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
        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an identifier or keyword in the input.
     */
    protected readIdentifierOrKeyword(): Token {
        let start = this.position;
        this.position++;
        while (this.position < this.input.length &&
                (this.isLetterOrDigit(this.input[this.position]) ||
                    this.input[this.position] === '_' ||
                    this.input[this.position] === '$')) {
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
        this.position += 2;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a block comment in the input.
     */
    protected readBlockComment(): Token {
        let start = this.position;
        this.position += 2;
        while (this.position < this.input.length && !(this.input[this.position - 1] === '*' && this.input[this.position] === '/')) {
            this.position++;
        }

        this.position++;
        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Read a regular expression literal or divide operator.
     */
    protected readRegExpOrDivide(): Token {
        this.position++;

        // Look for a potential end of line.  If we find one then this isn't a regexp literal.
        let index: number = this.position;
        let escaped: boolean = false;
        while (index < this.input.length) {
            const ch = this.input[index++];
            if (ch === '\n') {
                return { type: 'OPERATOR', value: '/' };
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

        const regexp = this.input.slice(this.position - 1, index);
        this.position = index;
        return { type: 'REGEXP', value: regexp };
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): Token {
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
                return { type: 'OPERATOR', value: operators[i]};
            }
        }

        const ch = this.input[this.position++];
        return { type: 'ERROR', value: ch };
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
            'of',
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

/**
 * JavaScript parser.
 */
export class JavaScriptParser extends Parser {
    protected inElement: boolean = false;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new JavaScriptLexer(input);
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
            if (nextToken.value === '.' || nextToken.value === '?.') {
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
