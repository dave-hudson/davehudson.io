import {CLexer} from './CLexer'

/**
 * Lexer for C++ code.
 */
export class CppLexer extends CLexer {
    /**
     * Reads an operator or punctuation token.
     */
    protected override readOperator(): void {
        const operators = [
            '>>=',
            '<<=',
            '&&=',
            '||=',
            '!=',
            '==',
            '+=',
            '-=',
            '*=',
            '/=',
            '%=',
            '&=',
            '|=',
            '^=',
            '<=',
            '>=',
            '&&',
            '||',
            '<<',
            '>>',
            '++',
            '--',
            '->',
            '::',
            '+',
            '-',
            '*',
            '/',
            '%',
            '&',
            '~',
            '!',
            '|',
            '^',
            '=',
            '<',
            '>',
            '(',
            ')',
            '{',
            '}',
            '[',
            ']',
            ';',
            ':',
            '?',
            '.',
            ','
        ];

        for (let i = 0; i < operators.length; i++) {
            if (this.input.startsWith(operators[i], this.position)) {
                this.position += operators[i].length;
                this.tokens.push({type: 'OPERATOR', value: operators[i]});
                return;
            }
        }

        const ch = this.input[this.position++];
        this.tokens.push({type: 'ERROR', value: ch});
    }

    /**
     * Determines if a value is a keyword in C++.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'alignas',
            'alignof',
            'and',
            'and_eq',
            'asm',
            'atomic_cancel',
            'atomic_commit',
            'atomic_noexcept',
            'auto',
            'bitand',
            'bitor',
            'bool',
            'break',
            'case',
            'catch',
            'char',
            'char16_t',
            'char32_t',
            'class',
            'compl',
            'concept',
            'const',
            'const_cast',
            'consteval',
            'constexpr',
            'constinit',
            'continue',
            'co_await',
            'co_return',
            'co_yield',
            'decltype',
            'default',
            'delete',
            'do',
            'double',
            'dynamic_cast',
            'else',
            'enum',
            'explicit',
            'export',
            'extern',
            'false',
            'float',
            'for',
            'friend',
            'goto',
            'if',
            'inline',
            'int',
            'long',
            'mutable',
            'namespace',
            'new',
            'noexcept',
            'not',
            'not_eq',
            'nullptr',
            'operator',
            'or',
            'or_eq',
            'private',
            'protected',
            'public',
            'register',
            'reinterpret_cast',
            'requires',
            'return',
            'short',
            'signed',
            'sizeof',
            'static',
            'static_assert',
            'static_cast',
            'struct',
            'switch',
            'template',
            'this',
            'thread_local',
            'throw',
            'true',
            'try',
            'typedef',
            'typeid',
            'typename',
            'union',
            'unsigned',
            'using',
            'virtual',
            'void',
            'volatile',
            'wchar_t',
            'while',
            'xor',
            'xor_eq'
        ];
        return keywords.includes(value);
    }
}
