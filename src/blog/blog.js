import { h } from '../lib/dvdi.js';
import { pageHeader, pageFooter } from '../lib/page.js';
import { navigateEvent } from '../app.js';
import { chevronLeftIcon, chevronRightIcon } from '../lib/icons.js';
import { blogPost_201403090000 } from './2014-03-09-0000/2014-03-09-0000.js';
import { blogPost_201403120000 } from './2014-03-12-0000/2014-03-12-0000.js';
import { blogPost_201403170000 } from './2014-03-17-0000/2014-03-17-0000.js';
import { blogPost_201403230000 } from './2014-03-23-0000/2014-03-23-0000.js';
import { blogPost_201404030000 } from './2014-04-03-0000/2014-04-03-0000.js';
import { blogPost_201404280000 } from './2014-04-28-0000/2014-04-28-0000.js';
import { blogPost_201404300000 } from './2014-04-30-0000/2014-04-30-0000.js';
import { blogPost_201405200000 } from './2014-05-20-0000/2014-05-20-0000.js';
import { blogPost_201405240000 } from './2014-05-24-0000/2014-05-24-0000.js';
import { blogPost_201406050000 } from './2014-06-05-0000/2014-06-05-0000.js';
import { blogPost_201406100000 } from './2014-06-10-0000/2014-06-10-0000.js';
import { blogPost_201406150000 } from './2014-06-15-0000/2014-06-15-0000.js';
import { blogPost_201406230000 } from './2014-06-23-0000/2014-06-23-0000.js';
import { blogPost_201406300000 } from './2014-06-30-0000/2014-06-30-0000.js';
import { blogPost_201411020000 } from './2014-11-02-0000/2014-11-02-0000.js';
import { blogPost_201411110000 } from './2014-11-11-0000/2014-11-11-0000.js';
import { blogPost_201411120000 } from './2014-11-12-0000/2014-11-12-0000.js';
import { blogPost_201412050000 } from './2014-12-05-0000/2014-12-05-0000.js';
import { blogPost_201501180000 } from './2015-01-18-0000/2015-01-18-0000.js';
import { blogPost_201512190000 } from './2015-12-19-0000/2015-12-19-0000.js';
import { blogPost_201512200000 } from './2015-12-20-0000/2015-12-20-0000.js';
import { blogPost_201601050000 } from './2016-01-05-0000/2016-01-05-0000.js';
import { blogPost_201602030000 } from './2016-02-03-0000/2016-02-03-0000.js';
import { blogPost_201701061400 } from './2017-01-06-1400/2017-01-06-1400.js';
import { blogPost_202001272336 } from './2020-01-27-2336/2020-01-27-2336.js';

// Enumerate all the blog content served up here.  Newest content goes at the end.
const blogContent = [
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

function navPrevNext(prevStr, prevHRef, nextStr, nextHRef) {
    return h('nav', { className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', { className: 'meta-nav' },
            h('tr', {},
                h('td', { className: 'prev' },
                    !prevStr ? '' : h('a', {
                            className: 'icon', href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef)
                        },
                        chevronLeftIcon()
                    )
                ),
                h('td', { className: 'prev-text' },
                    !prevStr ? '' : h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) }, prevStr)
                ),
                h('td', { className: 'next-text' },
                    !nextStr ? '' : h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) }, nextStr)
                ),
                h('td', { className: 'next' },
                    !nextStr ? '' : h('a', {
                            className: 'icon', href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef)
                        },
                        chevronRightIcon()
                    )
                )
            )
        )
    );
}

function blogArticlePage(index) {
    let prevArticle = (index > 0) ? blogContent[index - 1] : null;
    let thisArticle = blogContent[index];
    let nextArticle = (index < (blogContent.length - 1)) ? blogContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;
    let preText = '';
    if (thisArticle.preScriptFunction !== null) {
        preText = thisArticle.preScriptFunction();
    }

    let postText = '';
    if (thisArticle.postScriptFunction !== null) {
        postText = thisArticle.postScriptFunction();
    }

    return h('div', {},
        pageHeader(),
        h('main', { className: 'article' },
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

function blogLink(href, title, meta) {
    return h('div', { className: 'blog-post' },
        h('span', { className: 'title' },
            h('a', { href: href, onClick: (e) => navigateEvent(e, href) }, title)
        ),
        h('span', { className: 'meta' }, meta)
    )
}

// Handle generating the '/blog' page
export function blogPage() {
    let pageView = [];
    let headlineYear = '';

    // Iterate all the blog content and create year and item enties.
    for (let i = blogContent.length - 1; i >= 0; i--) {
        const { hRef, title, dateTime } = blogContent[i];
        const blogYear = dateTime.slice(0, 4);
        if (headlineYear != blogYear) {
            headlineYear = blogYear;
            pageView.push(h('h2', {}, headlineYear));
        }

        pageView.push(blogLink(hRef, title, dateTime));
    }

    // Return the VDOM for the blog page.
    return h('div', {},
        pageHeader(),
        h('main', { className: 'article' },
            h('h1', {}, 'Blog posts'),
            h('div', { className: 'blog-posts' }, ...pageView)
        ),
        pageFooter()
    );
}

// Handle the blog summaries on the home page.
export function blogSummaries(numEntries) {
    let view = [];

    // If we've been asked for more blog summaries than there are, then clip the list.
    const lastEntry = blogContent.length > numEntries ? blogContent.length - numEntries : 0;

    // Generate a list of HTML elements that match each blog post.
    for (let i = blogContent.length - 1; i >= lastEntry; i--) {
        const { hRef, title, dateTime, openingFunction } = blogContent[i];
        view.push(h('hr', {}));
        view.push(h('section', { className: 'article' },
            h('h2', {},
                h('a', { href: hRef, onClick: (e) => navigateEvent(e, hRef) }, title)
            ),
            h('p', { className: 'meta' }, h('time', {}, dateTime)),
            ...openingFunction(),
            h('p', {},
                h('em', {},
                    h('a', { href: hRef, onClick: (e) => navigateEvent(e, hRef) }, '[read more]')
                )
            )
        ));
    }

    return view;
}

// Collect all the routes to be used with the blog pages.
export function getBlogRoutes() {
    let blogRoutes = {};

    for (let i = 0; i < blogContent.length; i++) {
        blogRoutes[blogContent[i].hRef] = () => blogArticlePage(i);
    }

    return blogRoutes;
}
