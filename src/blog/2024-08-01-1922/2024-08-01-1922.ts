import {assertIsVElement, h, updateElement, VElement, VNode, VText} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';
import {TypeScriptParser} from '../../lib/TypeScriptParser';
import {highlight} from '../../lib/highlight'
import {cloneObject} from '../../lib/cloneObject';
import {navigateEvent} from '../../app';

const code: VNode[][] = [[], [], []];
let codeVElement: (VElement | null)[] = [null, null, null];
const codeFunction: (() => VElement)[] = [
    blogPrompt_2024_08_01_1922,
    blogSiterenderTS_2024_08_01_1922,
    blogLogicTS_2024_08_01_1922
];

/**
 * Callback to write the contents of the file load for the first code fragment.
 * @param content
 */
function writeCode(segment: number, content: VNode[]) {
    code[segment].push(...content);
    if (codeVElement[segment] === null) {
        return;
    }

    assertIsVElement(codeVElement[segment]);
    if (codeVElement[segment].parentVNode === null) {
        return;
    }

    const parentElem = (codeVElement[segment].parentVNode as VElement).domElement;
    if (parentElem === null) {
        return;
    }

    if (codeVElement[segment].domElement === null) {
        return;
    }

    const index = Array.from(parentElem.childNodes).indexOf(codeVElement[segment].domElement);
    const newVElement = codeFunction[segment]();
    newVElement.parentVNode = codeVElement[segment].parentVNode;
    updateElement(parentElem,
        parentElem.childNodes[index],
        codeVElement[segment].parentVNode as VElement,
        codeVElement[segment],
        newVElement
    );
    codeVElement[segment] = newVElement;
}

async function loadFile(segment: number, filePath: string, storeFunction: (segment: number, content: VNode[]) => void) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const content = await response.text();
        let formattedContent: VNode[];
        if (filePath.endsWith('.ts')) {
            formattedContent = highlight(content, TypeScriptParser);
        } else {
            formattedContent = [new VText(content)];
        }

        storeFunction(segment, formattedContent);
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function blogPrompt_2024_08_01_1922(): VElement {
    let contents: VElement;
    if (code[0].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('div', {className: 'keyword'}, ...cloneObject(code[0]))));
    }

    contents.mountCallback = () => {
        codeVElement[0] = contents;
        if (code[0].length === 0) {
            loadFile(0, '/blog/2024-08-01-1922/prompt.txt', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[0] = null;
    }

    return contents;
}

function blogSiterenderTS_2024_08_01_1922(): VElement {
    let contents: VElement;
    if (code[1].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[1])));
    }

    contents.mountCallback = () => {
        codeVElement[1] = contents;
        if (code[1].length === 0) {
            loadFile(1, '/blog/2024-08-01-1922/siterender.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[1] = null;
    }

    return contents;
}

function blogLogicTS_2024_08_01_1922(): VElement {
    let contents: VElement;
    if (code[2].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[2])));
    }

    contents.mountCallback = () => {
        codeVElement[2] = contents;
        if (code[2].length === 0) {
            loadFile(2, '/blog/2024-08-01-1922/logic.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[2] = null;
    }

    return contents;
}

function blogOpening_2024_08_01_1922(): VElement[] {
    return [
        h('p', {},
            'In my previous blog post, ',
            h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                'Can my tools build tools?  Pre-rendering web pages with help from ChatGPT (2024-07-15)'
            ),
            ', I looked at using ChatGPT to build the core of a new tool.  The results were exciting!'
        )
    ]
}

function blogArticle_2024_08_01_1922(): VElement[] {
    return [
        h('section', {},
            h('img', {
                src: '/blog/2024-08-01-1922/robot.webp',
                alt: 'Image of a robot writing software',
                width: 1024,
                height: 585
            }),
            h('h2', {}, 'A heading'),
            h('p', {},
                'blah...',
            )
        ),
        h('section', {},
            h('h2', {}, 'A quick aside'),
        ),
        h('section', {},
            h('h2', {}, 'Another heading'),
            h('p', {},
                'blan..',
            )
        ),
        h('section', {},
            h('h2', {}, 'The application prompt'),
            blogPrompt_2024_08_01_1922(),
        ),
        h('section', {},
            h('h2', {}, 'The application code'),
            h('p', {}, 'prerender.ts'),
            blogSiterenderTS_2024_08_01_1922(),
            h('p', {}, 'logic.ts'),
            blogLogicTS_2024_08_01_1922(),
        ),
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Project site'),
            h('p', {},
                'The project site for siterender can be found here: ',
                h('a', {href: '/projects/siterender', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender')},
                    'siterender'
                ),
                '.  The site has links to the source code, and notes about how to contribute if you\'re interested.'
            )
        )
    ];
}

function blogPostscript_2024_08_01_1922(): VNode[] {
    return [
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Related articles'),
            h('ul', {},
                h('li', {},
                    h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                        'Can my tools build tools?  Pre-rendering web pages with help from ChatGPT (2024-07-15)'
                    )
                )
            )
        )
    ];
}

export const blogPost_2024_08_01_1922 = new BlogPost(
    'Innovating software development with ChatGPT',
    '2024-08-01T19:22',
    '/blog/2024-08-01-1922',
    'Large language models are set to give us many new ways to build software.  Let\'s look at one such way to use ChatGPT ' +
    'to do something innovative!',
    '/blog/2024-08-01-1922/robot.webp',
    null,
    blogOpening_2024_08_01_1922,
    blogArticle_2024_08_01_1922,
    blogPostscript_2024_08_01_1922
);
