import {assertIsVElement, h, updateElement, VNode, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';
import {MetaphorParser} from '../../lib/syntax';
import {highlight} from '../../lib/highlight';
import {cloneObject} from '../../lib/cloneObject';
import {navigateEvent} from '../../app';

const code: VNode[][] = [[], []];
let codeVElement: (VElement | null)[] = [null, null];
const codeFunction: (() => VElement)[] = [
    blogArticle_2025_04_24_ReviewCritic,
    blogArticle_2025_04_24_Introspection
];

/**
 * Callback to write the contents of the file load for code fragments.
 * @param segment - The segment index to update
 * @param content - The content to write
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

/**
 * Load Metaphor code file and prepare for highlighting
 */
async function loadFile(segment: number, filePath: string, storeFunction: (segment: number, content: VNode[]) => void) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const content = await response.text();
        const formattedContent = highlight(content, MetaphorParser);

        storeFunction(segment, formattedContent);
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

/**
 * Function to handle the first Metaphor code block (commit-critic)
 */
function blogArticle_2025_04_24_ReviewCritic(): VElement {
    let contents: VElement;
    if (code[0].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[0])));
    }

    contents.mountCallback = () => {
        codeVElement[0] = contents;
        if (code[0].length === 0) {
            loadFile(0, '/blog/2025-04-24/commit-critic.m6r', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[0] = null;
    }

    return contents;
}

/**
 * Function to handle the second Metaphor code block (introspection)
 */
function blogArticle_2025_04_24_Introspection(): VElement {
    let contents: VElement;
    if (code[1].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[1])));
    }

    contents.mountCallback = () => {
        codeVElement[1] = contents;
        if (code[1].length === 0) {
            loadFile(1, '/blog/2025-04-24/introspection.m6r', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[1] = null;
    }

    return contents;
}

function blogOpening_2025_04_24(): VElement[] {
    return [
        h('p', {},
            'The latest version of Humbug, v0.10, introduces the system shell.  This is an incredibly useful productivity ' +
            'feature that lets you use built-in commands to create conversation, editor, and terminal windows in a way ' +
            'that\'s tricky to do from the GUI. The integration within Humbug, rather than making these regular command ' +
            'line tools, means they can invoke GUI features - useful in itself. The big unlock, however, lies with the ' +
            'updated ',
            h('code', {}, 'm6rc'),
            ' Metaphor compiler.'
        )
    ];
}

/**
 * Main function to generate the blog post content
 */
function blogArticle_2025_04_24(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Metaphor and the m6rc Metaphor compiler'),
            h('p', {},
                'Metaphor predates Humbug, and has been a part of the Humbug design since v0.1.  It allows you to define ' +
                'the role, detailed context, and action you require for your AI to do its work.  It also allows you to ' +
                'partition these elements into separate files and join them together and compile all the elements into a ' +
                'prompt using ',
                h('code', {}, 'm6rc'),
                '.'
            ),
            h('p', {},
                'This modular approach, familiar to software developers, allows you to independently maintain and version ' +
                'important Metaphor components, allowing them to be used across many projects and tasks. Equally, these ' +
                'components can be maintained by different teams allowing them to bring their unique expertise to bear.'
            ),
            h('p', {},
                'As with programming language compilers, ',
                h('code', {}, 'm6rc'),
                ' also gets to perform correctness checks on the Metaphor files it ' +
                'processes. This helps ensure the structure you present as a prompt will make sense to your AI models.'
            )
        ),
        h('section', {},
            h('h2', {}, 'The v0.10 improvement'),
            h('p', {},
                'The ',
                h('code', {}, 'm6rc'),
                ' approach has been very powerful, but the user experience was a little awkward as you invariably ' +
                'had to edit one or more Metaphor source files each time you wanted to do something slightly different.  ' +
                'With v0.10 of Humbug it\'s now possible to eliminate the major problem.'
            ),
            h('p', {},
                'The new compiler can take "argument references" in ',
                h('code', {}, 'Include'),
                ' and ',
                h('code', {}, 'Embed'),
                ' statements. These take the form of ', 
                h('code', {}, '$<number>'),
                ' where ',
                h('code', {}, '<number>'),
                ' is the number of the positional command line argument passed to ',
                h('code', {}, 'm6rc'),
                '. That may sound a little odd, so here\'s an example:'
            ),
            h('pre', {},
                h('code', {}, 'm6rc script.m6r -m gpt-4.1 cat.m6r dog.md')
            ),
            h('p', {},
                'Positional arguments are the ones that don\'t have option flags (things starting with a ',
                h('code', {}, '-'),
                ') and their associated option values (if they have them). In this example, the option ',
                h('code', {}, '-m'),
                ' has an option value of ',
                h('code', {}, 'gpt-4.1'),
                ', since it specifies the AI model to be used, and ',
                h('code', {}, 'm6rc'),
                ' is our command. This leaves ',
                h('code', {}, 'script.m6r'),
                ', ',
                h('code', {}, 'cat.m6r'),
                ', and ',
                h('code', {}, 'dog.md'),
                ' as our 3 positional arguments.  By convention we start numbering them from 0, ',
                h('code', {}, 'script.m6r'),
                ' is argument 0, ',
                h('code', {}, 'cat'),
                ' is argument 1, and ',
                h('code', {}, 'dog'),
                ' is argument 2.'
            ),
            h('p', {},
                'If our ',
                h('code', {}, 'script.m6r'),
                ' file contains the statement: ',
                h('code', {}, 'Embed: $2'),
                ' then the compiler will replace ',
                h('code', {}, '$2'),
                ' with ',
                h('code', {}, 'dog.md'),
                ' and will try to embed a file called ',
                h('code', {}, 'dog.md'),
                ' into our compiled prompt. Similarly, if ',
                h('code', {}, 'script.m6r'),
                ' contains the statement ',
                h('code', {}, 'Include: $1'),
                ' then this will try to include another Metaphor file called ',
                h('code', {}, 'cat.m6r'), '.'
            ),
            h('p', {},
                'This very simple change makes it possible to define completely reusable AI-powered tools that need ' +
                'no changes to be used for different purposes.  We simply pass extra parameters on the ',
                h('code', {}, 'm6rc'),
                ' command line.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Revisiting commit-critic'),
            h('p', {},
                'Last year I introduced an example of a Metaphor-powered tool, ',
                h('a', {
                        href: '/blog/2024-11-15',
                        onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-11-15')
                    },
                    'commit-critic'
                ),
                '. This is an AI-powered software code review tool.  To make this useful in November we had to build ' +
                'a custom command line tool that could handle the positional argument handling.  With Humbug v0.10 ' +
                'we no longer need to do this, instead allowing commit-critic\'s functionality to be completely ' +
                'described in Metaphor!'
            ),
            h('p', {},
                'Here\'s what a pure Metaphor version looks like:'
            ),
            h('figure', {},
                blogArticle_2025_04_24_ReviewCritic(),
                h('figcaption', {}, 'Metaphor code for the new commit-critic implementation')
            ),
            h('p', {},
                'If you\'re a keen observer, you may notice this has an enhancement on the original tool.  ' +
                'This version ranks the importance of any issues it identifies to help you judge how serious ' +
                'any issues might be.'
            )
        ),
        h('section', {},
            h('h2', {}, 'An introspection tool'),
            h('p', {},
                'Now you\'ve seen how you can solve an earlier problem in a simpler way, let\'s look at how you can ' +
                'solve a new problem.'
            ),
            h('p', {},
                'A common question people have asked about Humbug is "how easy is it to have one AI review the work ' +
                'of another AI?"  It turns out you can now solve this sort of problem quite easily with Humbug v0.10.'
            ),
            h('p', {},
                'Humbug has always supported ',
                h('code', {}, '.conv'),
                ' files. These are JSON files that hold details of the conversations you have with ' +
                'our AIs when using Humbug.  These are stored in the ',
                h('code', {}, 'conversations'),
                ' directory of any Humbug mindspace.'
            ),
            h('p', {},
                'The approach outlined here took about 5 minutes to write, so it\'s not refined, but you can see ' +
                'the potential!'
            ),
            h('figure', {},
                blogArticle_2025_04_24_Introspection(),
                h('figcaption', {}, 'Metaphor code for the AI introspection tool')
            ),
            h('p', {},
                'Here\'s a screenshot of codestral (one of the Mistral models) reviewing a design change Metaphor ' +
                'conversation I had with Claude Sonnet 3.7 about an aspect of the system shell design from a few days ago!'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2025-04-24/introspection-screenshot.webp',
                    alt: 'Screenshot of codestral reviewing a Metaphor conversation'
                })
            )
        )
    ];
}

export const blogPost_2025_04_24 = new BlogPost(
    'Introducing Metaphor commands',
    '2025-04-24',
    '/blog/2025-04-24',
    'Learn how Humbug v0.10 introduces powerful command-line features for Metaphor that enable building reusable AI-powered tools.',
    '/blog/2025-04-24/introspection-screenshot.webp',
    null,
    blogOpening_2025_04_24,
    blogArticle_2025_04_24,
    null
);
