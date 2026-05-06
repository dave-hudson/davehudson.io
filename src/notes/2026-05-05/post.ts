import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_05_05(): VElement[] {
    return [
        h('p', {},
            'Humbug v46 is all about user experience improvements.  Quite a lot of new features, but also some unifying polish that ' +
            'leaves Linux and Windows looking and feeling pretty-much identical to MacOS.'
        )
    ];
}

function notesArticle_2026_05_05(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Version 46'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'If a network message fails and the user gets a system error message, there\'s now a retry button to allow retrying everything back to the last user message or tool call response.'),
                h('li', {}, 'Added a "breadcrumb" view to the mindspace tree views.  This let\'s you see which directories/folders are currently expanded for any of the trees.'),
                h('li', {}, 'Unified the previous "user" and "mindspace" settings into a single new dialog that can be accessed from the icon rail.  The new settings dialog is far easier to navigate and easier to discover.'),
                h('li', {}, 'Added Noto Sans, Noto Sans Arabic, and JetBrain Mono fonts to ensure a consistent user experience across all platforms (and also because they look nicer!)'),
                h('li', {}, 'Humbug now controls the minimize/maximize/close functionality on Windows and Linux to give more vertical real estate to the application content.'),
                h('li', {}, 'Added full-screen mode for Linux and Windows.  Remove the task bar and put the minimize/maximize/close widgets on the same row as the menu bar to give more screen real estate.'),
                h('li', {}, 'Added "whole word" searching in all find boxes.'),
                h('li', {}, 'Added a mindspace global search feature.'),
                h('li', {}, 'The terminal now reflows lines better when it resizes.'),
                h('li', {}, 'Added code to check for the latest version, and to check on startup.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'There was a small problem with the AI applying diffs at the end of the file when using the editor tab.'),
                h('li', {}, 'When switching reasoning models mid-conversation, only provide reasoning context to the new AI if it can definitely understand it (i.e. the models are compatible).'),
                h('li', {}, 'Tab hover effects were not working correctly in Linux.'),
                h('li', {}, 'Find in terminal tabs did not correctly search across a line wrap.'),
                h('li', {}, 'Arabic text no longer results in invalid spacing in the terminal emulator (the Arabic won\'t necessarily be super-readable).'),
                h('li', {}, 'When an AI opens a new tab, the focus will no longer automatically shift to the new tab.  It will stay with the current focused tab.'),
                h('li', {}, 'When rendering very long conversations the UI would stall for significant amounts of time.  Now these are handled incrementally so the UI remains responsive.'),
                h('li', {}, 'All find operations now cap at 500 search matches, but all also do live matching and don\'t wait for a user to press enter.')
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Added a test suite for the core terminal emulator.')
            )
        )
    ];
}

export const notesPost_2026_05_05 = new NotesPost(
    '2026-05-05: Humbug v46',
    '2026-05-05',
    '/notes/2026-05-05',
    '2026-05-05: Humbug v46 brings unified settings, new fonts, full-screen mode for Linux/Windows, global mindspace search, retry buttons for failed network messages, and many bug fixes.',
    null,
    null,
    notesOpening_2026_05_05,
    notesArticle_2026_05_05,
    null
);
