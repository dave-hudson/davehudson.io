import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2026_03_10(): VElement[] {
    return [
        h('p', {},
            'Today I had a conversation with Claude about something I\'ve been thinking about for a while: ' +
            'how to let Menai expressions talk to the tools around them without breaking the purity that ' +
            'makes Menai safe and useful in the first place.'
        )
    ];
}

function notesArticle_2026_03_10(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Sometimes we really need something imperative'),
            h('p', {},
                'Menai is a pure functional language.  It has no side effects, and no I/O.  That\'s a feature, not a bug.  It ' +
                'does, however, mean that every time I want to do something like "read a file, transform it, write the result", ' +
                'an AI needs to manually shuttle strings in and out of Menai expressions through its context. ' +
                'That\'s fine for one-off things but it burns tokens on purely mechanical work.'
            ),
            h('p', {},
                'The trick is to keep Menai pure, but give it imperative helpers at the boundary.  This is actually how ' +
                'all the Menai test programs work, it\'s just I\'d not formalized it.'
            ),
            h('p', {},
                'So here\'s the realization:'
            ),
            h('p', {},
                'Reads don\'t need any new Menai syntax at all.  Since Menai is homoiconic, I can just ' +
                'construct the expression with the data embedded as literals before handing it to the ' +
                'evaluator.  The pipeline runtime wraps the expression body in a ',
                h('code', {}, 'let'),
                ' binding that injects ' +
                'all the upstream values as a dict called ',
                h('code', {}, 'inputs'),
                ':'
            ),
            CodeFragment.create({
                code: `(let ((inputs (dict (list "content" "...file contents..."))))
  ; user expression body here, uses (dict-get inputs "content")
  ...)`,
                language: 'menai'
            }),
            h('p', {},
                'Writes need an output connector on the tool step side - a ',
                h('code', {}, 'value_from'),
                ' field that pulls ' +
                'a named key from a Menai step\'s output dict.  Menai just returns a dictionary.  The routing ' +
                'happens outside it.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Dictionary in, dictionary out'),
            h('p', {},
                'The natural interface for a Menai step turns out to be to receive a dict called ',
                h('code', {}, 'inputs'),
                ', ' +
                'return a dict.  Every Menai step in any pipeline has exactly the same contract.  Output ' +
                'values must be strings, and ',
                h('code', {}, '#none'),
                ' means "this output is absent" - useful for optional ' +
                'fanout without needing separate pipeline logic.'
            )
        ),
        h('section', {},
            h('h2', {}, 'The optimizer'),
            h('p', {},
                'Menai is pure so adjacent Menai steps can always be collapsed into one.  Importantly, this also ' +
                'opens up all sort of interesting optimization paths.  Combined passes should typically be faster ' +
                'than their individual components.'
            ),
            h('p', {},
                'The merged expression wraps the first step\'s expression in a ',
                h('code', {}, 'let*'),
                ' and rebinds ',
                h('code', {}, 'inputs'),
                ' for ' +
                'the second step from the intermediate result:'
            ),
            CodeFragment.create({
                code: `(let* ((_merged_step-a <step-a expression>)
       (inputs (dict (list "key" (dict-get _merged_step-a "key")))))
  <step-b expression>)`,
                language: 'menai'
            }),
            h('p', {},
                'This means pipeline authors can decompose logic as finely as makes sense without worrying ' +
                'about efficiency.  The runtime collapses it.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Building it standalone first'),
            h('p', {},
                'Rather than wire this into Humbug immediately, Claude and I built a standalone CLI tool under ' +
                h('code', {}, 'tools/pipeline'),
                '.  The tool implementations mirror the Humbug tool interfaces exactly so ' +
                'a future drop-in for Humbug should be straightforward.'
            ),
            h('p', {},
                'A ',
                h('code', {}, 'console'),
                ' tool handles stdout/stderr output, which is cleaner than magic filenames and ' +
                'works the same on all platforms.'
            ),
            h('p', {},
                'Test examples cover the main patterns: single input/output, multiple inputs to one Menai ' +
                'step, one Menai step fanning out to multiple tool steps, adjacent step collapsing, and ' +
                'mixed tool types (clock + filesystem) feeding a single Menai step.'
            )
        ),
        h('section', {},
            h('h2', {}, 'One thing the profiler immediately revealed'),
            h('p', {},
                'The first ',
                h('code', {}, '--profile'),
                ' run showed the Menai prelude loading dominates cold-start time - ' +
                'about 97% of it in a simple pipeline.  That\'s not a problem for now but it\'s an obvious ' +
                'target if pipelines are ever chained or run in batch.  This wasn\'t a huge surprise as the ' +
                'compiler startup involves compiling 940 lines of Menai code in the standard library.  As pipeline ' +
                'steps grow to do less trivial things, the relative weight will shift to the work in the ' +
                'pipeline.'
            ),
            h('p', {},
                'Also, when we combine pipeline steps then we only pay this cost once per combined action.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Auditability'),
            h('p', {},
                'The static declaration constraint - pipelines don\'t have dynamic topology, Menai handles ' +
                'any conditional logic in the values.  This keeps things simple and auditable.  You can read ' +
                'a pipeline JSON and understand exactly what it does without simulating execution.'
            ),
            h('p', {},
                'The safety model falls out naturally from the existing tool authorization flow.  Write ' +
                'operations prompt for confirmation exactly as they do in Humbug.  Menai\'s purity means ' +
                'there\'s nothing to authorize inside the expression itself.'
            )
        ),
        h('section', {},
            h('h2', {}, 'JSON parsing drives efficiency'),
            h('p', {},
                'Having done the pipeline work, I had Claude build me a couple of JSON parsers to test things. ' +
                'The first worked but wasn\'t tail recursive, so it would fail on, say, large strings.  The ' +
                'second one was tail recursive but Claude was having a very hard time debugging places where ' +
                'there were 11 or 12 closing parens in a row.'
            ),
            h('p', {},
                'The Menai compiler had quite a lot of support for backtracking to hint what was wrong in such ' +
                'cases, but in the case of over-closing it would flag the element that was closed rather than ' +
                'the place where the excess closing was happening.  Now it does both.  Immediately we fixed this, ' +
                'Claude suddenly went from floundering to immediately fixing the problem.  Good tools help!'
            ),
            h('p', {},
                'The JSOM parser got me thinking to compare a Python version with the Menai version.  It turns ' +
                'out they\'re not that different in size.  Obviously the Python one is currently faster, but this ' +
                'is a great benchmark.  A few hours later and we\'d discovered 2 compiler optimization passes ' +
                'that were no doing anything useful, and that all the fixed point iterations in the compiler ' +
                'pass manager were largely pointless too.'
            ),
            h('p', {},
                'We fixed a couple of implementation quirks elsewhere and now the compiler is about 30% faster!'
            ),
            CodeFragment.create({
                code: `; JSON parser module — iterative (explicit stack) implementation.
;
; Uses an explicit work stack to avoid call-stack overflow on deeply nested JSON.
; Each stack frame describes what to do when a sub-value is returned:
;   (list "array"  s acc)      - resume building an array after an element
;   (list "object" s d key)    - resume building an object after a value
;
; Exports: "parse" — takes a JSON string, returns the equivalent Menai value.
;   JSON objects    -> dict
;   JSON arrays     -> list
;   JSON strings    -> string
;   JSON integers   -> integer
;   JSON floats     -> float
;   JSON true/false -> #t / #f
;   JSON null       -> #none
; Raises a runtime error on malformed input.

(letrec (

  (skip-ws
   (lambda (s pos)
     (letrec ((loop (lambda (i)
                      (if (integer>=? i (string-length s))
                          i
                          (let ((ch (string-ref s i)))
                            (if (or (string=? ch " ")
                                    (or (string=? ch "\\t")
                                        (or (string=? ch "\\n")
                                            (string=? ch "\\r"))))
                                (loop (integer+ i 1))
                                i))))))
       (loop pos))))

  (is-digit?
   (lambda (ch)
     (and (string>=? ch "0") (string<=? ch "9"))))

  (parse-string-chars
   (lambda (s pos acc)
     (letrec ((loop (lambda (i a)
                      (if (integer>=? i (string-length s))
                          (error "Unterminated string literal")
                          (let ((ch (string-ref s i)))
                            (if (string=? ch "\\"")
                                (list (list->string (list-reverse a)) (integer+ i 1))
                                (if (string=? ch "\\\\")
                                    (if (integer>=? (integer+ i 1) (string-length s))
                                        (error "Unterminated escape sequence")
                                        (let ((esc (string-ref s (integer+ i 1))))
                                          (let ((unescaped
                                                 (match esc
                                                   ("\\"" "\\"") ("\\\\" "\\\\") ("/" "/")
                                                   ("b" "\\u0008") ("f" "\\u000c")
                                                   ("n" "\\n") ("r" "\\r") ("t" "\\t")
                                                   (_ #none))))
                                            (if (none? unescaped)
                                                (error "Unknown escape sequence in string")
                                                (loop (integer+ i 2) (list-prepend a unescaped))))))
                                    (loop (integer+ i 1) (list-prepend a ch)))))))))
       (loop pos acc))))

  (scan-number-end
   (lambda (s i len)
     (letrec ((loop (lambda (j)
                      (if (integer>=? j len)
                          j
                          (let ((ch (string-ref s j)))
                            (if (or (string=? ch "-")
                                    (or (string=? ch "+")
                                        (or (string=? ch ".")
                                            (or (string=? ch "e")
                                                (or (string=? ch "E")
                                                    (is-digit? ch))))))
                                (loop (integer+ j 1))
                                j))))))
       (loop i))))

  (parse-number
   (lambda (s pos)
     (let ((end (scan-number-end s pos (string-length s))))
       (let ((num-str (string-slice s pos end)))
         (let ((n (string->number num-str)))
           (if (none? n)
               (error "Invalid number literal in JSON")
               (list n end)))))))

  (parse-keyword
   (lambda (s pos kw val)
     (let ((klen (string-length kw)))
       (if (integer>? (integer+ pos klen) (string-length s))
           (error "Unexpected end of input reading keyword")
           (if (string=? (string-slice s pos (integer+ pos klen)) kw)
               (list val (integer+ pos klen))
               (error "Unrecognized keyword in JSON"))))))

  ; Called after a value is parsed. Applies the top stack frame, or returns
  ; the final value if the stack is empty.
  (resume
   (lambda (val pos stack)
     (if (list-null? stack)
         val
         (let ((frame (list-first stack))
               (rest-stack (list-rest stack)))
           (if (string=? (list-first frame) "array")
               ; Resume array: frame = ("array" s acc)
               (let ((s   (list-ref frame 1))
                     (acc (list-ref frame 2)))
                 (let ((pos2 (skip-ws s pos)))
                   (if (integer>=? pos2 (string-length s))
                       (error "Unterminated array")
                       (let ((ch (string-ref s pos2)))
                         (if (string=? ch "]")
                             (resume (list-append acc val) (integer+ pos2 1) rest-stack)
                             (if (string=? ch ",")
                                 (dispatch s (skip-ws s (integer+ pos2 1))
                                           (list-prepend rest-stack (list "array" s (list-append acc val))))
                                 (error "Expected , or ] in array")))))))
               ; Resume object: frame = ("object" s d key)
               (let ((s   (list-ref frame 1))
                     (d   (list-ref frame 2))
                     (key (list-ref frame 3)))
                 (let ((pos2 (skip-ws s pos)))
                   (if (integer>=? pos2 (string-length s))
                       (error "Unterminated object")
                       (let ((ch (string-ref s pos2)))
                         (if (string=? ch "}")
                             (resume (dict-set d key val) (integer+ pos2 1) rest-stack)
                             (if (string=? ch ",")
                                 (parse-object-key s (skip-ws s (integer+ pos2 1))
                                                   (dict-set d key val) rest-stack)
                                 (error "Expected , or } in object"))))))))))))

  ; Parse the next key:value pair in an object.
  (parse-object-key
   (lambda (s pos d stack)
     (if (integer>=? pos (string-length s))
         (error "Unterminated object")
         (if (string=? (string-ref s pos) "\\"")
             (let ((key-result (parse-string-chars s (integer+ pos 1) (list))))
               (let ((key  (list-first key-result))
                     (pos2 (skip-ws s (list-ref key-result 1))))
                 (if (integer>=? pos2 (string-length s))
                     (error "Expected : after object key")
                     (if (string=? (string-ref s pos2) ":")
                         (dispatch s (skip-ws s (integer+ pos2 1))
                                   (list-prepend stack (list "object" s d key)))
                         (error "Expected : after object key")))))
             (error "Expected string key in object")))))

  ; Dispatch: inspect the character at pos and begin parsing the appropriate value.
  ; Always tail-calls resume (for scalars) or itself/parse-object-key (for containers).
  (dispatch
   (lambda (s pos stack)
     (let ((pos2 (skip-ws s pos)))
       (if (integer>=? pos2 (string-length s))
           (error "Unexpected end of JSON input")
           (let ((ch (string-ref s pos2)))
             (if (string=? ch "{")
                 (let ((pos3 (skip-ws s (integer+ pos2 1))))
                   (if (integer>=? pos3 (string-length s))
                       (error "Unterminated object")
                       (if (string=? (string-ref s pos3) "}")
                           (resume (dict) (integer+ pos3 1) stack)
                           (parse-object-key s pos3 (dict) stack))))
                 (if (string=? ch "[")
                     (let ((pos3 (skip-ws s (integer+ pos2 1))))
                       (if (integer>=? pos3 (string-length s))
                           (error "Unterminated array")
                           (if (string=? (string-ref s pos3) "]")
                               (resume (list) (integer+ pos3 1) stack)
                               (dispatch s pos3 (list-prepend stack (list "array" s (list)))))))
                     (let ((scalar-result
                            (if (string=? ch "\\"")
                                (parse-string-chars s (integer+ pos2 1) (list))
                                (if (string=? ch "t")
                                    (parse-keyword s pos2 "true" #t)
                                    (if (string=? ch "f")
                                        (parse-keyword s pos2 "false" #f)
                                        (if (string=? ch "n")
                                            (parse-keyword s pos2 "null" #none)
                                            (if (or (string=? ch "-") (is-digit? ch))
                                                (parse-number s pos2)
                                               (error "Unexpected character in JSON"))))))))
                        (resume (list-first scalar-result) (list-ref scalar-result 1) stack))))))))))

; letrec body:
(dict
  (list "parse"
        (lambda (json-string)
           (dispatch json-string 0 (list))))))`,
                language: 'menai'
            }),
            CodeFragment.create({
                code: `"""Pure Python JSON parser using an explicit stack — mirrors the Menai implementation.

Parses a JSON string into Python native types:
  JSON object  -> dict
  JSON array   -> list
  JSON string  -> str
  JSON integer -> int
  JSON float   -> float
  JSON true    -> True
  JSON false   -> False
  JSON null    -> None

Raises ValueError on malformed input.
"""


def parse(s: str) -> object:
    """Parse a JSON string and return the equivalent Python value."""
    value, pos = _dispatch(s, 0, [])
    pos = _skip_ws(s, pos)
    if pos != len(s):
        raise ValueError(f"Unexpected trailing content at position {pos}: {s[pos:pos+20]!r}")

    return value


# ---------------------------------------------------------------------------
# Whitespace
# ---------------------------------------------------------------------------

def _skip_ws(s: str, pos: int) -> int:
    while pos < len(s) and s[pos] in ' \\t\\n\\r':
        pos += 1

    return pos


# ---------------------------------------------------------------------------
# Scalars
# ---------------------------------------------------------------------------

def _parse_string(s: str, pos: int) -> tuple[str, int]:
    """Parse a JSON string starting just after the opening quote."""
    chars: list[str] = []
    length = len(s)

    while pos < length:
        ch = s[pos]
        if ch == '"':
            return ''.join(chars), pos + 1

        if ch == '\\\\':
            if pos + 1 >= length:
                raise ValueError("Unterminated escape sequence")

            esc = s[pos + 1]
            unescaped = {
                '"': '"', '\\\\': '\\\\', '/': '/',
                'b': '\\b', 'f': '\\f', 'n': '\\n', 'r': '\\r', 't': '\\t',
            }.get(esc)

            if unescaped is None:
                if esc == 'u':
                    if pos + 5 >= length:
                        raise ValueError("Incomplete \\\\uXXXX escape")

                    hex_str = s[pos + 2:pos + 6]
                    try:
                        unescaped = chr(int(hex_str, 16))
                    except ValueError:
                        raise ValueError(f"Invalid \\\\uXXXX escape: {hex_str!r}")

                    chars.append(unescaped)
                    pos += 6
                    continue

                raise ValueError(f"Unknown escape sequence: \\\\{esc}")

            chars.append(unescaped)
            pos += 2

        else:
            chars.append(ch)
            pos += 1

    raise ValueError("Unterminated string literal")


def _parse_number(s: str, pos: int) -> tuple[int | float, int]:
    """Parse a JSON number."""
    end = pos
    length = len(s)

    while end < length and s[end] in '-+.eE0123456789':
        end += 1

    num_str = s[pos:end]

    try:
        if '.' in num_str or 'e' in num_str or 'E' in num_str:
            return float(num_str), end

        return int(num_str), end

    except ValueError:
        raise ValueError(f"Invalid number literal: {num_str!r}")


def _parse_keyword(s: str, pos: int, kw: str, val: object) -> tuple[object, int]:
    """Parse a keyword literal (true, false, null)."""
    end = pos + len(kw)
    if end > len(s):
        raise ValueError(f"Unexpected end of input reading '{kw}'")

    if s[pos:end] != kw:
        raise ValueError(f"Unrecognized keyword at position {pos}: {s[pos:pos+10]!r}")

    return val, end


# ---------------------------------------------------------------------------
# Explicit-stack trampoline
# ---------------------------------------------------------------------------
# Each stack frame is a tuple describing what to do when a sub-value completes:
#   ("array",  s, acc)       - resume building an array
#   ("object", s, d, key)    - resume building an object

def _resume(val: object, pos: int, stack: list) -> tuple[object, int]:
    """Apply the top stack frame with the completed value, or return if stack empty."""
    while stack:
        frame = stack[-1]

        if frame[0] == "array":
            _, s, acc = frame
            acc.append(val)
            pos = _skip_ws(s, pos)

            if pos >= len(s):
                raise ValueError("Unterminated array")

            ch = s[pos]
            if ch == ']':
                stack.pop()
                val = acc
                pos += 1
                continue

            if ch == ',':
                stack[-1] = ("array", s, acc)
                return _dispatch(s, _skip_ws(s, pos + 1), stack)

            raise ValueError(f"Expected ',' or ']' in array, got {ch!r} at position {pos}")

        else:  # "object"
            _, s, d, key = frame
            d[key] = val
            pos = _skip_ws(s, pos)

            if pos >= len(s):
                raise ValueError("Unterminated object")

            ch = s[pos]
            if ch == '}':
                stack.pop()
                val = d
                pos += 1
                continue

            if ch == ',':
                stack.pop()
                return _parse_object_key(s, _skip_ws(s, pos + 1), d, stack)

            raise ValueError(f"Expected ',' or '}}' in object, got {ch!r} at position {pos}")

    return val, pos


def _parse_object_key(s: str, pos: int, d: dict, stack: list) -> tuple[object, int]:
    """Parse the next key:value pair in an object."""
    if pos >= len(s):
        raise ValueError("Unterminated object")

    if s[pos] != '"':
        raise ValueError(f"Expected string key in object, got {s[pos]!r} at position {pos}")

    key, pos = _parse_string(s, pos + 1)
    pos = _skip_ws(s, pos)

    if pos >= len(s) or s[pos] != ':':
        raise ValueError(f"Expected ':' after object key at position {pos}")

    stack.append(("object", s, d, key))
    return _dispatch(s, _skip_ws(s, pos + 1), stack)


def _dispatch(s: str, pos: int, stack: list) -> tuple[object, int]:
    """Inspect the character at pos and begin parsing the appropriate value."""
    pos = _skip_ws(s, pos)

    if pos >= len(s):
        raise ValueError("Unexpected end of JSON input")

    ch = s[pos]

    if ch == '{':
        pos = _skip_ws(s, pos + 1)
        if pos >= len(s):
            raise ValueError("Unterminated object")

        if s[pos] == '}':
            return _resume({}, pos + 1, stack)

        return _parse_object_key(s, pos, {}, stack)

    if ch == '[':
        pos = _skip_ws(s, pos + 1)
        if pos >= len(s):
            raise ValueError("Unterminated array")

        if s[pos] == ']':
            return _resume([], pos + 1, stack)

        stack.append(("array", s, []))
        return _dispatch(s, pos, stack)

    if ch == '"':
        val, pos = _parse_string(s, pos + 1)
        return _resume(val, pos, stack)

    if ch == 't':
        val, pos = _parse_keyword(s, pos, 'true', True)
        return _resume(val, pos, stack)

    if ch == 'f':
        val, pos = _parse_keyword(s, pos, 'false', False)
        return _resume(val, pos, stack)

    if ch == 'n':
        val, pos = _parse_keyword(s, pos, 'null', None)
        return _resume(val, pos, stack)

    if ch == '-' or ch.isdigit():
        val, pos = _parse_number(s, pos)
        return _resume(val, pos, stack)

    raise ValueError(f"Unexpected character {ch!r} at position {pos}")`,
                language: 'python'
            })
        )
    ];
}

export const notesPost_2026_03_10 = new NotesPost(
    '2026-03-10: Connecting Menai to the world with pipelines',
    '2026-03-10',
    '/notes/2026-03-10',
    'How Menai pipelines connect pure functional expressions to imperative tools, with an optimizer that collapses adjacent steps and a JSON parser benchmark that drove a 30% compiler speedup.',
    null,
    null,
    notesOpening_2026_03_10,
    notesArticle_2026_03_10,
    null
);
