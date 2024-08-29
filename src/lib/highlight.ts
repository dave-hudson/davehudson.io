import {h, VElement} from './dvdi';
import {Token, Parser, styles} from './syntax'

/**
 * Highlights code using the specified parser.
 * @param code - The code to highlight.
 * @param parserClass - The parser class to use for tokenizing.
 * @returns The highlighted code as HTML.
 */
export function highlight(code: string, parserClass: new (input: string) => Parser): VElement[] {
    let highlightedCode: VElement[] = [];
    const parser = new parserClass(code);
    let token: Token | null;

    while ((token = parser.getNextToken()) !== null) {
        const style = styles[token.type];
        const codeFragment = h('span', style !== null ? {className: style} : {}, `${token.value}`);
        highlightedCode.push(codeFragment);
    }

    return highlightedCode;
}
