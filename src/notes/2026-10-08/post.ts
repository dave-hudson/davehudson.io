import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_10_08(): VElement[] {
    return [
        h('p', {},
            'My current strategy with Menai is to go broad and less deep.  Use more of the language and discover any ' +
            'sharp edges, rather than pursuing more performance.'
        )
    ];
}

function notesArticle_2026_10_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Enums'),
            h('p', {},
                'Menai has evolved a very capable type system but one thing that has bugged me for a while is I end ' +
                'up using either integers or strings to track "states".  Most languages end up with an enumerated ' +
                'type concept, but Lisps tend to end up using symbols.  I\'m not a Lisp purist though, I\'m a ' +
                'pragmatist so Menai now has ', h('code', {}, 'enum'), ' and ', h('code', {}, 'enumtype'), '.'
            ),
            h('p', {},
                'Enums have a few nice properties:'
            ),
            h('ul', {},
                h('li', {},
                    'The compiler can determine it\'s seen all possible enumerated variants and can optimize based ' +
                    'on that information.  This makes switch/jump tables very efficient.'
                ),
                h('li', {},
                    'Enums aren\'t bigints so they\'re a little faster than integers and a lot faster than strings.'
                ),
                h('li', {},
                    'Code readability is much better.'
                ),
                h('li', {},
                    'They work really well with ', h('code', {}, 'match'), '.'
                )
            ),
            h('p', {},
                'The last on is important as it let to a discovery that the use of ', h('code', {}, 'match'), ' with ',
                h('code', {}, 'struct'), ' objects had a subtle problem.  It was possible for match to be ambiguous ' +
                'w.r.t. being a ', h('code', {}, 'list'), ' destructuring or a ', h('code', {}, 'struct'), ' match.  ' +
                'With ', h('code', {}, 'enum'), ' the problem became more obvious.'
            ),
            h('p', {},
                h('code', {}, 'match'), ' now has a new syntax (', h('code', {}, ':'), ') for ', h('code', {}, 'struct'),
                ' and ', h('code', {}, 'enum'), ' matching, similar in concept to the ', h('code', {}, '?'), ' used ' +
                'for predicate matching.  This makes the syntax unambiguous.'
            ),
            h('p', {},
                'This allows for some very readable code!  Here\'s an example from ', h('code', {}, 'deflate-compress.menai'), ':'
            ),
            CodeFragment.create({
                language: 'menai',
                code:
`   ; The block encoding to emit: choose the smallest of the three encodings, or
   ; force a stored, fixed Huffman, or dynamic Huffman block.
   (mode (enum (auto stored fixed dynamic)))`
            }),
            h('p', {},
                'and then:'
            ),
            CodeFragment.create({
                language: 'menai',
                code:
`   ; Encode the whole input as a single stored (BTYPE = 00) block.
   (encode-stored
    (lambda (b)
      (writer->bytes (write-stored-block (make-writer) b 0 (bytes-length b) #t))))

   ; Encode a token stream as a single fixed Huffman (BTYPE = 01) block.
   (encode-fixed
    (lambda (tokens)
      (writer->bytes (write-fixed-block (make-writer) tokens #t))))

   ; Encode a token stream as a single dynamic Huffman (BTYPE = 10) block.
   (encode-dynamic
    (lambda (tokens)
      (writer->bytes (write-dynamic-block (make-writer) tokens #t))))

   ; Encode the whole input as a single block of the requested type.
   (encode-block
    (lambda (b block-mode)
      (match block-mode
        ((: mode 'auto) (encode-auto b))
        ((: mode 'stored) (encode-stored b))
        ((: mode 'fixed) (encode-fixed (tokenize b)))
        ((: mode 'dynamic) (encode-dynamic (tokenize b))))))`
            }),
            h('p', {},
                'Our match now matches all 4 variants of our ', h('code', {}, 'mode'), ' enum.  The inliner inlines ' +
                'these small functions to make things very efficient.  A few benchmarks got small performance bumps ' +
                'as a result, but by far the bigger win is in readability.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Standard library improvements'),
            h('p', {},
                'In the spirit of "what do you need?", DeepSeek has helpfully determined it would like base64 ' +
                'encode/decode, a regexp compiler and regexp search/replace capabilities, and csv encode/decode.  I ' +
                'want XML encode/decode so we have that too.'
            ),
            h('p', {},
                'Regexp turned out to be quite painful because it exposed a few bugs and weaknesses in the compiler, ' +
                'but those are now resolved, and as always the test suite has grown with each new feature or bugfix.'
            ),
            h('p', {},
                'One thing that has impressed me is how diligently Deepseek 4.1 Flash generates regression tests and ' +
                'checks that they correctly fire with the old bad behaviour and don\'t fire with correct new behaviour.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Latest performance summary'),
            h('p', {},
                'Here are the latest performance numbers.  I\'ve added new benchmarks for all the standard library ' +
                'modules as this makes for a good regression test, but also allowed DeepSeek to spot some O(n^2) ' +
                'problems in earlier versions of some new modules and then fix them.'
            ),
            h('p', {},
                'One slightly annoying quirk is as I add more benchmarks and the tests collectively run for longer at ' +
                '100% CPU usage, my MacBook Air M3 thermally throttles more and the numbers get slightly worse on the ' +
                'later benchmark suites.  This can be as much as 10%.'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`BASE64-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.163          0.158
standard-64k                     11.427         11.237
url-1k                            0.162          0.160
url-64k                          11.515         11.436
──────────────────────────────────────────────────────


BASE64-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
standard-1k                       0.075          0.072
standard-64k                      5.120          5.062
unpadded-1k                       0.070          0.067
url-64k                           5.143          5.075
──────────────────────────────────────────────────────


BMP-DECODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.311          0.294
truecolour-128x128                  1.364          1.343
truecolour-topdown-128x128          1.340          1.317
truecolour-alpha-128x128            1.594          1.559
padded-65x64                        0.319          0.301
────────────────────────────────────────────────────────


BMP-ENCODE
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.785          0.766
truecolour-128x128                  7.269          7.224
truecolour-topdown-128x128          7.280          7.231
truecolour-alpha-128x128           10.141         10.061
padded-65x64                        0.822          0.815
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.024          0.020
month_20d                         0.075          0.072
quarter_60d                       0.220          0.216
year_250d                         0.880          0.856
months_600d                       1.547          1.487
──────────────────────────────────────────────────────


CSV-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     5.122          5.022
quoted-1000x10                    7.709          7.620
escaped-1000x10                   9.557          9.501
multiline-1000                    1.623          1.541
wide-100x100                      3.509          3.465
──────────────────────────────────────────────────────


CSV-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
plain-1000x10                     5.176          5.116
quoted-1000x10                   11.461         11.346
escaped-1000x10                   7.324          7.271
wide-100x100                      2.455          2.402
──────────────────────────────────────────────────────


DEFLATE-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.469          1.390
text-32k                          9.232          9.077
incremental-16k                  13.421         13.305
runs-32k                         79.484         78.282
──────────────────────────────────────────────────────


DEFLATE-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.383          0.370
text-32k                          0.640          0.630
incremental-16k                   1.010          0.999
stored-8k                         0.202          0.196
runs-32k                          2.148          2.098
──────────────────────────────────────────────────────


JSON-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.013          0.011
flat_array                        0.080          0.078
flat_object                       0.071          0.069
mixed_nested                      0.159          0.157
string_heavy                      0.058          0.056
numbers_array                     0.017          0.016
unicode_strings                   0.008          0.007
long_string                       0.064          0.063
deep_array                        0.167          0.164
──────────────────────────────────────────────────────


JSON-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.011          0.010
flat_array                        0.013          0.012
flat_object                       0.030          0.029
mixed_nested                      0.059          0.058
string_heavy                      0.075          0.075
numbers_array                     0.009          0.008
unicode_strings                   0.003          0.003
long_string                       0.223          0.220
──────────────────────────────────────────────────────


PNG-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.545          2.499
greyscale-alpha-64x64            13.758         13.684
palette-128x128                   6.101          6.008
truecolour-128x128               78.623         78.427
truecolour-alpha-128x128        106.082        105.632
truecolour-192x192              180.789        179.919
──────────────────────────────────────────────────────


PNG-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
truecolour-48x48                111.856        109.350
truecolour-96x96               1716.223       1714.315
truecolour-alpha-96x96         3023.433       2986.702
──────────────────────────────────────────────────────


REGEXP
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
compile-per-line                  1.981          1.973
search-prefix-log                 0.031          0.029
search-class-numbers              0.034          0.033
search-alternation                0.079          0.076
search-all-class                 10.599         10.528
search-all-prefix                 2.083          2.021
split-whitespace                 12.818         12.751
replace-whitespace               77.974         77.508
chained-per-line                  2.038          1.986
──────────────────────────────────────────────────────


RUBIKS_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.064          0.059
2-move                            0.064          0.060
3-move                            0.143          0.139
4-move                            1.469          1.464
5-move                            4.995          4.977
6-move                           31.875         31.823
7-move                           70.651         70.592
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.058          0.054
2-move                            0.060          0.055
3-move                            0.133          0.128
4-move                            1.364          1.363
5-move                            4.581          4.571
6-move                           29.427         29.397
7-move                           65.644         65.467
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.006          0.005
n=50                              0.031          0.030
n=100                             0.071          0.069
n=250                             0.209          0.205
n=500                             0.461          0.456
n=1000                            1.039          1.034
n=2500                            2.993          2.971
n=5000                            6.577          6.538
n=10000                          14.456         14.426
──────────────────────────────────────────────────────


STRING_OPS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
search long/absent                0.018          0.016
search long/present               0.021          0.020
search short needle               0.021          0.020
search needle=haystack            0.183          0.172
hash 2000x8                       0.036          0.033
hash 2000x64                      0.095          0.093
hash 500x512                      0.197          0.197
──────────────────────────────────────────────────────


SUDOKU_LIST
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 14.808         14.778
Medium (30 givens)                0.215          0.210
Hard (25 givens)               3185.750       3185.750
Expert (23 givens)              182.266        182.266
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 11.144         11.104
Medium (30 givens)                0.164          0.161
Hard (25 givens)               2419.327       2419.327
Expert (23 givens)              138.895        138.895
──────────────────────────────────────────────────────


XML-DECODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         2.623          2.589
deep-200                          0.238          0.232
attributes-500                    2.055          2.042
mixed-500                         3.053          3.026
entities-2000                     7.420          7.377
ooxml-500                         6.633          6.600
──────────────────────────────────────────────────────


XML-ENCODE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
wide-1000                         0.798          0.770
deep-200                          0.135          0.119
attributes-500                    0.783          0.773
mixed-500                         1.870          1.866
escaping-2000                     3.921          3.899
──────────────────────────────────────────────────────


ZIP-CREATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.704          0.678
single-stored                     0.024          0.019
mixed-16                          4.753          4.720
many-128                         58.423         58.346
large-256k                       76.069         74.384
──────────────────────────────────────────────────────


ZIP-ENTRIES
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.004          0.002
single-stored                     0.003          0.002
mixed-16                          0.015          0.012
many-128                          0.096          0.089
large-256k                        0.003          0.002
──────────────────────────────────────────────────────


ZIP-EXTRACT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate                    0.296          0.281
single-stored                     0.205          0.198
mixed-16                          0.864          0.854
many-128                          9.549          9.472
large-256k                        3.096          3.057
──────────────────────────────────────────────────────


ZLIB-COMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.683          1.665
text-32k                         11.089         10.904
incremental-16k                  14.458         14.357
runs-32k                         85.903         84.763
──────────────────────────────────────────────────────


ZLIB-DECOMPRESS
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.611          0.594
text-32k                          2.424          2.374
incremental-16k                   1.939          1.928
runs-32k                          3.933          3.877
──────────────────────────────────────────────────────`
            })
        )
    ];
}

export const notesPost_2026_10_08 = new NotesPost(
    '2026-10-08: Stdlib and Enums',
    '2026-10-08',
    '/notes/2026-10-08',
    '2026-10-08: Adding enums to Menai, a new match syntax for struct and enum matching, standard library ' +
    'additions, and the latest benchmark numbers.',
    null,
    null,
    notesOpening_2026_10_08,
    notesArticle_2026_10_08,
    null
);
