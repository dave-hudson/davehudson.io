import {MenaiParser} from './MenaiParser'

/**
 * Helper to collect all tokens from a parser.
 */
function parseAll(input: string): {type: string, value: string}[] {
    const parser = new MenaiParser(input);
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

describe('MenaiParser', () => {
    describe('function call classification', () => {
        it('classifies the head of a simple call as a function', () => {
            expect(valuesOf('(foo x y)', 'FUNCTION_OR_METHOD')).toEqual(['foo']);
            expect(valuesOf('(foo x y)', 'IDENTIFIER')).toEqual(['x', 'y']);
        });

        it('classifies symbolic operators in head position as functions', () => {
            expect(valuesOf('(+ 1 2)', 'FUNCTION_OR_METHOD')).toEqual(['+']);
        });

        it('classifies nested call heads as functions', () => {
            expect(valuesOf('(foo (bar x) (baz y))', 'FUNCTION_OR_METHOD')).toEqual(['foo', 'bar', 'baz']);
        });

        it('does not classify a top-level atom as a function', () => {
            expect(valuesOf('foo', 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf('foo', 'IDENTIFIER')).toEqual(['foo']);
        });
    });

    describe('binding forms', () => {
        it('does not classify let binding names as functions', () => {
            const input = '(let ((x 5) (y 6)) (foo x y))';
            expect(valuesOf(input, 'FUNCTION_OR_METHOD')).toEqual(['foo']);
            expect(valuesOf(input, 'IDENTIFIER')).toEqual(['x', 'y', 'x', 'y']);
        });

        it('classifies calls in let binding values', () => {
            expect(valuesOf('(let ((x (foo)) (y (bar))) x)', 'FUNCTION_OR_METHOD')).toEqual(['foo', 'bar']);
        });

        it('does not classify lambda parameters as functions', () => {
            const input = '(lambda (x y) (foo x y))';
            expect(valuesOf(input, 'FUNCTION_OR_METHOD')).toEqual(['foo']);
            expect(valuesOf(input, 'IDENTIFIER')).toEqual(['x', 'y', 'x', 'y']);
        });

        it('does not classify struct field names as functions', () => {
            expect(valuesOf('(struct (x y))', 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf('(struct (x y))', 'IDENTIFIER')).toEqual(['x', 'y']);
        });

        it('does not classify export names as functions', () => {
            expect(valuesOf('(export square cube)', 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf('(export square cube)', 'IDENTIFIER')).toEqual(['square', 'cube']);
        });
    });

    describe('module system', () => {
        it('recognises :: as a keyword', () => {
            expect(valuesOf('(:: math square)', 'KEYWORD')).toEqual(['::']);
        });

        it('does not classify namespace operands as functions', () => {
            const input = '(:: math square)';
            expect(valuesOf(input, 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf(input, 'IDENTIFIER')).toEqual(['math', 'square']);
        });

        it('recognises export as a keyword', () => {
            expect(valuesOf('(export foo)', 'KEYWORD')).toEqual(['export']);
        });
    });

    describe('pattern matching', () => {
        it('does not classify match patterns as functions', () => {
            const input = '(match x ((a b c) (foo a b c)) (_ 0))';
            expect(valuesOf(input, 'FUNCTION_OR_METHOD')).toEqual(['foo']);
        });

        it('classifies calls in match results as functions', () => {
            const input = '(match x ((? integer? n) (foo n)) (_ (bar)))';
            expect(valuesOf(input, 'FUNCTION_OR_METHOD')).toEqual(['foo', 'bar']);
        });
    });

    describe('quoted data', () => {
        it('does not classify a quoted symbol as a function', () => {
            expect(valuesOf("'foo", 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf("'foo", 'IDENTIFIER')).toEqual(['foo']);
        });

        it('does not classify the head of a quoted list as a function', () => {
            expect(valuesOf("'(foo bar)", 'FUNCTION_OR_METHOD')).toEqual([]);
            expect(valuesOf("'(foo bar)", 'IDENTIFIER')).toEqual(['foo', 'bar']);
        });

        it('does not classify the contents of a quote form as functions', () => {
            expect(valuesOf('(quote (foo bar))', 'FUNCTION_OR_METHOD')).toEqual([]);
        });
    });

    describe('malformed input', () => {
        it('handles an unclosed form without raising', () => {
            expect(valuesOf('(let ((x', 'FUNCTION_OR_METHOD')).toEqual([]);
        });

        it('handles an unmatched close paren without raising', () => {
            expect(valuesOf(')) foo', 'IDENTIFIER')).toEqual(['foo']);
        });
    });
});
