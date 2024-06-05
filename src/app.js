import { h, VDom, updateElement } from '/lib/dvdi.js';
import { aboutPage } from '/about/about.js';
import { blogPage, blogRouteInit } from '/blog/blog.js';
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
            articleTitle('hashingit.com'),
            h('p', {},
                'Welcome to my (Dave Hudson\'s) space in the Internet!'
            ),
            h('p', {},
                'The site started out as my blog about Bitcoin mining (hence the name).  Now, though, whenever I find the ' +
                'time, I write about anything I find interesting.'
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
            h('p', {}, `This is unlikely to be the page you were looking for!  Please check on the navigation above.`)
        ),
        pageFooter()
    );
}

export const routes = {
    '': homePage,
    '/about': aboutPage,
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
    feather.replace();
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
