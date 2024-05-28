import { h, VDom, updateElement } from './lib/dvdi.js';

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

function pageHeader() {
    const component = () => h('div', { className: 'header'},
        h('table', { className: "site-title"},
            h('tbody', {},
                h('tr', {},
                    h('td', {},
                        h('h1', {}, 'Dave Hudson'),
                        h('h2', {},
                            h('a', { href: '/' }, 'hashingit.com')
                        )
                    ),
                    h('td', {},
                        h('nav', { className: "social" },
                            h('div', { className: "icon" },
                                h('a', { href: "/index.xml", title: 'RSS'},
                                    h('i', { 'data-feather': 'rss' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://twitter.com/hashingitcom", title: 'Twitter'},
                                    h('i', { 'data-feather': 'twitter' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://facebook.com/hashingitcom", title: 'Facebook'},
                                    h('i', { 'data-feather': 'facebook' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://linkedin.com/in/davejh", title: 'LinkedIn'},
                                    h('i', { 'data-feather': 'linkedin' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://github.com/dave-hudson", title: 'GitHub'},
                                    h('i', { 'data-feather': 'github' })
                                )
                            )
                        )
                    )
                )
            )
        )
    );

    let vNode = component();
    vNode.mountCallback = () => {
        console.log('feather replace');
        feather.replace();
    }

    return vNode;
}

function homePage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('main', { className: 'main-content' },
            h('section', { className: 'description' },
                'Explore the counters below to interact with the virtual DOM:',
            ),
            h('article', {}, 'More content can follow here.')
        ),
        h('a', { href: '/about', onClick: (e) => navigateEvent(e, '/about') }, 'About'),
        h('footer', { className: 'footer' }, 'Footer content goes here. © 2024.')
    );
}

function aboutPage() {
    return h('div', null,
        h('h1', null, 'About Page'),
        h('a', { href: '/', onClick: (e) => navigateEvent(e, '/') }, 'Home')
    );
}

function notFoundPage() {
    return h('div', null,
        h('h1', null, '404: Page Not Found'),
        h('a', { href: '/', onClick: (e) => navigateEvent(e, '/') }, 'Home')
    );
}

const routes = {
    '/': homePage,
    '/about': aboutPage
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
    window.onpopstate = () => handleLocation();
    handleLocation();
}

document.addEventListener('DOMContentLoaded', route_init());
