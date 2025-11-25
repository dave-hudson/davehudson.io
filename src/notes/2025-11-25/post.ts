import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_25(): VElement[] {
    return [
        h('p', {},
            'The last couple of days, Claude has been busy adding functionality! There have been some small usability improvements, but another major agentic editing update. We\'ll call this v0.31.'
        )
    ];
}

function notesArticle_2025_11_25(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Usability updates'),
            h('p', {},
                'As humbug has evolved, the use of menus for things has become less and less interesting. Instead it has evolved to allow common operations to be triggered via the on-screen UI. One thing I often find myself doing is wanting to switch between mindspaces.'
            ),
            h('p', {},
                'To make this simpler, the mindspace label has now become a button. Clicking it lets you select a new mindspace.'
            ),
            h('p', {},
                'I also noticed that when we did agentic edits in an editor tab the cursor was left where it was, but it should really move to immediately after the last hunk applied. It now does this.'
            ),
            h('p', {},
                'Lastly, when saving a file the editor file watcher used to trigger a reload and thus move the cursor. Reloads are now suspended during a save operation.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Diff applying tools'),
            h('p', {},
                'The editor diff applying tool proved very powerful and is great for interactive work between the user and an AI, but this did mean opening the UI to do edits all the time. It occurred to me that being able to apply diffs in the filesystem tool was probably a good bet too.'
            ),
            h('p', {},
                'To make this happen I had Claude refactor out the common elements into ', h('code', {}, 'src/diff'), ' and also had it write tests in ', h('code', {}, 'tests/diff'), '. The new code then got applied to the editor tool and used for the filesystem tool.'
            ),
            h('p', {},
                'One interesting difference is that as the filesystem tool will automatically save the diff and this requires a user approval, we added a "dry run" flag to allow a candidate diff to be tried before needing to commit to writing the file. This isn\'t necessary for the editor version as the edits don\'t need user approval, only the save operations do.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.31'),
            h('p', {},
                'I want to get the updated agentic edit features out, so this is Humbug v0.31.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'When the AI applies changes to an editor tab, the cursor position is now moved to immediately after the last line that has been edited.'),
                h('li', {}, 'Replaced the mindspace label with a button that allows the user to open a new mindspace by clicking it.'),
                h('li', {}, 'Refactored diff application logic into a reusable ', h('code', {}, 'diff'), ' package with abstract base classes for parsing, fuzzy matching, and applying unified diffs to various document types.'),
                h('li', {}, 'Added ', h('code', {}, 'apply_diff'), ' operation to the filesystem AI tool, allowing the AI to apply unified diffs directly to files with fuzzy matching, overlap detection, dry-run validation, line ending preservation, and atomic file writes.'),
                h('li', {}, 'Editor diff applier now uses the shared diff package, reducing code duplication while maintaining Qt-specific functionality.'),
                h('li', {}, 'When the editor tab diff applier runs on another tab that is not currently visible then the tab label will turn purple in the same way as conversation and preview tabs.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Disabled file watching when saving files in the editor to avoid unecessary file reloads.')
            )
        )
    ];
}

export const notesPost_2025_11_25 = new NotesPost(
    '2025-11-25: Humbug v0.31',
    '2025-11-25',
    '/notes/2025-11-25',
    'Humbug v0.31',
    null,
    null,
    notesOpening_2025_11_25,
    notesArticle_2025_11_25,
    null
);
