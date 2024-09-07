import {Lexer, styles} from './Lexer'

styles['HEADING'] = 'heading';

/**
 * Lexer for Metaphor.
 */
export class MetaphorLexer extends Lexer {
    protected seenKeyword: boolean;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.seenKeyword = false;
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

        if (ch === '#') {
            return this.readComment.bind(this);
        }

        return this.readTextOrKeyword.bind(this);
    }

    private readTextOrKeyword(): void {
        const start = this.position;

        while (this.position < this.input.length) {
            const ch = this.input[this.position];

            if (ch === '\n') {
                break;
            }

            this.position++;

            // If we've already seen a keyword on this line then we don't need to look for another one.
            if (this.seenKeyword === true) {
                continue;
            }

            // Is this a keyword?
            if (ch === ':') {
                const str = this.input.slice(start, this.position);
                if (this.isKeyword(str)) {
                    this.seenKeyword = true;
                    this.tokens.push({type: 'KEYWORD', value: str});
                    return;
                }
            }
        }

        this.tokens.push({type: (this.seenKeyword === true) ? 'HEADING' : 'TEXT', value: this.input.slice(start, this.position)});
    }

    /**
     * Reads a newline in the input.
     */
    protected override readNewline(): void {
        this.position++;
        this.seenKeyword = false;
        this.tokens.push({type: 'NEWLINE', value: '\n'});
    }

    /**
     * Reads a comment in the input.
     */
    private readComment(): void {
        const start = this.position;
        this.position++;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        this.tokens.push({type: 'COMMENT', value: this.input.slice(start, this.position)});
    }

    /**
     * Determines if a value is a keyword in C++.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
        const keywords = [
            'Embed:',
            'Example:',
            'Import:',
            'Scope:',
            'Target:'
        ];
        return keywords.includes(value);
    }
}
