import {CodeFragment} from '../../lib/code-fragments';
import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_08(): VElement[] {
    return [
        h('p', {},
            'A new GPT-5 model was released yesterday so I updating Humbug to support it.  I also ' +
            'added a new Metaphor prompt for helping me with the davehudson.io site.'
        )
    ];
}

function notesArticle_2025_08_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'New GPT-5 Model'),
            h('p', {},
                'GPT-5 dropped yesterday and I\'ve updated Humbug to support it. I also removed the now-deprecated GPT-4.5 model.'
            ),
            h('p', {},
                'My first impressions are that it\'s pretty annoying for most of what I do. It required identity verification to ' +
                'use it and that\'s goint to cause friction for a lot of users.  It also insists on using "thinking" and that ' +
                'makes it slow.  My usual test of "check file <x> and tell me how long ago it was last modified" requires ' +
                '3 tool calls and takes Claude Sonnet about 10-15 seconds.  With GPT-5-nano this was 19 seconds, GPT-5-mini took ' +
                '69 seconds, while GPT-5 took 76 seconds!  This might be teething issues, but it\'s not a great start.'
            ),
            h('p', {},
                'The model also rejects temperature settings so it\'s not possible to dial back creativity for deterministic ' +
                'tasks. Pretty sure this will break a lot of other people\'s workflows.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Metaphor prompt for adding notes to davehudson.io'),
            h('p', {},
                'I added a new Metaphor prompt to help me with the davehudson.io site. It\'s designed to generate ' +
                'new notes pages within the site.  I quite like this as it\'s an annoying task to do manually:'
            ),
            CodeFragment.create({
                file: '/notes/2025-08-08/site-context.m6r',
                language: 'Metaphor',
                caption: 'Metaphor context describing the davehudson.io site'
            }),
            CodeFragment.create({
                file: '/notes/2025-08-08/new-note.m6r',
                language: 'Metaphor',
                caption: 'Metaphor prompt to generate a new notes page for "today"'
            })
        )
    ];
}

export const notesPost_2025_08_08 = new NotesPost(
    '2025-08-08: New GPT-5 Model and davehudson.io maintenance prompt',
    '2025-08-08',
    '/notes/2025-08-08',
    '2025-08-08: A new GPT-5 model was released and I added a Metaphor prompt to help with the davehudson.io site.',
    null,
    null,
    notesOpening_2025_08_08,
    notesArticle_2025_08_08,
    null
);