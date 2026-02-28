import {Token} from './Lexer'
import {Parser} from './Parser'
import {MenaiLexer} from './MenaiLexer'

/**
 * Parser for Menai (AI functional programming language) code.
 * 
 * This parser processes tokens from the Menai lexer and provides
 * basic semantic analysis for better syntax highlighting, such as
 * distinguishing between function calls and regular identifiers.
 */
export class MenaiParser extends Parser {
    /**
     * Constructs an Menai parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();
        this.lexer = new MenaiLexer(input);
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

        return token;
    }
}
