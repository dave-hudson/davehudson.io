import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_11_12(): VElement[] {
    return [
        h('p', {},
            'A standard library needs to be very robust.  We don\'t want any surprises.  The best way to avoid surprises is ',
            'to have extremely good test coverage.'
        )
    ];
}

function notesArticle_2026_11_12(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Add test coverage to the Menai tools'),
            h('p', {},
                'The best way to check if we\'re doing the right things in the library is to ensure we can reach and reliably execute ',
                'every instruction of generated code.  To do this I added ',
                h('code', {}, '--coverage'),
                ' to all the tools.  I also make width clipping optional rather than on by default so we don\'t lose information.'
            ),
            h('p', {},
                'For ',
                h('code', {}, 'menai-test'),
                ' runs the coverage metrics are generated across all the tests in a test suite.'
            ),
            h('p', {},
                'This give a result something like this:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`──────────────────────────────────────────────────────────────────────
FUNCTION COVERAGE — base64-decode.menai
──────────────────────────────────────────────────────────────────────
Functions:                                   12
Fully exercised:                              6
Complete but for dead bytecode:               0
With reachable gaps:                          6

Instructions:                               292
Executed:                                   250    85.62%
Reachable:                                  292    85.62%
Unreachable:                                  0

  Executed      Total   Coverage      Calls  Status              Function
---------- ---------- ---------- ----------  ------------------  ----------------------------------------
         0          2      0.00%          0  gap                 <lambda> [line 157]
        41         59     69.49%          4  gap                 decode-unpadded-bytes [line 184]
        21         30     70.00%          3  gap                 decode-final-two [line 87]
        34         40     85.00%         21  gap                 decode-group [line 67]
        38         44     86.36%         18  gap                 decode-final-group [line 117]
        46         47     97.87%         30  gap                 decode [line 217]
        35         35    100.00%         24  full                decode-padded [line 133]
         2          2    100.00%          2  full                <lambda> [line 157]
         2          2    100.00%         18  full                <lambda> [line 157]
         2          2    100.00%         26  full                <lambda> [line 157]
         2          2    100.00%         15  full                <lambda> [line 157]
        27         27    100.00%         18  full                decode-padded-bytes [line 165]

Reachable instructions not executed
──────────────────────────────────────────────────────────────────────
  <lambda> [line 157]                        0-1
  decode-unpadded-bytes [line 184]           7-18, 53-58
  decode-final-two [line 87]                 21-29
  decode-group [line 67]                     28-30, 34-36
  decode-final-group [line 117]              38-43
  decode [line 217]                          45 RAISE_ERROR 'No patterns matched in match expression'

Dead bytecode (unreachable from entry)
──────────────────────────────────────────────────────────────────────
  None`
            }),
            h('p', {},
                'Note it\'s specifically looking for code that can never be reached as such code would be a compiler optimization error.'
            ),
            h('p', {},
                'We can also get the cumulative numbers for an full test run:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`Total: 1056/1056 passed

──────────────────────────────────────────────────────────────────────
CUMULATIVE FUNCTION COVERAGE
──────────────────────────────────────────────────────────────────────
Source files:                                34
Functions:                                  422
Fully exercised:                            369
Complete but for dead bytecode:               0
With reachable gaps:                         53

Instructions:                            13,540
Executed:                                13,312    98.32%
Reachable:                               13,540    98.32%
Unreachable:                                  0

Module                   Functions   Full   Gaps   Coverage
-----------------------------------------------------------
base64-decode                   12      6      6     85.62%
zip-create                       5      2      3     91.28%
tar-create                      17     14      3     93.01%
tar-extract                      8      7      1     94.49%
gzip-decompress                  3      1      2     95.80%
png-decode                      10      6      4     95.94%
png-encode                       4      1      3     96.35%
zip-entries                      7      4      3     96.35%
bmp-decode                       4      3      1     96.61%
deflate-compress                47     40      7     96.74%
xlsx-decode                     16     13      3     96.88%
base64-encode                    2      1      1     97.39%
bmp-encode                       5      2      3     97.45%
zip-extract                      9      8      1     97.59%
pptx-decode                     16     14      2     97.91%
zlib-decompress                  2      1      1     98.39%
html-encode                      8      6      2     99.01%
stats                           65     60      5     99.28%
csv-decode                       5      4      1     99.47%
regexp                          31     30      1     99.91%
csv-encode                       3      3      0    100.00%
deflate-decompress              19     19      0    100.00%
docx-decode                      6      6      0    100.00%
docx-encode                     12     12      0    100.00%
gzip-compress                    1      1      0    100.00%
html-decode                     21     21      0    100.00%
json-decode                      7      7      0    100.00%
json-encode                      7      7      0    100.00%
pptx-encode                     22     22      0    100.00%
tar-entries                     10     10      0    100.00%
xlsx-encode                     18     18      0    100.00%
xml-decode                      11     11      0    100.00%
xml-encode                       8      8      0    100.00%
zlib-compress                    1      1      0    100.00%

Functions with reachable gaps (worst 20 of 53)
──────────────────────────────────────────────────────────────────────
  base64-decode    <lambda> [line 157]            0-1
  base64-decode    decode-unpadded-bytes [line 184] 7-18, 53-58
  tar-extract      extract-entry [line 90]        13-19
  base64-decode    decode-final-two [line 87]     21-29
  png-decode       channels-for [line 75]         8-12
  tar-create       split-path [line 62]           21-25, 29-33
  deflate-compress find-match [line 252]          35-39, 46-50, 57-60
  zip-create       build-local-entry [line 59]    8-9, 22-32, 70
  deflate-compress write-stored-block [line 478]  1-2, 20, 33-38
  zip-entries      read-eocd [line 34]            21-25
  pptx-decode      sld-ids [line 172]             11-14
  xlsx-decode      sheet-elements [line 185]      11-14
  base64-decode    decode-group [line 67]         28-30, 34-36
  xlsx-decode      shared-strings-of [line 246]   17-20
  gzip-decompress  skip-cstring [line 55]         10, 13
  base64-decode    decode-final-group [line 117]  38-43
  deflate-compress encode-auto [line 766]         19-24, 43, 60
  deflate-compress encode-block [line 755]        47-52, 58
  tar-create       build-entries [line 210]       14-15, 22-23
  zip-extract      entry-content [line 33]        25-28`
            }),
            h('p', {},
                'At the time of writing this, the test coverage is already at 100% on quite a large number of modules!  A few have ',
                'highlighted an interesting compiler question that I need to think about, but there\'s also now a test that pins ',
                'the test coverage at 100% for some modules, and once I can do that for all modules then we\'ll pin this as a requirement ',
                'for any new ones too.'
            )
        )
    ];
}

export const notesPost_2026_11_12 = new NotesPost(
    '2026-11-12: Improving the Menai standard library',
    '2026-11-12',
    '/notes/2026-11-12',
    '2026-11-12: Adding coverage reporting to the Menai tools to keep the standard library robust.',
    null,
    null,
    notesOpening_2026_11_12,
    notesArticle_2026_11_12,
    null
);
