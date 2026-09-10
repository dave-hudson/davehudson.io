import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_10(): VElement[] {
    return [
        h('p', {},
            'More progress on making Menai faster, with vectors, loop invariant code motion, constant coalescing, and jump threading.'
        )
    ];
}

function notesArticle_2026_09_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Vectors'),
            h('p', {},
                'One of the problems with the linked list approach to lists is that we have O(n) ' +
                'access to elements.  Some things really want random access, so added a ' +
                h('code', {}, 'vector') +
                ' type.'
            ),
            h('p', {},
                'The benchmark now features vector-based versions of the Rubik\'s cube and Sudoku ' +
                'solver.  Rubik\'s turns out to be pretty-much neutral, but Sudoku is a huge win ' +
                'for vectors.  See data below.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Loop invariant code motion'),
            h('p', {},
                'We could previously hoist type guards, but added a loop invariant code motion ' +
                'feature.  This is a slight loss on a few benchmarks for now, but a huge win ' +
                'on a few others.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.020      0.018 ✓       0.003      0.001     7.9x faster ✓       0.010      0.008     1.9x faster ✓
flat_array                     0.108      0.107 ✓       0.004      0.003      28x faster ✓       0.052      0.051     2.1x faster ✓
flat_object                    0.098      0.096 ✓       0.005      0.004      19x faster ✓       0.044      0.043     2.2x faster ✓
mixed_nested                   0.222      0.216 ✓       0.008      0.007      27x faster ✓       0.127      0.117     1.7x faster ✓
string_heavy                   0.068      0.066 ✓       0.005      0.004      13x faster ✓       0.057      0.056     1.2x faster ✓
numbers_array                  0.024      0.022 ✓       0.002      0.001      10x faster ✓       0.012      0.010     2.0x faster ✓
unicode_strings                0.012      0.010 ✓       0.002      0.001     7.9x faster ✓       0.006      0.005     2.0x faster ✓
long_string                    0.064      0.063 ✓       0.002      0.002      31x faster ✓       0.066      0.065     1.0x slower ✓
deep_array                     0.229      0.224 ✓       0.023      0.019     9.9x faster ✓       0.148      0.146     1.5x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.105      0.099 ✓       0.099      0.091     1.1x faster ✓       0.057      0.052     1.9x faster ✓
2-move                         0.100      0.094 ✓       0.094      0.088     1.1x faster ✓       0.052      0.048     1.9x faster ✓
3-move                         0.227      0.213 ✓       0.206      0.199     1.1x faster ✓       0.113      0.110     2.0x faster ✓
4-move                         2.180      2.172 ✓       2.056      2.042     1.1x faster ✓       1.199      1.194     1.8x faster ✓
5-move                         7.630      7.473 ✓       7.305      7.237     1.0x faster ✓       4.264      4.253     1.8x faster ✓
6-move                        48.425     48.149 ✓      46.045     45.705     1.1x faster ✓      26.328     26.301     1.8x faster ✓
7-move                       108.562    108.220 ✓     104.226    104.007     1.0x faster ✓      62.304     62.242     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


RUBIKS_VECTOR
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                             Menai (vector)                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.099      0.099 ✓       0.093      0.089     1.1x faster ✓       0.054      0.052     1.8x faster ✓
2-move                         0.102      0.100 ✓       0.096      0.092     1.1x faster ✓       0.054      0.052     1.9x faster ✓
3-move                         0.230      0.224 ✓       0.210      0.206     1.1x faster ✓       0.119      0.117     1.9x faster ✓
4-move                         2.241      2.167 ✓       2.224      2.207     1.0x faster ✓       1.254      1.219     1.8x faster ✓
5-move                         7.565      7.465 ✓       7.673      7.627     1.0x slower ✓       4.501      4.492     1.7x faster ✓
6-move                        52.362     51.563 ✓      46.889     46.597     1.1x faster ✓      27.232     27.169     1.9x faster ✓
7-move                       110.096    109.441 ✓     103.306    103.180     1.1x faster ✓      63.995     63.923     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai (vector) 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.007      0.006 ✓       0.000      0.000      14x faster ✓       0.005      0.004     1.3x faster ✓
n=50                           0.031      0.030 ✓       0.001      0.001      21x faster ✓       0.025      0.022     1.2x faster ✓
n=100                          0.069      0.068 ✓       0.003      0.002      23x faster ✓       0.051      0.049     1.3x faster ✓
n=250                          0.202      0.198 ✓       0.008      0.006      24x faster ✓       0.140      0.137     1.4x faster ✓
n=500                          0.453      0.450 ✓       0.017      0.012      26x faster ✓       0.308      0.300     1.5x faster ✓
n=1000                         1.044      1.027 ✓       0.039      0.028      26x faster ✓       0.693      0.683     1.5x faster ✓
n=2500                         3.092      2.962 ✓       0.111      0.078      28x faster ✓       1.932      1.902     1.6x faster ✓
n=5000                         6.855      6.804 ✓       0.292      0.246      23x faster ✓       4.134      4.122     1.7x faster ✓
n=10000                       14.897     14.861 ✓       0.678      0.593      22x faster ✓       8.842      8.816     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              17.193     17.123 ✓       3.182      3.144     5.4x faster ✓      11.416     11.310     1.5x faster ✓
Medium (30 givens)             0.269      0.259 ✓       0.043      0.040     6.2x faster ✓       0.161      0.153     1.7x faster ✓
Hard (25 givens)            3770.587   3770.587 ✓     707.875    707.875     5.3x faster ✓    1979.050   1979.050     1.9x faster ✓
Expert (23 givens)           211.965    211.965 ✓      39.832     39.832     5.3x faster ✓     163.559    163.559     1.3x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓


SUDOKU_VECTOR
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                             Menai (vector)                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              12.582     12.354 ✓       3.203      3.155     3.9x faster ✓      11.514     11.401     1.1x faster ✓
Medium (30 givens)             0.202      0.197 ✓       0.046      0.042     4.4x faster ✓       0.169      0.159     1.2x faster ✓
Hard (25 givens)            2738.479   2738.479 ✓     703.712    703.712     3.9x faster ✓    2001.020   2001.020     1.4x faster ✓
Expert (23 givens)           157.335    157.335 ✓      40.280     40.280     3.9x faster ✓     162.944    162.944     1.0x slower ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai (vector) 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓`
            })
        ),
        h('section', {},
            h('h2', {}, 'Eliminate duplicate constants in a function'),
            h('p', {},
                'Having hoisted loop invariants it became obvious we had some interesting functions where the same constants were ' +
                'being loaded multiple times.  Added a constant coallescing operation that eliminates this where possible.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Jump threading'),
            h('p', {},
                'After the changes above I found a number of places where we could see a conditional jump to an unconditional jump. ' +
                'To solve this GLM and I added a jump threading pass that redirects the conditional branch to the correct jump ' +
                'target.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Slice operations'),
            h('p', {},
                'One weird thing that I noticed was ' +
                h('code', {}, 'bytes-slice') +
                ' was clamping output if given out-of-bounds range arguments. ' +
                'All other slice operations generate an error, so now ' +
                h('code', {}, 'bytes-slice') +
                ' does the same.'
            ),
            h('p', {},
                'As this is an important principle there\'s now a new ADR for this behaviour.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Thermal throttling on my Mac'),
            h('p', {},
                'One of the consistent problems I\'ve been seeing while benchmarking things is inconsistency in results. ' +
                'Changes I can see that must be faster (e.g. eliminating opcodes) end up benchmarking slower!'
            ),
            h('p', {},
                'It appears the MacBook Air M3\'s lack of fans often leads it to throttle performance. ' +
                'For now I\'ll just continue on the basis that less code will ultimately always be faster than more code.'
            )
        )
    ];
}

export const notesPost_2026_09_10 = new NotesPost(
    '2026-09-10: More speed...',
    '2026-09-10',
    '/notes/2026-09-10',
    '2026-09-10: More speed... - adding a vector type for random access, loop invariant code motion, constant coalescing, jump threading, fixing bytes-slice error behaviour, and dealing with thermal throttling on the MacBook Air M3.',
    null,
    null,
    notesOpening_2026_09_10,
    notesArticle_2026_09_10,
    null
);
