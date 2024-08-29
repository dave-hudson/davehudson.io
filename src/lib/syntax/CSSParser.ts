import {Token} from './Lexer'
import {Parser} from './Parser'
import {CSSLexer} from './CSSLexer'

/**
 * CSS parser.
 */
export class CSSParser extends Parser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new CSSLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        let token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        if (token.type !== 'IDENTIFIER') {
            return token;
        }

        // Look at the next token.  If it's a '(' operator then we're making a function or method call!
        const nextToken: Token | null = this.lexer.peekNextSyntaxToken();
        if (nextToken?.type === 'OPERATOR') {
            if (nextToken.value === '(') {
                return {type: 'FUNCTION_OR_METHOD', value: token.value};
            }
        }

        return token;
    }
}
