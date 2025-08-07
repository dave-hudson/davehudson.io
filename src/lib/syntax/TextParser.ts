import {Token} from './Lexer'
import {Parser} from './Parser'

/**
 * Text parser that treats each line as a single TEXT token.
 * This is a simplified parser that doesn't require a separate lexer.
 */
export class TextParser extends Parser {
    private input: string;
    private lines: string[];
    private currentLine: number;
    private needsNewline: boolean;

    /**
     * Constructs a text parser.
     * @param input - The input text to parse.
     */
    constructor(input: string) {
        super();
        
        this.input = input;
        this.currentLine = 0;
        this.needsNewline = false;
        
        // Split input into lines while preserving information about line endings
        // Handle different line ending types: \r\n, \r, \n
        this.lines = input.split(/\r\n|\r|\n/);
        
        // Handle edge case: if input ends with a newline, split() will create an empty string at the end
        // If input doesn't end with newline, we don't want to add an extra newline
        // Check if the original input ended with a line ending
        if (input.length > 0 && this.lines.length > 0 && this.lines[this.lines.length - 1] === '') {
            // Input ended with a newline, remove the empty string but remember we need final newlines
            this.lines.pop();
        }
    }

    /**
     * Gets the next token from the input.
     * @returns The next Token available or null if there are no tokens left.
     */
    public getNextToken(): Token | null {
        // If we need to emit a newline token
        if (this.needsNewline) {
            this.needsNewline = false;
            return {type: 'NEWLINE', value: '\n'};
        }

        // If we've processed all lines, return null
        if (this.currentLine >= this.lines.length) {
            return null;
        }

        // Get the current line content
        const lineContent = this.lines[this.currentLine];
        this.currentLine++;

        // After emitting a TEXT token, we need to emit a NEWLINE token next
        // (except for the last line, only emit newline if the original input had one)
        if (this.currentLine < this.lines.length || this.inputEndedWithNewline()) {
            this.needsNewline = true;
        }

        return {type: 'TEXT', value: lineContent};
    }

    /**
     * Determines if the original input ended with a newline character.
     * @returns True if the input ended with a newline, false otherwise.
     */
    private inputEndedWithNewline(): boolean {
        if (this.input.length === 0) {
            return false;
        }
        const lastChar = this.input[this.input.length - 1];
        return lastChar === '\n' || lastChar === '\r';
    }
}
