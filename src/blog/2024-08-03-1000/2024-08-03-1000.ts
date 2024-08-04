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
            'software development using Large Language Models (LLMs).  This article introduces a new idea, Maximal ' +
            'Instruction Prompting (MIP) as a strategy for a new way of doing software development with LLMs.'
        ),
        h('p', {},
            'I\'ve used this approach for a couple of different projects, and the concept continues to evolve with ' +
            'each new use, but even in its early stages I\'ve been seeing striking results, so I wanted to publish ' +
            'something now.'
        ),
        h('p', {},
            'I\'m an engineer, not an AI evangelist, so my approach is focused on practical benefits.  As a couple of ' +
            'my more commercially minded friends would say, "show us the money!"'
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
            h('h2', {}, 'Motivating thoughts'),
            h('p', {},
                'To understand my approach, let me start with some motivating thoughts.'
            ),
            h('p', {},
                'Great software is far more than the code itself.  While code is undeniably important, it\'s ultimately an ' +
                'expression of higher-level ideas.  Throughout the history of computing, we\'ve continually sought better ' +
                'and more reliable methods to create increasingly complex software.  The weakest link in this chain has ' +
                'always been the human element of translating high-level ideas into working implementations.  The move ' +
                'towards ever higher-level programming languages has been to reduce human effort, as people get tired, ' +
                'get distracted, get stressed, and make mistakes.'
            ),
            h('p', {},
                'Labeling LLMs as "artificial intelligence" can be misleading.  They are extraordinary tools, but they ' +
                'may be more accurately described as intelligence augmentation systems.  The true innovation stems from the ' +
                'people utilizing them, although LLMs excel at executing well-structured ideas.  This highlights a ' +
                'significant challenge: crafting well-structured ideas is more difficult than it seems.'
            ),
            h('p', {},
                'Most current uses of LLMs to build software have focused on an interactive dialogue between a developer ' +
                'and the LLM.  This approach can be incredibly effective.  For example in "',
                h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                    'Can my tools build tools?  Pre-rendering web pages with help from ChatGPT (2024-07-15)'
                ),
                '", I was able to build new software far faster than I would have done previosly.  I\'ve used this approach to ' +
                'develop the core of several other software components, including the syntax highlighting engine used in both ' +
                'that, and this article.  However, this is a new field and it\'s very unlikely we\'ve discovered the best ' +
                'ways to make use of them yet.'
            ),
            h('p', {},
                'Finally, I\'ve been very interested in code generation techniques for most of my career, and for many years ' +
                'I developed production C and C++ compiler backends.  During that time I learned that optimizing code ' +
                'generation requires a lot of discipline and patience.  Most wins are very small, and sometimes doing the ' +
                'right thing generates worse results in some test cases because secondary effects sometimes swamp the ' +
                'primary one.  Nevertheless, accumulate all those small improvements and the effect is huge.  A hundred 1% ' +
                'improvements results in a 2.7x gain overall.  Importantly, that 2.7x gain is a gain to every application ' +
                'that uses the compiler so the payback is immense.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Use LLMs more effectively'),
            h('p', {},
                'How might we more effectively use LLMs to elevate the work of people involved in software developoment?'
            ),
            h('p', {},
                'Interactive engagement with LLMs is one of their greatest strengths, but it can also lead to losing focus ' +
                'on specific outcomes, resulting in unnecessary detours (yak shaving).  LLMs excel at holding conversations, ' +
                'seducing us into being sidetracked.  We can spend hours discussing minor details while ignoring substantive ' +
                'issues that might render those other conversations irrelevant (bikeshedding).'
            ),
            h('p', {},
                'In traditional software development, whether through a designer\'s informal approach or an ' +
                'enterprise-level process involving product managers or product owners, there is always a clear outcome ' +
                'driving the development process. However, an LLM has no understanding of our goals until we explicitly ' +
                'communicate them.'
            ),
            h('p', {},
                'This ambiguity can lead LLMs down hallucinatory rabbit holes, as they try to fill the void with creative, ' +
                'but sometimes irrelevant, content.  If we\'re asking the LLM to help build something it was specifically ' +
                'trained on, it might stay on track, but how often do we want to create an exact clone of existing software?'
            ),
            h('p', {},
                'To avoid this, we should craft a long-form description of our goals.  By capturing detailed requirements, ' +
                'we can present them to the LLM, providing it with a much clearer picture of what we want to achieve.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Combine elements from different skills'),
            h('p', {},
                'How can we combine elements of different skills, such as product design, software implementation, and ' +
                'testing, so the new strategy can support more than just the work done by developers?'
            ),
            h('p', {},
                'While it\'s possible to focus solely on the technical side of software development, it\'s crucial for our ' +
                'LLM to understand other important motivations.  Incorporating distinct skills and perspectives can provide ' +
                'insights that lead to interesting and unexpected directions in the final design.'
            ),
            h('p', {},
                'Consider a requirement for testing, for instance.  We might emphasize the need for our software to support ' +
                '90%+ automated test coverage.  This requirement could lead to an implementation that allows for easier ' +
                'mocking.  Without explicitly stating this, our LLM might take a different approach.  Similarly, providing ' +
                'examples of specific user journeys or behavioral requirements can guide the LLM towards unique and ' +
                'innovative solutions.'
            ),
            h('p', {},
                'In typical enterprise software development, such aspects are captured as user stories and acceptance ' +
                'criteria since this helps human development teams build software correctly.  By taking a similar ' +
                'approach we can help inform our LLM of these important details.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Apply MECE principles'),
            h('p', {},
                'blah mutually exclusive, collectively exhaustive..'
            )
        ),
        h('section', {},
            h('h2', {}, 'An example'),
            h('p', {},
                'Let\'s consider an example!  In "',
                h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                    'Can my tools build tools?'
                ),
                '", I posed a problem of building a pre-rendering application.  Let\'s expand that into a full application ' +
                'called "siterender".'
            ),
            h('p', {},
                'As we\'re looking to improve on our previous results, let\'s define that want a much richer set of features ' +
                'than the original tool:'
            ),
            h('ul', {},
                h('li', {}, 'Fetches and parses sitemaps.'),
                h('li', {}, 'Can Replace URL prefixes based on specified rules.'),
                h('li', {}, 'Renders pages in parallel using Puppeteer.'),
                h('li', {}, 'Parallelizes rendering operations for maximum speed/throughput.'),
                h('li', {}, 'Saves rendered HTML content to specified output directory.'),
                h('li', {}, 'Retry mechanism for rendering and browser launch/close operations.'),
                h('li', {}, 'Supports command line options to configure operations.')
            ),
            h('p', {},
                'My first attempt at a comprehensive prompt is shown below.  Don\'t worry about this one too much as the ' +
                'finished form is very different.'
            ),
            blogOrigPrompt_2024_08_03_1000(),
            h('p', {},
                'By iterating on this initial prompt, sometimes myself, and sometimes through dialogue with ChatGPT, I was ' +
                'able to make it progressively better.  To make this more interesting I did most of the iteration work ' +
                'using temporary chats that don\'t impact my other sessions with ChatGPT.'
            ),
            h('p', {},
                'The most impactful change was to alter the first line to this:'
            ),
            h('div', {className: 'green-note'},
                h('p', {},
                    'The following is a prouduct requirement.  Please check the details and confirm if there are any areas ' +
                    'that are ambigous or unclear.  If there are then please detail them and suggest improvements'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Another heading'),
            h('p', {},
                'blah..',
                'MECE principle',
                'rubber ducking!'
            ),
            h('p', {},
                'What previously impractical things might become practical now?'
            )
        ),
        h('section', {},
            h('h2', {}, 'The application prompt'),
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
                'I decided to make the siterender application into a separate project, so if you\'re interested you can ' +
                'follow and help shape its evolution.'
            ),
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
    'Maximal Instruction Prompting: a strategy for software development',
    '2024-08-03T10:00',
    '/blog/2024-08-03-1000',
    'Introducing the concept of Maximial Instruction Prompting (MIP) as a strategy for software development with' +
    'large language models (LLMs)',
    '/blog/2024-08-03-1000/robot.webp',
    null,
    blogOpening_2024_08_03_1000,
    blogArticle_2024_08_03_1000,
    blogPostscript_2024_08_03_1000
);
