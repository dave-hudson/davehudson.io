import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_10_13(): VElement[] {
    return [
        h('p', {},
            'One of the things that has bugged me is how slow the DEFLATE code is.  I know it shouldn\'t be super ' +
            'fast by comparison with a hand-tuned version in C, but it seemed needlessly slow.  DeepSeek fixed it.'
        )
    ];
}

function notesArticle_2026_10_13(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Deflating DEFLATE'),
            h('p', {},
                'Both the encoder and decoder for DEFLATE were quite slow.  Looking at the bytecode it seemed like ' +
                'we were doing a lot of rather pointless struct and list packing/unpacking.'
            ),
            h('p', {},
                'DeepSeek agreed and we did 3 changes which were actually quite modest, but have given up to a 10x ' +
                'performance on one very slow benchmark, and around 2x on many others.'
            ),
            h('p', {},
                'Very nice as this was a source-level change and no compiler or VM work required.'
            )
        ),
        h('section', {},
            h('h2', {}, 'PPTX files'),
            h('p', {},
                'Having already had DOCX files, it seemed reasonable to add PPTX to the list.'
            ),
            h('p', {},
                'This didn\'t go quite as well as I\'d have liked as we ran into more paren balancing issues.  The ' +
                'new compiler changes from the weekend help, but they\'re clearly not good enough yet.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Common subexpression elimination'),
            h('p', {},
                'This is a very old optimization and I hadn\'t really expected much from this.  During the DEFLATE ' +
                'optimizations, however, a manual lifting of some common subexpressions gave about at 2% ' +
                'performance win.'
            ),
            h('p', {},
                'While this isn\'t a complete slam-dunk win, and a few benchmarks get slightly slower, the net ' +
                'result is very much positive.  Performance changes range from about -3% to +9% with a mean ' +
                'somewhere near +3%.'
            )
        ),
        h('section', {},
            h('h2', {}, 'New benchmark data'),
            CodeFragment.create({
                language: 'text',
                code:
`BASE64-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.228          0.151
standard-64k                     11.300         11.117
url-1k                            0.158          0.153
url-64k                          11.405         11.368
──────────────────────────────────────────────────────


BASE64-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.073          0.067
standard-64k                      5.247          5.177
unpadded-1k                       0.072          0.072
url-64k                           5.248          5.191
──────────────────────────────────────────────────────


BMP-DECODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.317          0.301
truecolour-128x128                  1.358          1.346
truecolour-topdown-128x128          1.357          1.350
truecolour-alpha-128x128            1.654          1.650
padded-65x64                        0.320          0.306
────────────────────────────────────────────────────────


BMP-ENCODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.799          0.791
truecolour-128x128                  7.457          7.410
truecolour-topdown-128x128          7.481          7.440
truecolour-alpha-128x128           10.613         10.533
padded-65x64                        0.821          0.814
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.023          0.019
month_20d                         0.075          0.073
quarter_60d                       0.220          0.216
year_250d                         0.890          0.887
months_600d                       1.583          1.582
──────────────────────────────────────────────────────


CSV-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     5.224          5.127
quoted-1000x10                    7.602          7.560
escaped-1000x10                   9.535          9.456
multiline-1000                    1.648          1.628
wide-100x100                      3.520          3.491
──────────────────────────────────────────────────────


CSV-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     4.864          4.818
quoted-1000x10                   11.123         11.034
escaped-1000x10                   7.150          7.082
wide-100x100                      2.459          2.424
──────────────────────────────────────────────────────


DEFLATE-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.869          0.841
text-32k                          4.246          4.175
incremental-16k                   6.311          6.114
runs-32k                         11.974         11.858
──────────────────────────────────────────────────────


DEFLATE-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.314          0.301
text-32k                          0.509          0.499
incremental-16k                   0.701          0.690
stored-8k                         0.195          0.188
runs-32k                          1.632          1.593
──────────────────────────────────────────────────────


DOCX-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.504          0.485
document-100                      2.231          2.197
document-500                      9.416          9.327
document-2000                    37.236         36.931
styles-100                        3.249          3.177
numbering-9                       1.767          1.726
media-16                          4.519          4.470
full-500                         13.475         13.356
──────────────────────────────────────────────────────


DOCX-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.069          0.062
document-100                      0.241          0.233
document-500                      0.952          0.938
styles-100                        0.370          0.364
numbering-9                       0.124          0.119
media-16                          0.258          0.250
full-500                          1.220          1.209
──────────────────────────────────────────────────────


JSON-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.012          0.010
flat_array                        0.072          0.071
flat_object                       0.067          0.065
mixed_nested                      0.146          0.142
string_heavy                      0.052          0.050
numbers_array                     0.015          0.014
unicode_strings                   0.007          0.006
long_string                       0.062          0.061
deep_array                        0.140          0.138
──────────────────────────────────────────────────────


JSON-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.012          0.010
flat_array                        0.013          0.012
flat_object                       0.030          0.029
mixed_nested                      0.060          0.058
string_heavy                      0.074          0.073
numbers_array                     0.009          0.008
unicode_strings                   0.004          0.003
long_string                       0.239          0.235
──────────────────────────────────────────────────────


PNG-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.022          1.998
greyscale-alpha-64x64             8.055          8.006
palette-128x128                   5.620          5.563
truecolour-128x128               45.938         45.579
truecolour-alpha-128x128         61.055         60.677
truecolour-192x192              105.939        105.764
──────────────────────────────────────────────────────


PNG-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
truecolour-48x48                 19.378         19.263
truecolour-96x96                168.227        166.205
truecolour-alpha-96x96          292.953        292.303
──────────────────────────────────────────────────────


PPTX-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           1.014          0.996
slides-10                         4.007          3.977
slides-50                        17.293         17.215
slides-200                       67.112         66.974
shapes-50                        13.196         13.112
masters-8                         8.322          8.291
media-16                          7.956          7.906
theme-and-masters                 6.361          6.323
full-50                          77.166         76.917
──────────────────────────────────────────────────────


PPTX-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.097          0.088
slides-10                         0.299          0.290
slides-50                         1.212          1.201
shapes-50                         1.219          1.196
masters-8                         0.609          0.597
media-16                          0.501          0.488
theme-and-masters                 0.463          0.455
full-50                           5.797          5.670
──────────────────────────────────────────────────────


REGEXP
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
compile-per-line                  1.638          1.627
search-prefix-log                 0.031          0.029
search-class-numbers              0.034          0.033
search-alternation                0.077          0.076
search-all-class                 10.736         10.685
search-all-prefix                 1.719          1.687
split-whitespace                 12.756         12.663
replace-whitespace               80.663         79.362
chained-per-line                  1.643          1.618
──────────────────────────────────────────────────────


RUBIKS_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.063          0.059
2-move                            0.065          0.061
3-move                            0.141          0.137
4-move                            1.457          1.452
5-move                            4.920          4.910
6-move                           31.458         31.408
7-move                           70.096         70.030
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.060          0.057
2-move                            0.061          0.057
3-move                            0.137          0.133
4-move                            1.387          1.381
5-move                            4.660          4.642
6-move                           29.749         29.625
7-move                           66.080         65.993
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.006          0.004
n=50                              0.030          0.028
n=100                             0.067          0.065
n=250                             0.197          0.193
n=500                             0.436          0.434
n=1000                            0.983          0.980
n=2500                            2.827          2.813
n=5000                            6.272          6.257
n=10000                          13.462         13.331
──────────────────────────────────────────────────────


STRING_OPS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
search long/absent                0.017          0.016
search long/present               0.021          0.021
search short needle               0.021          0.020
search needle=haystack            0.176          0.175
hash 2000x8                       0.037          0.035
hash 2000x64                      0.096          0.095
hash 500x512                      0.198          0.197
──────────────────────────────────────────────────────


SUDOKU_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 14.706         14.671
Medium (30 givens)                0.214          0.209
Hard (25 givens)               3189.962       3189.962
Expert (23 givens)              181.964        181.964
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 10.656         10.631
Medium (30 givens)                0.159          0.155
Hard (25 givens)               2339.406       2339.406
Expert (23 givens)              133.582        133.582
──────────────────────────────────────────────────────


XML-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         2.510          2.463
deep-200                          0.228          0.224
attributes-500                    1.999          1.983
mixed-500                         2.921          2.901
entities-2000                     6.921          6.910
ooxml-500                         6.425          6.412
──────────────────────────────────────────────────────


XML-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         0.797          0.773
deep-200                          0.137          0.121
attributes-500                    0.775          0.764
mixed-500                         1.873          1.867
escaping-2000                     3.854          3.829
──────────────────────────────────────────────────────


ZIP-CREATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.550          0.519
single-stored                     0.024          0.019
mixed-16                          3.839          3.806
many-128                         53.496         53.433
large-256k                       37.483         36.426
──────────────────────────────────────────────────────


ZIP-ENTRIES
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.004          0.002
single-stored                     0.003          0.002
mixed-16                          0.014          0.012
many-128                          0.090          0.084
large-256k                        0.003          0.002
──────────────────────────────────────────────────────


ZIP-EXTRACT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.251          0.236
single-stored                     0.194          0.187
mixed-16                          0.561          0.548
many-128                          5.125          5.073
large-256k                        2.520          2.503
──────────────────────────────────────────────────────


ZLIB-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.052          1.028
text-32k                          5.792          5.752
incremental-16k                   7.039          6.919
runs-32k                         13.399         13.292
──────────────────────────────────────────────────────


ZLIB-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.503          0.488
text-32k                          1.985          1.974
incremental-16k                   1.487          1.477
runs-32k                          3.100          3.054
──────────────────────────────────────────────────────`
            })
        )
    ];
}

export const notesPost_2026_10_13 = new NotesPost(
    '2026-10-13: More Menai performance work',
    '2026-10-13',
    '/notes/2026-10-13',
    '2026-10-13: Faster DEFLATE thanks to modest source-level changes, PPTX support, common subexpression ' +
    'elimination, and the latest benchmark numbers.',
    null,
    null,
    notesOpening_2026_10_13,
    notesArticle_2026_10_13,
    null
);
