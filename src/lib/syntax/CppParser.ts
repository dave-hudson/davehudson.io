import {Token} from './Lexer'
import {CParser} from './CParser'
import {CppLexer} from './CppLexer'

/**
 * C++ parser.
 */
export class CppParser extends CParser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.lexer = new CppLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public override getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        let token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        if (token.type !== 'IDENTIFIER') {
            if (token.type === 'OPERATOR' && (token.value !== '.' && token.value !== '->')) {
                this.inElement = false;
                return token;
            }

            if (token.type !== 'KEYWORD' || token.value !== 'this') {
                return token;
            }
        }

        // Look at the next token.  If it's a '(' operator then we're making a function or method call!
        const curInElement = this.inElement;
        const nextToken: Token | null = this.lexer.peekNextSyntaxToken();
        this.inElement = curInElement;
        let nextInElement = false;
        if (nextToken?.type === 'OPERATOR') {
            if (nextToken.value === '(') {
                this.inElement = false;
                return {type: 'FUNCTION_OR_METHOD', value: token.value};
            }

            // Is the next token going to be an element?
            if (nextToken.value === '.' || nextToken.value === '->') {
                nextInElement = true;
            }
        }

        this.inElement = nextInElement;

        if (curInElement) {
            return {type: 'ELEMENT', value: token.value};
        }

        return token;
    }
}
