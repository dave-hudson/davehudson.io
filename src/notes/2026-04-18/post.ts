import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_04_18(): VElement[] {
    return [
        h('p', {},
            'Fresh from the UI updates in v42, I\'ve been spending some time improving the usability of v43...'
        )
    ];
}

function notesArticle_2026_04_18(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'git integration and diffs'),
            h('p', {},
                'While I\'ve been building Humbug I\'ve still tended to use VSCode alongside it.  This has been a little frustrating as the ' +
                'whole idea was to not need an IDE, but there are a few things that VSCode did particularly well and I had assumed would take ' +
                'a lot of work in Humbug.  Probably the single biggest of these reasons was that VSCode has a nice integration of a diff ' +
                'viewer and git.'
            ),
            h('p', {},
                'It turns out Claude Sonnet 4.6 and about $70 of API tokens could solve that particular problem for me!'
            ),
            h('p', {},
                'v43 now has a git watcher that updates a new mindspace panel with files that have been modified and not committed.  It also ' +
                'adds a new "diff" tab type that shows the original and modified code side by side.  It also features some nice menu options ' +
                'with keyboard shortcuts to navigate to the next/previous hunk in the diff.'
            ),
            h('p', {},
                'For bonus credit, we also changed all the scrolling logic in Humbug to use smooth scrolling.  This is particularly pleasing ' +
                'in the editor tabs, as the LLMs often use the editor tabs for reading and modifying large files.  Now you get to watch the ' +
                'AI scrolling around the file as it updates it.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-18/diff-tool.webp', alt: 'The new diff tab in Humbug v43'}),
                h('figcaption', {}, 'The new diff tab in Humbug v43')
            )
        ),
        h('section', {},
            h('h2', {}, 'Claude impresses again'),
            h('p', {},
                'One interesting thing happened during the last few updates to the diff tab.  I didn\'t have an integration in the Humbug ' +
                'shell so I asked for one:'
            ),
            h('p', {},
                h('em', {},
                    '"we have recently added a diff viewer tab type (see src/humbug/tabs/diff). It is not yet integrated into the Humbug ' +
                    'shell (src/humbug/tabs/shell and src/humbug/main_window.py). Please review the code and propose an integration"'
                )
            ),
            h('p', {},
                'Left it running for about 30 seconds and aside from what I asked it to design, it spotted 2 bugs, and 2 missing integrations ' +
                'that I had been planning to ask it to do next.'
            ),
            h('p', {},
                'In the next 9 minutes, it one-shotted the fixes/enhancements across 8 files, including noticing that it needed to update the ' +
                'French and Arabic translations of the UI commands!'
            ),
            h('p', {},
                'Humbug is a very structured codebase and there are precedents to all of the items it identified, so that open ended request ' +
                'to review things undoubtedly triggered a lot of in-context pattern matching.'
            ),
            h('p', {},
                'Alternatively, maybe it really just liked the idea of making its own tool framework better 🤣'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-18/claude-analysis.webp', alt: 'Claude\'s analysis of the Humbug codebase'}),
                h('figcaption', {}, 'Claude\'s analysis of the Humbug codebase')
            )
        ),
        h('section', {},
            h('h2', {}, 'Attaching files to prompts'),
            h('p', {},
                'Tharik had proposed a design to attach files to prompts.  Claude and I discussed the implementation and found it did a few ' +
                'slightly awkward and inconsistent things, but the diffs served as a stimulus to allow Claude to come up with a new, simpler, ' +
                'implementation.'
            ),
            h('p', {},
                'Visually the two ended up very similar (which is what I\'d hoped for).'
            )
        ),
        h('section', {},
            h('h2', {}, 'Moving Menai to the C VM on Windows'),
            h('p', {},
                'Until now, only MacOS has supported the C VM for Menai.  As of today we can now build it on Windows, giving dramatically ' +
                'higher performance there.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Crossing 100k lines of Python'),
            h('p', {},
                'Today Humbug crossed the 100k lines of Python code metric.  On top of this it has just under 9k lines of C and 66k lines ' +
                'of Python test code.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Version 43'),
            h('p', {},
                'Given all the changes in the last week, this feels like a very worthy v43!'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Improved performance across the Menai VM.'),
                h('li', {}, 'The C implementation of the Menai VM now compiles and runs on Windows as well as on MacOS.'),
                h('li', {}, 'Added a new "diff" tab type that allows you to compare the current version of a file with the last version stored in git.'),
                h('li', {}, 'Added a new mindspace view for revision control, allowing you to see which files have been modified vs git ', h('code', {}, 'HEAD'), '.'),
                h('li', {}, 'Shift+Home/End now selects text in editor tabs, making things consistent with other shift+movement operations.'),
                h('li', {}, 'Switched find operations to use smooth scrolling in all tab types.'),
                h('li', {}, 'Added the ability to attach (and remove) files in a prompt.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Resolved a problem with the preferred width calculations for tabs.  This could make terminals use a horizontal scroll bar when they didn\'t need to.'),
                h('li', {}, 'Resolved a problem where tabs that were moved between columns did not result in files being unwatched.'),
                h('li', {}, 'Fixed broken find operations in conversation, Humbug shell, and mindspace log tabs.'),
                h('li', {}, 'Resolved a problem with smooth scrolling operations that could make things appear to "jump" right at the end of the scroll.'),
                h('li', {}, 'Fixed the selection colour in terminal tabs.'),
                h('li', {}, 'Enabled faster drag-scrolling in all tab types.'),
                h('li', {}, 'Resolved a problem that could cause file watching to trigger unnecessary reloads of tab content.')
            )
        )
    ];
}

export const notesPost_2026_04_18 = new NotesPost(
    '2026-04-18: The path to Humbug v43',
    '2026-04-18',
    '/notes/2026-04-18',
    'The path to Humbug v43: git integration with a new diff tab type, smooth scrolling throughout, Claude one-shotting fixes across 8 files, file attachments in prompts, Menai C VM on Windows, crossing 100k lines of Python, and a full v43 changelog.',
    '/notes/2026-04-18/diff-tool.webp',
    null,
    notesOpening_2026_04_18,
    notesArticle_2026_04_18,
    null
);
