import { h, VDom, updateElement } from '/lib/dvdi.js';
import { aboutPage } from '/about/about.js';
import { blogPage, blogRouteInit } from '/blog/blog.js';
import { projectsPage } from '/projects/projects.js';
import { pageHeader, articleTitle, pageFooter } from "/lib/page.js";

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

function homePage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('davehudson.io'),
            h('p', {},
                'Welcome to my (Dave Hudson\'s) space in the Internet!'
            ),
            h('h2', {}, 'What\'s new?'),
            h('p', {},
                'Pretty much everything on this site is currently being reworked.  I will also be adding some new blog ' +
                'posts about the JavaScript engine I built to serve up this site.' 
            ),
            h('h2', {}, 'hashingit.com'),
            h('p', {},
                'The site started out as my blog about Bitcoin mining under the original site name hashingit.com.'
            ),
            h('p', {},
                'If you\'ve arrived here via an old link from the hashingit.com blog, please take a look at ',
                h('a', { href: '/blog', onClick: (e) => navigateEvent(e, '/blog') }, 'Blog'),
                '.  You should find all the original articles there.'
            ),
            h('h2', {}, 'Projects'),
            h('p', {},
                'Over many years I\'ve been involved with a lot of open source projects.  You can find more details at ',
                h('a', { href: '/projects', onClick: (e) => navigateEvent(e, '/projects') }, 'Projects'),
                '.'
            )
        ),
        pageFooter()
    );
}

function notFoundPage(path) {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle(`404: Page "${path}" not found`),
            h('p', {}, 'This is unlikely to be the page you were looking for!'),
            h('p', {},
                'If you\'ve arrived here via an old link from the hashingit.com blog, please take a look at ',
                h('a', { href: '/blog', onClick: (e) => navigateEvent(e, '/blog') }, 'Blog'),
                '.  You should find all the original articles there.'
            )
        ),
        pageFooter()
    );
}

export const routes = {
    '': homePage,
    '/about': aboutPage,
    '/projects': projectsPage,
    '/blog': blogPage
};

let rootVNode = null;

function saveScrollPosition() {
    history.replaceState({ scrollPosition }, document.title);
}

function handleLocation() {
    let path = window.location.pathname;

    // If there's a trailing slash on the path, remove it.
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    let pageFunction = routes[path];
    if (pageFunction === undefined) {
        pageFunction = () => notFoundPage(path);
    }

    const newVNode = pageFunction();
    const app = document.querySelector('#app');

    updateElement(app, null, rootVNode, newVNode, 0);
    rootVNode = newVNode;
    console.log(`navigated to ${path}`)
}

export function navigateEvent(e, path) {
    e.preventDefault();
    const scrollPosition = {
        y: window.scrollY,
        x: window.scrollX
    }

    window.history.pushState({ scrollPosition }, '', path);
    handleLocation();
    window.scrollTo(0, 0);
}

function routeInit() {
    // Add all the blog content to the router.
    blogRouteInit();

    // Set up the navigation for stepping backwards.
    window.onpopstate = (e) => {
        handleLocation();
        if (!e.state) {
            window.scrollTo(0, 0);
        } else {
            const scrollPosition = e.state.scrollPosition;
            window.scrollTo(scrollPosition.x, scrollPosition.y);
        }
    };

    handleLocation();
}

document.addEventListener('DOMContentLoaded', routeInit());
