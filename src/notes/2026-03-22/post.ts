import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_03_22(): VElement[] {
    return [
        h('p', {},
            'Time for a new update to Humbug.  Quite a few small UI fixes, some interesting bug fixes, and major changes to Menai.'
        )
    ];
}

function notesArticle_2026_03_22(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v41'),
            h('p', {}, h('strong', {}, 'New features:')),
            h('ul', {},
                h('li', {},
                    'Added a new Menai pipeline runner tool.'
                ),
                h('li', {},
                    'When the AI opens a tab for the first time it does so in a new column.  If the tab already exists but is in the ' +
                    'same column as the AI conversation then the column manager will now move it to a new column so it can be seen side-by-side.'
                ),
                h('li', {},
                    'Added new optimization passes to the Menai compiler that will handle ',
                    h('code', {}, 'or'),
                    ' and ',
                    h('code', {}, 'and'),
                    ' sequences more effectively.'
                ),
                h('li', {},
                    'Reworked the Menai VM to reduce overheads (improves performance by up to 2x).'
                ),
                h('li', {},
                    'Added option to produce colour output within the Menai disassembler.'
                ),
                h('li', {},
                    'Added cython Menai VM for use on MacOS (improves performance by an addition 2.3x to 2.5x).'
                ),
                h('li', {},
                    'Added ',
                    h('code', {}, 'set'),
                    ' operations to the Menai language.'
                ),
                h('li', {},
                    'Updated Claude 4.6 models to reflect the 1M token context windows now supported.'
                ),
                h('li', {},
                    'Added ',
                    h('code', {}, 'struct'),
                    ' operations to the Menai language.'
                ),
                h('li', {},
                    'The UI for the input box is now slightly different, putting the buttons at the bottom of the box for a better UX.'
                ),
                h('li', {},
                    'Added the ability to create a conversation from the mindspace conversations view.'
                ),
                h('li', {},
                    'Removed top-level conversation fork option and moved message-level forking to user messages to simplify the UX.'
                ),
                h('li', {},
                    'Menai ',
                    h('code', {}, 'dict'),
                    ' syntax is now consistent with ',
                    h('code', {}, 'list'),
                    ' and ',
                    h('code', {}, 'set'),
                    '.'
                )
            ),
            h('p', {}, h('strong', {}, 'Bug fixes:')),
            h('ul', {},
                h('li', {},
                    'Reinstated constant folding in the Menai compiler.'
                ),
                h('li', {},
                    'Tightened up the logic for applying diffs to files.  Now also includes a more useful diagnostic for the AI to use.'
                ),
                h('li', {},
                    'Tightened up rules on delegating to another AI.'
                ),
                h('li', {},
                    'Fixed some annotations in the Menai disassembler.'
                ),
                h('li', {},
                    'Fixed a problem where moving a delegated child AI conversation would cause the parent to lose track of the conversation.'
                ),
                h('li', {},
                    'Re-enable the input box for delegate conversations so you can provide feedback to a child AI while it works.'
                )
            )
        )
    ];
}

export const notesPost_2026_03_22 = new NotesPost(
    '2026-03-22: Humbug v41',
    '2026-03-22',
    '/notes/2026-03-22',
    'Humbug v41 brings a new Menai pipeline runner, major Menai VM performance improvements (up to 2x), a cython VM for MacOS (2.3x–2.5x), set and struct operations, UI improvements, and a range of bug fixes.',
    null,
    null,
    notesOpening_2026_03_22,
    notesArticle_2026_03_22,
    null
);
