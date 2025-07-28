import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectMkdosfsPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'mkdosfs',
                subtitle: 'The Linux mkdosfs command for creating DOS/FAT filesystems'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('p', {},
                        'I wrote the first 2 versions of mkdosfs back in 1993 and 1994.  Eventually other maintainers folded this ' +
                        'into the dosfstools repo, and can be found in the git repo (my original notes are in the change logs).',
                    ),
                    h('section', {},
                        h('h2', {}, 'Source code'),
                        h('p', {},
                            'The source code can be found on GitHub: ',
                            h('a', {href: 'https://github.com/dosfstools/dosfstools', target: '_blank'},
                                'https://github.com/dosfstools/dosfstools'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectMkdosfs = new ProjectPage(
    'mkdosfs',
    '/projects/mkdosfs',
    'The Linux mkdosfs command.  Written in C.',
    projectMkdosfsPage
);
