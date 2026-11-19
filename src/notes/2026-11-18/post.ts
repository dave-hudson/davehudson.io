import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_18(): VElement[] {
    return [
        h('p', {},
            'Released v0.11 of Menai.  This one is a very small release to unlock a capability for Humbug v60.  ',
            'The key idea is to enable Humbug\'s AI tool to be able to run tests automatically without having to ',
            'use ',
            h('code', {}, 'menai-test'),
            ' in a terminal.'
        )
    ];
}

function notesArticle_2026_11_18(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Automatic testing'),
            h('p', {},
                'One of the reasons to build Menai is to allow AIs to construct code at runtime, but to make this ',
                'really useful we need to be able to refactor this into reusable code elements.'
            ),
            h('p', {},
                'Refactoring is really only safe if there are tests for the code that will help us ensure it does ',
                'what it\'s supposed to do.  Within the Menai project we have the CLI tool ',
                h('code', {}, 'menai-test'),
                ', but this isn\'t ideal within an AI harness, so now Menai exposes a test runner that\'s compatible ',
                'with the ',
                h('code', {}, 'menai-test'),
                ' tool, but that can be embedded instead.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.11'),
            h('p', {},
                'Menai v0.11 is a very small update that adds one significant feature to support use in Humbug.'
            ),
            h('h3', {}, 'New features'),
            h('ul', {},
                h('li', {},
                    'The ',
                    h('code', {}, 'menai-test'),
                    ' support module now ships as package data of the ',
                    h('code', {}, 'menai'),
                    ' package and is located through ',
                    h('code', {}, 'importlib.resources'),
                    ' by ',
                    h('code', {}, 'menai.support_module_dir()'),
                    ' and ',
                    h('code', {}, 'menai.support_module_source()'),
                    ', so a host test tool can make it available without depending on a source checkout.'
                ),
                h('li', {},
                    'Added ',
                    h('code', {}, 'menai.run_test_suite()'),
                    ', a library form of the test runner that returns structured outcomes for a host tool to ',
                    'render, without depending on the ',
                    h('code', {}, 'menai-test'),
                    ' console script or its coverage support.'
                ),
                h('li', {},
                    'The ',
                    h('code', {}, '.test.menai'),
                    ' suite format is now documented in the AI reference and in the language manual.'
                )
            ),
            h('h3', {}, 'Bug fixes'),
            h('ul', {},
                h('li', {}, 'Fixed some older document references that had become stale.')
            )
        )
    ];
}

export const notesPost_2026_11_18 = new NotesPost(
    '2026-11-18: Menai v0.11',
    '2026-11-18',
    '/notes/2026-11-18',
    '2026-11-18: Menai v0.11 - a small release that unlocks automatic testing for Humbug v60, with the ' +
    'menai-test support module shipped as package data, an embeddable menai.run_test_suite(), and documented ' +
    '.test.menai suites.',
    null,
    null,
    notesOpening_2026_11_18,
    notesArticle_2026_11_18,
    null
);
