import { JavaScriptParser } from './JavaScriptParser'

/**
 * Parser for TypeScript code.
 */
export class TypeScriptParser extends JavaScriptParser {
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
