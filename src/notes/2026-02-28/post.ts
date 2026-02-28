import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_02_28(): VElement[] {
    return [
        h('p', {},
            'Yesterday afternoon and today, I\'ve been busy optimizing the Menai compiler.  Having worked on ',
            h('code', {}, 'gcc'),
            ' for many years I knew I enjoyed doing this, but doing this with an AI assistant takes it to a whole new level!'
        )
    ];
}

function notesArticle_2026_02_28(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai?'),
            h('p', {},
                'Yes, "Menai", in honour of the part of North Wales I lived in for a while where I could see the Menai Straits ' +
                'and where my favourite bit of civil engineering is: The Menai Bridge.  Menai is much easier to say than "AIFPL" ' +
                'and I rather like that it ends with "ai" :-)'
            )
        ),
        h('section', {},
            h('h2', {}, 'Adding a "None" type'),
            h('p', {},
                'One of the more interesting quirks of programming languages is knowing what to call "nothing at all".  Up until ' +
                'now, I\'d been using ',
                h('code', {}, '#f'),
                ' to signal that there was no result from a function call (e.g. it didn\'t find anything useful), but it turns out ' +
                'that\'s a problem if the actual result might want to be ',
                h('code', {}, '#f'),
                '.'
            ),
            h('p', {},
                'To solve this Claude and I added a new "None" type.'
            ),
            h('p', {},
                'This immediately triggered an interesting latent bug in the ',
                h('code', {}, 'match'),
                ' logic.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Fixing match'),
            h('p', {},
                'The problem was we\'ve tightened up the type system, but ',
                h('code', {}, 'match'),
                ' was desugaring some tests to:'
            ),
            CodeFragment.create({language: 'menai', code:
`(integer?= temp-var 42)`
            }),
            h('p', {},
                'If ',
                h('code', {}, 'temp-var'),
                ' was not of the correct type then this would now throw an assertion!  The test cases never tried this.'
            ),
            h('p', {},
                'The solution was to change this to:'
            ),
            CodeFragment.create({language: 'menai', code:
`(and (integer? temp-var) (integer=? temp-var 42))`
            }),
            h('p', {},
                'This works correctly, but if we have a lot of literal integers that short-circuit ',
                h('code', {}, 'and'),
                ' adds an awful lot of calls to ',
                h('code', {}, 'integer?'),
                '.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Optimizing the revsied match'),
            h('p', {},
                'The first attempt at this looked good.  The logic was to write a new pass that tracked the type of any variable ' +
                'and then use this to eliminate redundant type checks if they were spotted.'
            ),
            h('p', {},
                'Took about 30 minutes to build and looked good on the initial test but then failed dismally in practice.  The ' +
                'problem was the type analysis was being reset too often and was thus not even really useful in most instances of ' +
                'the ',
                h('code', {}, 'match'),
                ' problem.  It only worked for trivial versions of the problem.'
            ),
            h('p', {},
                'The interesting thing, however, was the new code was generating an ',
                h('code', {}, 'and'),
                ' and this was going downstream to the next layers.  This in turn meant each successive layer was doing special ' +
                'analysis for the ',
                h('code', {}, 'and'),
                ' and ',
                h('code', {}, 'or'),
                ' special forms, but then it hit me that this was silly!  ',
                h('code', {}, 'and'),
                ' and ',
                h('code', {}, 'or'),
                ' should be desugared into nested ',
                h('code', {}, 'if'),
                ' operations!'
            ),
            h('p', {},
                'This removed a lot of code, but still didn\'t do anything for the ',
                h('code', {}, 'match'),
                ' problem.  It did, however, demonstrate just how many special forms are not actually required in the language - ' +
                'they\'re just there to make it easier to write!'
            ),
            h('p', {},
                'The solution (after a few hours of trying things out) was to make the desugaring process do things better!  ' +
                'Rather than emit rubbish and try to fix it later, the key was to group match patterns that shared a type ' +
                'predicate, share the type check between all of them, and then do the value check.  Sort of obvious in hindsight!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Minor optimizations'),
            h('p', {},
                'Reading the bytecode I notice a few places where there were obvious opportunities to improve things.  The ',
                h('code', {}, 'LOAD_TRUE'),
                ' and ',
                h('code', {}, 'LOAD_FALSE'),
                ' opcodes had only been used in ',
                h('code', {}, 'match'),
                ' desugaring, but they should have been used any time we needed a boolean constant.'
            ),
            h('p', {},
                'Similarly ',
                h('code', {}, '(if (boolean-not <foo>) (then) (else))'),
                ' really needs to be ',
                h('code', {}, '(if (<foo>) (else) (then))'),
                '.'
            )
        ),
        h('section', {},
            h('h2', {}, 'IR optimizations'),
            h('p', {},
                'Menai\'s compiler uses a tree IR.  I have been debating an SSA form, but Claude has me pretty convinced this ' +
                'isn\'t going to be a win right now and that Menai\'s functional nature makes SSA much less of an advantage - ' +
                'it might even make some things harder.  This will change if we get to JIT compilation, but that\'s a way off ' +
                'yet, and we can always lower from the tree IR to SSA to make that work.'
            ),
            h('p', {},
                'The optimizers we\'ve added today are a single-use inliner that will inline ',
                h('code', {}, 'let'),
                ' bindings with exactly one use, and a copy propagator that inlines trivially-copyable ',
                h('code', {}, 'let'),
                ' bindings.'
            ),
            h('p', {},
                'Neither of these is a huge win, but both win in a number of interesting places.'
            )
        ),
        h('section', {},
            h('h2', {}, 'More analysis'),
            h('p', {},
                'What has also been interesting is to see that Claude suggested several other optimization passes but so far ' +
                'we\'ve not seen the evidence to support implementing them.'
            ),
            h('p', {},
                'This has, however, brought me to a very interesting discovery.  I\'m resigning from trying to spot optimization ' +
                'opportunities and letting Claude read the bytecode.  It\'s very fast and very insightful.  Even more impressive ' +
                'when you consider it isn\'t trained on this particular bytecode at all.'
            ),
            h('p', {},
                'I used to do this by hand, starting a terminal window and scribbling notes.  The analysis here is custom-built ' +
                'on demand and took Claude a few minutes.  It would have taken me hours and I wouldn\'t have written myself a ' +
                'pretty report!'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-02-28/screenshot1.webp', alt: 'Screenshot 1'})
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-02-28/screenshot2.webp', alt: 'Screenshot 2'})
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-02-28/screenshot3.webp', alt: 'Screenshot 3'})
            )
        )
    ];
}

export const notesPost_2026_02_28 = new NotesPost(
    '2026-02-28: I\'d forgotten how much fun it is to optimize a compiler!',
    '2026-02-28',
    '/notes/2026-02-28',
    'Optimizing the Menai compiler: adding a None type, fixing match desugaring, and IR optimizations with AI assistance.',
    null,
    null,
    notesOpening_2026_02_28,
    notesArticle_2026_02_28,
    null
);
