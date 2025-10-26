import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_10_26(): VElement[] {
    return [
        h('p', {},
            'Problems with parentheses: improving AIFPL error reporting for unbalanced expressions'
        )
    ];
}

function notesArticle_2025_10_26(): VElement[] {
    return [
        h('section', {},
            h('p', {},
                'In my last notes I talked about a problem where LLMs have problems if they generate S-expressions that have a very long ' +
                'chain of closing parentheses.'
            ),
            h('p', {},
                'You can see this by asking different LLMs how many closing parens are in a string such as ',
                h('code', {}, ')))))))))))))))))))))))))'),
                '. Once we get past about 10, LLMs start to flounder unless they\'re able to leverage a tool to do the counting (ironically, ' +
                'AIFPL is just such a tool).'
            ),
            h('p', {},
                'In the last updates we made things better. Error messages about unbalanced parens were improved and I\'d seen that result ' +
                'in better ability to debug problems. Unfortunately, not all problems!'
            ),
            h('p', {},
                'Today I decided to ask Claude, reminding it that it\'s a user of AIFPL.'
            ),
            h('p', {},
                'I keep seeing lots of people say AI\'s can\'t do new or novel things. I\'ve not believed this since I first read it, and my ' +
                'work with AIFPL has reinforced that. The discussion with Claude feels like it\'s continuing to support my view.'
            ),
            h('p', {},
                'Claude:'
            ),
            h('ul', {},
                h('li', {}, 'Sketched out a series of things it could use to address problems.'),
                h('li', {}, 'Checked the current implementation to evaluate where error messages did not offer enough diagnostic support.'),
                h('li', {}, 'Debated the merits of implementation choices, including continuing to run evaluations of problematic cases.'),
                h('li', {}, 'Built a design that, by it\'s own admission, didn\'t hit all the issues, but now provided materially more useful error insights and hints on how to resolve the problems.')
            ),
            h('p', {},
                'Of course, AIFPL is really just a form of Lisp, so Claude can undoubtedly lean on some information about what the best ' +
                'Lisp implementations do for error reporting, but the problem of "you\'re an AI, how does this programming language ' +
                'implementation need to improve to make it easier for you to debug code?" is likely to be pretty novel.'
            ),
            h('p', {},
                'Here\'s some broken code:'
            ),
            CodeFragment.create({
                language: 'aifpl',
                code: '(let ((x 5)) (+ x 2'
            }),
            h('p', {},
                'Our starting version would report a message such as:'
            ),
            CodeFragment.create({
                language: 'plaintext',
                code: `Error: Unterminated list - missing closing parenthesis
Position: 0
Expected: Closing parenthesis ')'
Context: List starting at position 0 was never closed
Suggestion: Add ')' to close the list
Example: Correct: (+ 1 2)
Incorrect: (+ 1 2`
            }),
            h('p', {},
                'Now the same error gives:'
            ),
            CodeFragment.create({
                language: 'plaintext',
                code: `Error: Unterminated list - missing 2 closing parentheses
Position: 13
Expected: Additional parentheses, "))", to close all expressions
Context: Reached end of input at depth 2.

Unclosed expressions (innermost to outermost):
  1. let binding at position 0: (let ((x 5)) (+ x 2
     Parsed 2 complete elements
     Started parsing element 3 at position 13: (+ x 2
     → This element is incomplete (see below)
  2. list/function call at position 13: (+ x 2
     Parsed 3 complete elements
     → Needs ')' after position 19
Suggestion: Close each incomplete expression with ')', working from innermost to outermost`
            }),
            h('p', {},
                'Getting this part working took a couple of hours. Getting the test coverage up to 100% again was harder because the new ' +
                'code introduced interesting new code paths. That took about 2 hours too.'
            ),
            h('p', {},
                'Total cost: about $13 - pretty incredible value for money!'
            )
        )
    ];
}

export const notesPost_2025_10_26 = new NotesPost(
    '2025-10-26: Problems with parentheses',
    '2025-10-26',
    '/notes/2025-10-26',
    'Problems with parentheses: improving AIFPL error reporting for unbalanced expressions',
    null,
    null,
    notesOpening_2025_10_26,
    notesArticle_2025_10_26,
    null
);
