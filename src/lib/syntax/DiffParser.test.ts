import {DiffParser} from './DiffParser'

describe('DiffParser', () => {
    it('returns tokens from the diff lexer', () => {
        const parser = new DiffParser('@@ -1,3 +1,4 @@\n+added\n-removed\n');
        const tokens: {type: string, value: string}[] = [];
        let token = parser.getNextToken();
        while (token) {
            tokens.push(token);
            token = parser.getNextToken();
        }

        expect(tokens).toEqual([
            {type: 'DIFF_HEADING', value: '@@ -1,3 +1,4 @@'},
            {type: 'NEWLINE', value: '\n'},
            {type: 'DIFF_ADDED', value: '+added'},
            {type: 'NEWLINE', value: '\n'},
            {type: 'DIFF_REMOVED', value: '-removed'},
            {type: 'NEWLINE', value: '\n'}
        ]);
    });

    it('returns null when there are no more tokens', () => {
        const parser = new DiffParser('');
        expect(parser.getNextToken()).toBeNull();
    });
});
