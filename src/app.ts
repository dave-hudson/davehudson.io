import { h, updateElement, VDom } from './lib/dvdi';
import { aboutPage } from './about/about';
import { blogPage, blogSummaries, getBlogRoutes } from './blog/blog';
import { projectsPage } from './projects/projects';
import { pageHeader, pageFooter } from "./lib/page";

console.log('SCRIPT RELOADED!')

const updateQueue = new Set();

/*
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 */
//function enqueueVDomUpdate(update) {
//    updateQueue.add(update);
//    if (updateQueue.size === 1) {
//        requestAnimationFrame(runVDomUpdates);
//    }
//}

/*
 * Runs all updates that have been enqueued.
 */
//function runVDomUpdates() {
//    updateQueue.forEach(update => update());
//    updateQueue.clear();
//}

function homePage(): VDom {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main'},
            h('h1', {}, 'Dreaming in data and code'),
                h('figure', {},
                h('img', {
                    src: '/dream-data-code.webp',
                    width: '800',
                    height: '286',
                    alt: 'Conceptual image of dreaming in data and code'
                }),
            ),
            h('p', {},
                'Software is the most amazing playground for an engineer.  A few inconvenient laws of physics aside, ' +
                'if we can imagine something, then we can probably build it in data and code.'
            ),
            ...blogSummaries(7),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'More blog posts'),
                h('p', {},
                    'You can find older blog posts on this page: ',
                    h('a', { href: '/blog', onClick: (e: MouseEvent) => navigateEvent(e, '/blog') }, 'Blog')
                )
            ),
        ),
        pageFooter()
    );
}

function notFoundPage(path: string): VDom {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, `404: Page "${path}" not found`),
            h('p', {}, 'This is unlikely to be the page you were looking for!'),
            h('p', {},
                'If you\'ve arrived here via an old link from the hashingit.com blog, please take a look at ',
                h('a', { href: '/blog', onClick: (e: MouseEvent) => navigateEvent(e, '/blog') }, 'Blog'),
                '.  You should find all the original articles there.'
            )
        ),
        pageFooter()
    );
}

let routes: Map<string, (() => VDom)> = new Map([
    ['', homePage],
    ['/about', aboutPage],
    ['/projects', projectsPage],
    ['/blog', blogPage]
]);

let rootVNode: VDom | null = null;

function handleLocation() {
    let path = window.location.pathname;

    // If there's a trailing slash on the path, remove it.
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    let pageFunction = () => notFoundPage(path);
    if (path === '') {
        pageFunction = homePage;
    } else if (routes.has(path)) {
        pageFunction = (routes.get(path)) as (() => VDom);
    }

    const newVNode = pageFunction();
    const app = document.querySelector('#app');

    updateElement((app as HTMLElement), null, rootVNode, newVNode, 0);
    rootVNode = newVNode;
    console.log(`navigated to ${path}`)
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

function routeInit(event: Event): void {
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

    handleLocation();
}

document.addEventListener('DOMContentLoaded', routeInit);
