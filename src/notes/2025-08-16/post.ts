import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_16(): VElement[] {
    return [
        h('p', {},
            'Reflections on AI behavior and a significant improvement to the mindspace tree editing code ' +
            'that removed over 300 lines of brittle code with a much more robust solution.'
        )
    ];
}

function notesArticle_2025_08_16(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'How to confuse an LLM'),
            h('p', {},
                'I\'d been asking Claude Sonnet 4 to help fix an issue in the mindspace code, but it seems that resulted in it getting ' +
                'slightly confused. The code contains a "delegate" component, but when I asked for an analysis this seemed to have ' +
                'caused Claude to want to use the "delegate" tool. Could just be coincidence, but those delegates also spun up more ' +
                'child LLM instances too.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Fixing tree editing problems'),
            h('p', {},
                'A few days ago I realized that scrolling the files tree very quickly would result in any open editor for a filename ' +
                'ending up in the wrong place.'
            ),
            h('p', {},
                'After a long discussion with Claude, it turns out the entire approach the code had been using was very brittle. It had ' +
                'taken several days to get it working and had felt somewhat clunky when I first did it.'
            ),
            h('p', {},
                'What\'s frustrating is that original approach was also built by Claude, but somehow it had not understood Qt well ' +
                'enough at the time.'
            ),
            h('p', {},
                'The new code is far more robust and a lot smaller! This change removed a net 300+ lines of code.'
            )
        )
    ];
}

export const notesPost_2025_08_16 = new NotesPost(
    '2025-08-16: Fixing a tree edit problem',
    '2025-08-16',
    '/notes/2025-08-16',
    '2025-08-16: Reflections on AI behavior and a significant improvement to the mindspace tree editing code that removed over 300 lines of brittle code with a much more robust solution.',
    null,
    null,
    notesOpening_2025_08_16,
    notesArticle_2025_08_16,
    null
);
