import {h, VNode, VElement} from '../lib/dvdi';
import {navigateEvent} from '../app';
import {daveHudsonLogo} from './daveHudsonLogo';
import {moonIcon, sunIcon} from '../lib/icons';

let darkModeSun: HTMLElement | null = null;
let darkModeMoon: HTMLElement | null = null;

function sunMoonIcon(isSun: boolean, clickCallback: (isSun: boolean) => void) {
    return h('button', {
            className: 'icon theme-toggle',
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            'aria-label': isSun ? 'Switch to dark mode' : 'Switch to light mode',
            onclick: () => clickCallback(isSun)
        },
        isSun ? sunIcon() : moonIcon()
    );
}

export function pageHeader(): VNode {
    // Create header element
    const headerElement = h('header', {className: 'header'},
        h('div', {className: 'container'},
            h('nav', {className: 'logo'},
                h('a', {href: '/', onclick: (e: MouseEvent) => navigateEvent(e, '/')},
                    daveHudsonLogo()
                ),
            ),
            h('nav', {className: 'menu'},
                h('a', {href: '/projects', onclick: (e: MouseEvent) => navigateEvent(e, '/projects')}, 'Projects'),
                h('a', {href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog')}, 'Blog'),
                h('a', {href: '/notes', onclick: (e: MouseEvent) => navigateEvent(e, '/notes')}, 'Notes'),
                h('a', {href: '/about', onclick: (e: MouseEvent) => navigateEvent(e, '/about')}, 'About'),
                sunMoonIcon(false, setDarkTheme),
                sunMoonIcon(true, setDarkTheme)
            )
        )
    );

    const windowMedia = window.matchMedia('(prefers-color-scheme: dark)');

    function setDarkTheme(dark: boolean) {
        const htmlElement = document.documentElement;
        
        if (dark === true) {
            // Dark mode: show moon icon, hide sun icon
            if (darkModeSun) {
                darkModeSun.style.display = 'none';
            }

            if (darkModeMoon) {
                darkModeMoon.style.display = '';
            }

            htmlElement.setAttribute('data-theme', 'dark');

            if (windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'dark');
            }
        } else {
            // Light mode: show sun icon, hide moon icon
            if (darkModeSun) {
                darkModeSun.style.display = '';
            }

            if (darkModeMoon) {
                darkModeMoon.style.display = 'none';
            }

            htmlElement.setAttribute('data-theme', 'light');

            if (!windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'light');
            }
        }
    }

    // Set up and clean up event listeners when the component mounts/unmounts
    (headerElement as VElement).mountCallback = () => {
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
                let localDarkTheme = localStorage.getItem('darkTheme');
                if (localDarkTheme === null) {
                    setDarkTheme(windowMedia.matches);
                }
            });
        } else if (windowMedia.addListener) {
            windowMedia.addListener(() => {
                let localDarkTheme = localStorage.getItem('darkTheme');
                if (localDarkTheme === null) {
                    setDarkTheme(windowMedia.matches);
                }
            });
        }
    };

    return headerElement;
}
