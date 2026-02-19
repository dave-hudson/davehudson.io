import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_01_17(): VElement[] {
    return [
        h('p', {},
            'After a couple of weeks of fairly significant development I figured it was time to release v38.'
        )
    ];
}

function notesArticle_2026_01_17(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Conversations in the git repo'),
            h('p', {},
                'Since I started building Humbug, I\'ve been talking with people about the value of capturing design discussions alongside ' +
                'source code.  Today I finally decided to publish a lot of the discussions I\'ve had when building Humbug.  They\'re in the git ' +
                'repo.'
            ),
            h('p', {},
                'The idea is to showcase some of what Humbug was designed to do and the way I\'ve used AI to help build things.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v38'),
            h('p', {},
                h('strong', {},'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added an XML syntax highlighter.'),
                h('li', {}, 'Added a vLLM backend and gemma3:27b model to go with it.'),
                h('li', {},
                    'Updated the terminal AI tool ', h('code', {}, 'get_status'), ' operation to return the operating system and shell type.  Updated the tool ' +
                    'description to avoid leading to any assumption of running on a Unix-like system.'
                ),
                h('li', {},
                    'Added a system prompt to provide initial guidance to all LLMs when starting conversations.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'get_system_info'), ' operation to the system AI tool.  This provides system and mindspace details.'
                ),
                h('li', {},
                    'Added association lists (alists) to AIFPL to provide very efficient key/value lookup operations.'
                ),
                h('li', {}, 'Improved AIFPL performance by about 40%'),
                h('li', {}, 'Added blockquote support to the dmarkdown Markdown parser.'),
                h('li', {},
                    'Added the ability for the code blocks parsed by the Markdown parser to pass this information directly to the syntax ' +
                    'highlighter to avoid parsing twice.'
                ),
                h('li', {}, 'Added support for nested code blocks inside Markdown list elements.'),
                h('li', {}, 'Added a preview tab context menu.'),
                h('li', {},
                    'Added new user settings to provide a global enable/disable for filesystem read access outside the current mindspace.  ' +
                    'When enabled, also added allowlist and denylist configurations to control what can be accessed.'
                ),
                h('li', {},
                    'If you load Humbug and have no AI API keys set up then the welcome page will let you know and guide you to the user ' +
                    '"Preferences" dialog.'
                )
            ),
            h('p', {},
                h('strong', {},'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Fixed some lexing problems in the HTML syntax highlighter.'),
                h('li', {},
                    'Resolved a problem where Windows anti-malware scanners could cause conversation transcript files to not write correctly.'
                ),
                h('li', {},
                    'Correctly handle character and string literal formats in the C syntax highlighter.'
                ),
                h('li', {},
                    'Handle missing "override" and "final" keywords, and additional string formats for the C++ syntax highlighter.'
                ),
                h('li', {},
                    'Resolved a problem with deleting message sections when a queued user message was submitted.'
                ),
                h('li', {},
                    'Fixed some lexing problems in the JavaScript and TypeScript syntax highlighters.'
                ),
                h('li', {},
                    'Fixed AIFPL so \'+\' can be used for positive numbers.'
                ),
                h('li', {},
                    'Fixed a syntax highlighting problem with detecting element tokens in the C and C++ syntax highlighters.'
                ),
                h('li', {},
                    'Resolve problems with complex nesting of block-level elements in Markdown.'
                ),
                h('li', {},
                    'Added protection against corrupted user and mindspace settings files.'
                )
            ),
            h('p', {},
                h('strong', {},'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Added pytest tests for the HTML syntax highlighter.'),
                h('li', {}, 'Added pytest tests for the C and C++ syntax highlighters.'),
                h('li', {}, 'Added pytest tests for the JavaScript and TypeScript syntax highlighters.'),
                h('li', {}, 'Increased test coverage for the Lua syntax highlighter to 100%'),
                h('li', {}, 'Added pytest tests for the AIFPL syntax highlighter.')
            )
        )
    ];
}

export const notesPost_2026_01_17 = new NotesPost(
    '2026-01-17: Humbug v38',
    '2026-01-17',
    '/notes/2026-01-17',
    'Humbug v38',
    null,
    null,
    notesOpening_2026_01_17,
    notesArticle_2026_01_17,
    null
);
