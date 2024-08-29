import {TypeScriptLexer} from './TypeScriptLexer'
import {JavaScriptParser} from './JavaScriptParser'

/**
 * TypeScript parser.
 */
export class TypeScriptParser extends JavaScriptParser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.lexer = new TypeScriptLexer(input);
    }
}
