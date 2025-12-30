import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_12_30(): VElement[] {
    return [
        h('p', {},
            'Humbug v0.36 wraps up a year of Humbug development, with a lot of behind-the-scenes improvements, bug fixes, and ' +
            'updated GLM model support.'
        )
    ];
}

function notesArticle_2025_12_30(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'UI improvements'),
            h('p', {},
                'One thing that has frustrated me for a while is that Humbug was quite slow at changing the zoom level or the colour mode. ' +
                'In v0.36 things improve quite a lot, although I\'d still like these to be quicker.  At some point in the future I need to ' +
                'really get into profiling things, again.'
            ),
            h('p', {},
                'Doing this also gave me a good excuse to refactor quite a few classes to have common base classes.  This also let me ' +
                'eliminate several syntax highlighters that were essentially the same.'
            ),
            h('p', {},
                'Another thing that has been frustrating is that keyboard shortcuts no longer worked for horizontally scrolling text ' +
                '(although mouse wheel updates have always worked).  Several different things conspired to cause this!'
            ),
            h('p', {},
                'The first problem was the tab activation logic was being too agressive about moving the focus to a tab when it\'s clicked. ' +
                'This was also caused by a bit of a thinko in which I\'d conflated focus with spotlighting a message.  They\'re now ' +
                'separated out.'
            ),
            h('p', {},
                'The second problem was the various text edit controls were inconsistently overriding key press events.'
            ),
            h('p', {},
                'Both of these, and a few other more minor quirks, have now been resolved.'
            )
        ),
        h('section', {},
            h('h2', {}, 'GLM 4.7'),
            h('p', {},
                'I\'ve been curious about GLM\'s capabilities for a while, but Z.ai are now offering a really interesting coding option ' +
                'where developers can get a coding package that is dramatically less expensive than using normal API access and that is ' +
                'significantly cheaper than any other equivalently powerful offering,.'
            ),
            h('p', {},
                'As I want to try this over the next few days I updated the Z.ai backend to support both thinking/non-thinking models and ' +
                'to support GLM 4.7.'
            ),
            h('p', {},
                'Z.ai support coding models via a different HTTPS endpoint to the normal API: ', h('code', {}, 'https://api.z.ai/api/coding/paas/v4'),
                ', so this does mean changing the default endpoint in the Humbug user settings.'
            ),
            h('p', {},
                'More details are at: ', h('a', {href: 'https://docs.z.ai/devpack/tool/others'}, 'https://docs.z.ai/devpack/tool/others')
            ),
            h('p', {},
                'GLM 4.7 is also available on the Ollama cloud, so added it there too.'
            ),
            h('p', {},
                'On first glance I\'m pretty impressed with GLM 4.7 as a model.  It\'s not quite beating Claude Sonnet 4.5 for me yet, ' +
                'but time will tell.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.36'),
            h('p', {},
                'Humbug v0.36 is mainly a lot of bug fixes.  The change log doesn\'t seem very impressive, but a lot of these are UI ' +
                'issues that LLMs aren\'t too great at fixing yet.  This isn\'t so much because they can\'t code things correctly as ' +
                'much as the LLMs aren\'t yet that good at testing and evaluating UI/UX problems.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Improved the performance of style changes (makes zoom and colour mode changes quicker).'),
                h('li', {}, 'Added smooth scrolling for shell message navigation.'),
                h('li', {}, 'Added support for GLM 4.7 via the Z.ai and Ollama backends.'),
                h('li', {}, 'Updated the Z.ai backend to support thinking mode enabled/disabled.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Tightened up parameter ', h('code', {}, 'message_types'), ' checking for ', h('code', {}, 'read_messages'), ' and ', h('code', {}, 'search'),
                    ' operations in the conversation AI tool. Removed unnecessary tool-call filter.'
                ),
                h('li', {}, 'Fixed a problem with zoom scaling of markdown text blocks.'),
                h('li', {}, 'Fixed a markdown parsing issue affecting paragraphs inside lists.'),
                h('li', {}, 'Improved exception handling for UI interactions.'),
                h('li', {}, 'Fixed a problem where preview tabs needed to be clicked twice to correctly gain focus.'),
                h('li', {},
                    'Fixed problem with widget focus that meant horizontally-scrollable text could be scrolled with a mouse wheel but ' +
                    'not with the left and right arrow keys.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {},
                    'Removed the lazy UI updates as they added a lot of complexity and more significant performance issues have ' +
                    'been resolved.'
                )
            )
        )
    ];
}

export const notesPost_2025_12_30 = new NotesPost(
    '2025-12-30: Humbug v0.36',
    '2025-12-30',
    '/notes/2025-12-30',
    'Humbug v0.36',
    null,
    null,
    notesOpening_2025_12_30,
    notesArticle_2025_12_30,
    null
);
