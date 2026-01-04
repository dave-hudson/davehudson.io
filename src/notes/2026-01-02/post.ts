import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_01_02(): VElement[] {
    return [
        h('p', {},
            'Having added GLM 4.7 support this week, I decided to take it for a test drive.  It\'s pretty good, but it\'s not ' +
            'Claude Sonnet 4.5.'
        )
    ];
}

function notesArticle_2026_01_02(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'A Lua syntax highlighter'),
            h('p', {},
                'I\'ve worked with Lua a few times in the past, but a new project I\'m looking at may end up using it.  To make this easier for ' +
                'me I figured I needed a Lua syntax highlighter.'
            ),
            h('p', {},
                'GLM 4.7 did a very nice job of creating one based on the existing lexer/parser patterns.  It wrote ad-hoc tests and then ' +
                'debugged quite a few issues it found.  None of this required my intervention.  So far so good!'
            ),
            h('p', {},
                'Having got something that provisionally worked, I asked GLM to build unit tests.  Again, it evaluated the existing test ' +
                'structure, proposed a design and wrote about 100 test cases.  This was also pretty good.  Unfortunately about 1/3 of the ' +
                'tests immediately failed.'
            ),
            h('p', {},
                'Trying to get GLM to fix this took us down a rabbit hole.  It\'s possible this was down to the context getting more full (at ' +
                'around 100k tokens), but it started to do a few strange things and kept repeating mistakes.  I\'ve seen this with other LLMs, ' +
                'so I might just have been unlucky this time.  In the end, however, I switched to Claude Sonnet 4.5 and it fixed all the ' +
                'test issues (albeit with a fresh context).'
            )
        ),
        h('section', {},
            h('h2', {}, 'Writing tests for the Python syntax highlighter'),
            h('p', {},
                'I gave GLM another test, this time to write tests for the Python syntax highlighter.  It again started well, but after it ' +
                'had created the first 5 or 6 files it made a mistake in a tool call.  Once that had happened it went off into the weeds.  ' +
                'As soon as that broken tool call is in the chat history the LLM can\'t unsee it (the "don\'t think about elephants" ' +
                'problem again).'
            ),
            h('p', {},
                'Again, Claude did the whole thing and debugged it all in a single session.'
            )
        ),
        h('section', {},
            h('h2', {}, 'It\'s not all bad'),
            h('p', {},
                'While this might sound a little negative, it\'s not all bad.  GLM has actually done a really nice job adding pages to my ' +
                'blog site!'
            )
        )
    ];
}

export const notesPost_2026_01_02 = new NotesPost(
    '2026-01-02: Taking GLM 4.7 for a test drive',
    '2026-01-02',
    '/notes/2026-01-02',
    'Taking GLM 4.7 for a test drive',
    null,
    null,
    notesOpening_2026_01_02,
    notesArticle_2026_01_02,
    null
);
