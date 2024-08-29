import {Token} from './Lexer'
import {Parser} from './Parser'
import {HTMLLexer} from './HTMLLexer'
import {CSSParser} from './CSSParser';
import {JavaScriptParser} from './JavaScriptParser';

/**
 * HTML parser.
 */
export class HTMLParser extends Parser {
    protected jsParser: JavaScriptParser | null;
    protected cssParser: CSSParser | null;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new HTMLLexer(input);
        this.jsParser = null;
        this.cssParser = null;
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public getNextToken(): Token | null {
        // If we're using a JavaScript parser than use that until we've completed procesing the JavaScript.
        if (this.jsParser) {
            const token = this.jsParser.getNextToken();
            if (token) {
                return token;
            }

            this.jsParser = null;
        }

        // If we're using a CSS parser than use that until we've completed procesing the CSS.
        if (this.cssParser) {
            const token = this.cssParser.getNextToken();
            if (token) {
                return token;
            }

            this.cssParser = null;
        }

        if (!this.lexer) {
            return null;
        }

        let token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        if (token.type === 'SCRIPT') {
            this.jsParser = new JavaScriptParser(token.value);
            const jsToken = this.jsParser.getNextToken();
            if (jsToken) {
                return jsToken;
            }

            this.jsParser = null;
        }

        if (token.type === 'STYLE') {
            this.cssParser = new CSSParser(token.value);
            const cssToken = this.cssParser.getNextToken();
            if (cssToken) {
                return cssToken;
            }

            this.cssParser = null;
        }

        return token;
    }
}
