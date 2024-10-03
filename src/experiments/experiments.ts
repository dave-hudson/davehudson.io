import {h, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter} from "../lib/page";
import {navigateEvent, routeDetails} from '../app';
import {experimentQuiz} from './quiz/quiz';
import {experimentSyntaxC} from './c/c';
import {experimentSyntaxCpp} from './cpp/cpp';
import {experimentSyntaxCSS} from './css/css';
import {experimentSyntaxHTML} from './html/html';
import {experimentSyntaxJavaScript} from './javascript/javascript';
import {experimentSyntaxMetaphor} from './metaphor/metaphor';
import {experimentSyntaxPython} from './python/python';
import {experimentSyntaxTypeScript} from './typescript/typescript';
import {ExperimentPage} from './ExperimentPage';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const experimentsContent: ExperimentPage[] = [
    experimentQuiz,
    experimentSyntaxC,
    experimentSyntaxCpp,
    experimentSyntaxCSS,
    experimentSyntaxHTML,
    experimentSyntaxJavaScript,
    experimentSyntaxMetaphor,
    experimentSyntaxPython,
    experimentSyntaxTypeScript
];

export function experimentsPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'Active experiments'),
            h('section', {},
                h('h2', {}, 'Quiz'),
                h('ul', {},
                    h('li', {},
                        h('a', {
                                href: ('/experiments/quiz'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/quiz')
                            },
                            'Quiz'
                        )
                    ),
                ),
                h('h2', {}, 'Syntax highlighting'),
                h('ul', {},
                    h('li', {},
                        h('a', {
                                href: ('/experiments/c'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/c')
                            },
                            'C'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/cpp'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/cpp')
                            },
                            'C++'
                        )
                    ),
                     h('li', {},
                        h('a', {
                                href: ('/experiments/css'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/css')
                            },
                            'CSS'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/html'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/html')
                            },
                            'HTML'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/javascript'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/javascript')
                            },
                            'JavaScript'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/metaphor'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/metaphor')
                            },
                            'Metaphor'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/python'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/python')
                            },
                            'Python'
                        )
                    ),
                    h('li', {},
                        h('a', {
                                href: ('/experiments/typescript'),
                                onclick: (e: MouseEvent) => navigateEvent(e, '/experiments/typescript')
                            },
                            'TypeScript'
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
            imageURL: 'https://davehudson.io/about/dave.jpg',
            pageType: 'website'
        });
    }

    return experimentRoutes;
}
