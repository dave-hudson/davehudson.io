import {h, updateElement, VNode} from './lib/dvdi';
import {aboutPage} from './about/about';
import {blogPage, blogSummaries, getBlogRoutes} from './blog/blog';
import {m6rPage} from './m6r/m6r';
import {notesPage, notesSummaries, getNotesRoutes} from './notes/notes';
import {projectsPage, getProjectRoutes} from './projects/projects';
import {pageHeader, pageFooter, hero} from "./lib/page";

function homePage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Dave Hudson\'s projects, blog, and notes'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('main', {},
                        h('section', {},
                            h('h1', {}, 'Current projects'),
                            h('article', {},
                                h('h2', {},
                                    h('a', {href: '/projects/humbug', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/humbug')}, 'Humbug')
                                ),
                                h('p', {},
                                    'Humbug is a project that explores building a secure and reliable operating system for human/AI ' +
                                    'collaboration.'
                                ),
                                h('p', {},
                                    'Traditional operating systems are designed to securely use and share hardware resources.  The best ones attempt ' +
                                    'to protect users from buggy and malicious software.  The weakest link in this security chain is the human user, ' +
                                    'who can be tricked into running unsafe software or leaking access to sensitive data.'
                                ),
                                h('p', {},
                                    'The introduction of AI suddenly makes this a lot more complicated.  Our default model of the last few decades was ' +
                                    'an unpredictable human interacting with what should be a predictable system.  With AI participant our unpredictable ' +
                                    'human is suddenly dealing with an equally unpredictable AI too.'
                                ),
                                h('p', {},
                                    'We need to rethink our approach to security, privacy, and trust.'
                                ),
                                h('p', {},
                                    h('em', {},
                                        h('a', {href: '/projects/humbug', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/humbug')}, '[find out more]')
                                    )
                                )
                            ),
                            h('article', {},
                                h('h2', {},
                                    h('a', {href: '/projects/aifpl', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/aifpl')}, 'AIFPL')
                                ),
                                h('p', {},
                                    'AIFPL is a pure functional, higher-order, programming language designed for use by AIs.'
                                ),
                                h('p', {},
                                    'Inspired by Lisp, AIFPL is designed to offer LLMs a powerful programming model that can be safely used unsupervised.'
                                ),
                                h('p', {},
                                    h('em', {},
                                        h('a', {href: '/projects/aifpl', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/aifpl')}, '[find out more]')
                                    )
                                )
                            ),
                            h('article', {},
                                h('h2', {},
                                    h('a', {href: '/projects/metaphor', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/metaphor')}, 'Metaphor')
                                ),
                                h('p', {},
                                    'Metaphor is an AI prompt creation language designed to help users generate high-quality prompts for a ' +
                                    'wide range of AI models.'
                                ),
                                h('p', {},
                                    'It has a simple declarative syntax that allows users to define roles, context, and actions in a ' +
                                    'structured way. As with programming languages, Metaphor files can be included in other files, ' +
                                    'allowing for modular and reusable prompt definitions.'
                                ),
                                h('p', {},
                                    h('em', {},
                                        h('a', {href: '/projects/metaphor', onclick: (e: MouseEvent) => navigateEvent(e, '/projects/metaphor')}, '[find out more]')
                                    )
                                )
                            ),
                            h('article', {},
                                h('h1', {}, 'More projects'),
                                h('p', {},
                                    'Find all my earlier projects in the ',
                                    h('a', {href: '/projects', onclick: (e: MouseEvent) => navigateEvent(e, '/projects')}, 'projects'),
                                    ' section.'
                                )
                            )
                        ),
                        h('hr', {}),
                        h('section', {},
                            h('h1', {}, 'Latest blog posts'),
                            ...blogSummaries(5),
                            h('article', {},
                                h('h1', {}, 'More blog posts'),
                                h('p', {},
                                    'Find all my blog posts in the ',
                                    h('a', {href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog')}, 'blog'),
                                    ' section.'
                                )
                            )
                        ),
                        h('hr', {}),
                        h('section', {},
                            h('h1', {}, 'Latest open source research notes'),
                            ...notesSummaries(3),
                            h('article', {},
                                h('h1', {}, 'More open source research notes'),
                                h('p', {},
                                    'Find all my open source research notes in the ',
                                    h('a', {href: '/notes', onclick: (e: MouseEvent) => navigateEvent(e, '/notes')}, 'notes'),
                                    ' section.'
                                )
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

function notFoundPage(path: string): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: `404: Page "${path}" not found`,
                subtitle: 'This is unlikely to be the page you were looking for!'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('p', {},
                        'If you\'ve arrived here via an old link from the hashingit.com blog, please take a look at ',
                        h('a', {href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog')}, 'Blog'),
                        '.  You should find all the original articles there.'
                    )
                )
            )
        ),
        pageFooter()
    );
}

/**
 * Interface representing everything required to render a page.
 */
export interface routeDetails {
    title: string;
    render: () => VNode;
    description: string;
    imageURL: string;
    pageType: string;
}

let routes: Map<string, routeDetails> = new Map([
    ['', {
        title: 'Dave Hudson\'s projects, blog, and notes site',
        render: homePage,
        description: 'davehudson.io is Dave Hudson\'s projects, blog, and notes site.',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'website'
    }],
    ['/about', {
        title: 'About me (Dave Hudson)',
        render: aboutPage,
        description: 'An brief introduction to Dave Hudson, what the site is about, and how to contact him.',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'profile'
    }],
    ['/blog', {
        title: 'Blog posts',
        render: blogPage,
        description: 'This page indexes all Dave\'s blog posts, presented in date order.',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'website'
    }],
    ['/notes', {
        title: 'Research notes',
        render: notesPage,
        description: 'This page indexes all Dave\'s research notes, presented in date order.',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'website'
    }],
    ['/projects', {
        title: 'Open source projects',
        render: projectsPage,
        description: 'A quick summary of the open source projects that Dave has developed or contributed to.',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'website'
    }],
    ['/m6r', {
        title: 'M6R - Thank you for your support',
        render: m6rPage,
        description: 'M6R closure announcement and thanks to the community for their support of Humbug, Metaphor, and AIFPL.',
        imageURL: 'https://davehudson.io/m6r/m6r-512x512.svg',
        pageType: 'article'
    }]
]);

let rootVNode: VNode | null = null;

/**
 * Update page metadata.
 *
 * @param pageInfo - information about the page we're updating.
 */
function handleMetadata(pageInfo: routeDetails) {
    const metaDescription: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
    if (metaDescription !== null) {
        metaDescription.content = pageInfo.description;
    }

    const linkDescription: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (linkDescription !== null) {
        linkDescription.href = 'https://davehudson.io' + window.location.pathname;
    }
}

/**
 * Update page open graph metadata.
 *
 * @param pageInfo - information about the page we're updating.
 */
function handleOGMetadata(pageInfo: routeDetails) {
    const metaOGType: HTMLMetaElement | null = document.querySelector('meta[property="og:type"]');
    if (metaOGType !== null) {
        metaOGType.content = pageInfo.pageType;
    }

    const metaOGTitle: HTMLMetaElement | null = document.querySelector('meta[property="og:title"]');
    if (metaOGTitle !== null) {
        metaOGTitle.content = pageInfo.title;
    }

    const metaOGDescription: HTMLMetaElement | null = document.querySelector('meta[property="og:description"]');
    if (metaOGDescription !== null) {
        metaOGDescription.content = pageInfo.description;
    }

    const metaOGURL: HTMLMetaElement | null = document.querySelector('meta[property="og:url"]');
    if (metaOGURL !== null) {
        metaOGURL.content = 'https://davehudson.io' + window.location.pathname;
    }

    const metaOGImage: HTMLMetaElement | null = document.querySelector('meta[property="og:image"]');
    if (metaOGImage !== null) {
        metaOGImage.content = pageInfo.imageURL;
    }
}

/**
 * Update page twitter metadata.
 *
 * @param pageInfo - information about the page we're updating.
 */
function handleTwitterMetadata(pageInfo: routeDetails) {
    const metaTwitterTitle: HTMLMetaElement | null = document.querySelector('meta[name="twitter:title"]');
    if (metaTwitterTitle !== null) {
        metaTwitterTitle.content = pageInfo.title;
    }

    const metaTwitterDescription: HTMLMetaElement | null = document.querySelector('meta[name="twitter:description"]');
    if (metaTwitterDescription !== null) {
        metaTwitterDescription.content = pageInfo.description;
    }

    const metaTwitterImage: HTMLMetaElement | null = document.querySelector('meta[name="twitter:image"]');
    if (metaTwitterImage !== null) {
        metaTwitterImage.content = pageInfo.imageURL;
    }
}

/**
 * Handle navigation to a new route.
 */
function handleLocation() {
    let path = window.location.pathname;

    console.log(`Navigating to ${path}`)

    // If there's a trailing slash on the path, remove it.
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    let pageInfo = {
        title: '404 - Not found',
        render: () => notFoundPage(path),
        description: '',
        imageURL: 'https://davehudson.io/about/dave.webp',
        pageType: 'website'
    };

    if (routes.has(path)) {
        pageInfo = (routes.get(path) as routeDetails);
    }

    const newVNode = pageInfo.render();
    const appElement = document.querySelector('#app');

    // Render the new page.
    updateElement((appElement as HTMLElement), null, null, rootVNode, newVNode);
    rootVNode = newVNode;

    // Update the document title
    document.title = `${pageInfo.title} - davehudson.io`;

    handleMetadata(pageInfo);
    handleOGMetadata(pageInfo);
    handleTwitterMetadata(pageInfo);

    console.log(`Navigated to ${path}`)
}

function scrollPage(x: number, y: number) {
    setTimeout(() => {
        window.scrollTo(x, y);
    }, 50);
}

export function navigateEvent(e: MouseEvent, path: string) {
    e.preventDefault();

    // Update our history to reflect our new position!
    window.history.pushState({scrollPosition: {x: 0, y: 0}}, '', path);
    handleLocation();

    const id = location.hash.substring(1);
    if (id === '') {
        window.scrollTo(0, 0);
        return;
    }

    setTimeout(() => {
        // We have a hash in our URL, so scroll that into view.
        const targetElement = document.getElementById(id);

        if (targetElement) {
            const yPos = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo(0, yPos);
        }
    }, 50);
}

/**
 * Creates a debounced function that delays the invocation of the provided function
 * until after the specified wait time has elapsed since the last time the debounced
 * function was invoked. This can be useful for limiting the rate at which a function
 * is executed, such as in response to user input or other events.
 *
 * @template T - The type of the function to debounce.
 * @param {T} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait before invoking the function
 *                        after the last invocation.
 * @returns {(...args: Parameters<T>) => void} - Returns the debounced version of the provided function.
 */
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;

    return function(this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Called when the page is first loaded.
 *
 * @param event - the DOMContentLoaded event.
 */
function onDOMContentLoaded(event: Event): void {
    // Add all notes content to the router.
    const notesRoutes = getNotesRoutes();
    notesRoutes.forEach((value, key) => {
        routes.set(key, value);
    });

    // Add all blog content to the router.
    const blogRoutes = getBlogRoutes();
    blogRoutes.forEach((value, key) => {
        routes.set(key, value);
    });

    // Add all project content to the router.
    const projectRoutes = getProjectRoutes();
    projectRoutes.forEach((value, key) => {
        routes.set(key, value);
    });

    // Set scrollRestoration to manual.
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Set up the navigation for stepping backward or forward.
    window.onpopstate = (e) => {
        let scrollX: number = 0;
        let scrollY: number = 0;

        if (e.state) {
            const scrollPosition = e.state.scrollPosition;
            scrollX = scrollPosition.x;
            scrollY = scrollPosition.y;
        }

        handleLocation();
        scrollPage(scrollX, scrollY);
    };

    // Set up listener for scroll events.  When the user scrolls we want to updat the scroll positions in the history
    // so forward and backward operations behave intuitively.  Note we debounce this to prevent spamming the history state.
    window.onscroll = debounce(() => {
        window.history.replaceState({scrollPosition: {x: window.scrollX, y: window.scrollY}}, '', window.location.href);
    }, 50);

    // Look to see if our app HTML element has children.  If it does then it means we've loaded a pre-rendered version of the
    // HTML, in which case we want to remove this content so the VDOM takes control properly.
    const appElement = document.querySelector('#app');
    if (appElement?.firstChild) {
        console.log(`Page was already pre-rendered: ${window.location.pathname}`);
        while (appElement.firstChild) {
            appElement.removeChild(appElement.firstChild);
        }
    }

    handleLocation();
    scrollPage(0, 0);

    // Update our history to record our current scroll position.
    window.history.replaceState({scrollPosition: {x: 0, y: 0}}, '', window.location.href);
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
