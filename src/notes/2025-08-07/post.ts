import { CodeFragment } from '../../lib/code-fragments';
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
            CodeFragment.create({
                file: '/notes/2025-08-07/update1.m6r',
                language: 'Metaphor',
                caption: 'Metaphor prompt to update the site structure',
            }),
            h('p', {},
                'Once I\'d looked at the updates I rearranged some of the site structure so things consistently flowed ' +
                'from projects -> blog -> notes.  This just feels more natural.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving code rendering'),
            h('p', {},
                'This site uses a custom virtual DOM implementation (DVDI) to render the site.  This makes it easy for me ' +
                'to maintain as it doesn\'t need a ridiculously large framework to run.  The VDOM supports components, but ' +
                'it had a pretty clunky implementation for code fragments.'
            ),
            h('p', {},
                'I figured it was time to improve this so I set Claude Sonnet 4 the task of improving things.  Here\'s the ' +
                'ridiculously vague Metaphor prompt I used:'
            ),
            CodeFragment.create({
                file: '/notes/2025-08-07/update2.m6r',
                language: 'Metaphor',
                caption: 'Metaphor prompt to update the site structure',
            }),
            h('p', {},
                'Claude ended up doing 11 tool calls to come up with a design concept.  It didn\'t work first time as it ' +
                'didn\'t read the DVDI code and guessed at its behaviour from what it had seen.  Once I had it read the ' +
                'code it fixed the 2 issues it spotted and everything "just worked".  Fortunately I recognised a method ' +
                'hallucination must have been because it hadn\'t read the relevant code.'
            ),
            h('p', {},
                'It does feel like there\'s a need to update the Metaphor prompt preamble to tell the LLM to carefully check ' +
                'the code it\'s working with rather than trying to infer how it works.'
            ),
            h('p', {},
                'The new code fragment implementation is dramatically better and saves a huge amount of boilerplate code. ' +
                'It also supports inline code fragments, which is a nice bonus.  Updating blog entries is now much easier.' +
                'The new implementation has 329 lines of code, but reduced each code fragment to 6 lines of code instead of ' +
                'about 40!'
            ),
            h('p', {},
                'The whole process took about 2 hours, hugely simplifies the blog posts, and has nicer styling too.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Adding a "text" syntax highlighter'),
            h('p', {},
                'The blog site syntax highlighter had support for a number of languages, but not one for raw text.  Added this ' +
                'with a one-shot prompt to Claude:'
            ),
            CodeFragment.create({
                file: '/notes/2025-08-07/update3.m6r',
                language: 'Metaphor',
                caption: 'Metaphor prompt to add text syntax highlighting',
            }),
            h('p', {},
                'Fixed up a few uses of this and deleted some now-unecessary CSS.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Updating all blog posts to use the new code formatting'),
            h('p', {},
                'Updated the 2 remaining blog posts::'
            ),
            CodeFragment.create({
                file: '/notes/2025-08-07/update4.m6r',
                language: 'Metaphor',
                caption: 'Metaphor prompt to update all blog posts',
            })
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