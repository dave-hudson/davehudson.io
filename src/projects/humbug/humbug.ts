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
                    h('section', {},
                        h('h2', {}, 'Background'),
                        h('p', {},
                            'Humbug was started as a project to build tools that would let me explore and develop legacy codebases, ' +
                            'but has since evolved into a more general purpose platform.  "Traditional" operating systems I\'ve ' +
                            'worked on, or designed, were able to draw on significant research from the 70s, 80s, and 90s, but ' +
                            'AI changes the game.'
                        ),
                        h('p', {},
                            'You can find out more about the project on GitHub: ',
                            h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                'https://github.com/m6r-ai/humbug'
                            ),
                            '.'
                        ),
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
                            'MacOS binaries for the latest release can be found on the GitHub releases page: ',
                            h('a', {href: 'https://github.com/m6r-ai/humbug/releases', target: '_blank'},
                                'https://github.com/m6r-ai/humbug/releases'
                            ),
                            '.'
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
