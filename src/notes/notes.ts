import {h, VElement, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter, hero} from '../lib/page';
import {navigateEvent, routeDetails} from '../app';
import {chevronLeftIcon, chevronRightIcon} from '../lib/icons';
import {notesPost_2025_08_07} from './2025-08-07/post';
import {notesPost_2025_08_08} from './2025-08-08/post';
import {notesPost_2025_08_09} from './2025-08-09/post';
import {notesPost_2025_08_10} from './2025-08-10/post';
import {notesPost_2025_08_11} from './2025-08-11/post';
import {notesPost_2025_08_12} from './2025-08-12/post';
import {notesPost_2025_08_13} from './2025-08-13/post';
import {notesPost_2025_08_14} from './2025-08-14/post';
import {notesPost_2025_08_15} from './2025-08-15/post';
import {notesPost_2025_08_16} from './2025-08-16/post';
import {notesPost_2025_08_18} from './2025-08-18/post';
import {notesPost_2025_08_19} from './2025-08-19/post';
import {notesPost_2025_08_20} from './2025-08-20/post';
import {notesPost_2025_08_22} from './2025-08-22/post';
import {notesPost_2025_08_26} from './2025-08-26/post';
import {notesPost_2025_08_27} from './2025-08-27/post';
import {notesPost_2025_08_29} from './2025-08-29/post';
import {notesPost_2025_08_31} from './2025-08-31/post';
import {notesPost_2025_09_04} from './2025-09-04/post';
import {notesPost_2025_09_08} from './2025-09-08/post';
import {notesPost_2025_09_09} from './2025-09-09/post';
import {notesPost_2025_09_10} from './2025-09-10/post';
import {notesPost_2025_09_11} from './2025-09-11/post';
import {notesPost_2025_09_15} from './2025-09-15/post';
import {notesPost_2025_09_17} from './2025-09-17/post';
import {notesPost_2025_09_18} from './2025-09-18/post';
import {notesPost_2025_09_21} from './2025-09-21/post';
import {notesPost_2025_09_23} from './2025-09-23/post';
import {notesPost_2025_09_25} from './2025-09-25/post';
import {notesPost_2025_09_27} from './2025-09-27/post';
import {notesPost_2025_10_07} from './2025-10-07/post';
import {notesPost_2025_10_19} from './2025-10-19/post';
import {notesPost_2025_10_26} from './2025-10-26/post';
import {notesPost_2025_11_05} from './2025-11-05/post';
import {notesPost_2025_11_07} from './2025-11-07/post';
import {notesPost_2025_11_08} from './2025-11-08/post';
import {notesPost_2025_11_09} from './2025-11-09/post';
import {notesPost_2025_11_14} from './2025-11-14/post';
import {notesPost_2025_11_16} from './2025-11-16/post';
import {notesPost_2025_11_19} from './2025-11-19/post';
import {notesPost_2025_11_21} from './2025-11-21/post';
import {notesPost_2025_11_23} from './2025-11-23/post';
import {notesPost_2025_11_25} from './2025-11-25/post';
import {notesPost_2025_11_28} from './2025-11-28/post';
import {notesPost_2025_12_08} from './2025-12-08/post';
import {NotesPost} from './NotesPost';

// Enumerate all the notes content served up here.  Newest content goes at the end.
const notesContent: NotesPost[] = [
    notesPost_2025_08_07,
    notesPost_2025_08_08,
    notesPost_2025_08_09,
    notesPost_2025_08_10,
    notesPost_2025_08_11,
    notesPost_2025_08_12,
    notesPost_2025_08_13,
    notesPost_2025_08_14,
    notesPost_2025_08_15,
    notesPost_2025_08_16,
    notesPost_2025_08_18,
    notesPost_2025_08_19,
    notesPost_2025_08_20,
    notesPost_2025_08_22,
    notesPost_2025_08_26,
    notesPost_2025_08_27,
    notesPost_2025_08_29,
    notesPost_2025_08_31,
    notesPost_2025_09_04,
    notesPost_2025_09_08,
    notesPost_2025_09_09,
    notesPost_2025_09_10,
    notesPost_2025_09_11,
    notesPost_2025_09_15,
    notesPost_2025_09_17,
    notesPost_2025_09_18,
    notesPost_2025_09_21,
    notesPost_2025_09_23,
    notesPost_2025_09_25,
    notesPost_2025_09_27,
    notesPost_2025_10_07,
    notesPost_2025_10_19,
    notesPost_2025_10_26,
    notesPost_2025_11_05,
    notesPost_2025_11_07,
    notesPost_2025_11_08,
    notesPost_2025_11_09,
    notesPost_2025_11_14,
    notesPost_2025_11_16,
    notesPost_2025_11_19,
    notesPost_2025_11_21,
    notesPost_2025_11_23,
    notesPost_2025_11_25,
    notesPost_2025_11_28,
    notesPost_2025_12_08
]

function navPrevNext(prevStr: string | null, prevHRef: string | null, nextStr: string | null, nextHRef: string | null): VNode {
    return h('nav', {className: 'prev-next'},
        h('h2', {}, 'More notes'),
        h('table', {className: 'meta-nav'},
            h('tr', {},
                h('td', {className: 'prev'},
                    !prevStr ? '' : h('a', {
                            className: 'icon',
                            href: (prevHRef as string),
                            'aria-label': prevStr,
                            onclick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string))
                        },
                        chevronLeftIcon()
                    )
                ),
                h('td', {className: 'prev-text'},
                    !prevStr ? '' : h('a', {
                            href: (prevHRef as string),
                            onclick: (e: MouseEvent) => navigateEvent(e, (prevHRef as string))
                        },
                        prevStr
                    )
                ),
                h('td', {className: 'next-text'},
                    !nextStr ? '' : h('a', {
                            href: (nextHRef as string),
                            onclick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string))
                        },
                        nextStr
                    )
                ),
                h('td', {className: 'next'},
                    !nextStr ? '' : h('a', {
                            className: 'icon',
                            href: (nextHRef as string),
                            'aria-label': nextStr,
                            onclick: (e: MouseEvent) => navigateEvent(e, (nextHRef as string))
                        },
                        chevronRightIcon()
                    )
                )
            )
        )
    );
}

function notesArticlePage(index: number): VNode {
    let prevArticle = (index > 0) ? notesContent[index - 1] : null;
    let thisArticle = notesContent[index];
    let nextArticle = (index < (notesContent.length - 1)) ? notesContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;
    let preText: VNode[] = [];
    if (thisArticle.preScriptFunction !== null) {
        preText = thisArticle.preScriptFunction();
    }

    let postText: VNode[] = [];
    if (thisArticle.postScriptFunction !== null) {
        postText = thisArticle.postScriptFunction();
    }

    // Parse the ISO 8601 date string into a Date object
    const date = new Date(thisArticle.dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`
    if (thisArticle.dateTime.length > 10) {
        formattedDate += ` ${hours}:${minutes}`
    }

    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: thisArticle.title,
                subtitle: `Published: ${formattedDate}`
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        ...preText,
                        ...thisArticle.openingFunction(),
                        ...thisArticle.articleFunction()
                    ),
                    ...postText,
                    h('hr', {}),
                    navPrevNext(prevTitle, prevHRef, nextTitle, nextHRef),
                )
            )
        ),
        pageFooter()
    );
}

function notesLink(href: string, title: string, meta: string) {
    return h('li', {className: 'blog-post'},
        h('div', {className: 'blog-content'},
            h('span', {},
                h('a', {href: href, onclick: (e: MouseEvent) => navigateEvent(e, href)}, title)
            ),
            h('span', {className: 'meta'}, meta)
        )
    )
}

// Handle generating the '/notes' page
export function notesPage() {
    let pageView: VNode[] = [];
    let yearSection: (VNode | null) = null;
    let listSection: (VNode | null) = null;
    let headlineYear: number = 0;

    // Iterate all the notes content and create year and item enties.
    for (let i = notesContent.length - 1; i >= 0; i--) {
        const {hRef, title, dateTime} = notesContent[i];

        // Parse the ISO 8601 date string into a Date object
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`

        if (headlineYear !== year) {
            if (yearSection !== null) {
                pageView.push(yearSection)
            }

            headlineYear = year;
            listSection = h('ul', {className: 'blog-posts'});
            yearSection = h('section', {},
                h('h2', {}, `${year}`),
                listSection
            )
        }

        (listSection as VElement).appendChild(notesLink(hRef, title, formattedDate));
    }

    const sections = [...pageView, (yearSection as VNode)];

    // Return the VDOM for the notes page.
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Open source research notes',
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('div', {className: 'blog-posts'}, ...sections)
                )
            )
        ),
        pageFooter()
    );
}

// Handle the notes summaries on the home page.
export function notesSummaries(numEntries: number) {
    let view: VNode[] = [];

    // If we've been asked for more notes summaries than there are, then clip the list.
    const lastEntry = notesContent.length > numEntries ? notesContent.length - numEntries : 0;

    // Generate a list of HTML elements that match each notes post.
    for (let i = notesContent.length - 1; i >= lastEntry; i--) {
        const {hRef, title, dateTime, openingFunction} = notesContent[i];

        // Parse the ISO 8601 date string into a Date object
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`

        view.push(h('article', {},
            h('h2', {},
                h('a', {href: hRef, onclick: (e: MouseEvent) => navigateEvent(e, hRef)}, title)
            ),
            h('p', {className: 'meta'}, 'Published: ', formattedDate),
            ...openingFunction(),
            h('p', {},
                h('em', {},
                    h('a', {href: hRef, onclick: (e: MouseEvent) => navigateEvent(e, hRef)}, '[read more]')
                )
            )
        ));
    }

    return view;
}

// Collect all the routes to be used with the notes pages.
export function getNotesRoutes() {
    let notesRoutes: Map<string, routeDetails> = new Map();

    for (let i = 0; i < notesContent.length; i++) {
        let img = notesContent[i].imageURL;
        if (img === null) {
            img = '/about/dave.webp';
        }

        const imgURL = 'https://davehudson.io' + img;

        notesRoutes.set(notesContent[i].hRef, {
            title: notesContent[i].title,
            render: () => notesArticlePage(i),
            description: notesContent[i].description,
            imageURL: imgURL,
            pageType: 'article'
        });
    }

    return notesRoutes;
}
