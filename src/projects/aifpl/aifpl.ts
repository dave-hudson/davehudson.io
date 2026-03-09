import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {navigateEvent} from '../../app';
import {ProjectPage} from '../ProjectPage';

export function projectAIFPLPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'AIFPL (AI Functional Programming Language)',
                subtitle: 'The original name for what is now Menai'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'AIFPL (AI Functional Programming Language) was the original name for the pure functional ' +
                            'programming language designed specifically for use by an LLM. In February 2026 the language ' +
                            'was renamed to ',
                            h('strong', {}, 'Menai')
                        ),
                        h('p', {},
                            'All current documentation, examples, and source code can be found on the ',
                            h('a', {
                                    href: '/projects/menai',
                                    onclick: (e: MouseEvent) => navigateEvent(e, '/projects/menai')
                                },
                                'Menai project page'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectAIFPL = new ProjectPage(
    'AIFPL',
    '/projects/aifpl',
    'AIFPL was the original name for Menai, a pure functional programming language designed specifically for AI use.',
    projectAIFPLPage
);
