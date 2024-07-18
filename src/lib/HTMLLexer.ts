import { Lexer, Token, styles } from './Lexer';
import { JavaScriptLexer } from './JavaScriptLexer';

styles['HTML_DOCTYPE'] = 'html-doctype';
styles['HTML_TAG'] = 'html-tag';
styles['HTML_ATTRIBUTE'] = 'html-attribute';
styles['HTML_ATTRIBUTE_VALUE'] = 'html-attribute-value';

/**
 * Lexer class for HTML, extending the base lexer functionality.
 */
export class HTMLLexer extends Lexer {
    protected contextStack: string[];
    protected jsLexer: JavaScriptLexer | null;

    constructor(input: string) {
        super(input);
        this.contextStack = ['html'];
        this.jsLexer = null;
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): Token | null {
        if (this.jsLexer) {
            const jsToken = this.jsLexer.nextToken();
            if (jsToken) {
                return jsToken;
            }

            this.jsLexer = null;
            this.contextStack.pop();
        }

        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
            return this.readWhitespace();
        }

        if (this.contextStack[this.contextStack.length - 1] === 'html') {
            if (this.input.startsWith('<!DOCTYPE', this.position)) {
                return this.readDoctype();
            }

            if (ch === '<' && this.input[this.position + 1] === '!') {
                return this.readHtmlComment();
            }

            if (ch === '<') {
                return this.readHtmlTag();
            }
        }

        // Handle non-HTML content if needed
        return super.nextToken();
    }

    /**
     * Reads a <!DOCTYPE> declaration in the input.
     * @returns The doctype token.
     */
    protected readDoctype(): Token {
        let start = this.position;
        this.position += 9; // Skip "<!DOCTYPE"
        while (this.position < this.input.length && this.input[this.position] !== '>') {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        return { type: 'HTML_DOCTYPE', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an HTML comment in the input.
     * @returns The HTML comment token.
     */
    protected readHtmlComment(): Token {
        let start = this.position;
        this.position += 4; // Skip "<!--"
        while (this.position < this.input.length && !(this.input[this.position - 2] === '-' && this.input[this.position - 1] === '-' && this.input[this.position] === '>')) {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an HTML tag in the input, including attributes.
     * @returns The HTML tag token.
     */
    protected readHtmlTag(): Token {
        let start = this.position;
        this.position++; // Skip '<'
        let tagName = '';

        // Check if it's a closing tag
        if (this.input[this.position] === '/') {
            this.position++; // Skip '/'
        }

        while (this.position < this.input.length && /[a-zA-Z]/.test(this.input[this.position])) {
            tagName += this.input[this.position++];
        }

        while (this.position < this.input.length && this.input[this.position] !== '>') {
            if (/\s/.test(this.input[this.position])) {
                this.position++; // Skip whitespace
            } else {
                const attribute = this.readHtmlAttribute();
                if (attribute) {
                    return attribute;
                }
            }
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        if (tagName.toLowerCase() === 'script') {
            this.contextStack.push('script');
            const scriptStartPos = this.position; // Start of the script content
            while (this.position < this.input.length) {
                if (this.input.slice(this.position, this.position + 9).toLowerCase() === '</script>') {
                    const scriptContent = this.input.slice(scriptStartPos, this.position);
                    this.jsLexer = new JavaScriptLexer(scriptContent);
                    this.position += 9; // Skip '</script>'
                    break;
                }
                this.position++;
            }
        }

        return { type: 'HTML_TAG', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an HTML attribute in the input.
     * @returns The HTML attribute token.
     */
    protected readHtmlAttribute(): Token | null {
        let start = this.position;
        while (this.position < this.input.length && /[\w-]/.test(this.input[this.position])) {
            this.position++;
        }

        const attributeName = this.input.slice(start, this.position);

        // Skip any spaces before the '=' sign
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }

        if (this.input[this.position] === '=') {
            this.position++; // Skip '='

            // Skip any spaces before the attribute value
            while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
                this.position++;
            }

            const quote = this.input[this.position];
            if (quote === '"' || quote === "'") {
                start = this.position;
                this.position++; // Skip the opening quote
                while (this.position < this.input.length && this.input[this.position] !== quote) {
                    this.position++;
                }

                this.position++; // Skip the closing quote
                const attributeValue = this.input.slice(start, this.position);
                return { type: 'HTML_ATTRIBUTE', value: `${attributeName}=${attributeValue}` };
            }
        }

        return null; // If no valid attribute is found
    }
}
