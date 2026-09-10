import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_07(): VElement[] {
    return [
        h('p', {},
            'Still on the quest to make Menai faster!'
        )
    ];
}

function notesArticle_2026_09_07(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Removing redundant moves'),
            h('p', {},
                'Reviewing the code generation from the Menai compiler, I noticed a lot of prelude functions doing this:'
            ),
            CodeFragment.create({language: 'text', code:
`   1799          0: ASSERT_LIST i0
   1800
   1801     ►    1: l0 = LIST_NULL_P i0
   1802          2: JUMP_IF_TRUE l0, @13
   1803
   1804          3: l0 = LIST_FIRST i0
   1805          4: ASSERT_BOOLEAN i1
   1806          5: ASSERT_BOOLEAN l0
   1807          6: l0 = BOOLEAN_EQ_P i1, l0
   1808          7: JUMP_IF_TRUE l0, @9
   1809
   1810          8: RETURN l0
   1811
   1812     ►    9: l0 = LIST_REST i0
   1813         10: i1 = LIST_FIRST i0
   1814         11: i0 = MOVE l0
   1815         12: JUMP @1
   1816
   1817     ►   13: l0 = LOAD_TRUE                              ; #t
   1818         14: RETURN l0`
            }),
            h('p', {},
                'That MOVE instruction is unecessary if we swap the LIST_REST and LIST_FIRST, something that\'s completely safe to ' +
                'do because there are no side effects.  It turns out this is a very common issue in variadic functions!'
            ),
            h('p', {},
                'I also noticed we were overly-conservative in optimizations around closure creation:'
            ),
            CodeFragment.create({language: 'text', code:
`   1441        0: l0 = LOAD_CONST k0                          ; MenaiInteger(value=4)
   1442        1: ASSERT_LIST i0
   1443        2: l0 = LIST_REF i0, l0
   1444        3: l1 = MAKE_CLOSURE x0                        ; closure for '<lambda-1>' at src/menai_benchmark/suites/rubiks_cube/r
   1444 ubiks_cube.menai:line 227
   1445        4: PATCH_CLOSURE l1, 0, l0                     ; '<lambda-1>'.'center' = l0
   1446        5: l0 = LOAD_NAME n0                           ; 'filter-list'
   1447        6: o0 = MOVE l1
   1448        7: o1 = MOVE i0
   1449        8: l0 = CALL l0, 2
   1450
   1451        9: ASSERT_LIST l0
   1452       10: l0 = LIST_LENGTH l0
   1453       11: RETURN l0`
            }),
            h('p', {},
                'In this instance, we had a restriction preventing MAKE_CLOSURE from targetting outgoing registers so we ended up with ' +
                'another unnecessary MOVE.'
            ),
            h('p', {},
                'Overall results show an improvement of 0%-5%.  This is a major win!'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.019      0.017 ✓       0.002      0.001     8.1x faster ✓       0.010      0.008     1.8x faster ✓
flat_array                     0.102      0.099 ✓       0.004      0.004      25x faster ✓       0.057      0.055     1.8x faster ✓
flat_object                    0.092      0.088 ✓       0.005      0.005      17x faster ✓       0.045      0.044     2.0x faster ✓
mixed_nested                   0.204      0.199 ✓       0.008      0.007      25x faster ✓       0.120      0.117     1.7x faster ✓
string_heavy                   0.072      0.069 ✓       0.005      0.004      14x faster ✓       0.058      0.057     1.2x faster ✓
numbers_array                  0.022      0.021 ✓       0.002      0.001      14x faster ✓       0.010      0.009     2.2x faster ✓
unicode_strings                0.010      0.009 ✓       0.001      0.001      11x faster ✓       0.006      0.005     1.7x faster ✓
long_string                    0.083      0.080 ✓       0.002      0.002      43x faster ✓       0.067      0.067     1.2x faster ✓
deep_array                     0.251      0.237 ✓       0.023      0.022      11x faster ✓       0.157      0.150     1.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.102      0.099 ✓       0.096      0.089     1.1x faster ✓       0.055      0.051     1.8x faster ✓
2-move                         0.101      0.098 ✓       0.086      0.082     1.2x faster ✓       0.049      0.047     2.1x faster ✓
3-move                         0.222      0.209 ✓       0.191      0.188     1.2x faster ✓       0.108      0.107     2.0x faster ✓
4-move                         2.197      2.185 ✓       2.128      2.084     1.0x faster ✓       1.234      1.186     1.8x faster ✓
5-move                         7.426      7.402 ✓       7.261      7.233     1.0x faster ✓       4.213      4.181     1.8x faster ✓
6-move                        48.543     48.302 ✓      46.545     46.310     1.0x faster ✓      27.583     27.482     1.8x faster ✓
7-move                       108.975    108.813 ✓     104.733    104.627     1.0x faster ✓      62.323     62.262     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.007      0.005 ✓       0.000      0.000      15x faster ✓       0.006      0.004     1.2x faster ✓
n=50                           0.039      0.038 ✓       0.002      0.001      25x faster ✓       0.025      0.023     1.6x faster ✓
n=100                          0.091      0.089 ✓       0.003      0.002      28x faster ✓       0.052      0.050     1.7x faster ✓
n=250                          0.269      0.266 ✓       0.009      0.006      31x faster ✓       0.144      0.139     1.9x faster ✓
n=500                          0.616      0.611 ✓       0.018      0.012      35x faster ✓       0.304      0.300     2.0x faster ✓
n=1000                         1.400      1.384 ✓       0.040      0.028      35x faster ✓       0.690      0.663     2.0x faster ✓
n=2500                         4.058      4.023 ✓       0.119      0.086      34x faster ✓       1.910      1.901     2.1x faster ✓
n=5000                         9.008      8.882 ✓       0.284      0.224      32x faster ✓       4.100      4.073     2.2x faster ✓
n=10000                       19.773     19.654 ✓       0.670      0.604      30x faster ✓       8.924      8.903     2.2x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              19.051     18.993 ✓       3.146      3.105     6.1x faster ✓      11.492     11.442     1.7x faster ✓
Medium (30 givens)             0.294      0.289 ✓       0.044      0.041     6.7x faster ✓       0.163      0.157     1.8x faster ✓
Hard (25 givens)            4156.445   4156.445 ✓     716.491    716.491     5.8x faster ✓    2054.450   2054.450     2.0x faster ✓
Expert (23 givens)           241.307    241.307 ✓      40.916     40.916     5.9x faster ✓     168.775    168.775     1.4x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓
`
            }),
            h('p', {},
                'Nice wins on sort and sudoku, but the Rubik\'s cube benchmark is stubbornly tricky.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving variadic prelude functions'),
            h('p', {},
                'Another thing that came up while reviewing bytecode was a missed optimization opportunity in the variadic prelude functions. ' +
                'These are things like the implementations of integer+ or float<? where the prelude version has to take a variable number ' +
                'of arguments because it has no idea how many arguments will be passed when we\'re calling a first-class function.'
            ),
            h('p', {},
                'For static calls we already desugar these to be efficient, but the first-class operations are much more tricky.'
            ),
            h('p', {},
                'We can solve for this by simply special-casing the most common scenario in which we\'re passed 2 arguments!'
            ),
            h('p', {},
                'Interestingly, Humbug decided to write quite a complex Menai transform function to edit the 92 instances of ' +
                'such prelude operations.  This led to some more weird balanced parens error reporting, and we\'ve now updated ' +
                'menai-check to do a much better job reporting problems.'
            ),
            h('p', {},
                'The results below are pretty amazing, but I\'ve been seeing quite a lot of jitter in benchmarks for several months and ' +
                'I finally realized this is down to thermal throttling on my MacBook Air M3.  As such, these are probably "best case" ' +
                'results, but the speedup factors against Python are the most important things here.'
            ),
            h('p', {},
                'The huge win is on the sort benchmark where the speedup is about 25%!  9 days ago the n=10000 test took 150 ms, and now it\'s ' +
                'taking less than 15 ms.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.018      0.016 ✓       0.002      0.001     8.0x faster ✓       0.010      0.008     1.8x faster ✓
flat_array                     0.100      0.098 ✓       0.004      0.003      26x faster ✓       0.053      0.051     1.9x faster ✓
flat_object                    0.090      0.088 ✓       0.005      0.005      17x faster ✓       0.048      0.047     1.9x faster ✓
mixed_nested                   0.204      0.202 ✓       0.008      0.007      25x faster ✓       0.121      0.116     1.7x faster ✓
string_heavy                   0.072      0.070 ✓       0.004      0.004      16x faster ✓       0.054      0.053     1.3x faster ✓
numbers_array                  0.022      0.021 ✓       0.002      0.001      14x faster ✓       0.009      0.009     2.4x faster ✓
unicode_strings                0.010      0.009 ✓       0.001      0.001     9.4x faster ✓       0.006      0.005     1.7x faster ✓
long_string                    0.081      0.078 ✓       0.002      0.002      40x faster ✓       0.067      0.066     1.2x faster ✓
deep_array                     0.249      0.240 ✓       0.022      0.019      11x faster ✓       0.151      0.149     1.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.097      0.091 ✓       0.088      0.081     1.1x faster ✓       0.052      0.048     1.9x faster ✓
2-move                         0.095      0.091 ✓       0.087      0.081     1.1x faster ✓       0.049      0.048     1.9x faster ✓
3-move                         0.214      0.210 ✓       0.192      0.189     1.1x faster ✓       0.111      0.110     1.9x faster ✓
4-move                         2.224      2.212 ✓       2.084      2.057     1.1x faster ✓       1.213      1.198     1.8x faster ✓
5-move                         7.497      7.484 ✓       7.061      7.040     1.1x faster ✓       4.222      4.204     1.8x faster ✓
6-move                        48.175     48.024 ✓      46.517     46.370     1.0x faster ✓      27.585     27.555     1.7x faster ✓
7-move                       107.534    107.358 ✓     102.071    101.875     1.1x faster ✓      62.217     62.104     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.006      0.005 ✓       0.000      0.000      14x faster ✓       0.005      0.004     1.3x faster ✓
n=50                           0.031      0.030 ✓       0.002      0.001      21x faster ✓       0.025      0.023     1.3x faster ✓
n=100                          0.070      0.069 ✓       0.003      0.002      22x faster ✓       0.053      0.050     1.3x faster ✓
n=250                          0.207      0.204 ✓       0.009      0.006      24x faster ✓       0.145      0.140     1.4x faster ✓
n=500                          0.464      0.460 ✓       0.017      0.012      27x faster ✓       0.307      0.302     1.5x faster ✓
n=1000                         1.059      1.051 ✓       0.040      0.028      27x faster ✓       0.688      0.668     1.5x faster ✓
n=2500                         3.040      3.002 ✓       0.117      0.085      26x faster ✓       1.919      1.909     1.6x faster ✓
n=5000                         6.700      6.637 ✓       0.294      0.249      23x faster ✓       4.094      4.068     1.6x faster ✓
n=10000                       14.631     14.587 ✓       0.659      0.598      22x faster ✓       8.716      8.710     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              19.078     18.517 ✓       3.014      2.937     6.3x faster ✓      11.087     10.967     1.7x faster ✓
Medium (30 givens)             0.286      0.270 ✓       0.044      0.040     6.5x faster ✓       0.163      0.156     1.8x faster ✓
Hard (25 givens)            4071.289   4071.289 ✓     708.308    708.308     5.7x faster ✓    2021.565   2021.565     2.0x faster ✓
Expert (23 givens)           236.506    236.506 ✓      40.184     40.184     5.9x faster ✓     164.695    164.695     1.4x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓
`
            })
        )
    ];
}

export const notesPost_2026_09_07 = new NotesPost(
    '2026-09-07: Menai compiler improvements',
    '2026-09-07',
    '/notes/2026-09-07',
    '2026-09-07: Menai compiler improvements - removing redundant MOVE instructions in variadic prelude functions and improving closure creation optimizations, plus special-casing 2-argument variadic prelude calls for significant benchmark wins.',
    null,
    null,
    notesOpening_2026_09_07,
    notesArticle_2026_09_07,
    null
);
