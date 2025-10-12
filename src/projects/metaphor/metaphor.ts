import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectMetaphorPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Metaphor',
                subtitle: 'An AI prompt creation language'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'Metaphor is an AI prompt creation language designed to help users generate high-quality prompts for a ' +
                            'wide range of AI models.'
                        ),
                        h('p', {},
                            'It has a simple declarative syntax that allows users to define roles, context, and actions in a ' +
                            'structured way. As with programming languages, Metaphor files can be included in other files, ' +
                            'allowing for modular and reusable prompt definitions.'
                        ),
                        h('p', {},
                            'Metaphor emphasizes the importance of context.  By providing precise context it allows users to generate prompts that focus ' +
                            'an AI\'s attention on the specific relevant information, rather than drawing on its entire training corpus.  This ' +
                            'dramatically reduces the chances of hallucinations and makes it much easier to get consistent results.'
                        ),
                        h('section', {},
                            h('h2', {}, 'Metaphor and Humbug'),
                            h('p', {},
                                'Metaphor has been used extensively in the development of ',
                                h('a', {href: '/projects/humbug'},
                                    'Humbug'
                                ),
                                '. Humbug is an experimental human/AI operating system.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Blog posts'),
                            h('p', {},
                                'I have written a few blog posts about Metaphor, which you can read here:'
                            ),
                            h('ul', {},
                                h('li', {},
                                    h('a', {href: '/blog/2025-06-01'},
                                        'Writing tests with Metaphor (2025-06-01)'
                                    )
                                ),
                                h('li', {},
                                    h('a', {href: '/blog/2025-04-24'},
                                        'Introducing Metaphor commands (2025-04-24)'
                                    )
                                ),
                                h('li', {},
                                    h('a', {href: '/blog/2025-04-04'},
                                        'The importance of context in AI-assisted coding (2025-04-04)'
                                    )
                                ),
                                h('li', {},
                                    h('a', {href: '/blog/2024-11-15'},
                                        'Commit-critic: An AI-powered, AI-built code review tool (2024-11-15)'
                                    )
                                ),
                                h('li', {},
                                    h('a', {href: '/blog/2024-11-06'},
                                        'Code reviews using Metaphor (2024-11-06)'
                                    )
                                ),
                                h('li', {},
                                    h('a', {href: '/blog/2024-11-01'},
                                        'Introducing Metaphor: An AI-first software development language (2024-11-01)'
                                    )
                                )
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Source code'),
                            h('p', {},
                                'A tutorial for using Metaphor can be found on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/getting-started-with-metaphor', target: '_blank'},
                                    'https://github.com/m6r-ai/getting-started-with-metaphor'
                                )
                            ),
                            h('p', {},
                                'The source code for the stand-alone Metaphor prompt compiler can be found on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/m6rc', target: '_blank'},
                                    'https://github.com/m6r-ai/m6rc'
                                )
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectMetaphor = new ProjectPage(
    'metaphor',
    '/projects/metaphor',
    'An AI context generation language.',
    projectMetaphorPage
);
