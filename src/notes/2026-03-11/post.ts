import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_11(): VElement[] {
    return [
        h('p', {},
            'Sometimes it\'s good to tidy up small but annoying bugs.  Once they\'re out of the way then it\'s easier to concentrate ' +
            'on more interesting things.'
        )
    ];
}

function notesArticle_2026_03_11(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Tidy-ups'),
            h('p', {},
                'Recently I\'d noticed Humbug was occasionally getting diffs wrong.  Usually these were fuzzy matches (with the wrong ' +
                'line numbers), but sometimes the fuzziness was in selecting completely the wrong context.  Now diffs need to be precise, ' +
                'but can be on the wrong line numbers.  Sometimes the +/- 50 line range won\'t match for a valid patch, so I modified the ' +
                'diff applying logic so it will provide a more helpful method suggesting maybe the AI needs to check its line numbers.'
            ),
            h('p', {},
                'Another minor irritant was where a conversation tab ended up trying to open a tab that was already open, but that was in the ' +
                'same column as the conversation.  When this happens now, the column manager moves the tool-use tab to a different column.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Playing with pipelines'),
            h('p', {},
                'I figured it would be interesting to do some more heavyweight testing with the Menai-implemented JSON parser from yesterday.'
            ),
            h('p', {},
                'I had Claude build me a new test pipeline ',
                h('code', {}, 'json-parse-test'),
                '.'
            ),
            h('p', {},
                'Tested this with a conversation file (the "claude 3.7 thinking" one in the git repo) and it died.  It turned out the parser ' +
                'couldn\'t handle ',
                h('code', {}, '\\uxxxx'),
                ' escaping correctly.  This in turn led to a realization that Menai\'s standard library didn\'t have ' +
                'any way to get the ordinal of a character or to construct a character from an ordinal.'
            ),
            h('p', {},
                'It took 10 minutes to argue about what to name these, and about 10 minutes to implement ',
                h('code', {}, 'integer-codepoint->string'),
                ' and the matching ',
                h('code', {}, 'string->integer-codepoint'),
                ' functions that resolved it.  Claude one-shotted the necessary fix.'
            ),
            h('p', {},
                'This reveals some interesting runtime characteristics:'
            ),
            CodeFragment.create({
                code: `   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    32670    0.193    0.000    0.197    0.000 menai_vm.py:2842(_op_list_prepend)
    990/2    0.144    0.000    0.662    0.331 menai_vm.py:382(_execute_frame)
    68694    0.127    0.000    0.127    0.000 menai_vm.py:567(_op_move)
   931284    0.042    0.000    0.046    0.000 {built-in method builtins.isinstance}
    81450    0.031    0.000    0.041    0.000 menai_vm.py:2214(_op_string_eq_p)
    36098    0.019    0.000    0.026    0.000 menai_vm.py:2440(_op_string_ref)
   124247    0.017    0.000    0.021    0.000 menai_vm.py:613(_op_jump_if_true)
    39919    0.016    0.000    0.020    0.000 menai_vm.py:1165(_op_integer_add)
    36991    0.015    0.000    0.021    0.000 menai_vm.py:2304(_op_string_length)
    36098    0.014    0.000    0.019    0.000 menai_vm.py:1139(_op_integer_gte_p)
   248975    0.013    0.000    0.013    0.000 {built-in method builtins.len}
   124484    0.011    0.000    0.011    0.000 menai_vm.py:512(_op_load_const)
   158683    0.010    0.000    0.010    0.000 {method 'append' of 'list' objects}
        4    0.010    0.003    0.047    0.012 menai_lexer.py:62(lex)
      304    0.008    0.000    0.013    0.000 menai_lexer.py:474(_read_string)
     3608    0.007    0.000    0.012    0.000 menai_lexer.py:379(_handle_symbol)
   2067/4    0.005    0.000    0.024    0.006 menai_ast_builder.py:439(_parse_list)
   6510/2    0.005    0.000    0.022    0.011 menai_ast_module_resolver.py:89(resolve)
      153    0.005    0.000    0.008    0.000 menai_vm.py:3065(_op_list_to_string)
     8966    0.004    0.000    0.006    0.000 menai_ast_builder.py:769(_advance)
      248    0.004    0.000    0.007    0.000 menai_vm_bytecode_validator.py:578(_validate_initialization)
      248    0.004    0.000    0.013    0.000 menai_vcode_allocator.py:81(allocate_slots)
      304    0.003    0.000    0.017    0.000 menai_lexer.py:207(_handle_string)
   6129/4    0.003    0.000    0.024    0.006 menai_ast_builder.py:149(_parse_expression)
    67195    0.003    0.000    0.003    0.000 typing.py:2371(cast)
      260    0.003    0.000    0.009    0.000 menai_vm.py:2747(_op_dict_set)
    248/2    0.003    0.000    0.012    0.006 menai_vcode_builder.py:118(_lower_function)
     5992    0.003    0.000    0.005    0.000 menai_vcode_allocator.py:199(_defs_uses)
 6082/243    0.003    0.000    0.005    0.000 menai_ast_dependency_analyzer.py:79(_scan_refs)
     7341    0.003    0.000    0.004    0.000 menai_vm_bytecode_validator.py:797(_get_successors)
    248/2    0.003    0.000    0.026    0.013 menai_bytecode_builder.py:197(_emit_vcode)
 2253/518    0.003    0.000    0.012    0.000 menai_vcode_builder.py:301(_lower_instr)
    27369    0.003    0.000    0.004    0.000 menai_value.py:370(to_hashable_key)
   4429/2    0.003    0.000    0.006    0.003 menai_ir_optimizer.py:66(_opt)
     1691    0.002    0.000    0.002    0.000 menai_vcode_allocator.py:116(_free_slot)
   4514/2    0.002    0.000    0.015    0.008 menai_ast_desugarer.py:169(desugar)
    35799    0.002    0.000    0.002    0.000 menai_vm.py:591(_op_jump)
    19931    0.002    0.000    0.004    0.000 <frozen abc>:117(__instancecheck__)
   4546/2    0.002    0.000    0.005    0.002 menai_ir_use_counter.py:123(_walk)
   4491/2    0.002    0.000    0.006    0.003 menai_ast_constant_folder.py:205(optimize)
   3608/2    0.002    0.000    0.011    0.005 menai_cfg_builder.py:164(_build_expr)
    26955    0.002    0.000    0.002    0.000 menai_lexer.py:158(_handle_whitespace)
      248    0.002    0.000    0.005    0.000 menai_vm_bytecode_validator.py:512(_validate_stack_depth)
     3266    0.002    0.000    0.002    0.000 menai_bytecode_builder.py:86(emit)
    19931    0.002    0.000    0.002    0.000 {built-in method _abc._abc_instancecheck}
    22807    0.002    0.000    0.002    0.000 {method 'get' of 'dict' objects}
 1001/552    0.002    0.000    0.005    0.000 menai_ir_builder.py:448(_analyze_function_call)
      289    0.002    0.000    0.004    0.000 menai_value.py:319(__init__)
    37336    0.002    0.000    0.002    0.000 {built-in method builtins.ord}
      248    0.002    0.000    0.003    0.000 menai_vm_bytecode_validator.py:828(_build_cfg)
11407/11406    0.002    0.000    0.002    0.000 typing.py:426(inner)
    11995    0.002    0.000    0.002    0.000 menai_ast.py:242(is_empty)
    24382    0.002    0.000    0.002    0.000 {method 'isalnum' of 'str' objects}
      319    0.001    0.000    0.002    0.000 menai_vcode_peephole.py:120(_eliminate_jump_over_jump)`,
                language: 'text'
            }),
            h('p', {},
                'The test is dominated by runtime cost (about 20% goes to the compiler), and our Python VM shows just how slow it really ' +
                'is.  ',
                h('code', {}, 'LIST-PREPEND'),
                ' really sucks, but the good news is that one should be easy to fix with a little lifetime analysis.'
            )
        )
    ];
}

export const notesPost_2026_03_11 = new NotesPost(
    '2026-03-11: Tidying up and playing with pipelines',
    '2026-03-11',
    '/notes/2026-03-11',
    'Fixing fuzzy diff bugs and conversation tab management in Humbug, then testing the Menai JSON parser with a real pipeline, adding codepoint functions, and profiling the runtime.',
    null,
    null,
    notesOpening_2026_03_11,
    notesArticle_2026_03_11,
    null
);
