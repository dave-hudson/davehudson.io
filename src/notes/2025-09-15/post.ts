import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_15(): VElement[] {
    return [
        h('p', {},
            'Terminal emulator improvements and automated pylint fixes using the new agentic capabilities.'
        )
    ];
}

function notesArticle_2025_09_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the terminal emulator'),
            h('p', {},
                'Having recently added an agentic terminal emulator capability I decided to do more testing with it. As I\'ve seen before, ' +
                'one or two LLMs demonstrated different behaviours.'
            ),
            h('p', {},
                'An interesting one was DeepSeek as it decided to only fetch 10 lines of text at a time, and this exposed a subtle bug.'
            ),
            h('p', {},
                'The ', h('code', {}, 'read_terminal'), ' operation reads the last "n" lines from the terminal buffer, but in the case of a new terminal ' +
                'the last few lines are usually empty to start with. I modified the code to use the internal tracking that works out which ' +
                'rows have been touched by the cursor and ignore all the ones below that.'
            ),
            h('p', {},
                'While I was doing this, however, I realized the internals of the terminal were being exposed as public properties and that ' +
                'some of those properties were being used in the terminal GUI. Modified them so they\'re private, added some accessor methods, ' +
                'and updated everything to use the new methods.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Pylint fixes'),
            h('p', {},
                'I\'ve had 2 minor ', h('code', {}, 'pylint'), ' issues for a while now. Given the new agentic capabilities in the terminal I decided to let ' +
                'Humbug find and fix its own problems again. Nice one-shotted fix that cleared both issues and made the code more ' +
                'readable.'
            )
        )
    ];
}

export const notesPost_2025_09_15 = new NotesPost(
    '2025-09-15: Code clean ups',
    '2025-09-15',
    '/notes/2025-09-15',
    'Terminal emulator improvements and automated pylint fixes using the new agentic capabilities.',
    null,
    null,
    notesOpening_2025_09_15,
    notesArticle_2025_09_15,
    null
);
