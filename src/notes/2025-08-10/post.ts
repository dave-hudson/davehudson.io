import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_10(): VElement[] {
    return [
        h('p', {},
            'Fixed several bugs in Humbug including filesystem permissions, UI styling issues, and started outlining ' +
            'my vision for an AI operating system - the future direction for Humbug.'
        )
    ];
}

function notesArticle_2025_08_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Bug fixes'),
            h('p', {},
                'The filesystem tool was setting the file permissions incorrectly. It turns out the approach of using a temporary file ' +
                'results in ',
                h('code', {}, '0o600'),
                ' permissions. Fixed this to use ',
                h('code', {}, '0o600 & ~umask'),
                '.'
            ),
            h('p', {},
                'The tool approval button wasn\'t styled correctly. Resolved this.'
            ),
            h('p', {},
                'The context menu border and splitter styling wasn\'t differentiated from scrollbar handles - now it is.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A path to an AI operating system'),
            h('p', {},
                'Started writing about what I want from an AI operating system. This is the future of what I\'m planning for Humbug.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-08-10/ai-os-notes.jpeg', alt: 'AI OS Notes'}),
                h('figcaption', {}, 'Notes on the AI operating system vision')
            )
        )
    ];
}

export const notesPost_2025_08_10 = new NotesPost(
    '2025-08-10: Humbug bug fixes, and a path to an AI operating system',
    '2025-08-10',
    '/notes/2025-08-10',
    '2025-08-10: Fixed several bugs in Humbug including filesystem permissions and UI styling, plus started outlining the vision for an AI operating system.',
    null,
    null,
    notesOpening_2025_08_10,
    notesArticle_2025_08_10,
    null
);
