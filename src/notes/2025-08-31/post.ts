import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_31(): VElement[] {
    return [
        h('p', {},
            'Today was a quiet Sunday with some cleanups, the first victory for the exception canary, and some ideas for the future!'
        )
    ];
}

function notesArticle_2025_08_31(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the mindspace conversations view'),
            h('p', {},
                'In general, I like to see file extensions in file tree views, but in the conversations view this can is a bit unecessary. ' +
                'I added code that hides the file extension in this view. I have some longer-term plans about the whole conversations view, ' +
                'but I won\'t be getting to them for a while yet.'
            )
        ),
        h('section', {},
            h('h2', {}, 'First victory for the canary'),
            h('p', {},
                'On Friday, I added the exception canary. Today I triggered it for a latent bug that had zero observable impact! If I tried ' +
                'to open a folder in the conversations view, this would silently generate an exception. Now resolved because I saw the canary ' +
                'flag this had happened.'
            ),
            h('p', {},
                'A first win for the canary code!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Markdown parsing quirk'),
            h('p', {},
                'While I was debating and idea with GPT-OSS:120b, it streamed back a couple of tables that nothing in the last columns. ' +
                'These were checklists for a human to fill in. These didn\'t render correctly, so I modified the markdown parser to check for ' +
                'discrepancies in the number of columns in a table and to automatically correct them.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Clock test fixes'),
            h('p', {},
                'I modified the clock tool a few days ago, but forgot to update the tests. Claude added the missing tests, and we fixed a ' +
                'timezone bug that got highlighted as a result!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Default to the user\'s home directory'),
            h('p', {},
                'When opening or creating new mindspaces, we\'d previously use the current working directory. For a binary build, however, ' +
                'that would be the root of the filesystem, which was clunky. Now both use the user\'s home directory as the starting point.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.24'),
            h('p', {},
                'It\'s 9 days since the last release. There haven\'t been any major new features, but there have been a lot of usability ' +
                'improvements and fixes, so going to call this v0.24.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Thinking about the future'),
            h('p', {},
                'The current "delegate_ai_tool" functionality is tied to the Humbug UI, but it feels like it would make sense to split this ' +
                'functionality into 2 parts. The first will be generic and will allow callback hooks to trigger UI updates. The second will ' +
                'be the UI hooks. This will make the tool much more useful as an OS framework concept.'
            ),
            h('p', {},
                'I\'ve also been thinking about building a simple pure LISP (or Scheme) interpreter tool. Done correctly, this will be able ' +
                'to replace the current calculator tool but also do far more than the calculator can do. By making this a pure language it ' +
                'won\'t be possible for an LLM to do anything destructive, but it will let the LLM construct much more complex tools.'
            )
        )
    ];
}

export const notesPost_2025_08_31 = new NotesPost(
    '2025-08-31: Sunday cleanups, Humbug v0.24, and some new ideas',
    '2025-08-31',
    '/notes/2025-08-31',
    'Today was a quiet Sunday with some cleanups, the first victory for the exception canary, Humbug v0.25, and some ideas for the future!',
    null,
    null,
    notesOpening_2025_08_31,
    notesArticle_2025_08_31,
    null
);
