import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_04_19(): VElement[] {
    return [
        h('p', {},
            'One day, many very helpful additions!'
        )
    ];
}

function notesArticle_2026_04_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Better search'),
            h('p', {},
                'I\'ve been threatening to add much better search features to Humbug, but I hadn\'t anticipated doing quite so many of these ' +
                'things in under 6 hours!'
            ),
            h('p', {},
                'Earlier this week I added a diff viewer because that was one of the remaining reasons I used VSCode.  Today I added regexp ' +
                'search to all tab types and replace functionality for editor tabs.  This was one of the remaining reasons I used gvim ' +
                '(although I will likely fall back to vim for many years to come).'
            ),
            h('p', {},
                'One of the nice things about using agentic workflows is it\'s easy to let an AI discover the context it needs.  I\'d been ' +
                'noticing, however, that LLMs were doing more and more calls to ',
                h('code', {}, 'grep'),
                ' via the terminal.  That\'s slightly irritating on a Mac, because of the tool permission check, but when I was using Windows ' +
                'last night it just didn\'t work at all (no ',
                h('code', {}, 'grep'),
                ' command).  I resolved this by adding new operations to search within a file, or recursively within a directory.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Version 44'),
            h('p', {},
                'There were a couple of subtle but important regressions yesterday in v43.  These look like they occurred by moving to Python ' +
                '3.14 from 3.13.  With that said, today added some incredibly useful new features.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added support for case-sensitive and regexp matching in the various find controls.'),
                h('li', {}, 'Added support for case-sensitive and regexp matching in the various AI tools that interact with tabs.'),
                h('li', {}, 'Added support for regexp replace operations in editor tabs.'),
                h('li', {}, 'Added Claude Opus 4.7 support.'),
                h('li', {}, 'Replaced GLM 5 with GLM 5.1 on Ollama.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'The mindspace label did not display correctly.'),
                h('li', {}, 'Resolve a problem with changed files not rendering correctly after updating all system build files.'),
                h('li', {},
                    'The user settings file deny list was accidentally being enabled/disabled by the toggle to allow reads outside the ' +
                    'current mindspace.  The deny list should always be active!'
                )
            )
        )
    ];
}

export const notesPost_2026_04_19 = new NotesPost(
    '2026-04-19: Humbug v44',
    '2026-04-19',
    '/notes/2026-04-19',
    '2026-04-19: Humbug v44 brings regexp search and replace across all tab types, new filesystem search operations, Claude Opus 4.7 support, and several bug fixes.',
    null,
    null,
    notesOpening_2026_04_19,
    notesArticle_2026_04_19,
    null
);
