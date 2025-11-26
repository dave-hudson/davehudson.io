import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectHumbugPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Humbug',
                subtitle: 'An operating system for human/AI collaboration'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'Humbug is a project that explores building a secure and reliable operating system for human/AI ' +
                            'collaboration.'
                        ),
                        h('p', {},
                            'Traditional operating systems are designed to securely use and share hardware resources.  The best ones attempt ' +
                            'to protect users from buggy and malicious software.  The weakest link in this security chain is the human user, ' +
                            'who can be tricked into running unsafe software or leaking access to sensitive data.'
                        ),
                        h('p', {},
                            'The introduction of AI suddenly makes this a lot more complicated.  Our default model of the last few decades was ' +
                            'an unpredictable human interacting with what should be a predictable system.  With AI participant our unpredictable ' +
                            'human is suddenly dealing with an equally unpredictable AI too.'
                        ),
                        h('p', {},
                            'We need to rethink our approach to security, privacy, and trust.'
                        ),
                        h('figure', {},
                            h('img', {
                                    src: '/projects/humbug/v0.22-demo.gif',
                                    alt: 'A quick demo of Humbug v0.22'
                                }
                            ),
                            h('figcaption', {}, 'A quick demo of Humbug v0.22')
                        ),
                        h('section', {},
                            h('h2', {}, 'Background'),
                            h('p', {},
                                'Humbug was started as a project to build tools that would let me explore and develop legacy codebases, ' +
                                'but has since evolved into a more general purpose platform.  "Traditional" operating systems I\'ve ' +
                                'worked on, or designed, were able to draw on significant research from the 70s, 80s, and 90s, but ' +
                                'AI changes the game.'
                            ),
                            h('p', {},
                                'The blog post, "',
                                h('a', {href: '/blog/2025-08-11', target: '_blank'},
                                    'A path to an AI operating system'
                                ),
                                '" outlines some of my thoughts on why AI changes many long-standing assumptions.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Design philosophy'),
                            h('p', {},
                                'Humbug is designed to offer AIs a first class experience, while still catering to the needs of human users.  The UI ' +
                                'is designed to allow both humans and AIs to interact with it, allowing for a more collaborative experience.'
                            ),
                            h('p', {},
                                'As current LLMs are still prone to making serious mistakes, Humbug is designed to operate with a human in the loop.  ' +
                                'Wherever potentially dangerous operations are performed, the human is consulted for approval, and the tool calling ' +
                                'approvals cannot be bypassed.'
                            ),
                            h('p', {},
                                'For example, an AI may read a file, but cannot write to it without human approval.  An AI may read a terminal window, ' +
                                'but cannot type into it without human agreeing.  As AI may edit a file in an editor window, but cannot save it without ' +
                                'a human saying it\'s ok.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Tool system'
                            ),
                            h('p', {},
                                'A key aspect of this type of system is the ability for the AI to make use of tools.  Humbug\'s tool system is designed to ' +
                                'provdide a range of orthogonal tools that can be combined to perform complex tasks.  Tools are designed with composability ' +
                                'in mind, allowing AIs to build complex workflows from simple building blocks.'
                            ),
                            h('p', {},
                                'A major expression of this concept is AIFPL (AI Functional Programming Language).  AIFPL is a pure, higher-order, ' +
                                'functional programming language designed specifically for AIs to use to perform algorithmic tasks.  As it is side-effect ' +
                                'free, it is safe for an AI to use without human supervision.'
                            ),
                            h('p', {},
                                'The tool system has taken a pragmatic approach.  Rather than trying to build a perfect system from the ground up, ' +
                                'Humbug has been built iteratively.  New tools have been added as needed to support specific use cases, many of which ' +
                                'have related to building the next parts of Humbug itself.  The aim is that new tools should demonstrably ' +
                                'accelerate real problems.  It also means that some tools have already come and gone, ' +
                                'with newer and better tools superseding them.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Related projects'),
                            h('p', {},
                                'Humbug incorporates several other projects I\'m working on, including:',
                            ),
                            h('ul', {},
                                h('li', {},
                                    h('a', {href: '/projects/aifpl', target: '_blank'}, 'AIFPL')
                                ),
                                h('li', {},
                                    h('a', {href: '/projects/metaphor', target: '_blank'}, 'Metaphor')
                                )
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'More information'),
                            h('p', {},
                                'You can find out more about the project on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug'
                                ),
                                '.'
                            ),
                            h('p', {},
                                'This site also hosts more information in the ',
                                h('a', {href: '/blog'}, 'blog'),
                                ' area.  You can also find design notes published since early August 2025 in the ',
                                h('a', {href: '/notes'}, 'notes'),
                                ' section.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Source code and binaries'),
                            h('p', {},
                                'The source code can be found on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug'
                                )
                            ),
                            h('p', {},
                                'MacOS binaries for each release can be found on the GitHub releases page: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug/releases', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug/releases'
                                ),
                                '.'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectHumbug = new ProjectPage(
    'humbug',
    '/projects/humbug',
    'An AI operating system.',
    projectHumbugPage
);
