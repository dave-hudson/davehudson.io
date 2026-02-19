import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_02_15(): VElement[] {
    return [
        h('p', {},
            "It's almost a month since the last Humbug release so I figured it was time to release v39. " +
            "Most of that time has gone on things that won't be particularly visible to most users, but I wanted " +
            "to sneak a few last-minute things into this release."
        )
    ];
}

function notesArticle_2026_02_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Giving tools a help system'),
            h('p', {},
                "I've been getting concerned that Humbug's tool system was putting a lot of hidden context into conversations, " +
                "and that that was probably also leading the LLMs to get confused about what they should do.  Tools like AIFPL " +
                "have huge descriptions and unless the LLM wants to use that tool it seems silly to have to have them carry that cost."
            ),
            h('p', {},
                'To solve this I added a new "help" tool.  This can list the tools in the system and then get detailed help for the tool ' +
                'and its operations.  Essentially this is giving Humbug man pages for the tools.'
            ),
            h('p', {},
                "The nice thing is once a tool description has been loaded then it won't need to reload it, so we're reducing load all round."
            )
        ),
        h('section', {},
            h('h2', {}, 'Fixing some conversation quirks'),
            h('p', {},
                'When the user moved a conversation tab to a new column, any tool approvals should also move too!  Now they do.'
            ),
            h('p', {},
                'When the user presses "Esc" to cancel a conversation they should really be asked to confirm it\'s ok to do so!  Now it does.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v39'),
            h('p', {},
                h('strong', {},'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Introduced a new AIFPL compiler and VM design that is much faster than the interpreter.  Removed the interpreter.'),
                h('li', {}, 'Changed the syntax of AIFPL `alist` to be less surprising.'),
                h('li', {}, 'Added `letrec` to AIFPL to avoid ambiguity in recursive bindings.'),
                h('li', {}, 'Introduced `integer`, `float`, and `complex` types into AIFPL and removed `number`, allowing optimizations.'),
                h('li', {}, 'Added support for complex number literals.'),
                h('li', {}, 'Significantly improved the error reporting for AIFPL tokenization and parsing errors.'),
                h('li', {}, 'Added an `import` special form to AIFPL to support composing software into modules.'),
                h('li', {}, 'Added a pretty printer for AIFPL.'),
                h('li', {}, 'Added GLM-5 model, but retired GLM-4.6 models.'),
                h('li', {}, 'Added a new "help" tool that can provide more detailed help on other tools to reduce token usage.'),
                h('li', {}, 'When the user hits "Esc" to cancel a conversation, pop up a message box to confirm.'),
                h('li', {}, 'Added support for "AGENTS.md" files to guide an LLM on discovery within the current mindspace.'),
                h('li', {}, 'Added support for Claude Opus 4.6.  Renamed the aliases for Claude Sonnet 4.5 and Claude Haiku 4.5 to the versions that do not include dates.'),
                h('li', {}, 'Removed Claude Sonnet 4, Claude Opus 4 and Claude Opus 4.1'),
                h('li', {}, 'Removed GPT 4o, GPT 4.1 nano, GPT 4.1, GPT 5.1, GPT o3, GPT o4.')
            ),
            h('p', {},
                h('strong', {},'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'If we wrote more than 1k as "keystrokes" to a zsh then this could corrupt the output buffer.'),
                h('li', {}, 'Resolved a problem with nested Markdown code blocks incorrectly rendering.'),
                h('li', {}, 'Resolved a problem where "dim" attributes were not resetting correctly in the terminal.'),
                h('li', {}, 'Added a few missing escape sequences for the terminal.'),
                h('li', {}, 'Ensure timeouts of running AIFPL tool usage will not block/crash Humbug.'),
                h('li', {}, 'If we move a tab with a tool approval open, the system will now preserve that tool approval in the new tab.')
            ),
            h('p', {},
                h('strong', {},'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Removed built-in higher-order functions from AIFPL and replaced them with standard library implementations.')
            )
        )
    ];
}

export const notesPost_2026_02_15 = new NotesPost(
    '2026-02-15: Humbug v39',
    '2026-02-15',
    '/notes/2026-02-15',
    'Humbug v39 release notes',
    null,
    null,
    notesOpening_2026_02_15,
    notesArticle_2026_02_15,
    null
);