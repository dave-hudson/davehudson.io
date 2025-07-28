import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectHumbugPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'Humbug'),
            h('p', {},
                'TBD.'
            ),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                        'https://github.com/m6r-ai/humbug'
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
