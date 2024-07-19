
import { h, VElement } from './dvdi';
import { Token, Lexer, styles } from './Lexer'

/**
 * Highlights code using the specified lexer.
 * @param code - The code to highlight.
 * @param lexerClass - The lexer class to use for tokenizing.
 * @returns The highlighted code as HTML.
 */
export function highlight(code: string, lexerClass: new (input: string) => Lexer): VElement[] {
    let highlightedCode: VElement[] = [];
    const lexer = new lexerClass(code);
    lexer.generateTokens();
    let token: Token | null;

    while ((token = lexer.getToken()) !== null) {
        const style = styles[token.type];
        const codeFragment = h('span', style !== null ? { className: style } : {}, `${token.value}`);
        highlightedCode.push(codeFragment);
    }

    return highlightedCode;
}
