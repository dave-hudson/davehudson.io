import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_02_12(): VElement[] {
    return [
        h('p', {},
            'Over the last week I\'ve had Claude build me a pretty printer for AIFPL.  Or rather, I had it fail dismally to build a ' +
            'pretty printer, and then eventually worked out how I should pose this problem!'
        )
    ];
}

function notesArticle_2026_02_12(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Pretty printing'),
            h('p', {},
                'Lispy languages can be rendered in quite a lot of different ways, so it really makes sense to have a canonical form for AIFPL. ' +
                'The easiest way to do this should be to build a pretty printer that parses the language and generates a definitive output.'
            ),
            h('p', {},
                'Naiively, I thought a relatively lightweight description of the problem would work and then I could iterate from that. ' +
                'What actually happened, however, was I hadn\'t properly thought through the problem and didn\'t write a spec for what I wanted. ' +
                'I got something that seemed 90% working within an hour but then I started to adjust the implementation to match my ever-growing ' +
                'list of refinements.  This is where things went badly wrong!'
            ),
            h('p', {},
                'The core challenge is the "don\'t think about elephants" problem.  Once an LLM had read the ever-more-barroque code, it couldn\'t ' +
                'unsee it and kept defining everything in terms of progressively more weird edits to that structure.  I wanted a cathedral, ' +
                'but was getting a bizarre (yes, I mean "bizarre" because a bazarr would be more coherent).'
            ),
            h('p', {},
                'What I did, however, accumulate was a lot of unit tests, which turned out to be important later.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Scrapping version 1'),
            h('p', {},
                'One lesson I\'ve learned over the years is it\'s rarely a good idea to completely rewrite something when starting from a system ' +
                'that essentially works.  My first approach was to try to incrementally move from the slighly flaky v1 code to a new cleaner ' +
                'v2.  That wasted about 4 or 5 hours because it turns out refactoring a mess give a slightly more polished mess!'
            ),
            h('p', {},
                'People talk about AI slop, but in practice this was human-inspired slop with the AI as a willing accomplice.  Attempting to get ' +
                'to v2 this way was just as unproductive.'
            ),
            h('p', {},
                'In the end, the best bet was to take the learnings from all this work and discuss a completely new approach with Claude.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Building version 3'),
            h('p', {},
                'The new approach was much more interesting.  Having learned 2 ways to not build this I could now explain what I actually wanted ' +
                'in a much more coherent way.'
            ),
            h('p', {},
                'The key realization was that the old designs failed because they tried to do a complex task all at once.  Interestingly, ' +
                'this was exactly the same problem the compiler had had!'
            ),
            h('p', {},
                'Eventually this led to the current v3 design.  This one does parsing but splits the pretty printing into a planning stage ' +
                'followed by a rendering phase.  As with the compiler this mean we could defer some important decisions until after we\'d ' +
                'got all the necessary information (no peeking ahead all the time).'
            )
        )
    ];
}

export const notesPost_2026_02_12 = new NotesPost(
    '2026-02-12: Lessons from building a pretty printer',
    '2026-02-12',
    '/notes/2026-02-12',
    'Lessons from building a pretty printer',
    null,
    null,
    notesOpening_2026_02_12,
    notesArticle_2026_02_12,
    null
);