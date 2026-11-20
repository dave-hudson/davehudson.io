import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_20(): VElement[] {
    return [
        h('p', {},
            'Menai is a pure functional language from the perspective of the end user, but computers really work ',
            'by mutating state.  Until now objects in the VM have been largely functional too, but now container ',
            'objects can mutate under special circumstances!'
        )
    ];
}

function notesArticle_2026_11_20(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Mutating containers'),
            h('p', {},
                'ADR-0063 notes that we can safely mutate a container subject to a few special rules:'
            ),
            h('ul', {},
                h('li', {}, 'The reference count on a source container must be exactly 1.'),
                h('li', {},
                    'The source container must be being destroyed by the operation (e.g. the destination register ',
                    'slot must be the same as the source register slot).'
                ),
                h('li', {}, 'There must be no shared references to another container (e.g. no sliced views).')
            ),
            h('p', {},
                'If all these are met then assuming we have enough capacity in the underlying container object then ',
                'we can modify it in place rather than creating a new object and copying elements across.  This has ',
                'a major impact on operations such as ',
                h('code', {}, 'set-with'),
                ' or ',
                h('code', {}, 'dict-with'),
                ' because we can now build sets or dictionaries much more efficiently.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Consequences of mutating containers'),
            h('p', {},
                'One of the nice consequences of making this change is that it becomes quite practical to design ',
                'optimized code knowing how the underlying VM will behave.  A key demostration of this was that ',
                h('code', {}, 'sort-vector'),
                ', which previously converted to and from a ',
                h('code', {}, 'list'),
                ' because lists were faster than creating vectors, could now be a native vector sort.  This ended ',
                'up about 15% faster on the sort benchmark, which is actually dominated by the variadic comparator ',
                'function.'
            ),
            h('p', {},
                'DeepSeek realized the vector sort was now faster and actually converted the ',
                h('code', {}, 'list-sort'),
                ' to now convert to and from a ',
                h('code', {}, 'vector'),
                ' as that made that test faster too.'
            ),
            h('p', {},
                'The stats benchmark also runs about 7ms faster on a test that used to take 39ms, so that\'s another ',
                'significant gain.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance'),
            CodeFragment.create({
                language: 'text',
                code: 'BASE64-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'standard-1k                       0.150          0.145\n' +
                    'standard-64k                     10.558         10.491\n' +
                    'url-1k                            0.146          0.142\n' +
                    'url-64k                          10.728         10.520\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BASE64-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'standard-1k                       0.056          0.054\n' +
                    'standard-64k                      3.961          3.865\n' +
                    'unpadded-1k                       0.052          0.050\n' +
                    'url-64k                           4.015          3.955\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-DECODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                            mean (ms)       min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64                    0.262          0.253\n' +
                    'truecolour-128x128                  1.092          1.072\n' +
                    'truecolour-topdown-128x128          1.064          1.044\n' +
                    'truecolour-alpha-128x128            1.225          1.214\n' +
                    'padded-65x64                        0.264          0.260\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-ENCODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                            mean (ms)       min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64                    0.716          0.683\n' +
                    'truecolour-128x128                  7.126          7.110\n' +
                    'truecolour-topdown-128x128          6.992          6.948\n' +
                    'truecolour-alpha-128x128            9.293          9.180\n' +
                    'padded-65x64                        0.765          0.739\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CALENDAR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'short_5d                          0.022          0.019\n' +
                    'month_20d                         0.071          0.068\n' +
                    'quarter_60d                       0.213          0.210\n' +
                    'year_250d                         0.828          0.810\n' +
                    'months_600d                       1.453          1.436\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10                     4.241          4.220\n' +
                    'quoted-1000x10                    6.053          6.014\n' +
                    'escaped-1000x10                   7.319          7.285\n' +
                    'multiline-1000                    1.360          1.305\n' +
                    'wide-100x100                      2.743          2.688\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10                     4.742          4.694\n' +
                    'quoted-1000x10                   10.757         10.686\n' +
                    'escaped-1000x10                   6.842          6.812\n' +
                    'wide-100x100                      2.316          2.247\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-COMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.650          0.623\n' +
                    'text-32k                          2.593          2.507\n' +
                    'incremental-16k                   4.691          4.620\n' +
                    'runs-32k                          9.170          9.101\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-DECOMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.150          0.140\n' +
                    'text-32k                          0.314          0.305\n' +
                    'incremental-16k                   0.373          0.352\n' +
                    'stored-8k                         0.052          0.047\n' +
                    'runs-32k                          1.262          1.216\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.299          0.273\n' +
                    'document-100                      1.803          1.738\n' +
                    'document-500                      7.870          7.783\n' +
                    'document-2000                    31.492         31.290\n' +
                    'styles-100                        2.700          2.590\n' +
                    'numbering-9                       1.380          1.292\n' +
                    'media-16                          3.852          3.785\n' +
                    'full-500                         11.495         11.367\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.071          0.061\n' +
                    'document-100                      0.246          0.236\n' +
                    'document-500                      0.973          0.959\n' +
                    'styles-100                        0.374          0.368\n' +
                    'numbering-9                       0.126          0.120\n' +
                    'media-16                          0.265          0.257\n' +
                    'full-500                          1.246          1.227\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         4.818          4.773\n' +
                    'deep-200                          0.425          0.420\n' +
                    'attributes-500                    3.658          3.631\n' +
                    'mixed-500                         3.901          3.871\n' +
                    'entities-2000                    11.246         11.206\n' +
                    'void-1000                        10.835         10.748\n' +
                    'omitted-end-tags-1000             2.451          2.422\n' +
                    'raw-text-500                      4.356          4.319\n' +
                    'realistic-500                     7.860          7.734\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         1.639          1.613\n' +
                    'deep-200                          0.193          0.161\n' +
                    'attributes-500                    0.803          0.792\n' +
                    'mixed-500                         1.916          1.909\n' +
                    'void-1000                         3.654          3.623\n' +
                    'escaping-2000                     4.003          3.967\n' +
                    'declarations-1000                 0.539          0.528\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                            0.012          0.010\n' +
                    'flat_array                        0.068          0.065\n' +
                    'flat_object                       0.064          0.061\n' +
                    'mixed_nested                      0.135          0.134\n' +
                    'string_heavy                      0.050          0.048\n' +
                    'numbers_array                     0.015          0.014\n' +
                    'unicode_strings                   0.008          0.007\n' +
                    'long_string                       0.059          0.058\n' +
                    'deep_array                        0.124          0.123\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                            0.011          0.009\n' +
                    'flat_array                        0.014          0.012\n' +
                    'flat_object                       0.028          0.027\n' +
                    'mixed_nested                      0.054          0.052\n' +
                    'string_heavy                      0.073          0.071\n' +
                    'numbers_array                     0.008          0.007\n' +
                    'unicode_strings                   0.003          0.002\n' +
                    'long_string                       0.245          0.241\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'greyscale-64x64                   1.458          1.397\n' +
                    'greyscale-alpha-64x64             6.417          6.386\n' +
                    'palette-128x128                   4.768          4.724\n' +
                    'truecolour-128x128               36.145         35.842\n' +
                    'truecolour-alpha-128x128         48.144         47.538\n' +
                    'truecolour-192x192               82.998         82.218\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'truecolour-48x48                 15.609         15.589\n' +
                    'truecolour-96x96                147.658        147.363\n' +
                    'truecolour-alpha-96x96          252.239        251.113\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.719          0.699\n' +
                    'slides-10                         3.182          3.157\n' +
                    'slides-50                        13.991         13.934\n' +
                    'slides-200                       54.659         54.469\n' +
                    'shapes-50                        11.113         11.068\n' +
                    'masters-8                         6.394          6.136\n' +
                    'media-16                          6.663          6.627\n' +
                    'theme-and-masters                 5.073          5.043\n' +
                    'full-50                          67.525         67.088\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.099          0.089\n' +
                    'slides-10                         0.313          0.304\n' +
                    'slides-50                         1.266          1.250\n' +
                    'shapes-50                         1.251          1.225\n' +
                    'masters-8                         0.633          0.618\n' +
                    'media-16                          0.510          0.497\n' +
                    'theme-and-masters                 0.485          0.477\n' +
                    'full-50                           5.915          5.852\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'REGEXP\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'Case                           mean (ms)       min (ms)\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'compile-per-line                   1.326          1.303\n' +
                    'search-prefix-log                  0.031          0.029\n' +
                    'search-class-numbers               0.034          0.033\n' +
                    'search-alternation                 0.078          0.076\n' +
                    'search-all-class                   9.738          9.719\n' +
                    'search-all-prefix                  1.338          1.321\n' +
                    'search-groups-log                  0.053          0.050\n' +
                    'search-all-groups-numbers         33.733         33.543\n' +
                    'split-whitespace                  11.481         11.369\n' +
                    'replace-whitespace                73.779         73.379\n' +
                    'replace-groups-dates              24.256         23.858\n' +
                    'chained-per-line                   1.323          1.311\n' +
                    '───────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '1-move                            0.060          0.055\n' +
                    '2-move                            0.061          0.056\n' +
                    '3-move                            0.133          0.127\n' +
                    '4-move                            1.356          1.347\n' +
                    '5-move                            4.467          4.456\n' +
                    '6-move                           28.663         28.633\n' +
                    '7-move                           63.845         63.785\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '1-move                            0.050          0.047\n' +
                    '2-move                            0.052          0.046\n' +
                    '3-move                            0.111          0.106\n' +
                    '4-move                            1.124          1.112\n' +
                    '5-move                            3.804          3.787\n' +
                    '6-move                           24.047         24.008\n' +
                    '7-move                           53.626         53.571\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                              0.005          0.003\n' +
                    'n=50                              0.025          0.023\n' +
                    'n=100                             0.057          0.056\n' +
                    'n=250                             0.161          0.159\n' +
                    'n=500                             0.362          0.361\n' +
                    'n=1000                            0.806          0.798\n' +
                    'n=2500                            2.330          2.321\n' +
                    'n=5000                            5.048          5.023\n' +
                    'n=10000                          10.814         10.742\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                              0.004          0.003\n' +
                    'n=50                              0.024          0.023\n' +
                    'n=100                             0.055          0.054\n' +
                    'n=250                             0.157          0.156\n' +
                    'n=500                             0.353          0.349\n' +
                    'n=1000                            0.801          0.798\n' +
                    'n=2500                            2.364          2.327\n' +
                    'n=5000                            5.029          5.017\n' +
                    'n=10000                          10.825         10.807\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STATS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'vector-mean-n=100                 0.010          0.009\n' +
                    'vector-mean-n=500                 0.045          0.043\n' +
                    'vector-mean-n=1000                0.089          0.088\n' +
                    'vector-mean-n=2500                0.221          0.217\n' +
                    'vector-mean-n=5000                0.420          0.417\n' +
                    'vector-mean-n=10000               0.861          0.856\n' +
                    'vector-mean-n=25000               2.160          2.132\n' +
                    'vector-summary-n=100              0.068          0.065\n' +
                    'vector-summary-n=500              0.408          0.403\n' +
                    'vector-summary-n=1000             0.882          0.880\n' +
                    'vector-summary-n=2500             2.588          2.580\n' +
                    'vector-summary-n=5000             5.464          5.446\n' +
                    'vector-summary-n=10000           11.668         11.515\n' +
                    'vector-summary-n=25000           31.462         31.353\n' +
                    'list-mean-n=100                   0.011          0.010\n' +
                    'list-mean-n=500                   0.050          0.048\n' +
                    'list-mean-n=1000                  0.100          0.098\n' +
                    'list-mean-n=2500                  0.259          0.257\n' +
                    'list-mean-n=5000                  0.565          0.561\n' +
                    'list-mean-n=10000                 1.153          1.141\n' +
                    'list-mean-n=25000                 2.926          2.916\n' +
                    'list-summary-n=100                0.069          0.066\n' +
                    'list-summary-n=500                0.422          0.410\n' +
                    'list-summary-n=1000               0.882          0.877\n' +
                    'list-summary-n=2500               2.571          2.567\n' +
                    'list-summary-n=5000               5.679          5.626\n' +
                    'list-summary-n=10000             11.989         11.962\n' +
                    'list-summary-n=25000             32.183         32.048\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STRING_OPS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'search long/absent                0.016          0.014\n' +
                    'search long/present               0.021          0.020\n' +
                    'search short needle               0.020          0.020\n' +
                    'search needle=haystack            0.172          0.170\n' +
                    'hash 2000x8                       0.033          0.031\n' +
                    'hash 2000x64                      0.094          0.092\n' +
                    'hash 500x512                      0.197          0.196\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)                 14.716         14.667\n' +
                    'Medium (30 givens)                0.217          0.208\n' +
                    'Hard (25 givens)               3135.132       3135.132\n' +
                    'Expert (23 givens)              179.171        179.171\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)                 10.628         10.297\n' +
                    'Medium (30 givens)                0.159          0.154\n' +
                    'Hard (25 givens)               2324.436       2324.436\n' +
                    'Expert (23 givens)              132.967        132.967\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         2.168          2.141\n' +
                    'deep-200                          0.202          0.198\n' +
                    'attributes-500                    1.607          1.601\n' +
                    'mixed-500                         2.627          2.621\n' +
                    'entities-2000                     6.178          6.084\n' +
                    'ooxml-500                         5.659          5.618\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         0.785          0.768\n' +
                    'deep-200                          0.126          0.117\n' +
                    'attributes-500                    0.758          0.751\n' +
                    'mixed-500                         1.897          1.892\n' +
                    'escaping-2000                     3.920          3.908\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-CREATE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.453          0.429\n' +
                    'single-stored                     0.025          0.018\n' +
                    'mixed-16                          3.131          3.097\n' +
                    'many-128                         43.980         43.838\n' +
                    'large-256k                       19.560         19.262\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-ENTRIES\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.003          0.001\n' +
                    'single-stored                     0.003          0.002\n' +
                    'mixed-16                          0.012          0.010\n' +
                    'many-128                          0.080          0.074\n' +
                    'large-256k                        0.003          0.001\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-EXTRACT\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.099          0.090\n' +
                    'single-stored                     0.056          0.052\n' +
                    'mixed-16                          0.375          0.369\n' +
                    'many-128                          4.418          4.408\n' +
                    'large-256k                        2.064          2.026\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-COMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.801          0.782\n' +
                    'text-32k                          3.680          3.655\n' +
                    'incremental-16k                   5.311          5.250\n' +
                    'runs-32k                         10.583         10.464\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-DECOMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.269          0.259\n' +
                    'text-32k                          1.265          1.254\n' +
                    'incremental-16k                   0.860          0.847\n' +
                    'runs-32k                          2.198          2.169\n' +
                    '──────────────────────────────────────────────────────\n'
            })
        )
    ];
}

export const notesPost_2026_11_20 = new NotesPost(
    '2026-11-20: Mutating Menai data for speed and profit',
    '2026-11-20',
    '/notes/2026-11-20',
    '2026-11-20: Mutating Menai data for speed and profit - container objects can now mutate in place when ' +
    'reference counts and register slots allow it (ADR-0063), making set-with and dict-with much cheaper, ' +
    'enabling a native sort-vector that is about 15% faster, and improving the stats benchmark.',
    null,
    null,
    notesOpening_2026_11_20,
    notesArticle_2026_11_20,
    null
);
