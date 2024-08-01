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
            h('section', {},
                h('h2', {}, 'Installation'),
                h('p', {},
                    'Before using siterender, ensure you have Node.js installed.  You can install the dependencies by running:'
                ),
                h('pre', {},
                    h('code', {},
                        'npm install'
                    )
                )
            ),
            h('section', {},
                h('h2', {}, 'Usage'),
                h('p', {},
                    'The script can be executed from the command line with various options:'
                ),
                h('pre', {},
                    h('code', {},
                        'node siterender.js [options]'
                    )
                )
            ),
            h('section', {},
                h('h2', {}, 'Options'),
                h('ul', {},
                    h('li', {},
                        h('code', {}, '--sitemap-file <path>'),
                        ' : Path to the local sitemap file (conflicts with ',
                        h('code', {}, '--sitemap-url'),
                        ')'
                    ),
                    h('li', {},
                        h('code', {}, '--sitemap-url <url>'),
                        ' : URL of the sitemap file (conflicts with ',
                        h('code', {}, '--sitemap-file'),
                        ')'
                    ),
                    h('li', {},
                        h('code', {}, '--replace-url <new=old>'),
                        ' : Replace URL prefixes in the form "new=old"'
                    ),
                    h('li', {},
                        h('code', {}, '--output <path>'),
                        ' : Output directory (required)'
                    ),
                    h('li', {},
                        h('code', {}, '--parallel-renders <number>'),
                        ' : Number of parallel renders (default is the number of CPU cores)'
                    ),
                    h('li', {},
                        h('code', {}, '--max-retries <number>'),
                        ' : Max retries for rendering a page (default is 3)'
                    ),
                    h('li', {},
                        h('code', {}, '-h, --help'),
                        ' : Show this message'
                    )
                )
            ),
            h('section', {},
                h('h2', {}, 'How it works'),
                h('ol', {},
                    h('li', {},
                        'Fetch Sitemap: The sitemap is fetched from a URL or read from a local file.'
                    ),
                    h('li', {},
                        'Parse Sitemap: The XML content of the sitemap is parsed to extract URLs.'
                    ),
                    h('li', {},
                        'URL Replacement: If a replace rule is provided, URLs are modified accordingly.'
                    ),
                    h('li', {},
                        'Render Pages: Each URL is rendered. Pages are rendered in parallel based on the specified number of ' +
                        'parallel renders.'
                    ),
                    h('li', {},
                        'Save Content: The rendered HTML content is saved to the specified output directory, maintaining the ' +
                        'directory structure of the URLs.'
                    ),
                    h('li', {},
                        'Retry Mechanism: The script includes retry logic for rendering pages and launching/closing the ' +
                        'browser to handle transient errors.'
                    )
                )
            ),
            h('section', {},
                h('h2', {}, 'License'),
                h('p', {}, 'The software is released under a BSD 3-Clause license.')
            ),
            h('section', {},
                h('h2', {}, 'Contributing'),
                h('p', {},
                    'The aim of the project is to see how far we can go with having ChatGPT build the software.  ' +
                    'Please feel free to submit PRs against the prompt, or to suggest prompts that will generate a code ' +
                    'change you might like to see.  While you can submit PRs against the code, these won\'t be merged, but ' +
                    'can serve to improve the prompt that allows the code to be evolved.'
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
