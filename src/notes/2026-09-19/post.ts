import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_19(): VElement[] {
    return [
        h('p', {},
            'Menai is still a new language so it\'s easy to change things when it becomes obvious something is wrong.  ' +
            'The last couple of days have seen quite a few.'
        )
    ];
}

function notesArticle_2026_09_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Type propagation'),
            h('p', {},
                'Menai is dynamically but strictly typed.  This means we insert type guard instructions to ensure opcodes are ' +
                'only used by the correct operand types and raise an error if they\'re not.'
            ),
            h('p', {},
                'To do this we know a lot about what each opcode can do and what it can accept and this let us do a simple ' +
                'type propagation pass.  That in turn let us remove obviously unnecessary type guards.'
            ),
            h('p', {},
                'We can extend this to return types if they\'re known to be a single type and thus avoid unnecessary type ' +
                'guards at call sites.  We can do the same at callees if we know we only ever pass the correct type.'
            ),
            h('p', {},
                'Doing these things requires interprocedural analysis, so the Menai compiler has just gained its first ' +
                'interprocedural optimizer.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Global namespaces removed'),
            h('p', {},
                'Since the early days of Menai we had a global namespace for the prelude functions and any bindings injected ' +
                'directly by the user.  This worked ok, but the idea of a global namespace is really clunky for a language ' +
                'that has strict lexical scoping.'
            ),
            h('p', {},
                'Reworked this so the prelude and any external bindings are now mapped in the form of nested ',
                h('code', {}, 'letrec'),
                ' scopes around the user\'s expression.'
            ),
            h('p', {},
                'This simplified the compiler and VM, but also removed some unnecessary runtime lookups.  These are now done ' +
                'by the compiler.'
            ),
            h('p', {},
                'One very important benefit of this change is the prelude now comes into scope for many optimizations, ' +
                'especially dead code elimination.  We now get dramatically smaller code objects as most prelude functions ' +
                'are eliminated.  The ones that are left are also able to be optimized to remove provably unnecessary type ' +
                'guards.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A second-class module system and namespacing'),
            h('p', {},
                'The original module system was very simple and leveraged ',
                h('code', {}, 'dict'),
                '.  This was a cute trick, but it turns out that made interprocedural analysis rather tricky.  Especially ' +
                'tricky was that we couldn\'t see through the ',
                h('code', {}, 'dict'),
                ' entries into modules to work out structure types.  This meant we ended up doing runtime lookups of ' +
                'structure slots instead of the compiler doing compile-time slot analysis.'
            ),
            h('p', {},
                'Menai now has a new "second-class" module system and namespacing that allows for ',
                h('code', {}, 'export'),
                ' of capabilities that can then be brought in with ',
                h('code', {}, 'import'),
                '.  The namespace operator, ',
                h('code', {}, '::'),
                ' has been introduced to ensure we have no ambiguity about namespace and operator names.'
            ),
            h('p', {},
                'Fixing this highlighted a couple of scoping bugs.  These bugs are now resolved.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Benchmarking'),
            h('p', {},
                'Updated benchmark results for Menai.  There are some significant improvements to the numbers from 2 days ago!'
            ),
            CodeFragment.create({language: 'text', code:
`BMP_PARSER
────────────────────────────────────────────────────────
Case                            mean (ms)       min (ms)
────────────────────────────────────────────────────────
truecolour-64x64                    0.334          0.316
truecolour-128x128                  1.304          1.274
truecolour-topdown-128x128          1.310          1.277
truecolour-alpha-128x128            1.619          1.594
padded-65x64                        0.322          0.310
────────────────────────────────────────────────────────


CALENDAR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
short_5d                          0.024          0.019
month_20d                         0.073          0.070
quarter_60d                       0.220          0.212
year_250d                         0.865          0.862
months_600d                       1.539          1.533
──────────────────────────────────────────────────────


DEFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           1.726          1.696
text-32k                         10.150         10.062
incremental-16k                  26.993         26.876
runs-32k                         92.787         91.830
──────────────────────────────────────────────────────


INFLATE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.408          0.396
text-32k                          0.780          0.750
incremental-16k                   1.194          1.154
stored-8k                         0.192          0.187
runs-32k                          3.162          3.092
──────────────────────────────────────────────────────


JSON_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
object                            0.016          0.014
flat_array                        0.099          0.094
flat_object                       0.089          0.084
mixed_nested                      0.199          0.192
string_heavy                      0.065          0.064
numbers_array                     0.020          0.019
unicode_strings                   0.009          0.008
long_string                       0.064          0.063
deep_array                        0.220          0.208
──────────────────────────────────────────────────────


PNG_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
greyscale-64x64                   2.911          2.873
greyscale-alpha-64x64            17.321         17.170
palette-128x128                   6.613          6.584
truecolour-128x128               98.653         98.194
truecolour-alpha-128x128        133.683        132.704
truecolour-192x192              228.138        226.158
──────────────────────────────────────────────────────


RUBIKS_CUBE
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.090          0.085
2-move                            0.092          0.085
3-move                            0.205          0.200
4-move                            2.123          2.112
5-move                            7.095          7.032
6-move                           45.532         45.433
7-move                          101.123        100.920
──────────────────────────────────────────────────────


RUBIKS_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
1-move                            0.085          0.080
2-move                            0.085          0.081
3-move                            0.191          0.187
4-move                            1.982          1.962
5-move                            6.696          6.666
6-move                           42.718         42.583
7-move                           94.780         94.310
──────────────────────────────────────────────────────


SORT
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
n=10                              0.005          0.004
n=50                              0.030          0.029
n=100                             0.068          0.066
n=250                             0.198          0.195
n=500                             0.441          0.437
n=1000                            0.986          0.978
n=2500                            2.872          2.852
n=5000                            6.300          6.219
n=10000                          13.481         13.373
──────────────────────────────────────────────────────


SUDOKU
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 17.127         17.045
Medium (30 givens)                0.248          0.243
Hard (25 givens)               3633.849       3633.849
Expert (23 givens)              208.515        208.515
──────────────────────────────────────────────────────


SUDOKU_VECTOR
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
Easy (36 givens)                 11.742         11.693
Medium (30 givens)                0.176          0.174
Hard (25 givens)               2587.343       2587.343
Expert (23 givens)              147.970        147.970
──────────────────────────────────────────────────────


ZIP_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
single-deflate/parse              0.209          0.201
single-deflate/extract            0.437          0.427
single-stored/parse               0.204          0.198
single-stored/extract             0.231          0.227
mixed-16/parse                    0.220          0.214
mixed-16/extract                  1.957          1.938
many-128/parse                    0.322          0.310
many-128/extract                 25.028         24.853
large-256k/parse                  0.208          0.202
large-256k/extract                8.132          8.039
──────────────────────────────────────────────────────


ZLIB_PARSER
──────────────────────────────────────────────────────
Case                          mean (ms)       min (ms)
──────────────────────────────────────────────────────
text-4k                           0.662          0.648
text-32k                          2.607          2.595
incremental-16k                   2.202          2.197
runs-32k                          5.171          5.120
──────────────────────────────────────────────────────`})
        )
    ];
}

export const notesPost_2026_09_19 = new NotesPost(
    '2026-09-19: Menai language design changes',
    '2026-09-19',
    '/notes/2026-09-19',
    '2026-09-19: Menai language design changes - type propagation, removal of global namespaces in favour of nested letrec scopes, a second-class module system with namespacing, and updated benchmarks.',
    null,
    null,
    notesOpening_2026_09_19,
    notesArticle_2026_09_19,
    null
);
