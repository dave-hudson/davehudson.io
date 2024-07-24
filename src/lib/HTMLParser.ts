import { Lexer, Parser, Token, styles } from './Parser';
import { CSSParser } from './CSSParser';
import { JavaScriptParser } from './JavaScriptParser';

styles['ATTRIBUTE'] = 'html-attribute';
styles['DOCTYPE'] = 'html-doctype';
styles['SCRIPT'] = null;
styles['STYLE'] = null;
styles['TAG'] = 'html-tag';
styles['TEXT'] = 'text';

/**
 * Lexer class for HTML, extending the base lexer functionality.
 */
export class HTMLLexer extends Lexer {
    protected inTag: boolean;
    protected tagName: string;
    protected seenEquals: boolean;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.inTag = false;
        this.tagName = '';
        this.seenEquals = false;
    }

    /**
     * Gets the next token from the input.
     */
    public getNextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            return this.readNewline();
        }

        if (this.isWhitespace(ch)) {
            return this.readWhitespace();
        }

        if (ch === '<') {
            if (this.input[this.position + 1] === '!') {
                if (this.input.startsWith('DOCTYPE', this.position + 2)) {
                    return this.readDoctype();
                }

                return this.readHtmlComment();
            }

            this.position++;
            this.inTag = true;
            this.tagName = '';
            return { type: 'OPERATOR', value: '<' };
        }

        if (ch === '>') {
            this.position++;
            this.inTag = false;
            return { type: 'OPERATOR', value: '>' };
        }

        if (this.inTag) {
            return this.readTag();
        }

        // Is this a SCRIPT element?  If it is then we need to capture everything within it so this
        // can be passed to a JavaScript parser.
        if (this.tagName.toLowerCase() === 'script') {
            // We need to find the /SCRIPT tag.
            const scriptOpen: number = this.position;
            let scriptClose: number = this.input.toLowerCase().indexOf('</script', this.position);
            if (scriptClose === -1) {
                scriptClose = this.input.length;
            }

            this.position = scriptClose;
            return { type: 'SCRIPT', value: this.input.slice(scriptOpen, scriptClose) };
        }

        // Is this a STYLE element?  If it is then we need to capture everything within it so this
        // can be passed to a CSS parser.
        if (this.tagName.toLowerCase() === 'style') {
            // We need to find the /STYLE tag.
            const styleOpen: number = this.position;
            let styleClose: number = this.input.toLowerCase().indexOf('</style', this.position);
            if (styleClose === -1) {
                styleClose = this.input.length;
            }

            this.position = styleClose;
            return { type: 'STYLE', value: this.input.slice(styleOpen, styleClose) };
        }

        // Handle text content between tags.
        return this.readText();
    }

    /**
     * Reads a <!DOCTYPE> declaration in the input.
     */
    protected readDoctype(): Token {
        let start = this.position;
        this.position += 9;
        while (this.position < this.input.length && this.input[this.position] !== '>') {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++;
        }

        return { type: 'DOCTYPE', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an HTML comment in the input.
     */
    protected readHtmlComment(): Token {
        let start = this.position;
        this.position += 4;
        while (this.position < this.input.length && !(this.input[this.position - 2] === '-' && this.input[this.position - 1] === '-' && this.input[this.position] === '>')) {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++;
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a tag or attribute.
     */
    protected readTagOrAttribute(tokenType: string): Token {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position]) ||
                this.input[this.position] === '_' ||
                this.input[this.position] === '-' ||
                this.input[this.position] === '/') {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        return { type: tokenType, value };
    }

    /**
     * Reads tag content.
     */
    protected readTag(): Token {
        if (this.tagName === '') {
            const token: Token = this.readTagOrAttribute('TAG');
            this.tagName = token.value;
            return token;
        }

        const ch = this.input[this.position];
        if (ch === '=') {
            this.position++;
            this.seenEquals = true;
            return { type: 'OPERATOR', value: '=' };
        }

        const seenEquals = this.seenEquals;
        this.seenEquals = false;

        if (ch === '"' || ch === '\'') {
            return this.readString(ch);
        }

        return this.readTagOrAttribute(seenEquals ? 'STRING' : 'ATTRIBUTE');
    }

    /**
     * Reads text content between HTML tags.
     */
    protected readText(): Token {
        let start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '<') {
            this.position++;
        }

        return { type: 'TEXT', value: this.input.slice(start, this.position) };
    }

    isKeyword(value: string): boolean {
        return false;
    }
}

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
