import {assertIsVElement, h, updateElement, VElement, VNode, VText} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';
import {TypeScriptParser} from '../../lib/TypeScriptParser';
import {highlight} from '../../lib/highlight'
import {cloneObject} from '../../lib/cloneObject';
import {navigateEvent} from '../../app';

const code: VNode[][] = [[], [], []];
let codeVElement: (VElement | null)[] = [null, null, null];
const codeFunction: (() => VElement)[] = [
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

function blogPrompt_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[0].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, h('div', {className: 'text'}, ...cloneObject(code[0]))));
    }

    contents.mountCallback = () => {
        codeVElement[0] = contents;
        if (code[0].length === 0) {
            loadFile(0, '/blog/2024-08-03-1000/prompt.txt', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[0] = null;
    }

    return contents;
}

function blogSiterenderTS_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[1].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[1])));
    }

    contents.mountCallback = () => {
        codeVElement[1] = contents;
        if (code[1].length === 0) {
            loadFile(1, '/blog/2024-08-03-1000/siterender.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[1] = null;
    }

    return contents;
}

function blogLogicTS_2024_08_03_1000(): VElement {
    let contents: VElement;
    if (code[2].length === 0) {
        contents = h('pre', {});
    } else {
        contents = h('pre', {}, h('code', {}, ...cloneObject(code[2])));
    }

    contents.mountCallback = () => {
        codeVElement[2] = contents;
        if (code[2].length === 0) {
            loadFile(2, '/blog/2024-08-03-1000/logic.ts', writeCode);
        }
    }

    contents.unmountCallback = () => {
        codeVElement[2] = null;
    }

    return contents;
}

function blogOpening_2024_08_03_1000(): VElement[] {
    return [
        h('p', {},
            'I\'ve been trying new ideas to see how we might innovate ' +
            'software development using Large Language Models (LLMs).  This article introduces a new concept, Maximal ' +
            'Instruction Prompting (MIP), as a strategy for software development with LLMs.'
        ),
        h('p', {},
            'I\'ve used this approach for several projects, and the concept continues to evolve with ' +
            'each new use.  However, even in these early stages, I\'ve seen striking results.'
        ),
        h('p', {},
            'This article describes the MIP strategy and the benefits it can offer.  It provides more detailed ' +
            'explanations and ends with an example of an application built this way.'
        )
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
        ),
        h('section', {},
            h('h2', {}, 'The MIP strategy'),
            h('p', {},
                'LLMs are incredible tools.  Like all tools, though, getting good results with them requires us to use ' +
                'them in the right way.  The idea behind Maximal Instruction Prompting (MIP) is to provide a more effective ' +
                'way to use LLMs for software development.'
            ),
            h('p', {},
                'The MIP strategy comes from observing practical problems using LLMs in software development.  Most ' +
                'LLMs are used like a developer\'s sidekick, but we should be able to do far more.'
            ),
            h('h3', {}, 'Summary of MIP'),
            h('p', {},
                'MIP can be summarised as an approach for providing detailed requirements to an LLM, enabling it to produce ' +
                'more complex output.  These are the core ideas:'
            ),
            h('ul', {},
                h('li', {},
                    'Describe all the requirements that our software must meet.'
                ),
                h('li', {},
                    'Consider all relevant skills and perspectives.'
                ),
                h('li', {},
                    'Describe all requirements comprehensively and exactly once.'
                ),
                h('li', {},
                    'Use examples that offer clarity for requirements.'
                )
            ),
            h('h3', {}, 'Advantages of MIP'),
            h('p', {},
                'As a couple of my more commercially minded friends might say, "Show us the money!"  MIP must offer ' +
                'significant practical advantages over alternatives for it to be helpful.  Here are some that are already clear:'
            ),
            h('ul', {},
                h('li', {},
                    'It captures the detailed requirements for our software.  Notably, a MIP always describes what ' +
                    'the software is and does rather than how we\'d like to evolve it, making it easy for everyone to ' +
                    'understand.  Most software development focuses on evolution and thus quickly becomes defined by the ' +
                    'implementation rather than the intended design.'
                ),
                h('li', {}, 
                    'It focuses on eliminating ambiguity so an LLM can generate software that meets those requirements.'
                ),
                h('li', {},
                    'Focusing on the software\'s characteristics makes it easy to try out variations.  Small changes in ' +
                    'requirements might lead to significant changes in implementation, and the MIP approach allows us to ' +
                    'have an LLM to make those sorts of changes quickly.'
                ),
                h('li', {},
                    'A MIP captures what our software is, which means the LLM can also use that to help create tests and ' +
                    'user documentation.  [Aside: both of these are areas I will be looking into over the coming months]'
                ),
                h('li', {},
                    'This shift from how software is built to what it is, makes it easy to change technologies and ' +
                    'implementations.  For example, we might prototype in one language and then create a production ' +
                    'implementation in another!'
                ),
                h('li', {},
                    'We can build more reliable systems because MIP makes building multiple versions of the same software ' +
                    'inexpensive.  For example, we could imagine building various versions of some library function to ' +
                    'prevent downstream developers from inadvertently using unintended implementation details.'
                )
            ),
            h('h3', {}, 'Limitations of MIP'),
            h('p', {},
                'All ideas have some limitations, so we should discuss them too.  At worst, MIP suffers from similar ' +
                'problems as existing approaches, but in most cases, MIP provides partial mitigation:'
            ),
            h('ul', {},
                h('li', {},
                    'This approach helps mitigate the problem of LLMs hallucinating, but it doesn\'t eliminate it.  LLMs ' +
                    'intentionally create random and surprising outputs at times.  If these occur in the wrong place, ' +
                    'we might get faulty software.  However, this strategy allows us to quickly build different ' +
                    'software implementations in response to our well-defined requirements.  Discarding broken versions ' +
                    'is inexpensive, and we may gain more insights into missing requirements.'
                ),
                h('li', {},
                    'Even when given clear and specific instructions, an LLM will often ignore some.  We ' +
                    'can mitigate this by using the explicit requirements to ask the LLM to demonstrate how it met each ' +
                    'one.  We must solve this with an iterative dialogue, but the LLM can rapidly correct its mistakes.'
                ),
                h('li', {},
                    'This approach does not eliminate the need for a dialogue with the LLM, but it does move ' +
                    'the conversation forward much more rapidly while maintaining a clear focus on an outcome.'
                ),
                h('li', {},
                    'The complexity of the prompt we can provide is limited, but the same limit applies to ' +
                    'dialogue-based approaches.  Our LLM has a limited context window, so this approach only works if we ' +
                    'can keep our working data set inside that.  For more complex software, we will need to break ' +
                    'things into smaller components.  The approach described should still work, but we must ' +
                    'build each component separately.'
                )
            ),
        ),
        h('section', {},
            h('h2', {}, 'MIP in detail'),
            h('section', {},
                h('h3', {}, 'Describe all the requirements'),
                h('p', {},
                    'Like most tools, LLMs are inherently passive, doing nothing until we set them into action.  When we wish ' +
                    'to use them to help us build software, this prompting invariably ends up in an interactive dialogue ' +
                    'between a designer and an LLM where the designer guides the LLM on what they wish to see.  This approach ' +
                    'can be highly effective.'
                ),
                h('p', {},
                    'For example, in "',
                    h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                        'Can my tools build tools?  Pre-rendering web pages with help from ChatGPT'
                    ),
                    '", I used an interactive approach to build new software far faster than I would have done ' +
                    'previously.  I\'ve used this approach to develop the core of several other software components, including ' +
                    'the syntax highlighting engine used in both that, and this article.'
                ),
                h('p', {},
                    'While interactive engagement with LLMs is one of their greatest strengths, this has a dark side.  ' +
                    'LLMs excel at holding conversations, and we can be seduced into spending hours ' +
                    'discussing minor details while ignoring substantive issues that might render those other conversations ' +
                    'irrelevant (yak shaving and bikeshedding as a service).'
                ),
                h('p', {},
                    'Another person might stop and ask questions during a conversation, but an LLM will only do this if ' +
                    'asked.  Ambiguity can also lead an LLM to descend into hallucinatory rabbit holes as it tries to fill any ' +
                    'void with creative, irrelevant, or plain wrong, content.'
                ),
                h('p', {},
                    'We might dismiss the use of LLMs as a result.  Still, in conventional software development, we know that ' +
                    'once more than a single developer is working on a software design, we need to spend time ensuring our ' +
                    'team maintains a shared view of what will be built.  With an LLM, we must recognize that we always ' +
                    'have at least two team members.'
                ),
                h('p', {},
                    'As with an all-human team, we can help maintain alignment by crafting a long-form description of our ' +
                    'goals.  We can present detailed written requirements to the LLM, giving it a clearer picture of ' +
                    'what we want it to achieve.  While this will only partially prevent an LLM from wandering off track, ' +
                    'if it does, this gives us a way to bring it back to where we want it.'
                )
            ),
            h('section', {},
                h('h3', {}, 'Consider all relevant skills and perspectives'),
                h('p', {}, 
                    'In conventional software development, we recognize the value of many different skills and perspectives.  ' +
                    'We require product definition and vision aligned with commercial goals.  We need developers who are ' +
                    'experts in all relevant technologies.  We need to plan for testing.  We may need experts in UX and UI, ' +
                    'security, operational deployment, etc.  Each role can provide more details about what we\'re ' +
                    'looking to build.'
                ),
                h('p', {},
                    'With an LLM, we\'re looking to outsource the implementation of some or all of these elements, so we need ' +
                    'to give our LLM a clear understanding of each one.  Even if we want the LLM to focus solely on the coding ' +
                    'aspect of software development, our LLM must understand these other motivations.'
                ),
                h('p', {},
                    'Consider a testability requirement, for instance.  We might emphasize the need for our software to ' +
                    'support 90%+ automated test coverage.  This requirement could lead to an implementation that allows for ' +
                    'easier mocking.  We must explicitly state this to avoid our LLM taking a different approach.  ' +
                    'Similarly, providing examples of specific user journeys or behavioural requirements can guide the LLM ' +
                    'towards unique and innovative solutions.'
                ),
                h('p', {},
                    'Notably, we have not eliminated the need for software engineering expertise.  Decisions around technology ' +
                    'choices and implementation strategies can also be captured as requirements.'
                )
            ),
            h('section', {},
                h('h3', {}, 'Describe all requirements comprehensively, and exactly once'),
                h('p', {},
                    'One of the major causes of confusion and error within human software development teams is a misalignment ' +
                    'of expectations about how software should work.  Often, this arises from requirements ' +
                    'that are overlapping, ambiguous, or, even worse, contradictory.'
                ),
                h('p', {},
                    'If such things confuse humans, we can expect them to confuse LLMs too.  Unlike humans, however, LLMs ' +
                    'won\'t tell us they\'re confused.  Instead, they\'ll do unexpected things.  While not without some ' +
                    'criticism,  we can take inspiration from Barbara Minto\'s MECE (mutually exclusive, collectively ' +
                    'exhaustive) principle.'
                ),
                h('p', {},
                    'Given a list of requirements, MECE aims to drive out ambiguity and contradiction:'
                ),
                h('ul', {},
                    h('li', {},
                        h('em', {},
                            'Mutually exclusive'
                        ),
                        ': the list\'s members should exclude each other, i.e. be distinct from each other.'
                    ),
                    h('li', {},
                        h('em', {},
                            'Collectively exhaustive'
                        ),
                        ': the list\'s members should exhaust the relevant field, i.e. contain everything that belongs on ' +
                        'the list.'
                    )
                ),
                h('p', {},
                    'By carefully enumerating requirements, we provide clarify not only for any LLM but also make it ' +
                    'far easier for our human designers to understand the details of the software they\'re shaping.'
                )
            ),
            h('section', {},
                h('h3', {}, 'Use examples that offer clarity for requirements'),
                h('p', {},
                    'A conventional approach to software product development is to provide "acceptance criteria".  Often, ' +
                    'these are specific examples of how the completed software should behave.  Such examples allow developers ' +
                    'and testers to check their understanding of how the finished software should operate.'
                ),
                h('p', {},
                    'These examples do not replace the requirements but add clarity around them.'
                ),
                h('p', {},
                    'This approach also works for LLMs.  By providing examples of use, an LLM can more readily verify ' +
                    'that any software it produces meets the expectation of whoever provided the prompt.'
                )
            ),
        ),
        h('section', {},
            h('h2', {}, 'A practical example'),
            h('p', {},
                'Let\'s look at an example.'
            ),
            h('p', {},
                'In "',
                h('a', {href: '/blog/2024-07-15-0800', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-07-15-0800')},
                    'Can my tools build tools?'
                ),
                '", I posed the problem of building a pre-rendering application.  Let\'s expand that into a complete ' +
                'application called "siterender" and define a richer set of features than the original:'
            ),
            h('ul', {},
                h('li', {}, 'Fetches and parses sitemaps from URLs or local files.'),
                h('li', {}, 'Supports sitemaps and sitemap indexes (nested sitemaps).'),
                h('li', {}, 'Replaces URL prefixes based on specified rules.'),
                h('li', {}, 'Renders pages in parallel using Puppeteer.'),
                h('li', {}, 'Parallelizes rendering operations for maximum speed/throughput.'),
                h('li', {}, 'Saves rendered HTML content to a specified output directory.'),
                h('li', {}, 'Retry mechanism for rendering and browser launch/close operations.')
            ),
            h('section', {},
                h('h3', {}, 'The MIP'),
                h('p', {},
                    h('a', {href: '#the-mip', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-08-03-1000#the-mip')},
                        'The MIP'
                    ),
                    ' is at the end of the article.  The prompt is 77 lines, but some are pretty long.  This format ' +
                    'isn\'t ideal, but it works for now.'
                ),
                h('p', {},
                    'The prompt is divided into sections, each with a distinct set of requirements that ' +
                    'describe our desired application behaviour.  This prompt was itself iterated from a much earlier form, ' +
                    'which involved having ChatGPT 4o reformat it and suggest improvements to remove ambiguity or overlaps.'
                ),
                h('p', {},
                    'I used earlier versions of the prompt to build fully working implementations, but this is the first ' +
                    'version that was implemented in TypeScript.  Most earlier implementations used JavaScript, ' +
                    'but one edition was built using Python. The Python version was 20% slower, however!'
                ),
            ),
            h('section', {},
                h('h3', {}, 'The implementation'),
                h('p', {},
                    'The output ',
                    h('a', {href: '#the-code', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-08-03-1000#the-code')},
                        'TypeScript source code'
                    ),
                    ' appears at the end of this article.  It consists of over 300 lines of code split across two files.'
                ),
                h('p', {},
                    'As noted in the section on limitations, ChatGPT didn\'t produce a working version of this software the ' +
                    'first time but did so with one of the earlier JavaScript editions.  To mitigate this, I asked ' +
                    'how it implemented each feature in an interactive dialogue.  Where necessary, it ' +
                    'changed its implementation to conform with the requirements.'
                ),
                h('p', {},
                    'The total interactive time required to reach the published output was around 90 minutes, which ' +
                    'included about 30 minutes of testing.  The prompt was evolved over a few weeks.  While not part of the ' +
                    'prompt provided here, a further interactive session lasting 3 hours resulted in a test program that ' +
                    'provides > 90% test coverage for the ',
                    h('code', {}, 'logic.ts'),
                    ' file, including test error handling and retry logic.  A future version of the prompt will be updated to ' +
                    'include that testability requirement.  During the 3 hours, the approach was to "pair program" with the ' +
                    'LLM, letting it have the keyboard.'
                ),
                h('p', {},
                    'The general quality of the code is high.  I\'m not too fond of the use of a global variable for the XML ' +
                    'parser in ',
                    h('code', {}, 'logic.ts'),
                    ', but we can refine this later.  The implementation is robust and testable.  If we disconnect the network, ' +
                    'the retry logic keeps going and will recover if the network comes back up.  Similarly, if we set the number ' +
                    'of parallel rendering tasks to 8x the number of CPUs, we see a lot of timeouts and retries as Chrome ' +
                    'can\'t keep up, but the application completes its task quickly.'
                )
            ),
            h('section', {},
                h('h3', {}, 'Project site'),
                h('p', {},
                    'I decided to make the siterender application a distinct project so you can follow and help shape its ' +
                    'evolution.'
                ),
                h('p', {},
                    'The project site for siterender is here: ',
                    h('a', {href: '/projects/siterender', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender')},
                        'siterender'
                    ),
                    '.  The site has links to the source code and notes about how to contribute if you\'re interested.'
                ),
            ),
        ),
        h('section', {},
            h('h2', {}, 'Conclusion'),
            h('p', {},
                'I\'ve introduced the concept of a Maximal Instruction Prompt (MIP) and explained how I\'ve been using this ' +
                'approach to build software with ChatGPT.'
            ),
            h('p', {},
                'Why not give this a try yourself?  If you do, I\'m curious to hear about your experiences!'
            )
        ),
        h('section', {},
            h('h2', {}, 'The MIP and the code'),
            h('h3', {id: 'the-mip'}, 'The MIP'),
            blogPrompt_2024_08_03_1000(),
            h('h3', {id: 'the-code'}, 'prerender.ts'),
            blogSiterenderTS_2024_08_03_1000(),
            h('h3', {}, 'logic.ts'),
            blogLogicTS_2024_08_03_1000(),
        ),
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
    'Maximal Instruction Prompting: a strategy for software development with LLMs',
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
