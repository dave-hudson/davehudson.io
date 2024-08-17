import {h, VElement, VNode} from './dvdi';
import {navigateEvent} from '../app';
import {mailIcon, gitHubIcon, linkedInIcon, xIcon, instagramIcon, moonIcon, sunIcon} from './icons';
import {anchor, footer, header, navigation, paragraph} from "./dvdi.html-elements";

let darkTheme: HTMLLinkElement | null = null;
let darkModeSun: HTMLElement | null = null;
let darkModeMoon: HTMLElement | null = null;

const sunMoonIcon = (isSun: boolean, clickCallback: (isSun: boolean) => void) => {
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
    const component = () => header({className: 'header'},
        navigation({className: 'site-title'},
            anchor({className: 'home-link', href: '/', onclick: (e: MouseEvent) => navigateEvent(e, '/')}, 'davehudson.io'),
            anchor({className: 'icon', href: 'https://instagram.com/davehudsonio', target: '_blank', title: 'Instagram'},
                instagramIcon()
            ),
            anchor({className: 'icon', href: 'https://x.com/davehudsonio', target: '_blank', title: 'X'},
                xIcon()
            ),
            anchor({className: 'icon', href: 'https://linkedin.com/in/davejh', target: '_blank', title: 'LinkedIn'},
                linkedInIcon()
            ),
            anchor({className: 'icon', href: 'https://github.com/dave-hudson', target: '_blank', title: 'GitHub'},
                gitHubIcon()
            ),
            anchor({
                    className: 'icon',
                    href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io',
                    title: 'Email'
                },
                mailIcon(),
            )
        ),
        navigation({className: 'site-menu'},
            anchor({className: 'menu', href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog')}, 'Blog'),
            anchor({className: 'menu', href: '/projects', onclick: (e: MouseEvent) => navigateEvent(e, '/projects')}, 'Projects'),
            anchor({className: 'menu', href: '/about', onclick: (e: MouseEvent) => navigateEvent(e, '/about')}, 'About'),
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
    return footer({className: 'footer'},
        paragraph({className: 'copyright'},
            '© 2014-2024 David J. Hudson'
        )
    );
}
