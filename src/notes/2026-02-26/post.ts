import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_02_26(): VElement[] {
    return [
        h('p', {},
            "For the last week I've been busy cleaning up AIFPL.  The compiler makes it an interesting and viable language, " +
            "but exposing a set of sensible VM opcodes really emphasised a few very weird things about the design."
        )
    ];
}

function notesArticle_2026_02_26(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Opcodes, lots of opcodes'),
            h('p', {},
                "The first versions of the AIFPL compiler had about 15-20 opcodes.  Almost everything was implemented via " +
                "builtin functions.  This made it easy to port over from the original interpreter, but that's no way to " +
                "build a VM!"
            ),
            h('p', {},
                "Over the last week or so I've moved all those to being opcodes.  Doing this forced me to think about VM " +
                "designs properly though as I realized some of the new opcodes were pretty bizarre.  For example, we had " +
                "integers, floating point numbers, and complex numbers all as \"number\" but they're actually quite a " +
                "disjoint set.  I'd copied a Scheme-like numeric tower, but in doing so had made things really quite " +
                "difficult to fully understand."
            )
        ),
        h('section', {},
            h('h2', {}, 'Strict typing and the end of the numeric tower'),
            h('p', {},
                "Ideal opcodes do one thing and do it well.  They generally don't do very complex things.  The \"number\" " +
                "opcodes were doing way too much work and were thus quite a slower than I'd like.  That this showed up in " +
                "Python profiles was enough to make me realize just how bad this would be when I wrote a high performance " +
                "VM implementation."
            ),
            h('p', {},
                "I split out the 3 types and added explicit conversion functions, banning all implicit coercions.  The " +
                "result is much more satisfying and less error prone.  This does mean we have currently lost a lot of " +
                "nice short polymorphic operators such as ",
                h('code', {}, '+'),
                ", ",
                h('code', {}, '*'),
                ", ",
                h('code', {}, '!='),
                ", ",
                h('code', {}, '<'),
                ", etc., and now have the human-clunky, but surprisingly AI-friendly ",
                h('code', {}, 'integer+'),
                ", ",
                h('code', {}, 'float*'),
                ", ",
                h('code', {}, 'list!=?'),
                ", and ",
                h('code', {}, 'string<?'),
                "."
            ),
            h('p', {},
                "Once on this particular mission, however, everything had to be made to conform.  Having disposed of " +
                "some essentials of Lisp/Scheme, it became quite natural to also replace ",
                h('code', {}, 'map'),
                " with ",
                h('code', {}, 'list-map'),
                " because it works on maps.  This opened up a nice symmetrical space for ",
                h('code', {}, 'alist-map'),
                "."
            ),
            h('p', {},
                "The whole exercise was invaluable:"
            ),
            h('ul', {},
                h('li', {}, "I found a lot of weird edge case behaviours that weren't desirable."),
                h('li', {}, "I was forced to think about how to return errors cleanly."),
                h('li', {}, "I discovered the AI help docs were pretty awful and fixed them!"),
                h('li', {},
                    "I could have conversations with AIs about their preferences (they prefer the hinting of regularized " +
                    "naming to historic legacy names)."
                ),
                h('li', {},
                    "The AIs and I could look for interesting gaps in the operations available in the language and fix them."
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Mind the gap'),
            h('p', {},
                "There were a lot of gaps!"
            ),
            h('ul', {},
                h('li', {},
                    h('code', {}, 'match'),
                    " did weird and inconsistent predicate matching and only accepted a fixed set of predicates.  Worse, " +
                    "it was using heuristics to determine if these were predicates or list destructuring!  The syntax now " +
                    "makes this unambiguous, but has the added benefit that user-defined predicates now work too!"
                ),
                h('li', {}, "String conversions had some very odd behaviours that were really not helpful."),
                h('li', {}, "We couldn't easily slice strings or lists."),
                h('li', {}, "log(n) and log(2) operations weren't implemented."),
                h('li', {}, "Some operations had weird argument ordering."),
                h('li', {}, "Symbols were actually second-class and weren't useful first class objects."),
                h('li', {}, "We couldn't introspect on functions, nor could we ", h('code', {}, 'apply'), " them."),
                h('li', {},
                    h('code', {}, 'alist'),
                    " wasn't actually a regular alist!"
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Goodbye alists, hello dictionaries'),
            h('p', {},
                "AIFPL's ",
                h('code', {}, 'alist'),
                " type was implemented using Python dictionaries from pretty-much the outset.  I'd been persuaded by " +
                "various AIs that \"association list\" was an appropriate name, but alists typically have a lot of O(n) " +
                "behaviours and AIFPL's alists were O(1) in many instances."
            ),
            h('p', {},
                "Having resolved a lot of other weirdness I eventually looked at this problem.  Given all the context, " +
                "multiple LLM types concluded that alist was really wrong.  These are dictionaries, so now they're ",
                h('code', {}, 'dict'),
                "."
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance update'),
            h('p', {},
                "Here's the latest profiler run for the Rubik's cube test:"
            ),
            CodeFragment.create({
                code: `====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         50008351 function calls (48514719 primitive calls) in 9.654 seconds

   Ordered by: cumulative time
   List reduced from 280 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    9.865    9.865 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:643(evaluate)
        1    0.000    0.000    9.865    9.865 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:626(_evaluate_raw)
        1    0.000    0.000    9.821    9.821 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:436(execute)
 731965/1    3.555    0.000    9.811    9.811 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:477(_execute_frame)
 731964/4    0.780    0.000    9.811    2.453 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:774(_op_call)
  3974815    0.882    0.000    1.294    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:601(_op_load_var)
  8099820    0.517    0.000    0.517    0.000 {method 'append' of 'list' objects}
  7538851    0.506    0.000    0.506    0.000 {method 'pop' of 'list' objects}
   973894    0.338    0.000    0.468    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:619(_op_enter)
 10252722    0.428    0.000    0.428    0.000 {built-in method builtins.len}
   355704    0.240    0.000    0.415    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2497(_op_list_ref)
   234346    0.150    0.000    0.303    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2521(_op_list_null_p)
   340285    0.155    0.000    0.288    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2442(_op_list_first)
   731965    0.170    0.000    0.264    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:905(_op_return)
  4662038    0.247    0.000    0.250    0.000 {built-in method builtins.isinstance}
   211847    0.097    0.000    0.250    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2456(_op_list_rest)
   198018    0.140    0.000    0.231    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1148(_op_integer_neq_p)
  1292859    0.155    0.000    0.217    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:353(_ensure_list)
   535384    0.127    0.000    0.190    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:701(_op_jump_if_false)
  3993624    0.170    0.000    0.170    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:2371(cast)
   121101    0.068    0.000    0.159    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2413(_op_list_prepend)
   570579    0.081    0.000    0.115    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:571(_op_load_const)
    69682    0.048    0.000    0.111    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2363(_op_dict_get)
    77900    0.055    0.000    0.109    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1985(_op_string_eq_p)
   211847    0.059    0.000    0.090    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:290(rest)
   765711    0.084    0.000    0.084    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:399(_check_and_pack_args)
    51865    0.038    0.000    0.073    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:743(_op_make_closure)
   110274    0.048    0.000    0.073    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2374(_op_list)
   765712    0.069    0.000    0.069    0.000 <string>:2(__init__)
     7336    0.020    0.000    0.051    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2245(_op_dict)
   121101    0.030    0.000    0.047    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:304(cons)
   234346    0.033    0.000    0.046    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:279(is_empty)
        1    0.000    0.000    0.044    0.044 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:81(compile)
    76993    0.023    0.000    0.040    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:587(_op_load_false)
    25421    0.020    0.000    0.039    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1205(_op_integer_add)
   140341    0.023    0.000    0.033    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:610(_op_store_var)
   340285    0.032    0.000    0.032    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:283(first)
    69682    0.018    0.000    0.031    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:394(get)
    33747    0.019    0.000    0.029    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:811(_op_tail_call)
    22245    0.011    0.000    0.029    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2433(_op_list_reverse)
   164551    0.020    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:360(_ensure_string)
   355704    0.026    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:316(get)
    22002    0.014    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2484(_op_list_length)
      2/1    0.000    0.000    0.023    0.023 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:55(compile_to_resolved_ast)
   2572/1    0.001    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:89(resolve)
   3377/4    0.000    0.000    0.022    0.006 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.022    0.022 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:776(load_module)
   113702    0.016    0.000    0.021    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:485(_to_hashable_key)
     7336    0.011    0.000    0.019    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:349(__post_init__)
   212322    0.016    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:694(_op_jump)
     8748    0.008    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2143(_op_string_ref)
    73760    0.010    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:367(_ensure_integer)
    69682    0.009    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:392(_ensure_dict)
    22245    0.008    0.000    0.011    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:312(reverse)
        1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:157(build)
   2199/1    0.001    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:176(_analyze_expression)
    773/1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:216(_analyze_list)
     55/1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:367(_analyze_let)
      2/1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:443(_analyze_letrec)
        1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:736(validate_bytecode)
     35/1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:299(validate)
        2    0.002    0.001    0.010    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_lexer.py:62(lex)
        2    0.000    0.000    0.008    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:66(parse)
   2503/2    0.001    0.000    0.008    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:117(_parse_expression)
    738/2    0.002    0.000    0.008    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:391(_parse_list)
     14/2    0.000    0.000    0.008    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:428(_parse_let_with_tracking)
    34/30    0.001    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:524(_analyze_lambda)
     14/6    0.000    0.000    0.008    0.001 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:495(_parse_let_bindings)
    57/39    0.000    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:541(_parse_single_binding)
    25917    0.006    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:664(_op_load_name)
     5792    0.004    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1133(_op_integer_eq_p)
     3665    0.003    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2590(_op_list_concat)
     3668    0.003    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1170(_op_integer_gt_p)
     4149    0.002    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1086(_op_boolean_p)
     3417    0.003    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1752(_op_integer_min)
        1    0.000    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:117(generate)
   2268/1    0.001    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:146(_generate_expr)
     69/1    0.000    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:621(_generate_return)
     55/1    0.000    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:324(_generate_let)`,
                language: 'text'
            }),
            h('p', {},
                "This is about 6-7% faster than the results from 8 days ago.  It's going to be quite hard to make this " +
                "Python VM run faster, but its performance is quite acceptable for many applications."
            )
        )
    ];
}

export const notesPost_2026_02_26 = new NotesPost(
    '2026-02-26: What\'s in a name?',
    '2026-02-26',
    '/notes/2026-02-26',
    'A week of AIFPL cleanup: strict typing, opcodes, naming regularization, and the end of alists.',
    null,
    null,
    notesOpening_2026_02_26,
    notesArticle_2026_02_26,
    null
);
