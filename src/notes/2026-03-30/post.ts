import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_30(): VElement[] {
    return [
        h('p', {},
            'Having built a native C VM it\'s time to make it faster!'
        )
    ];
}

function notesArticle_2026_03_30(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the native C VM for Menai'),
            h('p', {},
                'We\'re still at the easy win stage with the C VM.  We have Python data structures being accessed in fairly inefficient ways ' +
                'from C, and we have a ton of pointer chasing.'
            ),
            h('p', {},
                'It also turns out Claude was too defensive about quite a few things it did in the initial C implementation.'
            ),
            h('p', {},
                'Fixed these and gained around 1.05x to 1.3x depending on the workload.'
            ),
            h('p', {},
                'Putting this in perspective.  Our Rubik\'s cube solver is now about 4x faster than the Cython VM from 16 days ago, and about ' +
                '10x faster than the Python VM was on the same day.'
            ),
            CodeFragment.create({
                code: `Menai sort-list benchmark
==================================================
Menai file  : /Users/dave/github/m6r/humbug/tools/menai/tests/list-sort.menai
Sizes       : [10, 50, 100, 250, 500, 1000, 2000]
Iterations  : 10 per size
Random seed : 42

    Size    Mean (s)     Min (s)       Items/s  Status
------------------------------------------------------------
      10      0.0006      0.0006       15691.3  ✓
      50      0.0019      0.0018       26720.0  ✓
     100      0.0032      0.0032       30809.7  ✓
     250      0.0079      0.0078       31476.7  ✓
     500      0.0168      0.0161       29849.0  ✓
    1000      0.0350      0.0343       28569.0  ✓
    2000      0.0782      0.0771       25581.5  ✓

Summary:
  Scaling from 1000 → 2000 items: 2.23x slower (2.0x more items)
  Expected for O(n log n): ~2.20x`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `$ [8:23:05 ~/github/m6r/humbug/tools/menai/tests] python profile_sudoku_solver.py --difficulty easy --profile
Menai sudoku solver benchmark
========================================================================
Difficulty  : up to easy  (1 puzzle(s))
Repeat      : 3x per puzzle

Puzzle                            Reps   Total (s)   Per run (ms)  Status
------------------------------------------------------------------------
Easy (36 givens)                     3      0.7120         237.35  ✓ solved

Profiling puzzle: Easy (36 givens)
====================================================================================================
✓ Solved successfully

====================================================================================================
PROFILING RESULTS (Top 40 functions, sorted by cumulative)
====================================================================================================
         112460 function calls (105070 primitive calls) in 0.260 seconds

   Ordered by: cumulative time
   List reduced from 303 to 40 due to restriction <40>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.261    0.261 /Users/dave/github/m6r/humbug/src/menai/menai.py:1159(evaluate)
        1    0.000    0.000    0.261    0.261 /Users/dave/github/m6r/humbug/src/menai/menai.py:1142(_evaluate_raw)
        1    0.000    0.000    0.239    0.239 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:357(execute)
        1    0.236    0.236    0.236    0.236 {built-in method menai.menai_vm_c.execute}
        1    0.000    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
    657/1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
    864/4    0.000    0.000    0.006    0.002 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai.py:1292(load_module)`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `$ [8:24:52 ~/github/m6r/humbug/tools/menai/tests] python profile_rubiks_cube.py
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
         510541 function calls (474217 primitive calls) in 0.722 seconds

   Ordered by: cumulative time
   List reduced from 333 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.727    0.727 /Users/dave/github/m6r/humbug/src/menai/menai.py:1159(evaluate)
        1    0.000    0.000    0.727    0.727 /Users/dave/github/m6r/humbug/src/menai/menai.py:1142(_evaluate_raw)
        1    0.000    0.000    0.642    0.642 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:357(execute)
        1    0.631    0.631    0.631    0.631 {built-in method menai.menai_vm_c.execute}
        1    0.000    0.000    0.084    0.084 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.023    0.023 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
   2367/1    0.001    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3095/4    0.000    0.000    0.022    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_30 = new NotesPost(
    '2026-03-30: Optimizing the Menai VM',
    '2026-03-30',
    '/notes/2026-03-30',
    'Optimizing the native C VM for Menai by fixing inefficient Python data structure access patterns, reducing pointer chasing, and addressing overly defensive code from the initial C implementation. Gains of 1.05x to 1.3x depending on workload, with the Rubik\'s cube solver now about 4x faster than the Cython VM and 10x faster than the original Python VM.',
    null,
    null,
    notesOpening_2026_03_30,
    notesArticle_2026_03_30,
    null
);
