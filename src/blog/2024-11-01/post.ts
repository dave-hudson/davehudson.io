import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2024_11_01(): VElement[] {
    return [
        h('p', {},
            'AI is rapidly changing the way we build software.  It offers expert advice tailored to developers\' needs and can ' +
            'quickly automate many tasks.  While impressive, these tools are still focused on implementing software in the ' +
            'programming languages we would use if AI didn\'t exist.'
        ),
        h('p', {},
            'Throughout the history of software engineering, the most significant productivity improvements have come when we ' +
            'move to a higher level of design.  So, today, I\'m announcing the first public version of a simple new language, ' +
            'Metaphor, that helps make that move to a new higher-level of design.'
        )
    ];
}

function blogArticle_2024_11_01(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'What problem is it solving?'),
            h('p', {},
                'Like people, AI agents cannot do things without clear, detailed instructions.  If we give ambiguous, ' +
                'incomplete, or conflicting instructions, they become confused and do unexpected things.  Unlike people, ' +
                'though, they usually won\'t tell you they\'re confused unless you ask them.'
            ),
            h('p', {},
                'Metaphor is designed to let you progressively build precise and unambiguous requirements so AI agents ' +
                'can generate software and documentation.  Instead of you and your team focusing on how you build software, ' +
                'you can concentrate on what you want and how you want it to behave.'
            )
        ),
        h('section', {},
            h('h2', {}, 'How does it work?'),
            h('p', {},
                'Metaphor has a very simple structure.  Within this structure, Metaphor uses natural language.'
            ),
            h('p', {},
                'In this v0.1 release, there are just 5 keywords!  These are:'
            ),
            h('ul', {},
                h('li', {},
                    h('code', {}, 'Action:'),
                    ' the action we want the agent to perform.'
                ),
                h('li', {},
                    h('code', {}, 'Context:'),
                    ' information that will be required by the AI agent to do its work.'
                ),
                h('li', {},
                    h('code', {}, 'Embed:'),
                    ' embed another file into the current metaphor file as part of the context.'
                ),
                h('li', {},
                    h('code', {}, 'Include:'),
                    ' pull other metaphor files into the current metaphor file.'
                ),
                h('li', {},
                    h('code', {}, 'Role:'),
                    ' the role to be taken by an AI agent (this is a placeholder for now but will be used later).'
                )
            ),
            h('p', {},
                'The idea is to gather all the essential elements of a software design in one place.  This includes design ' +
                'considerations that would typically come from many different disciplines.  For example, it can capture ' +
                'ideas that usually originate with product managers, software engineers, QA analysts, security experts, and ' +
                'more.'
            ),
            h('p', {},
                'Once read, this is compiled into a "large context prompt" (LCP) for one or more backend AI agents to ' +
                'process.  An LCP is designed to provide all the information an AI agent needs to perform an action.  ' +
                'Examples of actions might be reviewing requirements for ambiguity, reviewing some existing software against ' +
                'a requirement, or building something completely new.'
            ),
            h('p', {},
                'Metaphor is designed to capture everything within the LCP, so there\'s no need to rely on a continued ' +
                'dialogue or fine-tuned learning in any AI large language model (LLM).  This also makes it easy to discard ' +
                'anything that doesn\'t work as desired and try out new ideas.'
            ),
            h('p', {},
                'Modular designs are vital in software development, so Metaphor descriptions can be broken into modular ' +
                'components (',
                h('code', {}, '.m6r'),
                ' files).  This makes it easy to build library-like elements that can be reused between projects or ' +
                'leverage a project description for many different actions.'
            ),
        ),
        h('section', {},
            h('h2', {}, 'Initial release'),
            h('p', {},
                'The Metaphor prompt compiler, ',
                h('code', {}, 'm6rc'),
                ', is being released under an Apache 2.0 open-source software license to encourage you to experiment with ' +
                'it and to give you the chance to contribute to it.'
            ),
            h('p', {},
                'This is a v0.1 release, so you can expect the language and the tools to evolve quickly over the next few ' +
                'months.'
            ),
            h('p', {},
                'The software is available on GitHub at: ',
                h('a', {
                        href: 'https://github.com/m6r-ai/m6rc',
                        target: '_blank',
                        title: 'M6RC git repository on GitHub'
                    },
                    'github.com/m6r-ai/m6rc'
                )
            ),
            h('p', {},
                'There\'s also a discussion forum over on Google Groups: ',
                h('a', {
                        href: 'https://groups.google.com/g/metaphor-language',
                        target: '_blank',
                        title: 'metaphor-language discussion group'
                    },
                    'groups.google.com/g/metaphor-language'
                )
            ),
            h('p', {},
                'I look forward to seeing what you can build with Metaphor!'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2024-11-01/metaphor-whiteboard.webp',
                    alt: 'A photo of the whiteboard notes for this release of Metaphor.',
                    width: 3450,
                    height: 2361
                }),
                h('figcaption', {}, 'The whiteboard notes for Metaphor v0.1')
            )
        )
    ];
}

export const blogPost_2024_11_01 = new BlogPost(
    'Introducing Metaphor: An AI-First software development language',
    '2024-11-01',
    '/blog/2024-11-01',
    'Introducing Metaphor: An AI-First software development language.',
    '/blog/2024-11-01/metaphor-whiteboard.webp',
    null,
    blogOpening_2024_11_01,
    blogArticle_2024_11_01,
    null
);
