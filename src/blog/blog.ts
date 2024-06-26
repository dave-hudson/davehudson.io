import { h, VDom } from '../lib/dvdi';
import { pageHeader, pageFooter } from '../lib/page';
import { navigateEvent } from '../app';
import { chevronLeftIcon, chevronRightIcon } from '../lib/icons';
import { blogPost_201403090000 } from './2014-03-09-0000/2014-03-09-0000';
import { blogPost_201403120000 } from './2014-03-12-0000/2014-03-12-0000';
import { blogPost_201403170000 } from './2014-03-17-0000/2014-03-17-0000';
import { blogPost_201403230000 } from './2014-03-23-0000/2014-03-23-0000';
import { blogPost_201404030000 } from './2014-04-03-0000/2014-04-03-0000';
import { blogPost_201404280000 } from './2014-04-28-0000/2014-04-28-0000';
import { blogPost_201404300000 } from './2014-04-30-0000/2014-04-30-0000';
import { blogPost_201405200000 } from './2014-05-20-0000/2014-05-20-0000';
import { blogPost_201405240000 } from './2014-05-24-0000/2014-05-24-0000';
import { blogPost_201406050000 } from './2014-06-05-0000/2014-06-05-0000';
import { blogPost_201406100000 } from './2014-06-10-0000/2014-06-10-0000';
import { blogPost_201406150000 } from './2014-06-15-0000/2014-06-15-0000';
import { blogPost_201406230000 } from './2014-06-23-0000/2014-06-23-0000';
import { blogPost_201406300000 } from './2014-06-30-0000/2014-06-30-0000';
import { blogPost_201411020000 } from './2014-11-02-0000/2014-11-02-0000';
import { blogPost_201411110000 } from './2014-11-11-0000/2014-11-11-0000';
import { blogPost_201411120000 } from './2014-11-12-0000/2014-11-12-0000';
import { blogPost_201412050000 } from './2014-12-05-0000/2014-12-05-0000';
import { blogPost_201501180000 } from './2015-01-18-0000/2015-01-18-0000';
import { blogPost_201512190000 } from './2015-12-19-0000/2015-12-19-0000';
import { blogPost_201512200000 } from './2015-12-20-0000/2015-12-20-0000';
import { blogPost_201601050000 } from './2016-01-05-0000/2016-01-05-0000';
import { blogPost_201602030000 } from './2016-02-03-0000/2016-02-03-0000';
import { blogPost_201701061400 } from './2017-01-06-1400/2017-01-06-1400';
import { blogPost_202001272336 } from './2020-01-27-2336/2020-01-27-2336';
import { BlogPost } from './BlogPost';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const blogContent: BlogPost[] = [
    blogPost_201403090000,
    blogPost_201403120000,
    blogPost_201403170000,
    blogPost_201403230000,
    blogPost_201404030000,
    blogPost_201404280000,
    blogPost_201404300000,
    blogPost_201405200000,
    blogPost_201405240000,
    blogPost_201406050000,
    blogPost_201406100000,
    blogPost_201406150000,
    blogPost_201406230000,
    blogPost_201406300000,
    blogPost_201411020000,
    blogPost_201411110000,
    blogPost_201411120000,
    blogPost_201412050000,
    blogPost_201501180000,
    blogPost_201512190000,
    blogPost_201512200000,
    blogPost_201601050000,
    blogPost_201602030000,
    blogPost_201701061400,
    blogPost_202001272336
]

function navPrevNext(prevStr: string | null, prevHRef: string | null, nextStr: string | null, nextHRef: string | null): VDom {
    return h('nav', { className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', { className: 'meta-nav' },
            h('tr', {},
                h('td', { className: 'prev' },
                    !prevStr ? '' : h('a', {
                            className: 'icon', href: prevHRef, onClick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string))
                        },
                        chevronLeftIcon()
                    )
                ),
                h('td', { className: 'prev-text' },
                    !prevStr ? '' : h('a', { href: prevHRef, onClick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string)) }, prevStr)
                ),
                h('td', { className: 'next-text' },
                    !nextStr ? '' : h('a', { href: nextHRef, onClick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string)) }, nextStr)
                ),
                h('td', { className: 'next' },
                    !nextStr ? '' : h('a', {
                            className: 'icon', href: nextHRef, onClick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string))
                        },
                        chevronRightIcon()
                    )
                )
            )
        )
    );
}

function blogArticlePage(index: number): VDom {
    let prevArticle = (index > 0) ? blogContent[index - 1] : null;
    let thisArticle = blogContent[index];
    let nextArticle = (index < (blogContent.length - 1)) ? blogContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;
    let preText: VDom[] = [];
    if (thisArticle.preScriptFunction !== null) {
        preText = thisArticle.preScriptFunction();
    }

    let postText: VDom[] = [];
    if (thisArticle.postScriptFunction !== null) {
        postText = thisArticle.postScriptFunction();
    }

    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('article', {},
                h('h1', {}, thisArticle.title),
                h('p', { className: 'meta' }, h('time', {}, thisArticle.dateTime)),
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
    return h('div', { className: 'blog-post' },
        h('span', {},
            h('a', { href: href, onClick: (e: MouseEvent) => navigateEvent(e, href) }, title)
        ),
        h('span', { className: 'meta' }, meta)
    )
}

// Handle generating the '/blog' page
export function blogPage() {
    let pageView: VDom[] = [];
    let yearSection: (VDom | null) = null;
    let headlineYear = '';

    // Iterate all the blog content and create year and item enties.
    for (let i = blogContent.length - 1; i >= 0; i--) {
        const { hRef, title, dateTime } = blogContent[i];
        const blogYear = dateTime.slice(0, 4);
        if (headlineYear !== blogYear) {
            if (yearSection !== null) {
                pageView.push(yearSection)
            }

            headlineYear = blogYear;
            yearSection = h('section', {},
                h('h2', {}, headlineYear)
            )
        }

        (yearSection as VDom).appendChild(blogLink(hRef, title, dateTime));
    }

    const sections = [...pageView, (yearSection as VDom)];

    // Return the VDOM for the blog page.
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, 'Blog posts'),
            h('div', { className: 'blog-posts' }, ...sections)
        ),
        pageFooter()
    );
}

// Handle the blog summaries on the home page.
export function blogSummaries(numEntries: number) {
    let view: VDom[] = [];

    // If we've been asked for more blog summaries than there are, then clip the list.
    const lastEntry = blogContent.length > numEntries ? blogContent.length - numEntries : 0;

    // Generate a list of HTML elements that match each blog post.
    for (let i = blogContent.length - 1; i >= lastEntry; i--) {
        const { hRef, title, dateTime, openingFunction } = blogContent[i];
        view.push(h('hr', {}));
        view.push(h('section', {},
            h('h2', {},
                h('a', { href: hRef, onClick: (e: MouseEvent) => navigateEvent(e, hRef) }, title)
            ),
            h('p', { className: 'meta' }, h('time', {}, dateTime)),
            ...openingFunction(),
            h('p', {},
                h('em', {},
                    h('a', { href: hRef, onClick: (e: MouseEvent) => navigateEvent(e, hRef) }, '[read more]')
                )
            )
        ));
    }

    return view;
}

// Collect all the routes to be used with the blog pages.
export function getBlogRoutes() {
    let blogRoutes: Map<string, (() => VDom)> = new Map();

    for (let i = 0; i < blogContent.length; i++) {
        blogRoutes.set(blogContent[i].hRef, () => blogArticlePage(i));
    }

    return blogRoutes;
}
