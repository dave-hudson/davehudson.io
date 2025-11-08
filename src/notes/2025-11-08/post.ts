import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_08(): VElement[] {
    return [
        h('p', {},
            'With a few last minute bits of polishing today, Humbug v0.27 is now available!  The v0.28 branch is already open.'
        )
    ];
}

function notesArticle_2025_11_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'v0.27 release notes'),
            h('p', {},
                'New features:'
            ),
            h('ul', {},
                h('li', {}, 'Added Claude Haiku 4.5 support.'),
                h('li', {}, 'AIFPL now has dramatically improved error responses to allow LLMs to do better debugging of problems.'),
                h('li', {}, 'When an AI is streaming responses, and especially useful where it is making a series of tool calls, you can now type a message and queue it for when the next tool call completes.  This message will be passed to the LLM and allows you to provide feedback about what it is currently doing.  This includes, for example, saying "stop" and asking it to stop what it is doing.  You could also use this to indicate an approach it is trying will not work.'),
                h('li', {}, 'The wiki feature that was previously in the software has been renamed as a "preview" capability, and the design has been simplified.')
            ),
            h('p', {},
                'Bug fixes:'
            ),
            h('ul', {},
                h('li', {}, 'Resolved problems with some AIFPL tail recursions not working correctly.'),
                h('li', {}, 'Resolved an exception triggered when a highlighted code section in a message was deleted (by deleting that message).'),
                h('li', {}, 'Resolved a bug in the deferred update processing of streamed messages.'),
                h('li', {}, 'Added clarification that AIFPL ', h('code', {}, 'cons'), ' operations are not the same as classic Lisp/Scheme.')
            ),
            h('p', {},
                'Internal structure changes:'
            ),
            h('ul', {},
                h('li', {}, 'Moved AIFPL test coverage to 100% of statements and conditionals.'),
                h('li', {}, 'Started to add AIFPL tools to the codebase.  These are not yet integrated but start to demonstrate how AIFPL can be used for complex algorithmic processing.  The first tool supports patching files with unified diffs.')
            )
        )
    ];
}

export const notesPost_2025_11_08 = new NotesPost(
    '2025-11-08: Humbug v0.27',
    '2025-11-08',
    '/notes/2025-11-08',
    'Humbug v0.27',
    null,
    null,
    notesOpening_2025_11_08,
    notesArticle_2025_11_08,
    null
);
