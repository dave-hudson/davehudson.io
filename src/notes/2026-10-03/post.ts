import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_10_03(): VElement[] {
    return [
        h('p', {},
            'Humbug v56 adds some ease-of-use features but the big differences are in more advanced AI model ' +
            'support and in much better Menai integration.  Menai has some small changes to improve the handling ' +
            'of the standard library.'
        )
    ];
}

function notesArticle_2026_10_03(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v56'),
            h('p', {},
                'The big theme of v56 is introducing the latest state-of-the-art models from the big commercial AI ' +
                'providers.  Perhaps the most significant change is that Humbug now supports the "Responses" API for ' +
                'GPT models, unlocking all the reasoning capabilities that have been unavailable in the "Chat ' +
                'Completions" endpoint.'
            ),
            h('p', {},
                'The secondary theme is reinforcing the role of Menai.  Its full standard library is now available ' +
                'to the AIs in Humbug and it\'s now possible to analyze and transform binary files as well as text ' +
                'files.  This unlocks a lot more features in the near future.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'Menai syntax highlighting now recognises the ', h('code', {}, '::'), ' module member access ' +
                    'operator as a keyword form.'
                ),
                h('li', {},
                    'Menai syntax highlighting now distinguishes function calls from plain identifiers.  The head ' +
                    'of an ordinary form is highlighted as a function, while names in binding, parameter, field, ' +
                    'export, pattern, namespace, and quoted positions are left as identifiers.'
                ),
                h('li', {},
                    'Added the new ', h('code', {}, 'export'), ' keyword to the Menai syntax highlighter.'
                ),
                h('li', {},
                    'Resolving a tool approval request (approving, rejecting, or indicating uncertainty) now moves ' +
                    'focus to the conversation input box so the user can continue typing immediately.'
                ),
                h('li', {},
                    'Choosing "Open In Editor" from a preview\'s context menu now opens the editor scrolled to the ' +
                    'line that was clicked.  Source files map exactly; rendered markdown maps on a best-effort ' +
                    'basis using the source line of the block under the cursor.'
                ),
                h('li', {}, 'Added support for Claude Opus 5.5.'),
                h('li', {}, 'Added support for GPT 6 Astra, Sol, and Luna.'),
                h('li', {}, 'Added support for GPT 6.1 Sol.'),
                h('li', {}, 'Added support for Grok 4.7.'),
                h('li', {}, 'Removed GPT 5.4 Mini.'),
                h('li', {},
                    'The OpenAI backend now uses the Responses API instead of Chat Completions, enabling tool ' +
                    'calling and advanced reasoning on newer OpenAI models.'
                ),
                h('li', {},
                    'Added a feature to create folders and new conversations in the conversation sidebar view.'
                ),
                h('li', {},
                    'Added a feature to create folders and new files in the file sidebar view.'
                ),
                h('li', {},
                    'Ensure the delegate AI tool can only open a child conversation and cannot open any other ' +
                    'conversation.  This is a sandboxing capability to ensure AIs cannot inadvertently affect ' +
                    'histories of other conversations.'
                ),
                h('li', {},
                    'Updated the message editing for conversations.  Delete really deletes things, while edit ' +
                    'leaves messages below the one being edited faded out to show what will be lost.  Edits now ' +
                    'take place in the input box so all input features are unified and there\'s not a second-class ' +
                    'edit experience.'
                ),
                h('li', {},
                    'Updated the filesystem AI tool to handle binary files as well as text files, with Menai ' +
                    'transforms being able to be applied to both.  The tool can now write output to a new file.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Indenting a block of lines in the editor and Markdown text editors no longer shifts the ' +
                    'start of the selection when the selection begins at the start of a line.  A mid-line ' +
                    'selection still tracks the character it started on.'
                ),
                h('li', {},
                    'Restore incomplete conversation and shell inputs immediately on load to avoid the user ' +
                    'starting to type over any previous text.'
                ),
                h('li', {},
                    'Removed the stale ', h('code', {}, 'trace'), ' keyword from the Menai syntax highlighter - ' +
                    'it is no longer part of the language.'
                ),
                h('li', {},
                    'Fixed a problem where token usage for the usage tab was not updated correctly.'
                ),
                h('li', {},
                    'Fixed a problem where changing provider in the conversation settings did not correctly ' +
                    'update model reasoning.'
                ),
                h('li', {}, 'Hover effects in the sidebar view are now all consistent.'),
                h('li', {},
                    'Fixed the right-to-left rendering for the VCS list view when rendering in Arabic.'
                ),
                h('li', {},
                    'Sending a message to a delegated child AI will now auto-cancel a pending tool request (as ' +
                    'already happens with the parent).'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {},
                    'Migrated the Menai ', h('code', {}, 'transform'), ' and ',
                    h('code', {}, 'transform_file'), ' operations off the removed ',
                    h('code', {}, 'evaluate_raw_with_bindings'), ' API.  The editor buffer or file content is now ' +
                    'supplied as a single ', h('code', {}, 'inputs'), ' dict bound to the program, and transform ' +
                    'programs read it with ', h('code', {}, '(dict-get inputs "input-text")'), ' and ',
                    h('code', {}, '(dict-get inputs "input-lines")'), '.'
                ),
                h('li', {},
                    'Switched the default log level to INFO, but moved some log messages to INFO and WARNING.'
                ),
                h('li', {},
                    'Created a new ', h('code', {}, 'conversation_dag'), ' module that reasons about the DAG of ' +
                    'conversations in a mindspace.'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.7'),
            h('p', {},
                'Menai v0.7 is a very small update from Thursday\'s v0.6 release.  Its main focus is enabling ' +
                'standard library support for Humbug and adding a couple more standard library modules.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'The standard library is now packaged with Menai and available in a wheel install.  It lives ' +
                    'in ', h('code', {}, 'src/menai/stdlib/'), ' and can be read by an agent with ',
                    h('code', {}, 'Menai.stdlib_source'), '.'
                ),
                h('li', {},
                    'The module search path is now composed from explicit ',
                    h('code', {}, '--module-path'), ' directories, the ', h('code', {}, 'MENAI_PATH'),
                    ' environment variable, and the source file\'s directory.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'extract-entry'), ' and ', h('code', {}, 'extract-matches'),
                    ' operations to ', h('code', {}, 'zip-extract'), '.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'gzip-compress'), ' and ', h('code', {}, 'gzip-decompress'),
                    ' modules to the standard library.  ', h('code', {}, 'gzip-decompress'), ' parses and skips ' +
                    'the optional FEXTRA, FNAME, and FCOMMENT header fields, and verifies FHCRC when present.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'tar-create'), ', ', h('code', {}, 'tar-entries'), ', and ',
                    h('code', {}, 'tar-extract'), ' modules to the standard library.  The readers accept both ' +
                    'the POSIX ustar and GNU tar formats, including GNU long names and PAX extended headers.'
                )
            )
        )
    ];
}

export const notesPost_2026_10_03 = new NotesPost(
    '2026-10-03: Humbug v56 and Menai v0.7',
    '2026-10-03',
    '/notes/2026-10-03',
    '2026-10-03: Humbug v56 and Menai v0.7 - support for the latest state-of-the-art AI models, the OpenAI ' +
    'Responses API, Menai\'s full standard library, and binary file transforms, plus a small Menai v0.7 update.',
    null,
    null,
    notesOpening_2026_10_03,
    notesArticle_2026_10_03,
    null
);
