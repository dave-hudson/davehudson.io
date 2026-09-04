import {DiffLexer} from './DiffLexer'

/**
 * Helper to collect all tokens from a lexer.
 */
function lexAll(input: string): {type: string, value: string}[] {
    const lexer = new DiffLexer(input);
    const tokens: {type: string, value: string}[] = [];
    let token = lexer.getNextToken();
    while (token) {
        tokens.push(token);
        token = lexer.getNextToken();
    }
    return tokens;
}

describe('DiffLexer', () => {
    describe('unified diff', () => {
        it('lexes a unified diff hunk header', () => {
            const tokens = lexAll('@@ -1,3 +1,4 @@\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '@@ -1,3 +1,4 @@'});
            expect(tokens[1]).toEqual({type: 'NEWLINE', value: '\n'});
        });

        it('lexes added lines', () => {
            const tokens = lexAll('+new line\n');
            expect(tokens[0]).toEqual({type: 'DIFF_ADDED', value: '+new line'});
        });

        it('lexes removed lines', () => {
            const tokens = lexAll('-old line\n');
            expect(tokens[0]).toEqual({type: 'DIFF_REMOVED', value: '-old line'});
        });

        it('lexes context lines', () => {
            const tokens = lexAll(' context\n');
            expect(tokens[0]).toEqual({type: 'TEXT', value: ' context'});
        });

        it('lexes +++ file header as metadata', () => {
            const tokens = lexAll('+++ b/file.ts\n');
            expect(tokens[0]).toEqual({type: 'DIFF_METADATA', value: '+++ b/file.ts'});
        });

        it('lexes --- file header as metadata', () => {
            const tokens = lexAll('--- a/file.ts\n');
            expect(tokens[0]).toEqual({type: 'DIFF_METADATA', value: '--- a/file.ts'});
        });

        it('lexes a full unified diff', () => {
            const input = [
                '--- a/file.ts',
                '+++ b/file.ts',
                '@@ -1,3 +1,4 @@',
                ' old line',
                '-removed line',
                '+added line',
                ' context'
            ].join('\n') + '\n';

            const tokens = lexAll(input);
            const types = tokens.filter(t => t.type !== 'NEWLINE').map(t => t.type);
            expect(types).toEqual([
                'DIFF_METADATA',
                'DIFF_METADATA',
                'DIFF_HEADING',
                'TEXT',
                'DIFF_REMOVED',
                'DIFF_ADDED',
                'TEXT'
            ]);
        });
    });

    describe('context diff', () => {
        it('lexes *** file header as metadata', () => {
            const tokens = lexAll('*** a/file.ts\n');
            expect(tokens[0]).toEqual({type: 'DIFF_METADATA', value: '*** a/file.ts'});
        });

        it('lexes *************** separator as heading', () => {
            const tokens = lexAll('***************\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '***************'});
        });

        it('lexes *** range marker as heading', () => {
            const tokens = lexAll('*** 1,5 ****\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '*** 1,5 ****'});
        });

        it('lexes --- range marker as heading', () => {
            const tokens = lexAll('--- 1,5 ----\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '--- 1,5 ----'});
        });

        it('lexes changed lines', () => {
            const tokens = lexAll('!changed line\n');
            expect(tokens[0]).toEqual({type: 'DIFF_CHANGED', value: '!changed line'});
        });
    });

    describe('normal diff', () => {
        it('lexes a delete command', () => {
            const tokens = lexAll('5d3\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '5d3'});
        });

        it('lexes a range delete command', () => {
            const tokens = lexAll('5,7d3\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '5,7d3'});
        });

        it('lexes an add command', () => {
            const tokens = lexAll('8a10\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '8a10'});
        });

        it('lexes a change command', () => {
            const tokens = lexAll('12,14c15,17\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '12,14c15,17'});
        });

        it('lexes removed lines', () => {
            const tokens = lexAll('<old line\n');
            expect(tokens[0]).toEqual({type: 'DIFF_REMOVED', value: '<old line'});
        });

        it('lexes added lines', () => {
            const tokens = lexAll('>new line\n');
            expect(tokens[0]).toEqual({type: 'DIFF_ADDED', value: '>new line'});
        });

        it('lexes --- separator as heading', () => {
            const tokens = lexAll('---\n');
            expect(tokens[0]).toEqual({type: 'DIFF_HEADING', value: '---'});
        });
    });

    describe('git diff', () => {
        it('lexes diff --git as keyword', () => {
            const tokens = lexAll('diff --git a/file.ts b/file.ts\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'diff --git a/file.ts b/file.ts'});
        });

        it('lexes index as keyword', () => {
            const tokens = lexAll('index abc123..def456 100644\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'index abc123..def456 100644'});
        });

        it('lexes new file mode as keyword', () => {
            const tokens = lexAll('new file mode 100644\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'new file mode 100644'});
        });

        it('lexes deleted file mode as keyword', () => {
            const tokens = lexAll('deleted file mode 100644\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'deleted file mode 100644'});
        });

        it('lexes similarity index as keyword', () => {
            const tokens = lexAll('similarity index 100%\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'similarity index 100%'});
        });

        it('lexes rename from as keyword', () => {
            const tokens = lexAll('rename from oldfile.ts\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'rename from oldfile.ts'});
        });

        it('lexes rename to as keyword', () => {
            const tokens = lexAll('rename to newfile.ts\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'rename to newfile.ts'});
        });

        it('lexes Binary files as keyword', () => {
            const tokens = lexAll('Binary files a/img.png and b/img.png differ\n');
            expect(tokens[0]).toEqual({type: 'KEYWORD', value: 'Binary files a/img.png and b/img.png differ'});
        });
    });

    describe('edge cases', () => {
        it('treats non-diff text as TEXT', () => {
            const tokens = lexAll('This is just some text\n');
            expect(tokens[0]).toEqual({type: 'TEXT', value: 'This is just some text'});
        });

        it('treats a line starting with a digit that is not a command as TEXT', () => {
            const tokens = lexAll('12345 is a number\n');
            expect(tokens[0]).toEqual({type: 'TEXT', value: '12345 is a number'});
        });

        it('handles empty input', () => {
            const tokens = lexAll('');
            expect(tokens).toEqual([]);
        });

        it('handles a single newline', () => {
            const tokens = lexAll('\n');
            expect(tokens).toEqual([{type: 'NEWLINE', value: '\n'}]);
        });

        it('handles CRLF line endings', () => {
            const tokens = lexAll('+added\r\n');
            // The \r is part of the line content
            expect(tokens[0]).toEqual({type: 'DIFF_ADDED', value: '+added\r'});
            expect(tokens[1]).toEqual({type: 'NEWLINE', value: '\n'});
        });
    });
});
