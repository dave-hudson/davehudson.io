import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_02(): VElement[] {
    return [
        h('p', {},
            'Some significant updates to both Humbug\'s usability, it\'s ability to run more autonomously, and Menai\'s ' +
            'functionality and performance.'
        )
    ];
}

function notesArticle_2026_11_02(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v58'),
            h('p', {}, 'New features:'),
            h('ul', {},
                h('li', {},
                    'The clock tool\'s ', h('code', {}, 'sleep'), ' and ', h('code', {}, 'alarm'),
                    ' operations now show a cancel control inside the executing tool-call message when the wait is ' +
                    'longer than five seconds.  Cancelling ends the wait immediately and the AI is told the user ' +
                    'interrupted it.'
                ),
                h('li', {},
                    'Quick Switcher now supports Go to Anything prefixes: ', h('code', {}, '@'),
                    ' searches conversations, ', h('code', {}, '>'), ' runs commands, ', h('code', {}, ':line'),
                    ' jumps in the current editor, and ', h('code', {}, 'file:line'),
                    ' opens a file at a line.  The command palette covers the application menus, lists only commands ' +
                    'that are valid right now, and shows each command\'s keyboard shortcut.'
                ),
                h('li', {},
                    'Tabs can now be moved without dragging them.  A tab\'s context menu can send it to the column on ' +
                    'either side, to a new column, or to a different place in its own column, and the View menu offers ' +
                    'the same for the current tab.  Ctrl+Alt+Left and Ctrl+Alt+Right move the current tab between ' +
                    'columns, creating an adjacent column at an edge when the source column retains another tab.  ' +
                    'Ctrl+Shift+PgUp and Ctrl+Shift+PgDown reorder the current tab within its column.'
                ),
                h('li', {},
                    'Support gzip compressing HTTP client requests to the Anthropic and xAI backends.'
                ),
                h('li', {},
                    'Added a Network Access settings page with allowlist and denylist for the HTTP tool.  Allowlisted ' +
                    'GET and HEAD requests no longer prompt, and every redirect target is checked before it is followed.'
                ),
                h('li', {},
                    'Opening a folder that is not a mindspace, in this window or a new one, now offers to initialize ' +
                    'it rather than reporting an error.  A mindspace\'s ', h('code', {}, '.humbug'),
                    ' directory now ignores itself in git, so its contents are never committed with the user\'s work.'
                ),
                h('li', {}, 'Added GPT 6.1 Terra.'),
                h('li', {},
                    'Added MiniMax M3.1 Flash, and corrected the reasoning effort levels offered for MiniMax M3.'
                ),
                h('li', {}, 'Removed Qwen 3.5 from Ollama cloud as it has been removed from the model catalogue.'),
                h('li', {}, 'The mindspace log now captures all events.'),
                h('li', {},
                    'The interaction log now records every prompt, AI reasoning and AI response, and every entry that ' +
                    'belongs to a conversation carries that conversation\'s identifier, so the audit trail can be read ' +
                    'conversation by conversation rather than as unconnected prose.'
                ),
                h('li', {}, 'Improved rendering performance for long-lived conversations.')
            ),
            h('p', {}, 'Bug fixes:'),
            h('ul', {},
                h('li', {},
                    'A mindspace inside another mindspace had its ', h('code', {}, '.humbug'),
                    ' directory exposed to the outer mindspace\'s AI tools, which only excluded their own root\'s ',
                    h('code', {}, '.humbug'), '.  Every ', h('code', {}, '.humbug'),
                    ' directory within a mindspace is now excluded.'
                ),
                h('li', {},
                    'Fixed an exception where opening an editor from a diff view\'s context menu triggered a line ' +
                    'size change.'
                ),
                h('li', {},
                    'The ', h('code', {}, '.humbug'), ' directory had mistakenly been exposed in the sidebar views.'
                ),
                h('li', {},
                    'Reordering tabs by dragging them within a column was not recorded in the session, so the ' +
                    'original order came back the next time the mindspace was opened.'
                ),
                h('li', {}, 'Support gzip-encoded SSE streams coming back from AI backends.'),
                h('li', {}, 'Fixed a problem where MiniMax M3 tool calls did not work correctly with the Ollama backend.'),
                h('li', {}, 'Fixed a probelm where reasoning efforts were not correctly used in the Ollama backend.'),
                h('li', {},
                    'Inserting a new file or folder in the breadcrumb view now places it in the correct directory.'
                ),
                h('li', {},
                    'The inline editor for a new or renamed file or folder in the Files panel started at the left ' +
                    'edge of the row and covered the item\'s icon.'
                ),
                h('li', {},
                    'Scrolling the Files panel jumped the first time it was used after creating a file or folder, ' +
                    'because the panel\'s scrollbar could fall out of step with the tree it drives.'
                )
            ),
            h('p', {}, 'Internal structure changes:'),
            h('ul', {},
                h('li', {}, 'Updated the Menai language dependency to v0.9.0.')
            )
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.9'),
            h('p', {}, 'New features:'),
            h('ul', {},
                h('li', {},
                    'Replaced ', h('code', {}, 'let'), ', ', h('code', {}, 'letrec'), ', and ',
                    h('code', {}, 'let*'), ' with a single new ', h('code', {}, 'let'),
                    ' form that handles letrec-like semantics.  This dramatically simplifies the langauge surface.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'pptx-decode'), ' and ', h('code', {}, 'pptx-encode'),
                    ' modules to the standard library.'
                ),
                h('li', {},
                    'Significantly improved performance of ', h('code', {}, 'deflate-decompress'), '.'
                ),
                h('li', {},
                    'Significantly improved performance of ', h('code', {}, 'deflate-compress'), '.'
                ),
                h('li', {}, 'Added a common subexpression elimination (CSE) optimization.'),
                h('li', {},
                    'Added ', h('code', {}, 'xlsx-decode'), ' and ', h('code', {}, 'xlsx-encode'),
                    ' modules to the standard library.'
                ),
                h('li', {},
                    'Renamed ', h('code', {}, 'menai-pretty-print'), ' to ', h('code', {}, 'menai-format'),
                    ' as it more accurately reflects its role as a canonical formatter.  ', h('code', {}, 'menai-format'),
                    ' now has a new canonical format.'
                ),
                h('li', {},
                    'Added capturing groups to the ', h('code', {}, 'regexp'), ' module.  ',
                    h('code', {}, 'search-groups'), ' and ', h('code', {}, 'search-all-groups'),
                    ' report each group\'s extent, and ', h('code', {}, 'replace'), ' expands ',
                    h('code', {}, '$1'), '..', h('code', {}, '$n'), ' in its replacement.'
                ),
                h('li', {},
                    'Unbalanced-parenthesis errors now list the forms still open at end of input, innermost first, ' +
                    'and name the ', h('code', {}, ')'), ' that closed a form before its body.'
                ),
                h('li', {},
                    'Removed the ', h('code', {}, 'Correct:'), '/', h('code', {}, 'Incorrect:'),
                    ' toy examples from syntax errors.  They restated the rule with generic code unrelated to the ' +
                    'source being compiled.  Examples that show the shape of a form the reader may not know are kept.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'html-decode'), ' and ', h('code', {}, 'html-encode'),
                    ' modules to the standard library.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'integer-gcd'), ' and ', h('code', {}, 'integer-lcm'),
                    ' operations with VM opcode backing.'
                ),
                h('li', {},
                    'Added more float opcode-backed operations to handle things like NaN, Inf, etc.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'stats'), ' module to the standard library.  It provides descriptive ' +
                    'statistics \u2014 mean, median, variance, quantiles, histograms, correlation, and linear fit ' +
                    '\u2014 over a column of floats, with ', h('code', {}, 'vector-'), ' and ', h('code', {}, 'list-'),
                    ' forms.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'vector-fill'), ' to the prelude, which builds a vector of n copies of a value.'
                ),
                h('li', {}, 'Improved constant folding for integer and float comparisons.'),
                h('li', {}, 'Implemented VCode-level constant folding.'),
                h('li', {}, 'Implemented VCode branch folding when the condition is a constant.'),
                h('li', {}, 'Improved interprocedural type analysis.'),
                h('li', {},
                    'Added an instruction scheduling pass.  This pushes definitions close to uses, allowing register ' +
                    'pressure to be reduced in common loop patterns.'
                ),
                h('li', {}, 'Improved inlining to enable inlining in a few more places that before.'),
                h('li', {}, 'Improved type guard hoisting.'),
                h('li', {}, 'Improved the LICM guard hoisting to cover more scenarios.'),
                h('li', {}, 'Added an option to reuse VMs in ', h('code', {}, 'menai-test'), '.'),
                h('li', {}, 'Reduced overall test times by 3x.')
            ),
            h('p', {}, 'Bug fixes:'),
            h('ul', {},
                h('li', {},
                    'Fixed a ', h('code', {}, 'regexp'), ' stack overflow.  A repetition recursed once per character, ' +
                    'so a run of a few hundred characters raised "maximum call depth exceeded".'
                ),
                h('li', {}, 'Reserved words are now protected correctly.'),
                h('li', {},
                    'Fixed variable capture during inlining.  A binding in the inlined body could capture a variable ' +
                    'that was free in the argument, silently producing a wrong result.'
                ),
                h('li', {}, 'Fixed namespace names not being shadowable by an inner ', h('code', {}, 'let'), ' binding.'),
                h('li', {}, 'Fixed a problem that prevented VMs from being reused.')
            )
        )
    ];
}

export const notesPost_2026_11_02 = new NotesPost(
    '2026-11-02: Humbug v58 and Menai v0.9',
    '2026-11-02',
    '/notes/2026-11-02',
    'Humbug v58 brings cancellable clock waits, a Go to Anything Quick Switcher, non-drag tab movement, HTTP ' +
    'allowlists, and a fuller audit trail, while Menai v0.9 adds a unified let form, capturing regexp groups, ' +
    'pptx/xlsx/html/stats modules, and a batch of compiler and performance improvements.',
    null,
    null,
    notesOpening_2026_11_02,
    notesArticle_2026_11_02,
    null
);
