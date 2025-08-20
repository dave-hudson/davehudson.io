import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_19(): VElement[] {
    return [
        h('p', {},
            'Continuing mindspace UI work with performance optimizations and conversation logic improvements.'
        )
    ];
}

function notesArticle_2025_08_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Don\'t do work twice!'),
            h('p', {},
                'When I was doing some performance tuning a few weeks ago I added code to defer the creation of various widget in ' +
                'conversation message sections, but also to defer syntax highlighting. A few days ago, I realized the syntax highlighting ' +
                'part was only expensive because I was doing it twice!'
            ),
            h('p', {},
                'This hadn\'t always been true, but a few months ago I modified the markdown parser to make use of the syntax parsers for ' +
                'code blocks. This allows them to catch scenarios where markdown code fences (three backticks) appear in the wrong place ' +
                'within a code block. This would cause the markdown to mis-render, although this is an edge case that pretty-much every ' +
                'markdown parser I know of, except this one, has problems with.'
            ),
            h('p', {},
                'While this worked fine, it did now mean that I ended up parsing each code block twice. Once to check it for markdown, ' +
                'and then a second time to syntax highlight it.'
            ),
            h('p', {},
                'This was pretty wasteful, so now the markdown pass caches the syntax parsing and makes that available for syntax ' +
                'highlighting.'
            ),
            h('p', {},
                'This change did also force me to separate out conversation and wiki syntax highlighting. The wiki code shouldn\'t have ' +
                'been relying on something in the conversation code.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Cleaning up conversation logic'),
            h('p', {},
                'I recently cleaned up the AI conversation transcript handling to make it more generic. While I was looking at how to ' +
                'handle trees of conversations, however, I realized it had a weird asymmetric interface and some very odd method names.'
            ),
            h('p', {},
                'It doesn\'t now! The new interface has ', h('code', {}, 'read'), ' and ', h('code', {}, 'write'), ' of ', h('code', {}, 'AIConversationHistory'), ' objects, and supports ', h('code', {}, 'append'), ' of ' +
                'a single ', h('code', {}, 'AIMessage'), '.'
            )
        )
    ];
}

export const notesPost_2025_08_19 = new NotesPost(
    '2025-08-19: Continuing mindspace UI work',
    '2025-08-19',
    '/notes/2025-08-19',
    '2025-08-19: Continuing mindspace UI work with performance optimizations and conversation logic improvements.',
    null,
    null,
    notesOpening_2025_08_19,
    notesArticle_2025_08_19,
    null
);
