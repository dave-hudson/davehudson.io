import {JSONParser} from './JSONParser'

/**
 * Helper to collect all tokens from a parser.
 */
function parseAll(input: string): {type: string, value: string}[] {
    const parser = new JSONParser(input);
    const tokens: {type: string, value: string}[] = [];
    let token = parser.getNextToken();
    while (token) {
        tokens.push(token);
        token = parser.getNextToken();
    }
    return tokens;
}

/**
 * Helper to collect the values of tokens of a given type.
 */
function valuesOf(input: string, type: string): string[] {
    return parseAll(input).filter(t => t.type === type).map(t => t.value);
}

describe('JSONParser', () => {
    describe('object keys', () => {
        it('classifies a simple key as a JSON key', () => {
            expect(valuesOf('{"a": 1}', 'JSON_KEY')).toEqual(['"a"']);
            expect(valuesOf('{"a": 1}', 'STRING')).toEqual([]);
        });

        it('classifies multiple keys as JSON keys', () => {
            expect(valuesOf('{"a": 1, "b": 2}', 'JSON_KEY')).toEqual(['"a"', '"b"']);
        });

        it('classifies keys in a nested object as JSON keys', () => {
            const input = '{"inputs": {"data": "read-bytes"}}';
            expect(valuesOf(input, 'JSON_KEY')).toEqual(['"inputs"', '"data"']);
            expect(valuesOf(input, 'STRING')).toEqual(['"read-bytes"']);
        });

        it('keeps string values as strings', () => {
            expect(valuesOf('{"a": "b"}', 'STRING')).toEqual(['"b"']);
        });
    });

    describe('arrays', () => {
        it('keeps strings in an array as strings, not keys', () => {
            expect(valuesOf('["a", "b"]', 'JSON_KEY')).toEqual([]);
            expect(valuesOf('["a", "b"]', 'STRING')).toEqual(['"a"', '"b"']);
        });

        it('classifies keys of objects inside arrays as JSON keys', () => {
            expect(valuesOf('[{"a": 1}]', 'JSON_KEY')).toEqual(['"a"']);
        });
    });

    describe('values', () => {
        it('classifies numbers and keywords', () => {
            expect(valuesOf('{"a": 1, "b": true, "c": null}', 'NUMBER')).toEqual(['1']);
            expect(valuesOf('{"a": 1, "b": true, "c": null}', 'KEYWORD')).toEqual(['true', 'null']);
        });
    });

    describe('escaped quotes', () => {
        it('does not treat an escaped quote as the end of a string', () => {
            const input = '{"a": "say \\"hi\\""}';
            expect(valuesOf(input, 'JSON_KEY')).toEqual(['"a"']);
            expect(valuesOf(input, 'STRING')).toEqual(['"say \\"hi\\""']);
            expect(valuesOf(input, 'ERROR')).toEqual([]);
        });

        it('handles a key containing an escaped quote', () => {
            const input = '{"a\\"b": 1}';
            expect(valuesOf(input, 'JSON_KEY')).toEqual(['"a\\"b"']);
            expect(valuesOf(input, 'ERROR')).toEqual([]);
        });

        it('handles a JSON document whose values contain Menai code', () => {
            const input = [
                '{',
                '  "id": "mean-rainfall",',
                '  "tool": "menai",',
                '  "inputs": {"data": "read-bytes", "today": "clock"},',
                '  "expression": "(let ((json (import \\"json-decode\\")))',
                '                   (dict \\"mean\\"',
                '                     ((:: json decode) (dict-get inputs \\"data\\"))))",',
                '  "outputs": {"mean": "mean"}',
                '}'
            ].join('\n');

            expect(valuesOf(input, 'JSON_KEY')).toEqual([
                '"id"', '"tool"', '"inputs"', '"data"', '"today"',
                '"expression"', '"outputs"', '"mean"'
            ]);
            expect(valuesOf(input, 'ERROR')).toEqual([]);
        });
    });

    describe('multi-line string values', () => {
        it('accepts a raw newline inside a string value', () => {
            const input = '{"a": "line one\nline two", "b": 1}';
            expect(valuesOf(input, 'ERROR')).toEqual([]);
            expect(valuesOf(input, 'STRING')).toEqual(['"line one\nline two"']);
            expect(valuesOf(input, 'JSON_KEY')).toEqual(['"a"', '"b"']);
        });

        it('accepts a raw tab inside a string value', () => {
            const input = '{"a": "col\tcol", "b": 1}';
            expect(valuesOf(input, 'ERROR')).toEqual([]);
            expect(valuesOf(input, 'STRING')).toEqual(['"col\tcol"']);
        });

        it('keeps lexing the rest of the document after a multi-line string', () => {
            const input = '{\n  "a": "one\ntwo",\n  "b": {"c": 1}\n}';
            expect(valuesOf(input, 'ERROR')).toEqual([]);
            expect(valuesOf(input, 'JSON_KEY')).toEqual(['"a"', '"b"', '"c"']);
            expect(valuesOf(input, 'NUMBER')).toEqual(['1']);
        });
    });

    describe('malformed input', () => {
        it('handles an unterminated string without raising', () => {
            expect(() => parseAll('{"a": "unterminated')).not.toThrow();
        });

        it('handles an unmatched brace without raising', () => {
            expect(() => parseAll('}')).not.toThrow();
        });
    });
});
