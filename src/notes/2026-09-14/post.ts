import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_09_14(): VElement[] {
    return [
        h('p', {},
            'Today marks updates for Humbug and Menai.'
        )
    ];
}

function notesArticle_2026_09_14(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v55'),
            h('p', {}, h('strong', {}, 'New features:')),
            h('ul', {},
                h('li', {}, 'Added DeepSeek v4.1 Flash support.'),
                h('li', {}, 'Added Gemini 3.8 Flash, and removed Gemini 3.5 Flash.'),
                h('li', {}, 'Added Gemini 3.5 Flash lite, and removed Gemini 3.1 Flash lite.'),
                h('li', {}, 'Removed GPT-5.4 and GPT-5.5.'),
                h('li', {}, 'Added GLM 5.3 Flash (Z.ai backend).'),
                h('li', {}, 'Removed GLM 4.5 series models and GLM 5.1.'),
                h('li', {}, 'Removed MiniMax M2.7.'),
                h('li', {}, 'Removed GPT-OSS models from the Ollama cloud backend.'),
                h('li', {},
                    'Border animation now applies to all messages with pending or ongoing content, not just the last visible one.  This ' +
                    'ensures the correct message boxes are highlighted after scrolling and deferred content is revealed.'
                ),
                h('li', {}, 'Added pinning of conversations within the mindspace sidebar.'),
                h('li', {}, 'Added undo/redo for deletions of conversations from the sidebar.'),
                h('li', {},
                    'Added an interactive onboarding product tour that spotlights the key parts of Humbug for first-time users.  It can ' +
                    'be replayed at any time from Humbug → Take a Tour.'
                ),
                h('li', {}, 'Added a "product tour" feature to guide new users.'),
                h('li', {},
                    'Added ' +
                    h('code', {}, 'split_column') +
                    ', ' +
                    h('code', {}, 'merge_column') +
                    ', and ' +
                    h('code', {}, 'swap_column') +
                    ' operations to the system AI tool, so the AI can organise the workspace layout into columns just as the user can.'
                )
            ),
            h('p', {}, h('strong', {}, 'Bug fixes:')),
            h('ul', {},
                h('li', {},
                    'Implemented hard limits on results for the filesystem AI tool.  Any limit exceeded generates an error, not a truncated ' +
                    'response.  This prevents context window explosions.'
                ),
                h('li', {},
                    'Fixed conversation tab "bouncing" when scrolled away from the bottom during streaming.  Content is no longer rendered ' +
                    'while the user is scrolled up.  Deferred content is rendered in one pass when the user scrolls at all (preserving ' +
                    'their scroll position), or when they scroll back to the bottom (snapping to the bottom).'
                ),
                h('li', {}, 'Fixed a problem with text highlighting in terminal tabs that have a horizontal scrollbar.'),
                h('li', {}, 'Fixed a problem that could cause diff views to finish prematurely.'),
                h('li', {}, 'Fixed a problem where closing a tab might leave mouse-over hover effects not working afterwards.'),
                h('li', {},
                    'The editor ' +
                    h('code', {}, 'transform') +
                    ' operation no longer requests user authorization.  It modifies the in-memory ' +
                    'editor buffer, consistent with ' +
                    h('code', {}, 'apply_diff') +
                    '.  Use ' +
                    h('code', {}, 'save_file') +
                    ' to persist changes to disk.'
                ),
                h('li', {}, 'Fixed a problem when an AI opened a tab while in the carousel view.')
            ),
            h('p', {}, h('strong', {}, 'Internal structure changes:')),
            h('ul', {},
                h('li', {},
                    'The System AI tool has now been moved to being generic and not Qt-specific.  Updated the context registry to support ' +
                    'this change.'
                ),
                h('li', {},
                    'The editor context no longer depends on Qt.  Instead there is an abstract editor concept and the Qt editor reacts ' +
                    'to changes made in the context document.'
                ),
                h('li', {},
                    'The main window UI updates the context registry and the UI then reacts to that, rather than the UI driving the change.'
                ),
                h('li', {},
                    'Workspace state is now split into three layers with distinct owners (see ADR-0008): layout (open contexts, column, ' +
                    'position, focus, ephemerality) belongs to the context registry, content (file paths, terminal commands, conversation ' +
                    'transcripts) belongs to the frontend-agnostic context models, and view state (cursor, scroll, find widget) belongs to ' +
                    'the frontend.  Session save and restore are now registry operations rather than being driven by the tab manager.'
                ),
                h('li', {},
                    'Tab order within a column is now part of the registry\'s layout state, so columns and ordering are preserved exactly ' +
                    'across a session.'
                ),
                h('li', {},
                    'Moving a tab between columns now carries live state (unsaved buffers, terminal processes) through an explicit ' +
                    'frontend migration mechanism rather than through the session persistence format.'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.5'),
            h('p', {}, h('strong', {}, 'New features:')),
            h('ul', {},
                h('li', {},
                    'Added a ' +
                    h('code', {}, 'vector') +
                    ' type to Menai.'
                ),
                h('li', {}, 'Added a loop-invariant-code-motion optimizer.'),
                h('li', {}, 'Added a constant coalescing optimizer.'),
                h('li', {}, 'Added a jump threading optimizer.'),
                h('li', {}, 'Implemented performance improvements for some prelude functions.'),
                h('li', {},
                    'The ' +
                    h('code', {}, 'error') +
                    ' operation can now take any arbitrary Menai value, allowing for structured error returns.'
                ),
                h('li', {}, 'Runtime errors now generate a backtrace to make it easier to debug them.')
            ),
            h('p', {}, h('strong', {}, 'Bug fixes:')),
            h('ul', {},
                h('li', {},
                    'Unified ' +
                    h('code', {}, 'bytes-slice') +
                    ' so it matches the semantics of the other slice operations.'
                )
            ),
            h('p', {}, h('strong', {}, 'Internal structure changes:')),
            h('ul', {},
                h('li', {},
                    'Reimplemented the bytecode validator in C rather than Python.  This always runs meaning we can remove runtime ' +
                    'checks that are now covered by the validator.'
                )
            )
        )
    ];
}

export const notesPost_2026_09_14 = new NotesPost(
    '2026-09-14: Humbug v55 and Menai v0.5',
    '2026-09-14',
    '/notes/2026-09-14',
    '2026-09-14: Humbug v55 and Menai v0.5 - model updates, workspace layout operations, onboarding product tour, workspace state layering, and a new vector type, optimizers, and structured errors in Menai.',
    null,
    null,
    notesOpening_2026_09_14,
    notesArticle_2026_09_14,
    null
);
