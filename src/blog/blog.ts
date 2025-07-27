import {h, VElement, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter} from '../lib/page';
import {navigateEvent, routeDetails} from '../app';
import {chevronLeftIcon, chevronRightIcon} from '../lib/icons';
import {blogPost_2014_03_09} from './2014-03-09/post';
import {blogPost_2014_03_12} from './2014-03-12/post';
import {blogPost_2014_03_17} from './2014-03-17/post';
import {blogPost_2014_03_23} from './2014-03-23/post';
import {blogPost_2014_04_03} from './2014-04-03/post';
import {blogPost_2014_04_28} from './2014-04-28/post';
import {blogPost_2014_04_30} from './2014-04-30/post';
import {blogPost_2014_05_20} from './2014-05-20/post';
import {blogPost_2014_05_24} from './2014-05-24/post';
import {blogPost_2014_06_05} from './2014-06-05/post';
import {blogPost_2014_06_10} from './2014-06-10/post';
import {blogPost_2014_06_15} from './2014-06-15/post';
import {blogPost_2014_06_23} from './2014-06-23/post';
import {blogPost_2014_06_30} from './2014-06-30/post';
import {blogPost_2014_11_02} from './2014-11-02/post';
import {blogPost_2014_11_11} from './2014-11-11/post';
import {blogPost_2014_11_12} from './2014-11-12/post';
import {blogPost_2014_12_05} from './2014-12-05/post';
import {blogPost_2015_01_18} from './2015-01-18/post';
import {blogPost_2015_12_19} from './2015-12-19/post';
import {blogPost_2015_12_20} from './2015-12-20/post';
import {blogPost_2016_01_05} from './2016-01-05/post';
import {blogPost_2016_02_03} from './2016-02-03/post';
import {blogPost_2017_01_06} from './2017-01-06/post';
import {blogPost_2020_01_27} from './2020-01-27/post';
import {blogPost_2024_07_15} from './2024-07-15/post';
import {blogPost_2024_08_06} from './2024-08-06/post';
import {blogPost_2024_11_01} from './2024-11-01/post';
import {blogPost_2024_11_06} from './2024-11-06/post';
import {blogPost_2024_11_15} from './2024-11-15/post';
import {blogPost_2025_03_20} from './2025-03-20/post';
import {blogPost_2025_03_28} from './2025-03-28/post';
import {blogPost_2025_04_04} from './2025-04-04/post';
import {blogPost_2025_04_24} from './2025-04-24/post';
import {blogPost_2025_06_01} from './2025-06-01/post';
import {BlogPost} from './BlogPost';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const blogContent: BlogPost[] = [
    blogPost_2014_03_09,
    blogPost_2014_03_12,
    blogPost_2014_03_17,
    blogPost_2014_03_23,
    blogPost_2014_04_03,
    blogPost_2014_04_28,
    blogPost_2014_04_30,
    blogPost_2014_05_20,
    blogPost_2014_05_24,
    blogPost_2014_06_05,
    blogPost_2014_06_10,
    blogPost_2014_06_15,
    blogPost_2014_06_23,
    blogPost_2014_06_30,
    blogPost_2014_11_02,
    blogPost_2014_11_11,
    blogPost_2014_11_12,
    blogPost_2014_12_05,
    blogPost_2015_01_18,
    blogPost_2015_12_19,
    blogPost_2015_12_20,
    blogPost_2016_01_05,
    blogPost_2016_02_03,
    blogPost_2017_01_06,
    blogPost_2020_01_27,
    blogPost_2024_07_15,
    blogPost_2024_08_06,
    blogPost_2024_11_01,
    blogPost_2024_11_06,
    blogPost_2024_11_15,
    blogPost_2025_03_20,
    blogPost_2025_03_28,
    blogPost_2025_04_04,
    blogPost_2025_04_24,
    blogPost_2025_06_01
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
