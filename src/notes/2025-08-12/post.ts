import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_12(): VElement[] {
    return [
        h('p', {},
            'Notes on the GLM-4.5 model from Z.ai, and updates to Humbug development including adding GLM-4.5 backends ' +
            'and removing the M6R backend.'
        )
    ];
}

function notesArticle_2025_08_12(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Another day, another model'),
            h('p', {},
                'This time it\'s the GLM model from Z.ai.'
            ),
            h('ul', {},
                h('li', {},
                    'Blog : ',
                    h('a', {href: 'https://z.ai/blog/glm-4.5'}, 'https://z.ai/blog/glm-4.5')
                ),
                h('li', {},
                    'Docs at: ',
                    h('a', {href: 'https://docs.z.ai/guides/llm/glm-4.5'}, 'https://docs.z.ai/guides/llm/glm-4.5')
                ),
                h('li', {},
                    'Chat completions API: ',
                    h('a', {href: 'https://docs.z.ai/api-reference/llm/chat-completion'}, 'https://docs.z.ai/api-reference/llm/chat-completion')
                ),
                h('li', {},
                    'Academic paper: ',
                    h('a', {href: 'https://arxiv.org/pdf/2508.06471'}, 'https://arxiv.org/pdf/2508.06471')
                )
            ),
            h('p', {},
                'It appears to have very good benchmark performance, especially as an open source model.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug updates'),
            h('p', {},
                'Added 5 backends for the GLM-4.5 model from Z.ai. I\'ve only tested against their free endpoint (glm-4.5-flash) on their ' +
                'public API, but this should work locally.'
            ),
            h('p', {},
                'Performance is a little slow, probably due to the round-trip to China, but it seems faster than DeepSeek.'
            ),
            h('p', {},
                'Not really had much time to evaluate its capabilities.'
            ),
            h('p', {},
                'The code is based on the xAI driver - that seems to be the closest match.'
            ),
            h('p', {},
                'Also removed the M6R backend. This had been built as a proof-of-concept test backend with a view to implement a router ' +
                'service, but the concepts are now better handled generically, and other services can be implemented with custom tools.'
            ),
            h('p', {},
                'Realized I could simplify the thinking/response token handling as a result of earlier changes, so simplified things!'
            )
        )
    ];
}

export const notesPost_2025_08_12 = new NotesPost(
    '2025-08-12: More AI models, and Humbug development',
    '2025-08-12',
    '/notes/2025-08-12',
    '2025-08-12: Notes on the GLM-4.5 model from Z.ai, and updates to Humbug development including adding GLM-4.5 backends and removing the M6R backend.',
    null,
    null,
    notesOpening_2025_08_12,
    notesArticle_2025_08_12,
    null
);
