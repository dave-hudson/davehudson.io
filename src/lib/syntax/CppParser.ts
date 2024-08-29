import {Token} from './Parser'
import {CLexer, CParser} from './CParser'

/**
 * Lexer for C++ code.
 */
export class CppLexer extends CLexer {
    /**
     * Reads an operator or punctuation token.
     */
    protected override readOperator(): Token {
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
                return {type: 'OPERATOR', value: operators[i]};
            }
        }

        const ch = this.input[this.position++];
        return {type: 'ERROR', value: ch};
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

/**
 * C++ parser.
 */
export class CppParser extends CParser {
    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super(input);

        this.lexer = new CppLexer(input);
    }

    /**
     * Gets the next token from the input.
     * @returns true if there are any more tokens to process, and false if there are not.
     */
    public override getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        let token: Token | null = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        if (token.type !== 'IDENTIFIER') {
            if (token.type === 'OPERATOR' && (token.value !== '.' && token.value !== '->')) {
                this.inElement = false;
                return token;
            }

            if (token.type !== 'KEYWORD' || token.value !== 'this') {
                return token;
            }
        }

        // Look at the next token.  If it's a '(' operator then we're making a function or method call!
        const curInElement = this.inElement;
        const nextToken: Token | null = this.lexer.peekNextSyntaxToken();
        this.inElement = curInElement;
        let nextInElement = false;
        if (nextToken?.type === 'OPERATOR') {
            if (nextToken.value === '(') {
                this.inElement = false;
                return {type: 'FUNCTION_OR_METHOD', value: token.value};
            }

            // Is the next token going to be an element?
            if (nextToken.value === '.' || nextToken.value === '->') {
                nextInElement = true;
            }
        }

        this.inElement = nextInElement;

        if (curInElement) {
            return {type: 'ELEMENT', value: token.value};
        }

        return token;
    }
}
