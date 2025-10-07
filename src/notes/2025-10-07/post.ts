import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_10_07(): VElement[] {
    return [
        h('p', {},
            'Humbug v0.26 release with improved test coverage and code cleanup'
        )
    ];
}

function notesArticle_2025_10_07(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v0.26'),
            h('p', {},
                'Improved the test coverage and removed some dead code from the AIFPL implementation.'
            ),
            h('p', {},
                'With that I\'ve decided this will work for v0.26 of Humbug.'
            ),
            h('p', {},
                'Unfortunately, I\'m in the UAE without my Intel Mac, so can\'t build Intel binaries right now. There will only be Apple ' +
                'silicon binaries for a while now.'
            )
        )
    ];
}

export const notesPost_2025_10_07 = new NotesPost(
    '2025-10-07: Humbug v0.26',
    '2025-10-07',
    '/notes/2025-10-07',
    'Humbug v0.26 release with improved test coverage and code cleanup',
    null,
    null,
    notesOpening_2025_10_07,
    notesArticle_2025_10_07,
    null
);
