import { h, VNode } from '../lib/dvdi';
import { pageHeader, pageFooter } from "../lib/page";
import { navigateEvent, routeDetails } from '../app';
import { experimentSyntaxC } from './C/C';
import { ExperimentPage } from './ExperimentPage';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const experimentsContent: ExperimentPage[] = [
    experimentSyntaxC
];

export function experimentsPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, 'Active experiments'),
            h('section', {},
                h('h2', {}, 'Syntax highlighting'),
                h('ul', {},
                    h('li', {},
                        h('a', {
                                href: ('/experiments/C'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/C')
                            },
                            'C'
                        )
                    )
                )
            ),
        ),
        pageFooter()
    );
}

// Collect all the routes to be used with the experiment pages.
export function getExperimentRoutes() {
    let experimentRoutes: Map<string, routeDetails> = new Map();

    for (let i = 0; i < experimentsContent.length; i++) {
        experimentRoutes.set(experimentsContent[i].hRef, {
            title: 'Experimental content',
            render: experimentsContent[i].pageFunction,
            description: 'Experimental content',
            imageURL: 'https://davehudson.io/about/dave.html',
            pageType: 'website'
        });
    }

    return experimentRoutes;
}
