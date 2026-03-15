import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_14(): VElement[] {
    return [
        h('p', {},
            'Over the last few weeks, Menai performance has improved dramatically.  When progressively optimizing, it starts to get ' +
            'incrementally harder to have a big impact once the big things are removed.  With that said, I still found a lot of ' +
            'interesting things to do in the last few days.'
        )
    ];
}

function notesArticle_2026_03_14(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Flattening the frames'),
            h('p', {},
                'The original VM allocated a frame and a set of local variable slots, but this meant we were doing a lot of memory ' +
                'allocations and generating a lot of garbage on each function call.'
            ),
            h('p', {},
                'Having removed most stack operations it occurred to me that we should go for a sliding register window approach instead.'
            ),
            h('p', {},
                'What I didn\'t know is this is apparently how the Lua VM does things, but in my case I was thinking back to the way the ' +
                'SPARC ISA handled this.  For more info see ',
                h('a', {href: 'https://en.wikipedia.org/wiki/Register_window'}, 'Wikipedi'),
                '.'
            ),
            h('p', {},
                'Each Menai virtual register frame looks like this:'
            ),
            CodeFragment.create({
                code: `+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
| i0 | i1 | i2 | c0 | c1 | l0 | l1 | l2 | l3 | l4 | o0 | o1 |    |    |    |    |    |    |    |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+`,
                language: 'text'
            }),
            h('p', {},
                'We have ',
                h('code', {}, 'i'),
                ' for inputs, ',
                h('code', {}, 'c'),
                ' for ',
                h('code', {}, 'captures'),
                ', ',
                h('code', {}, 'l'),
                ' for ',
                h('code', {}, 'locals'),
                ', and ',
                h('code', {}, 'o'),
                ' for outputs.'
            ),
            h('p', {},
                'On calling the next function we end up with something like this:'
            ),
            CodeFragment.create({
                code: `+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
|    |    |    |    |    |    |    |    |    |    | i0 | i1 | c0 | l0 | l1 | l2 | l3 | o0 | o1 |
+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+`,
                language: 'text'
            }),
            h('p', {},
                'Here, the outputs become inputs to the next frame.'
            ),
            h('p', {},
                'Using this approach means we lost all the stack push/pop logic and thus a lot of complexity in instruction scheduling.  It ' +
                'also made the bytecode validation a lot faster.'
            ),
            h('p', {},
                'Having flattened the virtual register file it was also possible to pre-create the function frames that provide the metadata ' +
                'about the register windows.'
            ),
            h('p', {},
                'In the future, these approaches will also dramatically simplify the reference counting of objects in a future native VM.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Removed python recursions'),
            h('p', {},
                'Another quirk of the original implementation was that each frame invoked a frame execution handler.  This worked fine, but ' +
                'did mean we were limited by the python recursion limit.'
            ),
            h('p', {},
                'The revised code uses a single invocation that in turn knows how to change control flow between frames and within functions.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Super-tuned the opcode handlers'),
            h('p', {},
                'Every instruction that wasn\'t absolutely necessary got removed from the opcode handlers.  This is quite tricky as it ' +
                'involved working out which python operations were slow and which weren\'t.  In general, however, the new default was to ' +
                'aggressively split out any common subexpressions.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving code generation'),
            h('p', {},
                'The new register frame approach made it possible to implement a much more effective register allocator.  With this design ' +
                'we never have to spill to a stack, so that also keeps things simpler.'
            ),
            h('p', {},
                'New passes implemented more effective control flow, register propagation, and the sliding window register design allowed for ' +
                'much more effective passing of arguments between frames.  It also eliminated the need for the ',
                h('code', {}, 'ENTER'),
                ' opcode.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Summing up'),
            h('p', {},
                'All these changes, and a few more, generally gained between 2x and 3x on the reference tests.'
            ),
            h('p', {},
                'As an example, here\'s the 6 move shuffle profile for the Rubik\'s cube solver:'
            ),
            CodeFragment.create({
                code: `         20396030 function calls (20357425 primitive calls) in 7.685 seconds

   Ordered by: cumulative time
   List reduced from 360 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    7.807    7.807 /Users/dave/github/m6r/humbug/src/menai/menai.py:1064(evaluate)
        1    0.000    0.000    7.807    7.807 /Users/dave/github/m6r/humbug/src/menai/menai.py:1047(_evaluate_raw)
        1    3.812    3.812    7.707    7.707 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:322(execute)
  1915766    0.805    0.000    0.899    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:602(_op_call)
   115138    0.162    0.000    0.345    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3074(_op_dict_set)
   892259    0.282    0.000    0.324    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3194(_op_list_append)
  1915767    0.265    0.000    0.265    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:851(_op_return)
   554868    0.201    0.000    0.227    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3236(_op_list_rest)
   930578    0.221    0.000    0.221    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3283(_op_list_ref)
  1960594    0.195    0.000    0.195    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:495(_op_move)
  1409026    0.186    0.000    0.186    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:527(_op_jump_if_true)
   613723    0.136    0.000    0.163    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3311(_op_list_null_p)
   894969    0.150    0.000    0.150    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3220(_op_list_first)
  2880657    0.140    0.000    0.140    0.000 {built-in method builtins.len}
  1449947    0.127    0.000    0.127    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:458(_op_load_const)
   320907    0.105    0.000    0.120    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3181(_op_list_prepend)
   518076    0.118    0.000    0.118    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1173(_op_integer_neq_p)
   135625    0.083    0.000    0.109    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:555(_op_make_closure)
   115147    0.070    0.000    0.109    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:851(_op_return)
   988295    0.100    0.000    0.100    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:366(to_hashable_key)
        1    0.000    0.000    0.099    0.099 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
   182289    0.060    0.000    0.079    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3112(_op_dict_get)
    88278    0.063    0.000    0.067    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:664(_op_tail_call)
   191180    0.044    0.000    0.044    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2475(_op_string_eq_p)
   554861    0.038    0.000    0.038    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:505(_op_jump)
   430598    0.035    0.000    0.035    0.000 {method 'append' of 'list' objects}
    76105    0.030    0.000    0.035    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1271(_op_integer_add)
   136298    0.031    0.000    0.031    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:576(_op_patch_closure)
    57564    0.024    0.000    0.030    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3268(_op_list_length)
    58202    0.026    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3207(_op_list_reverse)
      2/1    0.000    0.000    0.028    0.028 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
   2587/1    0.001    0.000    0.027    0.027 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3397/4    0.000    0.000    0.027    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.027    0.027 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.027    0.027 /Users/dave/github/m6r/humbug/src/menai/menai.py:1197(load_module)
        1    0.000    0.000    0.020    0.020 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:172(build)
     35/1    0.002    0.000    0.019    0.019 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:199(_emit_vcode)
    34/30    0.000    0.000    0.018    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:398(_emit_make_closure)
    34/30    0.000    0.000    0.018    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:427(_emit_lambda)
   173327    0.016    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:444(_op_load_empty_list)
    22968    0.012    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2731(_op_string_ref)
   182289    0.015    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:423(_op_load_none)
   182387    0.011    0.000    0.013    0.000 {built-in method builtins.isinstance}
        1    0.000    0.000    0.013    0.013 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:54(optimize)
        2    0.003    0.001    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_lexer.py:62(lex)
    67801    0.012    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:465(_op_load_name)
        2    0.000    0.000    0.010    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:73(build)
   2516/2    0.002    0.000    0.010    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:150(_parse_expression)
    741/2    0.002    0.000    0.010    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:440(_parse_list)
     15/2    0.000    0.000    0.010    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:477(_parse_let_with_tracking)
     15/6    0.000    0.000    0.009    0.002 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:544(_parse_let_bindings)
    58/39    0.000    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:590(_parse_single_binding)
    105/3    0.000    0.000    0.009    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:16(optimize)
    105/3    0.000    0.000    0.009    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:53(_optimize_nested)
       35    0.003    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_allocator.py:90(allocate_slots)
        1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:576(validate_bytecode)
     35/1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:82(validate)
        1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:131(build)
   2288/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:164(_build_expr)
     60/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:360(_build_let)
   4752/2    0.003    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:66(_opt)
    123/2    0.000    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:108(_opt_let)
   2380/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:169(desugar)
     13/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:367(_desugar_let)
        1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:106(build)
     35/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:118(_lower_function)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:395(_desugar_letrec)
 1636/121    0.002    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:301(_lower_instr)
    34/30    0.000    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:575(_build_lambda_function)
    68/60    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:253(_opt_lambda)
    30/27    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:512(_build_lambda_expr)
        1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:124(build)
   2182/1    0.001    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:142(_analyze_expression)
    736/1    0.001    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:174(_analyze_list)
     63/1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:300(_analyze_let)
        2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:82(count)
   4879/2    0.003    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:123(_walk)
    123/2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:227(_walk_let)
    34/30    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:391(_analyze_lambda)
    68/60    0.000    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:192(_walk_lambda)`,
                language: 'text'
            })
        ),
        h('section', {},
            h('h2', {}, 'Going native!'),
            h('p', {},
                'The Python VM got us a very long way and is surprisingly good, but ultimately we\'re going to want native performance.'
            ),
            h('p', {},
                'As an experiment I had Claude use Cython to generate a native version of the VM.  This isn\'t a great implementation ' +
                'because it\'s still using a lot of Python internals.  This will ultimately need a full VM writing.'
            ),
            h('p', {},
                'What we did get is another 2.3x\u20132.5x (approximately).'
            ),
            h('p', {},
                'Here\'s the same Rubik\'s cube solver with the Cython VM:'
            ),
            CodeFragment.create({
                code: `         510322 function calls (471717 primitive calls) in 3.066 seconds

   Ordered by: cumulative time
   List reduced from 317 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    3.072    3.072 /Users/dave/github/m6r/humbug/src/menai/menai.py:1064(evaluate)
        1    2.965    2.965    3.072    3.072 /Users/dave/github/m6r/humbug/src/menai/menai.py:1047(_evaluate_raw)
        1    0.000    0.000    0.099    0.099 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
      2/1    0.000    0.000    0.030    0.030 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
   2587/1    0.002    0.000    0.029    0.029 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3397/4    0.001    0.000    0.029    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.029    0.029 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.029    0.029 /Users/dave/github/m6r/humbug/src/menai/menai.py:1197(load_module)
        1    0.000    0.000    0.019    0.019 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:172(build)
     35/1    0.002    0.000    0.018    0.018 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:199(_emit_vcode)
    34/30    0.000    0.000    0.018    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:398(_emit_make_closure)
    34/30    0.000    0.000    0.018    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:427(_emit_lambda)
   182387    0.011    0.000    0.013    0.000 {built-in method builtins.isinstance}
        1    0.000    0.000    0.012    0.012 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:54(optimize)
        2    0.003    0.001    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_lexer.py:62(lex)
        2    0.000    0.000    0.011    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:73(build)
   2516/2    0.002    0.000    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:150(_parse_expression)
    741/2    0.002    0.000    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:440(_parse_list)
     15/2    0.000    0.000    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:477(_parse_let_with_tracking)
     15/6    0.000    0.000    0.011    0.002 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:544(_parse_let_bindings)
    58/39    0.000    0.000    0.011    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:590(_parse_single_binding)
    105/3    0.000    0.000    0.009    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:16(optimize)
    105/3    0.000    0.000    0.009    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:53(_optimize_nested)
       35    0.003    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_allocator.py:90(allocate_slots)
        1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:576(validate_bytecode)
     35/1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:82(validate)
        1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:131(build)
   2288/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:164(_build_expr)
     60/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:360(_build_let)
   2380/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:169(desugar)
     13/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:367(_desugar_let)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:395(_desugar_letrec)
        1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:106(build)
     35/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:118(_lower_function)
 1636/121    0.002    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:301(_lower_instr)
   4752/2    0.003    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:66(_opt)
    123/2    0.000    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:108(_opt_let)
    34/30    0.000    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:575(_build_lambda_function)
    30/27    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:512(_build_lambda_expr)
    68/60    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:253(_opt_lambda)
        1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:124(build)
   2182/1    0.001    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:142(_analyze_expression)
    736/1    0.001    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:174(_analyze_list)
     63/1    0.000    0.000    0.006    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:300(_analyze_let)
        2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:82(count)
   4879/2    0.003    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:123(_walk)
    123/2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:227(_walk_let)
    34/30    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:391(_analyze_lambda)
    68/60    0.000    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:192(_walk_lambda)
       35    0.000    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_simplify_blocks.py:67(_optimize_function)
  571/173    0.001    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:448(_analyze_function_call)
       35    0.003    0.000    0.005    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:285(_validate_initialization)
    34/30    0.000    0.000    0.004    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:558(_desugar_lambda)
 1046/796    0.001    0.000    0.004    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:273(_opt_call)
     1218    0.003    0.000    0.004    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_lexer.py:379(_handle_symbol)
      3/1    0.000    0.000    0.004    0.004 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:376(_build_letrec)
       35    0.000    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_simplify_blocks.py:214(_inline_trivial_returns)
   2108/2    0.000    0.000    0.003    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ast_semantic_analyzer.py:35(analyze)
    612/2    0.000    0.000    0.003    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ast_semantic_analyzer.py:59(_analyze_list)
    62/11    0.000    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:283(_build_if)
      2/1    0.000    0.000    0.003    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ast_semantic_analyzer.py:328(_analyze_letrec)
  523/398    0.001    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:635(_build_call)
  530/152    0.001    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:592(_desugar_call)
       35    0.001    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_simplify_blocks.py:349(_max_value_id)
     3403    0.002    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:770(_advance)
   2420/1    0.001    0.000    0.003    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ast_constant_folder.py:205(optimize)
     66/1    0.000    0.000    0.003    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ast_constant_folder.py:286(_optimize_let)
    34/30    0.000    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_semantic_analyzer.py:427(_analyze_lambda)
    12131    0.001    0.000    0.003    0.000 <frozen abc>:117(__instancecheck__)
       35    0.000    0.000    0.003    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_peephole.py:88(peephole)
    34/30    0.000    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_constant_folder.py:320(_optimize_lambda)
     3542    0.002    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_allocator.py:330(_defs_uses)
    46732    0.002    0.000    0.002    0.000 {built-in method builtins.len}
      6/2    0.000    0.000    0.002    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:132(_opt_letrec)
  536/127    0.001    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_semantic_analyzer.py:806(_analyze_call)
      605    0.000    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:101(emit_constant)
       35    0.000    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_collapse_phi_chains.py:72(_optimize_function)
      6/2    0.000    0.000    0.002    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:254(_walk_letrec)
        9    0.000    0.000    0.002    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_builder.py:700(_build_dict)
        2    0.000    0.000    0.002    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ast_dependency_analyzer.py:24(analyze_letrec_bindings)`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_14 = new NotesPost(
    '2026-03-14: Walking the path to Menai performance',
    '2026-03-14',
    '/notes/2026-03-14',
    'A deep dive into the Menai VM performance improvements: sliding register windows, eliminating Python recursion, opcode tuning, better code generation, and an initial Cython native VM experiment yielding 2x\u20133x overall gains.',
    null,
    null,
    notesOpening_2026_03_14,
    notesArticle_2026_03_14,
    null
);
