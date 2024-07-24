import { Lexer, Parser, Token } from './Parser'

/**
 * Lexer for C code.
 */
export class CLexer extends Lexer {
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

        if (this.isLetter(ch) || ch === '_') {
            return this.readIdentifierOrKeyword();
        }

        if (this.isDigit(ch)) {
            return this.readNumber();
        }

        if (ch === '"' || ch === "'") {
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

            return this.readOperator();
        }

        if (ch === '#') {
            return this.readPreprocessorDirective();
        }

        return this.readOperator();
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): Token {
        let start = this.position;
        let hasSuffix = false;

        if (this.input[this.position] === '0' && (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            this.position += 2;
            while (this.position < this.input.length && /[0-9a-fA-F]/.test(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' && (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            this.position += 2;
            while (this.position < this.input.length && /[01]/.test(this.input[this.position])) {
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

        // Handle suffixes
        const suffixStart = this.position;
        while (this.position < this.input.length && /[uUlLfF]/.test(this.input[this.position])) {
            this.position++;
            hasSuffix = true;
        }

        // Validate the suffix combination
        if (hasSuffix) {
            const suffix = this.input.slice(suffixStart, this.position).toLowerCase();
            const validIntegerSuffixes = ["u", "ul", "ull", "lu", "llu"];
            const validFloatSuffixes = ["f", "l"];
            const isValidIntegerSuffix = validIntegerSuffixes.includes(suffix);
            const isValidFloatSuffix = validFloatSuffixes.includes(suffix);
            if (!isValidIntegerSuffix && !isValidFloatSuffix) {
                this.position = suffixStart;
            }
        }

        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
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
     * Reads an identifier or keyword token in C.
     */
    protected readIdentifierOrKeyword(): Token {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_') {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        if (this.isKeyword(value)) {
            return { type: 'KEYWORD', value };
        }

        return { type: 'IDENTIFIER', value };
    }

    /**
     * Reads a preprocessor directive token in C.
     */
    protected readPreprocessorDirective(): Token {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'PREPROCESSOR', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): Token {
        const operators = [
            '>>=',
            '<<=',
            '&&=',
            '||=',
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
            '<<',
            '>>',
            '++',
            '--',
            '->',
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
     * Determines if a value is a keyword in C.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
        const keywords = [
            'auto',
            'break',
            'case',
            'char',
            'const',
            'continue',
            'default',
            'do',
            'double',
            'else',
            'enum',
            'extern',
            'float',
            'for',
            'goto',
            'if',
            'inline',
            'int',
            'long',
            'register',
            'restrict',
            'return',
            'short',
            'signed',
            'sizeof',
            'static',
            'struct',
            'switch',
            'typedef',
            'union',
            'unsigned',
            'void',
            'volatile',
            'while',
            '_Bool',
            '_Complex',
            '_Imaginary'
        ];
        return keywords.includes(value);
    }
}

/**
 * C parser.
 */
export class CParser extends Parser {
    protected inElement: boolean = false;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new CLexer(input);
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
            if (nextToken.value === '.' || nextToken.value === '->') {
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
