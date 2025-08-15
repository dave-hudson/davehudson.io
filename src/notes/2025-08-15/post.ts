import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_15(): VElement[] {
    return [
        h('p', {},
            'Notes on Humbug development including using the AI backend for stand-alone applications ' +
            'and various UI improvements and bug fixes.'
        )
    ];
}

function notesArticle_2025_08_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Using Humbug\'s AI backend for stand-alone applications'),
            h('p', {},
                'A month or two back, I refactored the AI backend and AI tools support and put them into separate top-level packages ' +
                'within the codebase. The idea was to make it easy to reuse these in other projects.'
            ),
            h('p', {},
                'Today I started building just such a project (but it\'s not open source so I won\'t be writing about what it does here). ' +
                'Claude Sonnet 4 was able to read the code and build exactly what I needed with very little effort. That code worked very ' +
                'well! I suspect we need to start thinking about writing API docs for LLMs rather than people. People can always have the ' +
                'LLM explain it to them if they want to know.'
            ),
            h('p', {},
                'I did realize the conversation transcript code should have been broken out at the same time I did that original ' +
                'refactor, so fixed that by doing it now.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug UI improvements'),
            h('p', {},
                'Did lots of small UI improvements and bug fixes. Nothing particularly major, although got a nice 140 line net code ' +
                'reduction by eliminating a custom dialog with a MessageBox use. MessageBox now handles text sizing in a way that made ' +
                'the custom dialog unecessary.'
            )
        )
    ];
}

export const notesPost_2025_08_15 = new NotesPost(
    '2025-08-15: Humbug updates',
    '2025-08-15',
    '/notes/2025-08-15',
    '2025-08-15: Notes on Humbug development including using the AI backend for stand-alone applications and various UI improvements and bug fixes.',
    null,
    null,
    notesOpening_2025_08_15,
    notesArticle_2025_08_15,
    null
);
