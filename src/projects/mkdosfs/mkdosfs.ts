import { h, VNode } from '../../lib/dvdi';
import { pageHeader, pageFooter } from "../../lib/page";
import { ProjectPage } from '../ProjectPage';

export function projectMkdosfsPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, 'mkdosfs'),
            h('p', {},
                'I wrote the first 2 versions of mkdosfs back in 1993 and 1994.  Eventually other maintainers folded this ' +
                'into the dosfstools repo, and can be found here (my original notes are in the change logs): ',
                h('a', { href: 'https://github.com/dosfstools/dosfstools', target: '_blank' },
                    'https://github.com/dosfstools/dosfstools')
            )
        ),
        pageFooter()
    );
}

export const projectMkdosfs = new ProjectPage(
    '/projects/mkdosfs',
    projectMkdosfsPage
);
