import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_02(): VElement[] {
    return [
        h('p', {},
            'A few days ago I wrote a blog post about Menai and noted a performance issue.  ' +
            'Yesterday I started to look at time complexity in the sort benchmark.'
        )
    ];
}

function notesArticle_2026_09_02(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Hello cons cells'),
            h('p', {},
                'The quadratic behaviour in the sort benchmark has been bugging me for a while.  ' +
                'GLM-5.2 and I ran some analysis and we realized there was a O(n^2) behaviour in it that was unavoidable ' +
                'with the original design of lists in Menai.'
            ),
            h('p', {},
                'After some thinking I figured I should revisit a core assumption in the design and try out a cons cell ' +
                'approach as opposed to the previous vector-like design.  ' +
                'I\'ve been wondering about this for a while because of some future potential data structures that might ' +
                'have wanted them.'
            ),
            h('p', {},
                'It turns out the impact is huge.'
            ),
            h('p', {},
                'We lose the ability to do fast random access, but we gain the ability to do fast prepending when building ' +
                'lists.  This latter point turns out to be a huge deal.'
            ),
            h('p', {},
                'There are minor losses (about 3%-5%) in the Rubik\'s cube and sudoku benchmarks, but the JSON parser ' +
                'improves dramatically on the ',
                h('code', {}, 'deep_array'),
                ' benchmark.  ' +
                'The huge win is on the sort benchmark where the n=10000 case drops from 150 ms to 23 ms!'
            ),
            h('p', {},
                'The change is interesting because it doesn\'t change the language surface at all.  ' +
                'We still retain the position that there are no improper lists in Menai, the lists of operations do not ' +
                'change, nor does the compiler.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.021      0.018 ✓       0.003      0.001     8.1x faster ✓       0.011      0.009     1.9x faster ✓
flat_array                     0.118      0.117 ✓       0.004      0.004      27x faster ✓       0.057      0.054     2.1x faster ✓
flat_object                    0.106      0.101 ✓       0.006      0.005      17x faster ✓       0.049      0.047     2.2x faster ✓
mixed_nested                   0.229      0.226 ✓       0.009      0.008      25x faster ✓       0.127      0.124     1.8x faster ✓
string_heavy                   0.076      0.075 ✓       0.005      0.004      15x faster ✓       0.058      0.056     1.3x faster ✓
numbers_array                  0.024      0.023 ✓       0.002      0.001      14x faster ✓       0.010      0.009     2.4x faster ✓
unicode_strings                0.013      0.012 ✓       0.001      0.001      11x faster ✓       0.006      0.006     2.1x faster ✓
long_string                    0.084      0.083 ✓       0.002      0.002      40x faster ✓       0.074      0.074     1.1x faster ✓
deep_array                     0.254      0.249 ✓       0.023      0.022      11x faster ✓       0.165      0.162     1.5x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.113      0.106 ✓       0.098      0.084     1.2x faster ✓       0.055      0.049     2.1x faster ✓
2-move                         0.105      0.101 ✓       0.093      0.087     1.1x faster ✓       0.053      0.050     2.0x faster ✓
3-move                         0.230      0.226 ✓       0.206      0.203     1.1x faster ✓       0.118      0.117     1.9x faster ✓
4-move                         2.404      2.383 ✓       2.156      2.149     1.1x faster ✓       1.278      1.271     1.9x faster ✓
5-move                         8.010      7.986 ✓       7.406      7.384     1.1x faster ✓       4.360      4.356     1.8x faster ✓
6-move                        51.832     51.785 ✓      47.545     47.464     1.1x faster ✓      28.506     28.472     1.8x faster ✓
7-move                       115.831    115.584 ✓     106.782    106.241     1.1x faster ✓      63.561     63.506     1.8x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.008      0.006 ✓       0.001      0.000      14x faster ✓       0.006      0.004     1.5x faster ✓
n=50                           0.043      0.041 ✓       0.001      0.001      29x faster ✓       0.024      0.022     1.8x faster ✓
n=100                          0.098      0.096 ✓       0.003      0.002      32x faster ✓       0.051      0.049     1.9x faster ✓
n=250                          0.308      0.305 ✓       0.009      0.006      34x faster ✓       0.148      0.144     2.1x faster ✓
n=500                          0.705      0.699 ✓       0.019      0.013      38x faster ✓       0.317      0.313     2.2x faster ✓
n=1000                         1.644      1.612 ✓       0.043      0.030      38x faster ✓       0.685      0.675     2.4x faster ✓
n=2500                         4.860      4.799 ✓       0.118      0.081      41x faster ✓       1.896      1.872     2.6x faster ✓
n=5000                        10.487     10.376 ✓       0.283      0.230      37x faster ✓       4.045      4.027     2.6x faster ✓
n=10000                       23.108     22.947 ✓       0.694      0.640      33x faster ✓       8.739      8.723     2.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              29.754     29.415 ✓       3.210      3.179     9.3x faster ✓      11.366     11.349     2.6x faster ✓
Medium (30 givens)             0.421      0.413 ✓       0.042      0.040     9.9x faster ✓       0.162      0.155     2.6x faster ✓
Hard (25 givens)            6405.951   6405.951 ✓     716.503    716.503     8.9x faster ✓    2027.631   2027.631     3.2x faster ✓
Expert (23 givens)           358.433    358.433 ✓      40.518     40.518     8.8x faster ✓     166.061    166.061     2.2x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓`
            })
        )
    ];
}

export const notesPost_2026_09_02 = new NotesPost(
    '2026-09-02: Menai performance update - hello cons cells!',
    '2026-09-02',
    '/notes/2026-09-02',
    '2026-09-02: Menai performance update - hello cons cells! - Switching Menai lists to cons cells removes unavoidable O(n^2) behaviour: sort n=10000 drops from 150 ms to 23 ms.',
    null,
    null,
    notesOpening_2026_09_02,
    notesArticle_2026_09_02,
    null
);
