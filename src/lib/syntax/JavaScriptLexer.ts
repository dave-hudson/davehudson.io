import {Lexer, styles} from './Lexer'

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

        if (this.isLetter(ch) || ch === '_' || ch === '$') {
            return this.readIdentifierOrKeyword.bind(this);
        }

        if (this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        if (ch === '"' || ch === "'" || ch ==='`') {
            return this.readString.bind(this);
        }

        if (ch === '.') {
            return this.readDot.bind(this);
        }

        if (ch === '/') {
            return this.readForwardSlash.bind(this);
        }

        if (ch == '#') {
            return this.readHash.bind(this);
        }

        return this.readOperator.bind(this);
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

        this.readRegExpOrDivide();
    }

    protected readDot(): void {
        if (this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        this.readOperator();
    }

    protected readHash(): void {
        if (this.input[this.position + 1] == '!') {
            this.readHashBang();
            return;
        }

        this.position++;
        this.tokens.push({type: 'ERROR', value: '#'});
    }

    protected readHashBang(): void {
        let start = this.position;
        this.position += 2;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokens.push({type: 'PREPROCESSOR', value: this.input.slice(start, this.position)});
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
            while (this.position < this.input.length && this.isHexDigit(this.input[this.position])) {
                this.position++;
            }
        } else if ((this.input[this.position] === '0') &&
                (this.input[this.position + 1] === 'b' || this.input[this.position + 1] === 'B')) {
            // Binary literal
            this.position += 2;
            while (this.position < this.input.length && this.isBinaryDigit(this.input[this.position])) {
                this.position++;
            }
        } else if ((this.input[this.position] === '0') &&
                (this.input[this.position + 1] === 'o' || this.input[this.position + 1] === 'O')) {
            // Octal literal (ES6 syntax)
            this.position += 2;
            while (this.position < this.input.length && this.isOctalDigit(this.input[this.position])) {
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

        // Check for BigInt suffix
        if (this.position < this.input.length && this.input[this.position] === 'n') {
            this.position++;
        }

        this.tokens.push({type: 'NUMBER', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads an identifier or keyword in the input.
     */
    protected readIdentifierOrKeyword(): void {
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
            this.tokens.push({type: 'KEYWORD', value});
            return;
        }

        this.tokens.push({type: 'IDENTIFIER', value});
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
                this.tokens.push({type: 'OPERATOR', value: '/'});
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

        const regexp = this.input.slice(this.position - 1, index);
        this.position = index;
        this.tokens.push({type: 'REGEXP', value: regexp});
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
                this.tokens.push({type: 'OPERATOR', value: operators[i]});
                return;
            }
        }

        const ch = this.input[this.position++];
        this.tokens.push({type: 'ERROR', value: ch});
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
