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
                                ' area.  I also started keeping design notes in the ',
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
