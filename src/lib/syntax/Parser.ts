import {Lexer, Token} from './Lexer'

/**
 * Base class for parsers, providing common functionality.
 */
export abstract class Parser {
    protected lexer: Lexer | null;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor() {
        this.lexer = null;
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    abstract getNextToken(): Token | null;
}
