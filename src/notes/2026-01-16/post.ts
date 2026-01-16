import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2026_01_16(): VElement[] {
    return [
        h('p', {},
            'Last week I had Claude generate some huge speedups on the original AIFPL implementation.  I figured I\'d spend an hour ' +
            'or two and see what else can be done!'
        )
    ];
}

function notesArticle_2026_01_16(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Bring on the profiling'),
            h('p', {},
                'The ', h('code', {}, 'benchmark.py'), ' tool from last week has some support for profiling, so I had the AI run that.  It then decided to ' +
                'build a custom benchmark profiler to work with obvious hotspots.'
            ),
            h('p', {},
                'After a few minutes it had identified some interesting problems with generating very expensive debug information where a lazy ' +
                'approach would do.  Here are the results from this:'
            ),
            CodeFragment.create({language: 'text', code:
`================================================================================
COMPARISON WITH BASELINE: final_optimized.json
================================================================================
Benchmark                                Current      Baseline     Change
--------------------------------------------------------------------------------
Simple Addition                          0.045ms      0.046ms      ↑ 1.6%
Nested Arithmetic                        0.070ms      0.071ms      ↑ 1.9%
Complex Math                             0.063ms      0.066ms      ↑ 3.5%
Simple Lambda Call                       0.058ms      0.060ms      ↑ 3.5%
Lambda with Multiple Args                0.073ms      0.078ms      ↑ 6.1%
Nested Lambda Calls                      0.077ms      0.084ms      ↑ 9.0%
Factorial (10)                           0.248ms      0.315ms      ↑ 21.1%
Fibonacci (15)                           22.841ms     34.440ms     ↑ 33.7%
Tail Recursive Sum (100)                 1.485ms      1.870ms      ↑ 20.6%
List Creation (10 elements)              0.057ms      0.062ms      ↑ 8.2%
List Append                              0.064ms      0.067ms      ↑ 4.0%
List Reverse (20 elements)               0.084ms      0.088ms      ↑ 4.6%
Cons Building (10 elements)              0.117ms      0.117ms      ~
Map (10 elements)                        0.118ms      0.119ms      ↑ 1.2%
Map (100 elements)                       0.437ms      0.442ms      ↑ 1.2%
Filter (100 elements)                    0.444ms      0.445ms      ~
Fold (100 elements)                      0.141ms      0.137ms      ↓ 3.4%
Map + Fold Pipeline (100 elements)       0.518ms      0.530ms      ↑ 2.2%
Simple Let (2 bindings)                  0.074ms      0.076ms      ↑ 2.2%
Nested Let (3 levels)                    0.103ms      0.107ms      ↑ 3.5%
Let with Many Bindings (10)              0.154ms      0.159ms      ↑ 3.5%
Recursive Let Binding                    0.177ms      0.202ms      ↑ 12.5%
String Append                            0.045ms      0.047ms      ↑ 4.1%
String Manipulation                      0.054ms      0.056ms      ↑ 2.7%
Alist Creation (5 pairs)                 0.069ms      0.072ms      ↑ 4.1%
Alist Get                                0.068ms      0.070ms      ↑ 2.2%
Alist Set                                0.070ms      0.072ms      ↑ 3.8%
Alist Merge                              0.081ms      0.084ms      ↑ 3.5%
Data Processing Pipeline                 0.696ms      0.698ms      ~
Nested Data Transformation               0.515ms      0.522ms      ↑ 1.3%

================================================================================
SUMMARY
================================================================================

Improvements (26):
  Fibonacci (15): 33.7% faster
  Factorial (10): 21.1% faster
  Tail Recursive Sum (100): 20.6% faster
  Recursive Let Binding: 12.5% faster
  Nested Lambda Calls: 9.0% faster

Regressions (1):
  Fold (100 elements): 3.4% slower

Overall: 6.0% faster on average`
            }),
            h('p', {},
                'A few things that never really improved last week suddenly got a lot better!'
            ),
            h('p', {},
                'At this point I started to look at a couple of other improvements, but noticed that the performance percentages were a ' +
                'bit misleading!  They\'re actually percentage reductions in runtime, not speedups.  Thus a 60% reduction is actually a 2.5x ' +
                'speedup (something that took 100ms, now takes 40ms!)'
            ),
            h('p', {},
                'One optimization from last week was to add type tags.  A bit of digging today revealed they weren\'t actually faster than ' +
                'using isinstance except in the case where we check if an object is an instance of a tuple of types!'
            ),
            h('p', {},
                'This was used specifically to check if a value was self-evaluating.  The easy solution was to add a new property that ' +
                'reported that directly!'
            ),
            CodeFragment.create({language: 'text', code:
`================================================================================
COMPARISON WITH BASELINE: baseline_old.json
================================================================================
Benchmark                                Current      Baseline     Speedup
--------------------------------------------------------------------------------
Simple Addition                          0.047ms      0.047ms      ~
Nested Arithmetic                        0.067ms      0.069ms      1.03x
Complex Math                             0.061ms      0.062ms      1.02x
Simple Lambda Call                       0.056ms      0.058ms      1.03x
Lambda with Multiple Args                0.072ms      0.073ms      1.02x
Nested Lambda Calls                      0.075ms      0.076ms      1.02x
Factorial (10)                           0.235ms      0.248ms      1.05x
Fibonacci (15)                           19.937ms     22.415ms     1.12x
Tail Recursive Sum (100)                 1.242ms      1.462ms      1.18x
List Creation (10 elements)              0.057ms      0.060ms      1.05x
List Append                              0.063ms      0.065ms      1.03x
List Reverse (20 elements)               0.084ms      0.087ms      1.04x
Cons Building (10 elements)              0.115ms      0.119ms      1.04x
Map (10 elements)                        0.113ms      0.121ms      1.07x
Map (100 elements)                       0.388ms      0.437ms      1.13x
Filter (100 elements)                    0.395ms      0.441ms      1.12x
Fold (100 elements)                      0.151ms      0.152ms      ~
Map + Fold Pipeline (100 elements)       0.466ms      0.512ms      1.10x
Simple Let (2 bindings)                  0.072ms      0.074ms      1.02x
Nested Let (3 levels)                    0.101ms      0.104ms      1.03x
Let with Many Bindings (10)              0.154ms      0.158ms      1.03x
Recursive Let Binding                    0.163ms      0.171ms      1.05x
String Append                            0.045ms      0.045ms      ~
String Manipulation                      0.052ms      0.053ms      ~
Alist Creation (5 pairs)                 0.069ms      0.069ms      ~
Alist Get                                0.066ms      0.067ms      1.01x
Alist Set                                0.068ms      0.069ms      1.02x
Alist Merge                              0.079ms      0.079ms      ~
Data Processing Pipeline                 0.607ms      0.697ms      1.15x
Nested Data Transformation               0.479ms      0.531ms      1.11x

================================================================================
SUMMARY
================================================================================

Improvements (24):
  Tail Recursive Sum (100): 1.18x faster (15.1% time saved)
  Data Processing Pipeline: 1.15x faster (12.9% time saved)
  Map (100 elements): 1.13x faster (11.3% time saved)
  Fibonacci (15): 1.12x faster (11.1% time saved)
  Filter (100 elements): 1.12x faster (10.4% time saved)

Overall: 1.06x on average`
            }),
            h('p', {},
                'A nice speedup again!  Note the new output format from the benchmark tool'
            )
        )
    ];
}

export const notesPost_2026_01_16 = new NotesPost(
    '2026-01-16: Accelerating AIFPL',
    '2026-01-16',
    '/notes/2026-01-16',
    'Accelerating AIFPL',
    null,
    null,
    notesOpening_2026_01_16,
    notesArticle_2026_01_16,
    null
);
