import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_10(): VElement[] {
    return [
        h('p', {},
            'Following on from last night\'s frantic addition of agentic terminal control, I\'ve updated that to resolve the initial linter problems ' +
            'and declared v0.25.'
        )
    ];
}

function notesArticle_2025_09_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Letting Humbug control the terminal (continued)'),
            h('p', {},
                'Following on from last night\'s frantic addition of terminal control, I\'ve updated the code to improve parameter validation. ' +
                'I also had Claude remove code that accessed protected properties of the terminal widget and replaced them with public APIs ' +
                'that would do the same things, but in a more typesafe way.'
            ),
            h('p', {},
                'Total time, including yesterday\'s work, was about 90 minutes!'
            ),
            h('p', {},
                'Separating the terminal writes and reads has been an eye opener! By providing orthogonal tools it\'s now easy for an LLM ' +
                'to try something and if it doesn\'t work immediately to try again.'
            ),
            h('p', {},
                'This has some surprising benefits.'
            ),
            h('p', {},
                'As an example I just asked gpt-oss-120b to open a terminal and run ', h('code', {}, 'vi'), ' on a file. I then asked it to find things in the ' +
                'file, and make edits to the text, based solely on my conversation with it. Occasionally vi needs a little help because it ' +
                'needed an enter key pressing, but it pretty-much "just worked", including closing the file and realizing it needed to use ' +
                h('code', {}, ':q!'), ' when vi complained the file had been edited.'
            ),
            h('p', {},
                'This is very cool!'
            )
        ),
        h('section', {},
            h('h2', {}, 'More ticket cleanups'),
            h('p', {},
                'I spent a little while clearing down old tickets in GitHub issues. My rule of thumb is if something hasn\'t been important ' +
                'enough to do in 6 months and it\'s not a clear bug then drop it! That\'s purged a lot more tickets and reduced the ' +
                'cognitive load.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.25'),
            h('p', {},
                'With the new agentic terminal capability this feels like a big enough feature to warrant a new release:'
            ),
            h('h3', {}, 'New features:'),
            h('ul', {},
                h('li', {},
                    'Updated the system AI tool to allow the AI to send commands to a terminal window (subject to user approval) and to be ' +
                    'able to query the status of terminal. This allows the AI to have full control of the terminal!'
                ),
                h('li', {},
                    'When the AI backend gets a 200 OK connection response from the AI a new temporary "AI connected" message appears so the ' +
                    'user can tell the AI is responding but not showing any messages (e.g. setting up a tool call). This also means ' +
                    'conversation transcripts now enable between network analytics.'
                ),
                h('li', {},
                    'Removed the "bookmark" functionality in the conversation tabs. While this was nice idea early in development it appears ' +
                    'to be something almost no-one uses now because the AI can write files via the filesystem tool. Removing this significantly ' +
                    'simplifies the code (over 300 lines removed).'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'grok-code-fast-1'), ' support using the xAI backend.'
                )
            ),
            h('h3', {}, 'Bug fixes:'),
            h('ul', {},
                h('li', {},
                    'Delegating a task could trigger a previously-silent exception.'
                ),
                h('li', {},
                    'If we edit text that matches an active search in an editor the editor will re-trigger the search so the search highlights ' +
                    'and match counts are correct.'
                ),
                h('li', {},
                    'If the user hits cancel on a conversation that\'s waiting on a tool approval this would leave the tool approval widget ' +
                    'on the screen. Now this is cleaned up.'
                ),
                h('li', {},
                    'File watching would not reliably stop when tabs were closed. This is now handled precisely, not lazily.'
                ),
                h('li', {},
                    'Duplicating a file in the mindspace conversation view would not set the correct file extension.'
                )
            ),
            h('h3', {}, 'Internal structure changes:'),
            h('ul', {},
                h('li', {},
                    'Added a new ', h('code', {}, 'tools'), ' directory and a ', h('code', {}, 'dependency_checker'), ' tool. This checks that internal modules are not using ' +
                    'dependencies that they shouldn\'t be using.'
                )
            )
        )
    ];
}

export const notesPost_2025_09_10 = new NotesPost(
    '2025-09-10: Readying Humbug v0.25',
    '2025-09-10',
    '/notes/2025-09-10',
    'Following on from last night\'s frantic addition of agentic terminal control, I\'ve updated that to resolve the initial linter problems and declared v0.25.',
    null,
    null,
    notesOpening_2025_09_10,
    notesArticle_2025_09_10,
    null
);
