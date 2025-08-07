import {assertIsVElement, h, updateElement, VElement, VNode} from '../dvdi';
import {cloneObject} from '../cloneObject';
import {CodeFragmentManager, CodeFragmentConfig} from './CodeFragmentManager';

/**
 * CodeFragment component for displaying syntax-highlighted code
 */
export class CodeFragment {
    private static manager = CodeFragmentManager.getInstance();

    /**
     * Create a single code fragment element
     */
    static create(config: CodeFragmentConfig): VElement {
        return new CodeFragment(config).createElement();
    }

    private config: CodeFragmentConfig;
    private content: VNode[] = [];
    private vElement: VElement | null = null;
    private isLoading = false;

    constructor(config: CodeFragmentConfig) {
        this.config = config;
    }

    /**
     * Create the VElement for this code fragment
     */
    createElement(): VElement {
        const preElement = this.createPreElement();
        
        if (this.config.caption) {
            // Use h() properly so appendChild() is called and parentVNode is set
            return h('figure', {}, preElement, h('figcaption', {}, this.config.caption));
        } else {
            // Return the pre element directly for simpler cases
            return preElement;
        }
    }

    /**
     * Create the pre element with mount/unmount callbacks
     */
    private createPreElement(): VElement {
        const classNames = ['code-fragment'];
        if (this.config.className) {
            classNames.push(this.config.className);
        }

        const preElement = h('pre', {
            className: classNames.join(' ')
        });

        preElement.mountCallback = () => {
            this.vElement = preElement;
            this.loadContent();
        };

        preElement.unmountCallback = () => {
            this.vElement = null;
        };

        return preElement;
    }

    /**
     * Load and display the code content
     */
    private async loadContent(): Promise<void> {
        if (this.isLoading || !this.vElement) {
            return;
        }

        this.isLoading = true;

        try {
            let highlightedContent: VNode[];

            if (this.config.code) {
                // Inline code
                highlightedContent = CodeFragment.manager.highlightInlineCode(
                    this.config.code, 
                    this.config.language
                );
            } else if (this.config.file) {
                // File-based code
                highlightedContent = await CodeFragment.manager.loadCodeFromFile(
                    this.config.file, 
                    this.config.language
                );
            } else {
                throw new Error('CodeFragment requires either "code" or "file" property');
            }

            this.content = highlightedContent;
            this.updateDOM();
        } catch (error) {
            console.error('Error loading code fragment:', error);
            this.content = [h('span', {className: 'error'}, 'Error loading code fragment')];
            this.updateDOM();
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Update the DOM with the loaded content
     */
    private updateDOM(): void {
        if (!this.vElement || !this.vElement.parentVNode) {
            return;
        }

        assertIsVElement(this.vElement.parentVNode);
        const parentElem = this.vElement.parentVNode.domElement;
        
        if (!parentElem || !this.vElement.domElement) {
            return;
        }

        const index = Array.from(parentElem.childNodes).indexOf(this.vElement.domElement);
        const newVElement = this.createUpdatedPreElement();
        newVElement.parentVNode = this.vElement.parentVNode;

        updateElement(
            parentElem,
            parentElem.childNodes[index],
            this.vElement.parentVNode,
            this.vElement,
            newVElement
        );

        this.vElement = newVElement;
    }

    /**
     * Create an updated pre element with content
     */
    private createUpdatedPreElement(): VElement {
        const classNames = ['code-fragment'];
        if (this.config.className) {
            classNames.push(this.config.className);
        }

        const codeElement = h('code', {}, ...cloneObject(this.content));
        const preElement = h('pre', {
            className: classNames.join(' ')
        }, codeElement);

        preElement.mountCallback = () => {
            this.vElement = preElement;
        };

        preElement.unmountCallback = () => {
            this.vElement = null;
        };

        return preElement;
    }
}