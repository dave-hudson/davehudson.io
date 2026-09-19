import {Token} from './Lexer'

/**
 * The kind of list a parenthesis frame represents.
 *
 * Each kind determines whether an identifier appearing at a given element
 * position is a function being called (operator position) or a name in a
 * binding, parameter, field, export, pattern, or namespace context.
 */
export enum FrameKind {
    APPLICATION = 'application',
    BINDING_LIST = 'binding_list',
    BINDING_PAIR = 'binding_pair',
    PARAM_LIST = 'param_list',
    FIELD_LIST = 'field_list',
    EXPORT_LIST = 'export_list',
    MATCH_ARM = 'match_arm',
    PATTERN = 'pattern',
    NAMESPACE_ACCESS = 'namespace_access',
    IMPORT = 'import'
}

/**
 * A single open-parenthesis frame on the call-context stack.
 */
interface Frame {
    kind: FrameKind;
    headKeyword: string | null;
    elementIndex: number;
    quoted: boolean;
}

const BINDING_KEYWORDS = new Set(['let', 'let*', 'letrec']);

/**
 * Classifies identifiers in Menai token streams as function calls.
 *
 * Menai is a Lisp-like language in which the head of an ordinary form is the
 * function being applied.  The head of a special form, and names in binding,
 * parameter, field, export, pattern, and namespace positions, are not calls.
 * This tracker maintains a stack of parenthesis frames so that an identifier
 * in operator position can be retyped to FUNCTION_OR_METHOD, letting function
 * calls stand out from plain identifiers.
 */
export class MenaiCallContext {
    private frames: Frame[];
    private quotePending: boolean;

    /**
     * Constructs a call-context tracker.
     */
    constructor() {
        this.frames = [];
        this.quotePending = false;
    }

    /**
     * Update the context for a single token, retyping it if needed.
     * @param token - The token to process.  An IDENTIFIER in operator position is
     *     retyped in place to FUNCTION_OR_METHOD.
     */
    public processToken(token: Token): void {
        if (token.type === 'WHITESPACE' || token.type === 'NEWLINE' || token.type === 'COMMENT') {
            return;
        }

        if (token.type === 'QUOTE') {
            this.quotePending = true;
            return;
        }

        if (token.type === 'OPERATOR' && token.value === '(') {
            this.pushFrame();
            return;
        }

        if (token.type === 'OPERATOR' && token.value === ')') {
            this.popFrame();
            return;
        }

        this.processElement(token);
    }

    /**
     * Push a new frame for an opening parenthesis.
     */
    private pushFrame(): void {
        const parent = this.frames.length > 0 ? this.frames[this.frames.length - 1] : null;
        const kind = this.frameKindFor(parent);
        const quoted = this.quotePending || this.inQuotedContext(parent);
        this.frames.push({kind, headKeyword: null, elementIndex: 0, quoted});
        this.quotePending = false;

        // A nested list counts as a single element of its parent frame, so the
        // parent's element index advances when the list opens.
        if (parent) {
            parent.elementIndex++;
        }
    }

    /**
     * Pop the innermost frame for a closing parenthesis.
     */
    private popFrame(): void {
        if (this.frames.length > 0) {
            this.frames.pop();
        }

        this.quotePending = false;
    }

    /**
     * Process a non-delimiter token as an element of the current frame.
     * @param token - The token to process.
     */
    private processElement(token: Token): void {
        const frame = this.frames.length > 0 ? this.frames[this.frames.length - 1] : null;

        if (frame) {
            if (this.isOperatorPosition(frame, token)) {
                token.type = 'FUNCTION_OR_METHOD';
            }

            if (frame.elementIndex === 0 && token.type === 'KEYWORD') {
                frame.headKeyword = token.value.toLowerCase();
            }

            frame.elementIndex++;
        }

        this.quotePending = false;
    }

    /**
     * Determine whether a token sits in operator position.
     *
     * A token is in operator position when it is the head of an application
     * frame, is not quoted, and is an identifier.
     * @param frame - The frame the token belongs to.
     * @param token - The token to check.
     * @returns True if the token should be classified as a function call.
     */
    private isOperatorPosition(frame: Frame, token: Token): boolean {
        if (token.type !== 'IDENTIFIER') {
            return false;
        }

        if (frame.quoted) {
            return false;
        }

        return frame.kind === FrameKind.APPLICATION && frame.elementIndex === 0;
    }

    /**
     * Determine whether the current position is inside quoted data.
     * @param parent - The enclosing frame, if any.
     * @returns True if the position is quoted, either because the enclosing frame
     *     is quoted or because it is the quoted child of a quote form.
     */
    private inQuotedContext(parent: Frame | null): boolean {
        if (!parent) {
            return false;
        }

        if (parent.quoted) {
            return true;
        }

        return parent.headKeyword === 'quote' && parent.elementIndex === 1;
    }

    /**
     * Determine the kind of frame an opening parenthesis introduces.
     * @param parent - The enclosing frame, if any.
     * @returns The kind of the new frame.
     */
    private frameKindFor(parent: Frame | null): FrameKind {
        if (!parent) {
            return FrameKind.APPLICATION;
        }

        if (parent.kind === FrameKind.BINDING_LIST) {
            return FrameKind.BINDING_PAIR;
        }

        if (parent.kind === FrameKind.MATCH_ARM) {
            return parent.elementIndex === 0 ? FrameKind.PATTERN : FrameKind.APPLICATION;
        }

        if (parent.kind === FrameKind.PATTERN) {
            return FrameKind.PATTERN;
        }

        if (parent.kind !== FrameKind.APPLICATION) {
            return FrameKind.APPLICATION;
        }

        const keyword = parent.headKeyword;

        if (keyword !== null && BINDING_KEYWORDS.has(keyword) && parent.elementIndex === 1) {
            return FrameKind.BINDING_LIST;
        }

        if (keyword === 'lambda' && parent.elementIndex === 1) {
            return FrameKind.PARAM_LIST;
        }

        if (keyword === 'struct' && parent.elementIndex === 1) {
            return FrameKind.FIELD_LIST;
        }

        if (keyword === 'export' && parent.elementIndex >= 1) {
            return FrameKind.EXPORT_LIST;
        }

        if (keyword === 'match' && parent.elementIndex >= 2) {
            return FrameKind.MATCH_ARM;
        }

        if (keyword === '::' && parent.elementIndex >= 1) {
            return FrameKind.NAMESPACE_ACCESS;
        }

        if (keyword === 'import' && parent.elementIndex >= 1) {
            return FrameKind.IMPORT;
        }

        return FrameKind.APPLICATION;
    }
}
