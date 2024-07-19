import { Lexer, Token, styles } from './Lexer';
import { JavaScriptLexer } from './JavaScriptLexer';

styles['HTML_DOCTYPE'] = 'html-doctype';
styles['HTML_TAG'] = 'html-tag';
styles['HTML_ATTRIBUTE'] = 'html-attribute';
styles['HTML_ATTRIBUTE_VALUE'] = 'html-attribute-value';
styles['TEXT'] = null;

enum LexerContext {
    None,
    Tag,
    Attribute
}

/**
 * Lexer class for HTML, extending the base lexer functionality.
 */
export class HTMLLexer extends Lexer {
    protected contextStack: string[];
    protected jsLexer: JavaScriptLexer | null;
    protected currentContext: LexerContext;
    protected scriptContentStart: number;

    constructor(input: string) {
        super(input);
        this.contextStack = ['html'];
        this.jsLexer = null;
        this.currentContext = LexerContext.None;
        this.scriptContentStart = 0;
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): Token | null {
        // If we're parsing JavaScript then do the tokenization via the JavaScript lexer.
        if (this.jsLexer) {
            const jsToken = this.jsLexer.nextToken();
            if (jsToken) {
                return jsToken;
            }

            this.jsLexer = null;
            this.contextStack.pop();

            // Handle the remaining content after </script>
            this.currentContext = LexerContext.None;
        }

        if (this.position >= this.input.length) {
            return null;
        }

        switch (this.currentContext) {
            case LexerContext.Tag:
                return this.readHtmlAttribute();

            case LexerContext.Attribute:
                return this.readHtmlAttributeValue();

            default:
                break;
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

        // Handle text content between tags.
        return this.readText();
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
//        let start = this.position;
        this.position++; // Skip '<'
        let tagName = '';

        // Check if it's a closing tag
        const isClosingTag = this.input[this.position] === '/';
        if (isClosingTag) {
            this.position++; // Skip '/'
        }

        while (this.position < this.input.length && /[a-zA-Z0-9]/.test(this.input[this.position])) {
            tagName += this.input[this.position++];
        }

        this.currentContext = LexerContext.Tag;
        if (tagName.toLowerCase() === 'script' && !isClosingTag) {
            this.scriptContentStart = this.position;
            this.contextStack.push('script');
        }

        return { type: 'HTML_TAG', value: `<${isClosingTag ? '/' : ''}${tagName}` };
    }

    /**
     * Reads an HTML attribute in the input.
     * @returns The HTML attribute token.
     */
    protected readHtmlAttribute(): Token | null {
        // Skip leading whitespace
        let start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }
        const whitespace = this.input.slice(start, this.position);

        if (this.position >= this.input.length || this.input[this.position] === '>') {
            this.currentContext = LexerContext.None; // End of tag
            if (this.input[this.position] === '>') {
                this.position++; // Skip '>'
                if (this.contextStack[this.contextStack.length - 1] === 'script') {
                    console.log('JS parse from: ', this.input.slice(this.position));
                    this.jsLexer = new JavaScriptLexer(this.input.slice(this.position));
                }

                return { type: 'HTML_TAG', value: whitespace + '>' };
            }

            return null;
        }

        start = this.position;
        while (this.position < this.input.length && /[\w-]/.test(this.input[this.position])) {
            this.position++;
        }

        const attributeName = this.input.slice(start, this.position);

        // Skip any spaces before the '=' sign
        let spacesBeforeEqual = '';
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            spacesBeforeEqual += this.input[this.position++];
        }

        if (this.position < this.input.length && this.input[this.position] === '=') {
            this.position++; // Skip '='

            this.currentContext = LexerContext.Attribute;
            return {
                type: 'HTML_ATTRIBUTE',
                value: `${whitespace}${attributeName}${spacesBeforeEqual}=`
            };
        }

        return {
            type: 'HTML_ATTRIBUTE',
            value: `${whitespace}${attributeName}` // Attribute without value
        };
    }

    /**
     * Reads an HTML attribute value in the input.
     * @returns The HTML attribute value token.
     */
    protected readHtmlAttributeValue(): Token | null {
        // Skip leading whitespace
        let start = this.position;
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

            if (this.position < this.input.length) {
                this.position++; // Skip the closing quote
            }

            this.currentContext = LexerContext.Tag;
            return { type: 'HTML_ATTRIBUTE_VALUE', value: this.input.slice(start, this.position) };
        }

        this.currentContext = LexerContext.Tag;
        return null;
    }

    /**
     * Reads text content between HTML tags.
     * @returns The text token.
     */
    protected readText(): Token | null {
        let start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '<') {
            this.position++;
        }

        if (start === this.position) {
            return this.nextToken();
        }

        return { type: 'TEXT', value: this.input.slice(start, this.position) };
    }
}
