import {Lexer} from './Lexer'

/**
 * Lexer for JSON.
 */
export class JSONLexer extends Lexer {
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

        if (ch === '-' || this.isDigit(ch)) {
            return this.readNumber.bind(this);
        }

        if (this.isLetter(ch)) {
            return this.readKeyword.bind(this);
        }

        if (ch === '{' || ch === '}' || ch === '[' || ch === ']' || ch === ':' || ch === ',') {
            return this.readOperator.bind(this);
        }

        return this.readError.bind(this);
    }

    /**
     * Reads a JSON string token.
     * Handles escape sequences within strings.
     */
    protected override readString(): void {
        const start = this.position;
        this.position++; // Skip opening quote

        while (this.position < this.input.length) {
            const ch = this.input[this.position];

            if (ch === '\\' && this.position + 1 < this.input.length) {
                const nextCh = this.input[this.position + 1];
                
                // Valid JSON escape sequences: " \ / b f n r t
                if (nextCh === '"' || nextCh === '\\' || nextCh === '/' || 
                    nextCh === 'b' || nextCh === 'f' || nextCh === 'n' || 
                    nextCh === 'r' || nextCh === 't') {
                    this.position += 2;
                    continue;
                }

                // Unicode escape sequence: \uXXXX
                if (nextCh === 'u') {
                    if (this.position + 5 < this.input.length) {
                        const hex = this.input.slice(this.position + 2, this.position + 6);
                        if (hex.length === 4 && this.isValidHexSequence(hex)) {
                            this.position += 6;
                            continue;
                        }
                    }
                    
                    // Invalid unicode escape
                    this.tokens.push({
                        type: 'ERROR',
                        value: this.input.slice(start, this.position + 2)
                    });
                    this.position += 2;
                    return;
                }

                // Invalid escape sequence
                this.tokens.push({
                    type: 'ERROR',
                    value: this.input.slice(start, this.position + 2)
                });
                this.position += 2;
                return;
            }

            if (ch === '"') {
                this.position++; // Skip closing quote
                this.tokens.push({
                    type: 'STRING',
                    value: this.input.slice(start, this.position)
                });
                return;
            }

            // Control characters (0x00-0x1F) are not allowed unescaped in JSON strings
            if (ch.charCodeAt(0) < 0x20) {
                this.tokens.push({
                    type: 'ERROR',
                    value: this.input.slice(start, this.position + 1)
                });
                this.position++;
                return;
            }

            this.position++;
        }

        // Unterminated string
        this.tokens.push({
            type: 'ERROR',
            value: this.input.slice(start, this.position)
        });
    }

    /**
     * Reads a JSON number token.
     * Handles integers, decimals, and scientific notation according to JSON spec.
     */
    protected readNumber(): void {
        const start = this.position;

        // Handle negative sign
        if (this.input[this.position] === '-') {
            this.position++;
        }

        // Must have at least one digit after optional minus
        if (this.position >= this.input.length || !this.isDigit(this.input[this.position])) {
            this.tokens.push({
                type: 'ERROR',
                value: this.input.slice(start, this.position)
            });
            return;
        }

        // Leading zero must not be followed by another digit
        if (this.input[this.position] === '0') {
            this.position++;
            if (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                // Invalid: leading zero followed by digit
                this.tokens.push({
                    type: 'ERROR',
                    value: this.input.slice(start, this.position + 1)
                });
                this.position++;
                return;
            }
        } else {
            // Read integer part (non-zero start)
            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }
        }

        // Handle decimal point
        if (this.position < this.input.length && this.input[this.position] === '.') {
            this.position++;
            
            // Must have at least one digit after decimal point
            if (this.position >= this.input.length || !this.isDigit(this.input[this.position])) {
                this.tokens.push({
                    type: 'ERROR',
                    value: this.input.slice(start, this.position)
                });
                return;
            }

            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }
        }

        // Handle exponent
        if (this.position < this.input.length && 
            (this.input[this.position] === 'e' || this.input[this.position] === 'E')) {
            this.position++;

            // Optional sign
            if (this.position < this.input.length && 
                (this.input[this.position] === '+' || this.input[this.position] === '-')) {
                this.position++;
            }

            // Must have at least one digit in exponent
            if (this.position >= this.input.length || !this.isDigit(this.input[this.position])) {
                this.tokens.push({
                    type: 'ERROR',
                    value: this.input.slice(start, this.position)
                });
                return;
            }

            while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
                this.position++;
            }
        }

        this.tokens.push({
            type: 'NUMBER',
            value: this.input.slice(start, this.position)
        });
    }

    /**
     * Reads a JSON keyword token (true, false, or null).
     */
    protected readKeyword(): void {
        const start = this.position;
        
        while (this.position < this.input.length && this.isLetter(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        
        if (value === 'true' || value === 'false' || value === 'null') {
            this.tokens.push({type: 'KEYWORD', value});
        } else {
            this.tokens.push({type: 'ERROR', value});
        }
    }

    /**
     * Reads a JSON operator/punctuation token.
     */
    protected readOperator(): void {
        const ch = this.input[this.position];
        this.position++;
        this.tokens.push({type: 'OPERATOR', value: ch});
    }

    /**
     * Reads an invalid character as an error token.
     */
    protected readError(): void {
        const ch = this.input[this.position];
        this.position++;
        this.tokens.push({type: 'ERROR', value: ch});
    }

    /**
     * Validates that a string contains only hexadecimal digits.
     * @param str - The string to validate
     * @returns True if all characters are hex digits, false otherwise
     */
    private isValidHexSequence(str: string): boolean {
        for (let i = 0; i < str.length; i++) {
            if (!this.isHexDigit(str[i])) {
                return false;
            }
        }
        return true;
    }
}
