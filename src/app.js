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
                        h('nav', { className: "social" },
                            h('div', { className: "icon" },
                                h('a', { href: "/index.xml", title: 'RSS' },
                                    h('i', { 'data-feather': 'rss' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://twitter.com/hashingitcom", title: 'Twitter' },
                                    h('i', { 'data-feather': 'twitter' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://facebook.com/hashingitcom", title: 'Facebook' },
                                    h('i', { 'data-feather': 'facebook' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://linkedin.com/in/davejh", title: 'LinkedIn' },
                                    h('i', { 'data-feather': 'linkedin' })
                                )
                            ),
                            h('div', { className: "icon" },
                                h('a', { href: "https://github.com/dave-hudson", title: 'GitHub' },
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
                h('a', { href: '/blog' }, 'Blog')
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
            darkModeSun.style.display = "";
            darkModeMoon.style.display = "none";
            darkTheme.disabled = false;
            if (windowMedia.matches) {
                localStorage.removeItem("darkTheme");
            } else {
                localStorage.setItem("darkTheme", "dark");
            }
        } else {
            darkModeSun.style.display = "none";
            darkModeMoon.style.display = "";
            darkTheme.disabled = true;
            if (!windowMedia.matches) {
                localStorage.removeItem("darkTheme");
            } else {
                localStorage.setItem("darkTheme", "light");
            }
        }
    }

    let vNode = component();
    vNode.mountCallback = () => {
        console.log('feather replace');
        feather.replace();
        darkTheme = document.getElementById("dark-mode-theme");
        darkModeSun = document.getElementById("dark-mode-sun");
        darkModeMoon = document.getElementById("dark-mode-moon");

        // If we can, work out whether we should default to dark or light mode.
        let localDarkTheme = localStorage.getItem("darkTheme");
        if (localDarkTheme === null) {
            setDarkTheme(windowMedia.matches);
        } else {
            setDarkTheme(localDarkTheme === "dark");
        }

        if (windowMedia.addEventListener) {
            windowMedia.addEventListener("change", () => {
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

function pageTitle(title) {
    return h('div', { className: 'title' },
        h('h1', {}, title)
    );
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
        pageTitle('hashingit.com'),
        h('main', { className: 'main-content' },
            h('section', { className: 'description' },
                'Explore the counters below to interact with the virtual DOM:',
            ),
            h('article', {}, 'More content can follow here.')
        ),
        h('a', { href: '/about', onClick: (e) => navigateEvent(e, '/about') }, 'About'),
        pageFooter()
    );
}

function aboutPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        pageTitle('About Me'),
        h('article', { className: 'post' },
            h('div', { className: 'markdown'},
                h('p', {},
                    h('span', {}, 'Hello, good morning/afternoon/evening* and welcome! ' ),
                    h('em', {}, '(*please delete as appropriate)')
                ),
                h('p', {},
                    'I’m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                    'I would say I love maths too, but I should probably leave that to the experts :-)'
                ),
                h('p', {},
                    'I’ve been playing with computers and writing software since I was 9 which is way more years than ' +
                    'I care to think about. In that time I’ve had the pleasure of working on everything from massive scale ' +
                    'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                    'Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also ' +
                    'helped design CPU instruction sets.'
                ),
                h('p', {},
                    'Lately I’ve been building blockchain and distributed ledger systems.'
                ),
                h('figure', {},
                    h('img', { src: "/content/about/dave.jpg", alt: "Me (apparently always pictured with a drink!)" },
                        h('figcaption', {},
                            'Me (apparently always pictured with a drink!)'
                        )
                    )
                ),
                h('p', {},
                    'That journey has led me all over the world and I’ve had the privilege of collaborating with some ' +
                    'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                    'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
                ),
                h('h2', {}, 'What’s this site about?'
                ),
                h('p', {},
                    h('span', {},
                        'This site is a little bit of an experiment.  Over the years I’ve researched and developed a lot ' +
                        'of things I think are interesting, and I wanted to have somewhere to try and share some of what ' +
                        'I’ve learned and some of what I learn as I go along. If you do find anything interesting then ' +
                        'please feel free to reach out to me on: '
                    ),
                    h('a', { href: "http://twitter.com/hashingitcom" }, 'Twitter'),
                    h('span', {}, ' or '),
                    h('a', { href: "http://linkedin.com/in/davejh/" }, 'LinkedIn')
                )
            )
        ),
        pageFooter()
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
