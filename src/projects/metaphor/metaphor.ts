import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectMetaphorPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Metaphor',
                subtitle: 'An AI prompt creation language'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
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
