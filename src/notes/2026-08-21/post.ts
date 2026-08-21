import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_08_21(): VElement[] {
    return [
        h('p', {},
            'Today I\'ve been working on splitting out more back-end functionality from the Qt-built Humbug front end.  I\'ve ' +
            'taken the latest DeepSeek v4 for a spin while doing this.'
        )
    ];
}

function notesArticle_2026_08_21(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Separating the backend'),
            h('p', {},
                'I started separating out the backend of Humbug a while ago but I want to get much closer to doing this now.  There ' +
                'were 3 interesting problems to solve today.'
            ),
            h('p', {},
                'The first was to split the System AI tool out and make it front-end agnostic.  This did mean adding a few more ' +
                'things into the context registry than I\'d originally wanted because the registry now needs to understand the idea ' +
                'of context positioning, but this then allowed the AI tool to manipulate contexts and have the UI simply react.'
            ),
            h('p', {},
                'The second was to make the editor context Qt-unaware.  This involved creating an abstract editor concept that is ' +
                'just a list of lines and then have the Qt editor react to changes in that.'
            ),
            h('p', {},
                'The final change was to make the column manipulations happen in the context registry too and have the UI react to ' +
                'them.'
            ),
            h('p', {},
                'Still quite a lot more work to do in this area, but we\'re moving in the direction of having the UI be able to ' +
                'run entirely disconnected from the backend (just using a network link).'
            )
        ),
        h('section', {},
            h('h2', {}, 'DeepSeek v4 Flash'),
            h('p', {},
                'I thought I\'d try DeepSeek v4 Flash on Ollama cloud and throw it at the last of the changes above.  It aced the test, ' +
                'but at staggering speed.  It\'s way faster than any other model I\'ve seen, but also did incredibly well at the ' +
                'agentic workflow required.  Unlike Claude and GLM, I didn\'t have to remind it of things as we went along.'
            ),
            h('p', {},
                'It didn\'t completely do things right as I had to spot a couple of methods that were now unused, but it was ' +
                'impressive.'
            ),
            h('p', {},
                'What was completely new, however, was that it would launch a task and then think about something else while the ' +
                'task ran!'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2026-08-21/ds4-1.webp',
                    alt: 'DeepSeek v4 Flash working on a task while thinking about something else',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'DeepSeek v4 Flash working on a task while thinking about something else')
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2026-08-21/ds4-2.webp',
                    alt: 'DeepSeek v4 Flash continuing to think while a task runs',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'DeepSeek v4 Flash continuing to think while a task runs')
            )
        )
    ];
}

export const notesPost_2026_08_21 = new NotesPost(
    '2026-08-21: Separating concerns and DeepSeek v4',
    '2026-08-21',
    '/notes/2026-08-21',
    '2026-08-21: Separating concerns and DeepSeek v4 - Splitting out back-end functionality from the Qt-built Humbug front end and trying DeepSeek v4 Flash.',
    null,
    null,
    notesOpening_2026_08_21,
    notesArticle_2026_08_21,
    null
);
