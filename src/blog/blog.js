import { h } from '/lib/dvdi.js';
import { pageHeader, articleTitle, pageFooter } from '/lib/page.js';
import { navigateEvent } from '/app.js';
import { chevronLeftIcon, chevronRightIcon } from '/lib/icons.js';
import { blogArticle_201403090000 } from './2014-03-09-0000/2014-03-09-0000.js';
import { blogArticle_201403120000 } from './2014-03-12-0000/2014-03-12-0000.js';
import { blogArticle_201403170000 } from './2014-03-17-0000/2014-03-17-0000.js';
import { blogArticle_201403230000 } from './2014-03-23-0000/2014-03-23-0000.js';
import { blogArticle_201404030000 } from './2014-04-03-0000/2014-04-03-0000.js';
import { blogArticle_201404280000 } from './2014-04-28-0000/2014-04-28-0000.js';
import { blogArticle_201404300000 } from './2014-04-30-0000/2014-04-30-0000.js';
import { blogArticle_201405200000 } from './2014-05-20-0000/2014-05-20-0000.js';
import { blogArticle_201405240000 } from './2014-05-24-0000/2014-05-24-0000.js';
import { blogArticle_201406050000 } from './2014-06-05-0000/2014-06-05-0000.js';
import { blogArticle_201406100000 } from './2014-06-10-0000/2014-06-10-0000.js';
import { blogArticle_201406150000 } from './2014-06-15-0000/2014-06-15-0000.js';
import { blogArticle_201406230000 } from './2014-06-23-0000/2014-06-23-0000.js';
import { blogArticle_201406300000 } from './2014-06-30-0000/2014-06-30-0000.js';
import { blogArticle_201411020000 } from './2014-11-02-0000/2014-11-02-0000.js';
import { blogArticle_201411110000 } from './2014-11-11-0000/2014-11-11-0000.js';
import { blogArticle_201411120000 } from './2014-11-12-0000/2014-11-12-0000.js';
import { blogArticle_201412050000 } from './2014-12-05-0000/2014-12-05-0000.js';
import { blogArticle_201501180000 } from './2015-01-18-0000/2015-01-18-0000.js';
import { blogArticle_201512190000 } from './2015-12-19-0000/2015-12-19-0000.js';
import { blogArticle_201512200000 } from './2015-12-20-0000/2015-12-20-0000.js';
import { blogArticle_201601050000 } from './2016-01-05-0000/2016-01-05-0000.js';
import { blogArticle_201602030000 } from './2016-02-03-0000/2016-02-03-0000.js';
import { blogArticle_201701061400 } from './2017-01-06-1400/2017-01-06-1400.js';
import { blogArticle_202001272336 } from './2020-01-27-2336/2020-01-27-2336.js';

class BlogPosts {
    constructor(title, dateTime, hRef, articleFunction) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.articleFunction = articleFunction;
    }
}

// Enumerate all the blog content served up here.  Newest content goes at the end.
let blogContent = [
    new BlogPosts(
        'The Bitcoin runaway mine train',
        '2014-03-09',
        '/blog/2014-03-09-0000',
        blogArticle_201403090000
    ),
    new BlogPosts(
        'Strange spikes in the Bitcoin price',
        '2014-03-12',
        '/blog/2014-03-12-0000',
        blogArticle_201403120000
    ),
    new BlogPosts(
        'Chickens and eggs?',
        '2014-03-17',
        '/blog/2014-03-17-0000',
        blogArticle_201403170000
    ),
    new BlogPosts(
        'Where next for Bitcoin mining ASICs?',
        '2014-03-23',
        '/blog/2014-03-23-0000',
        blogArticle_201403230000
    ),
    new BlogPosts(
        'The rewards for a Bitcoin miner',
        '2014-04-03',
        '/blog/2014-04-03-0000',
        blogArticle_201404030000
    ),
    new BlogPosts(
        'Megawatts of mining',
        '2014-04-28',
        '/blog/2014-04-28-0000',
        blogArticle_201404280000
    ),
    new BlogPosts(
        'Prisoner\'s dilemmas?',
        '2014-04-30',
        '/blog/2014-04-30-0000',
        blogArticle_201404300000
    ),
    new BlogPosts(
        'Hash rate headaches',
        '2014-05-20',
        '/blog/2014-05-20-0000',
        blogArticle_201405200000
    ),
    new BlogPosts(
        'Reach for the ear defenders!',
        '2014-05-24',
        '/blog/2014-05-24-0000',
        blogArticle_201405240000
    ),
    new BlogPosts(
        'Strange spikes revisited!',
        '2014-06-05',
        '/blog/2014-06-05-0000',
        blogArticle_201406050000
    ),
    new BlogPosts(
        'Lies, damned lies and Bitcoin difficulties',
        '2014-06-10',
        '/blog/2014-06-10-0000',
        blogArticle_201406100000
    ),
    new BlogPosts(
        'Finding 2016 blocks',
        '2014-06-15',
        '/blog/2014-06-15-0000',
        blogArticle_201406150000
    ),
    new BlogPosts(
        '51% of the network',
        '2014-06-23',
        '/blog/2014-06-23-0000',
        blogArticle_201406230000
    ),
    new BlogPosts(
        'The gambler\'s guide to Bitcoin mining',
        '2014-06-30',
        '/blog/2014-06-30-0000',
        blogArticle_201406300000
    ),
    new BlogPosts(
        '7 transactions per second? Really?',
        '2014-11-02',
        '/blog/2014-11-02-0000',
        blogArticle_201411020000
    ),
    new BlogPosts(
        'Bitcoin traffic bulletin',
        '2014-11-11',
        '/blog/2014-11-11-0000',
        blogArticle_201411110000
    ),
    new BlogPosts(
        'The future of Bitcoin transaction fees?',
        '2014-11-12',
        '/blog/2014-11-12-0000',
        blogArticle_201411120000
    ),
    new BlogPosts(
        'Pool wars?',
        '2014-12-05',
        '/blog/2014-12-05-0000',
        blogArticle_201412050000
    ),
    new BlogPosts(
        'The myth of the megabyte Bitcoin block',
        '2015-01-18',
        '/blog/2015-01-18-0000',
        blogArticle_201501180000
    ),
    new BlogPosts(
        'Waiting for blocks',
        '2015-12-19',
        '/blog/2015-12-19-0000',
        blogArticle_201512190000
    ),
    new BlogPosts(
        'Bitcoin traffic bulletin (redux)',
        '2015-12-20',
        '/blog/2015-12-20-0000',
        blogArticle_201512200000
    ),
    new BlogPosts(
        'Behold mighty exahash, hammer of the blocks!',
        '2016-01-05',
        '/blog/2016-01-05-0000',
        blogArticle_201601050000
    ),
    new BlogPosts(
        'A market for Bitcoin transaction fees?',
        '2016-02-03',
        '/blog/2016-02-03-0000',
        blogArticle_201602030000
    ),
    new BlogPosts(
        'What IoT history reveals about blockchain\'s challenges',
        '2017-01-06 14:00',
        '/blog/2017-01-06-1400',
        blogArticle_201701061400
    ),
    new BlogPosts(
        'Understanding other people\'s code',
        '2020-01-27 23:36',
        '/blog/2020-01-27-2336',
        blogArticle_202001272336
    )
]

function navPrevNext(prevStr, prevHRef, nextStr, nextHRef) {
    return h('nav', { className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', { className: 'meta-nav' },
            h('tr', {},
                h('td', { className: 'prev' },
                    !prevStr ? '' : h('div', { className: 'icon' },
                        h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) },
                            chevronLeftIcon()
                        )
                    )
                ),
                h('td', { className: 'prev-text' },
                    !prevStr ? '' : h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) }, prevStr)
                ),
                h('td', { className: 'next-text' },
                    !nextStr ? '' : h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) }, nextStr)
                ),
                h('td', { className: 'next' },
                    !nextStr ? '' : h('div', { className: 'icon' },
                        h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) },
                            chevronRightIcon()
                        )
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

    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle(thisArticle.title, thisArticle.dateTime),
            ...thisArticle.articleFunction()
        ),
        navPrevNext(prevTitle, prevHRef, nextTitle, nextHRef),
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
        const blogPost = blogContent[i];
        const blogYear = blogPost.dateTime.slice(0, 4);
        if (headlineYear != blogYear) {
            headlineYear = blogYear;
            pageView.push(h('h2', {}, headlineYear));
        }

        pageView.push(blogLink(blogPost.hRef, blogPost.title, blogPost.dateTime));
    }

    // Return the VDOM for the blog page.
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('Blog posts'),
            h('div', { className: 'blog-posts' }, ...pageView)
        ),
        pageFooter()
    );
}

// Collect all the routes to be used with the blog pages.
export function getBlogRoutes() {
    let blogRoutes = {};

    for (let i = 0; i < blogContent.length; i++) {
        blogRoutes[blogContent[i].hRef] = () => blogArticlePage(i);
    }

    return blogRoutes;
}
