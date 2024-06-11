import { h, VDom, updateElement } from '/lib/dvdi.js';
import { navigateEvent } from '/app.js';

let darkTheme = null;
let darkModeSun = null;
let darkModeMoon = null;

function sunMoonIcon(isSun, clickCallback) {
    const component = () => h('div', {
            className: 'icon',
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            onClick: () => clickCallback(!isSun)
        },
        h('a', {},
            h('i', { 'data-feather': isSun ? 'sun' : 'moon' })
        )
    )

    return component();
}

export function pageHeader() {
    const component = () => h('header', { className: 'header'},
        h('table', { className: 'site-title'},
            h('tbody', {},
                h('tr', {},
                    h('td', {},
                        h('h1', {},
                            h('a', { href: '/', onClick: (e) => navigateEvent(e, '/') }, 'davehudson.io')
                        )
                    ),
                    h('td', {},
                        h('nav', { className: 'social' },
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://instagram.com/davehudsonio', title: 'Instagram' },
                                    h('i', { 'data-feather': 'instagram' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://twitter.com/davehudsonio', title: 'Twitter' },
                                    h('i', { 'data-feather': 'twitter' })
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
                            ),
                            h('div', { className: 'icon' },
                                h('a', {
                                        href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io',
                                        title: 'Email'
                                    },
                                    h('i', { 'data-feather': 'mail' })
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
                h('a', { href: '/projects', onClick: (e) => navigateEvent(e, '/projects') }, 'Projects')
            ),
            h('div', { className: 'menu' },
                h('a', { href: '/about', onClick: (e) => navigateEvent(e, '/about') }, 'Me')
            ),
            sunMoonIcon(false, setDarkTheme),
            sunMoonIcon(true, setDarkTheme)
        )
    );

    const windowMedia = window.matchMedia('(prefers-color-scheme: dark)');

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

export function articleTitle(title, timeStr = '') {
    return h('header', { className: 'title' },
        h('h1', {}, title),
        h('time', { className: 'meta' }, timeStr)
    );
}

export function pageFooter() {
    return h('footer', { className: 'footer' },
        h('div', { className: 'copyright' },
            '© 2014-2024 David J. Hudson'
        )
    );
}
