import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_17(): VElement[] {
    return [
        h('p', {},
            'One of the things Menai hasn\'t had up until now is any concept of records or structs.  This has felt a little clunky ' +
            'as it tended to force things into dictionaries or obscure lists.'
        ),
        h('p', {},
            'Yesterday and today this got fixed and now Menai has a ',
            h('code', {}, 'struct'),
            ' concept.  This allows for structures with named fields ' +
            'and a series of functions that can introspect on structures.'
        )
    ];
}

function notesArticle_2026_03_17(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Struct syntax and functions'),
            h('h3', {}, 'Struct declaration'),
            CodeFragment.create({
                code: `(let ((Point (struct (x y)))) ...)`,
                language: 'menai'
            }),
            h('p', {},
                'Declares a new named struct type. The binding name becomes the type name. Valid as the RHS of ',
                h('code', {}, 'let'),
                ', ',
                h('code', {}, 'let*'),
                ', or ',
                h('code', {}, 'letrec'),
                '.'
            ),
            h('h3', {}, 'Construction'),
            CodeFragment.create({
                code: `(Point 1 2)`,
                language: 'menai'
            }),
            h('p', {},
                'Call the struct type as a function with positional field values.'
            ),
            h('h3', {}, 'Field access'),
            CodeFragment.create({
                code: `(struct-get p 'x)`,
                language: 'menai'
            }),
            h('h3', {}, 'Functional update'),
            CodeFragment.create({
                code: `(struct-set p 'x 10)`,
                language: 'menai'
            }),
            h('p', {},
                'Returns a new struct with the named field changed; all other fields are unchanged.'
            ),
            h('h3', {}, 'Equality'),
            CodeFragment.create({
                code: `(struct=? p1 p2)
(struct!=? p1 p2)`,
                language: 'menai'
            }),
            h('p', {},
                'True if same type and all fields equal.'
            ),
            h('h3', {}, 'Type predicates'),
            CodeFragment.create({
                code: `(struct? p)              ; any struct instance
(struct-type? Point p)   ; specific type check`,
                language: 'menai'
            }),
            h('h3', {}, 'Introspection'),
            CodeFragment.create({
                code: `(struct-type-name Point)  ; → "Point"  (takes a type, not an instance)
(struct-fields Point)     ; → ('x 'y)  (takes a type, not an instance)
(struct-type p)           ; → Point    (takes an instance, returns its type)`,
                language: 'menai'
            }),
            h('h3', {}, 'Pattern matching'),
            CodeFragment.create({
                code: `; Predicate form
(match p ((? (struct-type? Point) p) (struct-get p 'x)) (_ 0))

; Destructuring form — field names bound directly
(match p ((Point x y) (integer+ x y)) (_ 0))`,
                language: 'menai'
            }),
            h('h3', {}, 'Nominality'),
            h('p', {},
                'Two struct types with identical fields are still distinct types:'
            ),
            CodeFragment.create({
                code: `(let ((Point (struct (x y)))
      (Vec   (struct (x y)))) ...)`,
                language: 'menai'
            }),
            h('p', {},
                h('code', {}, 'Point'),
                ' and ',
                h('code', {}, 'Vec'),
                ' are different types.'
            ),
            h('h3', {}, 'Hashability'),
            h('p', {},
                'Struct instances are hashable (usable as set members or dict keys) provided all their fields are hashable scalar values.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A comparison'),
            h('p', {},
                'It\'s always nice to try out a new feature.  Claude reviewed various tests and rewrote the Rubik\'s cube solver to use the ',
                h('code', {}, 'struct'),
                ' feature.  The result was approximately an 7.5% performance improvement!'
            ),
            h('p', {},
                'The representation of the structure is clearly a better fit for this problem, and the code is more readable!'
            ),
            h('p', {}, 'Old:'),
            CodeFragment.create({
                code: `✓ Test completed successfully
Result: Solution found! Moves: R' F' D' R U' R'

====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         20414891 function calls (20376286 primitive calls) in 6.781 seconds

   Ordered by: cumulative time
   List reduced from 360 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    6.886    6.886 /Users/dave/github/m6r/humbug/src/menai/menai.py:1161(evaluate)
        1    0.000    0.000    6.886    6.886 /Users/dave/github/m6r/humbug/src/menai/menai.py:1144(_evaluate_raw)
        1    3.339    3.339    6.800    6.800 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:349(execute)
  1915766    0.717    0.000    0.798    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:629(_op_call)
   115138    0.141    0.000    0.303    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3101(_op_dict_set)
   892259    0.253    0.000    0.290    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3221(_op_list_append)
  1915767    0.235    0.000    0.235    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:878(_op_return)
   554868    0.179    0.000    0.202    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3263(_op_list_rest)
   930578    0.200    0.000    0.200    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3310(_op_list_ref)
  1960594    0.172    0.000    0.172    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:522(_op_move)
  1409026    0.169    0.000    0.169    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:554(_op_jump_if_true)
   613723    0.122    0.000    0.146    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3338(_op_list_null_p)
   894969    0.134    0.000    0.134    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3247(_op_list_first)
  2880815    0.122    0.000    0.122    0.000 {built-in method builtins.len}
  1449947    0.112    0.000    0.112    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:485(_op_load_const)
   518076    0.106    0.000    0.106    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1200(_op_integer_neq_p)
   320907    0.093    0.000    0.106    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3208(_op_list_prepend)
   115147    0.063    0.000    0.097    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:315(__init__)
   135625    0.071    0.000    0.094    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:582(_op_make_closure)
   988295    0.088    0.000    0.088    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:366(to_hashable_key)
        1    0.000    0.000    0.086    0.086 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
   182289    0.053    0.000    0.071    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3139(_op_dict_get)
    88278    0.054    0.000    0.058    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:691(_op_tail_call)
   191180    0.040    0.000    0.040    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2502(_op_string_eq_p)
   554861    0.033    0.000    0.033    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:532(_op_jump)
    76105    0.027    0.000    0.031    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1298(_op_integer_add)
   430690    0.030    0.000    0.030    0.000 {method 'append' of 'list' objects}
   136298    0.028    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:603(_op_patch_closure)
    57564    0.021    0.000    0.026    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3295(_op_list_length)
    58202    0.023    0.000    0.025    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3234(_op_list_reverse)
      2/1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
   2587/1    0.001    0.000    0.023    0.023 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   ...`,
                language: 'text'
            }),
            h('p', {}, 'New:'),
            CodeFragment.create({
                code: `Result: Solution found! Moves: R' F' D' R U' R'

====================================================================================================
PROFILING RESULTS (Top 80 functions, sorted by cumulative)
====================================================================================================
         18173868 function calls (18137374 primitive calls) in 6.258 seconds

   Ordered by: cumulative time
   List reduced from 376 to 80 due to restriction <80>

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    6.365    6.365 /Users/dave/github/m6r/humbug/src/menai/menai.py:1161(evaluate)
        1    0.000    0.000    6.365    6.365 /Users/dave/github/m6r/humbug/src/menai/menai.py:1144(_evaluate_raw)
        1    3.203    3.203    6.281    6.281 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:349(execute)
  1723893    0.648    0.000    0.722    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:629(_op_call)
   873083    0.250    0.000    0.286    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3221(_op_list_append)
  1723894    0.213    0.000    0.213    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:878(_op_return)
   545280    0.178    0.000    0.202    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3263(_op_list_rest)
   930578    0.195    0.000    0.195    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3310(_op_list_ref)
  1409026    0.169    0.000    0.169    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:554(_op_jump_if_true)
  1830089    0.165    0.000    0.165    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:522(_op_move)
   613723    0.123    0.000    0.147    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3338(_op_list_null_p)
   875786    0.132    0.000    0.132    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3247(_op_list_first)
  2686868    0.114    0.000    0.114    0.000 {built-in method builtins.len}
   320907    0.094    0.000    0.107    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3208(_op_list_prepend)
   518076    0.106    0.000    0.106    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1200(_op_integer_neq_p)
  1382777    0.105    0.000    0.105    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:485(_op_load_const)
   135624    0.073    0.000    0.096    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:582(_op_make_closure)
        1    0.000    0.000    0.084    0.084 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:95(compile)
   201468    0.060    0.000    0.075    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3779(_op_struct_get)
    88278    0.053    0.000    0.057    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:691(_op_tail_call)
    28776    0.034    0.000    0.048    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3721(_op_make_struct)
   191180    0.040    0.000    0.040    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2502(_op_string_eq_p)
   554861    0.033    0.000    0.033    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:532(_op_jump)
    76105    0.027    0.000    0.031    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:1298(_op_integer_add)
   136285    0.028    0.000    0.028    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:603(_op_patch_closure)
    57564    0.021    0.000    0.027    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3295(_op_list_length)
    58202    0.023    0.000    0.025    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3234(_op_list_reverse)
      2/1    0.000    0.000    0.025    0.025 /Users/dave/github/m6r/humbug/src/menai/menai_compiler.py:69(compile_to_resolved_ast)
   2387/1    0.001    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:89(resolve)
   3125/4    0.000    0.000    0.024    0.006 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:117(<genexpr>)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/menai/menai_ast_module_resolver.py:120(_resolve_import)
        1    0.000    0.000    0.024    0.024 /Users/dave/github/m6r/humbug/src/menai/menai.py:1294(load_module)
        1    0.000    0.000    0.016    0.016 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:178(build)
     33/1    0.002    0.000    0.015    0.015 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:205(_emit_vcode)
   201468    0.015    0.000    0.015    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_value.py:487(field_index)
    32/28    0.000    0.000    0.015    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:421(_emit_make_closure)
    32/28    0.000    0.000    0.015    0.001 /Users/dave/github/m6r/humbug/src/menai/menai_bytecode_builder.py:450(_emit_lambda)
    22968    0.011    0.000    0.014    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:2758(_op_string_ref)
   163739    0.013    0.000    0.013    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:471(_op_load_empty_list)
   163080    0.012    0.000    0.012    0.000 /Users/dave/github/m6r/humbug/src/menai/menai_vm.py:3741(<genexpr>)
   ...`,
                language: 'text'
            })
        )
    ];
}

export const notesPost_2026_03_17 = new NotesPost(
    '2026-03-17: Struct-uring Menai',
    '2026-03-17',
    '/notes/2026-03-17',
    'Menai gains a struct concept with named fields, introspection, pattern matching, and hashability, delivering a ~7.5% performance improvement in the Rubik\'s cube solver.',
    null,
    null,
    notesOpening_2026_03_17,
    notesArticle_2026_03_17,
    null
);
