import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_08(): VElement[] {
    return [
        h('p', {},
            'I\'ve been away in Dublin for a few days break and had some time to think about what might be missing from the current design. ' +
            'A few improvements have come out of this thinking.'
        )
    ];
}

function notesArticle_2025_09_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving AI conversations'),
            h('p', {},
                'One problem that did occur to me is there\'s currently no way to tell if an LLM has actually responded to an HTTP request. ' +
                'Up to now we\'ve just animated the border of whatever was the last message in the conversation history.  This is pretty ' +
                'unsatisfactory because we don\'t know if the HTTP request is timing out, or if we\'re just waiting for the LLM to generate ' +
                'a large tool call (annoyingly they don\'t signal much when they\'re doing this).'
            ),
            h('p', {},
                'To get round this I\'ve added a new conversation state ', h('code', {}, 'AI_CONNECTED'), ' that pops up a temporary message saying "AI is ' +
                'thinking...".  This appears after a 200 OK comes back from the HTTP request.  If the message is on-screen it means the ' +
                'connection has been made.  If it\'s not on the screen it will mean the connection has not been made.  This message ' +
                'disappears once any other message is added to the conversation.'
            ),
            h('p', {},
                'The new state also adds a useful feature to the conversation transcripts.  Now it\'s possible to see how quickly an LLM ' +
                'responded, and also how quickly we got to the first visible response.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Removing bookmarks - a "good idea at the time"'),
            h('p', {},
                'When bookmarking in conversations was added 6+ months ago, bookmarking solved a problem of navigating backwards and forwards ' +
                'in long conversations where the user needed to copy and paste code fragments.  Since then we\'ve added navigation between ' +
                'adjacent messages, but added the filesystem tool that lets the AI write files directly.'
            ),
            h('p', {},
                'The bookmark code had grown from its original form to something that took over 300 lines of code, added complexity to the UI, ' +
                'and wasn\'t really used anymore.  It\'s now gone!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Grok code-fast-1 support'),
            h('p', {},
                'Added ', h('code', {}, 'grok-code-fast-1'), ' support.  This is a very fast and inexpensive model.'
            ),
            h('p', {},
                'I set it a code refactoring problem in the AI delegation tool.  It was very fast to propose a design, but had a few problems ' +
                'quite quickly:'
            ),
            h('ul', {},
                h('li', {}, 'It confused me answering some of its questions with me asking it questions'),
                h('li', {}, 'It threw a "grammar too complex" error when I asked for more design analysis'),
                h('li', {}, 'It missed two key dependency injections that would be required, but that Claude Sonnet 4 (non-thinking) flagged immediately.')
            ),
            h('p', {},
                'If they can resolve these functional issues, the speed will be amazing, but I\'m not retiring Claude just yet.  Too much ' +
                'of keeping the Humbug codebase clean relies on the sorts of insights that Claude is still better at.'
            )
        ),
        h('section', {},
            h('h2', {}, 'File watching bug'),
            h('p', {},
                'The previous code attempted to tidy up file watching when ', h('code', {}, '__del__'), ' was called on objects.  In Python, however, this isn\'t ' +
                'guaranteed to be precise and we would see exceptions being raised.  Now we don\'t as these cleanups are done precisely when ' +
                'a tab closes.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Conversation view duplicate bug'),
            h('p', {},
                'When duplicating files in the mindspace conversation view, the previous code didn\'t add file extensions correctly (a ' +
                'consequence of hiding them in v0.24).  Now this works correctly.'
            )
        )
    ];
}

export const notesPost_2025_09_08 = new NotesPost(
    '2025-09-08: Dublin development',
    '2025-09-08',
    '/notes/2025-09-08',
    'I\'ve been away in Dublin for a few days break and had some time to think about what might be missing from the current design. A few improvements have come out of this thinking.',
    null,
    null,
    notesOpening_2025_09_08,
    notesArticle_2025_09_08,
    null
);
