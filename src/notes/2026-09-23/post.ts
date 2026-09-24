import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_23(): VElement[] {
    return [
        h('p', {},
            'Continuing the Menai performance tuning theme...'
        )
    ];
}

function notesArticle_2026_09_23(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'More native functions'),
            h('p', {},
                'One of the things I want to do is implement fast Merkle trees, but hashing in Menai would be way too slow. ' +
                'I "borrowed" C++ implementations of SHA2 and SHA3 that I wrote about 10 year ago and had DeepSeek v4.1 Flash ' +
                'write me new ones.  We now have 4 opcodes that do high performance hashing over bytes.'
            ),
            h('p', {},
                'For good measure I added CRC32 support too and incorporated it into the PNG and Zip parsers.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Loop rotation'),
            h('p', {},
                'I spotted that we often got code in this form:'
            ),
            CodeFragment.create({language: 'text', code:
`L1: l0 = INTEGER_EQ_P l1, l2
    JUMP_IF_TRUE l0, L2

    ...

    JUMP @L1

L2:`}),
            h('p', {},
                'This is quite expensive because we do one more jump than we need.  Loop rotation turns this into:'
            ),
            CodeFragment.create({language: 'text', code:
`    l0 = INTEGER_EQ_P l1, l2
    JUMP_IF_TRUE l0, L2

L1: ...

    l0 = INTEGER_EQ_P l1, l2
    JUMP_IF_FALSE @L1

L2:`}),
            h('p', {},
                'We trade one extra instruction in code size for one reduced instruction per executed loop.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Profiling'),
            h('p', {},
                'We had counts of instruction types previously but this isn\'t particularly useful for working out where ' +
                'we have hotspots.  Today I added code to capture execution traces - we get a tally of hoe many times each ' +
                'instruction executes.'
            ),
            h('p', {},
                'This immediately identified a super-hot loop in the Rubik\'s cube solvers.  A trivial rewrite reduced run times ' +
                'by 30%!'
            ),
            h('p', {},
                'This gives us views such as this one (taken from the sort benchmark):'
            ),
            CodeFragment.create({language: 'text', code:
`  ──────────────────────────────────────────────────────────────────────
  Function: merge [<prelude>:line 1163]  (ordinal 4)
  ──────────────────────────────────────────────────────────────────────
  Calls:            9,999
  Instructions executed:    1,509,908    49.43% of total

         Count  % of total    Instruction
  ------------ -----------    ------------------------------------------------
         9,999       0.33%       0: l0 = LIST_NULL_P i1
         9,999       0.33%       1: JUMP_IF_TRUE l0, @24

       124,931       4.09%  ►    2: l0 = LIST_NULL_P i2
       124,931       4.09%       3: JUMP_IF_TRUE l0, @21

       120,453       3.94%       4: o0 = LIST_FIRST i2
       120,453       3.94%       5: o1 = LIST_FIRST i1
       120,453       3.94%       6: l0 = CALL i0, 2

       120,453       3.94%       7: ASSERT_BOOLEAN l0
       120,453       3.94%       8: JUMP_IF_TRUE l0, @15

        59,162       1.94%       9: l0 = LIST_FIRST i1
        59,162       1.94%      10: i1 = LIST_REST i1
        59,162       1.94%      11: i3 = LIST_PREPEND i3, l0
        59,162       1.94%      12: l0 = LIST_NULL_P i1
        59,162       1.94%      13: JUMP_IF_FALSE l0, @2

         5,521       0.18%      14: JUMP @24

        61,291       2.01%  ►   15: l0 = LIST_FIRST i2
        61,291       2.01%      16: i2 = LIST_REST i2
        61,291       2.01%      17: i3 = LIST_PREPEND i3, l0
        61,291       2.01%      18: l0 = LIST_NULL_P i1
        61,291       2.01%      19: JUMP_IF_FALSE l0, @2

             0       0.00%      20: JUMP @24

         4,478       0.15%  ►   21: l0 = LIST_REVERSE i3
         4,478       0.15%      22: l0 = LIST_CONCAT l0, i1
         4,478       0.15%      23: RETURN l0

         5,521       0.18%  ►   24: l0 = LIST_REVERSE i3
         5,521       0.18%      25: l0 = LIST_CONCAT l0, i2
         5,521       0.18%      26: RETURN l0`}),
            h('p', {},
                'Note: you can see loop rotation in action here at lines 12-13 and 18-19.'
            )
        ),
        h('section', {},
            h('h2', {}, 'New numbers'),
            CodeFragment.create({language: 'text', code:
`BMP_PARSER
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.319          0.293
truecolour-128x128                  1.251          1.211
truecolour-topdown-128x128          1.226          1.209
truecolour-alpha-128x128            1.600          1.593
padded-65x64                        0.315          0.305
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.022          0.019
month_20d                         0.072          0.069
quarter_60d                       0.214          0.211
year_250d                         0.874          0.870
months_600d                       1.560          1.548
──────────────────────────────────────────────────────


DEFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.628          1.607
text-32k                          9.446          9.253
incremental-16k                  26.263         26.159
runs-32k                         92.323         91.706
──────────────────────────────────────────────────────


INFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.376          0.362
text-32k                          0.657          0.630
incremental-16k                   0.991          0.970
stored-8k                         0.189          0.183
runs-32k                          2.126          2.073
──────────────────────────────────────────────────────


JSON_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.017          0.015
flat_array                        0.101          0.099
flat_object                       0.090          0.087
mixed_nested                      0.203          0.200
string_heavy                      0.062          0.060
numbers_array                     0.020          0.018
unicode_strings                   0.008          0.007
long_string                       0.060          0.059
deep_array                        0.226          0.222
──────────────────────────────────────────────────────


PNG_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.496          2.463
greyscale-alpha-64x64            13.847         13.796
palette-128x128                   5.896          5.844
truecolour-128x128               79.566         77.495
truecolour-alpha-128x128        108.796        108.322
truecolour-192x192              183.984        178.550
──────────────────────────────────────────────────────


RUBIKS_CUBE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.069          0.063
2-move                            0.069          0.065
3-move                            0.152          0.148
4-move                            1.504          1.461
5-move                            5.041          5.011
6-move                           32.249         32.217
7-move                           71.812         71.722
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.062          0.059
2-move                            0.063          0.060
3-move                            0.141          0.138
4-move                            1.430          1.374
5-move                            4.734          4.642
6-move                           30.378         30.271
7-move                           66.325         66.126
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.005          0.004
n=50                              0.031          0.030
n=100                             0.070          0.068
n=250                             0.205          0.203
n=500                             0.456          0.452
n=1000                            1.018          1.011
n=2500                            2.916          2.847
n=5000                            6.330          6.301
n=10000                          13.859         13.729
──────────────────────────────────────────────────────


SUDOKU
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 15.607         15.473
Medium (30 givens)                0.241          0.236
Hard (25 givens)               3394.415       3394.415
Expert (23 givens)              198.987        198.987
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 11.663         11.551
Medium (30 givens)                0.173          0.170
Hard (25 givens)               2571.247       2571.247
Expert (23 givens)              146.988        146.988
──────────────────────────────────────────────────────


ZIP_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate/parse              0.206          0.198
single-deflate/extract            0.300          0.293
single-stored/parse               0.203          0.199
single-stored/extract             0.205          0.200
mixed-16/parse                    0.220          0.212
mixed-16/extract                  0.930          0.919
many-128/parse                    0.305          0.293
many-128/extract                 10.439         10.410
large-256k/parse                  0.206          0.202
large-256k/extract                3.551          3.501
──────────────────────────────────────────────────────


ZLIB_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.620          0.610
text-32k                          2.463          2.447
incremental-16k                   1.970          1.953
runs-32k                          4.027          3.975
──────────────────────────────────────────────────────`})
        )
    ];
}

export const notesPost_2026_09_23 = new NotesPost(
    '2026-09-23: Performance and profiling',
    '2026-09-23',
    '/notes/2026-09-23',
    '2026-09-23: Performance and profiling - native hashing opcodes, loop rotation, and execution-trace profiling that uncovered a super-hot loop in the Rubik\'s cube solvers.',
    null,
    null,
    notesOpening_2026_09_23,
    notesArticle_2026_09_23,
    null
);
