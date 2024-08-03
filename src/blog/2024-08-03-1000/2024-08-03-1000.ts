import {assertIsVElement, h, updateElement, VElement, VNode, VText} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';
import {TypeScriptParser} from '../../lib/TypeScriptParser';
import {highlight} from '../../lib/highlight'
import {cloneObject} from '../../lib/cloneObject';
import {navigateEvent} from '../../app';

const code: VNode[][] = [[], [], [], []];
let codeVElement: (VElement | null)[] = [null, null, null, null];
const codeFunction: (() => VElement)[] = [
    blogOrigPrompt_2024_08_03_1000,
    blogPrompt_2024_08_03_1000,
    blogSiterenderTS_2024_08_03_1000,
    blogLogicTS_2024_08_03_1000
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

function blogOrigPrompt_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[0].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('div', {className: 'text'}, ...cloneObject(code[0]))));
    }

    contents.mountCallback = () => {
        codeVElement[0] = contents;
        if (code[0].length === 0) {
            loadFile(0, '/blog/2024-08-03-1000/orig-prompt.txt', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[0] = null;
    }

    return contents;
}

function blogPrompt_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[1].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('div', {className: 'text'}, ...cloneObject(code[1]))));
    }

    contents.mountCallback = () => {
        codeVElement[1] = contents;
        if (code[1].length === 0) {
            loadFile(1, '/blog/2024-08-03-1000/prompt.txt', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[1] = null;
    }

    return contents;
}

function blogSiterenderTS_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[2].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[2])));
    }

    contents.mountCallback = () => {
        codeVElement[2] = contents;
        if (code[2].length === 0) {
            loadFile(2, '/blog/2024-08-03-1000/siterender.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[2] = null;
    }

    return contents;
}

function blogLogicTS_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[3].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[3])));
    }

    contents.mountCallback = () => {
        codeVElement[3] = contents;
        if (code[3].length === 0) {
            loadFile(3, '/blog/2024-08-03-1000/logic.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[3] = null;
    }

    return contents;
}

function blogOpening_2024_08_03_1000(): VElement[] {
    return [
        h('p', {},
            'For the last few months I\'ve been trying out some new ideas to see how we might be able to innovate ' +
            'software development using Large Language Models (LLMs).'
        ),
        h('p', {},
            'This blog post discusses some of the approaches I\'ve been evaluating in the last few weeks.  While I ' +
            'can\'t claim these are unique, I believe they offer a glimpse of how LLMs can radically change large scale ' +
            'software development.'
        ),
        h('p', {},
            'Also, I\'m an engineer, not an evangelist, so I\'m focused on practical benefits.  As a couple of my more ' +
            'commercially minded friends would say, "show us the money!"  I have some thoughts on that here too.'
        ),
    ]
}

function blogArticle_2024_08_03_1000(): VElement[] {
    return [
        h('section', {},
            h('img', {
                src: '/blog/2024-08-03-1000/robot.webp',
                alt: 'Image of a robot writing software',
                width: 1024,
                height: 585
            }),
            h('h2', {}, 'A heading'),
            h('p', {},
                'blah...',
                h('p', {},
                    'In my previous blog post, ',
                    h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                        'Can my tools build tools?  Pre-rendering web pages with help from ChatGPT (2024-07-15)'
                    ),
                    ', I looked at using ChatGPT to build the core of a new tool.  These initial results were very exciting as ' +
                    'they offered a hint of what might be possible.'
                ),
                h('p', {},
                    'I\'ve been very interested in code generation techniques for most of my career, and for many years I developed ' +
                    'production C and C++ compiler backends.  During that time I learned that optimizing code generation requires ' +
                    'a lot of discipline and patience.  Not every approach wins, most wins are small, and sometimes doing the right ' +
                    'thing generates worse results in some test cases, but compound all those small improvements and the effect ' +
                    'is huge.  A hundred 1% improvements results in a 2.7x gain.'
                ),
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
            blogOrigPrompt_2024_08_03_1000(),
            blogPrompt_2024_08_03_1000()
        ),
        h('section', {},
            h('h2', {}, 'The application code'),
            h('h3', {}, 'prerender.ts'),
            blogSiterenderTS_2024_08_03_1000(),
            h('h3', {}, 'logic.ts'),
            blogLogicTS_2024_08_03_1000(),
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

function blogPostscript_2024_08_03_1000(): VNode[] {
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

export const blogPost_2024_08_03_1000 = new BlogPost(
    'Innovating software development with ChatGPT',
    '2024-08-03T10:00',
    '/blog/2024-08-03-1000',
    'Large language models are set to give us many new ways to build software.  Let\'s look at one such way to use ChatGPT ' +
    'to do something innovative!',
    '/blog/2024-08-03-1000/robot.webp',
    null,
    blogOpening_2024_08_03_1000,
    blogArticle_2024_08_03_1000,
    blogPostscript_2024_08_03_1000
);
