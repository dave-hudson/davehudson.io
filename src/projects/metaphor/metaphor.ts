import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectMetaphorPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'Metaphor'),
            h('p', {},
                'TBD.'
            ),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/m6r-ai/metaphor', target: '_blank'},
                        'https://github.com/m6r-ai/metaphor'
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectMetaphor = new ProjectPage(
    'metaphor',
    '/projects/metaphor',
    'An AI context generation language.',
    projectMetaphorPage
);
