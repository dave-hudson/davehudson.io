import {Token} from './Lexer'
import {Parser} from './Parser'
import {DiffLexer} from './DiffLexer'

/**
 * Parser for diff/patch files.
 *
 * Since diff files are line-oriented and stateless, the parser simply
 * passes through the lexer tokens without additional processing.
 */
export class DiffParser extends Parser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new DiffLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns The next Token available or null if there are no tokens left.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        return this.lexer.getNextToken();
    }
}
