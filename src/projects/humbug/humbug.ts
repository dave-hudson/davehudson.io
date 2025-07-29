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
                    h('section', {},
                        h('h2', {}, 'Background'),
                        h('p', {},
                            'Humbug was started as a project to build tools that would let me explore and develop legacy codebases, ' +
                            'but has since evolved into a more general purpose platform.  "Traditional" operating systems I\'ve ' +
                            'worked on, or designed, were able to draw on significant research from the 70s, 80s, and 90s, but ' +
                            'AI changes the game.'
                        ),
                        h('p', {},
                            'As soon as we start to consider an AI participant, we are dealing with a computational entity that ' +
                            'is no longer deterministic.  It can do incredible things we couldn\'t have imagined before, but this ' +
                            'also means we now have a component that is capable of doing the same silly or dangerous things a ' +
                            'human could do.  These are the same things a traditional OS attempts to mitigate.  This means we need ' +
                            'to rethink how we approach security, privacy, and trust.'
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
