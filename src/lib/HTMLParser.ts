import { Lexer, Parser, Token, styles } from './Parser';
import { JavaScriptParser } from './JavaScriptParser';

styles['HTML_DOCTYPE'] = 'html-doctype';
styles['HTML_TAG'] = 'html-tag';
styles['HTML_ATTRIBUTE'] = 'html-attribute';
styles['HTML_ATTRIBUTE_VALUE'] = 'html-attribute-value';
styles['TEXT'] = 'text';

/**
 * Lexer class for HTML, extending the base lexer functionality.
 */
export class HTMLLexer extends Lexer {
    protected inTag: boolean;
    protected tagName: string;
    protected jsParser: JavaScriptParser | null;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.inTag = false;
        this.tagName = '';
        this.jsParser = null;
    }

    /**
     * Gets the next token from the input.
     */
    public nextToken(): Token | null {
        // If we're using a JavaScript parser than use that until we've completed procesing the JavaScript.
        if (this.jsParser) {
            const token = this.jsParser.nextToken();
            if (token) {
                return token;
            }

            this.jsParser = null;
        }

        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'WHITESPACE_OR_NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
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

        // Is this a SCRIPT element?  If it is then we need to switch to a JavaScript parser.
        if (this.tagName.toLowerCase() === 'script') {
            // We need to find the /SCRIPT tag.
            let scriptClose: number = this.input.toLowerCase().indexOf('</script', this.position);
            if (scriptClose === -1) {
                scriptClose = this.input.length;
            }

            this.jsParser = new JavaScriptParser(this.input.slice(this.position, scriptClose));
            this.position = scriptClose;
        }

        // Handle text content between tags.
        return this.readText();
    }

    /**
     * Reads whitespace in the input.
     */
    protected readWhitespace(): Token {
        const start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position]) && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'WHITESPACE_OR_NEWLINE', value: this.input.slice(start, this.position) };
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

        return { type: 'HTML_DOCTYPE', value: this.input.slice(start, this.position) };
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
     * Reads an HTML attribute in the input.
     */
/*
    protected readHtmlAttribute(start: number, end: number): void {
        let position = start;

        while (true) {
            // Skip leading whitespace
            let whitespace = '';
            while (position < end && /\s/.test(this.input[position])) {
                whitespace += this.input[position++];
            }

            if (whitespace.length) {
                this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

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
                this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

            if (this.input[position] !== '=') {
                continue;
            }

            this.tokenStream.push({ type: 'OPERATOR', value: '='})
            position++;

            // Skip whitespace
            whitespace = '';
            while (position < end && /\s/.test(this.input[position])) {
                whitespace += this.input[position++];
            }

            if (whitespace.length) {
                this.tokenStream.push({ type: 'WHITESPACE_OR_NEWLINE', value: whitespace });
            }

            if (position >= end) {
                return;
            }

            const valueFirstChar = this.input[position];
            if (valueFirstChar === '\'' || valueFirstChar === '"') {
                position++;

                let attributeValue = '';
                while (position < end && this.input[position] != valueFirstChar) {
                    attributeValue += this.input[position++];
                }

                if (attributeValue.length) {
                    this.tokenStream.push({
                        type: 'HTML_ATTRIBUTE_VALUE',
                        value: `${valueFirstChar}${attributeValue}${valueFirstChar}` });
                }

                position++;

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
*/

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

    /**§
     * Reads tag content.
     */
    protected readTag(): Token {
        let start = this.position;
        this.tagName = '';
        while (this.position < this.input.length) {
            const char = this.input[this.position];
            if (char === ' ' || char === '>') {
                break;
            }

            this.position++;
            this.tagName += char;
        }

        while (this.position < this.input.length && this.input[this.position] !== '>') {
            this.position++;
        }

        return { type: 'HTML_TAG', value: this.input.slice(start, this.position) };
    }

    isKeyword(value: string): boolean {
        return false;
    }
}

/**
 * HTML parser.
 */
export class HTMLParser extends Parser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new HTMLLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public nextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        return this.lexer.nextToken();
    }
}
