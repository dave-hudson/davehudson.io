import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_27(): VElement[] {
    return [
        h('p', {},
            'After quite a lot of thought I\'m planning to retire Metaphor.  Claude and I have been doubling down on Menai, however and ' +
            'that just got a nice performance boost!'
        )
    ];
}

function notesArticle_2026_03_27(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Retiring Metaphor'),
            h('p', {},
                'Metaphor was designed as a language to help structure context for large language models.  It allowed for creating large, ' +
                'content-heavy, prompts that would let LLMs do highly complex tasks, even from a web chat window.'
            ),
            h('p', {},
                'The introduction of agentic AI, however, rendered this far less interesting.  LLMs can now dynamically discover whatever ' +
                'context they need, and using content from many different types of files.'
            ),
            h('p', {},
                'Another aspect of Metaphor\'s design was to capture a role that we wanted an LLM to undertake, but it\'s clear that ' +
                'state-of-the-art LLMs no longer really benefit from this.  If anything, there\'s now evidence this can hurt results.'
            ),
            h('p', {},
                'While it might be tempting to leave Metaphor in place, I think it\'s time to retire it.  It served a valuable role in helping ' +
                'build Humbug, but there\'s not much point in leaving it in place where it no longer has much use.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance improvements for Menai'),
            h('p', {},
                'Claude and I started optimizing the Menai VM.  The first step was to create fixed-size (64-bit) instructions and to process ' +
                'them in an array, rather than using ',
                h('code', {}, 'Instruction'),
                ' objects.  This is much more cache friendly.'
            ),
            h('p', {},
                'The results are in the range of 1.5x to 2x faster than before.'
            ),
            CodeFragment.create({
                code: `(venv) $ [16:00:50 ~/github/m6r/humbug/tools/menai/tests] python profile_list_sort.py
Menai sort-list benchmark
==================================================
Menai file  : /Users/dave/github/m6r/humbug/tools/menai/tests/list-sort.menai
Sizes       : [10, 50, 100, 250, 500, 1000, 2000]
Iterations  : 10 per size
Random seed : 42

    Size    Mean (s)     Min (s)       Items/s  Status
------------------------------------------------------------
      10      0.0006      0.0006       16479.7  ✓
      50      0.0021      0.0020       24079.4  ✓
     100      0.0042      0.0041       24015.0  ✓
     250      0.0108      0.0106       23175.7  ✓
     500      0.0228      0.0226       21890.7  ✓
    1000      0.0493      0.0486       20286.8  ✓
    2000      0.1086      0.1076       18419.1  ✓

Summary:
  Scaling from 1000 → 2000 items: 2.20x slower (2.0x more items)
  Expected for O(n log n): ~2.20x`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `(venv) $ [16:00:54 ~/github/m6r/humbug/tools/menai/tests] python profile_sudoku_solver.py --difficulty easy
Menai sudoku solver benchmark
========================================================================
Difficulty  : up to easy  (1 puzzle(s))
Repeat      : 3x per puzzle

Puzzle                            Reps   Total (s)   Per run (ms)  Status
------------------------------------------------------------------------
Easy (36 givens)                     3      1.6158         538.59  ✓ solved`,
                language: 'text'
            }),
            CodeFragment.create({
                code: `(venv) $ [16:01:12 ~/github/m6r/humbug/tools/menai/tests] python profile_rubiks_cube.py
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
         510540 function calls (474216 primitive calls) in 1.544 seconds

   Ordered by: cumulative time
   List reduced from 331 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    1.548    1.548 /Users/dave/github/m6r/humbug/src/menai/menai.py:1159(evaluate)
        1    1.451    1.451    1.548    1.548 /Users/dave/github/m6r/humbug/src/menai/menai.py:1142(_evaluate_raw)
        1    0.000    0.000    0.086    0.086 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_27 = new NotesPost(
    '2026-03-27: Retiring Metaphor and improving Menai',
    '2026-03-27',
    '/notes/2026-03-27',
    'Metaphor is being retired as agentic AI has made it obsolete, while Menai gets a significant performance boost of 1.5x to 2x through fixed-size 64-bit instructions processed in arrays for better cache friendliness.',
    null,
    null,
    notesOpening_2026_03_27,
    notesArticle_2026_03_27,
    null
);
