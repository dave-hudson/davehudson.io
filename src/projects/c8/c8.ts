import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectC8Page(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'c8'),
            h('p', {},
                'c8 is a high performance arbitrary precision natural numbers, integers, and rational numbers library written ' +
                'in "modern" C++.'
            ),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'Project wiki'),
                h('p', {},
                    'The project wiki is hosted on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8/wiki', target: '_blank'},
                        'https://github.com/dave-hudson/c8/wiki'
                    )
                ),
                h('p', {},
                    'When I built this code I also tracked the development journey on the wiki.  This includes all my notes on ' +
                    'how I was performance tuning things, down to the machine instruction level in many cases: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8/wiki/Dev-Notes', target: '_blank'},
                        'https://github.com/dave-hudson/c8/wiki/Dev-Notes'
                    )
                )
            ),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8', target: '_blank'},
                        'https://github.com/dave-hudson/c8'
                    ),
                )
            )
        ),
        pageFooter()
    );
}

export const projectC8 = new ProjectPage(
    'c8',
    '/projects/c8',
    'c8 is a high performance arbitrary precision natural numbers, integers, and rational numbers library written ' +
    'in "modern" C++.',
    projectC8Page
);
