import {VNode} from '../dvdi';
import {highlight} from '../highlight';
import {
    CParser, CppParser, CSSParser, HTMLParser, JavaScriptParser, TypeScriptParser, PythonParser, MetaphorParser, Parser
} from '../syntax';

/**
 * Cache entry for loaded code fragments
 */
interface CodeFragmentCache {
    content: VNode[];
    loadPromise?: Promise<VNode[]>;
}

/**
 * Configuration for a code fragment
 */
export interface CodeFragmentConfig {
    file?: string;
    code?: string;
    language: string;
    caption?: string;
    className?: string;
    showLineNumbers?: boolean;
}

/**
 * Global manager for code fragment loading and caching
 */
export class CodeFragmentManager {
    private static instance: CodeFragmentManager;
    private cache = new Map<string, CodeFragmentCache>();

    private constructor() {}

    static getInstance(): CodeFragmentManager {
        if (!CodeFragmentManager.instance) {
            CodeFragmentManager.instance = new CodeFragmentManager();
        }
        return CodeFragmentManager.instance;
    }

    /**
     * Get the appropriate parser for a language
     */
    private getParserForLanguage(language: string): new (input: string) => Parser {
        switch (language.toLowerCase()) {
            case 'c':
                return CParser;

            case 'c++':
                return CppParser;

            case 'css':
                return CSSParser;

            case 'HTML':
                return HTMLParser;

            case 'javascript':
                return JavaScriptParser;

            case 'metaphor':
                return MetaphorParser;

            case 'python':
                return PythonParser;

            case 'typescript':
                return TypeScriptParser;

            default:
                return JavaScriptParser; // Default fallback
        }
    }

    /**
     * Load and highlight code from a file
     */
    async loadCodeFromFile(filePath: string, language: string): Promise<VNode[]> {
        const cacheKey = `${filePath}:${language}`;
        const cached = this.cache.get(cacheKey);

        if (cached) {
            if (cached.content.length > 0) {
                return cached.content; // Already loaded, return content
            }
            if (cached.loadPromise) {
                return await cached.loadPromise; // ✅ FIXED: Await the promise
            }
        }

        const loadPromise = this.fetchAndHighlight(filePath, language);
        this.cache.set(cacheKey, { content: [], loadPromise });

        try {
            const content = await loadPromise;
            this.cache.set(cacheKey, { content }); // Cache the result
            return content;
        } catch (error) {
            this.cache.delete(cacheKey); // Clear failed attempt
            throw error;
        }
    }

    /**
     * Highlight inline code
     */
    highlightInlineCode(code: string, language: string): VNode[] {
        const cacheKey = `inline:${this.hashString(code)}:${language}`;
        const cached = this.cache.get(cacheKey);

        if (cached && cached.content.length > 0) {
            return cached.content;
        }

        const parser = this.getParserForLanguage(language);
        const content = highlight(code, parser);
        this.cache.set(cacheKey, { content });
        return content;
    }

    /**
     * Fetch file content and highlight it
     */
    private async fetchAndHighlight(filePath: string, language: string): Promise<VNode[]> {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.statusText}`);
            }

            const content = await response.text();
            const parser = this.getParserForLanguage(language);
            return highlight(content, parser);
        } catch (error) {
            console.error(`Error loading code fragment from ${filePath}:`, error);
            throw error;
        }
    }

    /**
     * Simple hash function for cache keys
     */
    private hashString(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }

    /**
     * Clear the cache (useful for development)
     */
    clearCache(): void {
        this.cache.clear();
    }
}