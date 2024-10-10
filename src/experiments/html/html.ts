import {assertIsVElement, h, updateElement, VElement, VNode} from '../../lib/dvdi';
import {ExperimentPage} from '../ExperimentPage';
import {pageHeader, pageFooter} from '../../lib/page';
import {HTMLParser} from '../../lib/syntax';
import {highlight} from '../../lib/highlight'
import {cloneObject} from '../../lib/cloneObject';

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
    const newVElement = experimentSyntaxHTMLComponent();
    newVElement.parentVNode = codeVElement.parentVNode;
    updateElement(
        parentElem, parentElem.childNodes[index], codeVElement.parentVNode as VElement,
        codeVElement, newVElement
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
        storeFunction(highlight(content, HTMLParser));
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function experimentSyntaxHTMLComponent(): VElement {
    let contents: VElement;
    if (code.length === 0) {
        contents = h('pre', {});
    } else {
        contents =
            h('pre', {},
                h('code', {}, ...cloneObject(code))
            );
    }

    contents.mountCallback = () => {
        codeVElement = contents;
        if (code.length === 0) {
            loadFile('/experiments/html/test.html', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement = null;
    }

    return contents;
}

function experimentSyntaxHTMLPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('article', {},
                h('h1', {}, 'HTML syntax example'),
                experimentSyntaxHTMLComponent()
            ),
        ),
        pageFooter()
    );
}

export const experimentSyntaxHTML = new ExperimentPage(
    '/experiments/html',
    experimentSyntaxHTMLPage
);
