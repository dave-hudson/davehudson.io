import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_10_10(): VElement[] {
    return [
        h('p', {},
            'Another week, another pair of software releases...'
        )
    ];
}

function notesArticle_2026_10_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v57'),
            h('p', {},
                h('strong', {}, 'New features'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'Added a Quick Switcher (Cmd+P / Ctrl+P) that fuzzy-filters open tabs, conversations, and files ' +
                    'across the mindspace and jumps straight to the selected one.'
                ),
                h('li', {},
                    'Markdown tables now render with proportional spacing of columns to make things more readable.  ' +
                    'If a markdown table is detected to be written with the first character in Arabic then the table ' +
                    'is rendered from the right and not the left.'
                ),
                h('li', {},
                    'Added the ', h('code', {}, 'enum'), ' special form to the Menai syntax highlighter.'
                ),
                h('li', {},
                    'Added a Pascal syntax highlighter.'
                ),
                h('li', {},
                    'Added Claude Haiku 5.5.'
                ),
                h('li', {},
                    'Removed Claude Haiku 4.5.'
                ),
                h('li', {},
                    'Added the ability to launch an app window per-mindspace.'
                ),
                h('li', {},
                    'A mindspace can now only be open in one Humbug instance at a time.  Opening the same mindspace ' +
                    'twice previously let each instance overwrite the other\'s session, usage, and interaction log ' +
                    'without warning.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'Made a minor adjustment to tab bar labels to make them more distinct.'
                ),
                h('li', {},
                    'AI tools that access the filesystem are now correctly blocked from accessing the mindspace ',
                    h('code', {}, '.humbug'), ' directory.  All file accesses are now standardized through a single ' +
                    'mechanism.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'The tests directory structure now mirrors the main directory hierarchy.  Tests for code in ',
                    h('code', {}, 'src'), ' now appear in ', h('code', {}, 'test/src'), '.'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.8'),
            h('p', {},
                h('strong', {}, 'New features'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'Added a new "trivial phi elimination" operation inside the CFG collapse phi pass.'
                ),
                h('li', {},
                    'Added a register dump capability to capture state when an error is raised inside the VM.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'base64-decode'), ' module to the standard library.  It decodes Base64 ' +
                    'text (RFC 4648) to bytes.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'base64-encode'), ' module to the standard library.  It encodes a bytes ' +
                    'value as Base64 text, selecting the standard or URL-safe alphabet and padded or unpadded output.  ' +
                    'It is the inverse of ', h('code', {}, 'base64-decode'), '.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'csv-decode'), ' module to the standard library.  It decodes RFC 4180 ' +
                    'CSV text (as a string) to a vector of rows, each row a vector of field strings, so both rows and ' +
                    'fields are reachable in O(1) by position.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'csv-encode'), ' module to the standard library.  It encodes a vector of ' +
                    'rows (each a vector of field strings) as RFC 4180 CSV text.  It is the inverse of ',
                    h('code', {}, 'csv-decode'), '.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'regexp'), ' module to the standard library.  It compiles a ' +
                    'regular-expression pattern and searches, splits, or replaces within strings.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'xml-decode'), ' and ', h('code', {}, 'xml-encode'), ' modules to the ' +
                    'standard library.  They parse XML text into a value tree and serialise it back.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'docx-decode'), ' and ', h('code', {}, 'docx-encode'), ' modules to the ' +
                    'standard library.  They decode a DOCX package into a value tree that faithfully captures its ' +
                    'OOXML parts and encode it back.'
                ),
                h('li', {},
                    'Added an ', h('code', {}, 'enum'), ' type: a nominal, closed set of named variants, compared for ' +
                    'identity only.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'Updated the LICM pass to handle the nested loops introduced by the letrec inliner optimization.'
                ),
                h('li', {},
                    'Fixed a hash reinitialization bug in the VM.'
                ),
                h('li', {},
                    'Parenthesis errors now report the line and column to change rather than the line where the ' +
                    'offending form opened.  A missing ', h('code', {}, ')'), ' is reported at its insertion point, ' +
                    'and an extra ', h('code', {}, ')'), ' at the ', h('code', {}, ')'), ' that cannot be matched, ' +
                    'naming any earlier ', h('code', {}, ')'), ' that closed a form before its body as the likely ' +
                    'culprit.  Errors also include a per-line parenthesis depth table.'
                ),
                h('li', {},
                    'A parse error no longer leaves the AST builder\'s unclosed-form stack populated, which previously ' +
                    'inflated the depth reported for the next parse.'
                ),
                h('li', {},
                    'Two top-level expressions are no longer misreported as a premature closing parenthesis.'
                ),
                h('li', {},
                    'A structural error caused by a ', h('code', {}, ')'), ' that closed an enclosing form before its ' +
                    'body is now reported at that ', h('code', {}, ')'), '.'
                ),
                h('li', {},
                    'Fixed a miscompile in the CFG branch constant propagation pass.  It dropped a phi whose result ' +
                    'fed a branch directly and was also used downstream, leaving the downstream use undefined.'
                ),
                h('li', {},
                    'Fixed a miscompile in the interprocedural type analysis.  A call whose callee could not be ' +
                    'resolved contributed no return-type information instead of an unknown type, so a function ' +
                    'returning such a call was reported as returning only the types of its other return paths.'
                ),
                h('li', {},
                    'Fixed a miscompile in the slot allocator.  A closure result coalesced into a slot it captured ' +
                    'overwrote the captured value before it was patched, so the closure captured itself.'
                ),
                h('li', {},
                    'Fixed a scope bug when desugaring a ', h('code', {}, 'let*'), ' that binds an imported module.  A ' +
                    'binding value that referenced a module member failed to compile because the module\'s bindings ' +
                    'were not in scope for it.'
                ),
                h('li', {},
                    'Fixed an IR dead binding elimination quirk.  An unreachable group of mutually-recursive bindings ' +
                    'can now be eliminated.'
                ),
                h('li', {},
                    'Fixed a VCode issue affecting tail recursive variadic functions.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes'), ':'
            ),
            h('ul', {},
                h('li', {},
                    'Any opcode that has a register source operand has now been updated to take an optional constant ' +
                    'operand too.  A new peephole pass merges constant loads into opcodes, giving benchmark gains ' +
                    'typically around 4-5%.'
                ),
                h('li', {},
                    'Test ', h('code', {}, 'tests'), ' directory now accurately reflects the source tree.'
                ),
                h('li', {},
                    'Removed the ', h('code', {}, 'menai-check'), ' tool.  The compiler reports parenthesis errors ' +
                    'more accurately, and editors highlight matching parentheses visually, so the tool no longer ' +
                    'earned its place.'
                )
            )
        )
    ];
}

export const notesPost_2026_10_10 = new NotesPost(
    '2026-10-10: Humbug v57 and Menai v0.8',
    '2026-10-10',
    '/notes/2026-10-10',
    '2026-10-10: Humbug v57 and Menai v0.8 releases, with a Quick Switcher, new standard library modules, ' +
    'an enum type, and a batch of compiler and VM fixes.',
    null,
    null,
    notesOpening_2026_10_10,
    notesArticle_2026_10_10,
    null
);
