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
                h('time', { datetime: '2024-07-31T12:00'}, '2024-07-31 12:00')
            ),
            h('p', {},
                'I\'ve been involved in building open source software since the early 90s.  Unfortunately I can\'t find ' +
                'links for some of them, but here are ones for which I do.'
            ),
            h('ul', {},
                h('li', {}, 
                    h('a', {
                            href: ('/projects/siterender'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender')
                        },
                        'siterender'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/countdown'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/countdown')
                        },
                        'countdown'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/c8'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/c8')
                        },
                        'c8'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/gcc'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/gcc')
                        },
                        'gcc (Ubicom processor backends)'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/Liquorice'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/Liquorice')
                        },
                        'Liquorice'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/VSTa'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/VSTa')
                        },
                        'VSTa'
                    )
                ),
                h('li', {}, 
                    h('a', {
                            href: ('/projects/mkdosfs'),
                            onclick: (e: MouseEvent) => navigateEvent(e, '/projects/mkdosfs')
                        },
                        'mkdosfs'
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
            title: 'Open source projects',
            render: projectsContent[i].pageFunction,
            description: 'Open source projects',
            imageURL: 'https://davehudson.io/about/dave.html',
            pageType: 'website'
        });
    }

    return projectRoutes;
}
