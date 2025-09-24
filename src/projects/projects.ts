import {h, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../lib/page";
import {navigateEvent, routeDetails} from '../app';
import {ProjectPage} from './ProjectPage';
import {projectAIFPL} from './aifpl/aifpl';
import {projectC8} from './c8/c8';
import {projectCountdown} from './countdown/countdown';
import {projectGcc} from './gcc/gcc';
import {projectHumbug} from './humbug/humbug';
import {projectLiquorice} from './liquorice/liquorice';
import {projectMetaphor} from './metaphor/metaphor';
import {projectMkdosfs} from './mkdosfs/mkdosfs';
import {projectSiterender} from './siterender/siterender';
import {projectVSTa} from './vsta/vsta';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const projectsContent: ProjectPage[] = [
    projectAIFPL,
    projectC8,
    projectCountdown,
    projectGcc,
    projectHumbug,
    projectLiquorice,
    projectMetaphor,
    projectMkdosfs,
    projectSiterender,
    projectVSTa
];

export function projectsPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Open source projects',
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'I\'ve been involved in building open source software since the early 90s.  Unfortunately I can\'t find ' +
                            'links for some of them, but here are ones for which I do.  The most recent ones are at the top.'
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/humbug'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/humbug')
                                    },
                                    'Humbug'
                                )
                            ),
                            h('p', {},
                                'Humbug is an operating system for human/AI collaboration.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/aifpl'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/aifpl')
                                    },
                                    'AIFPL'
                                )
                            ),
                            h('p', {},
                                'A Lisp-inspired functional programming language designed specifically for AI use.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/metaphor'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/metaphor')
                                    },
                                    'Metaphor'
                                )
                            ),
                            h('p', {},
                                'Metaphor is an AI prompt creation language.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/siterender'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender')
                                    },
                                    'siterender'
                                )
                            ),
                            h('p', {},
                                'Have ChatGPT write a pre-rendering tool for websites!'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/countdown'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/countdown')
                                    },
                                    'countdown'
                                )
                            ),
                            h('p', {},
                                'Find solutions to the "Countdown" numbers game as quickly as possible.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/c8'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/c8')
                                    },
                                    'c8'
                                )
                            ),
                            h('p', {},
                                'A high performance arbitrary precision natural numbers, integers, and rational numbers library written ' +
                                'in "modern" C++.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/gcc'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/gcc')
                                    },
                                    'gcc (Ubicom processor backends)'
                                )
                            ),
                            h('p', {},
                                'gcc backends for Ubicom\'s IP2k and Ubicom32 processor families.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/liquorice'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/liquorice')
                                    },
                                    'Liquorice'
                                )
                            ),
                            h('p', {},
                                'A very small operating system and IPv4 network stack, written entirely from scratch.  It was ' +
                                'designed to run on 8-bit Atmel AVR and 32-bit x86 processors.'
                            )
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/vsta'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/vsta')
                                    },
                                    'VSTa'
                                )
                            ),
                            h('p', {},
                                'A self-hosting microkernel operating system built in the 1990s.'
                            ),
                        ),
                        h('section', {},
                            h('h2', {},
                                h('a', {
                                        href: ('/projects/mkdosfs'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/mkdosfs')
                                    },
                                    'mkdosfs'
                                )
                            ),
                            h('p', {},
                                'The Linux mkdosfs command.'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

// Collect all the routes to be used with the project pages.
export function getProjectRoutes() {
    let projectRoutes: Map<string, routeDetails> = new Map();

    for (let i = 0; i < projectsContent.length; i++) {
        projectRoutes.set(projectsContent[i].hRef, {
            title: projectsContent[i].title,
            render: projectsContent[i].pageFunction,
            description: projectsContent[i].description,
            imageURL: 'https://davehudson.io/about/dave.webp',
            pageType: 'website'
        });
    }

    return projectRoutes;
}
