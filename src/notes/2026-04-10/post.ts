import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_04_10(): VElement[] {
    return [
        h('p', {},
            'I\'ve not done a huge amount with the Humbug UI for a while, but some suggestions and contributions from Tharik Ammanullah ' +
            'have got me going back to this!'
        )
    ];
}

function notesArticle_2026_04_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Enable fixed-width terminals'),
            h('p', {},
                'One interesting set of changes is to improve terminals.  These now support having a fixed width (configurable) rather than ' +
                'always auto-resizing.  As this added horizontal scrolling I\'ve now implemented scroll-wheel scrolling and also selection ' +
                'scrolling in the terminal too.'
            ),
            h('p', {},
                'All tabs (except editors) also now centre their content.  This makes them more readable, especially on wide screen displays.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Rethinking tabs'),
            h('p', {},
                'Humbug inherited some IDE-centric layout.  That was fine, but never really captured what I wanted.'
            ),
            h('p', {},
                'The new update has a concept of tabs having a "natural" width.  Tab columns cluster together in the middle, keeping your ' +
                'visual focus in one place for most activities.  Lots of things now become natural drop targets (for drag and drop) and ' +
                'suddenly many column operations become much easier.'
            ),
            h('p', {},
                'For example you can now drop a file into a spacer either side of the current columns!'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-10/drag-start.webp', alt: 'Starting a drag operation in Humbug'}),
                h('figcaption', {}, 'Starting a drag operation in Humbug')
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-10/drag-end.webp', alt: 'Completing a drag operation in Humbug'}),
                h('figcaption', {}, 'Completing a drag operation in Humbug')
            ),
            h('p', {},
                'Thanks to Tharik, you can also now scroll the tab bar in a tab column using the mouse wheel.  I\'ve wanted this for months!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Colour scheme improvements'),
            h('p', {},
                'I always wanted Humbug to have an "automatic" option for the colour scheme.  Last year\'s AI models didn\'t know Qt had added ' +
                'this in v6.5.  Sonnet 4.6 does know it now, so now we have automatic as the new default unless you override it in the user ' +
                'settings or menu.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Gemma 4'),
            h('p', {},
                'Google recently released Gemma 4 as an open weights model, available via ',
                h('a', {href: 'https://ollama.com'}, 'ollama.com'),
                '.  Humbug now supports it too.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v42'),
            h('p', {},
                'Humbug v42 is now out.  Here\'s the change log.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added GLM 5.1 model support'),
                h('li', {}, 'Added Gemma 4 model support'),
                h('li', {}, 'Removed Claude Sonnet 4.5 model support (we have 4.6).'),
                h('li', {},
                    'Removed the Metaphor compiler and Metaphor conversations options.  Spec-driven development activities can now be more ' +
                    'effectively implemented by simply asking an AI to read one or more spec files from the mindspace filesystem.'
                ),
                h('li', {},
                    'Removed the ability to open the system shell and mindspace log tabs from the system tool.  These are tools specifically ' +
                    'for a human (developer) to use.'
                ),
                h('li', {}, 'Removed the mindspace log AI tool.  It wasn\'t ever used, and more often than not confused AI models.'),
                h('li', {}, 'Added a requirement for AI delegation to get user approval.'),
                h('li', {},
                    'Colour themes can now be "Automatic" as well as "Light" and "Dark".  Humbug will follow the system preference in automatic mode.'
                ),
                h('li', {}, 'Improved visuals for the welcome widget (colours, rounded corners, and vertical spacing).'),
                h('li', {}, 'Added visual feedback and improved colours for drop targets.'),
                h('li', {}, 'Improved column layouts, including preferred tab width and centering columns in the manager view.'),
                h('li', {}, 'Most tab types now use a more narrow default view to make them easier to read.'),
                h('li', {}, 'Gave all tabs a "nice" default size and keep content in the middle of the application to improve usability.'),
                h('li', {}, 'Added an edit button to allow you to edit previous user messages.'),
                h('li', {},
                    'The submit shortcut is now Cmd+Enter or Ctrl+Enter rather than Cmd+J or Ctrl+J.  This is more natural.'
                ),
                h('li', {}, 'The tab label bar can now be scrolled using a mouse wheel.'),
                h('li', {},
                    'Terminal tabs can now have a fixed width defined in the mindspace settings.  If the terminal is too wide for the tab ' +
                    'then it will gain a horizontal scrollbar.  If it is too narrow then it will be centred.'
                ),
                h('li', {}, 'Added smooth scrolling during selection operations within terminal tabs.'),
                h('li', {}, 'Added Menai native C VM implementation and removed the cython version.'),
                h('li', {}, 'Added a new Menai benchmark performance test suite.  Removed the old JSON parser test.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Improved filesystem and editor tool descriptions to help avoid problems related to escaping.'),
                h('li', {}, 'Fix problems with the Menai tool help.'),
                h('li', {}, 'Fixed a problem where delegated conversations did not show the initial prompt.'),
                h('li', {}, 'Fixed problem with child model handling during delegation.'),
                h('li', {}, 'The default model for delegation is now the parent\'s model.')
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Refactored all scrollbar styling into a common location.')
            )
        )
    ];
}

export const notesPost_2026_04_10 = new NotesPost(
    '2026-04-10: Improvements for Humbug v42',
    '2026-04-10',
    '/notes/2026-04-10',
    'Improvements for Humbug v42, including fixed-width terminals with scroll-wheel and selection scrolling, rethought tab layouts with natural widths and improved drag-and-drop, automatic colour scheme support, Gemma 4 model support, and a full v42 changelog.',
    '/notes/2026-04-10/drag-start.webp',
    null,
    notesOpening_2026_04_10,
    notesArticle_2026_04_10,
    null
);
