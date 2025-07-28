import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_04_04(): VElement[] {
    return [
        h('p', {},
            'AI tools like Claude, GitHub Copilot, and ChatGPT have rapidly become essential companions for developers. ' +
            'Yet many experienced engineers find themselves frustrated when these powerful assistants produce code that ' +
            'misses the mark.'
        ),
        h('p', {},
            'While there may be many nuanced reasons for this, they often come down to a single core problem: AI ' +
            'assistants need comprehensive context, just like human programmers do.'
        ),
        h('p', {},
            'If you were onboarding a new developer to your team, you wouldn\'t simply say "build a login page" and walk ' +
            'away. You\'d provide project documentation, explain design patterns, discuss user requirements, outline ' +
            'technical constraints, and explain your testing strategy. These are all things your new colleague would ' +
            'need to be set up for success.'
        ),
        h('p', {},
            'AI requires this same level of context to deliver truly valuable code.'
        )
    ];
}

function blogArticle_2025_04_04(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Why context matters'),
            h('p', {},
                'AIs have a wealth of generic training, but this can actually make things worse if you are unclear about your ' +
                'needs. They might know 50 ways to fulfil a generic-sounding request and 49 of those won\'t be the one you ' +
                'wanted.'
            ),
            h('p', {},
                'With AI\'s incredible capabilities, it\'s easy to forget they can\'t do some things human engineers would do. ' +
                'They don\'t start out with any understanding of your unique project. Unlike human team members who build ' +
                'shared understanding through daily collaboration, AI doesn\'t do this. It has no inherent knowledge of your ' +
                'application\'s purpose, architecture decisions, or business requirements.'
            ),
            h('p', {},
                'This can be deeply frustrating, especially where some of those elements we co-developed with AI. ' +
                'You want to scream at it "Why are you doing this wrong?  You literally only helped me do it right 10 minutes ' +
                'ago."'
            ),
            h('p', {},
                'Ironically, we\'re probably quite familiar with this sort of behaviour from movies like Groundhog Day where most ' +
                'of the characters have no idea what they did on each previous version of the same day!'
            ),
            h('p', {},
                'When we provide only minimal context, AI models make assumptions to fill any gaps. These assumptions often ' +
                'lead to code that fails to integrate properly with your existing systems, overlooks critical edge cases, or ' +
                'ignores performance considerations essential to your application.'
            ),
            h('p', {},
                'To make matters worse, while people naturally ask clarifying questions when information is missing, AI ' +
                'assistants rarely do, unless you ask them to. The responsibility falls on us to provide ' +
                'comprehensive context upfront.'
            ),
            h('p', {},
                'The quality of code an AI produces is directly proportional to the quality of context it receives: garbage in, ' +
                'garbage out. Or, perhaps in this instance: vagueness in, vagueness out.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Elements of good context'),
            h('p', {},
                'If we\'re clear about what we want to do, it\'s amazing how much more focused our AI assistants can be. ' +
                'One favourite approach I have is to present an AI with all the context I believe it needs, but instead of asking ' +
                'it to build software, I ask it "what\'s unclear, contradictory, or ambiguous, in the information I have just ' +
                'given you?" The results are often very illuminating!'
            ),
            h('p', {},
                'I was going to write about what I\'ve learned about providing good context, but I realized most of that ' +
                'had come by asking various AI models what they would need to know. Instead, I asked Claude what it would say ' +
                'to you on this subject (having given it the context of what this article is about). It\'s reply mirrored the one ' +
                'I was going to write, but is probably more eloquent, and it\'s a great checklist:'
            ),
            h('blockquote', {},
                h('p', {},
                    h('strong', {}, 'Project background and goals'),
                    ' provide the "why" behind the code. Explaining your application\'s purpose, ' +
                    'target users, and how this particular code fits into the larger system helps the AI understand the ' +
                    'importance of certain features or trade-offs. For example, knowing that code will run in a time-critical ' +
                    'medical application signals different priorities than code for an internal admin dashboard.'
                ),
                h('p', {},
                    h('strong', {}, 'Technical constraints'),
                    ' establish the boundaries within which solutions must operate. Specifying your ' +
                    'programming language version, frameworks, libraries, and deployment environment ensures compatibility. ' +
                    'If you\'re working with React 18 and TypeScript in a serverless environment, the AI needs to know this to ' +
                    'provide appropriate recommendations.'
                ),
                h('p', {},
                    h('strong', {}, 'User requirements and edge cases'),
                    ' help the AI anticipate real-world usage. Detailing expected inputs ' +
                    'and outputs, error handling expectations, accessibility needs, and security requirements leads to more robust ' +
                    'code. If your form needs to handle international phone numbers or your API must respond within 200ms, these ' +
                    'specifications matter tremendously.'
                ),
                h('p', {},
                    h('strong', {}, 'Existing codebase structure'),
                    ' enables consistency with your established patterns. Sharing information about ' +
                    'file organization, naming conventions, design patterns, and API structures helps ensure the generated code ' +
                    'feels like a natural extension of what exists. This prevents the cognitive dissonance of having AI-generated ' +
                    'code that follows completely different conventions than the rest of your project.'
                ),
                h('p', {},
                    h('strong', {}, 'Performance considerations'),
                    ' guide optimization efforts. Being explicit about expected data volumes, ' +
                    'response time requirements, memory constraints, and scalability needs helps the AI make appropriate algorithmic ' +
                    'and architectural choices. The solution for processing a few records daily differs dramatically from one ' +
                    'handling millions of transactions per hour.'
                ),
                h('p', {},
                    h('strong', {}, 'Coding standards and style preferences'),
                    ' ensure maintainability. Clarifying your expectations around ' +
                    'formatting, documentation, testing, and code review criteria produces code that meets your quality standards. ' +
                    'This reduces the need for extensive rewrites and helps the generated code pass through your existing quality gates.'
                )
            ),
            h('p', {},
                'None of this should be too surprising when we think about it. It\'s exactly the sort of contextual information we ' +
                'would provide another person.'
            ),
            h('p', {},
                'More from Claude:'
            ),
            h('blockquote', {},
                h('p', {},
                    'Developing the skill of providing effective context is crucial for productive AI collaboration. Several strategies ' +
                    'can help:'
                ),
                h('p', {},
                    h('strong', {}, 'Start with the "why" before the "what"'),
                    ' to orient the AI to your goals. Explaining the business or user ' +
                    'problem being solved provides crucial perspective. Instead of asking for "a function to validate input," share that ' +
                    'you need "a function to validate user-submitted addresses for a shipping label generator where accuracy is critical ' +
                    'for delivery success."'
                ),
                h('p', {},
                    h('strong', {}, 'Share relevant code snippets'),
                    ' from your existing codebase. These examples help the AI understand your ' +
                    'conventions and patterns. Showing how you\'ve implemented similar components or how the new code will interact ' +
                    'with existing systems provides concrete guidance the AI can follow.'
                ),
                h('p', {},
                    h('strong', {}, 'Describe the problem from multiple angles'),
                    ' - technical, user experience, business value, and maintenance ' +
                    'perspectives. This multi-dimensional context helps the AI make appropriate trade-offs. For example, explaining ' +
                    'that a feature will be used by non-technical staff on potentially slow connections guides interface design choices.'
                ),
                h('p', {},
                    h('strong', {}, 'Specify your expertise level and what you need explained'),
                    '. If you\'re learning a new technology, request ' +
                    'commented code with explanations. If you\'re an expert seeking efficiency, ask for concise, optimized solutions. ' +
                    'This calibrates the AI\'s response to your needs rather than receiving explanations you don\'t need or missing ones ' +
                    'you do.'
                ),
                h('p', {},
                    h('strong', {}, 'Iterate on solutions with additional context.'),
                    ' AI collaboration works best as a conversation. Start with ' +
                    'your initial request, evaluate the response, then refine with additional details. Each iteration builds a richer ' +
                    'shared understanding, improving results with each cycle.'
                ),
                h('p', {},
                    h('strong', {}, 'Structure your context effectively'),
                    ' by organizing information into clear sections, putting critical details ' +
                    'first. Eliminate irrelevant information like organizational politics or historical decisions that no ' +
                    'longer affect the current implementation.'
                )
            ),
            h('p', {},
                'Having used variations on all these for the last 6 months, I can attest to their effectiveness.'
            )
        ),
        h('section', {},
            h('h2', {}, 'More context please!'),
            h('p', {},
                'Our AI tools only know what we tell them. The more specific and comprehensive our context, the more focused and ' +
                'helpful their responses become. While this article relates to coding, the principle applies to a wide range of AI ' +
                'interactions.'
            ),
            h('p', {},
                'In my own experience, providing rich context has transformed my results with AI-assisted coding. In the last few ' +
                'months, I\'ve seen detailed context enable AIs to refactor thousands of lines of code or add complex new features. ' +
                'When the results aren\'t quite right, I\'ve learned the problem usually lies in the context I provided. Fix that, ' +
                'and everything improves.'
            ),
            h('p', {},
                'I have seen a lot of great results, but here are some memorable ones:'
            ),
            h('ul', {},
                h('li', {}, 'Having AI help me iterate through 4 completely different designs for a terminal emulator in 15 days.'),
                h('li', {}, 'Building the entire search functionality for a complex development platform.'),
                h('li', {}, 'Harmonizing 2 completely different styles of lexers and parsers to use a new shared design.'),
                h('li', {}, 'Building an AI-powered log analysis tool.'),
                h('li', {}, 'Taking a large codebase and building new automated tests from manual testing scripts.')
            ),
            h('p', {},
                'The terminal emulator example also included a couple of very memorable 1000+ line refactors in which object classes ' +
                'were split and merged, but perhaps the most impressive change was watching an AI optimise the terminal rendering engine. ' +
                'In that instance it rewrote about 300 lines of code, implemented 5 major optimization strategies and gave a 6x performance ' +
                'improvement over something that actually worked quite well before!'
            ),
            h('p', {},
                'I\'m not alone in this discovery. Recently, I\'ve observed a growing community of developers achieving remarkable ' +
                'success with AI coding assistants. The common thread? They\'ve all developed strategies for capturing and ' +
                'communicating context.'
            ),
            h('p', {},
                'The insight that context was crucial led to the original design of Metaphor. Metaphor is a language specifically ' +
                'desiged to help capture and organize this critical context information. The examples I mentioned earlier all ' +
                'relied on Metaphor and the Metaphor prompt compiler to capture and provide context to the AIs. You ' +
                'can find out more about Metaphor at ',
                h('a', {
                    href: 'https://davehudson.io/projects/metaphor',
                    target: '_blank',
                    title: 'Learn more about Metaphor'
                }, 'https://davehudson.io/projects/metaphor'),
                '.'
            ),
            h('p', {},
                'I anticipate there will be developers reading this who may be inclined to say "that\'s great, but won\'t this take ' +
                'a huge amount of time?" It\'s fair to say it does require some time and discipline, but in many cases the sort ' +
                'of information we\'re talking about already exists in digital form (and yes, Metaphor makes this easy if you want ' +
                'to try it). It\'s also an area where AI can help too. If you have a well structured format for your context, ' +
                'you can ask an AI to give you modifications to meet your needs. Importantly, however, if you invest time in ' +
                'providing context to allow an AI to deliver code dramatically faster and more reliably, the overall savings can be huge.'
            ),
            h('p', {},
                'Raw AI models possess incredible capabilities, but it\'s the quality of context we provide that transforms them ' +
                'from generic tools into focused, high-performing development partners. Just as with human collaboration, the ' +
                'effort we put into clear communication directly determines the value we receive in return.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2025-04-04/context.webp',
                    alt: 'An example of context described in Metaphor.'
                })
             )
        )
    ];
}

export const blogPost_2025_04_04 = new BlogPost(
    'The importance of context in AI-assisted coding',
    '2025-04-04',
    '/blog/2025-04-04',
    'Why providing comprehensive context is crucial for effective AI-assisted coding and how to do it well.',
    '/blog/2025-04-04/context.webp',
    null,
    blogOpening_2025_04_04,
    blogArticle_2025_04_04,
    null
);
