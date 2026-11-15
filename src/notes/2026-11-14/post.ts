import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_11_14(): VElement[] {
    return [
        h('p', {},
            'The push to improve code coverage in the standard library exposed a few lines of investigation for compiler ',
            'optimizations.  The result wasn\'t a huge win anywhere, but a solid 1% or so across the board'
        )
    ];
}

function notesArticle_2026_11_14(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Compiler optimizations'),
            h('p', {},
                'The first improvement was to recognize a missed optimization in inlining.  If a function is only used in one ',
                'location then it\'s always better to inline it than to call it.'
            ),
            h('p', {},
                'This in turn exposed some new behaviours and an opportunity to fold more enum switch operations and also ',
                'surfaced an opportunity to hoist type guard insertions into a block that dominates several uses.'
            ),
            h('p', {},
                'This change did uncover an issue in the code hoisting within the LICM pass, but then unlocked some improvements ',
                'to the CSE pass.'
            ),
            h('p', {},
                'Cumulatively this results in about a 1% gain on the total benchmark suite.  There are a few minor regressions ',
                'that look like noise, but overall most tests improved.'
            ),
            h('p', {},
                'One way to be more sure about the gains was to realize we could capture the opcode usage data from the benchmark ',
                'suite and confirm that fewer instructions were executed overall.'
            ),
            h('p', {},
                'The latest numbers are:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`BASE64-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.153          0.144
standard-64k                     10.525         10.442
url-1k                            0.149          0.146
url-64k                          10.527         10.454
──────────────────────────────────────────────────────


BASE64-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.056          0.051
standard-64k                      4.012          3.916
unpadded-1k                       0.056          0.055
url-64k                           4.082          3.973
──────────────────────────────────────────────────────


BMP-DECODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.256          0.241
truecolour-128x128                  1.086          1.069
truecolour-topdown-128x128          1.093          1.067
truecolour-alpha-128x128            1.215          1.175
padded-65x64                        0.260          0.252
────────────────────────────────────────────────────────


BMP-ENCODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.748          0.743
truecolour-128x128                  7.055          7.021
truecolour-topdown-128x128          7.190          7.164
truecolour-alpha-128x128            9.736          9.490
padded-65x64                        0.781          0.774
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.022          0.018
month_20d                         0.072          0.070
quarter_60d                       0.214          0.212
year_250d                         0.878          0.873
months_600d                       1.551          1.539
──────────────────────────────────────────────────────


CSV-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     4.280          4.244
quoted-1000x10                    6.369          6.323
escaped-1000x10                   7.731          7.639
multiline-1000                    1.435          1.418
wide-100x100                      2.937          2.903
──────────────────────────────────────────────────────


CSV-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     4.842          4.754
quoted-1000x10                   11.190         11.087
escaped-1000x10                   7.093          7.040
wide-100x100                      2.374          2.336
──────────────────────────────────────────────────────


DEFLATE-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.743          0.722
text-32k                          2.902          2.799
incremental-16k                   4.983          4.907
runs-32k                          9.759          9.669
──────────────────────────────────────────────────────


DEFLATE-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.290          0.278
text-32k                          0.461          0.447
incremental-16k                   0.627          0.597
stored-8k                         0.182          0.177
runs-32k                          1.500          1.457
──────────────────────────────────────────────────────


DOCX-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.453          0.437
document-100                      1.980          1.940
document-500                      8.553          8.495
document-2000                    33.510         33.335
styles-100                        2.895          2.809
numbering-9                       1.589          1.553
media-16                          4.221          4.188
full-500                         12.339         12.212
──────────────────────────────────────────────────────


DOCX-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.069          0.062
document-100                      0.241          0.233
document-500                      0.991          0.971
styles-100                        0.376          0.368
numbering-9                       0.128          0.121
media-16                          0.268          0.260
full-500                          1.252          1.243
──────────────────────────────────────────────────────


HTML-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         4.954          4.915
deep-200                          0.429          0.424
attributes-500                    3.712          3.694
mixed-500                         3.997          3.976
entities-2000                    11.488         11.447
void-1000                        11.054         11.015
omitted-end-tags-1000             2.491          2.471
raw-text-500                      4.416          4.377
realistic-500                     7.936          7.900
──────────────────────────────────────────────────────


HTML-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         1.678          1.631
deep-200                          0.202          0.163
attributes-500                    0.800          0.793
mixed-500                         1.918          1.903
void-1000                         3.695          3.655
escaping-2000                     4.051          4.015
declarations-1000                 0.549          0.544
──────────────────────────────────────────────────────


JSON-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.012          0.010
flat_array                        0.073          0.072
flat_object                       0.064          0.062
mixed_nested                      0.140          0.138
string_heavy                      0.051          0.049
numbers_array                     0.015          0.014
unicode_strings                   0.008          0.007
long_string                       0.060          0.059
deep_array                        0.127          0.125
──────────────────────────────────────────────────────


JSON-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.011          0.009
flat_array                        0.013          0.011
flat_object                       0.030          0.029
mixed_nested                      0.058          0.057
string_heavy                      0.073          0.072
numbers_array                     0.008          0.007
unicode_strings                   0.003          0.002
long_string                       0.249          0.246
──────────────────────────────────────────────────────


PNG-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   1.771          1.749
greyscale-alpha-64x64             6.625          6.598
palette-128x128                   5.008          4.974
truecolour-128x128               36.794         36.575
truecolour-alpha-128x128         48.880         48.763
truecolour-192x192               84.813         84.582
──────────────────────────────────────────────────────


PNG-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
truecolour-48x48                 17.895         17.857
truecolour-96x96                160.172        159.931
truecolour-alpha-96x96          277.050        276.308
──────────────────────────────────────────────────────


PPTX-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.886          0.868
slides-10                         3.490          3.463
slides-50                        14.864         14.826
slides-200                       57.831         57.731
shapes-50                        11.550         11.509
masters-8                         7.237          7.206
media-16                          7.204          7.175
theme-and-masters                 5.506          5.480
full-50                          70.467         70.155
──────────────────────────────────────────────────────


PPTX-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
minimal                           0.100          0.090
slides-10                         0.314          0.305
slides-50                         1.253          1.240
shapes-50                         1.240          1.218
masters-8                         0.637          0.627
media-16                          0.507          0.497
theme-and-masters                 0.495          0.486
full-50                           5.924          5.841
──────────────────────────────────────────────────────


REGEXP
───────────────────────────────────────────────────────
Case                           mean (ms)       min (ms)
───────────────────────────────────────────────────────
compile-per-line                   1.351          1.338
search-prefix-log                  0.031          0.030
search-class-numbers               0.034          0.032
search-alternation                 0.078          0.075
search-all-class                  10.358         10.288
search-all-prefix                  1.372          1.330
search-groups-log                  0.053          0.051
search-all-groups-numbers         34.866         34.635
split-whitespace                  12.162         12.107
replace-whitespace                74.115         73.193
replace-groups-dates              24.649         24.581
chained-per-line                   1.293          1.262
───────────────────────────────────────────────────────


RUBIKS_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.061          0.056
2-move                            0.061          0.056
3-move                            0.136          0.131
4-move                            1.362          1.353
5-move                            4.566          4.555
6-move                           29.125         29.103
7-move                           64.000         63.921
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.050          0.046
2-move                            0.052          0.047
3-move                            0.114          0.107
4-move                            1.134          1.129
5-move                            3.809          3.793
6-move                           24.272         24.240
7-move                           53.920         53.891
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.004          0.003
n=50                              0.027          0.026
n=100                             0.061          0.059
n=250                             0.180          0.177
n=500                             0.400          0.397
n=1000                            0.906          0.902
n=2500                            2.626          2.620
n=5000                            5.730          5.706
n=10000                          12.391         12.266
──────────────────────────────────────────────────────


STATS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
vector-mean-n=100                 0.011          0.009
vector-mean-n=500                 0.049          0.046
vector-mean-n=1000                0.092          0.090
vector-mean-n=2500                0.240          0.235
vector-mean-n=5000                0.511          0.505
vector-mean-n=10000               1.053          1.045
vector-mean-n=25000               2.749          2.736
vector-summary-n=100              0.075          0.072
vector-summary-n=500              0.465          0.463
vector-summary-n=1000             1.048          1.044
vector-summary-n=2500             3.007          2.993
vector-summary-n=5000             6.429          6.380
vector-summary-n=10000           14.009         13.977
vector-summary-n=25000           39.282         39.125
list-mean-n=100                   0.011          0.010
list-mean-n=500                   0.048          0.048
list-mean-n=1000                  0.096          0.095
list-mean-n=2500                  0.260          0.257
list-mean-n=5000                  0.545          0.543
list-mean-n=10000                 1.135          1.120
list-mean-n=25000                 2.895          2.884
list-summary-n=100                0.075          0.072
list-summary-n=500                0.465          0.463
list-summary-n=1000               1.033          1.029
list-summary-n=2500               2.987          2.971
list-summary-n=5000               6.500          6.473
list-summary-n=10000             14.114         14.061
list-summary-n=25000             39.376         39.300
──────────────────────────────────────────────────────


STRING_OPS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
search long/absent                0.016          0.014
search long/present               0.020          0.019
search short needle               0.020          0.020
search needle=haystack            0.173          0.170
hash 2000x8                       0.035          0.033
hash 2000x64                      0.094          0.093
hash 500x512                      0.198          0.197
──────────────────────────────────────────────────────


SUDOKU_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 14.816         14.748
Medium (30 givens)                0.219          0.211
Hard (25 givens)               3196.800       3196.800
Expert (23 givens)              181.664        181.664
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 10.584         10.535
Medium (30 givens)                0.157          0.154
Hard (25 givens)               2310.972       2310.972
Expert (23 givens)              132.894        132.894
──────────────────────────────────────────────────────


XML-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         2.223          2.199
deep-200                          0.209          0.205
attributes-500                    1.676          1.661
mixed-500                         2.703          2.690
entities-2000                     6.362          6.233
ooxml-500                         5.784          5.737
──────────────────────────────────────────────────────


XML-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         0.792          0.768
deep-200                          0.129          0.117
attributes-500                    0.759          0.750
mixed-500                         1.903          1.898
escaping-2000                     4.003          3.979
──────────────────────────────────────────────────────


ZIP-CREATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.506          0.480
single-stored                     0.026          0.019
mixed-16                          3.527          3.501
many-128                         49.864         49.788
large-256k                       21.754         21.447
──────────────────────────────────────────────────────


ZIP-ENTRIES
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.003          0.001
single-stored                     0.003          0.001
mixed-16                          0.011          0.009
many-128                          0.077          0.070
large-256k                        0.003          0.002
──────────────────────────────────────────────────────


ZIP-EXTRACT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.232          0.214
single-stored                     0.178          0.174
mixed-16                          0.498          0.489
many-128                          4.426          4.405
large-256k                        2.164          2.133
──────────────────────────────────────────────────────


ZLIB-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.850          0.834
text-32k                          3.898          3.879
incremental-16k                   5.379          5.314
runs-32k                         10.721         10.654
──────────────────────────────────────────────────────


ZLIB-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.400          0.387
text-32k                          1.350          1.340
incremental-16k                   1.055          1.049
runs-32k                          2.374          2.331
──────────────────────────────────────────────────────`
            })
        )
    ];
}

export const notesPost_2026_11_14 = new NotesPost(
    '2026-11-14: More minor compiler improvements',
    '2026-11-14',
    '/notes/2026-11-14',
    '2026-11-14: More minor compiler improvements - Inlining, enum switch folding, type guard hoisting and LICM/CSE fixes for a solid 1% gain.',
    null,
    null,
    notesOpening_2026_11_14,
    notesArticle_2026_11_14,
    null
);
