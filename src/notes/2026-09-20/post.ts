import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_20(): VElement[] {
    return [
        h('p', {},
            'Today hasn\'t had a single specific focus, but instead lots of small items.  Most aren\'t interesting, but ' +
            'there were a couple of important Menai improvements.'
        )
    ];
}

function notesArticle_2026_09_20(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Type propagation'),
            h('p', {},
                'The main motivation for the interprocedural type analysis was to allow struct operations to be optimized ' +
                'from name-based hash lookups to being slot index-based.  The latter is much faster.'
            ),
            h('p', {},
                'The code had ended up with 2 places that were doing different parts of this.'
            ),
            h('p', {},
                'The first was the ',
                h('code', {}, 'match'),
                ' destructuring code.  It always knew the exact type and could thus convert ',
                h('code', {}, 'struct-get'),
                ' operations, but it did this very early and that was exposing an opcode that shouldn\'t be visible that ' +
                'early in the compilation.  Disabling that pass resulted in some ',
                h('code', {}, 'match'),
                ' operations still converting in the CFG passes, but not all.'
            ),
            h('p', {},
                'A little digging into this revealled we were not handling captures correctly in the CFG layer and once ' +
                'that was fixed then not only did we convert all struct operations without needing to do anything special ' +
                'in the AST desugaring layer, but also caught some other struct operations that were previously missed.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Unfortunate inlining'),
            h('p', {},
                'Another major discovery was that the inliner was too agressive at inlining expressions that would be used ' +
                'more than once.  By definition this was creating many common subexpressions, except we don\'t have a common ' +
                'subexpression elimination optimization yet.'
            ),
            h('p', {},
                'The key thing was the inliner was doing harm and expecting other passes to clean up, so we fixed the ' +
                'inliner.  Now if an inlined expression will be used more than once we wrap it in a let so we compute it ' +
                'once and use the computed result multiple times.'
            ),
            h('p', {},
                'Fixing this had a huge impact in the Rubik\'s cube solver - not in a critical path, but one of the string ' +
                'conversion functions.  With the updated approach, not only did we avoid a huge amount of needless ' +
                'computation, but the cleaner structure then let the compiler recognize 3 jump table optimizations, ' +
                'resulting in the function shriking from about 170 opcode to about 70!'
            ),
            h('p', {},
                'I didn\'t look at exactly why, but this also had a huge impact on ',
                h('code', {}, 'inflate'),
                ' operations.  Many of these improved 1.2x to just over 2x!'
            ),
            CodeFragment.create({language: 'text', code:
`BMP_PARSER
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.313          0.296
truecolour-128x128                  1.293          1.266
truecolour-topdown-128x128          1.318          1.292
truecolour-alpha-128x128            1.589          1.572
padded-65x64                        0.321          0.304
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.022          0.019
month_20d                         0.073          0.069
quarter_60d                       0.224          0.212
year_250d                         0.879          0.872
months_600d                       1.563          1.556
──────────────────────────────────────────────────────


DEFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.720          1.706
text-32k                          9.972          9.869
incremental-16k                  26.698         26.540
runs-32k                         92.332         92.037
──────────────────────────────────────────────────────


INFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.404          0.391
text-32k                          0.732          0.706
incremental-16k                   1.168          1.141
stored-8k                         0.193          0.187
runs-32k                          2.402          2.336
──────────────────────────────────────────────────────


JSON_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.016          0.014
flat_array                        0.096          0.093
flat_object                       0.088          0.083
mixed_nested                      0.196          0.191
string_heavy                      0.061          0.060
numbers_array                     0.019          0.017
unicode_strings                   0.008          0.007
long_string                       0.063          0.060
deep_array                        0.216          0.209
──────────────────────────────────────────────────────


PNG_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.813          2.747
greyscale-alpha-64x64            17.012         16.919
palette-128x128                   6.559          6.420
truecolour-128x128               98.006         97.332
truecolour-alpha-128x128        132.817        132.346
truecolour-192x192              226.295        224.702
──────────────────────────────────────────────────────


RUBIKS_CUBE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.091          0.086
2-move                            0.089          0.085
3-move                            0.202          0.198
4-move                            2.111          2.102
5-move                            7.128          7.056
6-move                           45.479         45.344
7-move                          100.175         98.633
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.085          0.080
2-move                            0.086          0.081
3-move                            0.192          0.187
4-move                            1.990          1.984
5-move                            6.671          6.648
6-move                           43.267         43.057
7-move                           95.869         95.645
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.005          0.004
n=50                              0.031          0.030
n=100                             0.067          0.065
n=250                             0.199          0.195
n=500                             0.443          0.440
n=1000                            0.990          0.972
n=2500                            2.903          2.894
n=5000                            6.407          6.390
n=10000                          13.799         13.708
──────────────────────────────────────────────────────


SUDOKU
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 16.345         16.185
Medium (30 givens)                0.249          0.241
Hard (25 givens)               3614.648       3614.648
Expert (23 givens)              205.973        205.973
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 11.696         11.648
Medium (30 givens)                0.174          0.170
Hard (25 givens)               2580.409       2580.409
Expert (23 givens)              147.125        147.125
──────────────────────────────────────────────────────


ZIP_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate/parse              0.207          0.200
single-deflate/extract            0.315          0.307
single-stored/parse               0.204          0.199
single-stored/extract             0.205          0.201
mixed-16/parse                    0.217          0.211
mixed-16/extract                  1.065          1.056
many-128/parse                    0.305          0.295
many-128/extract                 12.483         12.448
large-256k/parse                  0.210          0.205
large-256k/extract                3.757          3.709
──────────────────────────────────────────────────────


ZLIB_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.661          0.652
text-32k                          2.627          2.588
incremental-16k                   2.191          2.169
runs-32k                          4.457          4.444
──────────────────────────────────────────────────────`})
        )
    ];
}

export const notesPost_2026_09_20 = new NotesPost(
    '2026-09-20: A Sunday of code',
    '2026-09-20',
    '/notes/2026-09-20',
    '2026-09-20: A Sunday of code - interprocedural type propagation for struct slot optimization, and fixing an over-aggressive inliner that was creating common subexpressions.',
    null,
    null,
    notesOpening_2026_09_20,
    notesArticle_2026_09_20,
    null
);
