import { Lexer, styles } from './Lexer';
import { JavaScriptLexer } from './JavaScriptLexer';

styles['HTML_DOCTYPE'] = 'html-doctype';
styles['HTML_TAG'] = 'html-tag';
styles['HTML_ATTRIBUTE'] = 'html-attribute';
styles['HTML_ATTRIBUTE_VALUE'] = 'html-attribute-value';
styles['TEXT'] = null;

/**
 * Lexer class for HTML, extending the base lexer functionality.
 */
export class HTMLLexer extends Lexer {
    protected contextStack: string[];
    protected jsLexer: JavaScriptLexer | null;
    protected scriptContentStart: number;

    constructor(input: string) {
        super(input);
        this.contextStack = ['html'];
        this.jsLexer = null;
        this.scriptContentStart = 0;
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): boolean {
        // If we're parsing JavaScript then do the tokenization via the JavaScript lexer.
/*        if (this.jsLexer) {
            const jsToken = this.jsLexer.nextToken();
            if (jsToken) {
                return jsToken;
            }

            this.jsLexer = null;
            this.contextStack.pop();

            // Handle the remaining content after </script>
            this.currentContext = LexerContext.None;
        }
*/
        if (this.position >= this.input.length) {
            return false;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            this.tokenStream.push({ type: 'NEWLINE', value: '\n' });
            return true;
        }

        if (/\s/.test(ch)) {
            this.readWhitespace();
            return true;
        }

        if (this.contextStack[this.contextStack.length - 1] === 'html') {
            if (this.input.startsWith('<!DOCTYPE', this.position)) {
                this.readDoctype();
                return true;
            }

            if (ch === '<' && this.input[this.position + 1] === '!') {
                this.readHtmlComment();
                return true;
            }

            if (ch === '<') {
                this.readHtmlTag();
                return true;
            }
        }

        // Handle text content between tags.
        this.readText();
        return true;
    }

    /**
     * Reads a <!DOCTYPE> declaration in the input.
     * @returns The doctype token.
     */
    protected readDoctype(): void {
        let start = this.position;
        this.position += 9; // Skip "<!DOCTYPE"
        while (this.position < this.input.length && this.input[this.position] !== '>') {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        this.tokenStream.push({ type: 'HTML_DOCTYPE', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an HTML comment in the input.
     * @returns The HTML comment token.
     */
    protected readHtmlComment(): void {
        let start = this.position;
        this.position += 4; // Skip "<!--"
        while (this.position < this.input.length && !(this.input[this.position - 2] === '-' && this.input[this.position - 1] === '-' && this.input[this.position] === '>')) {
            this.position++;
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        this.tokenStream.push({ type: 'COMMENT', value: this.input.slice(start, this.position) });
    }

    /**
     * Reads an HTML tag in the input, including attributes.
     * @returns The HTML tag token.
     */
    protected readHtmlTag(): void {
        this.position++; // Skip '<'
        let tagName = '';

        // Check if this is a closing tag
        const isCloseTag = this.input[this.position] === '/';
        if (isCloseTag) {
            this.position++; // Skip '/'
        }

        while (this.position < this.input.length && /[a-zA-Z0-9]/.test(this.input[this.position])) {
            tagName += this.input[this.position++];
        }

        const tagNameEnd = this.position;
    
        // Now find the '>'
        while (this.position < this.input.length && this.input[this.position] !== '>') {
            this.position++;
        }

        // Check if this is an empty tag.
        const isEmptyTag = this.input[this.position - 1] === '/';
        let tagEnd = this.position;
        if (isEmptyTag) {
            tagEnd--;
        }

        if (this.position < this.input.length) {
            this.position++; // Skip '>'
        }

        this.tokenStream.push({ type: 'OPERATOR_OR_PUNCTUATION', value: isCloseTag ? '</' : '<' });
        this.tokenStream.push({ type: 'HTML_TAG', value: tagName });
        this.readHtmlAttribute(tagNameEnd, tagEnd)
        this.tokenStream.push({ type: 'OPERATOR_OR_PUNCTUATION', value: isEmptyTag ? '/>' : '>' });

//        this.currentContext = LexerContext.Tag;
//        if (tagName.toLowerCase() === 'script' && !isClosingTag) {
//            this.scriptContentStart = this.position;
//            this.contextStack.push('script');
//        }

    }

    /**
     * Reads an HTML attribute in the input.
     * @returns The HTML attribute token.
     */
    protected readHtmlAttribute(start: number, end: number): void {
        let position = start;

        while (true) {
            // Skip leading whitespace
            let whitespace = '';
            while (position < end && /\s/.test(this.input[position])) {
                whitespace += this.input[position++];
            }

            if (whitespace.length) {
                this.tokenStream.push({ type: 'WHITESPACE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

    /*
            if (this.position >= this.input.length || this.input[this.position] === '>') {
                this.currentContext = LexerContext.None; // End of tag
                if (this.input[this.position] === '>') {
                    this.position++; // Skip '>'
                    if (this.contextStack[this.contextStack.length - 1] === 'script') {
                        console.log('JS parse from: ', this.input.slice(this.position));
                        this.jsLexer = new JavaScriptLexer(this.input.slice(this.position));
                    }

                    this.tokenStream.push({ type: 'HTML_TAG', value: whitespace + '>' });
                }

                return;
            }
    */

            let attributeName = '';
            while (position < end && /[\w-]/.test(this.input[position])) {
                attributeName += this.input[position++];
            }

            this.tokenStream.push({ type: 'HTML_ATTRIBUTE', value: attributeName });

            if (position >= end) {
                return;
            }

            // Skip whitespace
            whitespace = '';
            while (position < end && /\s/.test(this.input[position])) {
                whitespace += this.input[position++];
            }

            if (whitespace.length) {
                this.tokenStream.push({ type: 'WHITESPACE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

            if (this.input[position] !== '=') {
                continue;
            }

            this.tokenStream.push({ type: 'OPERATOR_OR_PUNCTUATION', value: '='})
            position++; // Skip '='

            // Skip whitespace
            whitespace = '';
            while (position < end && /\s/.test(this.input[position])) {
                whitespace += this.input[position++];
            }

            if (whitespace.length) {
                this.tokenStream.push({ type: 'WHITESPACE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

            console.log('next char: ', this.input[position]);
            const valueFirstChar = this.input[position];
            if (valueFirstChar === '\'' || valueFirstChar === '"') {
                position++; // Skip over the opening quote.

                let attributeValue = '';
                while (position < end && this.input[position] != valueFirstChar) {
                    attributeValue += this.input[position++];
                }

                if (attributeValue.length) {
                    this.tokenStream.push({
                        type: 'HTML_ATTRIBUTE_VALUE',
                        value: `${valueFirstChar}${attributeValue}${valueFirstChar}` });
                }

                position++; // Skip over the end quote.

                if (position >= end) {
                    return;
                }

                continue;
            }

            let attributeValue = '';
            while (position < end && /[\w-]/.test(this.input[position])) {
                attributeValue += this.input[position++];
            }

            this.tokenStream.push({ type: 'HTML_ATTRIBUTE_VALUE', value: attributeValue });

            if (position >= end) {
                return;
            }
        }
    }

    /**
     * Reads text content between HTML tags.
     * @returns The text token.
     */
    protected readText(): void {
        let start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '<') {
            this.position++;
        }

        if (start === this.position) {
            this.nextToken();
        }

        this.tokenStream.push({ type: 'TEXT', value: this.input.slice(start, this.position) });
    }
}
