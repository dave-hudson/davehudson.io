import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {navigateEvent} from '../../app';

export function projectSiterenderPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'siterender',
                subtitle: 'Have ChatGPT write a pre-rendering tool for websites!'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('p', {},
                        'siterender is a Node.js application that renders web pages listed in a sitemap and saves the rendered HTML ' +
                        'content to a specified output directory.  This tool is particularly useful for static site generation, web ' +
                        'scraping, and ensuring content is pre-rendered for SEO and social media sharing purposes.'
                    ),
                    h('p', {},
                        'The application is unusual as all the code was "written" by ChatGPT 4o.  For more about the concept, please ' +
                        'take a look at: ',
                        h('a', {href: '/blog/2024-08-06-0700', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2024-08-06-0700')},
                            'Maximal Instruction Prompting: a strategy for software development with LLMs (2024-08-06)'),
                        '.'
                    ),
                    h('section', {},
                        h('h2', {}, 'Features'),
                        h('ul', {},
                            h('li', {}, 'Fetches and parses sitemaps from URLs or local files.'),
                            h('li', {}, 'Supports sitemaps and sitemap indexes (nested sitemaps).'),
                            h('li', {}, 'Replaces URL prefixes based on specified rules.'),
                            h('li', {}, 'Renders pages in parallel using Puppeteer.'),
                            h('li', {}, 'Parallelizes rendering operations for maximum speed/throughput.'),
                            h('li', {}, 'Saves rendered HTML content to a specified output directory.'),
                            h('li', {}, 'Retry mechanism for rendering and browser launch/close operations.')
                        )
                    ),
                    h('section', {},
                        h('h2', {}, 'License'),
                        h('p', {}, 'The software is released under a BSD 3-Clause license.')
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
                                ' - Path to the local sitemap file (conflicts with ',
                                h('code', {}, '--sitemap-url'),
                                ')'
                            ),
                            h('li', {},
                                h('code', {}, '--sitemap-url <url>'),
                                ' - URL of the sitemap file (conflicts with ',
                                h('code', {}, '--sitemap-file'),
                                ')'
                            ),
                            h('li', {},
                                h('code', {}, '--replace-url <new=old>'),
                                ' - Replace URL prefixes in the form "new=old"'
                            ),
                            h('li', {},
                                h('code', {}, '--output <path>'),
                                ' - Output directory (required)'
                            ),
                            h('li', {},
                                h('code', {}, '--parallel-renders <number>'),
                                ' - Number of parallel renders (default is the number of CPU cores)'
                            ),
                            h('li', {},
                                h('code', {}, '--max-retries <number>'),
                                ' - Max retries for rendering a page (default is 3)'
                            ),
                            h('li', {},
                                h('code', {}, '-h, --help'),
                                ' - Show this message'
                            )
                        )
                    ),
                    h('section', {},
                        h('h2', {}, 'Examples'),
                        h('p', {}, 'Render from a Sitemap URL:'),
                        h('pre', {},
                            h('code', {},
                                'node siterender.js --sitemap-url https://example.com/sitemap.xml --output ./output'
                            )
                        ),
                        h('p', {}, 'Render from a Local Sitemap File:'),
                        h('pre', {},
                            h('code', {},
                                'node siterender.js --sitemap-file ./sitemap.xml --output ./output'
                            )
                        ),
                        h('p', {}, 'Replace URL Prefix:'),
                        h('pre', {},
                            h('code', {},
                                'node siterender.js --sitemap-url https://example.com/sitemap.xml --replace-url "https://newdomain.com=https://olddomain.com" --output ./output'
                            )
                        ),
                        h('p', {}, 'Specify Parallel Renders and Max Retries:'),
                        h('pre', {},
                            h('code', {},
                                'node siterender.js --sitemap-url https://example.com/sitemap.xml --output ./output --parallel-renders 4 --max-retries 5'
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
                        h('h2', {}, 'Building the software'),
                        h('p', {},
                            'The software is built using ',
                            h('code', {}, 'make'),
                            '.  Yes, this is a little unusual for the JavaScript world, but it\'s not going to change!'
                        ),
                        h('p', {},
                            'To build:'
                        ),
                        h('pre', {},
                            h('code', {},
                                'make'
                            )
                        )
                    ),
                    h('section', {},
                        h('h2', {}, 'Testing'),
                        h('p', {},
                            'The core logic of application is supported by tests, implemented using Jest.'
                        ),
                        h('p', {},
                            'To run the tests:'
                        ),
                        h('pre', {},
                            h('code', {},
                                'make test'
                            )
                        )
                    ),
                    h('section', {},
                        h('h2', {}, 'Contributing'),
                        h('p', {},
                            'The aim of the project is to see how far we can go with having ChatGPT build the software.'
                        ),
                        h('p', {},
                            'Please feel free to submit PRs against the prompt, or to suggest prompts that will generate a code ' +
                            'change you might like to see.  While you can submit PRs against the code, these won\'t be merged ' +
                            'directly, but can serve to improve the prompt that allows the code to be evolved.'
                        )
                    ),
                    h('section', {},
                        h('h2', {}, 'Source code'),
                        h('p', {},
                            'The source code can be found on GitHub: ',
                            h('a', {href: 'https://github.com/dave-hudson/siterender', target: '_blank'},
                                'https://github.com/dave-hudson/siterender'
                            )
                        )
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
