import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_03_09(): VElement[] {
    return [
        h('p', {},
            'It\'s 3 weeks since the last Humbug release so it\'s time for a new one!'
        )
    ];
}

function notesArticle_2026_03_09(): VElement[] {
    return [
        h('section', {},
            h('p', {},
                'v40 doesn\'t have a huge number of new agentic features, but does support a lot of newer AI models. ' +
                'There are also a few important usability bug fixes. By far the biggest changes are in what was ' +
                'previously called AIFPL, and is now called Menai.'
            ),
            h('p', {},
                'From a fairly rudimentary compiler and stack machine VM, Menai now has an advanced optimizing ' +
                'compiler and a new infinite register VM. In addition, the language has seen some huge changes in ' +
                'the standard library. In all but the most trivial test cases this has resulted in a 10x improvement ' +
                'in performance, all while largely holding compile times very small.'
            ),
            h('p', {},
                'The Menai story will continue to advance at pace over the next few weeks to enable it to take a ' +
                'much more interesting position in Humbug\'s technology stack.'
            )
        ),
        h('section', {},
            h('h2', {}, 'So, what\'s the vision for Menai?'),
            h('p', {},
                'The idea of Menai is to give AIs a safe execution environment in which they can safely implement ' +
                'custom functionality, but where the responsibility for any side effects will reside with ' +
                'human-approved tool uses.'
            ),
            h('p', {},
                'Another core idea is that complex functionality will be able to be composed from simpler functions. ' +
                'This was a primary motivator for building an optimizing compiler.'
            ),
            h('p', {},
                'Over the next few releases, the idea is to allow Menai-coded extensions to interact with the ' +
                'various UI components within Humbug as part of a pipeline. We\'ll see if this plays out as I hope!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v40'),
            h('p', {}, h('b', {}, 'New features:')),
            h('ul', {},
                h('li', {}, 'Added support for Claude Sonnet 4.6.'),
                h('li', {}, 'Renamed AIFPL to Menai (it\'s about time it had a real name).'),
                h('li', {},
                    'Revised the whole numeric type hierarchy in Menai so it is strict, and moving away from the ' +
                    'Lisp-like numeric tower.'
                ),
                h('li', {},
                    'Renamed all operations to follow a consistent naming pattern rather than retaining more ' +
                    'legacy Lisp/Scheme names.'
                ),
                h('li', {}, 'Added a lot of new functionality for lists and strings in Menai.'),
                h('li', {}, 'Added more operators for functions and symbols.'),
                h('li', {}, 'Added a new IR optimization pass manager for Menai.'),
                h('li', {}, 'Added a new SSA control flow graph layer for Menai.'),
                h('li', {}, 'Replaced the Menai stack machine VM with a register machine for speed.'),
                h('li', {}, 'Added support for Gemini Pro 3.1 preview and removed 3.0.'),
                h('li', {}, 'Removed support for Gemini 3.0 Pro Preview (no longer available).'),
                h('li', {}, 'Removed support for Gemma3:4b (obsolete).'),
                h('li', {}, 'Removed support for Ministral-3 (obsolete).'),
                h('li', {}, 'Added support or Qwen 3.5.'),
                h('li', {}, 'Removed support for Qwen 3 (obsolete).'),
                h('li', {}, 'Removed support for Phi4 (obsolete).'),
                h('li', {}, 'Added support for MiniMax M2.5 and removed MiniMax M2.'),
                h('li', {}, 'Added support for Kimi k2.5 and removed Kimi k2.'),
                h('li', {}, 'Added support for GPT-5.4.'),
                h('li', {}, 'If the user hits enter/return in a terminal window then scroll to the bottom.')
            ),
            h('p', {}, h('b', {}, 'Bug fixes:')),
            h('ul', {},
                h('li', {},
                    'Alt+ keypresses now generate the correct characters on a Mac (e.g. # on a British keyboard).'
                ),
                h('li', {},
                    'If the system AI tool wants to close a modified tab then it now requests authorization to ' +
                    'close the tab from within the conversation. This prevents problems with modal dialogs and ' +
                    'async code.'
                )
            ),
            h('p', {}, h('b', {}, 'Internal structure changes:')),
            h('ul', {},
                h('li', {},
                    'Reworked a lot of the internals of Menai to make the code easier to read and to allow AIs ' +
                    'to update it more reliably.'
                )
            )
        )
    ];
}

export const notesPost_2026_03_09 = new NotesPost(
    '2026-03-09: Humbug v40',
    '2026-03-09',
    '/notes/2026-03-09',
    'Humbug v40 release notes: new AI model support, AIFPL renamed to Menai, an advanced optimizing compiler, a new register-based VM, and a 10x performance improvement.',
    null,
    null,
    notesOpening_2026_03_09,
    notesArticle_2026_03_09,
    null
);
