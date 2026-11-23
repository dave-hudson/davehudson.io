import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_23(): VElement[] {
    return [
        h('p', {},
            'Menai v0.12 takes advantage of the VM single-use mutation strategy I noted a few days ago.  Added ',
            'to that is a new VM opcode for fast scanning of characters in strings and the ability to slice ',
            'strings much more cheaply.'
        ),
        h('p', {},
            'This unlocked a lot of potential to make algorithmic improvements across the stdlib and benchmark ',
            'test cases.'
        )
    ];
}

function notesArticle_2026_11_23(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai v0.12'),
            h('p', {}, 'New features:'),
            h('ul', {},
                h('li', {},
                    'The VM now implements in-place modification of containers (vectors, sets, dicts, structs ',
                    'and bytes) where a source goes dead during the operation.'
                ),
                h('li', {},
                    'Appending to a ',
                    h('code', {}, 'bytes'),
                    ' value now updates it in place, carrying spare capacity and growing geometrically, so ',
                    'building a byte sequence in steps is linear.'
                ),
                h('li', {},
                    'Appending to a ',
                    h('code', {}, 'string'),
                    ' value now updates it in place on the same conditions, so building a string in steps is ',
                    'linear.'
                ),
                h('li', {},
                    h('code', {}, 'string-slice'),
                    ', ',
                    h('code', {}, 'string-trim'),
                    ', ',
                    h('code', {}, 'string-trim-left'),
                    ' and ',
                    h('code', {}, 'string-trim-right'),
                    ' now return a view into their source rather than copying the codepoints, so trimming no ',
                    'longer moves the text it keeps and slicing a document into tokens no longer copies each ',
                    'token.'
                ),
                h('li', {},
                    h('code', {}, 'map-vector'),
                    ', ',
                    h('code', {}, 'map-set'),
                    ' and ',
                    h('code', {}, 'filter-set'),
                    ' now build their result in place rather than converting it through a list.'
                ),
                h('li', {},
                    h('code', {}, 'sort-vector'),
                    ' is a native bottom-up merge sort, and ',
                    h('code', {}, 'sort-list'),
                    ' sorts through it.'
                ),
                h('li', {},
                    'The DEFLATE LZ77 candidate table is now one dictionary updated in place rather than ',
                    'sixteen shards, which existed only because every update copied.  30–50% faster ',
                    'compression on run-heavy inputs.'
                ),
                h('li', {},
                    h('code', {}, 'bmp-encode'),
                    ' appends to its output in the pixel loop rather than through a helper, which had made it ',
                    'quadratic in the image size.'
                ),
                h('li', {},
                    h('code', {}, 'png-encode'),
                    ' now builds each scanline in place.'
                ),
                h('li', {},
                    h('code', {}, 'csv-encode'),
                    ' now decides quoting and doubles quotes with native scans and replacement; 87% fewer ',
                    'instructions on the quoted-table benchmark.'
                ),
                h('li', {},
                    h('code', {}, 'xml-encode'),
                    ' and ',
                    h('code', {}, 'html-encode'),
                    ' escape with native replacement behind a native presence check, so text with nothing to ',
                    'escape costs no allocation.'
                ),
                h('li', {},
                    h('code', {}, 'csv-decode'),
                    ' now finds fields with native searches and takes them as slices of the input; up to 59% ',
                    'fewer instructions.'
                ),
                h('li', {},
                    h('code', {}, 'html-decode'),
                    ' now finds markup and character references with native searches and takes text runs and ',
                    'attribute values as slices; 13–46% faster.'
                ),
                h('li', {},
                    h('code', {}, 'xml-decode'),
                    ' now finds markup and entities natively and takes text runs and attribute values as ',
                    'slices; 37–43% faster, which the OOXML decoders inherit.'
                ),
                h('li', {},
                    h('code', {}, 'json-encode'),
                    ' examines a string\'s body as bytes and copies it whole when it holds nothing to escape; ',
                    'the long-string benchmark is 72% faster.'
                ),
                h('li', {},
                    h('code', {}, 'base64-encode'),
                    ' and ',
                    h('code', {}, 'base64-decode'),
                    ' read the alphabet and the input as bytes and look values up in a table built once, so ',
                    'neither costs a string per character.'
                ),
                h('li', {},
                    'Loop rotation now also rotates a loop whose test loops out of both arms, removing a jump ',
                    'per merged element in the sort benchmarks.'
                ),
                h('li', {},
                    h('code', {}, 'menai-format'),
                    ' now formats files in place by default and accepts several files at once; ',
                    h('code', {}, '-o -'),
                    ' writes the result to stdout and ',
                    h('code', {}, '-'),
                    ' still reads stdin.  The ',
                    h('code', {}, '--in-place'),
                    ' option is gone because it is now the default.'
                ),
                h('li', {},
                    'The Sudoku benchmarks were improved to avoid doing unnecessary work, and thus making them ',
                    'more interesting as comparisons with other languages.'
                ),
                h('li', {},
                    h('code', {}, 'string-index-any'),
                    ' is a new builtin: it returns the index of the first character in a set of inclusive ',
                    'codepoint ranges, or ',
                    h('code', {}, '#none'),
                    ', so finding any of several terminators is one native scan rather than one scan per ',
                    'character or one test per position.'
                ),
                h('li', {},
                    h('code', {}, 'regexp'),
                    ' compiles a pattern\'s first-character set and jumps to it with ',
                    h('code', {}, 'string-index-any'),
                    ', including the union of an alternation\'s branches and the complement of a negated ',
                    'class.  Class-first patterns execute 44–81% fewer instructions; replacing ',
                    h('code', {}, '\\s+'),
                    ' is 11% faster because allocation in the matcher now dominates it.'
                ),
                h('li', {},
                    h('code', {}, 'csv-decode'),
                    ', ',
                    h('code', {}, 'html-decode'),
                    ' and ',
                    h('code', {}, 'xml-decode'),
                    ' find the end of a field, a name and an unquoted attribute value with that one set ',
                    'search, replacing three searches or a per-character loop.'
                )
            ),
            h('p', {}, 'Bug fixes:'),
            h('ul', {},
                h('li', {},
                    'Loop rotation now sees a terminator\'s operands when deciding whether the loop body ',
                    'consumes a header-test result.'
                ),
                h('li', {},
                    'An ',
                    h('code', {}, 'error'),
                    ' used as an operand rather than in tail position failed to compile with a ',
                    'slot-allocation error, and a later operand could raise in its place.'
                ),
                h('li', {},
                    h('code', {}, 'html-decode'),
                    ' raised a slice error on a quoted attribute value that is never closed.'
                )
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
                    'standard-1k                       0.124          0.115\n' +
                    'standard-64k                      8.489          8.379\n' +
                    'url-1k                            0.120          0.116\n' +
                    'url-64k                           8.494          8.439\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BASE64-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'standard-1k                       0.052          0.051\n' +
                    'standard-64k                      3.167          3.020\n' +
                    'unpadded-1k                       0.052          0.052\n' +
                    'url-64k                           3.190          3.090\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-DECODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                            mean (ms)       min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64                    0.267          0.238\n' +
                    'truecolour-128x128                  1.131          1.082\n' +
                    'truecolour-topdown-128x128          1.095          1.078\n' +
                    'truecolour-alpha-128x128            1.238          1.208\n' +
                    'padded-65x64                        0.263          0.257\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'BMP-ENCODE\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'Case                            mean (ms)       min (ms)\n' +
                    '────────────────────────────────────────────────────────\n' +
                    'truecolour-64x64                    0.284          0.264\n' +
                    'truecolour-128x128                  1.194          1.157\n' +
                    'truecolour-1024x16                  1.091          1.084\n' +
                    'truecolour-16x1024                  2.084          2.066\n' +
                    'truecolour-256x256                  5.101          5.046\n' +
                    'truecolour-topdown-128x128          1.210          1.198\n' +
                    'truecolour-alpha-128x128            1.455          1.446\n' +
                    'padded-65x64                        0.291          0.289\n' +
                    '────────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CALENDAR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'short_5d                          0.023          0.018\n' +
                    'month_20d                         0.072          0.070\n' +
                    'quarter_60d                       0.206          0.200\n' +
                    'year_250d                         0.840          0.838\n' +
                    'months_600d                       1.496          1.485\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10                     1.888          1.851\n' +
                    'quoted-1000x10                    2.114          2.104\n' +
                    'escaped-1000x10                   4.356          4.321\n' +
                    'multiline-1000                    0.475          0.474\n' +
                    'wide-100x100                      1.706          1.698\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'CSV-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'plain-1000x10                     2.675          2.603\n' +
                    'quoted-1000x10                    2.962          2.939\n' +
                    'escaped-1000x10                   2.951          2.919\n' +
                    'wide-100x100                      1.565          1.545\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-COMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.601          0.591\n' +
                    'text-32k                          2.311          2.293\n' +
                    'incremental-16k                   2.200          2.145\n' +
                    'runs-32k                          6.161          6.093\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DEFLATE-DECOMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.146          0.135\n' +
                    'text-32k                          0.315          0.307\n' +
                    'incremental-16k                   0.379          0.369\n' +
                    'stored-8k                         0.052          0.049\n' +
                    'runs-32k                          1.236          1.198\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.288          0.272\n' +
                    'document-100                      1.098          1.067\n' +
                    'document-500                      4.655          4.581\n' +
                    'document-2000                    18.434         18.300\n' +
                    'styles-100                        1.802          1.702\n' +
                    'numbering-9                       0.983          0.943\n' +
                    'media-16                          3.365          3.336\n' +
                    'full-500                          7.784          7.707\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'DOCX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.035          0.028\n' +
                    'document-100                      0.134          0.127\n' +
                    'document-500                      0.545          0.530\n' +
                    'styles-100                        0.175          0.169\n' +
                    'numbering-9                       0.064          0.059\n' +
                    'media-16                          0.125          0.118\n' +
                    'full-500                          0.662          0.647\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         1.912          1.888\n' +
                    'deep-200                          0.179          0.175\n' +
                    'attributes-500                    1.765          1.748\n' +
                    'mixed-500                         1.791          1.770\n' +
                    'entities-2000                     5.209          5.180\n' +
                    'void-1000                         4.817          4.793\n' +
                    'omitted-end-tags-1000             1.039          1.025\n' +
                    'raw-text-500                      1.419          1.399\n' +
                    'realistic-500                     3.466          3.428\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'HTML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         1.052          1.012\n' +
                    'deep-200                          0.216          0.157\n' +
                    'attributes-500                    0.643          0.636\n' +
                    'mixed-500                         0.900          0.891\n' +
                    'void-1000                         2.440          2.399\n' +
                    'escaping-2000                     2.699          2.673\n' +
                    'declarations-1000                 0.534          0.527\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                            0.012          0.010\n' +
                    'flat_array                        0.074          0.072\n' +
                    'flat_object                       0.063          0.061\n' +
                    'mixed_nested                      0.139          0.138\n' +
                    'string_heavy                      0.049          0.048\n' +
                    'numbers_array                     0.016          0.015\n' +
                    'unicode_strings                   0.007          0.006\n' +
                    'long_string                       0.060          0.059\n' +
                    'deep_array                        0.127          0.125\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'JSON-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'object                            0.007          0.005\n' +
                    'flat_array                        0.013          0.012\n' +
                    'flat_object                       0.019          0.017\n' +
                    'mixed_nested                      0.037          0.036\n' +
                    'string_heavy                      0.041          0.040\n' +
                    'numbers_array                     0.007          0.005\n' +
                    'unicode_strings                   0.002          0.002\n' +
                    'long_string                       0.052          0.050\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'greyscale-64x64                   1.433          1.410\n' +
                    'greyscale-alpha-64x64             6.192          6.184\n' +
                    'palette-128x128                   4.671          4.618\n' +
                    'truecolour-128x128               35.432         35.325\n' +
                    'truecolour-alpha-128x128         47.439         47.292\n' +
                    'truecolour-192x192               82.069         81.869\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PNG-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'truecolour-48x48                  7.476          7.439\n' +
                    'truecolour-96x96                 41.729         41.705\n' +
                    'truecolour-alpha-96x96           79.258         78.629\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.640          0.618\n' +
                    'slides-10                         2.737          2.715\n' +
                    'slides-50                        11.820         11.796\n' +
                    'slides-200                       46.081         45.956\n' +
                    'shapes-50                         7.173          7.106\n' +
                    'masters-8                         5.877          5.838\n' +
                    'media-16                          6.023          5.993\n' +
                    'theme-and-masters                 4.561          4.508\n' +
                    'full-50                          56.435         56.252\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'PPTX-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'minimal                           0.044          0.035\n' +
                    'slides-10                         0.107          0.099\n' +
                    'slides-50                         0.383          0.372\n' +
                    'shapes-50                         0.739          0.713\n' +
                    'masters-8                         0.176          0.169\n' +
                    'media-16                          0.209          0.200\n' +
                    'theme-and-masters                 0.147          0.139\n' +
                    'full-50                           3.543          3.469\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'REGEXP\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'Case                           mean (ms)       min (ms)\n' +
                    '───────────────────────────────────────────────────────\n' +
                    'compile-per-line                   0.062          0.059\n' +
                    'search-prefix-log                  0.032          0.030\n' +
                    'search-class-numbers               0.034          0.032\n' +
                    'search-alternation                 0.053          0.051\n' +
                    'search-all-class                   4.242          4.207\n' +
                    'search-all-prefix                  0.126          0.123\n' +
                    'search-groups-log                  0.054          0.051\n' +
                    'search-all-groups-numbers         32.769         32.666\n' +
                    'split-whitespace                   5.442          5.369\n' +
                    'replace-whitespace                65.599         62.463\n' +
                    'replace-groups-dates              16.126         16.066\n' +
                    'chained-per-line                   0.043          0.042\n' +
                    '───────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '1-move                            0.057          0.051\n' +
                    '2-move                            0.056          0.052\n' +
                    '3-move                            0.120          0.115\n' +
                    '4-move                            1.255          1.246\n' +
                    '5-move                            4.225          4.217\n' +
                    '6-move                           27.230         27.151\n' +
                    '7-move                           60.515         60.383\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '1-move                            0.045          0.041\n' +
                    '2-move                            0.048          0.042\n' +
                    '3-move                            0.100          0.094\n' +
                    '4-move                            1.016          1.012\n' +
                    '5-move                            3.414          3.408\n' +
                    '6-move                           21.974         21.942\n' +
                    '7-move                           48.940         48.877\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                              0.005          0.003\n' +
                    'n=50                              0.024          0.023\n' +
                    'n=100                             0.055          0.054\n' +
                    'n=250                             0.156          0.153\n' +
                    'n=500                             0.345          0.338\n' +
                    'n=1000                            0.771          0.766\n' +
                    'n=2500                            2.213          2.202\n' +
                    'n=5000                            4.804          4.786\n' +
                    'n=10000                          10.384         10.325\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SORT_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'n=10                              0.004          0.003\n' +
                    'n=50                              0.023          0.022\n' +
                    'n=100                             0.053          0.052\n' +
                    'n=250                             0.152          0.151\n' +
                    'n=500                             0.339          0.338\n' +
                    'n=1000                            0.753          0.750\n' +
                    'n=2500                            2.202          2.194\n' +
                    'n=5000                            4.807          4.769\n' +
                    'n=10000                          10.277         10.245\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STATS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'vector-mean-n=100                 0.009          0.008\n' +
                    'vector-mean-n=500                 0.041          0.040\n' +
                    'vector-mean-n=1000                0.082          0.082\n' +
                    'vector-mean-n=2500                0.208          0.205\n' +
                    'vector-mean-n=5000                0.410          0.405\n' +
                    'vector-mean-n=10000               0.821          0.816\n' +
                    'vector-mean-n=25000               2.030          2.013\n' +
                    'vector-summary-n=100              0.065          0.063\n' +
                    'vector-summary-n=500              0.396          0.395\n' +
                    'vector-summary-n=1000             0.859          0.857\n' +
                    'vector-summary-n=2500             2.477          2.472\n' +
                    'vector-summary-n=5000             5.487          5.440\n' +
                    'vector-summary-n=10000           11.523         11.430\n' +
                    'vector-summary-n=25000           30.717         30.686\n' +
                    'list-mean-n=100                   0.010          0.009\n' +
                    'list-mean-n=500                   0.048          0.046\n' +
                    'list-mean-n=1000                  0.095          0.094\n' +
                    'list-mean-n=2500                  0.258          0.256\n' +
                    'list-mean-n=5000                  0.544          0.538\n' +
                    'list-mean-n=10000                 1.110          1.106\n' +
                    'list-mean-n=25000                 2.841          2.823\n' +
                    'list-summary-n=100                0.067          0.065\n' +
                    'list-summary-n=500                0.402          0.401\n' +
                    'list-summary-n=1000               0.883          0.877\n' +
                    'list-summary-n=2500               2.532          2.522\n' +
                    'list-summary-n=5000               5.463          5.457\n' +
                    'list-summary-n=10000             11.721         11.673\n' +
                    'list-summary-n=25000             31.468         31.427\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'STRING_OPS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'search long/absent                0.016          0.015\n' +
                    'search long/present               0.021          0.020\n' +
                    'search short needle               0.020          0.020\n' +
                    'search needle=haystack            0.155          0.151\n' +
                    'hash 2000x8                       0.035          0.033\n' +
                    'hash 2000x64                      0.095          0.094\n' +
                    'hash 500x512                      0.200          0.197\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU_LIST\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)                 10.859         10.794\n' +
                    'Medium (30 givens)                0.156          0.148\n' +
                    'Hard (25 givens)               2272.701       2272.701\n' +
                    'Expert (23 givens)              127.253        127.253\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU_VECTOR\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)                  7.094          7.072\n' +
                    'Medium (30 givens)                0.097          0.095\n' +
                    'Hard (25 givens)               1467.573       1467.573\n' +
                    'Expert (23 givens)               82.655         82.655\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-DECODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         1.093          1.073\n' +
                    'deep-200                          0.142          0.138\n' +
                    'attributes-500                    0.818          0.804\n' +
                    'mixed-500                         1.359          1.350\n' +
                    'entities-2000                     3.339          3.320\n' +
                    'ooxml-500                         2.665          2.650\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'XML-ENCODE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'wide-1000                         0.559          0.544\n' +
                    'deep-200                          0.103          0.090\n' +
                    'attributes-500                    0.598          0.587\n' +
                    'mixed-500                         0.840          0.835\n' +
                    'escaping-2000                     2.626          2.613\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-CREATE\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.438          0.412\n' +
                    'single-stored                     0.025          0.019\n' +
                    'mixed-16                          3.037          3.000\n' +
                    'many-128                         42.802         42.728\n' +
                    'large-256k                       16.875         16.398\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-ENTRIES\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.004          0.002\n' +
                    'single-stored                     0.003          0.001\n' +
                    'mixed-16                          0.012          0.010\n' +
                    'many-128                          0.078          0.071\n' +
                    'large-256k                        0.002          0.001\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZIP-EXTRACT\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'single-deflate                    0.098          0.089\n' +
                    'single-stored                     0.055          0.050\n' +
                    'mixed-16                          0.367          0.361\n' +
                    'many-128                          4.347          4.335\n' +
                    'large-256k                        2.023          1.998\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-COMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.725          0.712\n' +
                    'text-32k                          3.219          3.199\n' +
                    'incremental-16k                   2.634          2.586\n' +
                    'runs-32k                          7.144          7.074\n' +
                    '──────────────────────────────────────────────────────\n' +
                    '\n' +
                    '\n' +
                    'ZLIB-DECOMPRESS\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'Case                          mean (ms)       min (ms)\n' +
                    '──────────────────────────────────────────────────────\n' +
                    'text-4k                           0.262          0.251\n' +
                    'text-32k                          1.210          1.201\n' +
                    'incremental-16k                   0.826          0.817\n' +
                    'runs-32k                          2.112          2.097\n' +
                    '──────────────────────────────────────────────────────\n'
            })
        )
    ];
}

export const notesPost_2026_11_23 = new NotesPost(
    '2026-11-23: Menai v0.12 (much faster runtimes!)',
    '2026-11-23',
    '/notes/2026-11-23',
    '2026-11-23: Menai v0.12 (much faster runtimes!) - single-use mutation of containers, a native ' +
    'string-index-any opcode for fast character scanning, and cheap string slices unlock a wide set of ' +
    'algorithmic improvements across the stdlib and benchmark test cases.',
    null,
    null,
    notesOpening_2026_11_23,
    notesArticle_2026_11_23,
    null
);
