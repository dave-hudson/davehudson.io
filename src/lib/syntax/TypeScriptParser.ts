import {JavaScriptLexer, JavaScriptParser} from './JavaScriptParser'

/**
 * Lexer for TypeScript code.
 */
export class TypeScriptLexer extends JavaScriptLexer {
    /**
     * Determines if a value is a keyword in TypeScript.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'abstract',
            'any',
            'as',
            'asserts',
            'async',
            'await',
            'bigint',
            'boolean',
            'break',
            'case',
            'catch',
            'class',
            'const',
            'continue',
            'debugger',
            'declare',
            'default',
            'delete',
            'do',
            'else',
            'enum',
            'export',
            'extends',
            'false',
            'finally',
            'for',
            'from',
            'function',
            'get',
            'if',
            'implements',
            'import',
            'in',
            'infer',
            'instanceof',
            'interface',
            'is',
            'keyof',
            'let',
            'module',
            'namespace',
            'new',
            'null',
            'number',
            'object',
            'of',
            'private',
            'protected',
            'public',
            'readonly',
            'return',
            'require',
            'set',
            'static',
            'string',
            'super',
            'switch',
            'symbol',
            'this',
            'throw',
            'true',
            'try',
            'type',
            'typeof',
            'unique',
            'unknown',
            'var',
            'void',
            'while',
            'with',
            'yield'
        ];
        return keywords.includes(value);
    }
}

/**
 * TypeScript parser.
 */
export class TypeScriptParser extends JavaScriptParser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.lexer = new TypeScriptLexer(input);
    }
}
