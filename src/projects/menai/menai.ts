import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

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
                            'Menai is a compiled, pure functional programming language designed specifically for use by an ' +
                            'LLM rather than a human.  It\'s Lisp-inspired and higher-order, but makes a conscious decision ' +
                            'to forgo regular I/O operations.  That means it\'s always safe for an AI to use without having ' +
                            'to worry about potential security problems.'
                        ),
                        h('p', {},
                            'The language started life as AIFPL (AI Functional Programming Language), but was ',
                            h('a', {href: '/notes/2026-02-28'}, 'renamed to Menai in February 2026'),
                            '.  I used to live in North Wales where I could see the Menai Strait, and it\'s also home to ' +
                            'one of my favourite pieces of civil engineering: the Menai Bridge.  I also rather liked that ' +
                            'Menai ends with "ai" :-)'
                        ),
                        h('p', {},
                            'The whole compiler is written in Python as part of the ',
                            h('a', {href: '/projects/humbug'}, 'Humbug'),
                            ' project, with no dependencies beyond the Python standard library.'
                        ),
                        h('section', {},
                            h('h2', {}, 'Compiler architecture'),
                            h('p', {},
                                'Menai features a custom optimizing compiler with a rich pipeline of internal representations, ' +
                                'each designed to enable a specific class of analysis or transformation:'
                            ),
                            h('ol', {},
                                h('li', {},
                                    h('strong', {}, 'Abstract Syntax Tree (AST)'),
                                    ': The initial structured representation produced by the parser.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Intermediate Representation (IR)'),
                                    ': A tree-based IR used for high-level optimizations such as inlining and copy propagation.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'SSA Control Flow Graph (CFG)'),
                                    ': A Static Single Assignment form control flow graph used for dataflow analysis.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Virtual Code'),
                                    ': A low-level, architecture-neutral representation used for final code shaping.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Bytecode'),
                                    ': The final output, executed by the Menai virtual machine.'
                                )
                            ),
                            h('p', {},
                                'The compiler prioritises inexpensive optimization passes. The goal is to generate very high ' +
                                'quality bytecode very quickly, rather than spending unbounded time on exhaustive analysis. ' +
                                'This makes Menai well suited to the short-lived, on-demand evaluation tasks that AI agents ' +
                                'typically perform.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Virtual machine'),
                            h('p', {},
                                'The Menai virtual machine uses an ',
                                h('strong', {}, 'infinite register architecture'),
                                '. Unlike stack-based VMs, each temporary value is assigned its own virtual register, which ' +
                                'simplifies code generation and makes many optimization passes more straightforward. The VM ' +
                                'executes the bytecode produced by the compiler directly.'
                            ),
                            h('p', {},
                                'The reference VM is written in Python.  It is highly tuned, but limited by the speed of the ' +
                                'Python interpreter and runtime.  An experimental Cython VM also exists and is used on MacOS.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Language design principles'),
                            h('ol', {},
                                h('li', {}, h('strong', {}, 'Pure functional'), ': No side effects, immutable data throughout'),
                                h('li', {}, h('strong', {}, 'Compiled'), ': Source is compiled through multiple IR stages to bytecode before execution'),
                                h('li', {}, h('strong', {}, 'Strict type system'), ': Operations are type-specific; no implicit coercion between types'),
                                h('li', {}, h('strong', {}, 'First-class functions'), ': Lambda expressions, closures, and higher-order functions'),
                                h('li', {}, h('strong', {}, 'Lexical scoping'), ': Variables are resolved in their definition environment'),
                                h('li', {}, h('strong', {}, 'Tail call optimization'), ': Recursive patterns are automatically optimized'),
                                h('li', {}, h('strong', {}, 'Homoiconicity'), ': Code and data share the same s-expression representation'),
                                h('li', {}, h('strong', {}, 'Lazy evaluation'), ': Conditionals and boolean operators use lazy evaluation'),
                                h('li', {}, h('strong', {}, 'Rich error messages'), ': Detailed diagnostics with position information, critical when AIs generate code on the fly'),
                                h('li', {}, h('strong', {}, 'Module system'), ': Files can be imported as modules, cached after first load'),
                                h('li', {}, h('strong', {}, 'Independence'), ': No dependencies on external packages'),
                                h('li', {}, h('strong', {}, 'Thoroughly tested'), ': Extensive unit tests.')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Type system'),
                            h('p', {},
                                'Menai has a strict, runtime-checked type system. All operations are type-specific — there are ' +
                                'no generic arithmetic or comparison operators. The types are:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'Integer'), ': Arbitrary-precision integers, with typed operators such as ',
                                    h('code', {}, 'integer+'), ', ', h('code', {}, 'integer*'), ', ', h('code', {}, 'integer<?')),
                                h('li', {}, h('strong', {}, 'Float'), ': IEEE 754 floating-point, with typed operators such as ',
                                    h('code', {}, 'float+'), ', ', h('code', {}, 'float-sqrt'), ', ', h('code', {}, 'float<?')),
                                h('li', {}, h('strong', {}, 'Complex'), ': Complex numbers, with typed operators such as ',
                                    h('code', {}, 'complex+'), ', ', h('code', {}, 'complex-sqrt')),
                                h('li', {}, h('strong', {}, 'String'), ': UTF-8 strings; no automatic conversion to or from other types'),
                                h('li', {}, h('strong', {}, 'Boolean'), ': ', h('code', {}, '#t'), ' and ', h('code', {}, '#f'),
                                    '; no implicit truthiness — conditions must be boolean'),
                                h('li', {}, h('strong', {}, 'None'), ': ', h('code', {}, '#none'),
                                    ' — an explicit absence-of-value type, distinct from ', h('code', {}, '#f')),
                                h('li', {}, h('strong', {}, 'List'), ': Heterogeneous, ordered collections'),
                                h('li', {}, h('strong', {}, 'Dict'), ': Immutable key-value mappings with O(1) lookup, maintaining insertion order'),
                                h('li', {}, h('strong', {}, 'Set'), ': Immutable unordered collections of unique hashable values with O(1) membership testing'),
                                h('li', {}, h('strong', {}, 'Struct'), ': Nominal typed records with named fields; two struct types with the same fields are distinct types'),
                                h('li', {}, h('strong', {}, 'Symbol'), ': Produced by ', h('code', {}, 'quote'), '; used for symbolic programming'),
                                h('li', {}, h('strong', {}, 'Function'), ': First-class lambda functions with lexical scoping')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Arithmetic'),
                            h('p', {},
                                'All arithmetic operators are type-specific. There is no generic ', h('code', {}, '+'), ' or ', h('code', {}, '*'), '.'
                            ),
                            CodeFragment.create({
                                code: `; Integer arithmetic
(integer+ 1 2 3)                      ; → 6
(integer- 10 3)                       ; → 7
(integer* 2 3 4)                      ; → 24
(integer/ 7 3)                        ; → 2 (floor division)
(integer% 7 3)                        ; → 1 (modulo)
(integer-expn 2 10)                   ; → 1024
(integer-neg 5)                       ; → -5
(integer-abs -5)                      ; → 5

; Float arithmetic
(float+ 1.0 2.0 3.0)                  ; → 6.0
(float* 2.5 4.0)                      ; → 10.0
(float/ 10.0 4.0)                     ; → 2.5
(float-sqrt 9.0)                      ; → 3.0
(float-floor 3.7)                     ; → 3.0

; Type conversion
(integer->float 42)                   ; → 42.0
(float->integer 3.7)                  ; → 3 (truncates toward zero)
(integer->complex 3 4)                ; → 3+4j`,
                                language: 'menai',
                                caption: 'Type-specific arithmetic operators'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Comparisons'),
                            h('p', {},
                                'Comparison operators are also type-specific:'
                            ),
                            CodeFragment.create({
                                code: `; Integer comparisons
(integer=? 1 1)                       ; → #t
(integer<? 1 2)                       ; → #t
(integer>=? 3 3)                      ; → #t

; Float comparisons
(float<? 1.0 2.0)                     ; → #t
(float=? 3.14 3.14)                   ; → #t

; String comparisons (Unicode codepoint order)
(string=? "hello" "hello")            ; → #t
(string<? "apple" "banana")           ; → #t

; Boolean equality
(boolean=? #t #t)                     ; → #t
(boolean-not #f)                      ; → #t`,
                                language: 'menai',
                                caption: 'Type-specific comparison operators'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Lambda functions'),
                            CodeFragment.create({
                                code: `; Simple lambda
((lambda (x) (integer* x x)) 5)       ; → 25

; Lambda as a value
(let ((square (lambda (x) (integer* x x))))
  (square 6))                         ; → 36

; Closures capture their environment
(let ((multiplier 10))
  (let ((times-ten (lambda (x) (integer* x multiplier))))
    (times-ten 5)))                   ; → 50

; Variadic lambda — rest collects remaining args as a list
((lambda (. args) (fold-list integer+ 0 args)) 1 2 3 4 5)  ; → 15`,
                                language: 'menai',
                                caption: 'Lambda expressions and closures'
                            }),
                            h('h3', {}, 'Local bindings'),
                            CodeFragment.create({
                                code: `; let — parallel bindings (bindings cannot reference each other)
(let ((x 5) (y 10))
  (integer+ x y))                     ; → 15

; let* — sequential bindings (each can reference previous)
(let* ((x 5) (y (integer* x 2)))
  (integer+ x y))                     ; → 15

; letrec — recursive bindings (for self- and mutually-recursive functions)
(letrec ((fact (lambda (n)
                 (if (integer<=? n 1)
                     1
                     (integer* n (fact (integer- n 1)))))))
  (fact 10))                          ; → 3628800`,
                                language: 'menai',
                                caption: 'let, let*, and letrec bindings'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Strings'),
                            CodeFragment.create({
                                code: `; Construction and manipulation
(string-concat "hello" " " "world")   ; → "hello world"
(string-length "hello")               ; → 5
(string-upcase "hello")               ; → "HELLO"
(string-downcase "HELLO")             ; → "hello"
(string-ref "hello" 1)                ; → "e"
(string-slice "hello" 1 4)            ; → "ell"
(string-trim "  hello  ")             ; → "hello"
(string-replace "banana" "a" "o")     ; → "bonono"

; Search
(string-prefix? "hello" "he")         ; → #t
(string-suffix? "hello" "lo")         ; → #t
(string-index "hello" "l")            ; → 2
(string-index "hello" "z")            ; → #none  not found

; Conversion
(string->number "42")                 ; → 42
(string->number "3.14")               ; → 3.14
(string->number "hello")              ; → #none
(string->integer "ff" 16)             ; → 255
(integer->string 255 16)              ; → "ff"

; Split and join
(string->list "a,b,c" ",")            ; → ("a" "b" "c")
(list->string (list "a" "b" "c") ",") ; → "a,b,c"`,
                                language: 'menai',
                                caption: 'String operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Lists'),
                            CodeFragment.create({
                                code: `; Construction
(list 1 2 3)                          ; → (1 2 3)
(list 1 "hello" #t)                   ; → (1 "hello" #t)  mixed types
(list-prepend (list 2 3) 1)           ; → (1 2 3)
(list-append (list 1 2) 3)            ; → (1 2 3)
(list-concat (list 1 2) (list 3 4))   ; → (1 2 3 4)

; Access
(list-first (list 1 2 3))             ; → 1
(list-rest (list 1 2 3))              ; → (2 3)
(list-last (list 1 2 3))              ; → 3
(list-ref (list "a" "b" "c") 1)       ; → "b"

; Properties
(list-length (list 1 2 3))            ; → 3
(list-null? (list))                   ; → #t
(list-member? (list 1 2 3) 2)         ; → #t

; Slicing and utilities
(list-slice (list 1 2 3 4 5) 1 3)     ; → (2 3)
(list-reverse (list 1 2 3))           ; → (3 2 1)
(list-remove (list 1 2 3 2 4) 2)      ; → (1 3 4)
(list-index (list 1 2 3) 2)           ; → 1
(list-index (list 1 2 3) 42)          ; → #none  not found`,
                                language: 'menai',
                                caption: 'List construction, access, and utilities'
                            }),
                            h('h3', {}, 'Higher-order list operations'),
                            CodeFragment.create({
                                code: `; map-list — transform each element
(map-list (lambda (x) (integer* x 2)) (list 1 2 3 4))
; → (2 4 6 8)

; filter-list — select elements by predicate
(filter-list (lambda (x) (integer>? x 0)) (list -1 2 -3 4))
; → (2 4)

; fold-list — left fold (accumulate)
(fold-list integer+ 0 (list 1 2 3 4 5))
; → 15

; find-list — first match, or #none
(find-list (lambda (x) (integer>? x 3)) (list 1 2 3 4 5))
; → 4

; any-list? / all-list?
(any-list? (lambda (x) (integer>? x 3)) (list 1 2 3 4))  ; → #t
(all-list? (lambda (x) (integer>? x 0)) (list 1 2 3 4))  ; → #t

; zip-list — pair up two lists
(zip-list (list 1 2 3) (list 4 5 6))  ; → ((1 4) (2 5) (3 6))

; sort-list — sort with a comparator
(sort-list integer<? (list 3 1 4 1 5))  ; → (1 1 3 4 5)

; range — integer sequences
(range 1 5)                           ; → (1 2 3 4)
(range 0 10 2)                        ; → (0 2 4 6 8)`,
                                language: 'menai',
                                caption: 'Higher-order list operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Dictionaries'),
                            h('p', {},
                                'Dicts are immutable key-value mappings with O(1) lookup that maintain insertion order:'
                            ),
                            CodeFragment.create({
                                code: `; Construction
(dict "name" "Alice" "age" 30 "city" "NYC")
; → {("name" "Alice") ("age" 30) ("city" "NYC")}

; Access — returns #none if key is missing
(let ((user (dict "name" "Bob" "id" 123)))
  (list (dict-get user "name")              ; → "Bob"
        (dict-get user "email" "N/A")))     ; → "N/A"  default

; Modification (returns a new dict)
(let ((data (dict "x" 1 "y" 2)))
  (dict-set data "z" 3))                    ; → {("x" 1) ("y" 2) ("z" 3)}

; Queries
(let ((cfg (dict "debug" #t "port" 8080)))
  (list (dict-has? cfg "debug")             ; → #t
        (dict-keys cfg)                     ; → ("debug" "port")
        (dict-values cfg)                   ; → (#t 8080)
        (dict-length cfg)))                 ; → 2

; Merge — second dict wins on conflicts
(let ((defaults (dict "timeout" 30 "retries" 3))
      (custom   (dict "timeout" 60)))
  (dict-merge defaults custom))
; → {("timeout" 60) ("retries" 3)}

; Higher-order operations on dicts
(map-dict (lambda (k v) (integer* v 2))
          (dict "a" 1 "b" 2))
; → {("a" 2) ("b" 4)}

(filter-dict (lambda (k v) (integer>? v 1))
             (dict "a" 1 "b" 2))
; → {("b" 2)}`,
                                language: 'menai',
                                caption: 'Dictionary construction, access, and higher-order operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Sets'),
                            h('p', {},
                                'Sets are immutable, unordered collections of unique hashable values with O(1) membership ' +
                                'testing. Valid element types are integers, floats, complex numbers, strings, booleans, ' +
                                'and symbols — lists, dicts, functions, and ', h('code', {}, '#none'),
                                ' are not hashable and cannot be stored in a set.'
                            ),
                            CodeFragment.create({
                                code: `; Construction — duplicates are silently dropped
(set 1 2 3)                           ; → #{1 2 3}
(set 1 2 2 3 3)                       ; → #{1 2 3}
(set)                                 ; → #{}  empty set

; Membership and size
(set-member? (set 1 2 3) 2)           ; → #t
(set-member? (set 1 2 3) 99)          ; → #f
(set-length (set 1 2 3))              ; → 3

; Functional update (returns a new set — pure)
(set-add (set 1 2) 3)                 ; → #{1 2 3}
(set-remove (set 1 2 3) 2)            ; → #{1 3}

; Set algebra
(set-union        (set 1 2 3) (set 3 4 5))  ; → #{1 2 3 4 5}
(set-intersection (set 1 2 3) (set 2 3 4))  ; → #{2 3}
(set-difference   (set 1 2 3) (set 2 3 4))  ; → #{1}

; Subset test
(set-subset? (set 1 2) (set 1 2 3))   ; → #t
(set-subset? (set 1 4) (set 1 2 3))   ; → #f

; Conversion
(set->list (set 3 1 2))               ; → (3 1 2)  insertion order
(list->set (list 1 2 2 3 3))          ; → #{1 2 3}

; Higher-order operations
(map-set    (lambda (x) (integer* x 2)) (set 1 2 3))
; → #{2 4 6}

(filter-set (lambda (x) (integer>? x 1)) (set 1 2 3))
; → #{2 3}

(fold-set   integer+ 0 (set 1 2 3))
; → 6`,
                                language: 'menai',
                                caption: 'Set construction, membership, algebra, and higher-order operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Structs'),
                            h('p', {},
                                'Structs are nominal typed records with named fields. Two struct types that happen to have ' +
                                'the same fields are still distinct types — the type identity comes from the binding name, ' +
                                'not the field list.'
                            ),
                            CodeFragment.create({
                                code: `; Declare a struct type — bind it with let/let*/letrec
(let ((point (struct (x y))))
  (let ((p (point 3 4)))             ; construct an instance
    (list (struct-get p 'x)          ; → 3
          (struct-get p 'y))))       ; → 4`,
                                language: 'menai',
                                caption: 'Declaring and constructing a struct'
                            }),
                            CodeFragment.create({
                                code: `; Functional update — returns a new struct, original is unchanged
(let ((point (struct (x y))))
  (let ((p  (point 3 4))
        (p2 (struct-set p 'x 10)))
    (list (struct-get p  'x)         ; → 3   (unchanged)
          (struct-get p2 'x))))      ; → 10`,
                                language: 'menai',
                                caption: 'Functional update with struct-set'
                            }),
                            CodeFragment.create({
                                code: `; Type predicates
(let ((point (struct (x y)))
      (Vec   (struct (x y))))        ; same fields, different types
  (let ((p (point 1 2))
        (v (Vec   1 2)))
    (list (struct?       p)          ; → #t  (any struct)
          (struct-type? point p)     ; → #t  (specifically a point)
          (struct-type? Vec   p)     ; → #f  (not a Vec — nominal typing)
          (struct=? p (point 1 2))   ; → #t
          (struct=? p v))))          ; → #f  (different types)`,
                                language: 'menai',
                                caption: 'Type predicates and nominal typing'
                            }),
                            CodeFragment.create({
                                code: `; Introspection
(let ((point (struct (x y))))
  (let ((p (point 3 4)))
    (list (struct-type-name point)   ; → "point"
          (struct-fields point)      ; → ('x 'y)
          (struct-type p))))         ; → point (the struct-type value itself)`,
                                language: 'menai',
                                caption: 'Struct introspection'
                            }),
                            CodeFragment.create({
                                code: `; Pattern matching — destructuring form binds fields directly
(let ((shape (struct (kind radius))))
  (let ((s (shape "circle" 5)))
    (match s
      ((shape k r) (string-concat k ": r=" (integer->string r)))
      (_           "unknown"))))     ; → "circle: r=5"`,
                                language: 'menai',
                                caption: 'Pattern matching with struct destructuring'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Pattern matching'),
                            h('p', {},
                                'Menai provides powerful pattern matching with the ',
                                h('code', {}, 'match'),
                                ' expression. Predicate patterns use the ',
                                h('code', {}, '(? pred var)'),
                                ' form; any predicate, including user-defined ones, can be used:'
                            ),
                            CodeFragment.create({
                                code: `; Literal patterns
(match 42
  (42 "found the answer")
  (0  "zero")
  (_  "other"))                       ; → "found the answer"

; Predicate patterns — (? pred var)
(match "hello"
  ((? integer? n) (integer* n 2))
  ((? string? s)  (string-upcase s))
  (_              "unknown"))         ; → "HELLO"

; List destructuring
(match (list 1 2 3)
  (()        "empty")
  ((x)       "singleton")
  ((a b c)   (integer+ a b c))
  (_         "other"))                ; → 6

; Head/tail split
(match (list 1 2 3 4)
  ((head . tail) (list head (list-length tail))))
; → (1 3)

; Nested patterns
(match (list 5 "hello")
  (((? integer? x) (? string? y))
    (list (integer* x 2) (string-upcase y)))
  (_ "no match"))                     ; → (10 "HELLO")

; None type in patterns
(match (dict-get my-dict "missing-key")
  (#none    "key was absent")
  ((? string? s) s))`,
                                language: 'menai',
                                caption: 'Pattern matching with literals, predicates, and destructuring'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Tail call optimization'),
                            h('p', {},
                                'Menai automatically optimizes tail calls, preventing stack overflow in deeply recursive functions:'
                            ),
                            CodeFragment.create({
                                code: `; Tail-recursive factorial (automatically optimized)
(letrec ((factorial (lambda (n acc)
                      (if (integer<=? n 1)
                          acc
                          (factorial (integer- n 1) (integer* n acc))))))
  (factorial 1000 1))                 ; Works with arbitrarily large numbers

; Mutual recursion is also optimized
(letrec ((is-even (lambda (n)
                    (if (integer=? n 0) #t (is-odd (integer- n 1)))))
         (is-odd  (lambda (n)
                    (if (integer=? n 0) #f (is-even (integer- n 1))))))
  (is-even 10000))                    ; → #t  no stack overflow`,
                                language: 'menai',
                                caption: 'Tail call optimization for recursive and mutually recursive functions'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Module system'),
                            h('p', {},
                                'Menai files can be imported as modules. A module is a ',
                                h('code', {}, '.menai'),
                                ' file that returns a value — typically a dict of functions. Modules are cached after ' +
                                'first load, and circular imports are detected and prevented.'
                            ),
                            CodeFragment.create({
                                code: `; math_utils.menai
(let ((square (lambda (x) (integer* x x)))
      (cube   (lambda (x) (integer* x (integer* x x)))))
  (dict
    "square" square
    "cube"   cube))`,
                                language: 'menai',
                                caption: 'A simple module (math_utils.menai)'
                            }),
                            CodeFragment.create({
                                code: `; Using the module
(let ((math (import "math_utils")))
  ((dict-get math "square") 5))       ; → 25`,
                                language: 'menai',
                                caption: 'Importing and using a module'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'More information'),
                            h('p', {},
                                'Menai is integrated within the ',
                                h('a', {href: '/projects/humbug'}, 'Humbug'),
                                ' project. You can find the source code and more information at:'
                            ),
                            h('ul', {},
                                h('li', {},
                                    'GitHub repository: ',
                                    h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                        'https://github.com/m6r-ai/humbug'
                                    )
                                ),
                                h('li', {},
                                    'The Menai implementation can be found in the ',
                                    h('code', {}, 'menai'),
                                    ' directory of the Humbug repository'
                                )
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
    'A compiled, pure functional programming language designed specifically for AI use, featuring an optimizing compiler and infinite-register virtual machine.',
    projectMenaiPage
);
