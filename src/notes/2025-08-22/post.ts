import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_22(): VElement[] {
    return [
        h('p', {},
            'Mindspace UX improvements, DeepSeek 3.1 integration, and Humbug v0.23 release notes covering wiki view additions, file tree UX improvements, and file sorting options.'
        )
    ];
}

function notesArticle_2025_08_22(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'A mindspace wiki view'),
            h('p', {},
                'v0.22 introduced the conversations and files view in the mindspace view. In v0.23 I\'ve added a wiki view.'
            ),
            h('p', {},
                'It had seemed a little weird to lose the default wiki view as it was quite useful at times, but it was not the view ' +
                'I wanted most of the time. By adding a wiki view, it\'s now possible to have either behaviour.'
            ),
            h('p', {},
                'A bonus is it\'s now easy to make the drag-and-drop behaviours for the 3 views different. Dragging a file from the wiki ' +
                'view, for example, now opens a view tab, while dragging the same file from the files view opens an editor tab.'
            )
        ),
        h('section', {},
            h('h2', {}, 'File tree UX quirks'),
            h('p', {},
                'Realized there was an odd UX problem which I\'d thought about before but wasn\'t very happy about. The problem was how ' +
                'to represent the root directory/folder in any given view.'
            ),
            h('p', {},
                'I didn\'t want to do this by making it an actual folder in the tree view. I\'d done that before, but it felt awkward, and ' +
                'took quite a lot of screen real estate. VSCode addresses this by having blank space at the bottom of the file tree that ' +
                'acts as a target for drop operations, or context-aware menus. I tried coding up an implementation of this and got it working ' +
                'but it felt really clunky - in the end I decided to throw that design away.'
            ),
            h('p', {},
                'In the end, I implemented a slightly different approach. I made the ', h('code', {}, '.'), ' directory visible and added an override so it was ' +
                'not a drag target, nor was it expandable. This has the attributes of the VSCode style of approach but with a much clearer ' +
                'visual to indicate things to the user.'
            )
        ),
        h('section', {},
            h('h2', {}, 'File sorting'),
            h('p', {},
                'In the 3 views I had built, the files and wiki views used simple alphabetical sorting, but kept the folders and files ' +
                'separate. This is a good default for many people, but I realized I prefer having both just sorted alphabetically ' +
                'together. Added a user settings option that lets a user choose from either approach.'
            ),
            h('p', {},
                'The overall effect seems quite nice:'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-22/screenshot-2025-08-22.png',
                    alt: 'A screenshot for Humbug v0.23 while in development',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'A screenshot for Humbug v0.23 while in development')
            )
        ),
        h('section', {},
            h('h2', {}, 'Deepseek 3.1'),
            h('p', {},
                'Deepseek 3.1 came out this week so I updated Humbug. As with the previous models, the new one overwrites the old one in the ' +
                'API, so I only had to update context window sizes.'
            ),
            h('p', {},
                'There appears to be a bug right now where tool calling doesn\'t work with the reasoning model and that causes it to steer ' +
                'traffic to the non-reasoning model (see ', 
                h('a', {href: 'https://api-docs.deepseek.com/quick_start/pricing'}, 'https://api-docs.deepseek.com/quick_start/pricing'),
                ').'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-22/deepseek-quirk.png',
                    alt: 'The DeepSeek reasoning quirk for tool use',
                    style: 'max-width: 80%; height: auto;'
                }),
                h('figcaption', {}, 'The DeepSeek reasoning quirk for tool use')
            ),
            h('p', {},
                'I decided to throw this at ', h('code', {}, 'deepseek-reasoner'), ', but now know it went to ', h('code', {}, 'deepseek-chat'), ' behind the scenes. What was ' +
                'impressive, however, was it almost perfectly build a Pacman maze when I asked for one.'
            ),
            h('p', {},
                'It decided to open it in an editor tab automatically too!'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-22/pacman-maze.png',
                    alt: 'The Pacman maze generated by DeepSeek',
                    style: 'max-width: 80%; height: auto;'
                }),
                h('figcaption', {}, 'The Pacman maze generated by DeepSeek')
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.23'),
            h('p', {},
                'I wouldn\'t normally make another release so close after the previous one, but the user experience changes add some nice ' +
                'symmetry that was slightly lacking in v0.22. It seems like v0.23 is appropriate!'
            )
        )
    ];
}

export const notesPost_2025_08_22 = new NotesPost(
    '2025-08-22: Mindspace UX improvements, DeepSeek 3.1, and Humbug v0.23',
    '2025-08-22',
    '/notes/2025-08-22',
    'Mindspace UX improvements, DeepSeek 3.1 integration, and Humbug v0.23 release notes covering wiki view additions, file tree UX improvements, and file sorting options.',
    null,
    null,
    notesOpening_2025_08_22,
    notesArticle_2025_08_22,
    null
);
