import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_21(): VElement[] {
    return [
        h('p', {},
            'AIFPL improvements and reflections on LLM development processes'
        )
    ];
}

function notesArticle_2025_09_21(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the AIFPL internals'),
            h('p', {},
                'The original version of the code worked well, but Claude did a few slightly odd things to get everything working. This meant ' +
                'that the code was using a somewhat odd approach to atoms.'
            ),
            h('p', {},
                'To be fair, the current design is actually quite good because it leverages native python implementations in a way that keeps ' +
                'performance higher. Unfortunately, this has come at a cost of a clean implementation architecture.'
            ),
            h('p', {},
                'Completely reworked this to get the architecture cleaner and to make more of the internals work with immutable data structures. ' +
                'The immutability is a nice improvement because it makes the internals much easier to understand.'
            ),
            h('h2', {}, 'An aside about Claude doing weird stuff'),
            h('p', {},
                'At one point, while I was having Claude fix a few tricky bugs related to recursion, it ended up completely undoing all the ' +
                'changes it had done up to that point. This was pretty frustrating (and quite expensive).'
            ),
            h('p', {},
                'I\'ve seen other people complain about this on social media posts, but I tend to see this more as an indication that it has ' +
                'probably been trained with some data that\'s less than ideal. Posts that say "oh, I blew away all the new stuff and ' +
                'started again".'
            ),
            h('p', {},
                'What was frustrating was it then declared victory because rerunning the tests on the old code all passed, but the whole ' +
                'point was to refactor the old code. It suggests it doesn\'t have a strong sense of history - something I\'ve discussed ' +
                'with a few people who\'ve said something similar in the last month or two.'
            ),
            h('h2', {}, 'Recursion causes headaches'),
            h('p', {},
                'One very frustrating period of debugging in the new code was to fix a problem with recursion and mutual recursion. Claude ' +
                'spent several hours failing to make this work. It\'s not quite clear why, but I suspect it had ended up confusing itself ' +
                'constantly because AIFPL has in interesting design choice. AIFPL doesn\'t have ', h('code', {}, 'let'), ' and ', h('code', {}, 'letrec'), ' but instead just uses ' +
                h('code', {}, 'let'), ' but has the interpreter decide if something is recursive or not. This feels much more natural to me, but it seemed ' +
                'to confuse Claude into trying to handle both cases the same way.'
            ),
            h('p', {},
                'The key to resolving this was to start a new conversation with the AI about the merits of using a Y combinator to solve ' +
                'the recursive case which then led it to point out the two forms of ', h('code', {}, 'let'), ' that normally exist in Lisp implementations. Once ' +
                'we had that then I could ask it to evaluate pros and cons of the one form versus two forms, and it concluded we only needed ' +
                'one, but we needed two implementations behind the scenes.'
            ),
            h('p', {},
                'Once we had that then things "just worked".'
            ),
            h('h2', {}, 'The problem of being imprecise'),
            h('p', {},
                'I\'ve been reflecting on how my original design concept got turned into working ' +
                'code, with everything passing, yet the code wasn\'t actually that "good".'
            ),
            h('p', {},
                'It\'s sort of ironic to say it wasn\'t good because it did exactly what it\'s supposed to, but it did it in a really clunky ' +
                'way.'
            ),
            h('p', {},
                'The problem is even though I had clear idea that I wanted a pure functional language, I didn\'t really think about what that ' +
                'should mean for the implementation. Immutable data structures, for example, are a much better idea, but having never ' +
                'built this sort of software before, I didn\'t appreciate how important that would be.'
            ),
            h('p', {},
                'A regular Lisp system has immutable atoms, but mutable lists. A pure Lisp, however, ought to have immutable lists too. ' +
                'If we build an optimizing system later, then escape analysis might demonstrate a list is never reused and can thus be ' +
                'mutated safely.'
            ),
            h('p', {},
                'That\'s where the code has ended up in fact! We now have a totally pure type system and a straightforward implementation ' +
                'that is architecturally elegant. Fortunately, with LLM support to rework and refactor, getting to this point only added 7 ' +
                'or 8 hours of work!'
            ),
            h('h2', {}, 'Another learning'),
            h('p', {},
                'A shortcut I sometimes take with Humbug is when I\'m seeing the LLM get near the end of a context window is to delete ' +
                'some of the recent conversation and update the prompt that gave rise to it. This is great, but there\'s a caveat!'
            ),
            h('p', {},
                'If the conversation we\'re deleting caused any code changes then the AI loses track of them! We must either force it ' +
                'to reload, or else restart the conversation from scratch (but with the necessary context).'
            )
        )
    ];
}

export const notesPost_2025_09_21 = new NotesPost(
    '2025-09-21: AIFPL',
    '2025-09-21',
    '/notes/2025-09-21',
    'AIFPL improvements and reflections on LLM development processes',
    null,
    null,
    notesOpening_2025_09_21,
    notesArticle_2025_09_21,
    null
);
