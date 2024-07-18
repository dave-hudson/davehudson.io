import { assertIsVElement, h, updateElement, VElement, VNode } from '../../lib/dvdi';
import { ExperimentPage } from '../ExperimentPage';
import { pageHeader, pageFooter } from '../../lib/page';
import { CLexer } from '../../lib/CLexer';
import { highlight } from '../../lib/highlight'
import { cloneObject } from '../../lib/cloneObject';

const code: VNode[] = [];
let codeVElement: (VElement | null) = null;

/**
 * Callback to write the contents of the file load for the first code fragment.
 * @param content
 */
function writeCode(content: VElement[]) {
    code.push(...content);
    if (codeVElement === null) {
        return;
    }

    assertIsVElement(codeVElement);
    if (codeVElement.parentVNode === null) {
        return;
    }

    const parentElem = (codeVElement.parentVNode as VElement).domElement;
    if (parentElem === null) {
        return;
    }

    if (codeVElement.domElement === null) {
        return;
    }

    const index = Array.from(parentElem.childNodes).indexOf(codeVElement.domElement);
    const newVElement = experimentSyntaxCComponent();
    newVElement.parentVNode = codeVElement.parentVNode;
    updateElement(parentElem,
        parentElem.childNodes[index],
        codeVElement.parentVNode as VElement,
        codeVElement,
        newVElement
    );
    codeVElement = newVElement;
}

async function loadFile(filePath: string, storeFunction: (content: VElement[]) => void) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const content = await response.text();
        storeFunction(highlight(content, CLexer));
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function experimentSyntaxCComponent(): VElement {
    const cloneCode = cloneObject(code);
    const contents = h('pre', {},
        h('code', {}, ...cloneCode)
    );

    contents.mountCallback = () => {
        codeVElement = contents;
        console.log('mounted');
        if (code.length === 0) {
            loadFile('/experiments/c/test.c', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement = null;
        console.log('unmounted');
    }

    return contents;
}

function experimentSyntaxCPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('article', {},
                h('h1', {}, 'C syntax example'),
                experimentSyntaxCComponent()
            ),
        ),
        pageFooter()
    );
}

export const experimentSyntaxC = new ExperimentPage(
    '/experiments/c',
    experimentSyntaxCPage
);
