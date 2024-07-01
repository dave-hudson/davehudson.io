import { h } from './dvdi';
import { navigateEvent } from '../app.js';
import { mailIcon, gitHubIcon, linkedInIcon, xIcon, instagramIcon, moonIcon, sunIcon } from './icons';

let darkTheme: HTMLLinkElement | null = null;
let darkModeSun: HTMLElement | null = null;
let darkModeMoon: HTMLElement | null = null;

function sunMoonIcon(isSun: boolean, clickCallback: (isSun: boolean) => void) {
    return h('button', {
            className: 'icon',
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            'aria-label': isSun ? 'Light mode' : 'Dark mode',
            onClick: () => clickCallback(!isSun)
        },
        isSun ? sunIcon() : moonIcon()
    );
}

export function pageHeader() {
    const component = () => h('header', { className: 'header' },
        h('nav', { className: 'site-title' },
            h('a', { className: 'home-link', href: '/', onClick: (e: Event) => navigateEvent(e, '/') }, 'davehudson.io'),
            h('a', { className: 'icon', href: 'https://instagram.com/davehudsonio', title: 'Instagram' },
                instagramIcon()
            ),
            h('a', { className: 'icon', href: 'https://x.com/davehudsonio', title: 'X' },
                xIcon()
            ),
            h('a', { className: 'icon', href: 'https://linkedin.com/in/davejh', title: 'LinkedIn' },
                linkedInIcon()
            ),
            h('a', { className: 'icon', href: 'https://github.com/dave-hudson', title: 'GitHub' },
                gitHubIcon()
            ),
            h('a', {
                    className: 'icon',
                    href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io',
                    title: 'Email'
                },
                mailIcon(),
            )
        ),
        h('nav', { className: 'site-menu' },
            h('a', { className: 'menu', href: '/blog', onClick: (e: Event) => navigateEvent(e, '/blog') }, 'Blog'),
            h('a', { className: 'menu', href: '/projects', onClick: (e: Event) => navigateEvent(e, '/projects') }, 'Projects'),
            h('a', { className: 'menu', href: '/about', onClick: (e: Event) => navigateEvent(e, '/about') }, 'Me'),
            sunMoonIcon(false, setDarkTheme),
            sunMoonIcon(true, setDarkTheme)
        )
    );

    const windowMedia = window.matchMedia('(prefers-color-scheme: dark)');

    function setDarkTheme(dark: boolean) {
        if (dark === true) {
            if (darkModeSun) {
                darkModeSun.style.display = '';
            }

            if (darkModeMoon) {
                darkModeMoon.style.display = 'none';
            }

            if (darkTheme) {
                darkTheme.disabled = false;
            }

            if (windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'dark');
            }
        } else {
            if (darkModeSun) {
                darkModeSun.style.display = 'none';
            }

            if (darkModeMoon) {
                darkModeMoon.style.display = '';
            }

            if (darkTheme) {
                darkTheme.disabled = true;
            }

            if (!windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'light');
            }
        }
    }

    let vNode = component();
    vNode.mountCallback = () => {
        darkTheme = document.getElementById('dark-mode-theme') as HTMLLinkElement;
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
    };

    return vNode;
}

export function pageFooter() {
    return h('footer', { className: 'footer' },
        h('p', { className: 'copyright' },
            '© 2014-2024 David J. Hudson'
        )
    );
}
