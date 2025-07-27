import {h, VElement, VNode} from './dvdi';
import {navigateEvent} from '../app';
import {mailIcon, gitHubIcon, linkedInIcon, xIcon, moonIcon, sunIcon} from './icons';

let darkTheme: HTMLLinkElement | null = null;
let darkModeSun: HTMLElement | null = null;
let darkModeMoon: HTMLElement | null = null;

function sunMoonIcon(isSun: boolean, clickCallback: (isSun: boolean) => void) {
    return h('button', {
            className: 'icon',
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            'aria-label': isSun ? 'Light mode' : 'Dark mode',
            onclick: () => clickCallback(!isSun)
        },
        isSun ? sunIcon() : moonIcon()
    );
}

export function pageHeader(): VNode {
    const component = () => h('header', {className: 'header'},
        h('nav', {className: 'site-title'},
            h('a', {className: 'home-link', href: '/', onclick: (e: MouseEvent) => navigateEvent(e, '/')}, 'davehudson.io'),
            h('a', {className: 'icon', href: 'https://x.com/davehudsonio', target: '_blank', title: 'X'},
                xIcon()
            ),
            h('a', {className: 'icon', href: 'https://linkedin.com/in/davejh', target: '_blank', title: 'LinkedIn'},
                linkedInIcon()
            ),
            h('a', {className: 'icon', href: 'https://github.com/dave-hudson', target: '_blank', title: 'GitHub'},
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
        h('nav', {className: 'site-menu'},
            h('a', {className: 'menu', href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog')}, 'Blog'),
            h('a', {className: 'menu', href: '/projects', onclick: (e: MouseEvent) => navigateEvent(e, '/projects')}, 'Projects'),
            h('a', {className: 'menu', href: '/about', onclick: (e: MouseEvent) => navigateEvent(e, '/about')}, 'About'),
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
                darkTheme.removeAttribute('disabled');
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
                darkTheme.setAttribute('disabled', 'true');
            }

            if (!windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'light');
            }
        }
    }

    let vNode = component();
    (vNode as VElement).mountCallback = () => {
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

export function pageFooter(): VNode {
    return h('footer', {className: 'footer'},
        h('p', {className: 'copyright'},
            '© 2014-2025 David J. Hudson'
        )
    );
}
