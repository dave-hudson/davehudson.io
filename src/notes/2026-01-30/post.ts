import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_01_30(): VElement[] {
    return [
        h('p', {},
            'I\'ve been diving down the rabbit hole again...'
        )
    ];
}

function notesArticle_2026_01_30(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'This is Lisp-y, not Python-ish'),
            h('p', {},
                'While working on the AIFPL lexer, I discovered the AI had introduced Python-style binary, octal, and hexadecial numeric ' +
                'literals - e.g. ', h('code', {}, '0xff'), ' or ', h('code', {}, '0b00101'), '.  We need Lisp-style - e.g. ', h('code', {}, '#xff'), ' or ', h('code', {}, '#b00101'), ', so fixed that and fixed the broken ' +
                'tests.'
            ),
            h('p', {},
                'Sometimes I\'m very happy that this is a language designed for AIs, as they don\'t tend to complain about reworking things!'
            )
        ),
        h('section', {},
            h('h2', {}, 'More passes'),
            h('p', {},
                'I\'d originally hoped to keep the number of passes in the compiler quite small, but I\'ve rapidly realised that just leads ' +
                'to hugely complex logic.'
            ),
            h('p', {},
                'Back when I was building ', h('code', {}, 'gcc'), ' backends for Ubicom8 and Ubicom32 ISAs I wouldn\'t really worry about adding new passes, so ' +
                'I\'m not sure it would really make sense to start now, when compute is cheaper and faster anyway!'
            ),
            h('p', {},
                'A dive into the code coverage for the compiler showed that both the desugaring pass, and the compiler were both checking ' +
                'all the same semantic correctness.  That\'s clearly a bit pointless and led to lots of unreachable code.'
            ),
            h('p', {},
                'Looking at things with a separation of concerns perspective the best bet was to add a new semantic analyzer pass that checks ' +
                'everything before either of these run.'
            )
        ),
        h('section', {},
            h('h2', {}, 'The "keep the interpreter going" comment went very stale'),
            h('p', {},
                'Two days ago I thought I\'d keep both the interpreter and the compiler running alongside each other.  This seemed like a good ' +
                'way to compare results, but after a very short time it was becoming clear this would be a nuissance to maintain feature ' +
                'parity.'
            ),
            h('p', {},
                'One of the things I\'ve been looking at is how to add a module system to AIFPL.  The designs look very good, but implementing ' +
                'them in the interpreter will be painful because they\'d incur a lot of dynamic lookup costs.'
            ),
            h('p', {},
                'With that, wave goodbye to the interpreter - the compiler is now the only game in town!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance testing'),
            h('p', {},
                'As we\'ve got quite a complex system I wanted to be able to compare performance numbers.  Claude helpfully built a revised ' +
                'benchmark suite that can be parameterized for numbers of test runs.  It captures the total time to complile and run the code.'
            ),
            h('p', {},
                'This was also another reason the interpreter went away.  I discovered that in many cases the compiler was now both ' +
                'compiling and running code faster than the interpreter could interpret it.  This was true even for quite simple code.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Optimization passes'),
            h('p', {},
                'Even before we get to any form of intermediate representation (IR), and while we\'re still dealing with the AST, Claude ' +
                'convinced me to add a constant folding optimization.'
            ),
            h('p', {},
                'On the somewhat synthetic cases it put together this resulted in a 37% reduction in instructions, but tellingly, the total ' +
                'time to compile and run my benchmarks went from about 1.25s (for the quick benchmark) to 1.3s.  This might seem bad, but ' +
                'the runtime performance improved by about 10% on average!'
            ),
            h('p', {},
                'This took less than an hour to build!  It did take several more hours to clean up the implementation so it was both correct ' +
                'and fast!'
            ),
            h('p', {},
                'There\'s actually scope to improve this first optimization pass as it\'s not yet optimizing any string or alist operations!'
            )
        )
    ];
}

export const notesPost_2026_01_30 = new NotesPost(
    '2026-01-30: Augmenting AIFPL',
    '2026-01-30',
    '/notes/2026-01-30',
    'Augmenting AIFPL',
    null,
    null,
    notesOpening_2026_01_30,
    notesArticle_2026_01_30,
    null
);
