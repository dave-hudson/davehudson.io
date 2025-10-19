import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_10_19(): VElement[] {
    return [
        h('p', {},
            'Achieving 100% test coverage on AIFPL and building a patching utility with it'
        )
    ];
}

function notesArticle_2025_10_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Experience using AIFPL'),
            h('p', {},
                'I\'ve been incrementally giving AIFPL 100% test coverage over all statements and branches for the last week and earlier ' +
                'this week I got to that magic point!'
            ),
            h('p', {},
                'What was interesting was finding that even the last 2 lines of code that weren\'t tested did expose an interesting edge ' +
                'case bug.  The code in question handled control characters that weren\'t interpreted as whitespace appearing in the input ' +
                'text.  This turned out to expose a subtle bug in the tokenizer.'
            ),
            h('p', {},
                'Armed with my new toy, I then set about having an LLM build something interesting with it.  As I need this for Humbug ' +
                'anyway, I decided an interesting project would be to build a patching utility.  The idea was to handle unified diffs ' +
                'and be able to patch a source file.  Essentially this would be a simple version of the Unix `patch` tool.'
            ),
            h('p', {},
                'As AIFPL has no I/O, Claude built me an I/O capability and CLI in Python, but then added bridging logic to use a pure ' +
                'functional engine written in AIFPL.  This is now working, and can be found in `src/tools/patch`, but exposed some ' +
                'unexpected headaches.'
            )
        ),
        h('section', {},
            h('h3', {}, 'LLMs can\'t count parenthesis'),
            h('p', {},
                'The first big problem I ran into was getting an LLM to debug Lispy code.  They\'re quite good at writing it, but if they ' +
                'have written some deep nesting then this can result in a lot of closing parentheses.  The problem is that LLMs are really ' +
                'bad at counting parts of tokens they use.  Famously, they can\'t count the numbers of the letter "r" in "strawberry", usually ' +
                'say there are 2 and not 3.'
            ),
            h('p', {},
                'This same problem is exhibited when we get quite deeply nested AIFPL code.  If we have ")))))))))))))))))" then an LLM is ' +
                'very unlikely to decide there are 17 closing parentheses!'
            ),
            h('p', {},
                'This makes debugging Lisp-like syntax almost impossible as once an LLM has made a mistake it can\'t recover from its ' +
                'inability to count parens.'
            ),
            h('p', {},
                'I tried quite a few different approaches to this.  One was to try separating closing parens and putting them on separate ' +
                'lines.  Another was to insist on spaces between the closign parens.  The problem is neither of these really work as LLMs ' +
                'are still not great at counting.  Instead we need to give them tools to count!  Ironically AIFPL is designed to give ' +
                'exactly this sort of tool, it\'s just it wasn\'t being used.'
            )
        ),
        h('section', {},
            h('h3', {}, 'A new approach'),
            h('p', {},
                'The new approach I\'m taking is to have the AIFPL parser do a much more detailed analysis of parentheses and any mismatches. ' +
                'Instead of leaving the LLM to guess what\'s wrong, instead we have the parser provide a more detailed analsysis ' +
                'automatically.'
            ),
            h('p', {},
                'Let\'s see how this works!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Claude Haiku 4.5'),
            h('p', {},
                'Added support for Claude Haiku 4.5.  This appears to be a very strong coding model, very fast, and 3x cheaper than Claude ' +
                'Sonnet 4.5.  Will evaluate over the next few days.'
            )
        )
    ];
}

export const notesPost_2025_10_19 = new NotesPost(
    '2025-10-19: Using AIFPL',
    '2025-10-19',
    '/notes/2025-10-19',
    'Achieving 100% test coverage on AIFPL and building a patching utility with it',
    null,
    null,
    notesOpening_2025_10_19,
    notesArticle_2025_10_19,
    null
);
