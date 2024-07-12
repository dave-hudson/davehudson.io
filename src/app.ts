import { h, updateElement, VNode } from './lib/dvdi';
import { aboutPage } from './about/about';
import { blogPage, blogSummaries, getBlogRoutes } from './blog/blog';
import { projectsPage } from './projects/projects';
import { pageHeader, pageFooter } from "./lib/page";

//const updateQueue = new Set();

/*
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 */
//function enqueueVNodeUpdate(update) {
//    updateQueue.add(update);
//    if (updateQueue.size === 1) {
//        requestAnimationFrame(runVNodeUpdates);
//    }
//}

/*
 * Runs all updates that have been enqueued.
 */
//function runVNodeUpdates() {
//    updateQueue.forEach(update => update());
//    updateQueue.clear();
//}

function homePage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main'},
            h('h1', {}, 'Dreaming in data and code'),
                h('figure', {},
                h('img', {
                    src: '/dream-data-code.webp',
                    alt: 'Conceptual image of dreaming in data and code',
                    width: 800,
                    height: 286
                }),
            ),
            h('p', {},
                'A few inconvenient laws of physics aside, if we can imagine something, then we can probably build it as software.  ' +
                'This site is where I (Dave) write about interesting things in the world of software development - dreams in data ' +
                'and code.'
            ),
            ...blogSummaries(7),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'More blog posts'),
                h('p', {},
                    'You can find older blog posts on this page: ',
                    h('a', { href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog') }, 'Blog')
                )
            ),
        ),
        pageFooter()
    );
}

function notFoundPage(path: string): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, `404: Page "${path}" not found`),
            h('p', {}, 'This is unlikely to be the page you were looking for!'),
            h('p', {},
                'If you\'ve arrived here via an old link from the hashingit.com blog, please take a look at ',
                h('a', { href: '/blog', onclick: (e: MouseEvent) => navigateEvent(e, '/blog') }, 'Blog'),
                '.  You should find all the original articles there.'
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
}

let routes: Map<string, routeDetails> = new Map([
    ['', {
        title: 'Dreaming in data and code',
        render: homePage,
        description: 'davehudson.io is Dave Hudson\'s blog site.  Dave discusses things he finds interesting in the ' +
            'world of software development - dreams in data and code!'
    }],
    ['/about', {
        title: 'About me (Dave Hudson)',
        render: aboutPage,
        description: 'An brief introduction to Dave Hudson, what the site is about, and how to contact him.'
    }],
    ['/projects', {
        title: 'Open source projects',
        render: projectsPage,
        description: 'A quick summary of the open source projects that Dave has developed or contributed to.'
    }],
    ['/blog', {
        title: 'Blog posts',
        render: blogPage,
        description: 'This page indexes all Dave\'s blog posts, presented in date order with the most recent posts at the top ' +
            'of the page'
    }]
]);

let rootVNode: VNode | null = null;

function handleLocation() {
    let path = window.location.pathname;

    console.log(`Navigating to ${path}`)

    // If there's a trailing slash on the path, remove it.
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    let pageInfo = { title: '404 - Not found', render: () => notFoundPage(path), description: '' };
    if (routes.has(path)) {
        pageInfo = (routes.get(path) as routeDetails);
    }

    const newVNode = pageInfo.render();
    const appElement = document.querySelector('#app');

    // Render the new page.
    updateElement((appElement as HTMLElement), null, null, rootVNode, newVNode);
    rootVNode = newVNode;

    // Update the description for the new page.
    const metaDescription: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
    if (metaDescription !== null) {
        metaDescription.content = pageInfo.description;
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
        metaOGURL.content = window.location.href;
    }

    const metaTwitterTitle: HTMLMetaElement | null = document.querySelector('meta[name="twitter:title"]');
    if (metaTwitterTitle !== null) {
        metaTwitterTitle.content = pageInfo.title;
    }

    const metaTwitterDescription: HTMLMetaElement | null = document.querySelector('meta[name="twitter:description"]');
    if (metaTwitterDescription !== null) {
        metaTwitterDescription.content = pageInfo.description;
    }
}

export function navigateEvent(e: MouseEvent, path: string) {
    e.preventDefault();
    const scrollPosition = {
        y: window.scrollY,
        x: window.scrollX
    }

    window.history.pushState({ scrollPosition }, '', path);
    handleLocation();
    window.scrollTo(0, 0);
}

/**
 * Called when the page is first loaded.
 *
 * @param event - the DOMContentLoaded event.
 */
function onDOMContentLoaded(event: Event): void {
    // Add all the blog content to the router.
    const blogRoutes = getBlogRoutes();
    blogRoutes.forEach((value, key) => {
        routes.set(key, value);
    });

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
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
