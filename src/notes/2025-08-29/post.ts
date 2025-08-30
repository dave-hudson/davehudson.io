import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_29(): VElement[] {
    return [
        h('p', {},
            'Today has been about clearing down annoying but fairly minor problems. Nothing particularly important, but lots of small ' +
            'irritants squashed!'
        )
    ];
}

function notesArticle_2025_08_29(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Annoying rendering bug'),
            h('p', {},
                'The tab label code has a custom painter that paints the top of the tab for the active tab in a column. Previously this used ' +
                'a fixed 2px height, but this looked wrong if Humbug was full screen.'
            ),
            h('p', {},
                'It turns out that in a Window, Qt steals 1px of border all the way round the app, so 1px of the 2px was being overwritten.'
            ),
            h('p', {},
                'Had to modify the painter to detect if the main window was full screen or not, and then render either 1px or 2px accordingly!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Tab label sizing problem'),
            h('p', {},
                'Had a weird sizing issue with tab labels if they were renamed. I\'m not happy I fixed the issue but can no longer reproduce ' +
                'this after simplifying the logic that updates tab labels. The code was doing some unnecessary lookups.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Delete unused conversation'),
            h('p', {},
                'Deleting an unused conversation tab could result in a double deletion attempt because the deletion code could trigger a ' +
                'UI update that would also trigger a deletion. Fixed!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Watching files'),
            h('p', {},
                'We already watch the content of wiki tabs being changed and reload, but we really should do this for editor tabs too. ' +
                'We also really want to detect files being deleted or moved and leavig tabs orphaned. Added logic to handle both these ' +
                'scenarios.'
            ),
            h('p', {},
                'The UI now strikes-out tab labels where the file is deleted or moved, and makes the text red. If the file gets replaced ' +
                'then the strikethrough is removed.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving tab move behaviour'),
            h('p', {},
                'When we move a tab that has the find control active, it would be really useful to keep the find control visible and not ' +
                'lose the search string. Now this happens.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Exception canary'),
            h('p', {},
                'Humbug takes great care to catch expected exceptions and handle them, but sometimes I\'ve missed one, or there\'s a bug, ' +
                'and the global exception handler caught it. Sometimes this was obvious and I\'d check the logs and fix it, but other ' +
                'times the exception has almost no visible consequences so I\'d never know to check the logs.'
            ),
            h('p', {},
                'I fixed this by adding an exception "canary". Now, when an unhandled exception is caught it signals the main window, and ' +
                'that in turn changes the background colour of the status bar to red. It\'s an obvious visual cue to tell me to look in the ' +
                'log files.'
            )
        )
    ];
}

export const notesPost_2025_08_29 = new NotesPost(
    '2025-08-29: Bug fix Friday',
    '2025-08-29',
    '/notes/2025-08-29',
    'Today has been about clearing down annoying but fairly minor problems. Nothing particularly important, but lots of small irritants squashed!',
    null,
    null,
    notesOpening_2025_08_29,
    notesArticle_2025_08_29,
    null
);
