import { Lexer, Token } from './Lexer'

/**
 * Lexer for C code.
 */
export class CLexer extends Lexer {
    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): boolean {
        if (this.position >= this.input.length) {
            return false;
        }

        const ch = this.input[this.position];

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
            this.readString(ch);
            return true;
        }

        if (ch === '/' && this.input[this.position + 1] === '/') {
            this.readComment();
            return true;
        }

        if (ch === '/' && this.input[this.position + 1] === '*') {
            this.readBlockComment();
            return true;
        }

        if (ch === '#') {
            this.readPreprocessorDirective();
            return true;
        }

        if (ch === '(') {
            const token: Token | null = this.getPrevNonWhitespaceToken(0);
            if (token?.type === 'IDENTIFIER') {
                token.type = 'FUNCTION_OR_METHOD';
            }

            // Fallthrough to reading operator or punctuation.
        }

        this.readOperatorOrPunctuation();
        return true;
    }

    /**
     * Reads a number in the input.
     * @returns The number token.
     */
    protected readNumber(): void {
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

        this.tokenStream.push({ type: 'NUMBER', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads whitespace in the input.
     * @returns The whitespace token.
     */
    protected readWhitespace(): void {
        let start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }

        this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a comment in the input.
     * @returns The comment token.
     */
    protected readComment(): void {
        let start = this.position;
        this.position += 2;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads a block comment in the input.
     * @returns The block comment token.
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
     * Reads an identifier or keyword token in C.
     * @returns The identifier or keyword token.
     */
    protected readIdentifierOrKeyword(): void {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position]) || this.input[this.position] === '_') {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        this.tokenStream.push({ type, value });
    }

    /**
     * Reads a preprocessor directive token in C.
     * @returns The preprocessor directive token.
     */
    protected readPreprocessorDirective(): void {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokenStream.push({ type: 'PREPROCESSOR', value: this.input.slice(start, this.position) });
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
