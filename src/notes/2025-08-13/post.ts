import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_13(): VElement[] {
    return [
        h('p', {},
            'Notes on Humbug development including UI bug fixes, Claude Sonnet 4 context window update, ' +
            'codebase cleanup, improved error handling, and extending the mindspace view.'
        )
    ];
}

function notesArticle_2025_08_13(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'UI bug fix'),
            h('p', {},
                'Fixed a problem where closing the application while one or more tabs were streaming conversations would result ' +
                'in the user being asked twice to approve terminating the conversation.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Claude Sonnet update'),
            h('p', {},
                'Updated the code to support Sonnet 4\'s updated context window'
            ),
            h('p', {},
                'See: ',
                h('a', {href: 'https://www.anthropic.com/news/1m-context'}, 'https://www.anthropic.com/news/1m-context')
            )
        ),
        h('section', {},
            h('h2', {}, 'Retiring the Metaphor descriptions'),
            h('p', {},
                'Retired the ',
                h('code', {}, '.m6r'),
                ' descriptions of Humbug from the codebase. They\'ve not been maintained for the couple of months ' +
                'and reflect what Humbug was going to be, rather than what it actually will be.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improved HTTP servers error handling'),
            h('p', {},
                'At various times I\'ve seen things like 500, 502, 504, and 529 errors. Added logic to make all of these, and a few ' +
                'others, retry in the same way as 429 and 503 did previously.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Extending the mindspace view'),
            h('p', {},
                'The current mindspace view on the left of the display is a simple file tree, but the concept of a mindspace was always ' +
                'intended to be much more than a collection of files.'
            ),
            h('h3', {}, 'Version 1 - failed!'),
            h('p', {},
                'I started trying to get Claude Sonnet 4 to build me a new conversations view that would sit above the files view.'
            ),
            h('p', {},
                'Turns out even with a good prompt Claude misunderstood my thinking. It overcomplicated parts of the design and couldn\'t ' +
                'actually get it working properly. We had lots of "I see it now" messages where it hadn\'t actually seen the problem at all.'
            ),
            h('p', {},
                'Recognizing this rabbit hole, I threw away that version after about 2 hours.'
            ),
            h('h3', {}, 'Version 2'),
            h('p', {},
                'Version 2 took a much more incremental approach. It simply changed the structure of the mindspace so there\'s an overarching ' +
                'MindspaceView class that contains the old MindspaceTreeView (this was in version 1 too). Wasn\'t completely perfect, but only ' +
                'required one minor manual change to get the base elements in place.'
            ),
            h('p', {},
                'Given a working framework, I was able to take a different approach that replicated existing working functionality and then ' +
                'pare back from that.'
            ),
            h('p', {},
                'There\'s still a fair amount of work to do on this tomorrow. Likely quite a bit of refactoring too.'
            )
        )
    ];
}

export const notesPost_2025_08_13 = new NotesPost(
    '2025-08-13: Humbug development',
    '2025-08-13',
    '/notes/2025-08-13',
    '2025-08-13: Notes on Humbug development including UI bug fixes, Claude Sonnet 4 context window update, codebase cleanup, improved error handling, and extending the mindspace view.',
    null,
    null,
    notesOpening_2025_08_13,
    notesArticle_2025_08_13,
    null
);
