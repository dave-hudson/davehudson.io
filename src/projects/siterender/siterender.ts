import {assertIsVElement, h, updateElement, VElement, VNode, VText} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {navigateEvent} from '../../app';
import {cloneObject} from '../../lib/cloneObject';

const code: VNode[] = [];
let codeVElement: (VElement | null) = null;

/**
 * Callback to write the contents of the file load for the first code fragment.
 * @param content
 */
function writeCode(content: VNode[]) {
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
    const newVElement = projectSiterenderCodeComponent();
    newVElement.parentVNode = codeVElement.parentVNode;
    updateElement(parentElem,
        parentElem.childNodes[index],
        codeVElement.parentVNode as VElement,
        codeVElement,
        newVElement
    );
    codeVElement = newVElement;
}

async function loadFile(filePath: string, storeFunction: (content: VNode[]) => void) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const content = await response.text();
        storeFunction([new VText(content)]);
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function projectSiterenderCodeComponent(): VElement {
    let contents: VElement;
    if (code.length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('div', {className: 'keyword'}, ...cloneObject(code))));
    }

    contents.mountCallback = () => {
        codeVElement = contents;
        if (code.length === 0) {
            loadFile('https://raw.githubusercontent.com/dave-hudson/siterender/main/prompt/siterender.prompt', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement = null;
    }

    return contents;
}

export function projectSiterenderPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'siterender'),
            h('p', {},
                'siterender is a Node.js application that renders web pages listed in a sitemap and saves the rendered HTML ' +
                'content to a specified output directory.  This tool is particularly useful for static site generation, web ' +
                'scraping, and ensuring content is pre-rendered for SEO and social media sharing purposes.'
            ),
            h('p', {},
                'The application is unusual as all the code was "written" by ChatGPT 4o.  See the section "',
                h('a', {href: '#the-prompt', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender#the-prompt')}, 'The prompt'),
                '" below.'
            ),
            h('section', {},
                h('h2', {}, 'Features'),
                h('ul', {},
                    h('li', {}, 'Fetches and parses sitemaps from URLs or local files.'),
                    h('li', {}, 'Supports nested sitemaps.'),
                    h('li', {}, 'Replaces URL prefixes based on specified rules.'),
                    h('li', {}, 'Renders pages in parallel using Puppeteer.'),
                    h('li', {}, 'Parallelizes rendering operations for maximum speed/throughput.'),
                    h('li', {}, 'Saves rendered HTML content to specified output directory.'),
                    h('li', {}, 'Retry mechanism for rendering and browser launch/close operations.')
                )
            ),
            h('section', {},
                h('h2', {id: 'the-prompt'}, 'The prompt'),
                h('p', {},
                    'The application is built from a ChatGPT prompt.  This file can be found at: ',
                    h('a', {href: 'https://github.com/dave-hudson/siterender/blob/main/prompt/siterender.prompt', target: '_blank'},
                        'https://github.com/dave-hudson/siterender/blob/main/prompt/siterender.prompt'
                    )
                ),
                h('p', {}, 'The current `main` branch prompt is reproduced here:'),
                projectSiterenderCodeComponent(),
            ),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/siterender', target: '_blank'},
                        'https://github.com/dave-hudson/siterender'
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectSiterender = new ProjectPage(
    'siterender',
    '/projects/siterender',
    'siterender renders web pages listed in a sitemap and saves the rendered HTML content locally.  ' +
    'Written in TypeScript via a ChatGPT prompt!',
    projectSiterenderPage
);
