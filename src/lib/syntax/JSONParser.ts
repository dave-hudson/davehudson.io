import {Token} from './Lexer'
import {JSONLexer} from './JSONLexer'
import {Parser} from './Parser'

/**
 * Context within JSON structure.
 */
enum JSONContext {
    ROOT = 'root',
    OBJECT = 'object',
    ARRAY = 'array'
}

/**
 * State within JSON parsing.
 */
enum JSONState {
    EXPECTING_KEY = 'expecting_key',
    EXPECTING_VALUE = 'expecting_value',
    EXPECTING_KEY_OR_END = 'expecting_key_or_end',
    EXPECTING_VALUE_OR_END = 'expecting_value_or_end'
}

/**
 * JSON parser.
 * 
 * This parser processes tokens from the JSON lexer and converts STRING tokens
 * to JSON_KEY tokens when they appear in object key positions.
 */
export class JSONParser extends Parser {
    private contextStack: JSONContext[];
    private currentState: JSONState;

    /**
     * Constructs a parser.
     * @param input - The input code to parse.
     */
    constructor(input: string) {
        super();

        this.lexer = new JSONLexer(input);
        this.contextStack = [JSONContext.ROOT];
        this.currentState = JSONState.EXPECTING_VALUE;
    }

    /**
     * Gets the next token from the input.
     * @returns The next Token available or null if there are no tokens left.
     */
    public getNextToken(): Token | null {
        if (!this.lexer) {
            return null;
        }

        const token = this.lexer.getNextToken();
        if (!token) {
            return null;
        }

        // Skip whitespace and newlines for state tracking purposes
        // but still return them for rendering
        if (token.type === 'WHITESPACE' || token.type === 'NEWLINE') {
            return token;
        }

        // Handle structural tokens that affect parsing state
        if (token.type === 'OPERATOR') {
            this.handleOperator(token.value);
            return token;
        }

        // Handle string tokens - convert to JSON_KEY if in key position
        if (token.type === 'STRING') {
            if (this.currentState === JSONState.EXPECTING_KEY || 
                this.currentState === JSONState.EXPECTING_KEY_OR_END) {
                // This string is an object key
                this.currentState = JSONState.EXPECTING_VALUE;
                return {type: 'JSON_KEY', value: token.value};
            } else {
                // This string is a value
                this.updateStateAfterValue();
                return token;
            }
        }

        // Handle other value tokens (numbers, keywords)
        if (token.type === 'NUMBER' || token.type === 'KEYWORD') {
            this.updateStateAfterValue();
            return token;
        }

        // Return all other tokens unchanged (ERROR, etc.)
        return token;
    }

    /**
     * Handle operator tokens and update parsing state accordingly.
     * @param value - The operator value
     */
    private handleOperator(value: string): void {
        switch (value) {
            case '{':
                this.contextStack.push(JSONContext.OBJECT);
                this.currentState = JSONState.EXPECTING_KEY_OR_END;
                break;

            case '}':
                if (this.contextStack.length > 0 && 
                    this.contextStack[this.contextStack.length - 1] === JSONContext.OBJECT) {
                    this.contextStack.pop();
                }
                this.updateStateAfterValue();
                break;

            case '[':
                this.contextStack.push(JSONContext.ARRAY);
                this.currentState = JSONState.EXPECTING_VALUE_OR_END;
                break;

            case ']':
                if (this.contextStack.length > 0 && 
                    this.contextStack[this.contextStack.length - 1] === JSONContext.ARRAY) {
                    this.contextStack.pop();
                }
                this.updateStateAfterValue();
                break;

            case ':':
                this.currentState = JSONState.EXPECTING_VALUE;
                break;

            case ',':
                const currentContext = this.contextStack[this.contextStack.length - 1];
                if (currentContext === JSONContext.OBJECT) {
                    this.currentState = JSONState.EXPECTING_KEY;
                } else if (currentContext === JSONContext.ARRAY) {
                    this.currentState = JSONState.EXPECTING_VALUE;
                } else {
                    this.currentState = JSONState.EXPECTING_VALUE;
                }
                break;
        }
    }

    /**
     * Update the parsing state after processing a value.
     */
    private updateStateAfterValue(): void {
        const currentContext = this.contextStack[this.contextStack.length - 1];

        if (!currentContext || currentContext === JSONContext.ROOT) {
            this.currentState = JSONState.EXPECTING_VALUE;
        } else if (currentContext === JSONContext.OBJECT) {
            this.currentState = JSONState.EXPECTING_KEY_OR_END;
        } else if (currentContext === JSONContext.ARRAY) {
            this.currentState = JSONState.EXPECTING_VALUE_OR_END;
        } else {
            this.currentState = JSONState.EXPECTING_VALUE;
        }
    }
}
