import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_01_09(): VElement[] {
    return [
        h('p', {},
            'One of the more interesting design ideas for Humbug has been to make it easy for Humbug to build and run tools as it needs ' +
            'them.  The original calculator tool was replaced by AIFPL, and in the last few months I\'ve seen AIs use AIFPL quite ' +
            'extensively to help calculate things or perform repetitive data processing tasks.'
        ),
        h('p', {},
            'My vision has always been that AIFPL will continue to expand in scope so the AIs can do even more work, safely and ' +
            'autonomously.  As a consequence I\'m going to add some new tool capabilities to let Humbug parse common file formats ' +
            'and present them to AIFPL scripts.  This should be a pretty exciting innovation.'
        ),
        h('p', {},
            'What I realized earlier is many of those file formats use dictionary-like data structures, but AIFPL wasn\'t particularly ' +
            'quick at processing them.  An hour or so and 1000+ lines of code later, AIFPL now supports association lists (alists) as ' +
            'a native data type.'
        ),
        h('p', {},
            'What was interesting was the conversation with Claude about this because native alists are not common in Lisp/Scheme ' +
            'implementations, but are incredibly useful.  The AI strongly argued for the native type inclusion and the simplifications ' +
            'in syntax that a unique special form would provide.  This feels like real innovation because this was definitely swimming ' +
            'against the tide.'
        )
    ];
}

function notesArticle_2026_01_09(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Performance tuning'),
            h('p', {},
                'AIFPL was designed for elegance and simplicity, but some of what I\'m planning requires performance.  I\'m very data driven ' +
                'in these matters so I asked Claude to build me a benchmark suite.  It dutifully one-shotted it!'
            ),
            h('p', {},
                'Once we had a baseline, Claude started on an optimization plan.  Here\'s the results from the first improvement!'
            ),
            CodeFragment.create({language: 'text', code: 
`================================================================================
COMPARISON WITH BASELINE: baseline.json
================================================================================
Benchmark                                Current      Baseline     Change
--------------------------------------------------------------------------------
Simple Addition                          0.046ms      0.095ms      ↑ 51.9%
Nested Arithmetic                        0.072ms      0.119ms      ↑ 39.4%
Complex Math                             0.065ms      0.114ms      ↑ 42.6%
Simple Lambda Call                       0.059ms      0.110ms      ↑ 46.3%
Lambda with Multiple Args                0.079ms      0.129ms      ↑ 38.9%
Nested Lambda Calls                      0.084ms      0.134ms      ↑ 36.7%
Factorial (10)                           0.348ms      0.407ms      ↑ 14.4%
Fibonacci (15)                           42.059ms     41.964ms     ~
Tail Recursive Sum (100)                 2.273ms      2.362ms      ↑ 3.8%
List Creation (10 elements)              0.058ms      0.109ms      ↑ 46.7%
List Append                              0.065ms      0.116ms      ↑ 44.2%
List Reverse (20 elements)               0.083ms      0.134ms      ↑ 38.0%
Cons Building (10 elements)              0.123ms      0.175ms      ↑ 30.0%
Map (10 elements)                        0.176ms      0.227ms      ↑ 22.6%
Map (100 elements)                       1.013ms      1.071ms      ↑ 5.4%
Filter (100 elements)                    0.986ms      1.042ms      ↑ 5.4%
Fold (100 elements)                      0.216ms      0.269ms      ↑ 19.4%
Map + Fold Pipeline (100 elements)       1.163ms      1.216ms      ↑ 4.4%
Simple Let (2 bindings)                  0.073ms      0.126ms      ↑ 42.1%
Nested Let (3 levels)                    0.103ms      0.155ms      ↑ 33.4%
Let with Many Bindings (10)              0.155ms      0.207ms      ↑ 25.0%
Recursive Let Binding                    0.214ms      0.270ms      ↑ 20.8%
String Append                            0.046ms      0.097ms      ↑ 53.1%
String Manipulation                      0.055ms      0.107ms      ↑ 48.1%
Alist Creation (5 pairs)                 0.070ms      0.121ms      ↑ 42.3%
Alist Get                                0.068ms      0.121ms      ↑ 43.3%
Alist Set                                0.071ms      0.122ms      ↑ 42.2%
Alist Merge                              0.083ms      0.136ms      ↑ 39.1%
Data Processing Pipeline                 1.478ms      1.537ms      ↑ 3.9%
Nested Data Transformation               1.037ms      1.089ms      ↑ 4.8%

================================================================================
SUMMARY
================================================================================

Improvements (29):
  String Append: 53.1% faster
  Simple Addition: 51.9% faster
  String Manipulation: 48.1% faster
  List Creation (10 elements): 46.7% faster
  Simple Lambda Call: 46.3% faster

Overall: 30.6% faster on average`
            }),
            h('p', {},
                'Then we got a second update:'
            ),
            CodeFragment.create({language: 'text', code:
`================================================================================
COMPARISON WITH BASELINE: after_batch_binding.json
================================================================================
Benchmark                                Current      Baseline     Change
--------------------------------------------------------------------------------
Simple Addition                          0.045ms      0.046ms      ~
Nested Arithmetic                        0.071ms      0.072ms      ↑ 1.9%
Complex Math                             0.064ms      0.065ms      ↑ 2.6%
Simple Lambda Call                       0.057ms      0.059ms      ↑ 3.4%
Lambda with Multiple Args                0.075ms      0.079ms      ↑ 5.1%
Nested Lambda Calls                      0.081ms      0.084ms      ↑ 4.1%
Factorial (10)                           0.289ms      0.348ms      ↑ 16.9%
Fibonacci (15)                           32.124ms     42.059ms     ↑ 23.6%
Tail Recursive Sum (100)                 1.779ms      2.273ms      ↑ 21.7%
List Creation (10 elements)              0.059ms      0.058ms      ↓ 1.7%
List Append                              0.064ms      0.065ms      ↑ 1.1%
List Reverse (20 elements)               0.085ms      0.083ms      ↓ 2.4%
Cons Building (10 elements)              0.117ms      0.123ms      ↑ 5.1%
Map (10 elements)                        0.153ms      0.176ms      ↑ 12.9%
Map (100 elements)                       0.783ms      1.013ms      ↑ 22.7%
Filter (100 elements)                    0.797ms      0.986ms      ↑ 19.1%
Fold (100 elements)                      0.174ms      0.216ms      ↑ 19.4%
Map + Fold Pipeline (100 elements)       0.909ms      1.163ms      ↑ 21.9%
Simple Let (2 bindings)                  0.073ms      0.073ms      ~
Nested Let (3 levels)                    0.102ms      0.103ms      ~
Let with Many Bindings (10)              0.154ms      0.155ms      ~
Recursive Let Binding                    0.196ms      0.214ms      ↑ 8.4%
String Append                            0.045ms      0.046ms      ↑ 1.2%
String Manipulation                      0.054ms      0.055ms      ↑ 2.4%
Alist Creation (5 pairs)                 0.070ms      0.070ms      ~
Alist Get                                0.067ms      0.068ms      ↑ 1.8%
Alist Set                                0.071ms      0.071ms      ~
Alist Merge                              0.080ms      0.083ms      ↑ 4.0%
Data Processing Pipeline                 1.212ms      1.478ms      ↑ 18.0%
Nested Data Transformation               0.851ms      1.037ms      ↑ 18.0%

================================================================================
SUMMARY
================================================================================

Improvements (22):
  Fibonacci (15): 23.6% faster
  Map (100 elements): 22.7% faster
  Map + Fold Pipeline (100 elements): 21.9% faster
  Tail Recursive Sum (100): 21.7% faster
  Fold (100 elements): 19.4% faster

Regressions (2):
  List Reverse (20 elements): 2.4% slower
  List Creation (10 elements): 1.7% slower

Overall: 9.6% faster on average`
            }),
            h('p', {},
                'One final set of changes:'
            ),
            CodeFragment.create({language: 'text', code:
`================================================================================
COMPARISON WITH BASELINE: after_batch_binding.json
================================================================================
Benchmark                                Current      Baseline     Change
--------------------------------------------------------------------------------
Simple Addition                          0.045ms      0.046ms      ~
Nested Arithmetic                        0.070ms      0.072ms      ↑ 3.8%
Complex Math                             0.065ms      0.065ms      ~
Simple Lambda Call                       0.060ms      0.059ms      ~
Lambda with Multiple Args                0.078ms      0.079ms      ~
Nested Lambda Calls                      0.085ms      0.084ms      ↓ 1.0%
Factorial (10)                           0.310ms      0.348ms      ↑ 10.9%
Fibonacci (15)                           32.191ms     42.059ms     ↑ 23.5%
Tail Recursive Sum (100)                 1.806ms      2.273ms      ↑ 20.5%
List Creation (10 elements)              0.058ms      0.058ms      ~
List Append                              0.063ms      0.065ms      ↑ 2.7%
List Reverse (20 elements)               0.084ms      0.083ms      ↓ 1.2%
Cons Building (10 elements)              0.115ms      0.123ms      ↑ 6.0%
Map (10 elements)                        0.118ms      0.176ms      ↑ 32.7%
Map (100 elements)                       0.435ms      1.013ms      ↑ 57.0%
Filter (100 elements)                    0.439ms      0.986ms      ↑ 55.5%
Fold (100 elements)                      0.135ms      0.216ms      ↑ 37.4%
Map + Fold Pipeline (100 elements)       0.514ms      1.163ms      ↑ 55.8%
Simple Let (2 bindings)                  0.073ms      0.073ms      ~
Nested Let (3 levels)                    0.103ms      0.103ms      ~
Let with Many Bindings (10)              0.155ms      0.155ms      ~
Recursive Let Binding                    0.198ms      0.214ms      ↑ 7.5%
String Append                            0.046ms      0.046ms      ~
String Manipulation                      0.055ms      0.055ms      ↑ 1.5%
Alist Creation (5 pairs)                 0.071ms      0.070ms      ↓ 1.2%
Alist Get                                0.068ms      0.068ms      ~
Alist Set                                0.071ms      0.071ms      ~
Alist Merge                              0.083ms      0.083ms      ~
Data Processing Pipeline                 0.687ms      1.478ms      ↑ 53.5%
Nested Data Transformation               0.514ms      1.037ms      ↑ 50.4%

================================================================================
SUMMARY
================================================================================

Improvements (15):
  Map (100 elements): 57.0% faster
  Map + Fold Pipeline (100 elements): 55.8% faster
  Filter (100 elements): 55.5% faster
  Data Processing Pipeline: 53.5% faster
  Nested Data Transformation: 50.4% faster

Regressions (3):
  Alist Creation (5 pairs): 1.2% slower
  List Reverse (20 elements): 1.2% slower
  Nested Lambda Calls: 1.0% slower

Overall: 23.1% faster on average`
            }),
            h('p', {},
                'Cumulatively, this gives:'
            ),
            CodeFragment.create({language: 'text', code:
`================================================================================
COMPARISON WITH BASELINE: baseline.json
================================================================================
Benchmark                                Current      Baseline     Change
--------------------------------------------------------------------------------
Simple Addition                          0.045ms      0.095ms      ↑ 52.0%
Nested Arithmetic                        0.070ms      0.119ms      ↑ 41.5%
Complex Math                             0.065ms      0.114ms      ↑ 43.1%
Simple Lambda Call                       0.059ms      0.110ms      ↑ 46.6%
Lambda with Multiple Args                0.077ms      0.129ms      ↑ 40.4%
Nested Lambda Calls                      0.084ms      0.134ms      ↑ 37.2%
Factorial (10)                           0.300ms      0.407ms      ↑ 26.2%
Fibonacci (15)                           32.950ms     41.964ms     ↑ 21.5%
Tail Recursive Sum (100)                 1.798ms      2.362ms      ↑ 23.9%
List Creation (10 elements)              0.058ms      0.109ms      ↑ 46.7%
List Append                              0.063ms      0.116ms      ↑ 45.5%
List Reverse (20 elements)               0.084ms      0.134ms      ↑ 37.5%
Cons Building (10 elements)              0.116ms      0.175ms      ↑ 33.9%
Map (10 elements)                        0.118ms      0.227ms      ↑ 48.1%
Map (100 elements)                       0.444ms      1.071ms      ↑ 58.6%
Filter (100 elements)                    0.450ms      1.042ms      ↑ 56.8%
Fold (100 elements)                      0.137ms      0.269ms      ↑ 49.1%
Map + Fold Pipeline (100 elements)       0.536ms      1.216ms      ↑ 55.9%
Simple Let (2 bindings)                  0.074ms      0.126ms      ↑ 41.4%
Nested Let (3 levels)                    0.104ms      0.155ms      ↑ 32.6%
Let with Many Bindings (10)              0.155ms      0.207ms      ↑ 24.9%
Recursive Let Binding                    0.200ms      0.270ms      ↑ 26.0%
String Append                            0.046ms      0.097ms      ↑ 52.6%
String Manipulation                      0.055ms      0.107ms      ↑ 48.4%
Alist Creation (5 pairs)                 0.071ms      0.121ms      ↑ 41.4%
Alist Get                                0.069ms      0.121ms      ↑ 42.5%
Alist Set                                0.071ms      0.122ms      ↑ 41.8%
Alist Merge                              0.083ms      0.136ms      ↑ 38.9%
Data Processing Pipeline                 0.697ms      1.537ms      ↑ 54.7%
Nested Data Transformation               0.522ms      1.089ms      ↑ 52.1%

================================================================================
SUMMARY
================================================================================

Improvements (30):
  Map (100 elements): 58.6% faster
  Filter (100 elements): 56.8% faster
  Map + Fold Pipeline (100 elements): 55.9% faster
  Data Processing Pipeline: 54.7% faster
  String Append: 52.6% faster

Overall: 42.1% faster on average`
            }),
            h('p', {},
                'This is a huge gain overall!'
            )
        )
    ];
}

export const notesPost_2026_01_09 = new NotesPost(
    '2026-01-09: Expanding AIFPL',
    '2026-01-09',
    '/notes/2026-01-09',
    'Expanding AIFPL',
    null,
    null,
    notesOpening_2026_01_09,
    notesArticle_2026_01_09,
    null
);
