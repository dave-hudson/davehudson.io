import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_08_16(): VElement[] {
    return [
        h('p', {},
            'For a couple of weeks I\'ve been working on improving the performance and reliability of Menai.'
        )
    ];
}

function notesArticle_2026_08_16(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Benchmarks'),
            h('p', {},
                'It\'s a while since I captured benchmark results for Menai.  One thing I did discover this week was that we were ' +
                'timing a bunch of slow Python operations for which there was no equivalent in the 2 Python comparisons.  Given that ' +
                'I\'ve updated the benchmark code so we get an apples-for-apples view.'
            ),
            h('p', {},
                'In the last few weeks there have also been a ton of VM and compiler improvements.  This means the results here are ' +
                'much better than the ones from 2026-04-26 (the last time I captured some).'
            ),
            h('p', {},
                'There was one major change in the VM design that reduced performance considerably - type assertions were made explicit, ' +
                'rather than being a runtime check.  This is the right thing to do in the long term as we\'ll be able to remove more of them ' +
                'as the compiler improves, but it does mean we appear to have only made very modest gains in almost 4 months.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.056      0.052 ✓       0.002      0.001      23x faster ✓       0.010      0.008     5.5x faster ✓
flat_array                     0.160      0.154 ✓       0.004      0.003      43x faster ✓       0.051      0.050     3.1x faster ✓
flat_object                    0.143      0.136 ✓       0.005      0.005      28x faster ✓       0.045      0.044     3.2x faster ✓
mixed_nested                   0.268      0.255 ✓       0.009      0.008      31x faster ✓       0.124      0.115     2.2x faster ✓
string_heavy                   0.115      0.107 ✓       0.005      0.004      23x faster ✗       0.057      0.056     2.0x faster ✗
numbers_array                  0.061      0.059 ✓       0.002      0.001      36x faster ✓       0.010      0.009     6.1x faster ✓
unicode_strings                0.050      0.047 ✓       0.001      0.001      45x faster ✗       0.006      0.005     8.6x faster ✗
long_string                    0.122      0.113 ✓       0.002      0.002      58x faster ✓       0.072      0.070     1.7x faster ✓
deep_array                     0.387      0.369 ✓       0.023      0.020      17x faster ✓       0.152      0.148     2.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 7/9 ✗  |  Python (functional) 7/9 ✗


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.187      0.187 ✓       0.108      0.108     1.7x faster ✓       0.059      0.059     3.2x faster ✓
2-move                         0.186      0.186 ✓       0.097      0.097     1.9x faster ✓       0.057      0.057     3.3x faster ✓
3-move                         0.323      0.323 ✓       0.210      0.210     1.5x faster ✓       0.120      0.120     2.7x faster ✓
4-move                         2.275      2.275 ✓       2.142      2.142     1.1x faster ✓       1.280      1.280     1.8x faster ✓
5-move                         7.550      7.550 ✓       7.407      7.407     1.0x faster ✓       4.359      4.359     1.7x faster ✓
6-move                        48.986     48.986 ✓      46.539     46.539     1.1x faster ✓      28.280     28.280     1.7x faster ✓
7-move                       110.291    110.291 ✓     103.912    103.912     1.1x faster ✓      63.526     63.526     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.019      0.018 ✓       0.000      0.000      52x faster ✓       0.005      0.003     4.2x faster ✓
n=50                           0.055      0.053 ✓       0.002      0.001      36x faster ✓       0.023      0.021     2.4x faster ✓
n=100                          0.122      0.120 ✓       0.003      0.002      40x faster ✓       0.051      0.049     2.4x faster ✓
n=250                          0.354      0.337 ✓       0.008      0.006      43x faster ✓       0.136      0.132     2.6x faster ✓
n=500                          0.839      0.802 ✓       0.019      0.013      45x faster ✓       0.308      0.305     2.7x faster ✓
n=1000                         2.136      2.069 ✓       0.041      0.030      52x faster ✓       0.677      0.670     3.2x faster ✓
n=2500                         9.253      9.215 ✓       0.108      0.076      86x faster ✓       1.885      1.861     4.9x faster ✓
n=5000                        35.318     35.202 ✓       0.288      0.235     123x faster ✓       4.006      3.990     8.8x faster ✓
n=10000                      147.644    146.145 ✓       0.693      0.633     213x faster ✓       8.704      8.682      17x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              30.173     30.040 ✓       3.148      3.111     9.6x faster ✓      11.418     11.345     2.6x faster ✓
Medium (30 givens)             0.459      0.448 ✓       0.043      0.040      11x faster ✓       0.162      0.156     2.8x faster ✓
Hard (25 givens)            6532.427   6532.427 ✓     715.983    715.983     9.1x faster ✓    1989.969   1989.969     3.3x faster ✓
Expert (23 givens)           370.823    370.823 ✓      40.050     40.050     9.3x faster ✓     163.657    163.657     2.3x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓`
            })
        )
    ];
}

export const notesPost_2026_08_16 = new NotesPost(
    '2026-08-16: Menai improvements',
    '2026-08-16',
    '/notes/2026-08-16',
    '2026-08-16: Menai improvements - Updated benchmark results comparing Menai performance against Python for JSON parsing, Rubik\'s Cube solving, sorting, and Sudoku.',
    null,
    null,
    notesOpening_2026_08_16,
    notesArticle_2026_08_16,
    null
);
