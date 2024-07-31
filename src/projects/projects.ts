import { h, VNode } from '../lib/dvdi';
import { pageHeader, pageFooter } from "../lib/page";
import { navigateEvent, routeDetails } from '../app';
import { ProjectPage } from './ProjectPage';
import { projectC8 } from './c8/c8';
import { projectCountdown } from './countdown/countdown';
import { projectGcc } from './gcc/gcc';
import { projectLiquorice } from './Liquorice/Liquorice';
import { projectMkdosfs } from './mkdosfs/mkdosfs';
import { projectSiterender } from './siterender/siterender';
import { projectVSTa } from './VSTa/VSTa';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const projectsContent: ProjectPage[] = [
    projectC8,
    projectCountdown,
    projectGcc,
    projectLiquorice,
    projectMkdosfs,
    projectSiterender,
    projectVSTa
];

export function projectsPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, 'Open source projects'),
            h('p', { className: 'meta'},
                'Last updated: ',
                h('time', { datetime: '2024-07-31T18:00'}, '2024-07-31 18:00')
            ),
            h('p', {},
                'I\'ve been involved in building open source software since the early 90s.  Unfortunately I can\'t find ' +
                'links for some of them, but here are ones for which I do.'
            ),
            h('section', {},
                h('hr', {}),
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
                h('hr', {}),
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
                h('hr', {}),
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
                h('hr', {}),
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
                h('hr', {}),
                h('h2', {},
                    h('a', {
                            href: ('/projects/Liquorice'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/Liquorice')
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
                h('hr', {}),
                h('h2', {},
                    h('a', {
                            href: ('/projects/VSTa'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/VSTa')
                        },
                        'VSTa'
                    )
                ),
                h('p', {},
                    'A self-hosting microkernel operating system build in the 1990s.'
                ),
            ),
            h('section', {},
                h('hr', {}),
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
        ),
        pageFooter()
    );
}

// Collect all the routes to be used with the project pages.
export function getProjectRoutes() {
    let projectRoutes: Map<string, routeDetails> = new Map();

    for (let i = 0; i < projectsContent.length; i++) {
        projectRoutes.set(projectsContent[i].hRef, {
            title: 'Open source projects',
            render: projectsContent[i].pageFunction,
            description: 'Open source projects',
            imageURL: 'https://davehudson.io/about/dave.html',
            pageType: 'website'
        });
    }

    return projectRoutes;
}
