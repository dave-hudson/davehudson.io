import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_25(): VElement[] {
    return [
        h('p', {},
            'Making AIFPL more LLM friendly through product management with an AI customer, improved error handling, and pattern matching'
        )
    ];
}

function notesArticle_2025_09_25(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Product management with an AI as a customer'),
            h('p', {},
                'One of the more interesting things about designing software with and for an LLM is that you can "talk" to the end user ' +
                '(the LLM).  Any good product manager will tell you how important user feedback is!  In this instance, I started an ' +
                'abstract conversation with Claude and asked it about design improvements.'
            ),
            h('p', {},
                'It was interesting that its initial ideas focused on making the design more imperative (exactly the opposite of the ' +
                'current functional form).  Digging into this, the rationale was that this would be easier for human developers to ' +
                'work with.  When we got into specifics, it turned out these would not have been the size of wins that were ' +
                'that important.  What was important, however, was that Claude completely changed its perspective once I explained ' +
                'the language was designed for LLMs, not humans.  Suddenly it started to champion the functional style, noting that ' +
                'LLMs prefer not to have lots of statefulness.'
            ),
            h('p', {},
                'It was an interesting reminder of how important the loss of context is for LLMs.  I should have written a Metaphor prompt ' +
                'that outlined the design and why it is the way it is!'
            ),
            h('p', {},
                'With its new understanding, Claude decided the emphasis should be on much clearer error handling, pattern matching, and ' +
                'improved list handling.  In each case it could articulate a concrete reason why it would be able to make better use ' +
                'of AIFPL as a result.'
            ),
            h('p', {},
                'This discussion does seem to confirm some of my thinking from a few months ago.  My thought was that LLMs need different ' +
                'things to humans but we keep constraining them by either explicitly or implicitly biasing our work with them.  They ' +
                'default to assuming they need to do things to help humans, but in this case the way to help a human is to start by helping ' +
                'an LLM first.'
            ),
            h('h2', {}, 'Improving error handling'),
            h('p', {},
                'One of the key ideas from the discussion with Claude was to improve error handling.'
            ),
            h('p', {},
                'To do this we\'ve reworked all the exception handling to provide much more detailed error messages.  These are much more ' +
                'descriptive of what a given problem is, and how it might be solved.  It\'s the sort of thing a much more mature ' +
                'language implementation would have.'
            ),
            h('p', {},
                'Of course, this broke all the tests!  We really do need a less brittle way to handle error-related testing!'
            ),
            h('h2', {}, 'Adding a match special form'),
            h('p', {},
                'One of Claude\'s suggestions was that we should add some pattern matching.  This makes a lot of sense as pattern matching ' +
                'with just ', h('code', {}, 'if'), ' operations is pretty tedious.'
            ),
            h('p', {},
                'The design follows a few Lisp/Scheme designs in allowing a pattern match, including values and type predicates.  It also ' +
                'allows a wildcard match using ', h('code', {}, '_'), '.'
            ),
            h('p', {},
                'The implementation turned out to be surprisingly straightforward, but did wander down a rabbit hole at one point because ' +
                'Claude delegated a task and somehow got confused about a failure because the delegated child AI didn\'t do exactly what it ' +
                'needed to do.  In this instance, the child edited the evaluator, as instructed, but didn\'t update the tokenizer.'
            ),
            h('p', {},
                'The issue was the parent didn\'t give enough context but assumed it had.  It then triggered its own hallucination about ' +
                'what had gone wrong.'
            ),
            h('h2', {}, 'Refactoring'),
            h('p', {},
                'The evaluator has become quite large, so one of the challenges is to keep it small enough to be easy to maintain. ' +
                'Ended up splitting the core file into 4 separate files and 3 helper classes along the way.  I don\'t love this but ' +
                'it\'s better than the alternatives.'
            )
        )
    ];
}

export const notesPost_2025_09_25 = new NotesPost(
    '2025-09-25: Making AIFPL more LLM friendly',
    '2025-09-25',
    '/notes/2025-09-25',
    'Making AIFPL more LLM friendly through product management with an AI customer, improved error handling, and pattern matching',
    null,
    null,
    notesOpening_2025_09_25,
    notesArticle_2025_09_25,
    null
);
