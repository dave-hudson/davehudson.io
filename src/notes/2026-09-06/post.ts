import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_06(): VElement[] {
    return [
        h('p', {},
            'More thoughts on making Menai faster.'
        )
    ];
}

function notesArticle_2026_09_06(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Memory management'),
            h('p', {},
                'My first set of changes today didn\'t actually make things faster.  ',
                'They might actually have slightly slowed things down.'
            ),
            h('p', {},
                'I took the current memory allocators for reference counted objects and embedded the reference count and object ' +
                'type in the pool block header.  This actually creates a little extra work, but means the reference counts and ' +
                'runtime types are no longer part of the visible objects.'
            ),
            h('p', {},
                'This change should set things on the way to being easier to understand and then there are likely to be more ' +
                'optimizations that are easier with this done.'
            )
        ),
        h('section', {},
            h('h2', {}, 'List operations'),
            h('p', {},
                'Looking at the implementations of list-append, list-concat, list-remove and list-slice, it turned out ' +
                'there was a silly implementation approach that built lists in reverse and then reversed them!  ',
                'This makes perfect sense inside code written in Menai, and absolutely no sense in code written in C.'
            ),
            CodeFragment.create({language: 'text', code:
`JSON_PARSER
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
object                         0.019      0.018 ✓       0.002      0.001     7.9x faster ✓       0.011      0.009     1.8x faster ✓
flat_array                     0.108      0.108 ✓       0.004      0.004      27x faster ✓       0.056      0.054     1.9x faster ✓
flat_object                    0.097      0.096 ✓       0.006      0.005      18x faster ✓       0.048      0.047     2.0x faster ✓
mixed_nested                   0.222      0.220 ✓       0.009      0.008      25x faster ✓       0.129      0.124     1.7x faster ✓
string_heavy                   0.075      0.074 ✓       0.005      0.004      15x faster ✓       0.058      0.057     1.3x faster ✓
numbers_array                  0.023      0.022 ✓       0.002      0.001      14x faster ✓       0.010      0.009     2.3x faster ✓
unicode_strings                0.011      0.010 ✓       0.001      0.001      10x faster ✓       0.006      0.006     1.7x faster ✓
long_string                    0.087      0.085 ✓       0.002      0.002      42x faster ✓       0.074      0.072     1.2x faster ✓
deep_array                     0.262      0.258 ✓       0.023      0.021      12x faster ✓       0.164      0.160     1.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


RUBIKS_CUBE
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
1-move                         0.102      0.098 ✓       0.097      0.089     1.0x faster ✓       0.056      0.051     1.8x faster ✓
2-move                         0.100      0.098 ✓       0.091      0.087     1.1x faster ✓       0.053      0.051     1.9x faster ✓
3-move                         0.228      0.225 ✓       0.206      0.203     1.1x faster ✓       0.117      0.115     1.9x faster ✓
4-move                         2.369      2.363 ✓       2.180      2.170     1.1x faster ✓       1.272      1.270     1.9x faster ✓
5-move                         8.064      8.044 ✓       7.398      7.376     1.1x faster ✓       4.345      4.340     1.9x faster ✓
6-move                        52.160     52.084 ✓      47.220     47.118     1.1x faster ✓      28.195     28.156     1.8x faster ✓
7-move                       116.112    116.012 ✓     106.253    106.086     1.1x faster ✓      63.012     62.983     1.8x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓


SORT
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
n=10                           0.007      0.006 ✓       0.000      0.000      18x faster ✓       0.005      0.004     1.5x faster ✓
n=50                           0.041      0.040 ✓       0.002      0.001      27x faster ✓       0.026      0.024     1.6x faster ✓
n=100                          0.094      0.093 ✓       0.003      0.002      30x faster ✓       0.054      0.052     1.7x faster ✓
n=250                          0.282      0.280 ✓       0.009      0.006      32x faster ✓       0.149      0.145     1.9x faster ✓
n=500                          0.645      0.641 ✓       0.018      0.013      35x faster ✓       0.321      0.315     2.0x faster ✓
n=1000                         1.469      1.465 ✓       0.041      0.029      36x faster ✓       0.682      0.677     2.2x faster ✓
n=2500                         4.299      4.276 ✓       0.119      0.084      36x faster ✓       1.933      1.918     2.2x faster ✓
n=5000                         9.573      9.540 ✓       0.294      0.252      33x faster ✓       4.131      4.120     2.3x faster ✓
n=10000                       20.776     20.707 ✓       0.697      0.641      30x faster ✓       8.749      8.734     2.4x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓


SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              20.238     19.941 ✓       3.190      3.182     6.3x faster ✓      11.241     11.183     1.8x faster ✓
Medium (30 givens)             0.299      0.289 ✓       0.043      0.040     7.0x faster ✓       0.162      0.154     1.9x faster ✓
Hard (25 givens)            4317.945   4317.945 ✓     711.339    711.339     6.1x faster ✓    1989.804   1989.804     2.2x faster ✓
Expert (23 givens)           258.864    258.864 ✓      40.520     40.520     6.4x faster ✓     163.905    163.905     1.6x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓
`
            }),
            h('p', {},
                'Nice wins on sort and sudoku, but the Rubik\'s cube benchmark is stubbornly tricky.'
            )
        )
    ];
}

export const notesPost_2026_09_06 = new NotesPost(
    '2026-09-06: More Menai VM improvements',
    '2026-09-06',
    '/notes/2026-09-06',
    '2026-09-06: More Menai VM improvements - memory management changes embedding reference counts in pool block headers, plus fixing list operations that were building in reverse.',
    null,
    null,
    notesOpening_2026_09_06,
    notesArticle_2026_09_06,
    null
);
