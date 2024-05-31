import { h, VDom, updateElement } from '/lib/dvdi.js';

console.log('SCRIPT RELOADED!')

const updateQueue = new Set();

/*
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 */
function enqueueVDomUpdate(update) {
    updateQueue.add(update);
    if (updateQueue.size === 1) {
        requestAnimationFrame(runVDomUpdates);
    }
}

/*
 * Runs all updates that have been enqueued.
 */
function runVDomUpdates() {
    updateQueue.forEach(update => update());
    updateQueue.clear();
}

let darkTheme = null;
let darkModeSun = null;
let darkModeMoon = null;

function sunMoonIcon(isSun, clickCallback) {
    const component = () => h('div', {
            className: "icon",
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            onClick: () => clickCallback(!isSun)
        },
        h('a', {},
            h('i', { 'data-feather': isSun ? 'sun' : 'moon' })
        )
    )

    return component();
}

function pageHeader() {
    const component = () => h('header', { className: 'header'},
        h('table', { className: "site-title"},
            h('tbody', {},
                h('tr', {},
                    h('td', {},
                        h('h1', {}, 'Dave Hudson'),
                        h('h2', {},
                            h('a', { href: '/', onClick: (e) => navigateEvent(e, '/') }, 'hashingit.com')
                        )
                    ),
                    h('td', {},
                        h('nav', { className: 'social' },
                            h('div', { className: 'icon' },
                                h('a', { href: '/index.xml', title: 'RSS' },
                                    h('i', { 'data-feather': 'rss' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://twitter.com/hashingitcom', title: 'Twitter' },
                                    h('i', { 'data-feather': 'twitter' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://facebook.com/hashingitcom', title: 'Facebook' },
                                    h('i', { 'data-feather': 'facebook' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://linkedin.com/in/davejh', title: 'LinkedIn' },
                                    h('i', { 'data-feather': 'linkedin' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://github.com/dave-hudson', title: 'GitHub' },
                                    h('i', { 'data-feather': 'github' })
                                )
                            )
                        )
                    )
                )
            )
        ),
        h('nav', { className: 'site-menu' },
            h('div', { className: 'menu' },
                h('a', { href: '/blog', onClick: (e) => navigateEvent(e, '/blog') }, 'Blog')
            ),
            h('div', { className: 'menu' },
                h('a', { href: '/about', onClick: (e) => navigateEvent(e, '/about') }, 'Me')
            ),
            sunMoonIcon(false, setDarkTheme),
            sunMoonIcon(true, setDarkTheme)
        )
    );

    const windowMedia = window.matchMedia("(prefers-color-scheme: dark)");

    function setDarkTheme(dark) {
        if (dark === true) {
            darkModeSun.style.display = '';
            darkModeMoon.style.display = 'none';
            darkTheme.disabled = false;
            if (windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'dark');
            }
        } else {
            darkModeSun.style.display = 'none';
            darkModeMoon.style.display = '';
            darkTheme.disabled = true;
            if (!windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'light');
            }
        }
    }

    let vNode = component();
    vNode.mountCallback = () => {
        feather.replace();
        darkTheme = document.getElementById('dark-mode-theme');
        darkModeSun = document.getElementById('dark-mode-sun');
        darkModeMoon = document.getElementById('dark-mode-moon');

        // If we can, work out whether we should default to dark or light mode.
        let localDarkTheme = localStorage.getItem('darkTheme');
        if (localDarkTheme === null) {
            setDarkTheme(windowMedia.matches);
        } else {
            setDarkTheme(localDarkTheme === 'dark');
        }

        if (windowMedia.addEventListener) {
            windowMedia.addEventListener('change', () => {
                setDarkTheme(windowMedia.matches);
            });
        } else if (windowMedia.addListener) {
            windowMedia.addListener(() => {
                setDarkTheme(windowMedia.matches);
            });
        }
    }

    return vNode;
}

function articleTitle(title, timeStr = '') {
    return h('header', { className: 'title' },
        h('h1', {}, title),
        h('time', { className: 'meta' }, timeStr)
    );
}

function navPrevNext(prevStr, prevHRef, nextStr, nextHRef) {
    let component = () => h('nav', { className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', { className: 'meta-nav' },
            h('tr', {},
                h('td', { className: 'prev' },
                    h('div', { className: 'icon' },
                        h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) },
                            h('i', { 'data-feather': 'chevron-left' })
                        )
                    )
                ),
                h('td', { className: 'prev-text' },
                    h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) }, prevStr)
                ),
                h('td', { className: 'next-text' },
                    h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) }, nextStr)
                ),
                h('td', { className: 'next' },
                    h('div', { className: 'icon' },
                        h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) },
                            h('i', { 'data-feather': 'chevron-right' })
                        )
                    )
                )
            )
        )
    );

    let vNode = component();
    vNode.mountCallback = () => {
        // This isn't ideal because we can end up calling this function several times.  Needs a better option!
        feather.replace();
    }

    return vNode;
}

function pageFooter() {
    return h('footer', { className: 'footer' },
        h('div', { className: 'copyright' },
            '© 2014-2024 David J. Hudson'
        )
    );
}

function homePage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('hashingit.com')
        ),
        pageFooter()
    );
}

function aboutPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('About Me', '2024-05-29 07:45'),
            h('p', {},
                'Hello, good morning/afternoon/evening* and welcome! ',
                h('em', {}, '(*please delete as appropriate)')
            ),
            h('p', {},
                'I\'m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                'I would say I love maths too, but I should probably leave that to the experts :-)'
            ),
            h('p', {},
                'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                'I care to think about. In that time I\'ve had the pleasure of working on everything from massive scale ' +
                'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                'Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also ' +
                'helped design CPU instruction sets.'
            ),
            h('p', {},
                'Lately I\'ve been building blockchain and distributed ledger systems.'
            ),
            h('figure', {},
                h('img', { src: "/content/about/dave.jpg", alt: "Me (apparently always pictured with a drink!)" }),
                h('figcaption', {}, 'Me (apparently always pictured with a drink!)'
                )
            ),
            h('p', {},
                'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
            ),
            h('h2', {}, 'What\'s this site about?'),
            h('p', {},
                'This site is a little bit of an experiment.  Over the years I\'ve researched and developed a lot ' +
                'of things I think are interesting, and I wanted to have somewhere to try and share some of what ' +
                'I\'ve learned and some of what I learn as I go along. If you do find anything interesting then ' +
                'please feel free to reach out to me on: ',
                h('a', { href: "http://twitter.com/hashingitcom" }, 'Twitter'),
                ' or ',
                h('a', { href: "http://linkedin.com/in/davejh/" }, 'LinkedIn')
            )
        ),
        pageFooter()
    );
}

function blogArticlePage(title, dateTime, articleFunction) {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle(title, dateTime),
            ...articleFunction()
        ),
        pageFooter()
    );
}

function blogArticle_201403090000() {
    return [
        h('p', {},
            'Bitcoin mining is seemingly unique. There has probably never been any technology problem that ' +
            'has triggered such sustained growth and it may be a very long time before we see another one. ' +
            'A convergence of the scalable Bitcoin protocol design, readily available technology, money ' +
            'and mining incentives have accelerated this particular mine train in a truly explosive way. ' +
            'Let\'s look at the trends and what they suggest for future mining activities.'
        ),
        h('h2', {}, 'What has been happening?'),
        h('p', {},
            'There is probably a lot to be said for looking at the history of Bitcoin mining prior to the ' +
            'last 12 months but it\'s more interesting to look at how it has progressed since the introduction ' +
            'of ASIC (application specific integrated circuit) mining. We might argue that this is the ' +
            'point at which mining started to become a professional task since the hardware involved can\'t be ' +
            'used for anything else. Previous generations used hardware that was originally designed for ' +
            'other purposes and so let amateurs play too.'
        ),
        h('p', {},
            'Let\'s look at the worldwide hashing data:'
        ),
        h('figure', {},
            h('img', { src: "/content/blog/2014-03-09-0000/20140309-hash-12months.png" })
        ),
        h('p', {},
            'The first thing to notice is that this isn\'t an ordinary graph. It\'s plotted on a logarithmic ' +
            'Y axis meaning that each major graduation is 10 times larger than the one below.  If we look at ' +
            'the red trend line though it\'s a straight line, signalling that we have had exponential ' +
            '(runaway) growth. There was a small period of time before the value of Bitcoins soared late in ' +
            '2013 where things had slowed down but then everything caught up (which rarely happens with ' +
            'technology problems).'
        ),
        h('h2', {}, 'Exponential growth'),
        h('p', {},
            'It\'s useful to think about what that red trend line shows us. What we see is that in the last ' +
            '12 months the worldwide hashing rate has increased by a factor of approximately 1000. That ' +
            'means that roughly every 4 months it got 10x larger, that it doubles almost every 37 days ' +
            'and that it increases by almost 1.9% per day! We don\'t know how long this trend will continue ' +
            'but it has been somewhat stable for the last year. Given that newer and faster ASIC hardware is ' +
            'due to ship throughout the next few months it seems likely that it will continue for some time yet.'
        ),
        h('h2', {}, 'The economics of professional mining'),
        h('p', {},
            'Bitcoin mining is a zero-sum game; if one player wins then everyone else has to lose. When the ' +
            'value of Bitcoins increases it means that even winning a small share of the total can be highly ' +
            'valuable so, rather than play alone, most people join a mining pool. Mining pools let a player ' +
            'win fractions of the payout to that pool in proportion to the resources supplied to the pool but ' +
            'what we\'ve just seen is that any resources a player contributes are reduced by almost 1.9% per ' +
            'day. After a week they\'re down by more than 12% and after 37 days they\'re only 50% of what they ' +
            'started at.'
        ),
        h('p', {},
            'What this really means is that mining equipment has a staggering level of depreciation. If the ' +
            'value of a Bitcoin doesn\'t change in that 37 day period then the mining hardware is only ' +
            'producing half of the value it started with. After 74 days it\'s a quarter and after 4 months ' +
            'it\'s only a tenth. It quickly reaches the point where the operating cost (OpEx) outweighs the ' +
            'value of what\'s being produced and the hardware is worthless. At this point the entire capital ' +
            'cost (CapEx) of buying the equipment is wiped out.'
        ),
        h('p', {},
            'Almost nothing else we encounter works this way; consider that servers in a data centre or a ' +
            'laptop may be assumed to have a useful life of 3 to 5 years, while a car would typically be more ' +
            'than 10 years. With a stagnant Bitcoin price, mining hardware has depreciated to just 1% of its ' +
            'original value in 8 months and its useful lifespan (where it produces more value than it costs ' +
            'to operate) is probably much shorter! Even if the value of Bitcoin increases by a factor of 10 it ' +
            'still only defers the huge reduction in capital value by 4 months.'
        ),
        h('h2', {}, 'How does this affect the hashing rate?'),
        h('p', {},
            'The huge rate of depreciation means that there\'s only one sensible approach that a bitcoin miner ' +
            'can take: Run the hardware 24/7 at the highest speed that doesn\'t cause it to break from the ' +
            'moment it arrives until it\'s no longer generating more value than it costs to run. Not doing this ' +
            'simply means a miner is losing the most valuable portion of their hardware\'s life.'
        ),
        h('p', {},
            'This simple rule has an important consequence; It guarantees a constant supply of the newest and ' +
            'fastest hashing engines driving the worldwide hashing rate. Once an order is placed a miner is ' +
            'committed to fueling this expansion. Unlike the rides in theme parks around the world, this ' +
            'particular runaway mine train isn\'t slowing down for anyone!'
        )
    ];
}

function blogArticle_201403120000() {
    return [
        h('p', {},
            'There\'s something odd about the fluctuations in the price of Bitcoins. The data shows a set of ' +
            'spikes when the price jumps up and then falls back somewhat and levels out. This wouldn\'t be so ' +
            'unusual if the spikes occurred intermittently but in the case of Bitcoins the spikes happen ' +
            'with a very surprising regularity!'
        ),
        h('p', {}, 'Let\'s look at the graph:'),
        h('figure', {},
            h('img', { src: "/content/blog/2014-03-12-0000/20140312_BTC_Price.png" })
        ),
        h('p', {},
            'The first thing to note is that the graph is plotted with a logarithmic Y axis so each step ' +
            'indicates a price point ten times larger than the one below. Using a log scale means that we see ' +
            'patterns in the relative change in price much more easily, rather than changes in the actual value.'
        ),
        h('p', {},
            'There are 7 major spikes in the Bitcoin price starting on 17th November 2010 and finishing on the ' +
            '30th November 2013. If we ignore the spike on 10th February 2011 the other 6 spikes have an ' +
            'amazingly consistent spacing!'
        ),
        h('p', {},
            'All of the major price spikes also show another remarkable similarity. In each case the price ' +
            'ramps up very quickly, hits its highest point for a day or two and then slowly drops off.'
        ),
        h('p', {},
            'So there are a few big questions (to which I don\'t have any answers right now):'
        ),
        h('ul', {},
            h('li', {}, 'Why does the price spike up every 7 to 7.5 months?'),
            h('li', {}, 'Why does the price never drop back below where it starts from?'),
            h('li', {}, 'Is the behaviour just coincidence or is someone or something triggering it?')
        ),
        h('p', {},
            'Does anyone have any data that might explain this?'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: "http://blockchain.info" }, 'blockchain.info')
        )
    ];
}

function blogArticle_202001272336() {
    return [
        h('p', {},
            'When I decided to create this site, one of the main things I wanted to do was keep the blog as ' +
            'something of a journal. I\'ve tried this in the past when I was writing a C++ library, ',
            h('a', { href: 'http://github.com/dave-hudson/c8/wiki/Dev-Notes' }, 'c8'),
            ', and it was an interesting experience.'
        ),
        h('p', {},
            'While my earlier efforts related to something a little more complex, one of the reasons I found the ' +
            'exercise interesting was that it would allow me, and others, to come back and review what I did and why. ' +
            'Looking back nearly 3 years on from that previous experiment I realised there was a lot of interesting ' +
            'detail that wouldn\'t be at all obvious from the Git commits.'
        ),
        h('p', {},
            'Unlike C++, my HTML and CSS skills are pretty limited, but I found myself applying lessons learned in ' +
            'other software development to keep my future self sane.'
        ),
        h('h2', {}, 'Names matter'),
        h('p', {},
            'The names of things really matter. We want them to make sense and not be surprising. The original ' +
            'theme files I\'d picked up had some rather odd names. For example the ',
            h('code', {}, '<head>'),
            ' tag had a partial HTML snippet file called ',
            h('code', {}, 'header.html'),
            ' while the HTML header was called ',
            h('code', {}, 'head.html'),
            '. These are things that confused me over the last couple of days and would have done so again. ' +
            'They weren\'t big sources of confusion, but every incremental time would have been more time wasted ' +
            'for me. More importantly, they\'d have been an incremental source of confusion to anyone else who ' +
            'read the code for this site.'
        ),
        h('h2', {}, 'Good source code is as simple as possible'),
        h('p', {},
            'I\'ve seen too many examples of source code being made very dense in the apparent interests of ' +
            'simplification, but all too often I see pointless refactoring. Sometimes it\'s ok to just copy 2 or 3 ' +
            'lines of code to make it easy to read things all in one place. Sometimes it\'s better to make the CSS ' +
            'match up with the HTML structure, even if that leads to a little duplication, as that can make it ' +
            'easier to work out how those things line up together.'
        ),
        h('h2', {}, 'Great source code is consistent'),
        h('p', {},
            'One of the things that\'s most frustrating to me is lack of consistency. Doing the same thing in ' +
            'different ways just makes it harder for everyone who comes after you. Future readers will wonder what ' +
            'makes one different to the other and worry about what they\'ve not understood. Left unchecked this ' +
            'creates islands of code that maintainers don\'t want to touch in case they didn\'t fully get it.'
        ),
        h('h2', {}, 'Self documenting code completely misses the point of comments'),
        h('p', {},
            'This also brings me to a rant about commenting of code.  There\'s a school of thought that “self ' +
            'documenting” code is possible, but I\'d argue that that\'s ridiculous. How do we tell the difference ' +
            'between buggy code and correct code? How do we tell our future selves about things that we shouldn\'t ' +
            'do because they don\'t work well? How do we hint at things that might want to happen in the future? ' +
            'There are certainly bad comments; those that don\'t match up with the code, or just describe obvious ' +
            'syntactic characteristics, but good comments explain why the code is the way it\'s written!'
        ),
        h('h2', {}, 'Unconvinced? Here\'s a test'),
        h('p', {},
            'I don\'t expect to have convinced anyone yet, but here\'s a test that might help persuade you.  Take ' +
            'any significant piece of software that you\'ve written and find another developer who doesn\'t ' +
            'already understand it. Your role is to answer any questions about your software, while their role is ' +
            'to read it and explain back to you how each part works. To see this properly you have to arrange to ' +
            'do this in person.'
        ),
        h('p', {},
            'What I\'ve always found interesting about this test is the number of questions that get asked by the ' +
            'other person. Usually they\'ll seek clarifications. Often they\'ll end up saying things like “err, ' +
            'oh, no, that\'s not what it\'s doing”. Sometimes they\'re completely baffled. Occasionally they\'ll ' +
            'find bugs. Almost never do they scroll quickly through the code just describing it!'
        ),
        h('h2', {}, 'Source code needs to be written for people'),
        h('p', {},
            'So, finally, here\'s the thing that I wish more software developers thought about.'
        ),
        h('p', {},
            'The objective of writing good source code isn\'t just for a compiler or interpreter - it\'s for the ' +
            'benefit of future maintainers. Those people are going to need a lot more hints and help. They not ' +
            'only need to know what you wanted the code to do now but also how it might need to be modified by ' +
            'the time they\'re looking at it.'
        ),
        h('p', {},
            'Things aren\'t done when the machine in front of you gets it right, they\'re done when the next ' +
            'developer who needs to alter something is able to get it right too.'
        )
    ];
}

class BlogPosts {
    constructor(title, dateTime, hRef, articleFunction) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.articleFunction = articleFunction;
    }
}

// Enumerate all the blog content served up here.
let blogContent = [
    new BlogPosts(
        'Understanding other people\'s code',
        '2020-01-27 23:36',
        '/blog/2020-01-27-2336',
        blogArticle_202001272336
    ),
    new BlogPosts(
        'Strange spikes in the Bitcoin price',
        '2014-03-12',
        '/blog/2014-03-12-0000',
        blogArticle_201403120000
    ),
    new BlogPosts(
        'The Bitcoin runaway mine train',
        '2014-03-09',
        '/blog/2014-03-09-0000',
        blogArticle_201403090000
    )
]

function blogLink(href, title, meta) {
    return h('div', { className: 'blog-post' },
        h('span', { className: 'title' },
            h('a', { href: href, onClick: (e) => navigateEvent(e, href) }, title)
        ),
        h('span', { className: 'meta' }, meta)
    )
}

// Handle generating the '/blog' page
function blogPage() {
    let pageView = [];
    let curYear = '';

    // Iterate all the blog content and create year and item enties.
    for (let i of blogContent) {
        const iYear = i.dateTime.slice(0, 4);
        if (curYear != iYear) {
            curYear = iYear;
            pageView.push(h('h2', {}, iYear));
        }

        pageView.push(blogLink(i.hRef, i.title, i.dateTime));
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

function notFoundPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('404: Page not found'),
            h('p', {}, 'Move along, nothing to see here!')
        ),
        pageFooter()
    );
}

const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/blog': blogPage
};

let rootVNode = null;

function handleLocation() {
    const path = window.location.pathname;
    const pageFunction = routes[path] || notFoundPage;
    const newVNode = pageFunction();
    const app = document.querySelector('#app');

    updateElement(app, null, rootVNode, newVNode, 0);
    rootVNode = newVNode;
    console.log(`navigated to ${path}`)
}

function navigateEvent(e, path) {
    e.preventDefault();
    window.history.pushState({}, '', path);
    handleLocation();
}

function route_init() {
    // Add all the blog content to the router.
    for (let i of blogContent) {
        routes[i.hRef] = () => blogArticlePage(i.title, i.dateTime, i.articleFunction);
    }

    // Set up the navigation for stepping backwards.
    window.onpopstate = () => handleLocation();
    handleLocation();
}

document.addEventListener('DOMContentLoaded', route_init());
