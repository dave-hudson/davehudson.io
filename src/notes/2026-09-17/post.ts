import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_17(): VElement[] {
    return [
        h('p', {},
            'Menai is growing a collection of composable modules, and the benchmark suite has been reworked around them.'
        )
    ];
}

function notesArticle_2026_09_17(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Modules'),
            h('p', {},
                'One of the big ideas in Menai was to allow AIs to build a collection of composable Menai functions that ' +
                'will allow them to solve complex problems in an efficient functional style.  Over the last few days I\'ve ' +
                'been starting to build this out.'
            ),
            h('p', {},
                'Until a few days ago I had a JSON parser module, but not really much else.  To make things more interesting ' +
                'I added a BMP parser as that would also start to use the ',
                h('code', {}, 'bytes'),
                ' type.  Another interesting idea was to handle compressed files, so I also added LZ77 (DEFLATE) handling, ' +
                'with both inflate and deflate implementations.  Wrapping those are zlib support and PNG so there are a ' +
                'couple of modules consuming the inflate support.'
            ),
            h('p', {},
                'This exposed some interesting VM bugs and a couple of compiler bugs, all now fixed, but highlighted a few ' +
                'more examples of where LLMs really struggle with paren counting.  There needs to be more work on this, but ' +
                'the compiler does now have improved paren error handling.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Benchmarking'),
            h('p', {},
                'The original ',
                h('code', {}, 'menai-benchmark'),
                ' compared Menai with idiomatic and "functional" Python.  While somewhat interesting, this is really ' +
                'difficult to keep intellectually honest, and also rather hard to maintain.'
            ),
            h('p', {},
                'I decided to remove the Python comparisons, but expanded the footprint to support a lot of tests using the ' +
                'new modules.  Going forward, this is a much more useful measure as I can compare compiler and runtime ' +
                'optimizations.'
            ),
            CodeFragment.create({language: 'text', code:
`BMP_PARSER
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.333          0.309
truecolour-128x128                  1.371          1.339
truecolour-topdown-128x128          1.343          1.316
truecolour-alpha-128x128            1.664          1.639
padded-65x64                        0.332          0.327
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.024          0.021
month_20d                         0.075          0.074
quarter_60d                       0.223          0.221
year_250d                         0.902          0.896
months_600d                       1.602          1.601
──────────────────────────────────────────────────────


DEFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.780          1.743
text-32k                         10.133          9.974
incremental-16k                  26.951         26.736
runs-32k                         93.777         93.396
──────────────────────────────────────────────────────


INFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.593          0.583
text-32k                          1.125          1.111
incremental-16k                   2.098          2.081
stored-8k                         0.196          0.190
runs-32k                          4.175          4.146
──────────────────────────────────────────────────────


JSON_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.017          0.016
flat_array                        0.099          0.097
flat_object                       0.089          0.087
mixed_nested                      0.198          0.197
string_heavy                      0.063          0.062
numbers_array                     0.020          0.019
unicode_strings                   0.009          0.008
long_string                       0.060          0.060
deep_array                        0.224          0.217
──────────────────────────────────────────────────────


PNG_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   4.129          4.087
greyscale-alpha-64x64            32.461         32.153
palette-128x128                   6.908          6.854
truecolour-128x128              223.435        221.677
truecolour-alpha-128x128        328.716        321.283
truecolour-192x192              592.076        585.835
──────────────────────────────────────────────────────


RUBIKS_CUBE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.095          0.087
2-move                            0.095          0.092
3-move                            0.205          0.196
4-move                            2.145          2.068
5-move                            7.263          7.209
6-move                           46.727         46.674
7-move                          104.169        104.070
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.099          0.096
2-move                            0.098          0.093
3-move                            0.219          0.215
4-move                            2.184          2.098
5-move                            7.363          7.281
6-move                           47.119         47.039
7-move                          104.598        104.406
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.005          0.004
n=50                              0.027          0.027
n=100                             0.061          0.060
n=250                             0.184          0.176
n=500                             0.416          0.391
n=1000                            0.916          0.875
n=2500                            2.620          2.555
n=5000                            5.770          5.709
n=10000                          12.463         12.406
──────────────────────────────────────────────────────


SUDOKU
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 16.867         16.818
Medium (30 givens)                0.256          0.253
Hard (25 givens)               3717.848       3717.848
Expert (23 givens)              212.006        212.006
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 12.530         12.490
Medium (30 givens)                0.192          0.189
Hard (25 givens)               2786.052       2786.052
Expert (23 givens)              158.554        158.554
──────────────────────────────────────────────────────


ZIP_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate/parse              0.006          0.004
single-deflate/extract            0.663          0.655
single-stored/parse               0.005          0.004
single-stored/extract             0.210          0.204
mixed-16/parse                    0.018          0.017
mixed-16/extract                  3.650          3.586
many-128/parse                    0.119          0.106
many-128/extract                 49.922         49.700
large-256k/parse                  0.005          0.004
large-256k/extract               13.474         13.314
──────────────────────────────────────────────────────


ZLIB_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.851          0.812
text-32k                          3.109          3.046
incremental-16k                   3.190          3.066
runs-32k                          6.351          6.268
──────────────────────────────────────────────────────


13 suite(s) completed.`})
        )
    ];
}

export const notesPost_2026_09_17 = new NotesPost(
    '2026-09-17: Menai modules',
    '2026-09-17',
    '/notes/2026-09-17',
    '2026-09-17: Menai modules - composable Menai modules for JSON, BMP, DEFLATE, zlib and PNG, and a reworked benchmark suite.',
    null,
    null,
    notesOpening_2026_09_17,
    notesArticle_2026_09_17,
    null
);
