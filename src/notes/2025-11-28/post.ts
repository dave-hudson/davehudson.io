import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_28(): VElement[] {
    return [
        h('p', {},
            'Every so often I want to try out a lot of new models.  Today I finally added them!'
        )
    ];
}

function notesArticle_2025_11_28(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Models'),
            h('p', {},
                'Every so often I want to try out a lot of new models.  Today I finally added them:'
            ),
            h('ul', {},
                h('li', {}, 'Claude Opus 4.5'),
                h('li', {}, 'Kimi-K2 (thinking and non-thinking)'),
                h('li', {}, 'Minimax-m2'),
                h('li', {}, 'GLM 4.6 (via Ollama)'),
                h('li', {}, 'Gemini 3 Pro (via Ollama)')
            ),
            h('p', {},
                'The last two were a pleasant surprise as I hadn\'t realized I could get the via the Ollama cloud offering!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Agentic conversations'),
            h('p', {},
                'Following my recent updates with agentic editing I figured I\'d let Claude build me tools for agentic conversations.  By this ' +
                'I mean adding tools that let an LLM view, search, and scroll other conversation tabs.  While not the most impactful tool, ' +
                'this does make it a lot easier to chat with an AI about something that\'s happening elsewhere.'
            ),
            h('p', {},
                'Here\'s quite a fun meta conversation!'
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-11-28/agentic-conversations.webp', alt: 'Meta conversation about agentic conversations'}),
                h('figcaption', {}, 'A meta conversation about agentic conversations')
            )
        )
    ];
}

export const notesPost_2025_11_28 = new NotesPost(
    '2025-11-28: Models and conversations',
    '2025-11-28',
    '/notes/2025-11-28',
    'Models and conversations',
    null,
    null,
    notesOpening_2025_11_28,
    notesArticle_2025_11_28,
    null
);
