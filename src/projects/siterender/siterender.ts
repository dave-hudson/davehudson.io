import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {navigateEvent} from '../../app';

export function projectSiterenderPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'siterender'),
            h('p', {},
                'siterender is a Node.js application that renders web pages listed in a sitemap and saves the rendered HTML ' +
                'content to a specified output directory.  This tool is particularly useful for static site generation, web ' +
                'scraping, and ensuring content is pre-rendered for SEO and social media sharing purposes.'
            ),
            h('p', {},
                'The application is unusual as all the code was "written" by ChatGPT 4o.  For more about the concept, please ' +
                'take a look at: ',
                h('a', {href: '/blog/2024-08-01-1922', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-08-01-1922')},
                    'ChatGPT: changing the rules of software development (2024-08-01)'),
                '.'
            ),
            h('section', {},
                h('h2', {}, 'Features'),
                h('ul', {},
                    h('li', {}, 'Fetches and parses sitemaps from URLs or local files.'),
                    h('li', {}, 'Supports nested sitemaps.'),
                    h('li', {}, 'Replaces URL prefixes based on specified rules.'),
                    h('li', {}, 'Renders pages in parallel using Puppeteer.'),
                    h('li', {}, 'Parallelizes rendering operations for maximum speed/throughput.'),
                    h('li', {}, 'Saves rendered HTML content to specified output directory.'),
                    h('li', {}, 'Retry mechanism for rendering and browser launch/close operations.')
                )
            ),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/siterender', target: '_blank'},
                        'https://github.com/dave-hudson/siterender'
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectSiterender = new ProjectPage(
    'siterender',
    '/projects/siterender',
    'siterender renders web pages listed in a sitemap and saves the rendered HTML content locally.  ' +
    'Written in TypeScript via a ChatGPT prompt!',
    projectSiterenderPage
);
