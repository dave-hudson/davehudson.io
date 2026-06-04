import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_04(): VElement[] {
    return [
        h('p', {},
            'Today was a good day to clean up quite a few old ideas.  A mix of AI backend, markdown frontend, and finally using Menai ' +
            'for real!'
        )
    ];
}

function notesArticle_2026_06_04(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Google Gemini reasoning output'),
            h('p', {},
                'I had a long-standing note to allow Google Gemini to generate thinking/reasoning output.  Today I implemented it.'
            ),
            h('p', {},
                'This was a very lazy approach: I simply copied and pasted the API page contents from the Gemini website, explained ' +
                'what I wanted, and Claude Sonnet 4.6 one-shotted the implementation.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Markdown blockquotes'),
            h('p', {},
                'When I last updated the Markdown parser, it was set up to handle blockquotes, but there was no front-end rendering of ' +
                'the blockquotes.  For about a year I\'ve had a GitHub issue reminding me to fix this.'
            ),
            h('p', {},
                'This one was a little tricky.  Qt doesn\'t really have a nice way to express this concept so in the end we implemented ' +
                'a custom painter to draw the vertical bar for the blockquote.'
            ),
            h('p', {},
                'Along the way we discovered a couple of parsing bugs and a couple of rendering bugs.  These are now resolved, and what ' +
                'was immediately satisfying was to discover that Claude had actually used blockquoted sections in a conversation an ' +
                'hour or so earlier!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Using Menai'),
            h('p', {},
                'A couple of months ago, I\'d built a Menai pipeline runner that lets Menai\'s functional code connect with a Python-built ' +
                'pipeline running framework that can do I/O.  Today Claude and I updated things so AIs can directly use Menai to edit ' +
                'files (via the filesystem AI tool) and editor buffers (via the editor AI tool).'
            ),
            h('p', {},
                'This is a very early implementation, but a nice proof of concept.  There\'s a lot more to be done in this area, but ' +
                'the design does start with a "dry run" feature that allows an AI to check any edits prior to requesting they be ' +
                'approved by the user.'
            )
        )
    ];
}

export const notesPost_2026_06_04 = new NotesPost(
    '2026-06-04: Wrapping up some old ideas',
    '2026-06-04',
    '/notes/2026-06-04',
    '2026-06-04: Wrapping up old ideas - Gemini reasoning output, Markdown blockquotes, and using Menai for real file editing.',
    null,
    null,
    notesOpening_2026_06_04,
    notesArticle_2026_06_04,
    null
);
