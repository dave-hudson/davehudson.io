import {Token} from './Lexer'
import {Parser} from './Parser'
import {AIFPLLexer} from './AIFPLLexer'

/**
 * Parser for AIFPL (AI Functional Programming Language) code.
 * 
 * This parser processes tokens from the AIFPL lexer and provides
 * basic semantic analysis for better syntax highlighting, such as
 * distinguishing between function calls and regular identifiers.
 */
export class AIFPLParser extends Parser {
    /**
     * Constructs an AIFPL parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();
        this.lexer = new AIFPLLexer(input);
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
