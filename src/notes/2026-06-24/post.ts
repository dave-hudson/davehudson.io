import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_24(): VElement[] {
    return [
        h('p', {},
            'It\'s been a while since I posted any notes, but most of my focus has been on front-end issues and not interesting ' +
            'backend features.  Two big themes today, however: GLM 5.2 and Humbug v50.'
        )
    ];
}

function notesArticle_2026_06_24(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'GLM 5.2'),
            h('p', {},
                'I\'ve been trying out GLM for a while and it\'s always been quite good, but not quite good enough.  Claude Sonnet has been ' +
                'my go-to model for almost 18 months.  As of the last few days Sonnet will be getting far less use!'
            ),
            h('p', {},
                'Why?  GLM demonstrated it could do many things right, one thing that I\'ve never seen Sonnet do, and all at a fraction of the ' +
                'cost.'
            ),
            h('p', {},
                'First, what did it do right?'
            ),
            h('ul', {},
                h('li', {},
                    'Refactored a series of tab styling issues into a clean and consistent set, having identified unnecessary deviations ' +
                    'from a common approach in 8 different types of tabs (worked first time).'
                ),
                h('li', {},
                    'Correctly added cache statistics to 6 out of 8 AI backends in Humbug (worked first time).'
                ),
                h('li', {},
                    'Resolved a tricky diff applier problem.'
                ),
                h('li', {},
                    'Identified and resolved a quirky sidebar tree crash.'
                ),
                h('li', {},
                    'Correctly resolved an off-by-one pixel UI bug.'
                )
            ),
            h('p', {},
                'This last one is the one that really impressed me.'
            ),
            h('p', {},
                'I tasked GLM with fixing an off-by-one pixel bug in what I told it were 2 out of 5 tab types.  Importantly, I actually ' +
                'had this wrong and the problem was affecting all 5 tab types, but I\'d not spotted my mistake.  Sonnet, and Opus, armed ' +
                'with my assertion would have dutifully come up with some odd theory to match my observation and would have proposed a ' +
                '"fix".  GLM spent 8 minutes trying to work out what was wrong, and concluded it couldn\'t.  In that time it did not ' +
                'attempt to fix anything - it tried to reason through what might cause a difference.'
            ),
            h('p', {},
                'OK, GLM is slower than the Anthropic models (perhaps 2x) but that\'s a lot of thinking that happened and the correct ' +
                'approach identified.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-06-24/glm-correct-response.webp', alt: 'GLM 5.2 correctly reasoning about an off-by-one pixel bug'}),
                h('figcaption', {}, 'GLM 5.2 correctly reasoning about an off-by-one pixel bug')
            ),
            h('p', {},
                'The cost difference is compelling.  Via APIs, Sonnet is $3/1M input tokens and $15/1M output tokens. ' +
                'GLM is $1.40/1M input tokens and $4.40/1M output tokens.  Importantly, Z.ai (the team behind GLM) also offers a coding ' +
                'plan that can be used with tools like Humbug, where Anthropic restrict such plans to their own tools.  Z.ai also appear ' +
                'to offer more usage at the same price although both companies are a little opaque on this.'
            ),
            h('p', {},
                'Of course, Z.ai may be doing this as a loss leading activity to build market share, but the nice thing about Humbug ' +
                'is we can use whatever models offer the best price/capability balance without needing to change anything.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v50'),
            h('p', {},
                'v50 is here.  It has a lot of new AI model support, major UI improvements, token usage tracking, performance improvements, ' +
                'markdown handling improvements, docx rendering improvements, and bug fixes:'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'Split out mindspace operations into a new "Mindspace" menu.'
                ),
                h('li', {},
                    'Replaced MiniMax M2.5 with MiniMax M3 on Ollama.com.'
                ),
                h('li', {},
                    'Added Kimi K2.7 Code on Ollama.com.'
                ),
                h('li', {},
                    'Added GLM 5.2 on Z.ai and Ollama.com.'
                ),
                h('li', {},
                    'Added Gemini 3.5 Flash.'
                ),
                h('li', {},
                    'Added cache usage tracking on API commands.'
                ),
                h('li', {},
                    'Added a new "token usage" tab to keep track of token usage within the mindspace.'
                ),
                h('li', {},
                    'Added a tab carousel (View -> Show Tab Carousel, Ctrl+Shift+T) that shows open tabs as a horizontally scrollable ' +
                    'card strip with the current tab nearly filling the view.  Scroll, drag the strip sideways, use the arrow keys, or ' +
                    'press the shortcut again to flip through tabs; click the centred card (or press Enter) to switch to it, and close ' +
                    'a tab with its close button or by swiping its card upwards.'
                ),
                h('li', {},
                    'Added a tab overview (View -> Show Open Tabs, Ctrl+Shift+E) that shows all open tabs as thumbnail cards, like a ' +
                    'mobile recents screen.  Click a card to switch to that tab, swipe/drag it upwards or use its close button to close ' +
                    'the tab.  Pressing the shortcut again cycles the selection through the cards; Enter activates the selected tab.'
                ),
                h('li', {},
                    'Right-clicking a tab label now shows a context menu with options to open a new tab to the left or right, and to close ' +
                    'tabs to the left, tabs to the right, or all other tabs in the column.'
                ),
                h('li', {},
                    'Conversation message banners are now "sticky" at the top of the conversation tab when scrolling.  This provides context ' +
                    'on the conversation you\'re viewing.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'cat'), ' shell command that emulates the functionality of the filesystem AI tool\'s file read operation.'
                ),
                h('li', {},
                    'Made VCS (git) polling an async task so it doesn\'t block the main thread.  Useful on Windows with anti-malware scanners.'
                ),
                h('li', {},
                    'Colour theme changes in the menu are now persistent.'
                ),
                h('li', {},
                    'Added a colour picker and high contrast colour scheme.'
                ),
                h('li', {},
                    'When converting from ', h('code', {}, '.docx'), ' files, images are now extracted into a sidecar directory.  When converting to ',
                    h('code', {}, '.docx'), ' files images are now inserted.'
                ),
                h('li', {},
                    'Improved the Menai tool description to encourage AIs to read the help if they haven\'t already done so.'
                ),
                h('li', {},
                    'Added support for animated GIF files in markdown.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Dramatically sped up zoom operations.'
                ),
                h('li', {},
                    'Conversation inputs now scale with the zoom factor.'
                ),
                h('li', {},
                    'Resolved problem with application zoom shortcuts interacting with terminal tabs.'
                ),
                h('li', {},
                    'Resolved ', h('code', {}, '.docx'), ' document rendering problems with spacing and list numbering.'
                ),
                h('li', {},
                    'Resolved subtle rendering problems with Markdown documents and "tight" lists.'
                ),
                h('li', {},
                    'Improved the Markdown syntax highlighter to make things consistent between different block types.'
                ),
                h('li', {},
                    'The diff applier now looks for potentially ambiguous diffs and rejects them, providing context to allow an AI to improve the ' +
                    'diff and resubmit.'
                ),
                h('li', {},
                    'Improved the PDF text extraction.'
                ),
                h('li', {},
                    'When an AI was opening tabs, if another tab of a different type existed for the same file then the open would not work correctly.'
                ),
                h('li', {},
                    'Dragging and dropping a binary image file from the files sidebar will now open the image in a preview tab.'
                ),
                h('li', {},
                    'Attempting to edit binary image files is now prevented.'
                )
            )
        )
    ];
}

export const notesPost_2026_06_24 = new NotesPost(
    '2026-06-24: Humbug v50',
    '2026-06-24',
    '/notes/2026-06-24',
    '2026-06-24: Humbug v50 - GLM 5.2 impresses with correct reasoning at lower cost, plus Humbug v50 brings new AI model support, major UI improvements, token usage tracking, and more.',
    '/notes/2026-06-24/glm-correct-response.webp',
    null,
    notesOpening_2026_06_24,
    notesArticle_2026_06_24,
    null
);
