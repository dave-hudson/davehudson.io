import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_01_31(): VElement[] {
    return [
        h('p', {},
            'My token-fueled rampage through a new compiler continues...'
        )
    ];
}

function notesArticle_2026_01_31(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Mutual TCO wasn\'t working'),
            h('p', {},
                'I decided to chat with GLM-4.7 about AIFPL.  It had some interesting thoughts, but when it went to play with the language ' +
                'to try out some ideas it discovered mutual TCO wasn\'t working!'
            ),
            h('p', {},
                'I sort of knew this but had forgotten.'
            ),
            h('p', {},
                'My first instinct was that given GLM had found the problem then maybe it could debug it.  It did some thoughtful analysis ' +
                'and wrote a doc about it.  It then tried to fix things:'
            ),
            h('ul', {},
                h('li', {}, 'Couldn\'t work out ', h('code', {}, 'tuple'), ' syntax correctly'),
                h('li', {}, 'Wandered down a rabbit hole where it failed completely to fix the ', h('code', {}, 'tuple'), ' problem'),
                h('li', {}, 'Tried to apply the same net-nothing diff 4 times in a row'),
                h('li', {}, 'Created syntax issues it couldn\'t resolve')
            ),
            h('p', {},
                'Sadly, it\'s not Claude!'
            ),
            h('p', {},
                'Claude read the doc, said "section 1 is completely wrong", and then proposed a more nuanced and simpler approach.  I nudged ' +
                'it by saying "maybe we can add a special opcode to handle function calls in the tail position in a function" and "let\'s do ' +
                'this TDD and write failing tests first".  Off it went and 75 minutes later mutual TCO is now working nicely, plus we have ' +
                'an extra 22 unit tests to flex this.'
            )
        ),
        h('section', {},
            h('h2', {}, 'General TCO'),
            h('p', {},
                'Having made TCO work for mutual recursion, I returned to a problem I\'d posed last weekend around a more general form of TCO ' +
                'that would handle all tail calls.'
            ),
            h('p', {},
                'This time, probably because of context and the more narrow scope of the problem, Claude redesigned all this logic.  It\'s ' +
                'actually smaller now and eliminates weird "dual" behaviours in the opcodes.'
            ),
            h('p', {},
                'The final elegant step was to handle return values for builtins in a cleaner way so even they don\'t need to have a ', h('code', {}, 'RETURN'), ' ' +
                'opcode after them if they appear in a tail position.'
            )
        ),
        h('section', {},
            h('h2', {}, 'How not to build a compiler'),
            h('p', {},
                'Last weekend I tried to build a 2-pass compiler to replace the then 1-pass compiler.  I did it twice and failed dismally.'
            ),
            h('p', {},
                'Claude was a willing but ultimately unhelpful collaborator.'
            ),
            h('p', {},
                'I tried something slightly simpler again today and got the same failure.  This time I wanted to split the compiler pass ' +
                'into an analyzer and code generator.'
            ),
            h('p', {},
                'Failing to learn from last weekend, I allowed Claude to build a new analyzer from scratch:'
            ),
            h('ul', {},
                h('li', {}, 'It took 2 hours to get to something that almost worked (2 test regressions)'),
                h('li', {}, 'The plan was to simplify the code but we went from 1000 lines of code to almost 1500'),
                h('li', {}, 'The new code was even more complicated than its predecessor')
            ),
            h('p', {},
                'The lesson here is to insist the AI starts from what\'s there already.  As a human developer would do, we need to tease things ' +
                'apart and create an API separation before rebuilding!'
            )
        ),
        h('section', {},
            h('h2', {}, 'How to actually build a compiler'),
            h('p', {},
                'Having learned my lesson, getting Claude split the compiler into an analysis phase and a code generator was surprisingly ' +
                'straightforward.  The net increase in size was 120 lines of code, but there\'s 126 lines of class definitions for the new ' +
                'interface so that was a huge win!  Importantly, this one was pretty-much a one-shot implementation.'
            ),
            h('p', {},
                'As with many elegant refactorings, this one led to a cascade of other changes and simplifications:'
            ),
            h('ul', {},
                h('li', {}, 'The newly simplified logic finally let us implement lookups in parent frames, and with that we could remove the 2 icky runtime patching opcodes!'),
                h('li', {}, h('code', {}, 'LOAD_NAME'), ' could be simplified to just doing global loads (e.g. builtin functions and constants).  This is both much simpler and faster.'),
                h('li', {}, 'With no need to look up anything in dynamic environments we could remove the environment concept that had originally supported the tree-walking interpreter.')
            ),
            h('p', {},
                'By the time all these and a bunch of consequent other dead code eliminations have had happened things had improved on ' +
                'the performance side too.  My profiler benchmark dropped from about 1.28s to 1.235s'
            )
        ),
        h('section', {},
            h('h2', {}, 'I wanted at 2-pass compiler, but I got 7'),
            h('p', {},
                'My original though (last weekend) was to get a 2-pass compiler, but in practice this really meant 4.  I wanted lexing, ' +
                'parsing, code analysis, and code gen.'
            ),
            h('p', {},
                'A week later I\'m now at: lexing, parsing, semantic analysis, desugaring, constant folding, IR building, and code gen.'
            ),
            h('p', {},
                'What\'s more interesting is I was able to use AI to find and refactor things at amazing speed and while building both tests ' +
                'and analytical tools that mean I can now engage with a lot more features tomorrow!'
            )
        )
    ];
}

export const notesPost_2026_01_31 = new NotesPost(
    '2026-01-31: AIFPL again, again...',
    '2026-01-31',
    '/notes/2026-01-31',
    'AIFPL again, again...',
    null,
    null,
    notesOpening_2026_01_31,
    notesArticle_2026_01_31,
    null
);
