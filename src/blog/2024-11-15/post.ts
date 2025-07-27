import {assertIsVElement, h, updateElement, VNode, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';
import {MetaphorParser, PythonParser} from '../../lib/syntax';
import {highlight} from '../../lib/highlight'
import {cloneObject} from '../../lib/cloneObject';
import {navigateEvent} from '../../app';

const code: VNode[][] = [[], [], []];
let codeVElement: (VElement | null)[] = [null, null, null];
const codeFunction: (() => VElement)[] = [
    blogArticle_2024_11_15_Prompt,
    blogArticle_2024_11_15_Guidelines,
    blogArticle_2024_11_15_Code
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
        if (filePath.endsWith('.py')) {
            formattedContent = highlight(content, PythonParser);
        } else {
            formattedContent = highlight(content, MetaphorParser);
        }

        storeFunction(segment, formattedContent);
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

function blogArticle_2024_11_15_Prompt(): VElement {
    let contents: VElement;
    if (code[0].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('span', {className: 'blocktext'}, ...cloneObject(code[0]))));
    }

    contents.mountCallback = () => {
        codeVElement[0] = contents;
        if (code[0].length === 0) {
            loadFile(0, '/blog/2024-11-15/commit-critic.m6r', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[0] = null;
    }

    return contents;
}

function blogArticle_2024_11_15_Guidelines(): VElement {
    let contents: VElement;
    if (code[1].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[1])));
    }

    contents.mountCallback = () => {
        codeVElement[1] = contents;
        if (code[1].length === 0) {
            loadFile(1, '/blog/2024-11-15/sample-guideline.m6r', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[1] = null;
    }

    return contents;
}

function blogArticle_2024_11_15_Code(): VElement {
    let contents: VElement;
    if (code[2].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[2])));
    }

    contents.mountCallback = () => {
        codeVElement[2] = contents;
        if (code[2].length === 0) {
            loadFile(2, '/blog/2024-11-15/commit_critic.py', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[2] = null;
    }

    return contents;
}

function blogOpening_2024_11_15(): VElement[] {
    return [
        h('p', {},
            'Code reviews are one of the most important elements of software development.  They\'re where we seek feedback on ' +
            'what we\'ve built, looking to ensure it\'s understandable, elegant, and free from defects.'
        ),
        h('p', {},
            'A problem with code reviews is that we often need to wait for someone else to have time to look at what we\'ve ' +
            'done.  Ideally, we want instant feedback before we submit a PR.'
        ),
        h('p', {},
            'In a previous article (see: ',
            h('a', {
                    href: '/blog/2024-11-06',
                    onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-11-06')
                },
                'Code reviews using Metaphor'
            ),
            '), I looked at how to build something that could leverage AI to help, but that required a lot of manual steps.  ' +
            'We really need a tool for this.'
        )
    ];
}

function blogArticle_2024_11_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Anatomy of a code review tool'),
            h('p', {},
                'If we want to build an AI-based code reviewer, we should start with some features we\'d like it to have.'
            ),
            h('p', {},
                'Ideally, we want something we can integrate with other tools.  That implies we want it to run from a command ' +
                'line.  Command-line apps need argument flags.  We also want to provide a list of files to review.'
            ),
            h('p', {},
                'We also want it to run everywhere, so let\'s build it in Python.'
            ),
            h('p', {},
                'Every language, project, company, etc., has different approaches to coding conventions, so we want our code ' +
                'review guidelines to be customizable.  As we may have code in multiple languages, let\'s allow for multiple ' +
                'guidelines, too.'
            ),
            h('p', {},
                'We\'ll take a Unix-like approach and design our code review tool to generate a large language model (LLM) ' +
                'prompt as a file but not provide integration with any specific LLM.  That can be done manually by the user ' +
                'or via a separate prompt upload or interaction tool, which means it can also work with local LLMs, not just ' +
                'cloud-based ones.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Building the prompt'),
            h('p', {},
                'The trickiest part of this is planning to build a prompt.  Our AI isn\'t psychic, and we don\'t want it ' +
                'to get creative and come up with new ideas for reviewing code each time.  We solve this by constructing a ' +
                'large context prompt (LCP) that contains all the information it needs to do the task.'
            ),
            h('p', {},
                'This means the prompt needs:'
            ),
            h('ul', {},
                h('li', {}, 'All the files to review'),
                h('li', {}, 'All the coding guidelines we want to apply to those files'),
                h('li', {}, 'Some instructions on what we want it to do'),
                h('li', {}, 'Some instructions on how we want it to generate its output')
            ),
            h('p', {},
                'There\'s a library available that makes this very simple, m6rclib.  This is an embedded parser for a ' +
                'structured document language, Metaphor (see ',
                h('a', {
                        href: 'https://github.com/m6r-ai/m6rclib',
                        target: '_blank',
                        title: 'm6rclib project on GitHub'
                    },
                    'https://github.com/m6r-ai/m6rclib'
                ),
                ').  m6rclib is well suited to this problem:'
            ),
            h('ul', {},
                h('li', {}, 'Metaphor files are largely natural language and so fit nicely with describing coding guidelines'),
                h('li', {}, 'It has an `Include:` keyword that lets us compose a series of files into one prompt'),
                h('li', {}, 'It has an `Embed:` keyword that lets us embed files into a prompt'),
                h('li', {},
                    'It has `Role:`, `Context:` and `Action:` keywords that let us describe the role of the LLM, the context ' +
                    'we want it to use, and the action we want it to take.'
                )
            ),
            h('p', {},
                'We stitch together all the elements we want into an overall Metaphor description and let the prompt ' +
                'compiler do the rest!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Coding guidelines'),
            h('p', {},
                'Let\'s look at a fragment of a coding guideline.  This one is a generic guide in Metaphor form.  Some ' +
                'sub-points probably want to be expanded, which will likely give us a better review, but these are pretty ' +
                'workable.  Some of these may also be too language-specific and want refactoring, but that\'s easy to do in ' +
                'the future. Similarly, some of these may not be universally accepted.  I\'m hoping the tool\'s users will ' +
                'help with this!'
            ),
            h('figure', {},
                blogArticle_2024_11_15_Guidelines(),
                h('figcaption', {}, 'Fragment of a guideline file')
            )
        ),
        h('section', {},
            h('h2', {}, 'Building commit-critic'),
            h('p', {},
                'At this point, we\'ve got a design, so now we want to build the tool.  We could dive in and start coding, ' +
                'but wouldn\'t it be better to have an AI do that part, too?  Having it AI-built has a lot of benefits:'
            ),
            h('ul', {},
                h('li', {}, 'It\'s much quicker to build the code (LLMs "type" much faster than people!)'),
                h('li', {}, 'It will do all the boring stuff (exception handling, etc.) without complaining'),
                h('li', {}, 'If it knows enough to build the tool, then it can write the user manual'),
                h('li', {}, 'If we want tests, it can build them'),
                h('li', {}, 'We can rapidly try new ideas and discard them if they aren\'t useful'),
                h('li', {}, 'It can do all the future maintenance')
            ),
            h('p', {},
                'Some of these might sound far-fetched.  Hold that thought, and we\'ll come back to it later.'
            )
        ),
        h('section', {},
            h('h2', {}, 'More Metaphor'),
            h('p', {},
                'commit-critic leverages Metaphor to create LLM prompts at runtime, but Metaphor was initially designed to ' +
                'help me build software using AI.  To support this, I wrote a stand-alone Metaphor compiler, m6rc (see ',
                h('a', {
                        href: 'https://github.com/m6r-ai/m6rc',
                        target: '_blank',
                        title: 'm6rc project on GitHub'
                    },
                    'https://github.com/m6r-ai/m6rc'
                ),
                ').  Aside: m6rc used to be quite heavyweight but is now a very light wrapper around m6rclib, too.'
            ),
            h('p', {},
                'If we take and expand on what we have already looked at, we can describe commit-critic in Metaphor.  ' +
                'Importantly, we\'re describing what we want the tool to do - i.e. the business logic.  We\'re not ' +
                'describing the code!'
            ),
            h('figure', {},
                blogArticle_2024_11_15_Prompt(),
                h('figcaption', {}, 'The v0.1 commit-critic "source" file')
            )
        ),
        h('section', {},
            h('h2', {}, 'Generating the executable code'),
            h('p', {},
                'We can compile this into a prompt ready to hand to our LLM:'
            ),
            h('pre', {},
                h('code', {},
                    'm6rc commit-critic.m6r -o out.lcp'
                )
            ),
            h('p', {},
                'In this instance I handed the task to Claude 3.5 Sonnet:'
            ),
            h('figure', {},
                blogArticle_2024_11_15_Code(),
                h('figcaption', {}, 'The v0.1 commit-critic application code')
            )
        ),
        h('section', {},
            h('h2', {}, 'Testing the output'),
            h('p', {},
                'commit-critic needs a little extra python packaging to run as a stand-along application, but we can test it:'
            ),
            h('pre', {},
                h('code', {},
                    'python3 commit-critic.py -g <review-dir-path> -o out.lcp <file-to-test>'
                )
            ),
            h('p', {},
                'The following is a fragment of the output from ChatGPT 4o when I asked it to review part of a virtual DOM ' +
                'implementation I build a few months ago.  As you can see, it produces a series of recommendations, and ' +
                'tells you which guideline applies.  This makes it much easier to understand why it believes a change ' +
                'might be needed, so you can use your own judgement about whether to take the advice or not.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2024-11-15/chatgpt-output.webp',
                    alt: 'A snapshot of some of the ChatGPT 4o review output.',
                    width: 800,
                    height: 'auto'
                }),
                h('figcaption', {}, 'A snapshot of some of the ChatGPT 4o review output')
            ),
        ),
        h('section', {},
            h('h2', {}, 'Revisiting the potential benefits of AI-built software'),
            h('p', {},
                'Earlier in this article, I mentioned some potential benefits of AI-built software.  commit-critic isn\'t ' +
                'the only software I\'ve been designing in the last few weeks, but it demonstrates many of these benefits:'
            ),
            h('ul', {},
                h('li', {}, 'It\'s much quicker to build the code (LLMs "type" much faster than people!): you can try this now!'),
                h('li', {},
                    'It will do all the boring stuff (exception handling, etc.) without complaining: you\'ll see this is all ' +
                    'there in the committed code.'
                ),
                h('li', {},
                    'If it knows enough to build the tool, then it can write the user manual: Claude wrote the README.md file ' +
                    'on the GitHub repo using a slightly modified version of the Metaphor description'
                ),
                h('li', {},
                    'We can rapidly try new ideas and discard them if they aren\'t useful: if you poke at the git history, ' +
                    'you\'ll see earlier iterations of commit-critic.  Some ideas got dropped, some new ones were added, and ' +
                    'the AI coded all the modifications.'
                ),
                h('li', {},
                    'It can do all the future maintenance: you can try this yourself too by changing any of the requirements ' +
                    'or by editing the coding guidelines used by commit-critic'
                )
            ),
            h('p', {},
                'The one I didn\'t mention yet is "If we want tests, it can build them".  I didn\'t build tests for ' +
                'commit-critic yet.  However, I did need tests for m6rclib.  To give 100% test coverage over statements and ' +
                'branches currently requires just over 1300 lines of unit tests.  Claude 3.5 Sonnet wrote and debugged all ' +
                'those in about about 5-6 hours, starting from another Metaphor description.'
            ),
            h('p', {},
                'Sometimes, the future is here already!'
            )
        ),
        h('section', {},
            h('h2', {}, 'The sources are on GitHub'),
            h('p', {},
                'All the code you see here and my initial code guidelines are available on GitHub.  The software is ' +
                'open-source under an Apache 2.0 license.'
            ),
            h('p', {},
                'Please see: ',
                h('a', {
                        href: 'https://github.com/m6r-ai/commit-critic',
                        target: '_blank',
                        title: 'commit-critic project on GitHub'
                    },
                    'https://github.com/m6r-ai/commit-critic'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Postscript'),
            h('p', {},
              'This is a story about AI, so it wouldn\'t be complete without telling you the name for the tool came ' +
              'from Claude 3.5 Sonnet after I asked it to come up with some ideas!  That conversation wandered down a ' +
              'very entertaining rabbit hole for 5 minutes, and I\'m still wondering when I\'ll get around to designing ' +
              'something called "Debugsy Malone".  Who says AIs can\'t have a sense of humour too?'
            )
        )
    ]
}

export const blogPost_2024_11_15 = new BlogPost(
    'commit-critic: An AI-powered, AI-built code review tool',
    '2024-11-15',
    '/blog/2024-11-15',
    'commit-critic: Designing and building an AI-powered, AI-built code review tool.  We look at the design and the' +
    'implications of using AI to manage the whole process',
    null,
    null,
    blogOpening_2024_11_15,
    blogArticle_2024_11_15,
    null
);