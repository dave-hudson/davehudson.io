import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_15(): VElement[] {
    return [
        h('p', {},
            'Menai has had ',
            h('code', {}, 'list'),
            ' and ',
            h('code', {}, 'dict'),
            ' collections, but neither of these is ideal for handling set operations.  Today we added ',
            h('code', {}, 'set'),
            '.'
        )
    ];
}

function notesArticle_2026_03_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Adding sets to Menai'),
            h('p', {},
                'Adding sets took Claude and me 2.5 hours.  This included the design analysis, the proposal for the implementation, and the ' +
                'fully tested implementation.  Some of the 2.5 hours also related to reviewing existing Menai functionality to validate ' +
                'that the proposed set design would be useful.'
            ),
            h('p', {},
                'The design has similar semantics to the other collections and also has similar higher order functions.'
            ),
            h('p', {},
                'Here\'s what we added:'
            ),
            CodeFragment.create({
                code: `; Type
(set? x)                    ; #t if x is a set
(set=? s1 s2)               ; #t if sets contain same elements (order-insensitive)
(set!=? s1 s2)

; Construction
(set e1 e2 ...)             ; construct a set from elements (variadic, deduplicates)
(set)                       ; empty set #{}
(list->set lst)             ; convert list to set (deduplicates)

; Membership and query
(set-member? s x)           ; #t if x is in s
(set-length s)              ; number of elements

; Functional update (returns new set — pure)
(set-add s x)               ; new set with x added (no-op if already present)
(set-remove s x)            ; new set with x removed (no-op if absent)

; Set algebra
(set-union s1 s2)           ; union
(set-intersection s1 s2)    ; intersection
(set-difference s1 s2)      ; s1 minus s2
(set-subset? s1 s2)         ; #t if every element of s1 is in s2

; Conversion
(set->list s)               ; list of elements (insertion order)

; Higher-order (prelude, not opcode-backed)
(map-set func s)            ; apply func to each element, return new set
(filter-set pred s)         ; return new set of elements satisfying pred
(fold-set func init s)      ; left fold over set elements`,
                language: 'menai'
            })
        ),
        h('section', {},
            h('h2', {}, 'Using sets'),
            h('p', {},
                'Replaced ',
                h('code', {}, 'list'),
                ' with ',
                h('code', {}, 'set'),
                ' in the ',
                h('code', {}, 'tools/planner'),
                ' code.  Sets are much faster because they don\'t require an O(n) scan.'
            ),
            h('p', {},
                'Replaced ',
                h('code', {}, 'list'),
                ' with ',
                h('code', {}, 'set'),
                ' in the Sudoku solver test.  Again, sets are much faster!'
            ),
            h('p', {},
                'Here\'s the Python VM profile for the Sudoku solver (shows the set ops):'
            ),
            CodeFragment.create({
                code: `Puzzle                            Reps   Total (s)   Per run (ms)  Status
------------------------------------------------------------------------
Easy (36 givens)                     3      4.8957        1631.90  ✓ solved

Profiling puzzle: Easy (36 givens)
====================================================================================================
✓ Solved successfully

====================================================================================================
PROFILING RESULTS (Top 40 functions, sorted by cumulative)
====================================================================================================
         8884829 function calls (8877405 primitive calls) in 3.317 seconds

   Ordered by: cumulative time
   List reduced from 342 to 40 due to restriction <40>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    3.378    3.378 /Users/dave/github/m6r/humbug/src/menai/menai.py:1133(evaluate)
        1    0.000    0.000    3.378    3.378 /Users/dave/github/m6r/humbug/src/menai/menai.py:1116(_evaluate_raw)
        1    1.631    1.631    3.354    3.354 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:336(execute)
   395501    0.139    0.000    0.156    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3250(_op_list_rest)
    25258    0.071    0.000    0.156    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:407(__init__)
   298769    0.136    0.000    0.152    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:616(_op_call)
  1078641    0.137    0.000    0.137    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:541(_op_jump_if_true)
   437581    0.097    0.000    0.117    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3325(_op_list_null_p)
     8416    0.019    0.000    0.095    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3612(_op_set_union)
   256304    0.083    0.000    0.095    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3195(_op_list_prepend)
   546656    0.091    0.000    0.091    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3234(_op_list_first)
   400548    0.090    0.000    0.090    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3297(_op_list_ref)
    12624    0.005    0.000    0.088    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3467(_op_list_to_set)
   869045    0.074    0.000    0.074    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:472(_op_load_const)
   164636    0.060    0.000    0.068    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1285(_op_integer_add)
   304025    0.066    0.000    0.066    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1255(_op_integer_gte_p)
   525617    0.064    0.000    0.064    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:509(_op_move)
   159994    0.055    0.000    0.062    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3208(_op_list_append)
   353171    0.053    0.000    0.053    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:366(to_hashable_key)
   215002    0.047    0.000    0.047    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1170(_op_integer_eq_p)
   298770    0.045    0.000    0.045    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:865(_op_return)
    54710    0.034    0.000    0.044    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:569(_op_make_closure)
   158560    0.023    0.000    0.043    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:417(<genexpr>)
   871191    0.043    0.000    0.043    0.000 {built-in method builtins.len}
    50497    0.038    0.000    0.041    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:678(_op_tail_call)
     8416    0.014    0.000    0.035    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3708(_op_range)
   467561    0.030    0.000    0.030    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:519(_op_jump)
   113616    0.026    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1187(_op_integer_neq_p)
        1    0.000    0.000    0.023    0.023 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
     4208    0.004    0.000    0.022    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3658(_op_set_difference)
    84160    0.017    0.000    0.020    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3732(<genexpr>)
    33664    0.015    0.000    0.017    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3221(_op_list_reverse)
    67341    0.015    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:590(_op_patch_closure)
    16832    0.011    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3370(_op_list_slice)
   149671    0.013    0.000    0.013    0.000 {method 'add' of 'set' objects}
   155378    0.012    0.000    0.012    0.000 {method 'append' of 'list' objects}
     8424    0.005    0.000    0.011    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3673(<genexpr>)
   117834    0.010    0.000    0.010    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:458(_op_load_empty_list)
      2/1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
    661/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_15 = new NotesPost(
    '2026-03-15: Extending Menai with sets and set algebra',
    '2026-03-15',
    '/notes/2026-03-15',
    'Adding set collections to Menai, with set algebra, higher-order functions, and performance improvements to the planner and Sudoku solver.',
    null,
    null,
    notesOpening_2026_03_15,
    notesArticle_2026_03_15,
    null
);
