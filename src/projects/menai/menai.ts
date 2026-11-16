import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

/**
 * Render a simple two-or-more column table.
 * @param headers - Column headings.
 * @param rows - Row cells, already in the same order as the headings.
 * @returns The table as a VNode.
 */
function table(headers: string[], rows: string[][]): VNode {
    return h('table', {},
        h('thead', {},
            h('tr', {}, ...headers.map((heading: string) => h('th', {}, heading)))
        ),
        h('tbody', {},
            ...rows.map((row: string[]) =>
                h('tr', {}, ...row.map((cell: string) => h('td', {}, cell)))
            )
        )
    );
}

export function projectMenaiPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Menai',
                subtitle: 'A compiled, pure functional language designed for AI use'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'Menai is a pure functional programming language designed specifically for use ' +
                            'by an AI rather than a human.  Of course, humans can use it too.'
                        ),
                        h('p', {},
                            'As a pure functional language it makes a conscious decision to forgo regular I/O, so ' +
                            'it is always safe for an AI to use without having to worry about security problems or operating risks.'
                        ),
                        h('p', {},
                            'That does not mean Menai cannot do real work.  It means I/O sits in a framework ' +
                            'outside the language, and that framework invokes Menai to perform pure computations.  ' +
                            'Within an AI tool framework the AI becomes responsible for marshalling I/O, leaving ' +
                            'Menai to do the computational work.  The result is a very clean boundary between ' +
                            'stateless and stateful activity.'
                        ),
                        h('p', {},
                            'Menai started life as ',
                            h('a', {href: '/notes/2025-09-17'}, 'AIFPL (AI Functional Programming Language)'),
                            ' in September 2025, as part of the ',
                            h('a', {href: '/projects/humbug'}, 'Humbug'),
                            ' project.  It was ',
                            h('a', {href: '/notes/2026-02-28'}, 'renamed to Menai in February 2026'),
                            ' and extracted into its own repository at ',
                            h('a', {href: 'https://github.com/m6r-ai/menai', target: '_blank'}, 'github.com/m6r-ai/menai'),
                            '.  It has zero dependencies on Humbug or on any other package, and Humbug consumes ' +
                            'it as an external dependency through a deliberately small interface.'
                        ),
                        h('p', {},
                            'Menai is named after the Menai Strait, and one of my favourite pieces of civil ' +
                            'engineering: the Menai Bridge.  I also rather liked that Menai ends with "ai" :-)'
                        ),
                        h('section', {},
                            h('h2', {}, 'Design principles'),
                            h('p', {},
                                'Menai has Lisp/Scheme-inspired syntax.  It has a number of things that will be ' +
                                'familiar to Lisp and Scheme users, but it is not another Lisp variant, and it ' +
                                'breaks with Lisp wherever Lisp is imprecise.'
                            ),
                            h('ol', {},
                                h('li', {}, h('strong', {}, 'Pure functional'), ': no side effects, no mutation, immutable data throughout. Purity is what makes unsupervised execution safe, and it is also what lets the compiler delete, move and merge code without asking permission.'),
                                h('li', {}, h('strong', {}, 'Compiled'), ': source is compiled through five internal representations to register-based bytecode, with an optimising pipeline in between'),
                                h('li', {}, h('strong', {}, 'Strict typing where it matters'), ': values are dynamically typed, but every operation is type-specific and there is no implicit coercion'),
                                h('li', {}, h('strong', {}, 'Precision over convenience'), ': ',
                                    h('code', {}, 'integer+'), ', ', h('code', {}, 'float+'), ' and ', h('code', {}, 'complex+'),
                                    ' rather than one overloaded ', h('code', {}, '+'), '; no truthiness; no coercion.  This is the single biggest difference from a human-focused language, and it turns out to produce very robust generated code'),
                                h('li', {}, h('strong', {}, 'First-class functions'), ': lambdas, closures, higher-order functions, and tail call optimisation so recursion can be used as a loop'),
                                h('li', {}, h('strong', {}, 'Homoiconicity'), ': code and data share the same s-expression representation'),
                                h('li', {}, h('strong', {}, 'Pattern matching'), ': declarative dispatch with typed destructuring, predicate patterns and enum jump tables'),
                                h('li', {}, h('strong', {}, 'Compile-time modules'), ': ', h('code', {}, '.menai'), ' files with named ', h('code', {}, 'export'), 's, resolved and cached before optimisation so cross-module optimisations are possible'),
                                h('li', {}, h('strong', {}, 'Diagnostics written for the reader'), ': errors carry position and source context, and a malformed form is reported where it needs to be fixed rather than where the symptom appears'),
                                h('li', {}, h('strong', {}, 'Independence'), ': zero dependencies on external packages, including Humbug; the runtime is a C extension built from source in the repository')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Types'),
                            h('p', {},
                                'Every value is immutable.  There is no operation that modifies a value in place; ' +
                                'everything that looks like an update returns a new value and leaves the original alone.'
                            ),
                            table(
                                ['Type', 'What it is'],
                                [
                                    ['integer', 'Arbitrary-precision integer. Small values are held inline and large ones are boxed, but that is an implementation detail hidden behind one type.'],
                                    ['float', 'IEEE 754 double precision. NaN, infinities and denormals are all values of this type; there is no literal syntax for them.'],
                                    ['complex', 'Double-precision real and imaginary parts. No ordering; use complex-abs for magnitude comparisons.'],
                                    ['string', 'Immutable Unicode text. Ordering is codepoint order, not locale collation.'],
                                    ['boolean', '#t and #f. There is no truthiness: a condition must be a boolean.'],
                                    ['none', '#none, the explicit absence of a value, distinct from #f and not usable as a condition.'],
                                    ['symbol', 'A name produced by quote, for symbolic programming and homoiconicity. Hashable.'],
                                    ['list', 'Proper list. Cons cells internally, so head, tail and prepend are O(1) and random access is O(n).'],
                                    ['vector', 'Contiguous array with O(1) random access, for index-heavy code where a list\'s O(n) access dominates. Fixed-arity destructuring; not hashable.'],
                                    ['dict', 'Key-value mapping with O(1) lookup that preserves insertion order.'],
                                    ['set', 'Unordered collection of unique hashable values with O(1) membership testing.'],
                                    ['bytes', 'Immutable sequence of octets, with multi-byte integer reads and writes, LEB128 and floating-point codecs, LEB128 and floating-point appends, hashing and CRC-32.'],
                                    ['structtype / struct', 'A nominal record type and its instances. Two types with the same fields are still distinct types.'],
                                    ['enumtype / enum', 'A closed set of named variants, compared for identity only. A match over variants compiles to a jump table.'],
                                    ['function', 'First-class closure with lexical scope.']
                                ]
                            ),
                            h('p', {},
                                'The type system is checked at runtime rather than by inference, and there is no ' +
                                'polymorphism in the library: ',
                                h('code', {}, 'integer+'),
                                ' adds integers and raises an error if you hand it a float.  That strictness is ' +
                                'deliberate.  The compiler then earns back what the strictness costs by proving, ' +
                                'statically and where it can, what the runtime would otherwise have to check.'
                            ),
                            CodeFragment.create({
                                code: `; An enum is a closed set of named variants, compared for identity only.
(let ((op (enum (add mul)))
      (apply-op (lambda (o a b)
                  (match o
                    ((: op 'add) (integer+ a b))
                    ((: op 'mul) (integer* a b))))))
  (list (apply-op (op 'add) 3 4) (apply-op (op 'mul) 3 4)))
; \u2192 (7 12)`,
                                language: 'menai',
                                caption: 'An enum and a match that compiles to a jump table'
                            }),
                            h('p', {},
                                'Patterns name the type they decompose, so a pattern never means something ' +
                                'different depending on what happens to be in scope.  A fixed-arity pattern ' +
                                'carries a ',
                                h('code', {}, ':'),
                                ' head and works the same way for builtin structural types and for nominal ones: ',
                                h('code', {}, '(: list a b c)'), ', ', h('code', {}, '(: vector a b c)'), ', ',
                                h('code', {}, '(: Point x y)'), ', ', h('code', {}, '(: state \'idle)'),
                                '.  Prefix-plus-rest decomposition uses the language\'s existing ',
                                h('code', {}, '.'),
                                ' notation instead: ',
                                h('code', {}, '(head . tail)'),
                                '.  A bare ',
                                h('code', {}, '(a b c)'),
                                ' is not a list pattern, which is one of several places where Menai ' +
                                'deliberately refuses an ambiguity that Lisp accepts.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Bindings and functions'),
                            h('p', {},
                                h('code', {}, 'let'),
                                ' is Menai\'s only binding form.  Every binding name is in scope for every ' +
                                'binding value and for the body, so a binding can reference any sibling, ' +
                                'including itself.  That covers the sequential and recursive cases other Lisps ' +
                                'spell ',
                                h('code', {}, 'let*'),
                                ' and ',
                                h('code', {}, 'letrec'),
                                ', so there is no need for three forms.  Values are evaluated in dependency ' +
                                'order rather than source order, so a chain of dependent bindings is written as ' +
                                'one flat ',
                                h('code', {}, 'let'),
                                '.  A non-lambda binding cannot refer to itself, because it has no value when ' +
                                'it is evaluated; a reference shielded by a lambda is fine, which is exactly ' +
                                'the boundary between a recursive group and a circular one.'
                            ),
                            CodeFragment.create({
                                code: `; One binding form covers sequential steps, self-recursion and mutual recursion.
(let ((fact (lambda (n acc)
              (if (integer<=? n 1)
                  acc
                  (fact (integer- n 1) (integer* n acc))))))
  (fact 20 1))
; \u2192 2432902008176640000`,
                                language: 'menai',
                                caption: 'let with a self-recursive binding'
                            }),
                            h('p', {},
                                'Functions are first-class closures with lexical scope, variadic parameters ' +
                                'written with ',
                                h('code', {}, '.'),
                                ', and tail call optimisation.  A tail call reuses the frame, so recursion ' +
                                'is the loop construct and deeply recursive code does not grow the stack.  ' +
                                'Mutual recursion is optimised in the same way: a single-binding tail-recursive ' +
                                'group is lowered to an actual loop in the intermediate representation, before ' +
                                'inlining, so the calls inside the loop body can be inlined too.'
                            ),
                            CodeFragment.create({
                                code: `; Tail calls do not consume stack, including mutual recursion.
(let ((is-even (lambda (n) (if (integer=? n 0) #t (is-odd (integer- n 1)))))
      (is-odd (lambda (n) (if (integer=? n 0) #f (is-even (integer- n 1))))))
  (is-even 100000))
; \u2192 #t`,
                                language: 'menai',
                                caption: 'Tail call optimisation'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Collections'),
                            h('p', {},
                                'Every collection type has the same family of operations, and the name says ' +
                                'which operation and which type: ',
                                h('code', {}, 'list-nth'), ', ', h('code', {}, 'vector-nth'), ', ',
                                h('code', {}, 'bytes-nth'), ', ', h('code', {}, 'string-nth'),
                                ' read by position; ',
                                h('code', {}, 'dict-get'), ' and ', h('code', {}, 'struct-get'),
                                ' read by key.  Because the language is pure, an update never mutates its ' +
                                'argument: it is ',
                                h('code', {}, '-with'),
                                ' to add or replace and ',
                                h('code', {}, '-without'),
                                ' to remove, and both return a new collection.  The verbs ',
                                h('code', {}, 'set'), ', ', h('code', {}, 'add'), ' and ', h('code', {}, 'remove'),
                                ' are deliberately absent, because they connote mutation that cannot happen.'
                            ),
                            CodeFragment.create({
                                code: `; Higher-order operations put the function first and the collection last,
; and the same verbs work across every collection type.
(map-list (lambda (x) (integer* x 2)) (list 1 2 3 4))     ; \u2192 (2 4 6 8)
(map-vector (lambda (x) (integer* x 2)) (vector 1 2 3))   ; \u2192 #vector(2 4 6)
(map-set (lambda (x) (integer* x 2)) (set 1 2 3))         ; \u2192 #{2 4 6}
(map-dict (lambda (k v) (integer+ v 1)) (dict "a" 1))     ; \u2192 {("a" 2)}

(fold-list integer+ 0 (list 1 2 3 4 5))                   ; \u2192 15
(sort-list integer<? (list 3 1 4 1 5))                    ; \u2192 (1 1 3 4 5)
(find-list (lambda (x) (integer>? x 3)) (list 1 2 3 4 5)) ; \u2192 4
(any-list? (lambda (x) (integer>? x 3)) (list 1 2 3 4))   ; \u2192 #t
(all-list? (lambda (x) (integer>? x 0)) (list 1 2 3 4))   ; \u2192 #t

; Functional update returns a new collection and leaves the original alone.
(vector-with (vector 1 2 3) 1 99)                         ; \u2192 #vector(1 99 3)
(set-without (set 1 2 3) 2)                               ; \u2192 #{1 3}`,
                                language: 'menai',
                                caption: 'The same operation names across collection types'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Modules'),
                            h('p', {},
                                'A module is a ',
                                h('code', {}, '.menai'),
                                ' file containing a single expression that ends with an ',
                                h('code', {}, 'export'),
                                ' form naming the bindings it makes available.  Modules are a compile-time ' +
                                'feature: they are resolved, compiled and cached before optimisation runs, ' +
                                'which is what makes cross-module optimisation possible.  Circular imports are ' +
                                'detected and rejected.'
                            ),
                            CodeFragment.create({
                                code: `; shapes.menai
(let ((point (struct (x y)))
      (distance-squared (lambda (p q)
                          (let ((dx (integer- (struct-get p 'x) (struct-get q 'x)))
                                (dy (integer- (struct-get p 'y) (struct-get q 'y))))
                            (integer+ (integer* dx dx) (integer* dy dy))))))
  (export point distance-squared))`,
                                language: 'menai',
                                caption: 'A module exporting a type alongside its functions'
                            }),
                            CodeFragment.create({
                                code: `; A namespace is second-class: it can only be bound by let and used as
; the first argument of (:: ns member), so every member access resolves statically.
(let ((shapes (import "shapes")))
  (let ((Point (:: shapes point)))
    (let ((p (Point 3 4))
          (q (Point 0 1)))
      (list ((:: shapes distance-squared) p q)
            (match p
              ((: Point x y) (list x y)))))))
; \u2192 (18 (3 4))`,
                                language: 'menai',
                                caption: 'Importing a module and using its exported struct type'
                            }),
                            h('p', {},
                                'Member access resolves to the declaration that produced the member, which is ' +
                                'why an imported struct type can be bound to a local name and then used as a ' +
                                'constructor and as a pattern head.  The restriction that makes this possible is ' +
                                'that a namespace is ',
                                h('strong', {}, 'second-class'),
                                ': it cannot be passed to a function, stored in a container, returned, or ' +
                                'called.  Anything not named in a module\'s ',
                                h('code', {}, 'export'),
                                ' form is private to it.  Modules are found on a search path composed in a ' +
                                'fixed order: explicit directories, then ',
                                h('code', {}, 'MENAI_PATH'),
                                ' application libraries and the source file\'s directory, then the standard ' +
                                'library, with first match winning so an application can shadow a standard ' +
                                'library module.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'The compiler'),
                            h('p', {},
                                'Menai is compiled, not interpreted, and the pipeline is a series of ' +
                                'representations rather than a single pass.  Each representation exists because ' +
                                'it makes a particular class of analysis natural; the same transformation ' +
                                'expressible in two layers is usually much easier, or much more robust, in one of ' +
                                'them.'
                            ),
                            table(
                                ['Representation', 'Form', 'What it is for'],
                                [
                                    ['AST', 'Source-shaped tree with positions', 'Semantic validation, because this is the only layer that still has source locations and the original form of constructs like match and and/or. Literal constant folding also happens here.'],
                                    ['IR', 'Expression tree with named variables and lexical scope', 'Inlining, which needs to substitute a body and rebind parameters while names still mean something, and dead binding elimination, which needs to count uses per scope.'],
                                    ['CFG', 'SSA form: basic blocks, phi nodes, explicit edges', 'Dataflow. Constant conditions, unreachable blocks, known variant values, value types and loop structure are all questions about edges and join points.'],
                                    ['VCode', 'Flat instruction list with labels and virtual registers', 'Linearisation. Slot allocation becomes a linear scan, and peephole patterns become visible once instructions are adjacent.'],
                                    ['Bytecode', 'Integer opcodes and operands', 'Execution. Labels are resolved to indices and no analysis remains to be done; this layer is shaped to be fast to decode and run.']
                                ]
                            ),
                            h('p', {},
                                'Every layer has its own passes, and the order within a layer is load-bearing ' +
                                'in a few places that are called out below.  The driver runs each pass to its ' +
                                'own fixed point and then moves on.  It deliberately does not re-run the list as a ' +
                                'whole until nothing changes: every pass is monotone or idempotent, so the result ' +
                                'is the same, and a whole-list loop would re-run every converged pass on every ' +
                                'sweep — including the whole-program type analysis, which alone roughly doubles ' +
                                'optimisation time for no additional benefit.'
                            ),
                            h('h3', {}, 'Front end'),
                            table(
                                ['Pass', 'What it does'],
                                [
                                    ['Lexing and parsing', 'Produces an AST with source positions. Unbalanced parentheses are diagnosed by naming the line that needs changing, which for a missing bracket and an extra one requires two different kinds of evidence.'],
                                    ['Semantic analysis', 'Validates arity, binding structure and patterns against the AST, because the AST is the layer that still has names and positions. Name-based checks respect lexical shadowing, so a user binding that happens to be called integer+ is left alone.'],
                                    ['Module resolution', 'Loads imports, compiles each module once, caches it, and rejects cycles. Struct and enum types cross the boundary as declarations rather than as values.'],
                                    ['Prelude injection', 'Splices the prelude in as a single group of bindings. The program is desugared on its own first and the prelude\'s desugared form is cached across compilations, so it is not re-desugared every time.'],
                                    ['Desugaring', 'Rewrites the surface language into a small core and splits a let into dependency-ordered groups: a nested $let per topological step and one $letrec per strongly-connected component, which is why recursion and sequencing share one binding form.'],
                                    ['AST constant folding', 'Folds literal expressions and builds literal containers while the named builtins and literal types are still directly visible, before the program is lowered.']
                                ]
                            ),
                            h('h3', {}, 'IR'),
                            table(
                                ['Pass', 'What it does'],
                                [
                                    ['Dead binding elimination', 'Removes bindings no path reaches, using a use count and a reachability analysis. It runs first because the prelude is spliced into every program as a group of bindings and a typical program reaches only a few of them: pruning first means the two expensive passes below walk the reachable program rather than the whole prelude.'],
                                    ['Tail-recursive letrec to loop', 'Replaces a single self-referencing binding whose body is a single tail call with a loop and a back edge, so calls inside the loop body can be inlined. It runs before the inliner for exactly that reason.'],
                                    ['Inlining', 'Substitutes a lambda body at a call site and rebinds its parameters. It refuses recursive and mutually recursive calls, because inlining a body that calls itself reintroduces the call and the fixed-point loop cannot terminate, and it recomputes closure capture lists from the rewritten body rather than copying them, because closure conversion binds a function\'s names only from its capture lists.'],
                                    ['Dead binding elimination, again', 'The same pass, run after inlining to prune what the substitution exposed. It also collapses a constant if, rewrites (if c #t #f) to c and (if c #f #t) to (boolean-not c), and folds list-null? whose argument\'s shape settles it. That last case matters because a variadic function branching on whether it received extra arguments only becomes visible once inlining has bound the rest parameter to a literal list.']
                                ]
                            ),
                            h('h3', {}, 'CFG'),
                            table(
                                ['Pass', 'What it does'],
                                [
                                    ['Collapse phi chains', 'Removes trivial and chained phis so that a value has a single definition site, which the passes after it assume.'],
                                    ['Branch constant propagation', 'A branch on a statically-known condition becomes a jump, and the edge that can no longer be taken is deleted.'],
                                    ['Simplify blocks', 'Three cleanups run to a joint fixed point: bypassing blocks that are pure indirection, inlining a trivial terminal block into the jump predecessors that reach it, and folding duplicate raise blocks into one.'],
                                    ['Switch dispatch', 'Turns a run of same-type literal tests on one value into a jump table, so a dense match costs one dispatch rather than a comparison chain.'],
                                    ['Enum switch dispatch', 'Turns a match whose arms are variants of one enum into a jump table. The group\'s instance test is kept and is load-bearing, because the switch reads the variant index without re-reading the type.'],
                                    ['Interprocedural type analysis', 'A whole-program flow analysis that gives every value a type fact and pushes argument facts into callee parameters to a fixed point. Its lattice distinguishes "no information" from "conflicting information", because collapsing the two makes the fixed point oscillate rather than converge.'],
                                    ['Struct instance fold', 'Where the analysis proves a field read\'s receiver is a particular struct type and the field is a constant symbol, rewrites the read to an indexed one, eliminating the runtime symbol lookup.'],
                                    ['Enum instance fold', 'Removes the enum-is-instance? test when the analysis proves the receiver is exactly the tested type. It fires only on an identical type, not on a join of two enum types, because the test is what stops a value of another type whose variant index is in range from reaching the wrong arm.'],
                                    ['Predicate fold', 'Folds a type predicate whose argument is already proven, so a test the analysis has answered costs nothing.'],
                                    ['Guard insertion', 'Emits a runtime type check only where the analysis cannot prove the type, and the checked opcode then trusts the check. A guard shared by several blocks is placed once, in the block that dominates every use, so the copy in a loop\'s continue block does not execute once per iteration.'],
                                    ['Common subexpression elimination', 'Shares repeated evaluations, which is safe without any effect analysis because no expression has an effect.'],
                                    ['Branch fact propagation', 'A branch whose condition was already decided on every path that reaches it becomes a jump. It runs after CSE, which is what makes two syntactically identical tests share one SSA value for it to fold.'],
                                    ['Loop-invariant code motion', 'Hoists loop-invariant work, but only where the move cannot introduce a raise. Purity makes deletion safe, not motion: an expression that can raise must not move onto a path that previously did not raise, so a potentially-raising expression may only move to a point that executes on every path its original points covered.'],
                                    ['Loop rotation', 'Peels a loop so the test runs once on entry and once at the back edge, which is the shape the following passes and the code generator expect.'],
                                    ['Instruction scheduling', 'Sinks each definition to just before its first use, shortening live ranges and so reducing register pressure in the common loop shapes. A block containing closure patches is left unscheduled, because every patch for a recursive group must execute before any closure in that group is called.'],
                                    ['Dead capture elimination', 'Drops closure capture slots that are no longer read after other passes have rewritten the body, which is the usual fate of a self-capture once a self-call has become a back edge. A closure left with no captures is emitted as a constant instead of being allocated at all.'],
                                    ['Exception block ordering', 'Moves blocks that end in a raise to the end, so the normal path is contiguous. The ordering is stable and the entry block stays first.'],
                                    ['Merge exit blocks', 'Merges duplicate exit blocks, which a match lowers once per edge that can fall through to its else arm. Restricting the merge to blocks with no successors keeps the rewrite local: a block with successors would require rewriting the phi entries that record which predecessor each value arrived from.'],
                                    ['Enum switch fold', 'Folds a switch whose scrutinee is a statically-known variant into a jump to the selected arm, which deletes a dispatch that inlining has made static. The arms it makes unreachable are never emitted.']
                                ]
                            ),
                            h('h3', {}, 'VCode and emission'),
                            h('p', {},
                                'Once the CFG is final the program is linearised: blocks become labels, phi nodes ' +
                                'become moves at the end of each predecessor, and an SSA value id is reused ' +
                                'directly as a virtual register, so no renaming is needed.  Four passes then run ' +
                                'in a fixed order, and two of them are order-sensitive, which is why the order ' +
                                'is fixed:'
                            ),
                            table(
                                ['Pass', 'What it does'],
                                [
                                    ['Constant coalescing', 'Keeps one LOAD_CONST per distinct constant and replaces later duplicate registers with the first, where the first load dominates. It runs before slot allocation, so the duplicate registers never get slots.'],
                                    ['Operand folding', 'Rewrites a constant read by an opcode that can take a constant operand into a constant-pool index in the instruction word. Both the load and the register disappear; the opcode\'s own mask decides which positions may hold a constant, so the mask is what keeps the emitter, the validator and the VM in agreement.'],
                                    ['Slot allocation', 'A linear scan over the flat instruction list assigns concrete slots from per-definition lifetimes, reusing a slot once its value is dead. This is what the flat form exists for.'],
                                    ['Peephole optimisation', 'Seven local rewrites over adjacent instructions, each applied to a fixed point. The first and third need the slot map, so they run after allocation.'],
                                    ['Emission', 'Resolves labels to instruction indices, back-patches forward jumps, builds jump tables, interns constants, and emits each nested function once so that the Python code-object walk and the VM\'s ordinal assignment stay in step.']
                                ]
                            ),
                            h('p', {},
                                'The peephole rewrites are worth listing, because between them they remove most of ' +
                                'what linearisation leaves behind:'
                            ),
                            h('ul', {},
                                h('li', {}, 'redundant move elimination, where the allocator gave source and destination the same slot'),
                                h('li', {}, 'jump-over-jump, where a conditional followed by an unconditional jump becomes one conditional with inverted sense'),
                                h('li', {}, 'conditional / load-constant / return folding, where the register just tested already holds the value being returned'),
                                h('li', {}, 'jump threading, which resolves a jump to a jump to its ultimate target and deletes the indirection'),
                                h('li', {}, 'jump-to-return inlining, which turns a jump to a return into the return itself'),
                                h('li', {}, 'conditional-return fusion, which produces the conditional return instructions and deletes the return it absorbed'),
                                h('li', {}, 'branch-on-loaded-constant folding, where a load that immediately feeds a branch decides the branch and both become the taken jump or nothing at all')
                            ),
                            CodeFragment.create({
                                code: `; The motivating case for the type analysis: the receiver arrives as a
; parameter, so the struct type is knowable only at the call sites.
(let ((point (struct (x y)))
      (distance-squared
       (lambda (p q)
         (let ((dx (integer- (struct-get p 'x) (struct-get q 'x)))
               (dy (integer- (struct-get p 'y) (struct-get q 'y))))
           (integer+ (integer* dx dx) (integer* dy dy))))))
  (distance-squared (point 3 4) (point 0 1)))
; \u2192 18`,
                                language: 'menai',
                                caption: 'Struct field access through parameters'
                            }),
                            h('p', {},
                                'Every call site here is built from the same struct type, so both parameters ' +
                                'are proven to be that type and each ',
                                h('code', {}, 'struct-get'),
                                ' becomes an indexed field read: the opcode that looks a field up by symbol is ' +
                                'replaced by one that reads a constant index.  If a call site could pass ' +
                                'something else, the parameter is simply left unproven and the original runtime ' +
                                'path stays.  That is the rule for every pass in the pipeline: the analysis is ' +
                                'an optimisation, never a type system, so where a fact cannot be proven the ' +
                                'program behaves exactly as it did before.'
                            ),
                            h('p', {},
                                'Compilation is fast enough to run on demand, so every pass has to justify its ' +
                                'cost: a pass that costs ten milliseconds needs to save close to that in a ' +
                                'single run, and one that costs a hundred is probably not worth having.  That ' +
                                'constraint is why the pipeline is a sequence of cheap local passes rather than ' +
                                'an unbounded analysis.  It also shapes how changes are judged: wall-clock ' +
                                'timings cannot resolve a compiler change at this scale, because the benchmark ' +
                                'cases are milliseconds and a repeat run of the same build varies by more than a ' +
                                'real optimisation does.  The measurement is executed instruction counts, which ' +
                                'are deterministic, compared per case rather than in aggregate.  Write-ups of ' +
                                'individual optimisations, with their before and after numbers, appear in the ',
                                h('a', {href: '/notes'}, 'notes'),
                                '.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'The virtual machine'),
                            h('p', {},
                                'Bytecode runs on a register-based C virtual machine.  The compiler allocates ' +
                                'virtual registers and a linear scan maps them to slots in a per-frame register ' +
                                'array, reusing a slot once the value it held is dead.  Values live in named ' +
                                'registers rather than in an implicit stack, which is what lets the optimisation ' +
                                'passes reorder, eliminate and fuse operations without fighting a stack ' +
                                'discipline.  The VM is a single C extension with no process-global mutable ' +
                                'state: every mutable structure, from the allocator free lists to the closure ' +
                                'registry, belongs to a VM instance, so instances are independent of one another ' +
                                'and a host can reuse one across many executions.'
                            ),
                            h('h3', {}, 'Values, and what is not boxed'),
                            h('p', {},
                                'The most consequential thing about the VM is how a value is represented.  Every ' +
                                'value is a machine word, and the low bits of that word carry a tag.  Tag zero ' +
                                'means "pointer to a heap object", which costs nothing to detect because pooled ' +
                                'blocks are aligned; the remaining tags name the kinds whose entire content fits ' +
                                'in the word.  Those are immediates: they are not allocated, not reference ' +
                                'counted, and not owned by anything.  Writing one into a register is a plain ' +
                                'store.'
                            ),
                            table(
                                ['Value', 'Representation'],
                                [
                                    ['#none, #t, #f', 'Immediate. A tag and nothing else.'],
                                    ['integer', 'Immediate fixnum when it fits, otherwise a pooled object holding a bignum. Exactly one of the two forms exists for any given value.'],
                                    ['float', 'Immediate when its exponent falls inside a window the payload can hold, otherwise pooled. Zero, denormals, NaN, the infinities and anything outside the window are pooled.'],
                                    ['string, bytes, list, vector, dict, set, function, struct, enum', 'Pooled object, reference counted.']
                                ]
                            ),
                            h('p', {},
                                'The fixnum range is the whole payload of the word, so it is pointer-sized and ' +
                                'identical on every target.  Bounding it by a C ',
                                h('code', {}, 'long'),
                                ' instead would box values the word can already hold, and on Windows it would ' +
                                'silently truncate them.  Floats are a different compromise: a double needs 52 ' +
                                'mantissa bits and 11 exponent bits, and the payload has 61, so the inline form ' +
                                'keeps the whole mantissa and covers 256 consecutive exponents at full ' +
                                'precision.  The window is offset rather than being an aligned block, because an ' +
                                'aligned block cannot cover both 1.5 and 3.0.'
                            ),
                            h('p', {},
                                'Two rules keep this honest.  The first is that a constructor is the only thing ' +
                                'that may choose a representation, and it chooses from the value alone, so a ' +
                                'value that leaves the fixnum range and comes back is indistinguishable from one ' +
                                'that never left.  Hashing and equality treat the immediate and pooled paths ' +
                                'separately, and they agree only because a given value can only take one of ' +
                                'them.  The second is that a value must be tag-tested before it is dereferenced: ' +
                                'reading a header, testing a type field or touching a reference count on an ' +
                                'immediate is not a wrong answer, it is a fault, and one that lands a long way ' +
                                'from the code that caused it.  Every site that turns a value into a type or a ' +
                                'header carries the test, and that is the invariant to check when adding an ' +
                                'opcode or a value type.'
                            ),
                            h('p', {},
                                'The alternatives were considered and rejected.  A fat value, an explicit tag ' +
                                'plus a payload word, doubles the width of every register slot, closure capture, ' +
                                'list cell, dict entry and vector element, and moving values between slots is ' +
                                'what the interpreter loop spends its time doing.  NaN boxing would unbox every ' +
                                'float, but it makes every value a double, depends on pointers fitting in the ' +
                                'NaN payload on every platform a wheel is built for, and requires canonicalising ' +
                                'the NaN payload that arithmetic produces.  The tagged form gets most of the ' +
                                'benefit for a fraction of the risk, and it pays per type rather than all at ' +
                                'once.'
                            ),
                            h('h3', {}, 'Allocation and collection'),
                            h('p', {},
                                'Pooled values come from a per-instance pool allocator with size-bucketed free ' +
                                'lists.  Freeing a value returns its block to the free list for its size rather ' +
                                'than to the system allocator, so the next allocation is a pointer pop and the ' +
                                'memory it hands back is still warm in cache.  Lifetime is managed by reference ' +
                                'counting, which is a good fit for a language with no cycles in its data — with ' +
                                'one exception: closures can capture one another, and a mutually recursive group ' +
                                'is exactly that.  A cycle collector runs at the end of an execution, marks the ' +
                                'closures reachable from the live roots, and reclaims the unreachable ones.  It ' +
                                'is not a general collector, and the rest of the value graph is still refcounted.'
                            ),
                            h('h3', {}, 'Execution'),
                            h('p', {},
                                'The opcode set is wide and flat.  ',
                                h('code', {}, 'integer+'),
                                ' and ',
                                h('code', {}, 'float+'),
                                ' are different opcodes, and there is no polymorphic addition to dispatch on, ' +
                                'which is the execution-time price of strict typing and also the reason each ' +
                                'opcode is simple and predictable.  A few kernels that would be slow or awkward ' +
                                'in Menai are opcodes instead: big-integer arithmetic, the multi-byte integer ' +
                                'and LEB128 codecs, the SHA-2 and SHA-3 digests and CRC-32.  Errors are raised ' +
                                'with a code plus the structured context the code needs — the offending value, ' +
                                'the expected and actual arity — and the message text is composed on the Python ' +
                                'side from a single table, so the wording lives in one place.'
                            ),
                            h('h3', {}, 'Shipping'),
                            h('p', {},
                                'The C VM is compiled into platform wheels by cibuildwheel and published to ' +
                                'PyPI, covering Linux, macOS and Windows on x86_64 and ARM64 across five Python ' +
                                'versions.  ',
                                h('code', {}, 'pip install menai'),
                                ' selects the right wheel and there is no runtime download step.  The C VM is ' +
                                'also the only execution engine: there is no interpreter fallback, so the ' +
                                'language always runs at the speed the compiler and VM achieve, and a problem in ' +
                                'one is a problem in both.'
                            ),
                            h('p', {},
                                'Lifetime bugs in a reference-counted VM are invisible until they are not, so ' +
                                'the build can be made to tell on itself.  Debug builds instrument allocations ' +
                                'and report anything still live at teardown, poison and clear a magic value on ' +
                                'every block so a use-after-free aborts at the point of access, and trace the ' +
                                'collector and the pool allocator.  The test runner reuses one VM instance ' +
                                'across the leaves of a file by default, which is precisely the configuration ' +
                                'that exposes registry and pool corruption that a fresh instance per run would ' +
                                'never reach.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'The standard library'),
                            h('p', {},
                                'Menai ships with a standard library written entirely in Menai, and none of ' +
                                'it is a binding to a library written in another language.  That is the point: ' +
                                'the way to make a pure language useful is to make it fast enough to do real ' +
                                'work natively, and then to do the work in it.  The modules are package data ' +
                                'inside the installed package, so they are present in a wheel install and their ' +
                                'source can be read to see how something works.'
                            ),
                            table(
                                ['Modules', 'What they do'],
                                [
                                    ['json-decode, json-encode', 'Read and write JSON'],
                                    ['csv-decode, csv-encode', 'Read and write RFC 4180 CSV, as a table of rows and fields that is O(1) in both directions'],
                                    ['xml-decode, xml-encode', 'Read and write XML'],
                                    ['html-decode, html-encode', 'Parse HTML into the same element tree XML produces, and serialise it back; handles void elements, omitted end tags and raw text'],
                                    ['regexp', 'Compile a pattern and search, capture, split or replace within strings'],
                                    ['stats', 'Descriptive statistics over a column of floats: mean, median, mode, variance, quantiles, histograms, correlation and linear fit'],
                                    ['base64-decode, base64-encode', 'Standard and URL-safe Base64, padded and unpadded'],
                                    ['zip-entries, zip-extract, zip-create', 'Read a ZIP central directory, decompress entries, build archives'],
                                    ['tar-entries, tar-extract, tar-create', 'Read tar entry headers, extract entries, build POSIX ustar archives'],
                                    ['gzip-compress, gzip-decompress', 'gzip streams (RFC 1952)'],
                                    ['zlib-compress, zlib-decompress', 'zlib streams (RFC 1950)'],
                                    ['deflate-compress, deflate-decompress', 'Raw DEFLATE streams (RFC 1951)'],
                                    ['png-decode, png-encode', 'Non-interlaced 8-bit PNG, normalised to RGB or RGBA'],
                                    ['bmp-decode, bmp-encode', 'Uncompressed 24-bit and 32-bit BMP'],
                                    ['docx-decode, docx-encode', 'WordprocessingML packages: a ZIP of XML parts, decoded into a value tree and back'],
                                    ['xlsx-decode, xlsx-encode', 'SpreadsheetML packages'],
                                    ['pptx-decode, pptx-encode', 'PresentationML packages']
                                ]
                            ),
                            h('p', {},
                                'The library has two shapes.  An operation module exports one operation, and ' +
                                'its decode and encode halves pair by name: ',
                                h('code', {}, 'zip-entries'),
                                ' exports ',
                                h('code', {}, 'entries'),
                                ', and ',
                                h('code', {}, 'zip-extract'),
                                ' exports ',
                                h('code', {}, 'extract'),
                                '.  A capability module exports the members of one capability under their bare ' +
                                'operation names, because the module name already says what the capability is: ',
                                h('code', {}, 'regexp'),
                                ' exports ',
                                h('code', {}, 'compile'),
                                ', ',
                                h('code', {}, 'search'),
                                ', ',
                                h('code', {}, 'split'),
                                ' and ',
                                h('code', {}, 'replace'),
                                ' alongside its compiled-pattern type.'
                            ),
                            h('p', {},
                                'The codecs are capture layers rather than document models.  Decoding captures ' +
                                'the package faithfully — namespace prefixes are kept verbatim, relationships ' +
                                'keep their type as well as their target, and nothing a consumer might need is ' +
                                'resolved away — and encoding puts it back, which gives a value round-trip.  A ' +
                                'semantic document model, with headings, paragraphs, runs and resolved styles, ' +
                                'is deliberately not part of any codec: it is not specific to one format, so it ' +
                                'belongs in a layer above them that several formats can share.'
                            ),
                            CodeFragment.create({
                                code: `; JSON in, statistics out, all in Menai.
(let ((json (import "json-decode"))
      (stats (import "stats")))
  (let ((readings
          ((:: json decode)
           "[{\\"city\\":\\"Menai Bridge\\",\\"rainfall\\":12.5},
             {\\"city\\":\\"Bangor\\",\\"rainfall\\":18.0},
             {\\"city\\":\\"Caernarfon\\",\\"rainfall\\":9.25}]")))
    ((:: stats list-mean)
     (map-list (lambda (row) (dict-get row "rainfall")) readings))))
; \u2192 13.25`,
                                language: 'menai',
                                caption: 'Two standard library modules, no bindings'
                            }),
                            CodeFragment.create({
                                code: `; A capability module: compile once, then rewrite every match.
(let ((regexp (import "regexp")))
  (let ((date ((:: regexp compile) "([0-9]{4})-([0-9]{2})-([0-9]{2})")))
    ((:: regexp replace) date
     "released 2026-10-27, revised 2026-11-08"
     "$3/$2/$1")))
; \u2192 "released 27/10/2026, revised 08/11/2026"`,
                                language: 'menai',
                                caption: 'Capturing groups and replacement'
                            }),
                            h('p', {},
                                'Each module has a ',
                                h('code', {}, '.test.menai'),
                                ' suite beside it, and each codec pair has a round-trip suite as well.  Those ' +
                                'suites are the module\'s specification rather than an afterthought, and they ' +
                                'are large: they cover the malformed inputs and the boundary cases, which is ' +
                                'where a decoder written in a language with no exceptions to catch has to be ' +
                                'explicit about what it rejects.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'The toolset'),
                            h('p', {},
                                'Menai installs a set of command-line tools along with the language.  They are ' +
                                'how the language is developed as much as how it is used, and the profiling ' +
                                'they share is the reason optimisation work can be measured at all.'
                            ),
                            table(
                                ['Tool', 'Purpose'],
                                [
                                    ['menai-eval', 'Compile and run a .menai file, with optional compiler and VM profiling'],
                                    ['menai-test', 'Discover and run *.test.menai suites, with bytecode and per-module function coverage'],
                                    ['menai-format', 'Format Menai source; --check exits non-zero if a file does not match the canonical style'],
                                    ['menai-disassemble', 'Print annotated bytecode disassembly'],
                                    ['menai-benchmark', 'Run the performance benchmark suites'],
                                    ['menai-pipeline', 'Run a JSON-defined pipeline of tool and Menai steps']
                                ]
                            ),
                            h('p', {},
                                'The profiling is worth describing because it is deliberately not timer-based.  ' +
                                'Three views are available over VM execution: ',
                                h('code', {}, '--profile'),
                                ' ranks functions by instructions executed, ',
                                h('code', {}, '--opcodes'),
                                ' counts opcode frequency, and ',
                                h('code', {}, '--annotate'),
                                ' shows the annotated disassembly with each instruction\'s share.  A fourth, ',
                                h('code', {}, '--coverage'),
                                ', reports which compiled instructions never executed at all, which is how a ' +
                                'decoder\'s untested error paths are found.  The counts are instruction counts ' +
                                'rather than times because the VM executes most opcodes in a few nanoseconds ' +
                                'while the cheapest high-resolution timer read costs tens, so per-instruction ' +
                                'timing would measure the timer.  Instruction counts are deterministic, which ' +
                                'makes them comparable across machines and across months, and they are ' +
                                'attributed by instruction ordinal, so a count survives being collected in a ' +
                                'different run from the one that produced it.  ',
                                h('code', {}, '--cprofile'),
                                ' covers the other half: the compiler, which is pure Python, so a profile sees ' +
                                'each pass by name.'
                            ),
                            h('p', {},
                                'The benchmark suites cover sorting, the Sudoku and Rubik\'s cube solvers, ' +
                                'calendar arithmetic, string operations, every codec in the standard library, ' +
                                'the regular expression engine and the compressors, with list and vector ' +
                                'variants of the same problems so container choices can be compared directly.  ' +
                                'Binary inputs are generated in memory from deterministic code rather than ' +
                                'committed as files, so every machine benchmarks byte-identical data.'
                            ),
                            CodeFragment.create({
                                code: `{
  "id": "mean-rainfall",
  "tool": "menai",
  "inputs": {"data": "read-bytes", "today": "clock"},
  "expression": "(let ((json (import \\"json-decode\\")))
                   (dict \\"mean\\"
                     ((:: json decode) (dict-get inputs \\"data\\"))))",
  "outputs": {"mean": "mean"}
}`,
                                language: 'json',
                                caption: 'A Menai step in a pipeline: real bytes in, a computed value out'
                            }),
                            h('p', {},
                                'That last tool is the embedding story in executable form.  A pipeline is a JSON ' +
                                'file whose steps are either tool steps — filesystem, clock, console — or Menai ' +
                                'steps, and values flow between them.  Binary files are delivered to Menai as ' +
                                'real ',
                                h('code', {}, 'bytes'),
                                ' values rather than as hex strings.  Because Menai is pure, adjacent Menai ' +
                                'steps are collapsed into one before execution, so the work is optimised ' +
                                'together instead of compiled separately and run through a boundary; that ' +
                                'transformation is only available because nothing in between can have an ' +
                                'observable effect.  The pipeline runner also demonstrates the discipline the ' +
                                'language is designed for: the non-deterministic and stateful parts of the ' +
                                'system stay outside the language, where they can be permissioned and reviewed, ' +
                                'and Menai does the computation in between.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Limitations, stated plainly'),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'No I/O, by design.'), ' No filesystem, network, clock or environment access, and no way to ask for them. This is the safety property, not a gap to be closed later.'),
                                h('li', {}, h('strong', {}, 'Dynamically typed.'), ' Types are checked at runtime, and the compiler proves what it can as an optimisation. It is not a type inferencer, and it will not tell you that a function is polymorphic over two struct types.'),
                                h('li', {}, h('strong', {}, 'No exhaustiveness checking.'), ' A match over enum variants is not yet checked for totality; the arms are compiled to a jump table and an unhandled variant falls through. When it is added it must be an error, computed as a variant set so it extends to nested patterns.'),
                                h('li', {}, h('strong', {}, 'One expression per file.'), ' There is no sequencing form and no top-level statements, so a program or module is a single expression. Multi-step work is nested let.'),
                                h('li', {}, h('strong', {}, 'No interpreter fallback.'), ' The C VM is the only engine, so every supported platform runs the same compiled runtime.'),
                                h('li', {}, h('strong', {}, 'A young language.'), ' The standard library is broad but the language is still changing: breaking changes have been made deliberately while the corpus is small enough to migrate, and they will keep happening while the design settles.')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Getting Menai'),
                            h('p', {},
                                'Install the package and try something:'
                            ),
                            CodeFragment.create({
                                code: `pip install menai

echo '(let ((greet (lambda (name) (string-concat "Hello, " name))))
        (greet "World"))' | menai-eval -
# Result: "Hello, World"`,
                                language: 'text',
                                caption: 'Install and evaluate an expression from stdin'
                            }),
                            h('ul', {},
                                h('li', {},
                                    'Source and issues: ',
                                    h('a', {href: 'https://github.com/m6r-ai/menai', target: '_blank'},
                                        'github.com/m6r-ai/menai'
                                    )
                                ),
                                h('li', {},
                                    'Language manual: the ',
                                    h('code', {}, 'docs/'),
                                    ' directory, a written-for-humans (and AIs) reference covering syntax, types, core forms, pattern matching, builtins and modules'
                                ),
                                h('li', {},
                                    'Design records: ',
                                    h('code', {}, 'docs/adr/'),
                                    ' holds the architecture decision records, one per non-obvious decision, each with the alternatives that were rejected. It is the closest thing the project has to a design rationale'
                                ),
                                h('li', {},
                                    'AI-facing reference: the help text shown to an agent is generated from the language implementation rather than maintained separately, so it cannot drift'
                                ),
                                h('li', {},
                                    'Benchmark results and development write-ups: the ',
                                    h('a', {href: '/notes'}, 'notes'),
                                    ' are where the measurements, the regressions and the things that did not work get written down'
                                )
                            ),
                            h('p', {},
                                'Menai is also integrated within the ',
                                h('a', {href: '/projects/humbug'}, 'Humbug'),
                                ' project, where it is consumed as an external dependency to provide safe, ' +
                                'side-effect-free computation for AI agents.  Menai itself has no idea that ' +
                                'Humbug exists.'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectMenai = new ProjectPage(
    'Menai',
    '/projects/menai',
    'A compiled, pure functional programming language designed specifically for AI use, featuring an optimizing compiler, C virtual machine, strict typing, and no side effects.',
    projectMenaiPage
);
