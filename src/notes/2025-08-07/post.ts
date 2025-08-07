import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_07(): VElement[] {
    return [
        h('p', {},
            'Today marks the beginning of my daily research notes. This section will serve as a journal of my ongoing ' +
            'research, thoughts, and discoveries in software development, AI, and system design.'
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
            h('h2', {}, 'Setting up the Notes Section'),
            h('p', {},
                'I\'ve been working on adding a new "Notes" section to my blog site. The idea is to have a place for ' +
                'more frequent, informal updates about my research and development work.'
            ),
            h('p', {},
                'The technical implementation involved:'
            ),
            h('ul', {},
                h('li', {}, 'Creating a new notes directory structure mirroring the blog system'),
                h('li', {}, 'Duplicating the blog functionality to allow independent evolution'),
                h('li', {}, 'Adding Notes as the first navigation item'),
                h('li', {}, 'Replacing the text logo with the site icon')
            )
        ),
        h('section', {},
            h('h2', {}, 'Research Focus Areas'),
            h('p', {},
                'My current research is primarily focused on several key areas:'
            ),
            h('ul', {},
                h('li', {},
                    h('strong', {}, 'Human-AI Collaboration: '),
                    'Exploring how humans and AI can work together effectively, particularly in software development contexts.'
                ),
                h('li', {},
                    h('strong', {}, 'System Security: '),
                    'Investigating new approaches to security in systems that include both human and AI participants.'
                ),
                h('li', {},
                    h('strong', {}, 'Prompt Engineering: '),
                    'Developing structured approaches to AI prompt creation, including the Metaphor language.'
                ),
                h('li', {},
                    h('strong', {}, 'Operating System Design: '),
                    'Working on Humbug, an OS designed for secure human-AI collaboration.'
                )
            )
        )
    ];
}

export const notesPost_2025_08_07 = new NotesPost(
    'Starting the research notes',
    '2025-08-07',
    '/notes/2025-08-07',
    'The first entry in my research notes, documenting the setup of this notes section and outlining current research focus areas.',
    null,
    null,
    notesOpening_2025_08_07,
    notesArticle_2025_08_07,
    null
);