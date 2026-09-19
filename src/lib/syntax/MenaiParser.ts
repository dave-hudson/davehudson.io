import {Token} from './Lexer'
import {Parser} from './Parser'
import {MenaiLexer} from './MenaiLexer'
import {MenaiCallContext} from './MenaiCallContext'

/**
 * Parser for Menai (AI functional programming language) code.
 *
 * This parser processes tokens from the Menai lexer and provides
 * semantic analysis for better syntax highlighting, distinguishing
 * between function calls and regular identifiers.
 */
export class MenaiParser extends Parser {
    private callContext: MenaiCallContext;

    /**
     * Constructs a Menai parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();
        this.lexer = new MenaiLexer(input);
        this.callContext = new MenaiCallContext();
    }

    /**
     * Gets the next token from the input with semantic analysis.
     * @returns The next Token available or null if there are no tokens left.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        const token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        this.callContext.processToken(token);
        return token;
    }
}
