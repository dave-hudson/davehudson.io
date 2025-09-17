import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_17(): VElement[] {
    return [
        h('p', {},
            'A few weeks ago I had a random thought that maybe I could implement the current calculator code with something more ' +
            'powerful.'
        )
    ];
}

function notesArticle_2025_09_17(): VElement[] {
    return [
        h('section', {},
            h('p', {},
                'The current calculator was originally code around the Python ', h('code', {}, 'eval'), ' function but that was very much unsafe. To make it ' +
                'safe I had Claude build a custom expression evaluator instead.'
            ),
            h('p', {},
                'As a model, this approach had worked really well, but I\'ve been thinking a lot about future capabilities and it ' +
                'occurred to me that they will likely need support for more general purpose programming. Trying to do this as a subset ' +
                'of Python seemed like a bad idea because Python is designed to be procedural and so building "functional" Python seemed ' +
                'like it would be overly-complex.'
            ),
            h('p', {},
                'The reason I\'m interested in creating something functional, as opposed to procedural, is because I want a language that ' +
                'an LLM can use to safely build quite complex logic, but where it does not have any means to express side effects that ' +
                'might in turn lead to a security risk. Instead, this language would be designed to only allow a single input (an ' +
                'expression to be evaluated), and a single output (the result of the evaluation). These aspects would be provided to ' +
                'the interpreter (and potentially a compiler in the future) by an LLM during a tool call, and returned to it in the ' +
                'tool response.'
            ),
            h('p', {},
                'I couldn\'t think of a nice name for this (unlike Metaphor), so this is the uninspiring name "AIFPL", short for AI ' +
                'functional programming language.'
            ),
            h('p', {},
                'The language is S-expression-based and works as a very simplified Scheme (Lisp).'
            ),
            h('p', {},
                'The absolutely insane thing has been to watch how fast the LLM has built me this language. To get to functional parity ' +
                'with the original calculator tool took about 30 minutes. We\'ve now moved way past that and have added string operations, ' +
                'booleans, and lists. We\'ve also got conditionals with lazy evaluation.'
            ),
            h('p', {},
                'At each point there was a discussion with the AI about the design choices that I wanted to make and why, and it ' +
                'continuously updated the language spec and the AI tool description!'
            ),
            h('p', {},
                'While I\'ve not yet put in place the test framework, the LLM has generated a series of point test programs to check things ' +
                'are working correctly, and then to fix them where they weren\'t right.'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-09-17/debugging.webp',
                    alt: 'Claude running a test program, then fixing the faults',
                }),
                h('figcaption', {},
                    'Claude running a test program, then fixing the faults'
                )
            )
        )
    ];
}

export const notesPost_2025_09_17 = new NotesPost(
    '2025-09-17: AIFPL: an AI functional programming language',
    '2025-09-17',
    '/notes/2025-09-17',
    'A few weeks ago I had a random thought that maybe I could implement the current calculator code with something more powerful.',
    null,
    null,
    notesOpening_2025_09_17,
    notesArticle_2025_09_17,
    null
);
