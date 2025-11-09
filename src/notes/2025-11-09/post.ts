import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_09(): VElement[] {
    return [
        h('p', {},
            'Typical!  Having just made release v0.27, this morning I tripped over an exception in the UI code.  It wasn\'t a major problem but would keep tripping the visual exception canary.'
        )
    ];
}

function notesArticle_2025_11_09(): VElement[] {
    return [
        h('p', {},
            'This took me down a path of looking at the UI more closely, however.  With that several hours went past and I ended up fixing a lot of minor UI and style issues.'
        ),
        h('p', {},
            'Humbug\'s core visuals had not changed much for months, but just recently I\'ve been feeling something wasn\'t quite right. What I realized, today, was that some of the light mode contrasts would look better in dark mode, and vice versa.'
        ),
        h('p', {},
            'I also realized I had no borders to give cleaner separations around content elements, so added some very subtle borders too.'
        ),
        h('p', {},
            'Fixing these exposed a couple of subtle rendering bugs too, and I noticed I was using the same colour elements for too many unrelated purposes.'
        ),
        h('p', {},
            'Anyway, with these much nicer visuals and bug fixes I\'ve declared v0.28.  Weirdly, I feel happier with this trivial update than the more substantial one from yesterday.'
        ),
        h('section', {},
            h('h2', {}, 'v0.28 release notes'),
            h('p', {},
                'New features:'
            ),
            h('ul', {},
                h('li', {}, 'Improved some visual styling elements to improve readability.')
            ),
            h('p', {},
                'Bug fixes:'
            ),
            h('ul', {},
                h('li', {}, 'Resolved a problem with restyling after a tool approval widget has been removed.'),
                h('li', {}, 'Resolved a problem with the mindspace view expand/shrink logic.')
            )
        )
    ];
}

export const notesPost_2025_11_09 = new NotesPost(
    '2025-11-09: Humbug v0.28',
    '2025-11-09',
    '/notes/2025-11-09',
    'Humbug v0.28',
    null,
    null,
    notesOpening_2025_11_09,
    notesArticle_2025_11_09,
    null
);
