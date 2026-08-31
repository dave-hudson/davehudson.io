import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_08_30(): VElement[] {
    return [
        h('p', {},
            'I made the last few changes to Menai v0.3 (and then v0.3.1 when I spotted a mistake).  ' +
            'These are now published to GitHub and PyPI.'
        ),
        h('p', {},
            'As a lot of the work has been performance-related I wanted to capture the latest numbers for ',
            h('code', {}, 'menai-benchmark'),
            '.'
        )
    ];
}

function notesArticle_2026_08_30(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Performance'),
            h('p', {},
                'The performance numbers aren\'t hugely changed in the last 2 weeks.  ' +
                'Probably the most significant change is Menai no longer leaks memory as it has a garbage collector for closures.  ' +
                'This is an important change but slowed things down.'
            ),
            h('p', {},
                'Offsetting this has been a few code generation improvements.'
            ),
            h('p', {},
                'The good news is the VM now has memory leak detection capabilities and no leaks are now detected during any tests.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.021      0.018 ✓       0.002      0.001     8.4x faster ✓       0.011      0.009     1.9x faster ✓
flat_array                     0.122      0.121 ✓       0.004      0.004      30x faster ✓       0.056      0.054     2.2x faster ✓
flat_object                    0.102      0.099 ✓       0.005      0.005      19x faster ✓       0.048      0.047     2.1x faster ✓
mixed_nested                   0.226      0.225 ✓       0.009      0.008      26x faster ✓       0.127      0.124     1.8x faster ✓
string_heavy                   0.076      0.075 ✓       0.005      0.004      16x faster ✓       0.058      0.058     1.3x faster ✓
numbers_array                  0.024      0.023 ✓       0.002      0.001      15x faster ✓       0.010      0.009     2.4x faster ✓
unicode_strings                0.013      0.012 ✓       0.001      0.001      12x faster ✓       0.006      0.006     2.1x faster ✓
long_string                    0.084      0.083 ✓       0.002      0.002      41x faster ✓       0.075      0.073     1.1x faster ✓
deep_array                     0.343      0.340 ✓       0.022      0.021      15x faster ✓       0.164      0.162     2.1x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.099      0.095 ✓       0.095      0.087     1.0x faster ✓       0.056      0.051     1.8x faster ✓
2-move                         0.096      0.095 ✓       0.094      0.087     1.0x faster ✓       0.052      0.051     1.8x faster ✓
3-move                         0.220      0.216 ✓       0.212      0.208     1.0x faster ✓       0.117      0.115     1.9x faster ✓
4-move                         2.238      2.236 ✓       2.199      2.192     1.0x faster ✓       1.268      1.264     1.8x faster ✓
5-move                         7.583      7.552 ✓       7.266      7.247     1.0x faster ✓       4.349      4.346     1.7x faster ✓
6-move                        49.123     48.991 ✓      47.242     47.191     1.0x faster ✓      28.377     28.312     1.7x faster ✓
7-move                       110.738    110.690 ✓     103.868    103.701     1.1x faster ✓      63.383     63.196     1.7x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.007      0.006 ✓       0.000      0.000      17x faster ✓       0.004      0.003     1.6x faster ✓
n=50                           0.041      0.039 ✓       0.002      0.001      26x faster ✓       0.025      0.023     1.7x faster ✓
n=100                          0.099      0.098 ✓       0.003      0.002      29x faster ✓       0.053      0.051     1.9x faster ✓
n=250                          0.320      0.318 ✓       0.009      0.006      35x faster ✓       0.148      0.144     2.2x faster ✓
n=500                          0.803      0.801 ✓       0.019      0.013      43x faster ✓       0.316      0.312     2.5x faster ✓
n=1000                         2.148      2.143 ✓       0.041      0.029      53x faster ✓       0.685      0.678     3.1x faster ✓
n=2500                         9.566      9.551 ✓       0.117      0.081      82x faster ✓       1.909      1.899     5.0x faster ✓
n=5000                        36.438     36.414 ✓       0.286      0.232     127x faster ✓       4.073      4.061     8.9x faster ✓
n=10000                      150.944    150.604 ✓       0.696      0.636     217x faster ✓       8.659      8.631      17x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              28.802     28.749 ✓       3.205      3.186     9.0x faster ✓      11.342     11.314     2.5x faster ✓
Medium (30 givens)             0.415      0.403 ✓       0.042      0.040     9.8x faster ✓       0.162      0.155     2.6x faster ✓
Hard (25 givens)            6197.466   6197.466 ✓     719.936    719.936     8.6x faster ✓    2023.149   2023.149     3.1x faster ✓
Expert (23 givens)           350.739    350.739 ✓      40.964     40.964     8.6x faster ✓     166.414    166.414     2.1x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓`
            })
        ),
        h('section', {},
            h('h2', {}, 'Menai v0.3'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'Added more floating point operations.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'string->float'), ' and ', h('code', {}, 'string->complex'), ' operations.'
                ),
                h('li', {},
                    'Improved performance of ', h('code', {}, 'string->integer'), '.'
                ),
                h('li', {},
                    'Added a closure garbage collector so Menai can reclaim memory.'
                ),
                h('li', {},
                    'Added a compile-time leak detector (', h('code', {}, 'MENAI_DEBUG_LEAKS'),
                    ') that tracks all MenaiValue allocations and reports any not freed at VM teardown.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'number->string'), ' operation.'
                ),
                h('li', {},
                    'Removed overly-conservative closure restriction for back-propagating move instructions.'
                ),
                h('li', {},
                    'Added a new CFG dead capture elimination pass that removes captures that are eliminated by other CFG passes.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Menai no longer leaks memory!'
                ),
                h('li', {},
                    'Coallesced type guards that are the same (after propagation).'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {},
                    'Added ADRs into the docs so design choices are visible.'
                )
            )
        )
    ];
}

export const notesPost_2026_08_30 = new NotesPost(
    '2026-08-30: Menai performance update and Menai v0.3',
    '2026-08-30',
    '/notes/2026-08-30',
    '2026-08-30: Menai performance update and Menai v0.3 - Performance numbers for menai-benchmark, closure garbage collector, leak detection, and new floating point operations.',
    null,
    null,
    notesOpening_2026_08_30,
    notesArticle_2026_08_30,
    null
);
