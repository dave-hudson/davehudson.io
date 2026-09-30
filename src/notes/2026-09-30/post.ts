import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_30(): VElement[] {
    return [
        h('p', {},
            'In the last few days I\'ve done an insane amount of compiler optimization!'
        )
    ];
}

function notesArticle_2026_09_30(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai improvements'),
            h('p', {},
                'The last few days have seen a huge number of compiler improvements, renaming activities that ' +
                'make operations much more regular, and algorithmic improvements in core libraries.'
            ),
            h('p', {},
                'I\'ve also added a lot more core libraries and thus benchmark tests.'
            ),
            h('p', {},
                'I\'m not capturing all the details, but this would have been months of work only a couple of ' +
                'years ago!'
            ),
            CodeFragment.create({language: 'text', code:
`BMP-DECODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.313          0.287
truecolour-128x128                  1.305          1.238
truecolour-topdown-128x128          1.261          1.231
truecolour-alpha-128x128            1.547          1.467
padded-65x64                        0.308          0.290
────────────────────────────────────────────────────────


BMP-ENCODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.825          0.785
truecolour-128x128                  7.308          7.233
truecolour-topdown-128x128          7.335          7.278
truecolour-alpha-128x128           10.247         10.017
padded-65x64                        0.876          0.870
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.024          0.020
month_20d                         0.078          0.076
quarter_60d                       0.237          0.228
year_250d                         0.945          0.934
months_600d                       1.613          1.565
──────────────────────────────────────────────────────


DEFLATE-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.654          1.586
text-32k                          9.888          9.390
incremental-16k                  13.623         13.451
runs-32k                         81.074         79.513
──────────────────────────────────────────────────────


DEFLATE-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.392          0.380
text-32k                          0.668          0.651
incremental-16k                   1.051          1.036
stored-8k                         0.204          0.200
runs-32k                          2.175          2.067
──────────────────────────────────────────────────────


JSON-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.015          0.013
flat_array                        0.088          0.086
flat_object                       0.078          0.076
mixed_nested                      0.176          0.175
string_heavy                      0.058          0.056
numbers_array                     0.018          0.017
unicode_strings                   0.008          0.007
long_string                       0.062          0.060
deep_array                        0.198          0.194
──────────────────────────────────────────────────────


JSON-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.013          0.011
flat_array                        0.014          0.012
flat_object                       0.033          0.031
mixed_nested                      0.064          0.062
string_heavy                      0.090          0.089
numbers_array                     0.010          0.008
unicode_strings                   0.004          0.003
long_string                       0.266          0.261
──────────────────────────────────────────────────────


PNG-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.635          2.607
greyscale-alpha-64x64            14.580         14.493
palette-128x128                   6.559          6.527
truecolour-128x128               83.660         83.294
truecolour-alpha-128x128        112.938        112.520
truecolour-192x192              192.312        191.653
──────────────────────────────────────────────────────


PNG-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
truecolour-48x48                110.428        106.965
truecolour-96x96               1675.086       1662.443
truecolour-alpha-96x96         2972.688       2946.524
──────────────────────────────────────────────────────


RUBIKS_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.067          0.063
2-move                            0.067          0.063
3-move                            0.150          0.147
4-move                            1.569          1.560
5-move                            5.256          5.247
6-move                           33.713         33.674
7-move                           75.116         74.820
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.061          0.057
2-move                            0.059          0.056
3-move                            0.135          0.131
4-move                            1.402          1.396
5-move                            4.755          4.739
6-move                           30.623         30.565
7-move                           67.987         67.732
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.006          0.004
n=50                              0.033          0.029
n=100                             0.069          0.068
n=250                             0.204          0.202
n=500                             0.456          0.451
n=1000                            1.026          1.021
n=2500                            2.958          2.941
n=5000                            6.481          6.458
n=10000                          14.206         14.150
──────────────────────────────────────────────────────


SUDOKU_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 15.364         15.179
Medium (30 givens)                0.225          0.217
Hard (25 givens)               3280.335       3280.335
Expert (23 givens)              188.421        188.421
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 11.159         11.118
Medium (30 givens)                0.164          0.160
Hard (25 givens)               2456.489       2456.489
Expert (23 givens)              139.414        139.414
──────────────────────────────────────────────────────


ZIP-CREATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.902          0.885
single-stored                     0.024          0.020
mixed-16                          6.399          6.371
many-128                         84.992         84.744
large-256k                       77.974         76.739
──────────────────────────────────────────────────────


ZIP-ENTRIES
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.005          0.003
single-stored                     0.004          0.003
mixed-16                          0.017          0.014
many-128                          0.108          0.093
large-256k                        0.003          0.003
──────────────────────────────────────────────────────


ZIP-EXTRACT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.293          0.283
single-stored                     0.204          0.197
mixed-16                          0.914          0.900
many-128                         10.104         10.073
large-256k                        3.285          3.221
──────────────────────────────────────────────────────


ZLIB-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.883          1.864
text-32k                         11.422         11.386
incremental-16k                  14.731         14.591
runs-32k                         86.213         85.184
──────────────────────────────────────────────────────


ZLIB-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.613          0.596
text-32k                          2.446          2.390
incremental-16k                   1.923          1.909
runs-32k                          3.984          3.959
──────────────────────────────────────────────────────`})
        )
    ];
}

export const notesPost_2026_09_30 = new NotesPost(
    '2026-09-30: Compiler improvements',
    '2026-09-30',
    '/notes/2026-09-30',
    '2026-09-30: Compiler improvements - a huge amount of compiler optimization, more regular operations, and algorithmic improvements across the core libraries.',
    null,
    null,
    notesOpening_2026_09_30,
    notesArticle_2026_09_30,
    null
);
