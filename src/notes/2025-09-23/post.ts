import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_23(): VElement[] {
    return [
        h('p', {},
            'AIFPL development insights, Claude behavior observations, and architectural improvements'
        )
    ];
}

function notesArticle_2025_09_23(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Sometimes circular references are unavoidable'),
            h('p', {},
                'I tend to go to extreme lengths to avoid circular references in code, but AIFPL has demonstrated one of those few places ' +
                'where I end up with one that I can\'t do much about (if I want to keep my sanity).'
            ),
            h('p', {},
                'The problem is in evaluating functions. Functions need environments but those environments contain functions.'
            ),
            h('p', {},
                'In theory I could break this via some interesting indirections but that risks a lot of performance overheads. I don\'t like ' +
                'this but I\'ll live with it for now'
            ),
            h('h2', {}, 'Claude losing track of things'),
            h('p', {},
                'Once a file gets to about 2000 lines, Claude seems to start to forget things. I had a good example of this in a refactoring ' +
                'of the AIFPL built-in function logic.'
            ),
            h('p', {},
                'I asked it to break out each built-in function into a separate method (improves readability and maintainability), but this ' +
                'resulted in it forgetting to glue these into the function that applies them. When this caused a test regression it just ' +
                'fixed the cases that triggered test failures and not any others. This does indicate I\'ve got some interesting test ' +
                'coverage gaps though!'
            ),
            h('p', {},
                'What\'s odd is this only happened in one session. The next session picked things up and worked fine.'
            ),
            h('h2', {}, 'Cleaner higher-order and built-in functions'),
            h('p', {},
                'The early implementations of AIFPL did some very strange things to support higher-order and built-in functions. This added ' +
                'a surprising amount of complexity in the implementation and made the code much harder to understand. Reworked this so the ' +
                'code is now much more straightforward.'
            ),
            h('h2', {}, 'Adding "quote"'),
            h('p', {},
                'One omission in the original design was the absence of ', h('code', {}, 'quote'), '. We could build quite complex things with AIFPL, but the ' +
                'lack of ', h('code', {}, 'quote'), ' meant we could not really write code that manipulates code as data.'
            ),
            h('h2', {}, 'Adding AIFPL tool tests'),
            h('p', {},
                'Added AIFPL tool tests. When I did this I also moved the code structure around a little to make it easier to work out ' +
                'which code is associated with which tool. Also updated the tests to match the new structure.'
            ),
            h('h2', {}, 'Retiring the old calculator tool'),
            h('p', {},
                'The old calculator tool does far less than AIFPL and there\'s not much point in keeping it. Retired it!'
            )
        )
    ];
}

export const notesPost_2025_09_23 = new NotesPost(
    '2025-09-23: AIFPL',
    '2025-09-23',
    '/notes/2025-09-23',
    'AIFPL development insights, Claude behavior observations, and architectural improvements',
    null,
    null,
    notesOpening_2025_09_23,
    notesArticle_2025_09_23,
    null
);
