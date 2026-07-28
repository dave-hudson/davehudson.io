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
                            'Menai is a pure functional programming language designed specifically for use ' +
                            'by an AI rather than a human.  Of course, Humans can use it too!'
                        ),
                        h('p', {},
                            'As a pure functional language, it makes a conscious decision to forgo regular I/O operations, so ' +
                            'it\'s always safe for an AI to use without having to worry about many potential security problems or operating risks.'
                        ),
                        h('p', {},
                            'Being pure doesn\'t mean Menai can\'t do real-world work, it just means I/O sits ' +
                            'in a framework outside of the language and that framework invokes it do pure computations.  Within the project there are a number of ' +
                            'examples of this.  What the purity does ensure is there\'s a very clean boundary between stateless and ' +
                            'stateful activities.'
                        ),
                        h('p', {},
                            'Within an AI tool framework, the AI becomes responsible for marshalling I/O, leaving Menai to do the ' +
                            'the computational work.'
                        ),
                        h('p', {},
                            'Menai is named after the Menai Strait, and one of my favourite pieces of civil engineering: the Menai ' +
                            'Bridge.  I also rather liked that Menai ends with "ai" :-)'
                        ),
                        h('p', {},
                            'The language started life as ',
                            h('a', {href: '/notes/2025-09-17'}, 'AIFPL (AI Functional Programming Language)'),
                            ' in September 2025, as part of ' +
                            'the ',
                            h('a', {href: '/projects/humbug'}, 'Humbug'),
                            ' project, but was ',
                            h('a', {href: '/notes/2026-02-28'}, 'renamed to Menai in February 2026'),
                            ', and then extracted into its own separate repository at ',
                            h('a', {href: 'https://github.com/m6r-ai/menai', target: '_blank'}, 'github.com/m6r-ai/menai'),
                            '.  It has zero dependencies on Humbug (or any other external package) and is consumed by ' +
                            'Humbug as an external dependency.'
                        ),
                        h('section', {},
                            h('h2', {}, 'Language design principles'),
                            h('p', {},
                                'Menai has Lisp/Scheme-inspired syntax, and while it has a number of things that will be familiar to ' +
                                'Lisp/Scheme users, it isn\'t yet another Lisp/Scheme variant.'
                            ),
                            h('ol', {},
                                h('li', {}, h('strong', {}, 'Pure functional'), ': No side effects, no mutation, immutable data throughout'),
                                h('li', {}, h('strong', {}, 'Compiled'), ': Source is compiled through multiple IR stages to bytecode before execution'),
                                h('li', {}, h('strong', {}, 'Strict type system'), ': Operations are type-specific with no implicit coercion between types'),
                                h('li', {}, h('strong', {}, 'First-class functions'), ': Lambda expressions, closures, and higher-order functions'),
                                h('li', {}, h('strong', {}, 'Lexical scoping'), ': Variables are resolved in their definition environment'),
                                h('li', {}, h('strong', {}, 'Tail call optimization'), ': Recursive patterns are automatically optimized'),
                                h('li', {}, h('strong', {}, 'Homoiconicity'), ': Code and data share the same s-expression representation'),
                                h('li', {}, h('strong', {}, 'Pattern matching'), ': Declarative branching with destructuring and predicate patterns'),
                                h('li', {}, h('strong', {}, 'Module system'), ': Write and import ', h('code', {}, '.menai'), ' files, cached after first load'),
                                h('li', {}, h('strong', {}, 'Rich error messages'), ': Detailed diagnostics with position information, critical when AIs generate code on the fly'),
                                h('li', {}, h('strong', {}, 'Independence'), ': Zero dependencies on external packages, including Humbug'),
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Type system'),
                            h('p', {},
                                'Menai has a strict, runtime-checked type system. All operations are type-specific — there are ' +
                                'no generic arithmetic or comparison operators. The types are:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'Integer'), ': Arbitrary-precision integers'),
                                h('li', {}, h('strong', {}, 'Float'), ': IEEE 754 64-bit floating-point numbers'),
                                h('li', {}, h('strong', {}, 'Complex'), ': IEEE 754 64-bit floating-point complex numbers)'),
                                h('li', {}, h('strong', {}, 'String'), ': Immutable Unicode strings'),
                                h('li', {}, h('strong', {}, 'Boolean'), ': ', h('code', {}, '#t'), ' and ', h('code', {}, '#f'),
                                    ' (no implicit "truthiness" — conditions must be boolean)'),
                                h('li', {}, h('strong', {}, 'Bytes'), ': Immutable byte sequences'),
                                h('li', {}, h('strong', {}, 'Symbol'), ': Used for symbolic programming and as dict keys'),
                                h('li', {}, h('strong', {}, 'Function'), ': First-class lambda functions with lexical scoping'),
                                h('li', {}, h('strong', {}, 'None'), ': ', h('code', {}, '#none'),
                                    ' — an explicit absence-of-value type, distinct from ', h('code', {}, '#f')),
                                h('li', {}, h('strong', {}, 'List'), ': Heterogeneous, immutable, ordered collections'),
                                h('li', {}, h('strong', {}, 'Dict'), ': Immutable key-value mappings with O(1) lookup, maintaining insertion order'),
                                h('li', {}, h('strong', {}, 'Set'), ': Immutable unordered collections of unique hashable values with O(1) membership testing'),
                                h('li', {}, h('strong', {}, 'Structtype'), ': Type descriptors used to create and identify `struct` objects'),
                                h('li', {}, h('strong', {}, 'Struct'), ': Nominal typed records (of a `structtype`) with named fields'),
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

; Complex arithmetic
(complex+ 1+2j 3+4j)                  ; → 4+6j
(complex* 2+0j 3+4j)                  ; → 6+8j
(complex-abs 3+4j)                    ; → 5.0
(complex-sqrt -1+0j)                  ; → 1j

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
      (custom (dict "timeout" 60)))
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
                                'testing. Valid element types are strings, integers, floats, complex numbers, booleans, ' +
                                'symbols, bytes, structtypes, and structs with hashable fields — lists, dicts, functions, ' +
                                'and ', h('code', {}, '#none'),
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
(set-union (set 1 2 3) (set 3 4 5))         ; → #{1 2 3 4 5}
(set-intersection (set 1 2 3) (set 2 3 4))  ; → #{2 3}
(set-difference (set 1 2 3) (set 2 3 4))    ; → #{1}

; Subset test
(set-subset? (set 1 2) (set 1 2 3))   ; → #t
(set-subset? (set 1 4) (set 1 2 3))   ; → #f

; Conversion
(set->list (set 3 1 2))               ; → (3 1 2)  insertion order
(list->set (list 1 2 2 3 3))          ; → #{1 2 3}

; Higher-order operations
(map-set (lambda (x) (integer* x 2)) (set 1 2 3))
; → #{2 4 6}

(filter-set (lambda (x) (integer>? x 1)) (set 1 2 3))
; → #{2 3}

(fold-set integer+ 0 (set 1 2 3))
; → 6`,
                                language: 'menai',
                                caption: 'Set construction, membership, algebra, and higher-order operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Bytes'),
                            h('p', {},
                                'Bytes are immutable sequences of byte values (0–255).  They have no literal syntax and ' +
                                'are created via construction functions.  Bytes are particularly useful for binary ' +
                                'data parsing, with support for multi-byte integer read/write and LEB128 variable-length ' +
                                'integer encoding:'
                            ),
                            CodeFragment.create({
                                code: `; Construction
(string->bytes "hello")               ; → UTF-8 encoded bytes
(string-hex->bytes "504b")            ; → bytes from hex string
(list->bytes (list 80 75))            ; → bytes from integer list

; Conversion
(bytes->string (string->bytes "x"))   ; → "x"
(bytes->string-hex (list->bytes (list 255)))  ; → "ff"
(bytes->list (string->bytes "AB"))    ; → (65 66)

; Access and slicing
(bytes-ref (string->bytes "hello") 1) ; → 101  (byte value for 'e')
(bytes-length (string->bytes "hi"))   ; → 2
(bytes-slice (string->bytes "hello") 1 4)  ; → 3 bytes
(bytes-concat (list->bytes (list 1)) (list->bytes (list 2)))  ; → 2 bytes

; Multi-byte integer reads (little-endian and big-endian)
(bytes-read-u16-le (string-hex->bytes "0100") 0)   ; → 1
(bytes-read-u16-be (string-hex->bytes "0001") 0)   ; → 1
(bytes-read-i32-le (string-hex->bytes "00000001") 0)  ; → 16777216

; Multi-byte integer appends (returns new bytes)
(bytes-append-u16-le (string->bytes "") 300)  ; → 2 bytes

; LEB128 variable-length integers
(bytes-read-uleb128 (string-hex->bytes "e807") 0)   ; → (1000 2)
(bytes-append-uleb128 (string->bytes "") 1000)      ; → LEB128 encoded

; Higher-order operations
(map-bytes (lambda (b) (integer+ b 1)) (list->bytes (list 0 1 2)))
; → bytes with values 1, 2, 3
(filter-bytes (lambda (b) (integer<? b 2)) (list->bytes (list 0 1 2 3)))
; → bytes with values 0, 1`,
                                language: 'menai',
                                caption: 'Bytes construction, multi-byte integers, LEB128, and higher-order operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Structs'),
                            h('p', {},
                                'Structs are nominal typed records with named fields.  The ',
                                h('code', {}, '(struct (fields))'),
                                ' form produces a ',
                                h('strong', {}, 'structtype'),
                                ' value — a callable type descriptor.  Calling it with field values creates a ' +
                                'struct instance.  Two struct types that happen to have the same fields are still ' +
                                'distinct types — the type identity comes from the binding name, not the field list.'
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
                                code: `; Type predicates — nominal typing
(let ((point (struct (x y)))
      (vec (struct (x y))))          ; same fields, different types
  (let ((p (point 1 2))
        (v (vec 1 2)))
    (list (struct? p)                     ; → #t  (any struct)
          (struct-is-instance? p point)   ; → #t  (specifically a point)
          (struct-is-instance? p vec)     ; → #f  (not a vec — nominal typing)
          (struct=? p (point 1 2))        ; → #t
          (struct=? p v))))               ; → #f  (different types)`,
                                language: 'menai',
                                caption: 'Type predicates and nominal typing'
                            }),
                            CodeFragment.create({
                                code: `; Structtype introspection
(let ((point (struct (x y))))
  (list (structtype? point)          ; → #t  (it's a structtype value)
        (structtype-name point)      ; → "point"
        (structtype-fields point)    ; → (x y)  list of field symbols
        (structtype? (point 1 2)))   ; → #f  (instance, not type)`,
                                language: 'menai',
                                caption: 'Structtype introspection'
                            }),
                            CodeFragment.create({
                                code: `; Struct instance introspection
(let ((point (struct (x y))))
  (let ((p (point 3 4)))
    (list (struct-ref p 0)           ; → 3  (field by index)
          (struct-type p)            ; → point (the structtype value itself)
          (structtype-name (struct-type p)))))  ; → "point"`,
                                language: 'menai',
                                caption: 'Struct instance introspection'
                            }),
                            CodeFragment.create({
                                code: `; Pattern matching — destructuring form binds fields directly
(let ((shape (struct (kind radius))))
  (let ((s (shape "circle" 5)))
    (match s
      ((shape k r) (string-concat k ": r=" (integer->string r)))
      (_ "unknown"))))                 ; → "circle: r=5"`,
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
                                ' form and any predicate, including user-defined ones, can be used:'
                            ),
                            CodeFragment.create({
                                code: `; Literal patterns
(match 42
  (42 "found the answer")
  (0 "zero")
  (_ "other"))                        ; → "found the answer"

; Predicate patterns — (? pred var)
(match "hello"
  ((? integer? n) (integer* n 2))
  ((? string? s)  (string-upcase s))
  (_ "unknown"))                      ; → "HELLO"

; List destructuring
(match (list 1 2 3)
  (() "empty")
  ((x) "singleton")
  ((a b c) (integer+ a b c))
  (_ "other"))                        ; → 6

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
  (#none "key was absent")
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
                                ' file that returns a value — typically a dict of functions. Modules are compiled once ' +
                                'and cached after first load, and circular imports are detected and prevented.'
                            ),
                            CodeFragment.create({
                                code: `; math_utils.menai
(let ((square (lambda (x) (integer* x x)))
      (cube (lambda (x) (integer* x (integer* x x)))))
  (dict
    "square" square
    "cube" cube))`,
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
                            h('h2', {}, 'Compiler architecture'),
                            h('p', {},
                                'Menai features a custom optimizing compiler with a rich pipeline of internal representations, ' +
                                'each designed to enable a specific class of analysis or transformation.  Source code is ' +
                                'processed through the following stages:'
                            ),
                            h('ol', {},
                                h('li', {},
                                    h('strong', {}, 'Lexing and parsing'),
                                    ': Source text is tokenized and parsed into an initial abstract syntax tree.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Abstract Syntax Tree (AST)'),
                                    ': Semantic analysis is applied to resolve names, check types, and validate the program.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Module resolution'),
                                    ': Imported modules are resolved, partially compiled, and cached, enabling cross-module ' +
                                    'optimizations.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Desugaring and constant folding'),
                                    ': Syntactic sugar is eliminated and constant expressions are evaluated at ' +
                                    'compile time.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Intermediate Representation (IR)'),
                                    ': A tree-based IR is used for high-level optimizations such as inlining, copy ' +
                                    'propagation, dead binding elimination, and branch constant propagation.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'SSA Control Flow Graph (CFG)'),
                                    ': A Static Single Assignment form control flow graph is used for dataflow analysis, ' +
                                    'phi chain collapsing, and peephole optimization.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Virtual Code (VCode)'),
                                    ': A low-level, architecture-neutral representation is used for final code shaping.'
                                ),
                                h('li', {},
                                    h('strong', {}, 'Bytecode'),
                                    ': The final bytecode output is executed by the Menai virtual machine.'
                                )
                            ),
                            h('p', {},
                                'The compiler prioritises inexpensive optimization passes. The goal is to generate very high ' +
                                'quality bytecode very quickly, rather than spending unbounded time on exhaustive analysis. ' +
                                'This makes Menai well suited to the short-lived, on-demand evaluation tasks that AI agents ' +
                                'typically perform.'
                            ),
                        ),
                        h('section', {},
                            h('h2', {}, 'Virtual machine'),
                            h('p', {},
                                'The Menai virtual machine uses an infinite register architecture. ' +
                                'Unlike stack-based VMs, each temporary value is assigned its own virtual register, which ' +
                                'simplifies code generation and makes many optimization passes more straightforward. The VM ' +
                                'executes the bytecode produced by the compiler directly.'
                            ),
                            h('p', {},
                                'The primary execution engine is a register-based C VM ',
                                'compiled from C source and loaded at runtime.  Pre-built binaries are available via ' +
                                'GitHub Releases for Linux, macOS, and Windows on x86_64 and ARM64, across Python 3.10–3.14.  ' +
                                'A pure Python fallback exists for when the C VM is not available.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Language bindings'),
                            h('p', {},
                                'The compiler is currently implemented in Python and there is Python logic that converts to/from ' +
                                'the Menai VM\'s internal data representation.  Over time it\'s anticipated that other language ' +
                                'bindings will be added.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'More information'),
                            h('p', {},
                                'Menai is now a standalone project, separate from Humbug. The source code, full language ' +
                                'manual, and pre-built VM binaries are available at:'
                            ),
                            h('ul', {},
                                h('li', {},
                                    'GitHub repository: ',
                                    h('a', {href: 'https://github.com/m6r-ai/menai', target: '_blank'},
                                        'https://github.com/m6r-ai/menai'
                                    )
                                ),
                                h('li', {},
                                    'Language manual: see the ',
                                    h('code', {}, 'docs/'),
                                    ' directory in the repository'
                                ),
                                h('li', {},
                                    'Pre-built C VM binaries: available on the ',
                                    h('a', {href: 'https://github.com/m6r-ai/menai/releases', target: '_blank'},
                                        'GitHub releases page'
                                    )
                                )
                            ),
                            h('p', {},
                                'Menai is also integrated within the ',
                                h('a', {href: '/projects/humbug'}, 'Humbug'),
                                ' project, where it is consumed as an external dependency to provide safe, ' +
                                'side-effect-free computation for AI agents.'
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
