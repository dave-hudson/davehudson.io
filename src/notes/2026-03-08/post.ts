import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_08(): VElement[] {
    return [
        h('p', {},
            'Elon Musk may not be right about AIs just generating raw assembler code, but I think ' +
            'he may not be far from the right track!'
        )
    ];
}

function notesArticle_2026_03_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Why do I think Elon might have a point?'),
            h('p', {},
                'Elon Musk\'s recent tweet has had quite a lot of ridicule from compiler developers and AI ' +
                'naysayers.  The problem is it turns out AIs are really quite good at generating and ' +
                'analyzing assembler code.'
            ),
            h('p', {},
                'The bigger problem is that having AIs generate assembler is silly in the same way it is ' +
                'to have humans do it.  The reason we use high level languages is because we want to work ' +
                'with higher levels of abstraction.  There\'s only so much complexity we (or AIs) ' +
                'can handle at the same time.'
            ),
            h('p', {},
                'So why do I think AIs can write good assembler?  While I\'ve been working with the Menai ' +
                'compiler I\'ve gone through a stack machine VM and now to a virtual register based VM. ' +
                'Not only did Claude understand both, but was able to debug the compiler based on reading ' +
                'both.  It also helped me incrementally transition through a Frankenstein\'s monster VM ' +
                'in which some opcodes were stack based and some were register based.'
            ),
            h('p', {},
                'Its expertise in all these matters came entirely from reading the Menai compiler code. ' +
                'It\'s not "oh it\'s been pre-trained", it\'s the AI reading and understanding very fast. ' +
                'Impressively, this is not a "thinking" version of Claude - this is dumb Claude doing ' +
                'all this!'
            ),
            h('p', {},
                'So in the last 6 weeks Claude has helped me go through many different iterations of a ' +
                'high level language and then do very deep low-level optimizations.  It has done the ' +
                'heavy lifting in building what\'s now a very good and very fast optimizing compiler, but ' +
                'importantly it jumps in and out of every form of representation the compiler can produce. ' +
                'It writes off-the-cuff tests to explore AST, IR, CFG, and bytecode representations, ' +
                'using any of them to help it shape the compiler logic.'
            ),
            h('p', {},
                'This is where I think Elon is sort of right.  The AIs won\'t write assembler, but they ' +
                'will write the tools that will generate extremely high quality machine code.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Reviewing performance changes'),
            h('p', {},
                'It\'s interesting to revisit tests we\'ve seen before.  With that, I now present the ' +
                'profiler data for the Rubik\'s cube solver (it\'s an awful solver, but it\'s an interesting ' +
                'test):'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         4614251 function calls (4368849 primitive calls) in 0.964 seconds

   Ordered by: cumulative time
   List reduced from 374 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.979    0.979 /Users/dave/github/m6r/humbug/src/menai/menai.py:1060(evaluate)
        1    0.000    0.000    0.979    0.979 /Users/dave/github/m6r/humbug/src/menai/menai.py:1043(_evaluate_raw)
        1    0.000    0.000    0.862    0.862 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:341(execute)
  89116/1    0.270    0.000    0.846    0.846 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:380(_execute_frame)
  89115/4    0.079    0.000    0.846    0.212 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:683(_op_call)
        1    0.000    0.000    0.116    0.116 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:103(compile)
   328491    0.076    0.000    0.113    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:547(_op_push)
   118858    0.042    0.000    0.058    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:573(_op_enter)
   981715    0.049    0.000    0.052    0.000 {built-in method builtins.isinstance}
    89116    0.029    0.000    0.045    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:49(__init__)
    89116    0.024    0.000    0.034    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:804(_op_return)
   468084    0.034    0.000    0.034    0.000 {method 'append' of 'list' objects}
   424304    0.030    0.000    0.030    0.000 {method 'pop' of 'list' objects}
      2/1    0.000    0.000    0.027    0.027 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:77(compile_to_resolved_ast)
   2585/1    0.001    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3395/4    0.000    0.000    0.026    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai.py:1193(load_module)
    41405    0.020    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2756(_op_list_append)
   601001    0.025    0.000    0.025    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:2371(cast)
    43125    0.016    0.000    0.023    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2840(_op_list_ref)
    28815    0.013    0.000    0.022    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2866(_op_list_null_p)
     5350    0.003    0.000    0.022    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2674(_op_dict_set)
        1    0.000    0.000    0.020    0.020 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:184(build)
     35/1    0.000    0.000    0.020    0.020 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:207(_emit_function_body)
    170/1    0.000    0.000    0.020    0.020 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:267(_emit_block)
 1643/117    0.001    0.000    0.020    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:286(_emit_instr)
    34/30    0.000    0.000    0.019    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:475(_emit_make_closure)
    34/30    0.000    0.000    0.019    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:526(_generate_lambda_code_object)
     5350    0.007    0.000    0.018    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:441(set)
        2    0.000    0.000    0.017    0.009 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:48(optimize)
    26075    0.007    0.000    0.017    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2795(_op_list_rest)
        1    0.000    0.000    0.016    0.016 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:907(validate_bytecode)
     35/1    0.000    0.000    0.016    0.016 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:312(validate)
    38535    0.011    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2779(_op_list_first)
        6    0.000    0.000    0.015    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:82(count)
  14465/6    0.007    0.000    0.015    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:123(_walk)
    305/6    0.000    0.000    0.015    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:227(_walk_let)
  204/180    0.000    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:192(_walk_lambda)
    96695    0.014    0.000    0.014    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:426(inner)
    24030    0.010    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1077(_op_integer_neq_p)
        2    0.000    0.000    0.013    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:50(optimize)
    65127    0.010    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:611(_op_jump_if_true)
       35    0.003    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_liveness.py:208(allocate_slots)
   8939/2    0.007    0.000    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:54(_inline)
    166/2    0.000    0.000    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:109(_inline_let)
    68/60    0.000    0.000    0.011    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:161(_inline_lambda)
        2    0.000    0.000    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:50(optimize)
        2    0.003    0.001    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_lexer.py:62(lex)
   176524    0.010    0.000    0.010    0.000 {built-in method builtins.len}
        2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:67(build)
    11566    0.005    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2744(_op_list_prepend)
   2514/2    0.001    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:118(_parse_expression)
    741/2    0.002    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:396(_parse_list)
     15/2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:433(_parse_let_with_tracking)
     15/6    0.000    0.000    0.009    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:500(_parse_let_bindings)
    58/39    0.000    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:546(_parse_single_binding)
    26075    0.007    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:318(rest)
    93223    0.008    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:304(_check_and_pack_args)
    45948    0.006    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:518(_to_hashable_key)
     8458    0.004    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2690(_op_dict_get)
        1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:117(build)
   2192/1    0.001    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:135(_analyze_expression)
    742/1    0.001    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:167(_analyze_list)
     69/1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:293(_analyze_let)
    34/30    0.000    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:384(_analyze_lambda)
   4838/2    0.005    0.000    0.007    0.004 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:56(_prop)
    113/2    0.000    0.000    0.007    0.004 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:111(_prop_let)
   2435/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:169(desugar)
     13/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:367(_desugar_let)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:395(_desugar_letrec)
    68/60    0.000    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:163(_prop_lambda)
       35    0.004    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:580(_validate_initialization)
     6250    0.003    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:375(__init__)
  1275/16    0.001    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:181(_substitute)
     26/8    0.000    0.000    0.006    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:257(_substitute_let)
    28815    0.004    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:307(is_empty)
    66380    0.006    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:510(_op_load_const)
   4653/2    0.003    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:57(_opt)
     88/2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:99(_opt_let)`
            }),
            h('p', {},
                'On 2026-02-28 we\'d got the runtime for this test down to 9.6 seconds.  Now it\'s 0.96 seconds.  Yes, that is 10x faster!'
            ),
            h('p', {},
                'Same language, same initial codebase.  Pretty impressive!'
            )
        ),
        h('section', {},
            h('h2', {}, 'The art of throwing things away'),
            h('p', {},
                'Over the last week, my current token-fueled rampage through compiler land has ended up with me implementing ' +
                'a static single assignment control flow graph analysis.  This made it much easier to go to a register-based ' +
                'VM and to collapse a lot of code paths.'
            ),
            h('p', {},
                'The main exercise was all done in a single day.  Let\'s put that in perspective - Claude\'s initial estimate was ' +
                'this was a couple of months of work.  We then reworked the entire bytecode design and got something working.'
            ),
            h('p', {},
                'Along the way we spotted lots of inefficient code generation and wrote a series of CFG passes that resolved ' +
                'the problems.  This was all absolutely astonishing.'
            ),
            h('p', {},
                'Here, however, is where things get really interesting.  Over dinner last night (I was sitting in a bar!) I had ' +
                'Claude write a lifetime analysis pass that could optimally allocate registers.  That took about 3 hours and ' +
                'generated wonderful code.  This morning I looked at those earlier passes and asked if they were really doing ' +
                'anything useful anymore.'
            ),
            h('p', {},
                'In 2 hours we had removed 3 passes.  Even more bizarrely, Claude decided to deep dive the passes that were ' +
                'generating anything that those passes might have matched and fixed all the root causes.'
            ),
            h('p', {},
                'That last part should really give people pause.  To make that work Claude did things like patching the ' +
                'testsuite so it could see which tests triggered any part of those passes.  It extracted the tests into ' +
                'custom scripts that dumped out the CFG and the bytecode, looking for what had triggered the phi nodes ' +
                'that were being matched in the passes.  Finally it fixed the root cause issues so the unnecessary nodes ' +
                'were never emitted in the first place.'
            ),
            h('p', {},
                'As it went along, it also removed the now-dead passes and refactored.  This is not the Claude I started ' +
                'using in late 2024.  This is screaming expert territory, except about 100x faster than any human.'
            ),
            h('p', {},
                'Anyway, with this, the Menai compiler is back to 14 passes, and still insanely fast even though it\'s ' +
                'written in Python!'
            )
        ),
        h('section', {},
            h('h2', {}, 'The power of using AI for optimizing'),
            h('p', {},
                'While I was reading some disassembler output I noticed this:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`   4018     Function: valid-constraints(1 param)
   4019     Instructions: 7
   4020     Locals: 2
   4021     Constants: 0
   4022     Code Objects: 0
   4023     ======================================================================
   4024     Instructions:
   4025     ----------------------------------------------------------------------
   4026          0: ENTER 1                             ; Store 1 params into locals: 'c'
   4027          1: r1 = STRING_P r0
   4028          2: JUMP_IF_TRUE r1, @5
   4029
   4030          3: r1 = LOAD_FALSE                     ; local[0] = #f
   4031          4: JUMP @6
   4032
   4033     ►    5: r1 = LOAD_TRUE                      ; local[0] = #t
   4034
   4035     ►    6: RETURN r1                           ; Return value from r1`
            }),
            h('p', {},
                'A quick look revealed this came from the following expression:'
            ),
            CodeFragment.create({
                language: 'menai',
                code: `(lambda (c) (match c ((? string? s) #t) (_ #f)))`
            }),
            h('p', {},
                'Having read a lot of assembler over the years, I recognized this could be much simpler.  To be fair, however, ' +
                'the compiler had already done a pretty respectable job.  This expression is actually pretty silly because ' +
                'it\'s matching ',
                h('code', {}, 'c'),
                ' to see if it\'s a string, and if it is then returns ',
                h('code', {}, '#t'),
                ', otherwise the wildcard path causes it to return ',
                h('code', {}, '#f'),
                '.'
            ),
            h('p', {},
                'Now, I know from a few days ago we\'d done some work to handle cases like this but I couldn\'t remember where ' +
                'that was.'
            ),
            h('p', {},
                'Claude was not deterred.  It scanned all the relevant parts of the compiler to track this down to a missed ' +
                'optimization arising from some wrapping inside the IR.  This is conversation ',
                h('code', {}, '2026-03-08-11-12-44-007.conv'),
                '.'
            ),
            h('p', {},
                'Finding and fixing this took 15 mins, some of which was down to me not being around to approve a tool use. ' +
                'That would have taken hours to find by hand!  That 15 minutes also included writing a series of new unit ' +
                'tests to check the expected behaviour.'
            ),
            h('p', {},
                'Here\'s what the optimized code now looks like:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`   4018     Function: valid-constraints(1 param)
   4019     Instructions: 3
   4020     Locals: 2
   4021     Constants: 0
   4022     Code Objects: 0
   4023     ======================================================================
   4024     Instructions:
   4025     ----------------------------------------------------------------------
   4026          0: ENTER 1                             ; Store 1 params into locals: 'c'
   4027          1: r1 = STRING_P r0
   4028          2: RETURN r1                           ; Return value from r1
   4029     ----------------------------------------------------------------------`
            }),
            h('p', {},
                'There is almost no way I\'d have bothered chasing this down on my own.  Suddenly, however, that\'s no longer ' +
                'the issue!'
            )
        ),
        h('section', {},
            h('h2', {}, 'And then it\'s time for another lowering'),
            h('p', {},
                'Building a compiler is a process of successively lowering the code.  The key thing is that the more semantic ' +
                'information we have then the more powerful the structural optimizations we can make, but as we lower things ' +
                'we open up all sorts of other possibilities.'
            ),
            h('p', {},
                'One interesting realization was that the CFG is very powerful, but is actually quite limiting in some ways.  ' +
                'The phi node structure is quite unfriendly to doing some types of jump optimizations, and we really do want ' +
                'those.  What had also happened over the last week is the bytecode generator had ended up getting progressively ' +
                'more complex.  This was a pretty strong indication that there was another intermediate structuring that was missing.'
            ),
            h('p', {},
                'With that we slotted in a "vcode" layer that lowers the phi nodes away and really represents the underlying VM.  ' +
                'Even without aggressively tuning anything, it\'s already apparent that this unlocked a new approach to simple ' +
                'tail recursion!'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`   1101        0: ENTER 2                             ; Store 2 params into locals: 'date-str', 'calendar'

   1103   ►    1: PUSH r0                             ; Push param 'date-str' onto call stack
   1104        2: PUSH r3                             ; Push captured 'add-one-day' onto call stack
   1105        3: r5 = CALL 1                         ; Call function with 1 arg, result -> r5
   1106        4: PUSH r5                             ; Push local[0] onto call stack
   1107        5: PUSH r1                             ; Push param 'calendar' onto call stack
   1108        6: PUSH r4                             ; Push captured 'is-working-day?' onto call stack
   1109        7: r6 = CALL 2                         ; Call function with 2 args, result -> r6
   1110        8: JUMP_IF_TRUE r6, @11

   1112        9: r0 = MOVE r5
   1113       10: JUMP @1

   1115   ►   11: RETURN r5                           ; Return value from r5`
            }),
            h('p', {},
                'Previously we\'d have pushed ',
                h('code', {}, 'r0'),
                ' and ',
                h('code', {}, 'r1'),
                ' back onto the stack at around instruction 9, and would then have jumped to instruction ' +
                '0.  Now we\'re not modifying ',
                h('code', {}, 'r1'),
                ' because it never varies, we\'re doing a register move for ',
                h('code', {}, 'r0'),
                ', but we\'re now jumping to instruction 1.  This reduces 2 ',
                h('code', {}, 'PUSH'),
                ' and 1 ',
                h('code', {}, 'ENTER'),
                ' opcode into a single ',
                h('code', {}, 'MOVE'),
                '!'
            ),
            h('p', {},
                'This really shows up in our standard Rubik\'s cube test:'
            ),
            CodeFragment.create({
                language: 'text',
                code:
`====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         4186180 function calls (3941482 primitive calls) in 0.890 seconds

   Ordered by: cumulative time
   List reduced from 370 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.905    0.905 /Users/dave/github/m6r/humbug/src/menai/menai.py:1060(evaluate)
        1    0.000    0.000    0.905    0.905 /Users/dave/github/m6r/humbug/src/menai/menai.py:1043(_evaluate_raw)
        1    0.000    0.000    0.781    0.781 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:341(execute)
  89116/1    0.261    0.000    0.765    0.765 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:380(_execute_frame)
  89115/4    0.080    0.000    0.765    0.191 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:683(_op_call)
        1    0.000    0.000    0.124    0.124 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:103(compile)
   250479    0.059    0.000    0.087    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:547(_op_push)
  1000030    0.050    0.000    0.052    0.000 {built-in method builtins.isinstance}
    89116    0.028    0.000    0.045    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:49(__init__)
    93222    0.029    0.000    0.040    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:573(_op_enter)
    89116    0.024    0.000    0.034    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:804(_op_return)
   393217    0.028    0.000    0.028    0.000 {method 'append' of 'list' objects}
      2/1    0.000    0.000    0.027    0.027 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:77(compile_to_resolved_ast)
   2585/1    0.001    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3395/4    0.000    0.000    0.026    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.026    0.026 /Users/dave/github/m6r/humbug/src/menai/menai.py:1193(load_module)
    41405    0.019    0.000    0.025    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2814(_op_list_append)
   346278    0.025    0.000    0.025    0.000 {method 'pop' of 'list' objects}
        1    0.000    0.000    0.023    0.023 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:169(build)
     5350    0.010    0.000    0.022    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2707(_op_dict_set)
   525669    0.021    0.000    0.021    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:2371(cast)
        2    0.000    0.000    0.018    0.009 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:48(optimize)
    28815    0.012    0.000    0.016    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2918(_op_list_null_p)
        6    0.000    0.000    0.016    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:82(count)
  14465/6    0.008    0.000    0.016    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:123(_walk)
    305/6    0.000    0.000    0.016    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:227(_walk_let)
        1    0.000    0.000    0.016    0.016 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:907(validate_bytecode)
     35/1    0.000    0.000    0.016    0.016 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:312(validate)
    43125    0.012    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2892(_op_list_ref)
  204/180    0.000    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_use_counter.py:192(_walk_lambda)
     35/1    0.001    0.000    0.015    0.015 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:196(_emit_vcode)
    34/30    0.000    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:360(_emit_make_closure)
    96765    0.015    0.000    0.015    0.000 /opt/homebrew/Cellar/python@3.13/3.13.5/Frameworks/Python.framework/Versions/3.13/lib/python3.13/typing.py:426(inner)
    34/30    0.000    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:389(_emit_lambda)
    24030    0.010    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1077(_op_integer_neq_p)
    26075    0.010    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2851(_op_list_rest)
    65127    0.010    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:611(_op_jump_if_true)
   8939/2    0.007    0.000    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:54(_inline)
    166/2    0.000    0.000    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:109(_inline_let)
        2    0.000    0.000    0.012    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:50(optimize)
    68/60    0.000    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:161(_inline_lambda)
        2    0.000    0.000    0.011    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:50(optimize)
        2    0.003    0.001    0.011    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_lexer.py:62(lex)
    140/4    0.000    0.000    0.010    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:16(optimize)
   178444    0.010    0.000    0.010    0.000 {built-in method builtins.len}
    140/4    0.001    0.000    0.010    0.002 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_optimization_pass.py:53(_optimize_nested)
        2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:67(build)
   2514/2    0.001    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:118(_parse_expression)
    741/2    0.002    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:396(_parse_list)
     15/2    0.000    0.000    0.009    0.005 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:433(_parse_let_with_tracking)
     15/6    0.000    0.000    0.009    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:500(_parse_let_bindings)
    58/39    0.000    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ast_builder.py:546(_parse_single_binding)
    38535    0.007    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2837(_op_list_first)
    93223    0.009    0.000    0.009    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:304(_check_and_pack_args)
    45948    0.006    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:370(to_hashable_key)
        1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:117(build)
   2192/1    0.001    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:135(_analyze_expression)
    742/1    0.001    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:167(_analyze_list)
     69/1    0.000    0.000    0.008    0.008 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:293(_analyze_let)
    34/30    0.000    0.000    0.008    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_builder.py:384(_analyze_lambda)
   2390/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:169(desugar)
     13/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:367(_desugar_let)
      2/1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_ast_desugarer.py:395(_desugar_letrec)
    11566    0.006    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2802(_op_list_prepend)
       35    0.004    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm_bytecode_validator.py:580(_validate_initialization)
       70    0.000    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_cfg_simplify_blocks.py:67(_optimize_function)
        1    0.000    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:103(build)
     35/1    0.001    0.000    0.007    0.007 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:115(_lower_function)
     6250    0.004    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:319(__init__)
 1632/117    0.001    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_builder.py:274(_lower_instr)
       35    0.002    0.000    0.007    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vcode_allocator.py:80(allocate_slots)
   4838/2    0.004    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:56(_prop)
    113/2    0.000    0.000    0.007    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:111(_prop_let)
  1275/16    0.001    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:181(_substitute)
     26/8    0.000    0.000    0.006    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_ir_inline_once.py:257(_substitute_let)
     8458    0.004    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2743(_op_dict_get)
    68/60    0.000    0.000    0.006    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_ir_copy_propagator.py:163(_prop_lambda)
   4653/2    0.003    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:57(_opt)
     88/2    0.000    0.000    0.006    0.003 /Users/dave/github/m6r/humbug/src/menai/menai_ir_optimizer.py:99(_opt_let)`
            }),
            h('p', {},
                'That\'s taking 92.3% of the time from earlier today!'
            )
        )
    ];
}

export const notesPost_2026_03_08 = new NotesPost(
    '2026-03-08: More adventures in compiler land',
    '2026-03-08',
    '/notes/2026-03-08',
    'More Menai compiler adventures: 10x performance gains, SSA CFG analysis, a register-based VM, vcode lowering, and AI-assisted optimization.',
    null,
    null,
    notesOpening_2026_03_08,
    notesArticle_2026_03_08,
    null
);
