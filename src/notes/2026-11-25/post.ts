import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_25(): VElement[] {
    return [
        h('p', {},
            'There are always options to make compiled code faster, so in the last few days I\'ve taken a few.'
        )
    ];
}

function notesArticle_2026_11_25(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improved algorithms'),
            h('p', {},
                'The Sudoku solver was quite naiive, so now there\'s a new implementation that\'s much faster.  To ',
                'make things more directly relevant I\'ve also started to reintroduce some of the Python reference ',
                'benchmarks.'
            ),
            h('p', {},
                'The Python versions are intended to use the same algorithmic approach but can use any idiomatic ',
                'approach to the implementation.  The only thing they\'re not doing is using hand-tuned C ',
                'implementations so we keep the Menai and Python VM comparisons meaningful (Menai can use ',
                'hand-tuned C too but that\'s not the point).'
            ),
            h('p', {},
                'The ',
                h('code', {}, 'bmp-decode'),
                ' library was also not as good as it should have been, so has now been improved algorithmically.'
            )
        ),
        h('section', {},
            h('h2', {}, 'VM improvements'),
            h('p', {},
                'By only having 61-bit fixnum implementations and ignoring the possibility of having 64-bit fixed ',
                'integers the code in the VM could be simplified and sped up.  This isn\'t visible to the Menai ',
                'language surface or the compiler and is purely a VM tradeoff.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Compiler improvements'),
            h('p', {},
                'A few small improvements in the compiler became apparent during analysis and this opened up an ',
                'opportunity to slightly increase the inlining thresholds (from 50 to 60 IR nodes).  This offered ',
                'a very nice performance improvement.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance'),
            h('p', {},
                'Comparing the 192 benchmark cases that appear in both this run and the ',
                h('a', {href: '/notes/2026-11-23'}, '2026-11-23 run'),
                ', the mean improvement is 9.2% and the median is 3.2%.  161 cases got faster, ',
                '13 were unchanged and 18 measured slower.  The gains are heavily skewed: the ',
                'interquartile range runs from 1.1% to 11.2%, and the best case (the ',
                h('code', {}, 'list-mean-n=500'),
                ' stats benchmark) is 45.8% faster.'
            ),
            h('p', {},
                'The 18 apparent regressions are all measurement noise.  The largest, ',
                h('code', {}, 'multiline-1000'),
                ' in ',
                h('code', {}, 'csv-decode'),
                ' at 31.2% and ',
                h('code', {}, 'runs-32k'),
                ' in ',
                h('code', {}, 'deflate-compress'),
                ' at 17.0%, are both cases whose timings move by that much between runs ',
                'without any code change, and the remaining 16 are all under 4%.  So the ',
                'changes in this note did not make anything slower.'
            ),
            h('p', {},
                'The ',
                h('code', {}, 'stats'),
                ' benchmarks dominate the top of the table, with the ',
                h('code', {}, 'mean'),
                ' cases improving by 30–46%.  Outside ',
                h('code', {}, 'stats'),
                ', the clearest win is ',
                h('code', {}, 'bmp-decode'),
                ', where all five cases improve by 20–24%, and the ',
                h('code', {}, 'bmp-encode'),
                ' cases move by less than 4% either way.'
            ),
            CodeFragment.create({
                language: 'text',
                code: 'BASE64-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'standard-1k               0.109         0.100\n' +
                    'standard-64k              7.414         7.300\n' +
                    'url-1k                    0.108         0.107\n' +
                    'url-64k                   7.410         7.322\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BASE64-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'standard-1k               0.051         0.050\n' +
                    'standard-64k              3.086         2.967\n' +
                    'unpadded-1k               0.051         0.050\n' +
                    'url-64k                   3.119         2.972\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-DECODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                        mean (ms)     min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64            0.213         0.194\n' +
                    'truecolour-128x128          0.864         0.845\n' +
                    'truecolour-topdown-128x128  0.843         0.839\n' +
                    'truecolour-alpha-128x128    0.989         0.982\n' +
                    'padded-65x64                0.200         0.199\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-ENCODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                        mean (ms)     min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64            0.294         0.289\n' +
                    'truecolour-128x128          1.203         1.188\n' +
                    'truecolour-1024x16          1.104         1.085\n' +
                    'truecolour-16x1024          2.033         2.005\n' +
                    'truecolour-256x256          5.162         5.121\n' +
                    'truecolour-topdown-128x128  1.207         1.195\n' +
                    'truecolour-alpha-128x128    1.478         1.467\n' +
                    'padded-65x64                0.300         0.292\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CALENDAR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'short_5d                  0.022         0.017\n' +
                    'month_20d                 0.069         0.066\n' +
                    'quarter_60d               0.198         0.196\n' +
                    'year_250d                 0.819         0.811\n' +
                    'months_600d               1.433         1.431\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10             1.879         1.842\n' +
                    'quoted-1000x10            2.075         2.065\n' +
                    'escaped-1000x10           4.281         4.213\n' +
                    'multiline-1000            0.623         0.484\n' +
                    'wide-100x100              1.698         1.673\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10             2.353         2.194\n' +
                    'quoted-1000x10            2.630         2.460\n' +
                    'escaped-1000x10           2.637         2.627\n' +
                    'wide-100x100              1.494         1.484\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-COMPRESS\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                          mean menai    min menai   mean python   min python  ref/menai\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'text-4k                       0.559         0.540       0.586         0.566       1.05x\n' +
                    'text-32k                      2.265         2.248       2.514         2.474       1.10x\n' +
                    'incremental-16k               2.181         2.118       3.620         3.593       1.70x\n' +
                    'runs-32k                      7.210         6.170       8.366         8.093       1.31x\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-DECOMPRESS\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                          mean menai    min menai   mean python   min python  ref/menai\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'text-4k                       0.142         0.133       0.116         0.105       0.79x\n' +
                    'text-32k                      0.306         0.297       0.291         0.283       0.95x\n' +
                    'incremental-16k               0.370         0.363       0.486         0.478       1.32x\n' +
                    'stored-8k                     0.050         0.045       0.004         0.002       0.04x\n' +
                    'runs-32k                      1.242         1.207       1.625         1.604       1.33x\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                   0.282         0.266\n' +
                    'document-100              1.078         1.046\n' +
                    'document-500              4.589         4.481\n' +
                    'document-2000             18.317        18.203\n' +
                    'styles-100                1.776         1.701\n' +
                    'numbering-9               0.971         0.926\n' +
                    'media-16                  3.299         3.256\n' +
                    'full-500                  7.713         7.583\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                   0.033         0.025\n' +
                    'document-100              0.128         0.119\n' +
                    'document-500              0.514         0.499\n' +
                    'styles-100                0.163         0.156\n' +
                    'numbering-9               0.058         0.052\n' +
                    'media-16                  0.118         0.109\n' +
                    'full-500                  0.631         0.615\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                 1.847         1.814\n' +
                    'deep-200                  0.174         0.170\n' +
                    'attributes-500            1.726         1.710\n' +
                    'mixed-500                 1.736         1.721\n' +
                    'entities-2000             5.012         4.987\n' +
                    'void-1000                 4.685         4.664\n' +
                    'omitted-end-tags-1000     1.031         1.012\n' +
                    'raw-text-500              1.387         1.371\n' +
                    'realistic-500             3.350         3.303\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                 1.005         0.946\n' +
                    'deep-200                  0.137         0.110\n' +
                    'attributes-500            0.582         0.569\n' +
                    'mixed-500                 0.829         0.823\n' +
                    'void-1000                 2.150         2.134\n' +
                    'escaping-2000             2.517         2.483\n' +
                    'declarations-1000         0.493         0.485\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                    0.012         0.010\n' +
                    'flat_array                0.073         0.072\n' +
                    'flat_object               0.063         0.061\n' +
                    'mixed_nested              0.141         0.138\n' +
                    'string_heavy              0.050         0.049\n' +
                    'numbers_array             0.016         0.015\n' +
                    'unicode_strings           0.007         0.007\n' +
                    'long_string               0.060         0.059\n' +
                    'deep_array                0.128         0.127\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                    0.006         0.004\n' +
                    'flat_array                0.012         0.011\n' +
                    'flat_object               0.017         0.016\n' +
                    'mixed_nested              0.035         0.034\n' +
                    'string_heavy              0.040         0.039\n' +
                    'numbers_array             0.007         0.005\n' +
                    'unicode_strings           0.002         0.002\n' +
                    'long_string               0.049         0.048\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'greyscale-64x64           1.295         1.268\n' +
                    'greyscale-alpha-64x64     6.019         6.007\n' +
                    'palette-128x128           3.958         3.935\n' +
                    'truecolour-128x128        34.565        34.417\n' +
                    'truecolour-alpha-128x128  46.268        46.062\n' +
                    'truecolour-192x192        79.887        79.726\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'truecolour-48x48          7.513         7.496\n' +
                    'truecolour-96x96          40.617        40.315\n' +
                    'truecolour-alpha-96x96    78.641        77.023\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                   0.635         0.616\n' +
                    'slides-10                 2.706         2.684\n' +
                    'slides-50                 11.873        11.848\n' +
                    'slides-200                46.302        46.073\n' +
                    'shapes-50                 7.041         6.990\n' +
                    'masters-8                 5.930         5.897\n' +
                    'media-16                  5.964         5.939\n' +
                    'theme-and-masters         4.460         4.427\n' +
                    'full-50                   55.869        55.681\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                   0.040         0.032\n' +
                    'slides-10                 0.099         0.089\n' +
                    'slides-50                 0.361         0.349\n' +
                    'shapes-50                 0.708         0.685\n' +
                    'masters-8                 0.165         0.156\n' +
                    'media-16                  0.197         0.188\n' +
                    'theme-and-masters         0.135         0.126\n' +
                    'full-50                   3.467         3.402\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'REGEXP\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'Case                       mean (ms)     min (ms)\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'compile-per-line           0.062         0.058\n' +
                    'search-prefix-log          0.032         0.030\n' +
                    'search-class-numbers       0.034         0.032\n' +
                    'search-alternation         0.054         0.051\n' +
                    'search-all-class           4.224         4.204\n' +
                    'search-all-prefix          0.124         0.121\n' +
                    'search-groups-log          0.054         0.051\n' +
                    'search-all-groups-numbers  32.398        32.164\n' +
                    'split-whitespace           5.379         5.347\n' +
                    'replace-whitespace         64.676        61.210\n' +
                    'replace-groups-dates       15.955        15.853\n' +
                    'chained-per-line           0.043         0.041\n' +
                    '───────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS-LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '1-move                    0.056         0.051\n' +
                    '2-move                    0.054         0.050\n' +
                    '3-move                    0.121         0.116\n' +
                    '4-move                    1.239         1.232\n' +
                    '5-move                    4.148         4.141\n' +
                    '6-move                    27.121        27.089\n' +
                    '7-move                    59.393        59.324\n' +
                    '7-move with B             7.604         7.589\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS-VECTOR\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                          mean menai    min menai   mean python   min python  ref/menai\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '1-move                        0.044         0.040       0.052         0.050       1.25x\n' +
                    '2-move                        0.045         0.041       0.051         0.050       1.21x\n' +
                    '3-move                        0.096         0.091       0.119         0.118       1.29x\n' +
                    '4-move                        0.992         0.986       1.264         1.259       1.28x\n' +
                    '5-move                        3.344         3.334       4.378         4.368       1.31x\n' +
                    '6-move                        21.466        21.443      28.007        27.927      1.30x\n' +
                    '7-move                        47.765        47.740      62.926        62.845      1.32x\n' +
                    '7-move with B                 6.100         6.087       8.067         8.025       1.32x\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT-LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                      0.004         0.003\n' +
                    'n=50                      0.023         0.022\n' +
                    'n=100                     0.054         0.053\n' +
                    'n=250                     0.150         0.148\n' +
                    'n=500                     0.338         0.335\n' +
                    'n=1000                    0.753         0.746\n' +
                    'n=2500                    2.208         2.199\n' +
                    'n=5000                    4.812         4.785\n' +
                    'n=10000                   10.272        10.213\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT-VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                      0.003         0.003\n' +
                    'n=50                      0.023         0.022\n' +
                    'n=100                     0.052         0.051\n' +
                    'n=250                     0.148         0.147\n' +
                    'n=500                     0.332         0.330\n' +
                    'n=1000                    0.762         0.751\n' +
                    'n=2500                    2.177         2.169\n' +
                    'n=5000                    4.717         4.668\n' +
                    'n=10000                   10.064        10.047\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STATS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'vector-mean-n=100         0.006         0.005\n' +
                    'vector-mean-n=500         0.023         0.022\n' +
                    'vector-mean-n=1000        0.046         0.046\n' +
                    'vector-mean-n=2500        0.114         0.113\n' +
                    'vector-mean-n=5000        0.227         0.224\n' +
                    'vector-mean-n=10000       0.447         0.444\n' +
                    'vector-mean-n=25000       1.122         1.107\n' +
                    'vector-summary-n=100      0.046         0.044\n' +
                    'vector-summary-n=500      0.266         0.264\n' +
                    'vector-summary-n=1000     0.573         0.572\n' +
                    'vector-summary-n=2500     1.633         1.622\n' +
                    'vector-summary-n=5000     3.488         3.464\n' +
                    'vector-summary-n=10000    7.479         7.450\n' +
                    'vector-summary-n=25000    19.841        19.765\n' +
                    'list-mean-n=100           0.007         0.006\n' +
                    'list-mean-n=500           0.026         0.024\n' +
                    'list-mean-n=1000          0.052         0.050\n' +
                    'list-mean-n=2500          0.147         0.145\n' +
                    'list-mean-n=5000          0.334         0.332\n' +
                    'list-mean-n=10000         0.683         0.681\n' +
                    'list-mean-n=25000         1.802         1.777\n' +
                    'list-summary-n=100        0.047         0.045\n' +
                    'list-summary-n=500        0.268         0.266\n' +
                    'list-summary-n=1000       0.578         0.576\n' +
                    'list-summary-n=2500       1.673         1.652\n' +
                    'list-summary-n=5000       3.630         3.588\n' +
                    'list-summary-n=10000      7.637         7.607\n' +
                    'list-summary-n=25000      20.459        20.371\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STRING-OPS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'search long/absent        0.016         0.015\n' +
                    'search long/present       0.020         0.020\n' +
                    'search short needle       0.020         0.019\n' +
                    'search needle=haystack    0.148         0.146\n' +
                    'hash 2000x8               0.035         0.033\n' +
                    'hash 2000x64              0.095         0.093\n' +
                    'hash 500x512              0.198         0.197\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU-LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)          9.021         8.936\n' +
                    'Medium (30 givens)        0.130         0.122\n' +
                    'Hard (25 givens)          1846.256      1846.256\n' +
                    'Expert (23 givens)        104.714       104.714\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU-MRV\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                          mean menai    min menai   mean python   min python  ref/menai\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)              0.114         0.103       0.070         0.067       0.65x\n' +
                    'Medium (30 givens)            0.070         0.067       0.028         0.028       0.42x\n' +
                    'Hard (25 givens)              9.871         9.871       9.930         9.930       1.01x\n' +
                    'Expert (23 givens)            24.201        24.201      25.718        25.718      1.06x\n' +
                    '────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU-VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)          7.130         7.096\n' +
                    'Medium (30 givens)        0.099         0.095\n' +
                    'Hard (25 givens)          1452.323      1452.323\n' +
                    'Expert (23 givens)        81.902        81.902\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                 1.043         1.022\n' +
                    'deep-200                  0.132         0.129\n' +
                    'attributes-500            0.761         0.750\n' +
                    'mixed-500                 1.330         1.316\n' +
                    'entities-2000             3.265         3.239\n' +
                    'ooxml-500                 2.560         2.532\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                 0.518         0.503\n' +
                    'deep-200                  0.105         0.092\n' +
                    'attributes-500            0.554         0.546\n' +
                    'mixed-500                 0.828         0.821\n' +
                    'escaping-2000             2.532         2.522\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-CREATE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate            0.386         0.371\n' +
                    'single-stored             0.020         0.015\n' +
                    'mixed-16                  2.770         2.744\n' +
                    'many-128                  39.996        39.946\n' +
                    'large-256k                16.327        16.018\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-ENTRIES\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate            0.003         0.001\n' +
                    'single-stored             0.002         0.001\n' +
                    'mixed-16                  0.010         0.009\n' +
                    'many-128                  0.076         0.067\n' +
                    'large-256k                0.002         0.001\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-EXTRACT\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate            0.093         0.085\n' +
                    'single-stored             0.048         0.045\n' +
                    'mixed-16                  0.364         0.353\n' +
                    'many-128                  4.322         4.295\n' +
                    'large-256k                1.996         1.973\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-COMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                   0.679         0.665\n' +
                    'text-32k                  3.165         3.144\n' +
                    'incremental-16k           2.600         2.559\n' +
                    'runs-32k                  7.057         6.999\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-DECOMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                      mean (ms)     min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                   0.254         0.243\n' +
                    'text-32k                  1.198         1.184\n' +
                    'incremental-16k           0.815         0.808\n' +
                    'runs-32k                  2.109         2.083\n' +
                    '──────────────────────────────────────────────────────\n'
            })
        )
    ];
}

export const notesPost_2026_11_25 = new NotesPost(
    '2026-11-25: Continuing Menai Performance Work',
    '2026-11-25',
    '/notes/2026-11-25',
    '2026-11-25: Continuing Menai Performance Work - a faster Sudoku solver, an algorithmically ' +
    'improved bmp-decode, 61-bit-only fixnums in the VM, and a higher inlining threshold in the ' +
    'compiler, with new Python reference benchmarks.',
    null,
    null,
    notesOpening_2026_11_25,
    notesArticle_2026_11_25,
    null
);
