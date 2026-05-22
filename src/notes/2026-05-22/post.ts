import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_05_22(): VElement[] {
    return [
        h('p', {},
            'Humbug v48 is another mixture of front-end and back-end updates but the big theme for this one has been to dramatically ' +
            'improve the handling of AI models and AI backends.  It also has a new user manual (finally).'
        )
    ];
}

function notesArticle_2026_05_22(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'AI backends and models'),
            h('p', {},
                'One thing that has been annoying for a while is having both thinking and non-thinking versions of AI models having to be ' +
                'distinct entries in the model table.  v48 fixes this by exposing reasoning levels where they are currently configurable. ' +
                'Doing this also closed out some very old GitHub issues items.'
            ),
            h('p', {},
                'Going a step further, I changed the whole conversation backend to track the AI model provider as well as the model, allowing ' +
                'the model name to be identical and duplicated across different providers.  This gives a nicer user experience as now the ' +
                'same model can have the same display name, irrespective of backend.  For example, this now means I can see the same GLM ' +
                'model via ollama.com and z.ai.'
            ),
            h('p', {},
                'Another really nice UX change came from Tharik, with a much nicer implementation of the AI model settings.'
            ),
            h('p', {},
                'Finally, I added a second instance of the Ollama backend so now I can use ollama.com and local models at the same time.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Building a user manual'),
            h('p', {},
                'One of the more interesting uses of AI in v48 has been to build the user manual.  I gave this to Claude Haiku in thinking ' +
                'mode and let it navigate the codebase to work out all the pieces, how things work, and how the user might use them.  The ' +
                'result has been surprisingly good.'
            ),
            h('p', {},
                'It structured a document with an index and 20 chapters, and worked out a nice user journey through reading them.'
            ),
            h('p', {},
                'I will look to integrate this into the runtime experience of Humbug at some point.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Version 48'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'New text being streamed by an AI is now presented in a much more smooth way, eliminating the "jumpiness" of text chunks ' +
                    'delivered via the API endpoint.'),
                h('li', {}, 'Added support for reasoning levels against models that support reasoning levels.  This simplifies the model catalogue ' +
                    'as it shrinks dramatically.'),
                h('li', {}, 'Removed Gemini 2.5 support and added more Gemini 3 models.'),
                h('li', {}, 'In an editor tab, Ctrl+G (on all platforms) will navigate you to a specific line.'),
                h('li', {}, 'In an editor tab, Cmd+Opt+F (MacOS) or Ctrl+H (other platforms) will open the "find and replace" control.'),
                h('li', {}, 'Added separate support for Ollama cloud and Ollama running locally.'),
                h('li', {}, 'Separated the concept of the AI model and the AI model provider, making it possible to have the same model accessible via ' +
                    'different routes, but using the same model name.'),
                h('li', {}, 'The mindspace settings now offers the ability to fetch all available models from a given AI provider, and to remove any ' +
                    'that were fetched this way.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Correctly resolved an earlier problem with streaming text and rendering, where the user is looking at an earlier part of the ' +
                    'conversation.'),
                h('li', {}, 'Resolved problems in the Java syntax highlighter (around handling of generics).'),
                h('li', {}, 'If a file open in a diff view is saved then the scroll position within the diff view is now preserved.'),
                h('li', {}, 'If a file open in an editor view is saved externally then the scroll position within the editor tab is now preserved.'),
                h('li', {}, 'Arabic text line numbers now line up with the text.')
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Added pytest tests for the Java syntax highlighter.')
            )
        )
    ];
}

export const notesPost_2026_05_22 = new NotesPost(
    '2026-05-22: Humbug v48',
    '2026-05-22',
    '/notes/2026-05-22',
    '2026-05-22: Humbug v48 brings improved AI model handling with reasoning levels, provider separation, a user manual built by AI, and many UX improvements.',
    null,
    null,
    notesOpening_2026_05_22,
    notesArticle_2026_05_22,
    null
);
