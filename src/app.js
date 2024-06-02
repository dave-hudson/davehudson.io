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
            articleTitle('hashingit.com')
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

export const routes = {
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
    feather.replace();
}

export function navigateEvent(e, path) {
    e.preventDefault();
    window.history.pushState({}, '', path);
    handleLocation();
}

function routeInit() {
    // Add all the blog content to the router.
    blogRouteInit();

    // Set up the navigation for stepping backwards.
    window.onpopstate = () => handleLocation();
    handleLocation();
}

document.addEventListener('DOMContentLoaded', routeInit());
