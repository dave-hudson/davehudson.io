import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_07(): VElement[] {
    return [
        h('p', {},
            'I\'m starting a new open source research notes area for this site. This section will serve as a journal of my ' +
            'ongoing research, thoughts, and discoveries in software development, AI, and system design.'
        ),
        h('p', {},
            'The goal is to capture insights, document experiments, and track the evolution of ideas as they develop. ' +
            'Unlike blog posts, these notes will be more informal and focused on the research process itself.'
        )
    ];
}

function notesArticle_2025_08_07(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Setting up the "Notes" section'),
            h('p', {},
                'Adding notes to the site requires some interesting structural changes.  The old text logo is too big to ' +
                'allow a new top-level section, so moving to using an image instead.  I don\'t want to add a hamburger ' +
                'menu for mobile unless I really need one.'
            ),
            h('p', {},
                'As with most development work now, the initial work was done by AI (Claude Sonnet 4) using a Metaphor ' +
                'prompt.  This turned into quite a complex implementation with Claude doing 12 distinct steps to complete the ' +
                'task.  This was also done using a non-thinking version of Sonnet, which yet again demonstrates how the ' +
                'non-thinking/non-reasoning AI models tend to be able to do quite complex sequences of work just by virtue ' +
                'of each new tool-use triggering the LLM to respond to the newly-presented context.'
            ),
            h('p', {},
                'It continues to feel like the thinking/reasoning models are simply leveraging this same latent ability.'
            ),
            h('p', {},
                'Once I\'d looked at the updates I rearranged some of the site structure so things consistently flowed ' +
                'from projects -> blog -> notes.  This just feels more natural.'
            )
        )
    ];
}

export const notesPost_2025_08_07 = new NotesPost(
    'Starting the research notes',
    '2025-08-07',
    '/notes/2025-08-07',
    'The first entry in my new research notes, documenting the setup of this notes section and outlining current research focus areas.',
    null,
    null,
    notesOpening_2025_08_07,
    notesArticle_2025_08_07,
    null
);