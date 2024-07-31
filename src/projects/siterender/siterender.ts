import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectSiterenderPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'siterender'),
            h('p', {},
                'siterender is...',
                h('a', {href: 'https://github.com/dave-hudson/siterender', target: '_blank'},
                    'https://github.com/dave-hudson/siterender'
                ),
            ),
            h('p', {},
                'blah'
            )
        ),
        pageFooter()
    );
}

export const projectSiterender = new ProjectPage(
    '/projects/siterender',
    projectSiterenderPage
);
