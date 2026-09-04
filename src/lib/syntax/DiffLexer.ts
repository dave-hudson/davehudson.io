import {Lexer, styles} from './Lexer'

// Register diff-specific styles
styles['DIFF_HEADING'] = 'diff-heading';
styles['DIFF_METADATA'] = 'diff-metadata';
styles['DIFF_ADDED'] = 'diff-added';
styles['DIFF_REMOVED'] = 'diff-removed';
styles['DIFF_CHANGED'] = 'diff-changed';

/**
 * Lexer for diff/patch files.
 *
 * Handles unified, context, normal, and git-enhanced diff formats.
 * Diff files are line-oriented, so each line is classified by its
 * leading characters and emitted as a single token.
 */
export class DiffLexer extends Lexer {
    /**
     * Constructs a lexer.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);
    }

    /**
     * Get the lexing function that matches a given start character.
     * Not used since we override lexTokens() for line-oriented processing.
     * @param ch - The start character
     * @returns the lexing function
     */
    protected override getLexingFunction(ch: string): () => void {
        return () => {};
    }

    /**
     * Lex all the tokens in the input.
     * Diff files are line-oriented, so we process line by line.
     */
    protected override lexTokens(): void {
        while (this.position < this.input.length) {
            const ch = this.input[this.position];

            if (ch === '\n') {
                this.readNewline();
                continue;
            }

            // Read the entire line (up to but not including the newline)
            const start = this.position;
            while (this.position < this.input.length && this.input[this.position] !== '\n') {
                this.position++;
            }
            const line = this.input.slice(start, this.position);

            this.classifyLine(line);
        }
    }

    /**
     * Classify a line and emit the appropriate token.
     * @param line - The line content (without trailing newline)
     */
    private classifyLine(line: string): void {
        // Unified diff hunk header: @@ -start,count +start,count @@ optional context
        if (line.startsWith('@@')) {
            this.tokens.push({type: 'DIFF_HEADING', value: line});
            return;
        }

        // +++ file header (unified/git diff)
        if (line.startsWith('+++')) {
            this.tokens.push({type: 'DIFF_METADATA', value: line});
            return;
        }

        // + added line (unified/context diff)
        if (line.startsWith('+')) {
            this.tokens.push({type: 'DIFF_ADDED', value: line});
            return;
        }

        // --- line: could be file header, separator, or range marker
        if (line.startsWith('---')) {
            // Context diff range marker: "--- N,M ----"
            if (line.includes(' ----') || line.endsWith('----')) {
                this.tokens.push({type: 'DIFF_HEADING', value: line});
                return;
            }

            // Check if there's a filename (file header) or just separator
            const rest = line.slice(3).trim();
            if (rest) {
                // File header (has content after ---)
                this.tokens.push({type: 'DIFF_METADATA', value: line});
                return;
            }

            // Separator line (normal diff)
            this.tokens.push({type: 'DIFF_HEADING', value: line});
            return;
        }

        // - removed line (unified/context diff)
        if (line.startsWith('-')) {
            this.tokens.push({type: 'DIFF_REMOVED', value: line});
            return;
        }

        // *************** separator (context diff)
        if (line.startsWith('***************')) {
            this.tokens.push({type: 'DIFF_HEADING', value: line});
            return;
        }

        // *** line: could be file header or range marker (context diff)
        if (line.startsWith('***')) {
            // Range marker: "*** N,M ****"
            if (line.includes(' ****') || line.endsWith('****')) {
                this.tokens.push({type: 'DIFF_HEADING', value: line});
                return;
            }

            // File header
            this.tokens.push({type: 'DIFF_METADATA', value: line});
            return;
        }

        // ! changed line (context diff)
        if (line.startsWith('!')) {
            this.tokens.push({type: 'DIFF_CHANGED', value: line});
            return;
        }

        // < removed line (normal diff)
        if (line.startsWith('<')) {
            this.tokens.push({type: 'DIFF_REMOVED', value: line});
            return;
        }

        // > added line (normal diff)
        if (line.startsWith('>')) {
            this.tokens.push({type: 'DIFF_ADDED', value: line});
            return;
        }

        // Space-prefixed context line (unified/context diff)
        if (line.startsWith(' ')) {
            this.tokens.push({type: 'TEXT', value: line});
            return;
        }

        // Normal diff command or text starting with a digit
        if (this.isDigit(line[0])) {
            if (this.isNormalDiffCommand(line)) {
                this.tokens.push({type: 'DIFF_HEADING', value: line});
                return;
            }
            this.tokens.push({type: 'TEXT', value: line});
            return;
        }

        // Git/metadata keywords
        if (line.startsWith('diff ') ||
            line.startsWith('index ') ||
            line.startsWith('new file mode') ||
            line.startsWith('deleted file mode') ||
            line.startsWith('similarity index') ||
            line.startsWith('rename from') ||
            line.startsWith('rename to') ||
            line.startsWith('Binary files')) {
            this.tokens.push({type: 'KEYWORD', value: line});
            return;
        }

        // Default: treat as text
        this.tokens.push({type: 'TEXT', value: line});
    }

    /**
     * Determines if a line is a normal diff command.
     * Pattern: N(,N)?[adc]N(,N)?
     * Examples: 5d3, 5,7d3, 8a10, 8a10,12, 12c15, 12,14c15,17
     * @param line - The line to check
     * @returns True if the line is a normal diff command, false otherwise
     */
    private isNormalDiffCommand(line: string): boolean {
        let pos = 0;

        // Read first number or range
        while (pos < line.length && this.isDigit(line[pos])) {
            pos++;
        }

        if (pos < line.length && line[pos] === ',') {
            pos++;
            while (pos < line.length && this.isDigit(line[pos])) {
                pos++;
            }
        }

        // Check for command character
        if (pos < line.length && (line[pos] === 'a' || line[pos] === 'd' || line[pos] === 'c')) {
            pos++;

            // Read second number or range
            while (pos < line.length && this.isDigit(line[pos])) {
                pos++;
            }

            if (pos < line.length && line[pos] === ',') {
                pos++;
                while (pos < line.length && this.isDigit(line[pos])) {
                    pos++;
                }
            }

            // If we've consumed most/all of the line, it's a command
            const remaining = line.slice(pos).trim();
            if (!remaining) {
                return true;
            }
        }

        return false;
    }
}
