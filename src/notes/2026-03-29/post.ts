import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_29(): VElement[] {
    return [
        h('p', {},
            'The Menai cython VM was a temporary measure.  Today was the time to remove it fully!'
        )
    ];
}

function notesArticle_2026_03_29(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Native C VM for Menai'),
            h('p', {},
                'Today we got a first-pass native VM for Menai.  Unlike the cython version, this one is straight C and doesn\'t do weird ' +
                'things to fit sort-of inside the Python implementation.'
            ),
            h('p', {},
                'This isn\'t to say this version is perfect, but it gets rid of a lot of legacy intermediate code.'
            ),
            h('p', {},
                'Claude did do weird things and introduced a ton of very awkward macros, but a few hours of nudging it resulted in static ' +
                'inline code instead.'
            ),
            h('p', {},
                'The results are amazing though!  We are 1.33x to 1.66x faster.'
            ),
            CodeFragment.create({
                code: `$ [21:05:01 ~/github/m6r/humbug/tools/menai/tests] python profile_list_sort.py
Menai sort-list benchmark
==================================================
Menai file  : /Users/dave/github/m6r/humbug/tools/menai/tests/list-sort.menai
Sizes       : [10, 50, 100, 250, 500, 1000, 2000]
Iterations  : 10 per size
Random seed : 42

    Size    Mean (s)     Min (s)       Items/s  Status
------------------------------------------------------------
      10      0.0006      0.0006       15889.5  ✓
      50      0.0020      0.0017       25559.2  ✓
     100      0.0035      0.0032       28550.3  ✓
     250      0.0082      0.0081       30622.5  ✓
     500      0.0174      0.0168       28706.6  ✓
    1000      0.0368      0.0359       27208.0  ✓
    2000      0.0817      0.0806       24481.9  ✓

Summary:
  Scaling from 1000 → 2000 items: 2.22x slower (2.0x more items)
  Expected for O(n log n): ~2.20x`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `$ [21:21:56 ~/github/m6r/humbug/tools/menai/tests] python profile_sudoku_solver.py --difficulty easy --profile
Menai sudoku solver benchmark
========================================================================
Difficulty  : up to easy  (1 puzzle(s))
Repeat      : 3x per puzzle

Puzzle                            Reps   Total (s)   Per run (ms)  Status
------------------------------------------------------------------------
Easy (36 givens)                     3      0.9204         306.80  ✓ solved

Profiling puzzle: Easy (36 givens)
====================================================================================================
✓ Solved successfully

====================================================================================================
PROFILING RESULTS (Top 40 functions, sorted by cumulative)
====================================================================================================
         112460 function calls (105070 primitive calls) in 0.325 seconds

   Ordered by: cumulative time
   List reduced from 303 to 40 due to restriction <40>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.327    0.327 /Users/dave/github/m6r/humbug/src/menai/menai.py:1159(evaluate)
        1    0.000    0.000    0.327    0.327 /Users/dave/github/m6r/humbug/src/menai/menai.py:1142(_evaluate_raw)
        1    0.000    0.000    0.306    0.306 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:357(execute)
        1    0.303    0.303    0.303    0.303 {built-in method menai.menai_vm_c.execute}
        1    0.000    0.000    0.020    0.020 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
    657/1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `$ [21:04:54 ~/github/m6r/humbug/tools/menai/tests] python profile_rubiks_cube.py
Profiling: test-rubiks-cube.menai
====================================================================================================
Expression length: 583 characters
====================================================================================================

Running test with profiler enabled...

✓ Test completed successfully
Result: Solution found! Moves: R' F' D' R U' R'

====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         510540 function calls (474216 primitive calls) in 0.930 seconds

   Ordered by: cumulative time
   List reduced from 333 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.934    0.934 /Users/dave/github/m6r/humbug/src/menai/menai.py:1159(evaluate)
        1    0.000    0.000    0.934    0.934 /Users/dave/github/m6r/humbug/src/menai/menai.py:1142(_evaluate_raw)
        1    0.000    0.000    0.850    0.850 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:357(execute)
        1    0.838    0.838    0.838    0.838 {built-in method menai.menai_vm_c.execute}
        1    0.000    0.000    0.085    0.085 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.025    0.025 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_29 = new NotesPost(
    '2026-03-29: Replacing the Menai cython VM with C',
    '2026-03-29',
    '/notes/2026-03-29',
    'The Menai cython VM has been replaced with a native C VM, resulting in 1.33x to 1.66x performance improvements. The new implementation eliminates awkward macros in favour of static inline code and removes a lot of legacy intermediate code.',
    null,
    null,
    notesOpening_2026_03_29,
    notesArticle_2026_03_29,
    null
);
