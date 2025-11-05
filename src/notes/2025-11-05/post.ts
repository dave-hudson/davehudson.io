import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_05(): VElement[] {
    return [
        h('p', {},
            'Stopping things when they\'re going off the rails: adding interrupt capabilities to agentic operations'
        )
    ];
}

function notesArticle_2025_11_05(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'A problem with agentic operations'),
            h('p', {},
                'One of the problems exposed by Humbug\'s heavily agentic approach to tasks is that it\'s very easy for an LLM to go down ' +
                'a rabbit hole. When this happens, one tool call leads to another, leads to another, etc., but no useful progress ' +
                'ends up being made because the LLM has gone off track. As things have stood to date, the only way ' +
                'to stop this was to cancel the current conversation, but this automatically causes all history since the last user prompt ' +
                'to be lost. We really needed a better solution.'
            ),
            h('p', {},
                'It turns out the tool calling behaviour defined in all the various different APIs does allow for a solution to this. ' +
                'They all support a mechanism to let a tool call complete, but then insert a user message immediately after within the tool ' +
                'call response message.'
            ),
            h('p', {},
                'With this mechanism it becomes possible for the user to specify an "interrupt" message, or even queue up several such ' +
                'messages. This can be as simple as "stop", or could be a nuanced and important missing piece of information the LLM ' +
                'needs to continue its work.'
            ),
            h('p', {},
                'A couple of hours with Claude Sonnet 4.5 and I managed to get a first working version. Oddly, the new UX is sort of nicer ' +
                'than before. It\'s now possible to submit messages while streaming, where previously this wasn\'t allowed. This actually ' +
                'feels pretty natural!'
            ),
            h('h2', {}, 'Bugs, always bugs'),
            h('p', {},
                'While I was making these changes I noticed a couple more irritating UI problems, one of which triggered the exception ' +
                'canary (but in a benign way). I/O really is the bane of computing, and perhaps why I like AIFPL\'s functional purity so much!'
            )
        )
    ];
}

export const notesPost_2025_11_05 = new NotesPost(
    '2025-11-05: Stopping things when they\'re going off the rails',
    '2025-11-05',
    '/notes/2025-11-05',
    'Stopping things when they\'re going off the rails: adding interrupt capabilities to agentic operations',
    null,
    null,
    notesOpening_2025_11_05,
    notesArticle_2025_11_05,
    null
);
