import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_16(): VElement[] {
    return [
        h('p', {},
            'One of the things I\'ve wanted to do for many months is to support agentic editing, much as Humbug already supports agentic terminal operations.'
        )
    ];
}

function notesArticle_2025_11_16(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Agentic editing'),
            h('p', {},
                'A few hours of discussion with Claude and now the LLMs in Humbug can not just open and close editor tabs, but can now do:'
            ),
            h('ul', {},
                h('li', {}, 'Read metadata'),
                h('li', {}, 'Read the cursor position'),
                h('li', {}, 'Set the cursor position'),
                h('li', {}, 'Read selected text'),
                h('li', {}, 'Set the selected text range'),
                h('li', {}, 'Read editor contents'),
                h('li', {}, 'Modify editor contents'),
                h('li', {}, 'Search editor contents'),
                h('li', {}, 'Save editor contents (subject to user approval)')
            ),
            h('p', {},
                'This is very exciting!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.29'),
            h('p', {},
                'With the very important agentic editing changes, it\'s time to declare v0.29!'
            ),
            h('p', {},
                'Here are the changes:'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'The conversation input now has a settings button to make it easy to change the conversation settings (without having to look at the menu).'
                ),
                h('li', {},
                    'The mindspace header now has a settings button to make it easy to change the mindspace settings (without having to look at the menu).'
                ),
                h('li', {},
                    'The mindspace settings now have a configuration section relating to terminal scroll-back.  This can now be capped to improve performance and reduce memory usage.'
                ),
                h('li', {},
                    'Added GPT 5.1 support, and removed GPT O1 support.'
                ),
                h('li', {},
                    'Added more support to allow an AI to interact with editor tabs.  This includes reading content, finding things, moving the view, selecting text regions, understanding the editor metadata, modifying text, and saving a modified file.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Many visual elements are now better spaced and scale better with the zoom factor.'
                ),
                h('li', {},
                    'Resolve an intermittent problem that can be caused when changing the styling of a markdown document that has horizontal rules in it.'
                ),
                h('li', {},
                    'Buttons in headers now have "hover" and "pressed" effects.'
                )
            )
        )
    ];
}

export const notesPost_2025_11_16 = new NotesPost(
    '2025-11-16: Agentic editing and Humbug v0.29',
    '2025-11-16',
    '/notes/2025-11-16',
    'Agentic editing and Humbug v0.29',
    null,
    null,
    notesOpening_2025_11_16,
    notesArticle_2025_11_16,
    null
);