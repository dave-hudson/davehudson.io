import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_10_04(): VElement[] {
    return [
        h('p', {},
            'A couple of Menai performance fixes today, plus a nice change to the VM instruction format that ' +
            'lets opcodes use constants directly.'
        )
    ];
}

function notesArticle_2026_10_04(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'LICM issue'),
            h('p', {},
                'After the ', h('code', {}, 'letrec'), ' inliner change it turns out the LICM pass was missing ' +
                'some optimization opportunties that it used to catch.  This led to a particular regression on ' +
                'the ', h('code', {}, 'zip-create'), ' benchmark\'s ', h('code', {}, 'many-128'), ' test.'
            ),
            h('p', {},
                'Fixing the LICM issue restored the performance.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Allow constants directly in VM opcodes'),
            h('p', {},
                'Something I\'ve been thinking about for a while is enabling VM opcodes to use constants as well ' +
                'as registers.'
            ),
            h('p', {},
                'Almost all opcodes used registers for source operands but a relatively straightforward tweak to ' +
                'the instruction format would let them also use constants from the constant pool directly.  I ' +
                'stole 3 bits from the opcode field, so we can now only have 8k distinct opcodes instead of 64k, ' +
                'but those bits now indicate if ', h('code', {}, 'src0'), ', ', h('code', {}, 'src1'), ', or ',
                h('code', {}, 'src2'), ' are registers or constants.'
            ),
            h('p', {},
                'Opcodes are now tagged as to whether they can accept constants and a peephole pass runs before ' +
                'the register slot allocator and attempts to move constant definitions into opcodes.  If all ' +
                'uses go to zero then we can also eliminate the discrete constant load.'
            ),
            h('p', {},
                'This took about 4 hours to get right (thank you DeepSeek)'
            ),
            h('p', {},
                'A small number of benchmarks suffer minor performance regressions but most exhibit a 2% to 10% ' +
                'improvements.  A couple of outliers are nearer 20%.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Latest performance summary'),
            h('p', {},
                'Here are the latest performance numbers - there are a few minor losses compared with the ' +
                'captured numbers from ',
                h('a', {href: '/notes/2026-09-30'}, '2026-09-30'), ', but'
            ),
            CodeFragment.create({language: 'text', code:
`BMP-DECODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.305          0.282
truecolour-128x128                  1.283          1.256
truecolour-topdown-128x128          1.285          1.241
truecolour-alpha-128x128            1.609          1.572
padded-65x64                        0.305          0.291
────────────────────────────────────────────────────────


BMP-ENCODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.781          0.749
truecolour-128x128                  7.251          7.215
truecolour-topdown-128x128          7.316          7.284
truecolour-alpha-128x128           10.122          9.950
padded-65x64                        0.822          0.813
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.024          0.020
month_20d                         0.074          0.072
quarter_60d                       0.216          0.213
year_250d                         0.890          0.885
months_600d                       1.587          1.582
──────────────────────────────────────────────────────


DEFLATE-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.504          1.474
text-32k                          9.324          9.243
incremental-16k                  13.394         13.229
runs-32k                         80.431         79.140
──────────────────────────────────────────────────────


DEFLATE-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.383          0.372
text-32k                          0.649          0.636
incremental-16k                   1.021          1.009
stored-8k                         0.202          0.196
runs-32k                          2.165          2.125
──────────────────────────────────────────────────────


JSON-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.013          0.011
flat_array                        0.078          0.076
flat_object                       0.071          0.069
mixed_nested                      0.155          0.154
string_heavy                      0.056          0.054
numbers_array                     0.016          0.015
unicode_strings                   0.007          0.007
long_string                       0.062          0.059
deep_array                        0.162          0.158
──────────────────────────────────────────────────────


JSON-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.012          0.010
flat_array                        0.013          0.012
flat_object                       0.029          0.028
mixed_nested                      0.058          0.057
string_heavy                      0.074          0.073
numbers_array                     0.009          0.008
unicode_strings                   0.003          0.003
long_string                       0.212          0.209
──────────────────────────────────────────────────────


PNG-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.491          2.468
greyscale-alpha-64x64            13.647         13.599
palette-128x128                   5.912          5.825
truecolour-128x128               78.822         78.704
truecolour-alpha-128x128        105.677        105.240
truecolour-192x192              179.084        178.244
──────────────────────────────────────────────────────


PNG-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
truecolour-48x48                111.379        107.298
truecolour-96x96               1667.060       1655.026
truecolour-alpha-96x96         2946.559       2941.449
──────────────────────────────────────────────────────


RUBIKS_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.063          0.060
2-move                            0.064          0.061
3-move                            0.143          0.138
4-move                            1.491          1.482
5-move                            5.043          5.040
6-move                           32.440         32.345
7-move                           71.965         71.804
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.057          0.054
2-move                            0.057          0.054
3-move                            0.130          0.127
4-move                            1.354          1.348
5-move                            4.597          4.590
6-move                           29.613         29.569
7-move                           66.306         66.117
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.005          0.004
n=50                              0.033          0.030
n=100                             0.069          0.067
n=250                             0.202          0.200
n=500                             0.453          0.449
n=1000                            1.015          1.011
n=2500                            2.922          2.912
n=5000                            6.398          6.372
n=10000                          14.107         14.074
──────────────────────────────────────────────────────


SUDOKU_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 14.751         14.741
Medium (30 givens)                0.217          0.212
Hard (25 givens)               3171.700       3171.700
Expert (23 givens)              180.422        180.422
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 10.925         10.895
Medium (30 givens)                0.163          0.161
Hard (25 givens)               2416.305       2416.305
Expert (23 givens)              138.083        138.083
──────────────────────────────────────────────────────


ZIP-CREATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.684          0.665
single-stored                     0.023          0.018
mixed-16                          4.662          4.632
many-128                         57.721         57.486
large-256k                       76.380         75.320
──────────────────────────────────────────────────────


ZIP-ENTRIES
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.004          0.002
single-stored                     0.003          0.002
mixed-16                          0.015          0.013
many-128                          0.096          0.086
large-256k                        0.003          0.002
──────────────────────────────────────────────────────


ZIP-EXTRACT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.299          0.285
single-stored                     0.202          0.197
mixed-16                          0.879          0.864
many-128                          9.704          9.629
large-256k                        3.179          3.147
──────────────────────────────────────────────────────


ZLIB-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.697          1.680
text-32k                         11.009         10.849
incremental-16k                  14.386         14.256
runs-32k                         86.333         85.400
──────────────────────────────────────────────────────


ZLIB-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.608          0.595
text-32k                          2.448          2.423
incremental-16k                   1.896          1.884
runs-32k                          3.963          3.942
──────────────────────────────────────────────────────`
            })
        )
    ];
}

export const notesPost_2026_10_04 = new NotesPost(
    '2026-10-04: Menai performance improvements',
    '2026-10-04',
    '/notes/2026-10-04',
    '2026-10-04: Menai performance improvements - fixing a LICM regression and allowing constants directly in ' +
    'VM opcodes, plus the latest benchmark numbers.',
    null,
    null,
    notesOpening_2026_10_04,
    notesArticle_2026_10_04,
    null
);
