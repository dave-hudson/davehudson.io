import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_18(): VElement[] {
    return [
        h('p', {},
            'Daily notes and more AIFPL'
        )
    ];
}

function notesArticle_2025_09_18(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Interesting links'),
            h('ul', {},
                h('li', {},
                    h('a', {href: 'https://jeremyberman.substack.com/p/how-i-got-the-highest-score-on-arc-agi-again', target: '_blank'}, 
                        'https://jeremyberman.substack.com/p/how-i-got-the-highest-score-on-arc-agi-again'
                    )
                ),
                h('li', {},
                    h('a', {href: 'https://www.anthropic.com/engineering/writing-tools-for-agents', target: '_blank'}, 
                        'https://www.anthropic.com/engineering/writing-tools-for-agents'
                    )
                )
            ),
            h('h2', {}, 'AIFPL syntax highlighting'),
            h('p', {},
                'As we now have a new language and user docs, it made sense to add an AIFPL syntax highlighter. This is essentially a cut ' +
                'down version of the Scheme syntax highlighter, but is already somewhat diverged.'
            ),
            h('h2', {}, 'Improving the terminal (again)'),
            h('p', {},
                'I noticed Claude doing some slightly odd things with the terminal emulator and seemingly sending extra newlines. I realized ' +
                'that even though I\'d changed "command" to "input" this was actually very misleading. What we\'re actually sending are ' +
                'keystrokes.'
            ),
            h('p', {},
                'As I was clearing that up (and strengthening the descriptions) I also discovered the code was automatically adding a newline ' +
                'to any string, which is wrong! Now removed, and things seem to be working much better as a result.'
            ),
            h('h2', {}, 'Extending AIFPL'),
            h('p', {},
                'At the end of yesterday, AIFPL had quite complex evaluation capabilities, but didn\'t have the ability to define functions ' +
                'or to bind variables. Today that changed!'
            ),
            h('p', {},
                'With this came a ton of new complexity because we now had to consider recursion and as we want to support significant amounts ' +
                'of recursion to handle looping this required adding tail call optimizations.'
            ),
            h('p', {},
                'While I was at this, I added mutual recursion support.'
            ),
            h('p', {},
                'As AIFPL is designed to allow functional styles of programming the implementation also developed a series of higher order ' +
                'functions (e.g. ', h('code', {}, 'map'), ', ', h('code', {}, 'filter'), ').'
            ),
            h('p', {},
                'One interesting thing that emerged was just how many Python behaviours had seeped into the original design and that were ' +
                'causing problems. The python notion of "truthiness" was a problem.'
            ),
            h('p', {},
                'As we were clearing up the code, we also implemented lazy evaluation forms form ', h('code', {}, 'and'), ' and ', h('code', {}, 'or'), ', to match with the previous ' +
                'lazy ', h('code', {}, 'if'), '.'
            ),
            h('p', {},
                'Had Claude write me extensive unit tests for the new language. This found and flushed out quite a lot of subtle issues.'
            )
        )
    ];
}

export const notesPost_2025_09_18 = new NotesPost(
    '2025-09-18: Daily notes and more AIFPL',
    '2025-09-18',
    '/notes/2025-09-18',
    'Daily notes and more AIFPL',
    null,
    null,
    notesOpening_2025_09_18,
    notesArticle_2025_09_18,
    null
);
