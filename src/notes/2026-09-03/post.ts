import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_09_03(): VElement[] {
    return [
        h('p', {},
            'More Menai performance work today, with some VM changes to the dictionary and set backends.  ' +
            'I also found a surprise in the Sudoku benchmark.'
        )
    ];
}

function notesArticle_2026_09_03(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'VM tuning'),
            h('p', {},
                'Hot on the heels or changing the VM list representation, today I updated the dictionary and set backends too.  ',
                'Dictionary and set elements are now sharable between 2 or more dictionaries or sets.'
            ),
            h('p', {},
                'This increases the number of memory allocations slightly on the first use, but offsets by dramatically ' +
                'reducing the number of copy operations on a second or subsequent use.  ' +
                'For things like merge, union, intersection, etc, operations this is a big win and also makes the code more readable.'
            ),
            h('p', {},
                'I don\'t see a huge difference in benchmark results, but it\'s clear we\'re getting a big win in more dynamic ' +
                'dictionary and set uses.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Sudoku benchmark'),
            h('p', {},
                'I\'ve been looking at performance comparisons between Python and Menai and the biggest remaining discrepancy ' +
                'in my current 4 benchmarks was the Sudoku solver.'
            ),
            h('p', {},
                'I was curious if these were just performance issues in Menai or whether there might be algorithmic concerns.  ' +
                'GLM picked up a few, but this one was the most impactful!  ' +
                'This turns some expensive list mapping and zipping into a much more efficient slice operations.'
            ),
            h('p', {},
                'We\'re still apples-for-apples here as Python was doing this all along.'
            ),
            CodeFragment.create({language: 'diff', code:
`--- a/src/menai_benchmark/suites/sudoku/sudoku-solver.menai
+++ b/src/menai_benchmark/suites/sudoku/sudoku-solver.menai
@@ -45,19 +45,11 @@

   ; Return a new board with \`num\` placed at (row, col).
   (set-cell (lambda (board row col num)
-    (map-list
-      (lambda (row-pair)
-        (let ((r-idx (list-first row-pair))
-              (row-data (list-ref row-pair 1)))
-          (if (integer=? r-idx row)
-            (map-list
-              (lambda (cell-pair)
-                (if (integer=? (list-first cell-pair) col)
-                  num
-                  (list-ref cell-pair 1)))
-              (list-zip (range 0 9) row-data))
-            row-data)))
-      (list-zip (range 0 9) board))))
+    (let* ((old-row (list-ref board row))
+           (new-row (list-concat (list-append (list-slice old-row 0 col) num)
+                                 (list-slice old-row (integer+ col 1) 9))))
+      (list-concat (list-append (list-slice board 0 row) new-row)
+                   (list-slice board (integer+ row 1) 9)))))

   ; Try each candidate digit for the cell at (row, col).
   ; Returns the solved board on success, or #none if all candidates fail.`
            }),
            h('p', {}, 'Here are the old results:'),
            CodeFragment.create({language: 'text', code:
`SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              28.867     28.733 ✓       3.120      3.065     9.3x faster ✓      11.146     11.086     2.6x faster ✓
Medium (30 givens)             0.414      0.407 ✓       0.042      0.040     9.8x faster ✓       0.163      0.158     2.5x faster ✓
Hard (25 givens)            6161.467   6161.467 ✓     715.868    715.868     8.6x faster ✓    1978.159   1978.159     3.1x faster ✓
Expert (23 givens)           356.985    356.985 ✓      40.739     40.739     8.8x faster ✓     164.903    164.903     2.2x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────`
            }),
            h('p', {}, 'And now the new!'),
            CodeFragment.create({language: 'text', code:
`SUDOKU
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Case                                      Menai                       Python (idiomatic)                      Python (functional)
                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
Easy (36 givens)              20.228     19.868 ✓       3.108      2.988     6.5x faster ✓      11.140     11.101     1.8x faster ✓
Medium (30 givens)             0.303      0.289 ✓       0.043      0.040     7.1x faster ✓       0.162      0.155     1.9x faster ✓
Hard (25 givens)            4395.628   4395.628 ✓     715.680    715.680     6.1x faster ✓    2032.600   2032.600     2.2x faster ✓
Expert (23 givens)           254.195    254.195 ✓      39.768     39.768     6.4x faster ✓     165.392    165.392     1.5x faster ✓
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────`
            }),
            h('p', {},
                'That\'s about 1.3x-1.4x faster.'
            )
        )
    ];
}

export const notesPost_2026_09_03 = new NotesPost(
    '2026-09-03: Menai improvements',
    '2026-09-03',
    '/notes/2026-09-03',
    '2026-09-03: Menai improvements - VM dictionary and set sharing plus a Sudoku benchmark fix: the hardest cases get about 1.3x-1.4x faster.',
    null,
    null,
    notesOpening_2026_09_03,
    notesArticle_2026_09_03,
    null
);
