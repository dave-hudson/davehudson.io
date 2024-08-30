import {Token} from './Lexer'
import {Parser} from './Parser'
import {MetaphorLexer} from './MetaphorLexer'

/**
 * Metaphor parser.
 */
export class MetaphorParser extends Parser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new MetaphorLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        return this.lexer.getNextToken();
    }
}
