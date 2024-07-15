import { h, VNode } from './dvdi';

interface Token {
    type: string;
    value: string;
}

const styles: { [key: string]: string } = {
    KEYWORD: 'keyword',
    IDENTIFIER: 'identifier',
    NUMBER: 'number',
    STRING: 'string',
    COMMENT: 'comment',
    OPERATOR_OR_PUNCTUATION: 'operator',
    PREPROCESSOR: 'preprocessor',
    WHITESPACE: '',
    NEWLINE: '',
};

/**
 * Base class for lexers, providing common functionality.
 */
class BaseLexer {
    protected input: string;
    protected position: number;

    /**
     * Constructs a lexer.
     * @param input - The input code to lex.
     */
    constructor(input: string) {
        this.input = input;
        this.position = 0;
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public nextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '\n') {
            this.position++;
            return { type: 'NEWLINE', value: '\n' };
        }

        if (/\s/.test(ch)) {
            return this.readWhitespace();
        }

        if (this.isLetter(ch)) {
            return this.readIdentifierOrKeyword();
        }

        if (this.isDigit(ch)) {
            return this.readNumber();
        }

        if (ch === '"' || ch === "'") {
            return this.readString(ch);
        }

        if (ch === '/' && this.input[this.position + 1] === '/') {
            return this.readComment();
        }

        if (ch === '/' && this.input[this.position + 1] === '*') {
            return this.readBlockComment();
        }

        if (ch === '#' || (ch === '/' && this.input[this.position + 1] === '/')) {
            return this.readComment();
        }

        return this.readOperatorOrPunctuation();
    }

    /**
     * Reads whitespace in the input.
     * @returns The whitespace token.
     */
    protected readWhitespace(): Token {
        const start = this.position;
        while (this.position < this.input.length && /\s/.test(this.input[this.position]) && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'WHITESPACE', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an identifier or keyword token.
     * @returns The identifier or keyword token.
     */
    protected readIdentifierOrKeyword(): Token {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        return { type, value };
    }

    /**
     * Reads a number token.
     * @returns The number token.
     */
    protected readNumber(): Token {
        const start = this.position;
        while (this.isDigit(this.input[this.position])) {
            this.position++;
        }

        return { type: 'NUMBER', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a string token.
     * @param quote - The quote character used to delimit the string.
     * @returns The string token.
     */
    protected readString(quote: string): Token {
        const start = this.position;
        this.position++; // Skip initial quote
        while (this.position < this.input.length && this.input[this.position] !== quote) {
            if (this.input[this.position] === '\\' && this.position + 1 < this.input.length) {
                this.position++; // Skip escape character
            }

            this.position++;
        }

        this.position++; // Skip closing quote
        return { type: 'STRING', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a comment token.
     * @returns The comment token.
     */
    protected readComment(): Token {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads a block comment token.
     * @returns The block comment token.
     */
    protected readBlockComment(): Token {
        const start = this.position;
        while (this.position < this.input.length && !(this.input[this.position] === '*' && this.input[this.position + 1] === '/')) {
            this.position++;
        }

        this.position += 2; // Skip closing */
        return { type: 'COMMENT', value: this.input.slice(start, this.position) };
    }

    /**
     * Reads an operator or punctuation token.
     * @returns The operator or punctuation token.
     */
    protected readOperatorOrPunctuation(): Token {
        const ch = this.input[this.position++];
        return { type: 'OPERATOR_OR_PUNCTUATION', value: ch };
    }

    /**
     * Determines if a character is a letter.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected isLetter(ch: string): boolean {
        return /[a-zA-Z_$]/.test(ch);
    }

    /**
     * Determines if a character is a digit.
     * @param ch - The character to check.
     * @returns True if the character is a digit, false otherwise.
     */
    protected isDigit(ch: string): boolean {
        return /\d/.test(ch);
    }

    /**
     * Determines if a character is a letter or digit.
     * @param ch - The character to check.
     * @returns True if the character is a letter or digit, false otherwise.
     */
    protected isLetterOrDigit(ch: string): boolean {
        return this.isLetter(ch) || this.isDigit(ch);
    }

    /**
     * Determines if a value is a keyword.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected isKeyword(value: string): boolean {
        return false; // To be overridden by subclasses
    }
}

/**
 * Lexer for JavaScript code.
 */
export class JavaScriptLexer extends BaseLexer {
    /**
     * Determines if a value is a keyword in JavaScript.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'abstract',
            'async',
            'await',
            'boolean',
            'break',
            'byte',
            'case',
            'catch',
            'char',
            'class',
            'const',
            'continue',
            'debugger',
            'default',
            'delete',
            'do',
            'double',
            'else',
            'enum',
            'export',
            'extends',
            'false',
            'final',
            'finally',
            'float',
            'for',
            'from',
            'function',
            'goto',
            'if',
            'implements',
            'import',
            'in',
            'instanceof',
            'int',
            'interface',
            'let',
            'long',
            'native',
            'new',
            'null',
            'package',
            'private',
            'protected',
            'public',
            'return',
            'short',
            'static',
            'super',
            'switch',
            'synchronized',
            'this',
            'throw',
            'throws',
            'transient',
            'true',
            'try',
            'typeof',
            'var',
            'void',
            'volatile',
            'while',
            'with',
            'yield'
        ];
        return keywords.includes(value);
    }
}

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
 * Lexer for Python code.
 */
export class PythonLexer extends BaseLexer {
    /**
     * Determines if a value is a keyword in Python.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'and',
            'as',
            'assert',
            'async',
            'await',
            'break',
            'class',
            'continue',
            'def',
            'del',
            'elif',
            'else',
            'except',
            'False',
            'finally',
            'for',
            'from',
            'global',
            'if',
            'import',
            'in',
            'is',
            'lambda',
            'None',
            'nonlocal',
            'not',
            'or',
            'pass',
            'raise',
            'return',
            'True',
            'try',
            'while',
            'with',
            'yield'
        ];
        return keywords.includes(value);
    }

    /**
     * Determines if a character is a letter in Python.
     * @param ch - The character to check.
     * @returns True if the character is a letter, false otherwise.
     */
    protected override isLetter(ch: string): boolean {
        return /[a-zA-Z_]/.test(ch);
    }
}

/**
 * Lexer for C code.
 */
export class CLexer extends BaseLexer {
    /**
     * Determines if a value is a keyword in C.
     * @param value - The value to check.
     * @returns True if the value is a keyword, false otherwise.
     */
    protected override isKeyword(value: string): boolean {
        const keywords = [
            'auto',
            'break',
            'case',
            'char',
            'const',
            'continue',
            'default',
            'do',
            'double',
            'else',
            'enum',
            'extern',
            'float',
            'for',
            'goto',
            'if',
            'inline',
            'int',
            'long',
            'register',
            'restrict',
            'return',
            'short',
            'signed',
            'sizeof',
            'static',
            'struct',
            'switch',
            'typedef',
            'union',
            'unsigned',
            'void',
            'volatile',
            'while',
            '_Bool',
            '_Complex',
            '_Imaginary'
        ];
        return keywords.includes(value);
    }

    /**
     * Reads an identifier or keyword token in C.
     * @returns The identifier or keyword token.
     */
    protected override readIdentifierOrKeyword(): Token {
        const start = this.position;
        while (this.isLetterOrDigit(this.input[this.position])) {
            this.position++;
        }

        const value = this.input.slice(start, this.position);
        const type = this.isKeyword(value) ? 'KEYWORD' : 'IDENTIFIER';
        return { type, value };
    }

    /**
     * Reads a preprocessor directive token in C.
     * @returns The preprocessor directive token.
     */
    protected readPreprocessorDirective(): Token {
        const start = this.position;
        while (this.position < this.input.length && this.input[this.position] !== '\n') {
            this.position++;
        }

        return { type: 'PREPROCESSOR', value: this.input.slice(start, this.position) };
    }

    /**
     * Gets the next token from the input.
     * @returns The next token, or null if end of input.
     */
    public override nextToken(): Token | null {
        if (this.position >= this.input.length) {
            return null;
        }

        const ch = this.input[this.position];

        if (ch === '#') {
            return this.readPreprocessorDirective();
        }

        return super.nextToken();
    }
}

/**
 * Lexer for C++ code.
 */
export class CppLexer extends CLexer {
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
 * Highlights code using the specified lexer.
 * @param code - The code to highlight.
 * @param lexerClass - The lexer class to use for tokenizing.
 * @returns The highlighted code as HTML.
 */
export function highlight(code: string, lexerClass: new (input: string) => BaseLexer): VNode[] {
    let highlightedCode: VNode[] = [];
    const lexer = new lexerClass(code);
    let token: Token | null;

    while ((token = lexer.nextToken()) !== null) {
        const style = styles[token.type] || '';
        const codeFragment = h('span', { className: style }, `${token.value}`);
        highlightedCode.push(codeFragment);
    }

    return highlightedCode;
}
