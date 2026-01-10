import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

export function projectAIFPLPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'AIFPL (AI Functional Programming Language)',
                subtitle: 'A Lisp-inspired functional language designed for AI use'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'AIFPL is possibly one of the first programming languages designed specifically for use by an LLM rather than a human. ' +
                            'It\'s a Lisp-inspired, higher-order, pure functional language, making a conscious decision to forgo regular I/O operations ' +
                            'to ensure it is always safe for an AI to use, without having to worry about potential security problems.'
                        ),
                        h('p', {},
                            'While the functional style can be quite challenging for human developers, LLMs are surprisingly adept with this type of ' +
                            'software development.'
                        ),
                        h('p', {},
                            'The language was designed from scratch, so while it draws a lot of inspiration from Lisp, it also has some key differences.'
                        ),
                        h('p', {},
                            'The code is currently integrated within ',
                            h('a', {href: '/projects/humbug'}, 'Humbug'),
                            ' but is designed to stand alone. It is implemented in Python, but has no dependencies other than the Python standard library.'
                        ),
                        h('section', {},
                            h('h2', {}, 'Architecture and design principles'),
                            h('ol', {},
                                h('li', {}, h('strong', {}, 'Pure List Representation'), ': Everything is data, following traditional Lisp philosophy'),
                                h('li', {}, h('strong', {}, 'Functional Programming'), ': First-class functions, immutable data, no side effects'),
                                h('li', {}, h('strong', {}, 'Lexical Scoping'), ': Variables resolved in their definition environment'),
                                h('li', {}, h('strong', {}, 'Tail Call Optimization'), ': Automatic optimization for recursive patterns'),
                                h('li', {}, h('strong', {}, 'Type Safety'), ': Comprehensive type hints and strict type checking'),
                                h('li', {}, h('strong', {}, 'Error Handling'), ': Detailed error messages with position information'),
                                h('li', {}, h('strong', {}, 'Performance'), ': Efficient evaluation with automatic optimizations'),
                                h('li', {}, h('strong', {}, 'Lists not cons cells'), ': Lists are first-class citizens, and there is no separate cons cell type'),
                                h('li', {}, h('strong', {}, 'Lisp Compatibility'), ': Following traditional Lisp semantics where applicable'),
                                h('li', {}, h('strong', {}, 'Lazy Evaluation'), ': Conditionals and boolean operators use lazy evaluation'),
                                h('li', {}, h('strong', {}, 'Independence'), ': No dependencies on external packages'),
                                h('li', {}, h('strong', {}, 'Simplicity'), ': Direct S-expression evaluation without over-engineering'),
                                h('li', {}, h('strong', {}, 'Homoiconicity'), ': Code and data use identical representations'),
                                h('li', {}, h('strong', {}, 'No special AST nodes'), ': Lambda expressions, let expressions, and function calls are all just lists'),
                                h('li', {}, h('strong', {}, 'Syntactic Sugar'), ': Single quote shortcut provides convenient syntax while maintaining pure list representation')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Type system'),
                            h('p', {},
                                'AIFPL has a strict type system with the following types:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'Numbers'), ': int, float, complex (with automatic promotion)'),
                                h('li', {}, h('strong', {}, 'Strings'), ': UTF-8 strings with no automatic conversion'),
                                h('li', {}, h('strong', {}, 'Booleans'), ': #t and #f with no automatic conversion'),
                                h('li', {}, h('strong', {}, 'Lists'), ': Heterogeneous collections supporting any element type'),
                                h('li', {}, h('strong', {}, 'Alists'), ': Immutable key-value mappings with O(1) lookup performance'),
                                h('li', {}, h('strong', {}, 'Functions'), ': First-class lambda functions with lexical scoping')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Implementation'),
                            h('p', {},
                                'AIFPL has been implemented with the following considerations:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'Written in Python'), ': Easy to read and modify, with no external dependencies'),
                                h('li', {}, h('strong', {}, 'Correct by design'),
                                    ': AIs will rely on this language to implement ad-hoc sequences of logic, so correctness is paramount'
                                ),
                                h('li', {}, h('strong', {}, 'Thoroughly tested'),
                                    ': To help ensure correctness, AIFPL has extensive unit tests.  These cover 100% of all statements ' +
                                    'and branches in the codebase'
                                ),
                                h('li', {}, h('strong', {}, 'Optimization'),
                                    ': Performance is not the primary goal.  Optimization work is being deferred until more data on usage emerges.'
                                ),
                                h('li', {}, h('strong', {}, 'Runtime error handling'),
                                    ': AIFPL provides detailed error messages with position information to help diagnose issues.  This is ' +
                                    'especially important when AIs are generating code on the fly.'
                                )
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Basic examples'),
                            h('h3', {}, 'Arithmetic operations'),
                            CodeFragment.create({
                                code: `; Basic arithmetic
(+ 1 2 3)                             ; → 6
(- 10 3)                              ; → 7
(* 2 3 4)                             ; → 24
(/ 12 3)                              ; → 4
(// 7 3)                              ; → 2 (floor division)
(% 7 3)                               ; → 1 (modulo)
(** 2 3)                              ; → 8 (exponentiation)`,
                                language: 'aifpl',
                                caption: 'Basic arithmetic operations'
                            }),
                            h('h3', {}, 'Quote - data literals and code as data'),
                            CodeFragment.create({
                                code: `; Without quote - expression gets evaluated
(+ 1 2 3)                             ; → 6

; With quote - expression returned as data
(quote (+ 1 2 3))                     ; → (+ 1 2 3)
'(+ 1 2 3)                            ; → (+ 1 2 3) (shortcut form)

; Create lists as pure data
'(1 2 3)                              ; → (1 2 3)
'((a 1) (b 2) (c 3))                  ; → ((a 1) (b 2) (c 3))

; Mix quoted and unquoted in larger expressions
(list 'hello (+ 1 2) 'world)          ; → (hello 3 world)`,
                                language: 'aifpl',
                                caption: 'Quote special form for data literals'
                            }),
                            h('h3', {}, 'Lambda functions'),
                            CodeFragment.create({
                                code: `; Simple lambda functions
((lambda (x) (* x x)) 5)              ; → 25
((lambda (x y) (+ x y)) 3 4)          ; → 7

; Lambda functions as values
(let ((square (lambda (x) (* x x))))
  (square 6))                         ; → 36

; Higher-order function usage
(map (lambda (x) (* x x)) (list 1 2 3 4))  ; → (1 4 9 16)

; Closures capture their environment
(let ((multiplier 10))
  (let ((times-ten (lambda (x) (* x multiplier))))
    (times-ten 5)))                   ; → 50`,
                                language: 'aifpl',
                                caption: 'Lambda expressions and closures'
                            }),

                            h('h3', {}, 'List operations'),
                            CodeFragment.create({
                                code: `; List construction and manipulation
(list 1 2 3)                          ; → (1 2 3)
(list 1 "hello" #t)                   ; → (1 "hello" #t) [mixed types]
(cons 1 (list 2 3))                   ; → (1 2 3) [prepend]
(append (list 1 2) (list 3 4))        ; → (1 2 3 4) [concatenate]

; List access and properties
(first (list 1 2 3))                  ; → 1
(rest (list 1 2 3))                   ; → (2 3)
(length (list 1 2 3))                 ; → 3
(member? 2 (list 1 2 3))              ; → #t

; List utilities
(remove 2 (list 1 2 3 2 4))           ; → (1 3 4)
(position 2 (list 1 2 3))             ; → 1 (0-based index)`,
                                language: 'aifpl',
                                caption: 'List operations and utilities'
                            }),

                            h('h3', {}, 'Higher-order functions'),
                            CodeFragment.create({
                                code: `; Map - transform each element
(map (lambda (x) (* x 2)) (list 1 2 3 4))   ; → (2 4 6 8)

; Filter - select elements by predicate
(filter (lambda (x) (> x 0)) (list -1 2 -3 4))  ; → (2 4)

; Fold - accumulate results
(fold + 0 (list 1 2 3 4 5))                ; → 15

; Range - generate numeric sequences
(range 1 5)                                 ; → (1 2 3 4)
(range 0 10 2)                             ; → (0 2 4 6 8)

; Complex data processing pipeline
(let ((numbers (range 1 11)))
  (let ((evens (filter (lambda (x) (= (% x 2) 0)) numbers))
        (squared (map (lambda (x) (* x x)) evens))
        (sum (fold + 0 squared)))
    sum))                                   ; → 220`,
                                language: 'aifpl',
                                caption: 'Higher-order functional programming'
                            })
                        ),
                        h('section', {},
                            h('h3', {}, 'Type predicates'),
                            CodeFragment.create({
                                code: `; Basic type checking
(number? 42)                          ; → #t
(string? "hello")                     ; → #t
(boolean? #t)                         ; → #t
(list? (list 1 2 3))                  ; → #t
(alist? (alist ("key" "value")))      ; → #t
(function? (lambda (x) (* x 2)))      ; → #t

; Specific numeric type checking
(integer? 42)                         ; → #t
(float? 3.14)                         ; → #t
(complex? (+ 1 j))                    ; → #t

; Polymorphic operations with type checking
(let ((safe-process (lambda (value)
                      (if (number? value)
                          (* value value)
                          (if (string? value)
                              (string-upcase value)
                              "unknown type")))))
  (map safe-process (list 5 "hello" #t)))  ; → (25 "HELLO" "unknown type")`,
                                language: 'aifpl',
                                caption: 'Type predicates and type-safe programming'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'String operations'),
                            CodeFragment.create({
                                code: `; String construction and manipulation
(string-append "hello" " " "world")   ; → "hello world"
(string-length "hello")               ; → 5
(string-upcase "hello")               ; → "HELLO"
(string-downcase "HELLO")             ; → "hello"

; String searching and testing
(string-contains? "hello world" "world")  ; → #t
(string-prefix? "hello" "he")             ; → #t
(string-suffix? "hello" "lo")             ; → #t

; String-list conversion
(string->list "hello")                ; → ("h" "e" "l" "l" "o")
(list->string (list "h" "i"))         ; → "hi"

; String splitting and joining
(string-split "name,age,city" ",")    ; → ("name" "age" "city")
(string-join (list "hello" "world") " ")  ; → "hello world"

; Advanced text processing
(let ((clean-and-format (lambda (text)
                          (let ((trimmed (string-trim text))
                                (normalized (string-replace trimmed "  " " ")))
                            (string-upcase normalized)))))
  (clean-and-format "  hello    world  "))  ; → "HELLO  WORLD"`,
                                language: 'aifpl',
                                caption: 'Comprehensive string operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Complex numbers'),
                            CodeFragment.create({
                                code: `; Complex number construction
(complex 3 4)                         ; → (3+4j)
(+ 1 (* 2 j))                         ; → (1+2j)

; Extract real and imaginary parts
(real (complex 3 4))                  ; → 3
(imag (complex 3 4))                  ; → 4

; Works with all numeric types
(real 42)                             ; → 42
(imag 42)                             ; → 0
(real 3.14)                           ; → 3.14
(imag j)                              ; → 1

; Complex arithmetic
(+ (complex 1 2) (complex 3 4))       ; → (4+6j)
(* j j)                               ; → -1
(sqrt -1)                             ; → j`,
                                language: 'aifpl',
                                caption: 'Complex number operations'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Symbolic programming with quote'),
                            CodeFragment.create({
                                code: `; Manipulate code structure
(let ((expr '(+ a b c)))
  (first expr))                       ; → + (the operator symbol)

; Build expressions programmatically
(let ((op '+)
      (args '(1 2 3)))
  (cons op args))                     ; → (+ 1 2 3)

; Template-based code generation
(let ((make-adder (lambda (n)
                    (list 'lambda 
                         '(x) 
                         (list '+ 'x n)))))
  (make-adder 5))                     ; → (lambda (x) (+ x 5))

; Code transformation
(let ((transform-ops (lambda (expr)
                       (if (list? expr)
                           (map transform-ops expr)
                           (if (= expr '+)
                               '*
                               expr)))))
  (transform-ops '(+ 1 (+ 2 3))))     ; → (* 1 (* 2 3))`,
                                language: 'aifpl',
                                caption: 'Code as data - symbolic programming patterns'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Association lists (alists)'),
                            h('p', {},
                                'Alists provide efficient immutable key-value mappings, ideal for structured data processing:'
                            ),
                            CodeFragment.create({
                                code: `; Construction - alist is a special form that evaluates elements
(alist ("name" "Alice") ("age" 30) ("city" "NYC"))

; Access with default values
(let ((user (alist ("name" "Bob") ("id" 123))))
  (list (alist-get user "name")           ; → "Bob"
        (alist-get user "email" "N/A")))  ; → "N/A" (default)

; Modification (returns new alist)
(let ((data (alist ("x" 1) ("y" 2))))
  (let ((updated (alist-set data "z" 3))
        (removed (alist-remove data "x")))
    (list updated removed)))              ; → New alists with changes

; Query operations
(let ((config (alist ("debug" #t) ("port" 8080))))
  (list (alist-has? config "debug")       ; → #t
        (alist-keys config)                ; → ("debug" "port")
        (alist-values config)))            ; → (#t 8080)

; Merge alists (second wins on conflicts)
(let ((defaults (alist ("timeout" 30) ("retries" 3)))
      (custom (alist ("timeout" 60))))
  (alist-merge defaults custom))          ; → timeout is 60, retries is 3`,
                                language: 'aifpl',
                                caption: 'Basic alist operations'
                            }),
                            CodeFragment.create({
                                code: `; Nested alists for structured data
(let ((user (alist 
               ("name" "Alice")
               ("contact" (alist 
                           ("email" "alice@example.com")
                           ("phone" "555-1234")))
               ("preferences" (alist 
                              ("theme" "dark")
                              ("notifications" #t))))))
  (alist-get (alist-get user "contact") "email"))  ; → "alice@example.com"

; Processing alist data with functional operations
(let ((users (list 
               (alist ("name" "Alice") ("age" 30))
               (alist ("name" "Bob") ("age" 25))
               (alist ("name" "Charlie") ("age" 35)))))
  (let ((names (map (lambda (u) (alist-get u "name")) users))
        (adults (filter (lambda (u) (>= (alist-get u "age") 30)) users)))
    (list names (length adults))))        ; → (("Alice" "Bob" "Charlie") 2)

; Type checking and pattern matching
(let ((process (lambda (data)
                 (if (alist? data)
                     (alist-keys data)
                     "not an alist"))))
  (list (process (alist ("a" 1))) (process (list 1 2))))  ; → (("a") "not an alist")`,
                                language: 'aifpl',
                                caption: 'Advanced alist usage patterns'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Pattern matching'),
                            h('p', {},
                                'AIFPL provides powerful pattern matching with the match expression for declarative control flow:'
                            ),
                            CodeFragment.create({
                                code: `; Basic literal pattern matching
(match 42
  (42 "found answer")
  (0 "zero")
  (_ "other"))                        ; → "found answer"

; Type-based patterns with variable binding
(match "hello"
  ((number? n) (* n 2))
  ((string? s) (string-upcase s))
  (_ "unknown"))                      ; → "HELLO"

; List destructuring patterns
(match (list 1 2 3)
  (() "empty")
  ((x) "singleton")
  ((a b c) (+ a b c))
  (_ "other"))                        ; → 6

; List head/tail patterns
(match (list 1 2 3 4)
  ((head . tail) 
    (list head (length tail))))       ; → (1 3)`,
                                language: 'aifpl',
                                caption: 'Pattern matching basics'
                            }),
                            CodeFragment.create({
                                code: `; Nested pattern matching
(match (list 5 "hello")
  (((number? x) (string? y)) 
    (list (* x 2) (string-upcase y)))
  (_ "no match"))                     ; → (10 "HELLO")

; Pattern matching with alists
(match (alist ("type" "user") ("name" "Alice"))
  ((alist? a) (alist-get a "name"))
  (_ "not an alist"))                 ; → "Alice"

; Complex data processing with patterns
(let ((process-data (lambda (data)
                      (match data
                        (42 "answer")
                        ((number? n) (if (> n 0) "positive" "non-positive"))
                        ((string? s) (string-length s))
                        ((list? lst) (length lst))
                        ((alist? a) (alist-keys a))
                        (_ "unknown"))))
      (test-data (list 42 -5 "hello" (list 1 2 3) (alist ("x" 1)))))
  (map process-data test-data))       ; → ("answer" "non-positive" 5 3 ("x"))

; First match wins - order matters
(match 10
  ((number? n) "any number")
  (10 "ten specifically")
  (_ "other"))                        ; → "any number" (first pattern matches)`,
                                language: 'aifpl',
                                caption: 'Advanced pattern matching with alists and nested patterns'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'Advanced features'),

                            h('h3', {}, 'Tail call optimization'),
                            h('p', {},
                                'AIFPL automatically optimizes tail calls to prevent stack overflow in recursive functions:'
                            ),
                            CodeFragment.create({
                                code: `; Factorial with tail recursion (automatically optimized)
(let ((factorial (lambda (n acc)
                   (if (<= n 1)
                       acc
                       (factorial (- n 1) (* n acc))))))
  (factorial 1000 1))                 ; Works with large numbers

; Mutual recursion is also optimized
(let ((is-even (lambda (n)
                 (if (= n 0) #t (is-odd (- n 1)))))
      (is-odd (lambda (n)
                (if (= n 0) #f (is-even (- n 1))))))
  (is-even 10000))                    ; → #t (no stack overflow)`,
                                language: 'aifpl',
                                caption: 'Tail call optimization for recursive functions'
                            }),

                            h('h3', {}, 'Functional data processing'),
                            CodeFragment.create({
                                code: `; Multi-step data processing pipeline
(let ((numbers (range 1 21)))
  (let ((evens (filter (lambda (x) (= (% x 2) 0)) numbers))
        (squares (map (lambda (x) (* x x)) evens))
        (sum (fold + 0 squares)))
    sum))                             ; → 1540

; Text processing pipeline
(let ((text "The Quick Brown Fox"))
  (let ((words (string-split (string-downcase text) " "))
        (long-words (filter (lambda (w) (> (string-length w) 3)) words))
        (capitalized (map string-upcase long-words)))
    (string-join capitalized "-")))   ; → "QUICK-BROWN"

; Data validation and transformation
(let ((validate-and-double (lambda (nums)
                            (if (all? (lambda (x) (> x 0)) nums)
                                (map (lambda (x) (* x 2)) nums)
                                "error: negative numbers"))))
  (list (validate-and-double (list 1 2 3))
        (validate-and-double (list 1 -2 3))))  ; → ((2 4 6) "error: negative numbers")`,
                                language: 'aifpl',
                                caption: 'Complex functional data processing patterns'
                            })
                        ),
                        h('section', {},
                            h('h2', {}, 'More information'),
                            h('p', {},
                                'AIFPL is currently integrated within the ',
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
                                    'The AIFPL implementation can be found in the ',
                                    h('code', {}, 'aifpl'),
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

export const projectAIFPL = new ProjectPage(
    'AIFPL',
    '/projects/aifpl',
    'A Lisp-inspired functional programming language designed specifically for AI use.',
    projectAIFPLPage
);
