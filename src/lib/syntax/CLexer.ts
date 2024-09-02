import {Lexer} from './Lexer'

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
     * Get the lexing function that matches a given start character
     * @param ch - The start character
     * @returns the lexing function
     */
    protected getLexingFunction(ch: string) : () => void {
        if (ch === '\n') {
            return this.readNewline.bind(this);
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace.bind(this);
        }

        if (ch === 'L') {
            return this.readL.bind(this);
        }

        if (this.isLetter(ch) || ch === '_') {
            return this.readIdentifierOrKeyword.bind(this);
        }

        if (this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        if (ch === '"' || ch === "'") {
            return this.readString.bind(this);
        }

        if (ch === '.') {
            return this.readDot.bind(this);
        }

        if (ch === '/') {
            return this.readForwardSlash.bind(this);
        }

        if (ch === '#') {
            return this.readPreprocessorDirective.bind(this);
        }

        return this.readOperator.bind(this);
    }

    protected readL(): void {
        if (this.input[this.position + 1] === '"') {
            this.readString();
            return;
        }

        this.readIdentifierOrKeyword();
    }

    protected readDot(): void {
        if (this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        this.readOperator();
    }

    /*
     * Read a forward slash.
     */
    protected readForwardSlash(): void {
        if (this.input[this.position + 1] === '/') {
            this.readComment();
            return;
        }

        if (this.input[this.position + 1] === '*') {
            this.readBlockComment();
            return;
        }

        this.readOperator();
    }

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     */
    protected override readString(): void {
        let quote: string = this.input[this.position];
        const start = this.position;
        this.position++;

        if (quote === 'L') {
            this.position++;
            quote = '"';
        }

        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++;
            }

            this.position++;
        }

        this.position++;
        this.tokens.push({type: 'STRING', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads a number in the input.
     */
    protected readNumber(): void {
        let start = this.position;
        let hasSuffix = false;

        if (this.input[this.position] === '0' &&
                (this.input[this.position + 1] === 'x' || this.input[this.position + 1] === 'X')) {
            this.position += 2;
            while (this.position < this.input.length && this.isHexDigit(this.input[this.position])) {
                this.position++;
            }
        } else if (this.input[this.position] === '0' &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            this.position += 2;
            while (this.position < this.input.length && this.isBinaryDigit(this.input[this.position])) {
                this.position++;
            }
        } else {
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

        this.tokens.push({type: 'NUMBER', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads a comment in the input.
     */
    protected readComment(): void {
        let start = this.position;
        this.position += 2;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokens.push({type: 'COMMENT', value: this.input.slice(start, this.position)});
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
        this.tokens.push({type: 'COMMENT', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads an identifier or keyword token in C.
     */
    protected readIdentifierOrKeyword(): void {
        const start = this.position;
        this.position++;
        while (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_') {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        if (this.isKeyword(value)) {
            this.tokens.push({type: 'KEYWORD', value});
            return;
        }

        this.tokens.push({type: 'IDENTIFIER', value});
    }

    /**
     * Reads a preprocessor directive token in C.
     */
    protected readPreprocessorDirective(): void {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokens.push({type: 'PREPROCESSOR', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads an operator or punctuation token.
     */
    protected readOperator(): void {
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
                this.tokens.push({type: 'OPERATOR', value: operators[i]});
                return;
            }
        }

        const ch = this.input[this.position++];
        this.tokens.push({type: 'ERROR', value: ch});
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
