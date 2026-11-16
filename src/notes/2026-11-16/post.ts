import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_16(): VElement[] {
    return [
        h('p', {},
            'Menai v0.10 is out.  It continues the trend of making things faster, and of making it easier to see ',
            'where the time is going.  Overall it\'s in the range of 0%-30% faster than v0.9, with a median of ',
            'about 10% on the benchmark suite.'
        )
    ];
}

function notesArticle_2026_11_16(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai v0.10'),
            h('p', {},
                'Menai v0.10 continues the general trend of making things faster, and making it easier to see where time is ',
                'being spent.  Overall this is in the range of 0%-30% faster than v0.9, with a median of about 10% on the ',
                'benchmark suite.'
            ),
            h('h3', {}, 'New features'),
            h('ul', {},
                h('li', {},
                    'Added a ',
                    h('code', {}, '--width N'),
                    ' option to ',
                    h('code', {}, 'menai-eval'),
                    ', ',
                    h('code', {}, 'menai-test'),
                    ', ',
                    h('code', {}, 'menai-benchmark'),
                    ', ',
                    h('code', {}, 'menai-pipeline'),
                    ', and ',
                    h('code', {}, 'menai-disassemble'),
                    '.  Output is no longer clipped by default.  When a width is given, lines longer than that width ',
                    'are clipped.  This keeps long function names and constants visible unless the caller asks for a ',
                    'fixed width.'
                ),
                h('li', {},
                    'Added bytecode instruction coverage.  ',
                    h('code', {}, 'menai-eval --coverage'),
                    ' reports how much of a program\'s compiled bytecode executed.  ',
                    h('code', {}, 'menai-test --coverage'),
                    ' and ',
                    h('code', {}, 'menai-benchmark --coverage'),
                    ' merge coverage across all selected test files or benchmark suites and cases, counting each ',
                    'function once by source identity, so the report shows how much of the library was exercised ',
                    'across all scenarios.  Unexercised functions are reported with 0% coverage.'
                ),
                h('li', {},
                    h('code', {}, '#none'),
                    ', the booleans, fixnum integers and most floats are now immediate values held in the ',
                    h('code', {}, 'MenaiValue'),
                    ' word rather than pool objects.  They are never allocated or reference counted, and the ',
                    'small-integer cache is gone.  Mean performance gain of about 6%.'
                ),
                h('li', {}, 'Added a new branch fact CFG optimization to eliminate more dead code.'),
                h('li', {},
                    'Added a CFG pass that folds an enum switch whose scrutinee is a statically-known variant into a ',
                    'jump to the selected arm.  This deletes a mode dispatch that inlining has made static, and the ',
                    'arms it makes unreachable are never emitted.'
                ),
                h('li', {},
                    'A type guard shared by several blocks is now placed once, in the block that dominates every use, ',
                    'rather than repeated in each; the copy in a loop\'s continue block no longer executes once per ',
                    'iteration.'
                ),
                h('li', {},
                    'An ',
                    h('code', {}, 'apply'),
                    '\'s result now carries the return type of the functions it may call, so a field read on an ',
                    'applied function\'s result can resolve to a constant index.'
                ),
                h('li', {}, 'Improved inlining of functions (gain of just over 0.3%).'),
                h('li', {},
                    'A type guard now names the type it required, e.g. ',
                    h('code', {}, 'type mismatch: expects a bytes value'),
                    ', rather than a bare ',
                    h('code', {}, 'type mismatch'),
                    '.'
                )
            ),
            h('h3', {}, 'Bug fixes'),
            h('ul', {},
                h('li', {}, 'Fixed a Unicode parsing error in the JSON decoder library.'),
                h('li', {}, 'Resolved a problem with opcode type signatures being incorrect.'),
                h('li', {},
                    'Fixed a memory-safety bug in the VM: enum values and enum type descriptors were not marked by ',
                    'the garbage collector, so an enum\'s type descriptor, and an enum type\'s name and variant names, ',
                    'could be freed while still reachable.'
                ),
                h('li', {},
                    'Fixed two LICM hoisting faults: a type guard could be hoisted above the check its operand ',
                    'depended on, and an instruction could be hoisted above the definition of an operand that is ',
                    'only computed inside the loop.'
                )
            )
        )
    ];
}

export const notesPost_2026_11_16 = new NotesPost(
    '2026-11-16: Menai v0.10',
    '2026-11-16',
    '/notes/2026-11-16',
    '2026-11-16: Menai v0.10 - 0%-30% faster than v0.9 (median ~10%), with output width control, bytecode instruction coverage, immediate values for #none, booleans and numbers, new CFG optimizations, and a VM garbage collection fix.',
    null,
    null,
    notesOpening_2026_11_16,
    notesArticle_2026_11_16,
    null
);
