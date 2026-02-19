import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_02_18(): VElement[] {
    return [
        h('p', {},
            "I've been working on a new approach where there are many more opcodes in the AIFPL virtual machine design. " +
            "With this I'll open up a lot of future optimizations."
        ),
        h('p', {},
            "While I've been testing I've been playing with a Rubik's cube solver that I had GLM 4.7 write for me. " +
            "It's very slow right now but it's an interesting program and quite good as a benchmark."
        )
    ];
}

function notesArticle_2026_02_18(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Old builtin functions'),
            h('p', {},
                "Here's the profiler data for the old builtin functions:"
            ),
            CodeFragment.create({
                code: `====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         53701203 function calls (52208251 primitive calls) in 11.617 seconds

   Ordered by: cumulative time
   List reduced from 288 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000   12.014   12.014 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:135(evaluate)
        1    0.000    0.000   12.014   12.014 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:118(_evaluate_raw)
        1    0.000    0.000   11.967   11.967 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:208(execute)
 731965/1    4.180    0.000   11.956   11.956 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:244(_execute_frame)
 731964/4    0.576    0.000   11.955    2.989 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:558(_op_call_function)
  1800181    0.736    0.000    2.853    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:670(_op_call_builtin)
  3970419    1.046    0.000    1.491    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:365(_op_load_var)
   765711    0.375    0.000    0.686    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1116(_setup_call_frame)
 13226472    0.591    0.000    0.591    0.000 {built-in method builtins.len}
  8065941    0.553    0.000    0.553    0.000 {method 'append' of 'list' objects}
  2066741    0.370    0.000    0.538    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:379(_op_store_var)
   355704    0.193    0.000    0.371    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1085(_builtin_list_ref)
  4190753    0.334    0.000    0.334    0.000 {method 'pop' of 'list' objects}
  4417277    0.279    0.000    0.288    0.000 {built-in method builtins.isinstance}
   731965    0.176    0.000    0.288    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:695(_op_return)
   234346    0.139    0.000    0.283    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1118(_builtin_null_p)
   198018    0.166    0.000    0.269    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:335(_builtin_bang_eq)
   340285    0.136    0.000    0.249    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1049(_builtin_first)
  1292859    0.172    0.000    0.244    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:22(_ensure_list)
   211847    0.087    0.000    0.237    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1061(_builtin_rest)
   531235    0.141    0.000    0.216    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:471(_op_jump_if_false)
  3988617    0.187    0.000    0.187    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:2371(cast)
    51865    0.085    0.000    0.157    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:525(_op_make_closure)
   121101    0.052    0.000    0.133    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1017(_builtin_cons)
    87841    0.052    0.000    0.131    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:326(_builtin_eq)
   570579    0.090    0.000    0.128    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:319(_op_load_const)
    69682    0.057    0.000    0.117    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1332(_builtin_alist_get)
   211847    0.066    0.000    0.102    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:232(rest)
   765712    0.093    0.000    0.093    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:54(__post_init__)
   364452    0.048    0.000    0.067    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:46(_ensure_integer)
   765711    0.066    0.000    0.066    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:484(is_native)
    87841    0.018    0.000    0.061    0.000 {built-in method builtins.all}
    25421    0.023    0.000    0.057    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:807(_op_add)
   207469    0.038    0.000    0.056    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:50(__eq__)
     7336    0.022    0.000    0.054    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1297(_builtin_alist)
   121101    0.034    0.000    0.053    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:246(cons)
   110274    0.033    0.000    0.052    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1013(_builtin_list)
   234346    0.037    0.000    0.050    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:221(is_empty)
        1    0.000    0.000    0.048    0.048 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:81(compile)
    98256    0.018    0.000    0.043    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:333(<genexpr>)
   340285    0.035    0.000    0.035    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:225(first)
    69682    0.019    0.000    0.034    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:344(get)
    33747    0.022    0.000    0.030    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:609(_op_tail_call_function)
   355704    0.029    0.000    0.029    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:258(get)
    22245    0.010    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1041(_builtin_reverse)
      2/1    0.000    0.000    0.025    0.025 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:55(compile_to_resolved_ast)
    22002    0.014    0.000    0.025    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:1103(_builtin_length)
   2548/1    0.001    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:89(resolve)
   3344/4    0.000    0.000    0.024    0.006 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:268(load_module)
   113702    0.018    0.000    0.024    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:435(_to_hashable_key)
     7336    0.011    0.000    0.020    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:299(__post_init__)
   151914    0.018    0.000    0.018    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:549(<genexpr>)
   212075    0.018    0.000    0.018    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:460(_op_jump)
    78143    0.013    0.000    0.018    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:144(__eq__)
    25421    0.009    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:797(_wrap_numeric_result)
    22245    0.010    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:254(reverse)
     3668    0.005    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:366(_builtin_gt)
     8748    0.007    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:803(_builtin_string_ref)
    50842    0.009    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:749(_ensure_number)
    14170    0.004    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:36(_ensure_real_number)
     3417    0.003    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_builtin_functions.py:614(_builtin_min)
        1    0.000    0.000    0.012    0.012 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:154(build)
   2140/1    0.001    0.000    0.012    0.012 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:173(_analyze_expression)
    723/1    0.001    0.000    0.012    0.012 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:213(_analyze_list)
     49/1    0.000    0.000    0.012    0.012 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:341(_analyze_let)
      2/1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:417(_analyze_letrec)
        1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:586(validate_bytecode)
     35/1    0.000    0.000    0.011    0.011 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:168(validate)
        2    0.003    0.001    0.011    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_lexer.py:62(lex)
        2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:66(parse)
   2479/2    0.002    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:117(_parse_expression)
    729/2    0.002    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:395(_parse_list)
     14/2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:432(_parse_let_with_tracking)
     14/6    0.000    0.000    0.009    0.002 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:499(_parse_let_bindings)
    34996    0.005    0.000    0.009    0.000 <frozen abc>:117(__instancecheck__)
    57/39    0.000    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:545(_parse_single_binding)
    25917    0.007    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:426(_op_load_name)
    34/30    0.000    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:498(_analyze_lambda)`,
                language: 'text'
            })
        ),
        h('section', {},
            h('h2', {}, 'New opcodes'),
            h('p', {},
                "With the new opcodes this gets more than 10% faster! The main improvement is eliminating the builtin function dispatch logic:"
            ),
            CodeFragment.create({
                code: `====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         52085841 function calls (50592552 primitive calls) in 10.308 seconds

   Ordered by: cumulative time
   List reduced from 286 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000   10.673   10.673 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:135(evaluate)
        1    0.000    0.000   10.673   10.673 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:118(_evaluate_raw)
        1    0.000    0.000   10.628   10.628 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:292(execute)
 731965/1    3.922    0.000   10.619   10.619 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:356(_execute_frame)
 731964/4    0.522    0.000   10.618    2.655 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:618(_op_call_function)
  3970419    0.968    0.000    1.383    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:461(_op_load_var)
   765711    0.338    0.000    0.618    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:328(_setup_call_frame)
  8121471    0.517    0.000    0.517    0.000 {method 'append' of 'list' objects}
  2066741    0.336    0.000    0.480    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:471(_op_store_var)
 11195950    0.466    0.000    0.466    0.000 {built-in method builtins.len}
  6794944    0.464    0.000    0.464    0.000 {method 'pop' of 'list' objects}
   355704    0.245    0.000    0.424    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1259(_op_list_ref)
   234346    0.154    0.000    0.317    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1456(_op_null_p)
   340285    0.168    0.000    0.302    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1217(_op_first)
   211847    0.108    0.000    0.263    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1231(_op_rest)
  4404428    0.258    0.000    0.263    0.000 {built-in method builtins.isinstance}
   198018    0.137    0.000    0.253    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1878(_op_neq)
   731965    0.157    0.000    0.251    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:743(_op_return)
  1292859    0.162    0.000    0.230    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:837(_ensure_list)
   531235    0.125    0.000    0.191    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:547(_op_jump_if_false)
  3989027    0.174    0.000    0.174    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:2371(cast)
   121101    0.070    0.000    0.164    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1184(_op_cons)
    51865    0.078    0.000    0.145    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:589(_op_make_closure)
   570579    0.082    0.000    0.119    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:431(_op_load_const)
    69682    0.049    0.000    0.114    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1791(_op_alist_get)
    87841    0.053    0.000    0.106    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1869(_op_eq)
   211847    0.059    0.000    0.092    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:232(rest)
   765712    0.084    0.000    0.084    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:54(__post_init__)
   110274    0.052    0.000    0.077    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2017(_op_build_list)
   765711    0.061    0.000    0.061    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:484(is_native)
     7336    0.022    0.000    0.052    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:2030(_op_build_alist)
    25421    0.020    0.000    0.051    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:875(_op_add)
   207469    0.034    0.000    0.051    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:50(__eq__)
   121101    0.031    0.000    0.049    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:246(cons)
   234346    0.033    0.000    0.046    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:221(is_empty)
        1    0.000    0.000    0.045    0.045 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:81(compile)
    76993    0.024    0.000    0.041    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:447(_op_load_false)
    22245    0.011    0.000    0.037    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1208(_op_reverse)
    69682    0.018    0.000    0.032    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:344(get)
   340285    0.032    0.000    0.032    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:225(first)
    33747    0.021    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:665(_op_tail_call_function)
    22002    0.015    0.000    0.027    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1195(_op_length)
   355704    0.026    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:258(get)
      2/1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_compiler.py:55(compile_to_resolved_ast)
   2548/1    0.001    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:89(resolve)
   3344/4    0.000    0.000    0.024    0.006 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/aifpl/aifpl.py:268(load_module)
   113702    0.016    0.000    0.022    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:435(_to_hashable_key)
    22245    0.016    0.000    0.019    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:254(reverse)
     7336    0.010    0.000    0.018    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:299(__post_init__)
   151914    0.017    0.000    0.017    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:609(<genexpr>)
   212075    0.016    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:540(_op_jump)
    28838    0.009    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:865(_wrap_numeric_result)
     8748    0.009    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1608(_op_string_ref)
    78143    0.012    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_value.py:144(__eq__)
    69682    0.009    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:858(_ensure_alist)
    50842    0.008    0.000    0.011    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:789(_ensure_number)
        2    0.003    0.001    0.011    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_lexer.py:62(lex)
        1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:154(build)
   2181/1    0.001    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:173(_analyze_expression)
    764/1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:213(_analyze_list)
     49/1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:341(_analyze_let)
      2/1    0.000    0.000    0.010    0.010 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:417(_analyze_letrec)
        1    0.000    0.000    0.009    0.009 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:688(validate_bytecode)
     35/1    0.000    0.000    0.009    0.009 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_bytecode_validator.py:262(validate)
        2    0.000    0.000    0.009    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:66(parse)
   2479/2    0.001    0.000    0.009    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:117(_parse_expression)
    729/2    0.002    0.000    0.009    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:395(_parse_list)
     14/2    0.000    0.000    0.009    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:432(_parse_let_with_tracking)
     14/6    0.000    0.000    0.009    0.001 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:499(_parse_let_bindings)
    57/39    0.000    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_parser.py:545(_parse_single_binding)
    25917    0.006    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:510(_op_load_name)
    34/30    0.000    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_ir_builder.py:498(_analyze_lambda)
     3417    0.003    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1847(_op_min)
     3665    0.003    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1829(_op_append)
     3668    0.003    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_vm.py:1896(_op_gt)
    20851    0.003    0.000    0.005    0.000 <frozen abc>:117(__instancecheck__)
        1    0.000    0.000    0.005    0.005 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:223(generate)
   2250/1    0.001    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/aifpl/aifpl_codegen.py:252(_generate_expr)`,
                language: 'text'
            })
        ),
        h('section', {},
            h('h2', {}, 'The solver'),
            h('p', {},
                "Here's the solver:"
            ),
            CodeFragment.create({
                code: `; Rubik's Cube Solver in AIFPL
; Uses IDA* algorithm with heuristic based on misplaced stickers
; 
; Cube representation: alist with 6 faces, each face is list of 9 stickers (0-5)
; Face order: U(up/white), D(down/yellow), F(front/green), B(back/blue), L(left/orange), R(right/red)
; Sticker positions on each face:
;   0 1 2
;   3 4 5
;   6 7 8
; Center (position 4) never moves and identifies the face color

(letrec
  ((second (lambda (lst) (first (rest lst))))
   (solved-cube
     (lambda ()
       (alist
         (list "U" (list 0 0 0 0 0 0 0 0 0))
         (list "D" (list 1 1 1 1 1 1 1 1 1))
         (list "F" (list 2 2 2 2 2 2 2 2 2))
         (list "B" (list 3 3 3 3 3 3 3 3 3))
         (list "L" (list 4 4 4 4 4 4 4 4 4))
         (list "R" (list 5 5 5 5 5 5 5 5 5)))))

   (get-face
     (lambda (cube face)
       (alist-get cube face)))

   (get-sticker
     (lambda (face pos)
       (list-ref face pos)))

   (rotate-face-cw
     (lambda (face)
       (list
         (get-sticker face 6)
         (get-sticker face 3)
         (get-sticker face 0)
         (get-sticker face 7)
         (get-sticker face 4)
         (get-sticker face 1)
         (get-sticker face 8)
         (get-sticker face 5)
         (get-sticker face 2))))

   (move-U
     (lambda (cube)
       (let* ((u (get-face cube "U"))
              (f (get-face cube "F"))
              (r (get-face cube "R"))
              (b (get-face cube "B"))
              (l (get-face cube "L")))
         (alist
           (list "U" (rotate-face-cw u))
           (list "D" (get-face cube "D"))
           (list "F" (list (get-sticker r 0) (get-sticker r 1) (get-sticker r 2)
                          (get-sticker f 3) (get-sticker f 4) (get-sticker f 5)
                          (get-sticker f 6) (get-sticker f 7) (get-sticker f 8)))
           (list "B" (list (get-sticker l 0) (get-sticker l 1) (get-sticker l 2)
                          (get-sticker b 3) (get-sticker b 4) (get-sticker b 5)
                          (get-sticker b 6) (get-sticker b 7) (get-sticker b 8)))
           (list "L" (list (get-sticker f 0) (get-sticker f 1) (get-sticker f 2)
                          (get-sticker l 3) (get-sticker l 4) (get-sticker l 5)
                          (get-sticker l 6) (get-sticker l 7) (get-sticker l 8)))
           (list "R" (list (get-sticker b 0) (get-sticker b 1) (get-sticker b 2)
                          (get-sticker r 3) (get-sticker r 4) (get-sticker r 5)
                          (get-sticker r 6) (get-sticker r 7) (get-sticker r 8)))))))

   (move-D
     (lambda (cube)
       (let* ((d (get-face cube "D"))
              (f (get-face cube "F"))
              (r (get-face cube "R"))
              (b (get-face cube "B"))
              (l (get-face cube "L")))
         (alist
           (list "U" (get-face cube "U"))
           (list "D" (rotate-face-cw d))
           (list "F" (list (get-sticker f 0) (get-sticker f 1) (get-sticker f 2)
                          (get-sticker f 3) (get-sticker f 4) (get-sticker f 5)
                          (get-sticker l 6) (get-sticker l 7) (get-sticker l 8)))
           (list "B" (list (get-sticker b 0) (get-sticker b 1) (get-sticker b 2)
                          (get-sticker b 3) (get-sticker b 4) (get-sticker b 5)
                          (get-sticker r 6) (get-sticker r 7) (get-sticker r 8)))
           (list "L" (list (get-sticker l 0) (get-sticker l 1) (get-sticker l 2)
                          (get-sticker l 3) (get-sticker l 4) (get-sticker l 5)
                          (get-sticker b 6) (get-sticker b 7) (get-sticker b 8)))
           (list "R" (list (get-sticker r 0) (get-sticker r 1) (get-sticker r 2)
                          (get-sticker r 3) (get-sticker r 4) (get-sticker r 5)
                          (get-sticker f 6) (get-sticker f 7) (get-sticker f 8)))))))

   (move-F
     (lambda (cube)
       (let* ((f (get-face cube "F"))
              (u (get-face cube "U"))
              (r (get-face cube "R"))
              (d (get-face cube "D"))
              (l (get-face cube "L")))
         (alist
           (list "U" (list (get-sticker u 0) (get-sticker u 1) (get-sticker u 2)
                          (get-sticker u 3) (get-sticker u 4) (get-sticker u 5)
                          (get-sticker l 8) (get-sticker l 5) (get-sticker l 2)))
           (list "D" (list (get-sticker r 0) (get-sticker r 3) (get-sticker r 6)
                          (get-sticker d 3) (get-sticker d 4) (get-sticker d 5)
                          (get-sticker d 6) (get-sticker d 7) (get-sticker d 8)))
           (list "F" (rotate-face-cw f))
           (list "B" (get-face cube "B"))
           (list "L" (list (get-sticker l 0) (get-sticker l 1) (get-sticker d 2)
                          (get-sticker l 3) (get-sticker l 4) (get-sticker d 1)
                          (get-sticker l 6) (get-sticker l 7) (get-sticker d 0)))
           (list "R" (list (get-sticker u 6) (get-sticker r 1) (get-sticker r 2)
                          (get-sticker u 7) (get-sticker r 4) (get-sticker r 5)
                          (get-sticker u 8) (get-sticker r 7) (get-sticker r 8)))))))

   (move-B
     (lambda (cube)
       (let* ((b (get-face cube "B"))
              (u (get-face cube "U"))
              (l (get-face cube "L"))
              (d (get-face cube "D"))
              (r (get-face cube "R")))
         (alist
           (list "U" (list (get-sticker r 8) (get-sticker r 5) (get-sticker r 2)
                          (get-sticker u 3) (get-sticker u 4) (get-sticker u 5)
                          (get-sticker u 6) (get-sticker u 7) (get-sticker u 8)))
           (list "D" (list (get-sticker d 0) (get-sticker d 1) (get-sticker d 2)
                          (get-sticker d 3) (get-sticker d 4) (get-sticker d 5)
                          (get-sticker l 6) (get-sticker l 3) (get-sticker l 0)))
           (list "F" (get-face cube "F"))
           (list "B" (rotate-face-cw b))
           (list "L" (list (get-sticker u 2) (get-sticker l 1) (get-sticker l 2)
                          (get-sticker u 1) (get-sticker l 4) (get-sticker l 5)
                          (get-sticker u 0) (get-sticker l 7) (get-sticker l 8)))
           (list "R" (list (get-sticker r 0) (get-sticker r 1) (get-sticker d 6)
                          (get-sticker r 3) (get-sticker r 4) (get-sticker d 7)
                          (get-sticker r 6) (get-sticker r 7) (get-sticker d 8)))))))

   (move-L
     (lambda (cube)
       (let* ((l (get-face cube "L"))
              (u (get-face cube "U"))
              (f (get-face cube "F"))
              (d (get-face cube "D"))
              (b (get-face cube "B")))
         (alist
           (list "U" (list (get-sticker b 8) (get-sticker u 1) (get-sticker u 2)
                          (get-sticker b 5) (get-sticker u 4) (get-sticker u 5)
                          (get-sticker b 2) (get-sticker u 7) (get-sticker u 8)))
           (list "D" (list (get-sticker f 0) (get-sticker d 1) (get-sticker d 2)
                          (get-sticker f 3) (get-sticker d 4) (get-sticker d 5)
                          (get-sticker f 6) (get-sticker d 7) (get-sticker d 8)))
           (list "F" (list (get-sticker u 0) (get-sticker f 1) (get-sticker f 2)
                          (get-sticker u 3) (get-sticker f 4) (get-sticker f 5)
                          (get-sticker u 6) (get-sticker f 7) (get-sticker f 8)))
           (list "B" (list (get-sticker b 0) (get-sticker b 1) (get-sticker d 6)
                          (get-sticker b 3) (get-sticker b 4) (get-sticker d 3)
                          (get-sticker b 6) (get-sticker b 7) (get-sticker d 0)))
           (list "L" (rotate-face-cw l))
           (list "R" (get-face cube "R"))))))

   (move-R
     (lambda (cube)
       (let* ((r (get-face cube "R"))
              (u (get-face cube "U"))
              (b (get-face cube "B"))
              (d (get-face cube "D"))
              (f (get-face cube "F")))
         (alist
           (list "U" (list (get-sticker u 0) (get-sticker u 1) (get-sticker f 2)
                          (get-sticker u 3) (get-sticker u 4) (get-sticker f 5)
                          (get-sticker u 6) (get-sticker u 7) (get-sticker f 8)))
           (list "D" (list (get-sticker d 0) (get-sticker d 1) (get-sticker b 6)
                          (get-sticker d 3) (get-sticker d 4) (get-sticker b 3)
                          (get-sticker d 6) (get-sticker d 7) (get-sticker b 0)))
           (list "F" (list (get-sticker f 0) (get-sticker f 1) (get-sticker d 2)
                          (get-sticker f 3) (get-sticker f 4) (get-sticker d 5)
                          (get-sticker f 6) (get-sticker f 7) (get-sticker d 8)))
           (list "B" (list (get-sticker u 8) (get-sticker b 1) (get-sticker b 2)
                          (get-sticker u 5) (get-sticker b 4) (get-sticker b 5)
                          (get-sticker u 2) (get-sticker b 7) (get-sticker b 8)))
           (list "L" (get-face cube "L"))
           (list "R" (rotate-face-cw r))))))

   (apply-move
     (lambda (cube move-name)
       (match move-name
         ("U" (move-U cube))
         ("U'" (move-U (move-U (move-U cube))))
         ("U2" (move-U (move-U cube)))
         ("D" (move-D cube))
         ("D'" (move-D (move-D (move-D cube))))
         ("D2" (move-D (move-D cube)))
         ("F" (move-F cube))
         ("F'" (move-F (move-F (move-F cube))))
         ("F2" (move-F (move-F cube)))
         ("B" (move-B cube))
         ("B'" (move-B (move-B (move-B cube))))
         ("B2" (move-B (move-B cube)))
         ("L" (move-L cube))
         ("L'" (move-L (move-L (move-L cube))))
         ("L2" (move-L (move-L cube)))
         ("R" (move-R cube))
         ("R'" (move-R (move-R (move-R cube))))
         ("R2" (move-R (move-R cube)))
         (_ cube))))

   (apply-moves
     (lambda (cube moves)
       (if (null? moves)
           cube
           (apply-moves (apply-move cube (first moves)) (rest moves)))))

   (face-solved?
     (lambda (face)
       (let ((center (get-sticker face 4)))
         (all? (lambda (s) (= s center)) face))))

   (cube-solved?
     (lambda (cube)
       (and (face-solved? (get-face cube "U"))
            (face-solved? (get-face cube "D"))
            (face-solved? (get-face cube "F"))
            (face-solved? (get-face cube "B"))
            (face-solved? (get-face cube "L"))
            (face-solved? (get-face cube "R")))))

   (count-mismatched
     (lambda (face)
       (let ((center (get-sticker face 4)))
         (length (filter (lambda (s) (!= s center)) face)))))

   (heuristic
     (lambda (cube)
       (let ((u (get-face cube "U"))
             (d (get-face cube "D"))
             (f (get-face cube "F"))
             (b (get-face cube "B"))
             (l (get-face cube "L"))
             (r (get-face cube "R")))
         (+ (count-mismatched u)
            (count-mismatched d)
            (count-mismatched f)
            (count-mismatched b)
            (count-mismatched l)
            (count-mismatched r)))))

   (all-moves (list "U" "U'" "U2" "D" "D'" "D2"
                    "F" "F'" "F2" "B" "B'" "B2"
                    "L" "L'" "L2" "R" "R'" "R2"))

   (move-face
     (lambda (move)
       (string-ref move 0)))

   (same-face?
     (lambda (m1 m2)
       (= (move-face m1) (move-face m2))))

   (inverse-move
     (lambda (move)
       (match move
         ("U" "U'") ("U'" "U") ("U2" "U2")
         ("D" "D'") ("D'" "D") ("D2" "D2")
         ("F" "F'") ("F'" "F") ("F2" "F2")
         ("B" "B'") ("B'" "B") ("B2" "B2")
         ("L" "L'") ("L'" "L") ("L2" "L2")
         ("R" "R'") ("R'" "R") ("R2" "R2")
         (_ move))))

   (should-prune?
     (lambda (move last-move)
       (or (same-face? move last-move)
           (= move (inverse-move last-move)))))

   (get-candidates
     (lambda (last-move)
       (if (= last-move #f)
           all-moves
           (filter (lambda (m) (not (should-prune? m last-move))) all-moves))))

   (search-moves
     (lambda (cube bound g last-move path moves best-threshold)
       (if (null? moves)
           (list #f (if (= best-threshold #f) (+ bound 1) best-threshold))
           (let* ((move (first moves))
                  (new-cube (apply-move cube move))
                  (new-path (append path (list move)))
                  (result (ida-search new-cube bound (+ g 1) move new-path)))
             (if (first result)
                 result
                 (search-moves cube bound g last-move path (rest moves)
                              (if (= best-threshold #f)
                                  (second result)
                                  (min best-threshold (second result)))))))))

   (ida-search
     (lambda (cube bound g last-move path)
       (let ((h (heuristic cube)))
         (if (cube-solved? cube)
             (list #t path)
             (if (> g bound)
                 (list #f (+ g 1))
                 (search-moves cube bound g last-move path (get-candidates last-move) #f))))))

   (ida-star
     (lambda (cube max-depth)
       (letrec ((search-loop
                  (lambda (bound)
                    (if (> bound max-depth)
                        (list #f "Max depth exceeded")
                        (let ((result (ida-search cube bound 0 #f (list))))
                          (if (first result)
                              result
                              (search-loop (second result))))))))
         (search-loop 0))))

   (sticker->str
     (lambda (s)
       (match s
         (0 "W")
         (1 "Y")
         (2 "G")
         (3 "B")
         (4 "O")
         (5 "R")
         (_ "?"))))

   (face-row->str
     (lambda (face row)
       (let ((start (* row 3)))
         (string-append
           (sticker->str (get-sticker face start))
           (sticker->str (get-sticker face (+ start 1)))
           (sticker->str (get-sticker face (+ start 2)))))))

   (print-cube
     (lambda (cube)
       (let ((u (get-face cube "U"))
             (d (get-face cube "D"))
             (f (get-face cube "F"))
             (b (get-face cube "B"))
             (l (get-face cube "L"))
             (r (get-face cube "R")))
         (string-append
           "    " (face-row->str u 0) "\\n"
           "    " (face-row->str u 1) "\\n"
           "    " (face-row->str u 2) "\\n"
           (face-row->str l 0) " " (face-row->str f 0) " " (face-row->str r 0) " " (face-row->str b 0) "\\n"
           (face-row->str l 1) " " (face-row->str f 1) " " (face-row->str r 1) " " (face-row->str b 1) "\\n"
           (face-row->str l 2) " " (face-row->str f 2) " " (face-row->str r 2) " " (face-row->str b 2) "\\n"
           "    " (face-row->str d 0) "\\n"
           "    " (face-row->str d 1) "\\n"
           "    " (face-row->str d 2) "\\n"))))

   (format-solution
     (lambda (result)
       (if (first result)
           (string-append "Solution found! Moves: " (string-join (second result) " "))
           (string-append "No solution: " (second result)))))

   (make-cube
     (lambda (u d f b l r)
       (alist
         (list "U" u) (list "D" d) (list "F" f)
         (list "B" b) (list "L" l) (list "R" r)))))

  (alist
    (list "solved-cube" solved-cube)
    (list "apply-move" apply-move)
    (list "apply-moves" apply-moves)
    (list "cube-solved?" cube-solved?)
    (list "heuristic" heuristic)
    (list "ida-star" ida-star)
    (list "print-cube" print-cube)
    (list "format-solution" format-solution)
    (list "make-cube" make-cube)
    (list "all-moves" all-moves)))`,
                language: 'aifpl'
            })
        )
    ];
}

export const notesPost_2026_02_18 = new NotesPost(
    '2026-02-18: AIFPL VM performance improvements',
    '2026-02-18',
    '/notes/2026-02-18',
    'AIFPL VM performance improvements',
    null,
    null,
    notesOpening_2026_02_18,
    notesArticle_2026_02_18,
    null
);
