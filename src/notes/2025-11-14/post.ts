import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_14(): VElement[] {
    return [
        h('p', {},
            'Sometimes talking with users gives interesting insights.  Earlier this week a new user commented that it wasn\'t possible to change the conversation settings mid-conversation.  Of course, this has been a feature since v0.1, but the user had been expecting a visual drop-down or button on-screen, rather than thinking to look for a menu item.'
        )
    ];
}

function notesArticle_2025_11_14(): VElement[] {
    return [
        h('p', {},
            'Conversations and mindspaces now have a "cog" icon that triggers the associated settings dialog!'
        ),
        h('section', {},
            h('h2', {}, 'Terminal scroll-back limits'),
            h('p', {},
                'Quite an old item on the GitHub issues list was that we should be able to restrict the scroll-back in the terminal so it doesn\'t use unbounded amounts of memorhy.  This wasn\'t a difficult feature and took Claude about 20 minutes to build it.'
            )
        ),
        h('section', {},
            h('h2', {}, 'GPT 5.1'),
            h('p', {},
                'OpenAI just released GPT 5.1 and this has a much faster non-reasoning mode.  Added this and removed the now-pointless O1 model.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Starting to make editing agentic!'),
            h('p', {},
                'One of the things I really wanted to do was have the editor tabs support agentic operations.  For example, I wanted an AI to be able to interact with an editor to show you things, understand the contents, etc.  Ultimately this will let our conversations become a discussion in which the AI can manipulate a file to support interactions with the user.'
            ),
            h('p', {},
                'The first read-only versions of this took about 30 minutes to build.  This is incredbily cool!'
            )
        )
    ];
}

export const notesPost_2025_11_14 = new NotesPost(
    '2025-11-14: Usability improvements',
    '2025-11-14',
    '/notes/2025-11-14',
    'Usability improvements',
    null,
    null,
    notesOpening_2025_11_14,
    notesArticle_2025_11_14,
    null
);
