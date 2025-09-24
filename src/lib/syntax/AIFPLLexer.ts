import {Lexer, styles} from './Lexer'

// Add new token styles for AIFPL-specific tokens
styles['BOOLEAN'] = 'boolean';
styles['QUOTE'] = 'operator';

/**
 * Lexer for AIFPL (AI Functional Programming Language) code.
 * 
 * AIFPL is a LISP-like language with S-expressions, supporting:
 * - Parentheses for expressions: (+ 1 2 3)
 * - Quote for literals: '(a b c)
 * - Numbers: integers, decimals, scientific, complex, based (#b, #o, #d, #x)
 * - Booleans: #t, #f
 * - Strings with escape sequences
 * - Semicolon comments
 * - Rich identifier syntax with special characters
 */
export class AIFPLLexer extends Lexer {
    /**
     * Constructs an AIFPL lexer.
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
    protected getLexingFunction(ch: string): () => void {
        if (ch === '\n') {
            return this.readNewline.bind(this);
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace.bind(this);
        }

        if (ch === '"') {
            return this.readString.bind(this);
        }

        if (ch === ';') {
            return this.readComment.bind(this);
        }

        if (ch === '#') {
            return this.readHashToken.bind(this);
        }

        if (ch === '(' || ch === ')') {
            return this.readDelimiter.bind(this);
        }

        if (ch === '.') {
            return this.readDotOrNumber.bind(this);
        }

        if (ch === '+' || ch === '-') {
            return this.readNumberOrIdentifier.bind(this);
        }

        if (ch === "'") {
            return this.readQuote.bind(this);
        }

        if (this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        return this.readIdentifier.bind(this);
    }

    /**
     * Read a hash token which could be:
     * - Boolean (#t, #f)
     * - Based numbers (#b, #o, #d, #x)
     */
    protected readHashToken(): void {
        const start = this.position;
        
        if (this.position + 1 >= this.input.length) {
            this.position++;
            this.tokens.push({type: 'ERROR', value: '#'});
            return;
        }

        const ch = this.input[this.position + 1].toLowerCase();

        // Handle booleans
        if (ch === 't' || ch === 'f') {
            this.position += 2;
            this.tokens.push({
                type: 'BOOLEAN',
                value: this.input.slice(start, this.position)
            });
            return;
        }

        // Handle based numbers
        if (ch === 'b' || ch === 'o' || ch === 'd' || ch === 'x') {
            this.readBasedNumber(ch);
            return;
        }

        // Invalid hash token
        this.position++;
        this.tokens.push({type: 'ERROR', value: '#'});
    }

    /**
     * Read a number with an explicit base.
     * @param base - The base indicator ('b', 'o', 'd', 'x')
     */
    protected readBasedNumber(base: string): void {
        const start = this.position;
        this.position += 2; // Skip #base prefix

        // Read digits according to base
        while (this.position < this.input.length) {
            const ch = this.input[this.position].toLowerCase();
            let valid = false;

            if (base === 'b' && (ch === '0' || ch === '1')) {
                valid = true;
            } else if (base === 'o' && this.isOctalDigit(ch)) {
                valid = true;
            } else if (base === 'd' && this.isDigit(ch)) {
                valid = true;
            } else if (base === 'x' && this.isHexDigit(ch)) {
                valid = true;
            }

            if (!valid) {
                break;
            }

            this.position++;
        }

        this.tokens.push({
            type: 'NUMBER',
            value: this.input.slice(start, this.position)
        });
    }

    /**
     * Read an identifier token.
     * In AIFPL, identifiers can contain letters, digits, and many special characters.
     * They cannot start with a digit and are case-insensitive for keywords.
     */
    protected readIdentifier(): void {
        const start = this.position;
        
        while (this.position < this.input.length) {
            const ch = this.input[this.position];
            if (this.isDelimiter(ch)) {
                break;
            }
            this.position++;
        }

        const value = this.input.slice(start, this.position);

        if (this.isSpecialForm(value)) {
            this.tokens.push({type: 'KEYWORD', value});
            return;
        }

        this.tokens.push({type: 'IDENTIFIER', value});
    }

    /**
     * Read a token that could be a number or identifier starting with + or -.
     */
    protected readNumberOrIdentifier(): void {
        if (this.position + 1 < this.input.length &&
            this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        this.readIdentifier();
    }

    /**
     * Read a token starting with a dot (could be decimal number or error).
     */
    protected readDotOrNumber(): void {
        if (this.position + 1 < this.input.length &&
            this.isDigit(this.input[this.position + 1])) {
            this.readNumber();
            return;
        }

        // Standalone dot is an error in AIFPL
        this.position++;
        this.tokens.push({type: 'ERROR', value: '.'});
    }

    /**
     * Read a numeric literal.
     * Handles integers, decimals, scientific notation, complex numbers, and signed numbers.
     */
    protected readNumber(): void {
        const start = this.position;

        // Handle optional sign
        if (this.input[this.position] === '+' || this.input[this.position] === '-') {
            this.position++;
        }

        // Read integer part
        while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
            this.position++;
        }

        // Handle decimal point
        if (this.position < this.input.length && this.input[this.position] === '.') {
            this.position++;
            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }
        }

        // Handle scientific notation
        if (this.position < this.input.length && 
            (this.input[this.position] === 'e' || this.input[this.position] === 'E')) {
            this.position++;
            if (this.position < this.input.length &&
                (this.input[this.position] === '+' || this.input[this.position] === '-')) {
                this.position++;
            }
            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }
        }

        // Handle complex number suffix
        if (this.position < this.input.length && 
            (this.input[this.position] === 'j' || this.input[this.position] === 'J')) {
            this.position++;
        }

        this.tokens.push({
            type: 'NUMBER',
            value: this.input.slice(start, this.position)
        });
    }

    /**
     * Read a quote token.
     */
    protected readQuote(): void {
        this.position++;
        this.tokens.push({type: 'QUOTE', value: "'"});
    }

    /**
     * Read a delimiter token (parentheses).
     */
    protected readDelimiter(): void {
        const ch = this.input[this.position];
        this.position++;
        this.tokens.push({type: 'OPERATOR', value: ch});
    }

    /**
     * Read a single-line comment token.
     */
    protected readComment(): void {
        const start = this.position;
        
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokens.push({
            type: 'COMMENT',
            value: this.input.slice(start, this.position)
        });
    }

    /**
     * Determines if a character is a delimiter (whitespace or parentheses).
     * @param ch - The character to check
     * @returns True if the character is a delimiter, false otherwise
     */
    protected isDelimiter(ch: string): boolean {
        return this.isWhitespace(ch) || ch === '(' || ch === ')' || ch === '\n';
    }

    /**
     * Check if a given value is an AIFPL special form (keyword).
     * @param value - The string to check
     * @returns True if the value is a special form, false otherwise
     */
    protected isSpecialForm(value: string): boolean {
        const specialForms = new Set([
            // Core special forms
            'and', 'or', 'not', 'if', 'let', 'lambda', 'quote',
            // Built-in functions commonly treated as keywords
            'list', 'cons', 'append', 'first', 'rest', 'last',
            'map', 'filter', 'fold', 'range', 'find', 'any?', 'all?',
            // Math functions
            'sin', 'cos', 'tan', 'log', 'exp', 'sqrt', 'abs',
            'min', 'max', 'pow', 'round', 'floor', 'ceil',
            // String functions  
            'string-append', 'string-length', 'string-ref', 'substring',
            'string-upcase', 'string-downcase', 'string-trim',
            // Type predicates
            'number?', 'integer?', 'float?', 'complex?', 'string?', 
            'boolean?', 'list?', 'function?', 'null?',
            // Constants
            'pi', 'e', 'j', 'true', 'false'
        ]);
        
        return specialForms.has(value.toLowerCase());
    }
}
