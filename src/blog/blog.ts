import {h, VElement, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter} from '../lib/page';
import {navigateEvent, routeDetails} from '../app';
import {chevronLeftIcon, chevronRightIcon} from '../lib/icons';
import {blogPost_2014_03_09_0000} from './2014-03-09-0000/2014-03-09-0000';
import {blogPost_2014_03_12_0000} from './2014-03-12-0000/2014-03-12-0000';
import {blogPost_2014_03_17_0000} from './2014-03-17-0000/2014-03-17-0000';
import {blogPost_2014_03_23_0000} from './2014-03-23-0000/2014-03-23-0000';
import {blogPost_2014_04_03_0000} from './2014-04-03-0000/2014-04-03-0000';
import {blogPost_2014_04_28_0000} from './2014-04-28-0000/2014-04-28-0000';
import {blogPost_2014_04_30_0000} from './2014-04-30-0000/2014-04-30-0000';
import {blogPost_2014_05_20_0000} from './2014-05-20-0000/2014-05-20-0000';
import {blogPost_2014_05_24_0000} from './2014-05-24-0000/2014-05-24-0000';
import {blogPost_2014_06_05_0000} from './2014-06-05-0000/2014-06-05-0000';
import {blogPost_2014_06_10_0000} from './2014-06-10-0000/2014-06-10-0000';
import {blogPost_2014_06_15_0000} from './2014-06-15-0000/2014-06-15-0000';
import {blogPost_2014_06_23_0000} from './2014-06-23-0000/2014-06-23-0000';
import {blogPost_2014_06_30_0000} from './2014-06-30-0000/2014-06-30-0000';
import {blogPost_2014_11_02_0000} from './2014-11-02-0000/2014-11-02-0000';
import {blogPost_2014_11_11_0000} from './2014-11-11-0000/2014-11-11-0000';
import {blogPost_2014_11_12_0000} from './2014-11-12-0000/2014-11-12-0000';
import {blogPost_2014_12_05_0000} from './2014-12-05-0000/2014-12-05-0000';
import {blogPost_2015_01_18_0000} from './2015-01-18-0000/2015-01-18-0000';
import {blogPost_2015_12_19_0000} from './2015-12-19-0000/2015-12-19-0000';
import {blogPost_2015_12_20_0000} from './2015-12-20-0000/2015-12-20-0000';
import {blogPost_2016_01_05_0000} from './2016-01-05-0000/2016-01-05-0000';
import {blogPost_2016_02_03_0000} from './2016-02-03-0000/2016-02-03-0000';
import {blogPost_2017_01_06_1400} from './2017-01-06-1400/2017-01-06-1400';
import {blogPost_2020_01_27_2336} from './2020-01-27-2336/2020-01-27-2336';
import {blogPost_2024_07_15_0800} from './2024-07-15-0800/2024-07-15-0800';
import {blogPost_2024_08_06_0700} from './2024-08-06-0700/2024-08-06-0700';
import {BlogPost} from './BlogPost';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const blogContent: BlogPost[] = [
    blogPost_2014_03_09_0000,
    blogPost_2014_03_12_0000,
    blogPost_2014_03_17_0000,
    blogPost_2014_03_23_0000,
    blogPost_2014_04_03_0000,
    blogPost_2014_04_28_0000,
    blogPost_2014_04_30_0000,
    blogPost_2014_05_20_0000,
    blogPost_2014_05_24_0000,
    blogPost_2014_06_05_0000,
    blogPost_2014_06_10_0000,
    blogPost_2014_06_15_0000,
    blogPost_2014_06_23_0000,
    blogPost_2014_06_30_0000,
    blogPost_2014_11_02_0000,
    blogPost_2014_11_11_0000,
    blogPost_2014_11_12_0000,
    blogPost_2014_12_05_0000,
    blogPost_2015_01_18_0000,
    blogPost_2015_12_19_0000,
    blogPost_2015_12_20_0000,
    blogPost_2016_01_05_0000,
    blogPost_2016_02_03_0000,
    blogPost_2017_01_06_1400,
    blogPost_2020_01_27_2336,
    blogPost_2024_07_15_0800,
    blogPost_2024_08_06_0700
]

function navPrevNext(prevStr: string | null, prevHRef: string | null, nextStr: string | null, nextHRef: string | null): VNode {
    return h('nav', {className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', {className: 'meta-nav'},
            h('tr', {},
                h('td', {className: 'prev'},
                    !prevStr ? '' : h('a', {
                            className: 'icon',
                            href: (prevHRef as string),
                            'aria-label': prevStr,
                            onclick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string))
                        },
                        chevronLeftIcon()
                    )
                ),
                h('td', {className: 'prev-text'},
                    !prevStr ? '' : h('a', {
                            href: (prevHRef as string),
                            onclick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string))
                        },
                        prevStr
                    )
                ),
                h('td', {className: 'next-text'},
                    !nextStr ? '' : h('a', {
                            href: (nextHRef as string),
                            onclick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string))
                        },
                        nextStr
                    )
                ),
                h('td', {className: 'next'},
                    !nextStr ? '' : h('a', {
                            className: 'icon',
                            href: (nextHRef as string),
                            'aria-label': nextStr,
                            onclick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string))
                        },
                        chevronRightIcon()
                    )
                )
            )
        )
    );
}

function blogArticlePage(index: number): VNode {
    let prevArticle = (index > 0) ? blogContent[index - 1] : null;
    let thisArticle = blogContent[index];
    let nextArticle = (index < (blogContent.length - 1)) ? blogContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;
    let preText: VNode[] = [];
    if (thisArticle.preScriptFunction !== null) {
        preText = thisArticle.preScriptFunction();
    }

    let postText: VNode[] = [];
    if (thisArticle.postScriptFunction !== null) {
        postText = thisArticle.postScriptFunction();
    }

    // Parse the ISO 8601 date string into a Date object
    const date = new Date(thisArticle.dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`
    if (thisArticle.dateTime.length > 10) {
        formattedDate += ` ${hours}:${minutes}`
    }

    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('article', {},
                h('h1', {}, thisArticle.title),
                h('p', {className: 'meta'},
                    'Published: ',
                    h('time', {datetime: thisArticle.dateTime}, formattedDate)
                ),
                ...preText,
                ...thisArticle.openingFunction(),
                ...thisArticle.articleFunction()
            ),
            ...postText,
            navPrevNext(prevTitle, prevHRef, nextTitle, nextHRef),
        ),
        pageFooter()
    );
}

function blogLink(href: string, title: string, meta: string) {
    return h('div', {className: 'blog-post'},
        h('span', {},
            h('a', {href: href, onclick: (e: MouseEvent) => navigateEvent(e, href)}, title)
        ),
        h('span', {className: 'meta'}, meta)
    )
}

// Handle generating the '/blog' page
export function blogPage() {
    let pageView: VNode[] = [];
    let yearSection: (VNode | null) = null;
    let headlineYear: number = 0;

    // Iterate all the blog content and create year and item enties.
    for (let i = blogContent.length - 1; i >= 0; i--) {
        const {hRef, title, dateTime} = blogContent[i];

        // Parse the ISO 8601 date string into a Date object
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`

        if (headlineYear !== year) {
            if (yearSection !== null) {
                pageView.push(yearSection)
            }

            headlineYear = year;
            yearSection = h('section', {},
                h('h2', {}, `${year}`)
            )
        }

        (yearSection as VElement).appendChild(blogLink(hRef, title, formattedDate));
    }

    const sections = [...pageView, (yearSection as VNode)];

    // Return the VDOM for the blog page.
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'Blog posts'),
            h('div', {className: 'blog-posts'}, ...sections)
        ),
        pageFooter()
    );
}

// Handle the blog summaries on the home page.
export function blogSummaries(numEntries: number) {
    let view: VNode[] = [];

    // If we've been asked for more blog summaries than there are, then clip the list.
    const lastEntry = blogContent.length > numEntries ? blogContent.length - numEntries : 0;

    // Generate a list of HTML elements that match each blog post.
    for (let i = blogContent.length - 1; i >= lastEntry; i--) {
        const {hRef, title, dateTime, openingFunction} = blogContent[i];

        // Parse the ISO 8601 date string into a Date object
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`

        view.push(h('section', {},
            h('h2', {},
                h('a', {href: hRef, onclick: (e: MouseEvent) => navigateEvent(e, hRef)}, title)
            ),
            h('p', {className: 'meta'}, 'Published: ', formattedDate),
            ...openingFunction(),
            h('p', {},
                h('em', {},
                    h('a', {href: hRef, onclick: (e: MouseEvent) => navigateEvent(e, hRef)}, '[read more]')
                )
            ),
            h('hr', {})
        ));
    }

    return view;
}

// Collect all the routes to be used with the blog pages.
export function getBlogRoutes() {
    let blogRoutes: Map<string, routeDetails> = new Map();

    for (let i = 0; i < blogContent.length; i++) {
        let img = blogContent[i].imageURL;
        if (img === null) {
            img = '/about/dave.jpg';
        }

        const imgURL = 'https://davehudson.io' + img;

        blogRoutes.set(blogContent[i].hRef, {
            title: blogContent[i].title,
            render: () => blogArticlePage(i),
            description: blogContent[i].description,
            imageURL: imgURL,
            pageType: 'article'
        });
    }

    return blogRoutes;
}
