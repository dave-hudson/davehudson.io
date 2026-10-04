import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_10_01(): VElement[] {
    return [
        h('p', {},
            'Menai v0.6 has a huge amount of new and updated functionality.  Big things are changes ' +
            'to the compiler and the evolution of what will become a very thorough standard library.'
        )
    ];
}

function notesArticle_2026_10_01(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai v0.6'),
            h('p', {},
                'Menai v0.6 touches on a lot of important themes:'
            ),
            h('ul', {},
                h('li', {}, 'Adding a standard library'),
                h('li', {},
                    'Reworking the compiler passes to be pure functions and updating the pass manager ' +
                    'to use them more effectively'
                ),
                h('li', {}, 'Significantly improved code generation'),
                h('li', {}, 'Significantly improved compilation speed'),
                h('li', {},
                    'Cryptographic hashing and CRC32 capabilities for ', h('code', {}, 'bytes'), ' objects'
                ),
                h('li', {}, 'A tracing profiler')
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'Added ', h('code', {}, 'menai-eval'), ', a tool that compiles and evaluates a ',
                    h('code', {}, '.menai'), ' file (or an expression from stdin) and prints the result.  ' +
                    'It can optionally profile the compiler with ', h('code', {}, '--cprofile'), ' and/or ' +
                    'VM execution opcodes with ', h('code', {}, '--opcodes'), ', and both may be combined.'
                ),
                h('li', {},
                    'Removed ', h('code', {}, 'menai-profile'), ' as ', h('code', {}, 'menai-eval'),
                    ' does everything it did and more.'
                ),
                h('li', {},
                    'Added an approach for implementing negative tests in ', h('code', {}, 'menai-test'), '.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'bmp-decode'), ' and ', h('code', {}, 'bmp-encode'),
                    ' modules to read and write BMP image files.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'deflate-compress'), ' and ',
                    h('code', {}, 'deflate-decompress'), ' modules.  These compress and decompress using ' +
                    'DEFLATE (RFC 1951) compression.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'zip-create'), ', ', h('code', {}, 'zip-entries'), ' and ',
                    h('code', {}, 'zip-extract'), ' modules.  These write/read a ZIP archive\'s central ' +
                    'directory and can process stored and deflated entries.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'zlib-compress'), ' and ', h('code', {}, 'zlib-decompress'),
                    ' modules.  These compress and decompress a zlib stream (RFC 1950).'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'png-decode'), ' and ', h('code', {}, 'png-encode'),
                    ' modules.  These read/write non-interlaced 8-bit PNG image files.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'json-encode'), ' module to serialize JSON and renamed ',
                    h('code', {}, 'json_parser'), ' to ', h('code', {}, 'json-decode'), '.'
                ),
                h('li', {},
                    'Added a ', h('code', {}, 'bytes-crc32'), ' primitive.  This computes the ' +
                    'CRC-32/ISO-HDLC checksum of a bytes value as an integer.'
                ),
                h('li', {},
                    'Added floating-point bytes primitives: ', h('code', {}, 'bytes-read-f32-le'),
                    '/', h('code', {}, '-be'), ', ', h('code', {}, 'bytes-read-f64-le'), '/',
                    h('code', {}, '-be'), ', ', h('code', {}, 'bytes-append-f32-le'), '/',
                    h('code', {}, '-be'), ', ', h('code', {}, 'bytes-append-f64-le'), '/',
                    h('code', {}, '-be'), ', ', h('code', {}, 'bytes-write-f32-le'), '/',
                    h('code', {}, '-be'), ', and ', h('code', {}, 'bytes-write-f64-le'), '/',
                    h('code', {}, '-be'), '.  These mirror the multi-byte integer operations, encoding ' +
                    'and decoding IEEE-754 values.'
                ),
                h('li', {},
                    'Reworked the type propagation optimizations.  Removed the old implementation and ' +
                    'added a new one based on interprocedural analysis.  This allows return types to be ' +
                    'back propagated to callers and to remove type guards that are provably not necessary.'
                ),
                h('li', {},
                    'Replaced the concept of the "prelude" functions being special global symbols and ' +
                    'instead made them a letrec around the user\'s program.  This removes a number of ' +
                    'idiosyncracies in the internal design.'
                ),
                h('li', {},
                    'Improved the slot allocator so it eliminates more redundant ', h('code', {}, 'MOVE'),
                    ' opcodes in self-recursive loops.'
                ),
                h('li', {},
                    'Added a loop rotation CFG pass.  A self-recursive loop with its test at the top ' +
                    'is rotated so the test is evaluated at the bottom.'
                ),
                h('li', {},
                    'Improved the constant type annotations in the disassembler.'
                ),
                h('li', {},
                    'Added cryptographic hashing of ', h('code', {}, 'bytes'), ' values: ',
                    h('code', {}, 'bytes-hash-sha2-256'), ', ', h('code', {}, 'bytes-hash-sha2-512'),
                    ', ', h('code', {}, 'bytes-hash-sha2-512-256'), ' (FIPS Pub 180-4) and ',
                    h('code', {}, 'bytes-hash-sha3-256'), ' (FIPS Pub 202).  Each takes a ',
                    h('code', {}, 'bytes'), ' value and returns the raw digest as ', h('code', {}, 'bytes'), '.'
                ),
                h('li', {},
                    'Added binary floating point read, append, and write operations for bytes.'
                ),
                h('li', {},
                    'Added a peephole optimization that inlines an unconditional jump targeting a ' +
                    'label immediately followed by a ', h('code', {}, 'RETURN'), '.'
                ),
                h('li', {},
                    'Added the ', h('code', {}, 'RETURN_IF_FALSE'), ' and ',
                    h('code', {}, 'RETURN_IF_TRUE'), ' opcodes and a peephole optimization that fuses ' +
                    'a conditional jump leading directly to a ', h('code', {}, 'RETURN'), ' into a ' +
                    'single conditional-return instruction.  A ', h('code', {}, 'RETURN'), ' block that ' +
                    'becomes unreachable after the fusion is removed.'
                ),
                h('li', {},
                    'Added a struct instance folding optimization.  A ',
                    h('code', {}, 'struct-is-instance?'), ' test whose receiver is proven to be a struct ' +
                    'of exactly the tested type is folded to ', h('code', {}, '#t'), ' and its branch ' +
                    're-wired.'
                ),
                h('li', {},
                    'Added a tracing/annotating profiler.  ', h('code', {}, 'menai-eval --annotate'),
                    ' renders every function\'s disassembly with per-instruction execution counts and shares.'
                ),
                h('li', {},
                    'Added support for disassembling a module with ', h('code', {}, 'menai-disassemble'), '.'
                ),
                h('li', {},
                    'Made constant folding able to create vectors.'
                ),
                h('li', {},
                    'Added missing prelude functions.'
                ),
                h('li', {},
                    'Improved compiler diagnostics and parsing error messages.'
                ),
                h('li', {},
                    'Reworked the module system and introduced the ', h('code', {}, '::'), ' special form.'
                ),
                h('li', {},
                    'Removed ', h('code', {}, 'struct-ref'), ' and ', h('code', {}, 'struct-set-ref'),
                    ' from the language.'
                ),
                h('li', {},
                    'Renamed the element access operations for consistency and to remove the mutation ' +
                    'connotation of ', h('code', {}, 'set'), ', ', h('code', {}, 'add'), ', and ',
                    h('code', {}, 'remove'), '.  Positional reads are now ', h('code', {}, '-nth'), ' (',
                    h('code', {}, 'string-nth'), ', ', h('code', {}, 'list-nth'), ', ',
                    h('code', {}, 'bytes-nth'), ', ', h('code', {}, 'vector-nth'), '), keyed reads are ',
                    h('code', {}, '-get'), ' (', h('code', {}, 'dict-get'), ', ',
                    h('code', {}, 'struct-get'), '), additions and replacements are ',
                    h('code', {}, '-with'), ' (', h('code', {}, 'vector-with'), ', ',
                    h('code', {}, 'dict-with'), ', ', h('code', {}, 'struct-with'), ', ',
                    h('code', {}, 'set-with'), '), and removals are ', h('code', {}, '-without'), ' (',
                    h('code', {}, 'set-without'), ', ', h('code', {}, 'dict-without'), ', ',
                    h('code', {}, 'list-without'), ').  This replaces ', h('code', {}, 'string-ref'),
                    ', ', h('code', {}, 'list-ref'), ', ', h('code', {}, 'bytes-ref'), ', ',
                    h('code', {}, 'vector-ref'), ', ', h('code', {}, 'vector-set'), ', ',
                    h('code', {}, 'dict-set'), ', ', h('code', {}, 'struct-set'), ', ',
                    h('code', {}, 'set-add'), ', ', h('code', {}, 'set-remove'), ', ',
                    h('code', {}, 'dict-remove'), ', and ', h('code', {}, 'list-remove'), '.'
                ),
                h('li', {},
                    'Improved the inliner so it can inline ', h('code', {}, 'letrec'), '-containing bodies.'
                ),
                h('li', {},
                    'Improved performance of integer bitwise VM operations.'
                ),
                h('li', {},
                    'Improved the algorithmic performance of deflate, inflate and the Sudoku and ' +
                    'Rubik\'s cube benchmarks.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Fixed a slot allocation bug that could emit a branch on a register in the ' +
                    'outgoing argument zone.'
                ),
                h('li', {},
                    'Fixed a VM crash when ', h('code', {}, 'apply'), ' is used with a large argument ' +
                    'list.  reserved slots corrupted memory.'
                ),
                h('li', {},
                    'Fixed a VM stack overflow when freeing a long list.  The list finalizer released ' +
                    'the tail recursively, using one C stack frame per element, so freeing a list of a ' +
                    'few hundred thousand elements overflowed the C stack.  Long lists are now freed ' +
                    'iteratively.'
                ),
                h('li', {},
                    'Fixed a CFG bug where branch constant propagation could remove a phi node whose ' +
                    'result was still used by a branch target.'
                ),
                h('li', {},
                    'Fixed a CFG bug where dead capture elimination failed to remove orphaned ',
                    h('code', {}, 'PATCH_CLOSURE'), ' instructions.'
                ),
                h('li', {},
                    'Dictionaries created with duplicate keys retained the first value, but should have ' +
                    'retained the last one.'
                ),
                h('li', {},
                    'Sets created with dynamic duplicate elements must not contain duplicates!'
                ),
                h('li', {},
                    'Fixed a crash in the closure cycle collector when a dead closure was destroyed ' +
                    'twice in one sweep.'
                ),
                h('li', {},
                    'Fixed a problem where desugaring did not correctly honour shadowing of operation names.'
                ),
                h('li', {},
                    'Struct type recognition is now lexically scoped.  Two struct types with the same ' +
                    'name in different scopes are distinct, and a struct type is not visible outside the ' +
                    'binder that declares it.'
                ),
                h('li', {},
                    'Fixed a compiler register usage bug.'
                ),
                h('li', {},
                    'Fixed several soundness bugs in the type analysis, including a phi type-fact bug ' +
                    'and a struct field-access rewrite that could omit a required guard.'
                ),
                h('li', {},
                    'Fixed desugaring of ', h('code', {}, 'vector-slice'), '.'
                ),
                h('li', {},
                    'Fixed inliner shadowing and recursion-checker bugs.'
                ),
                h('li', {},
                    'Fixed a VM crash from deep recursion.'
                ),
                h('li', {},
                    'Fixed non-determinism in the compiler.'
                ),
                h('li', {},
                    'Fixed a type guard problem and regressions in loop-invariant code motion, ',
                    h('code', {}, 'MOVE'), ' removal, loop rotation and type propagation.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {},
                    'Made the compiler purely functional.  Every phase is now a pure function over ' +
                    'immutable values, and the AST, IR, CFG, VCode and bytecode models are immutable.  ' +
                    'Each layer has an immutability test.'
                ),
                h('li', {},
                    'Made the CFG an immutable value.  Terminators reference blocks by id, predecessors ' +
                    'are derived rather than stored, and passes receive a context carrying cross-pass state.'
                ),
                h('li', {},
                    'Reworked the CFG pass manager to run each pass to its own fixed point.'
                ),
                h('li', {},
                    'Renamed the standard library modules to a ', h('code', {}, 'format-operation'),
                    ' convention.'
                ),
                h('li', {},
                    'Removed the last elements of compiler global state.'
                ),
                h('li', {},
                    'Added ADRs recording the inliner recursion rule, letrec-to-loop conversion, CFG ' +
                    'immutability, compiler purity, function provenance through containers, and predicate ' +
                    'folding over interprocedural facts.'
                )
            )
        )
    ];
}

export const notesPost_2026_10_01 = new NotesPost(
    '2026-10-01: Menai v0.6',
    '2026-10-01',
    '/notes/2026-10-01',
    '2026-10-01: Menai v0.6 - a huge amount of new and updated functionality, with big changes to the compiler and the evolution of what will become a very thorough standard library.',
    null,
    null,
    notesOpening_2026_10_01,
    notesArticle_2026_10_01,
    null
);
