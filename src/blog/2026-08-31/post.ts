import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments';
import {BlogPost} from '../BlogPost';

function blogOpening_2026_08_31(): VElement[] {
    return [
        h('p', {},
            'In September 2025, Claude Sonnet and I started designing and building a programming language with the idea that it could ' +
            'be used safely by AIs to perform deterministic operations in agentic workflows.'
        ),
        h('p', {},
            'The key element of this was "safely".'
        ),
        h('p', {},
            'Anyone who has ever watched Large Language Model (LLM) AIs write Python scripts will have likely seen cases of them ' +
            'unintentionally wandering into the realms of doing something dangerous because of some unintended side-effect. ' +
            'Enabling a general purpose capability to execute Python code also exposed risks from prompt injections, with bad ' +
            'behaviour being intentional instead of accidental.'
        ),
        h('p', {},
            'The core idea behind the language was that being "safe" meant not allowing the language to do any I/O operations. ' +
            'Any I/O or stateful operations would have to be invoked by something outside of it.'
        ),
        h('p', {},
            'Instead of having I/O in the language, we could provide context in the form of data, a computation would be run, and then ' +
            'the results would be returned back to the caller. ' +
            'For example, we might pass a 9x9 sudoku grid to a program that would solve sudoku puzzles. ' +
            'When the program completed it would either return a solved grid, or an error if either the grid was malformed or was ' +
            'unsolvable.'
        ),
        h('p', {},
            'Significantly, by placing the I/O out of the control of an AI we could enforce safety checks on the results of ' +
            'the computation after it has run. ' +
            'We could decide to reject the result before it could do any harm, rather than hoping no harm could occur.'
        ),
        h('p', {},
            '12 months on, the language is now called ',
            h('a', {
                href: 'https://davehudson.io/projects/menai',
                target: '_blank',
                rel: 'noopener'
            }, 'Menai'),
            ', named after the historic Menai suspension bridge, near where I used to live.'
        ),
        h('p', {},
            'From the outset, the language has been embedded into the tool framework of the ',
            h('a', {
                href: 'https://davehudson.io/projects/humbug',
                target: '_blank',
                rel: 'noopener'
            }, 'Humbug project'),
            '. ' +
            'Humbug\'s tool framework gives AIs access to terminals, editor buffers, conversations, files, etc., allowing them a huge ' +
            'number of data sources. ' +
            'More recently this has been extended, allowing AIs to use Menai programs to transform files and editor buffers, enabling ' +
            'complex and token-efficient edit operations.'
        ),
        h('p', {},
            'About a month ago I separated Menai from the Humbug project as I figured it could be useful in quite a number of other ' +
            'projects. ' +
            'At the time of writing, it is now at v0.3.1 in its stand-alone form.'
        )
    ];
}

function blogArticle_2026_08_31(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'A functional language'),
            h('p', {},
                'One of the more interesting things I discovered 12 months ago was Claude\'s preference for a pure functional language. ' +
                'It argued strongly that AIs like itself would be much better able to generate reliable software in such a design.'
            ),
            h('p', {},
                'By eliminating I/O, one of the other major justifications for statefulness and mutations went away, so going with a ' +
                'pure functional language ended up being an easy choice.'
            ),
            h('p', {},
                'I was curious if these decisions would stand up, so while writing this article I asked GLM 5.2 and Grok 4.6 for their ' +
                'opinions (in sessions with no prior memory, and where no reference to Menai existed). ' +
                'Both landed on a broadly similar shape to Menai, though not identical in the details.'
            ),
            h('p', {},
                h('em', {},
                    '[Aside: GPT 5.6 came up with a totally new concept based around information certainty - interesting, but wouldn\'t ' +
                    'offer deterministic results]'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Lispy syntax, but a little different to Lisp'),
            h('p', {},
                'Claude\'s preferences at the time — and GLM\'s and Grok\'s today — were for unambiguous structure, avoiding operator precedence questions, ' +
                'avoiding overloaded syntax, etc.'
            ),
            h('p', {},
                'There are many ways this could be done, but all suggested S-expressions. ' +
                'As such, Menai\'s syntax will look quite familiar to Lisp or Scheme users. ' +
                'If you have a paranoia about parentheses you might want ' +
                'to look away for the next bit...'
            ),
            h('p', {},
                'Here\'s an example that finds the occurrence of words in a string and then returns the 3 most ' +
                'frequent words, sorted by frequency!'
            ),
            CodeFragment.create({
                code: '(letrec\n' +
                    '  ((count-words (lambda (words)\n' +
                    '                  (fold-list (lambda (acc word)\n' +
                    '                               (dict-set acc word (integer+ 1 (dict-get acc word 0))))\n' +
                    '                             (dict)\n' +
                    '                             words)))\n' +
                    '   (top-words (lambda (text n)\n' +
                    '                (let*\n' +
                    '                  ((words (string->list (string-downcase text) " "))\n' +
                    '                   (counts (count-words words))\n' +
                    '                   (pairs (sort-list (lambda (a b)\n' +
                    '                                       (integer>? (list-ref a 1) (list-ref b 1)))\n' +
                    '                                     (map-list (lambda (key)\n' +
                    '                                                 (list key (dict-get counts key)))\n' +
                    '                                               (dict-keys counts)))))\n' +
                    '                  (list-slice pairs 0 n)))))\n' +
                    '  (top-words "the quick brown fox jumps over the lazy dog the fox runs" 3))',
                language: 'Menai'
            }),
            h('p', {},
                'This returns ',
                h('code', {}, '(("the" 3) ("fox" 2) ("quick" 1))'),
                '. ' +
                'Each entry is the word paired with its count.'
            ),
            h('p', {},
                'If you\'re familiar with Lisp or Scheme you might have noticed a few slightly unusual things. ' +
                'There\'s no use of ',
                h('code', {}, 'defun'),
                ' or ',
                h('code', {}, 'define'),
                ', we\'ve got ',
                h('code', {}, 'dict'),
                ' (dictionary) objects, and operators that are strictly-typed. ' +
                'Dig in a little more and there are much more interesting differences! ' +
                'For example, there are no cons cells (if you want a list then you get a proper list) but lists still play a major role.'
            ),
            h('p', {},
                'Were I building a language for humans, each of these would potentially be a headache because they\'re unfamiliar, but ' +
                'with AI users it\'s pretty easy to give the AI a short description of the language any time it wants to use it.  The ' +
                'example above was written by an AI (GLM 5.2) as something it felt would make for an interesting demonstration.'
            ),
            h('p', {},
                'You might also notice we\'ve got first-class functions, and in this example we\'re passing functions around quite a lot.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A rich but strict type system'),
            h('p', {},
                'I wanted Menai to be able to be used for a very wide array of analytical tasks so it has a rich set of core ' +
                'data types — integers, floats, complex numbers, strings, booleans, bytes, symbols, structs, and the usual ' +
                'container types (lists, dictionaries, sets). The full list is on the ' +
                h('a', {
                    href: 'https://davehudson.io/projects/menai',
                    target: '_blank',
                    rel: 'noopener'
                }, 'project page'),
                ' if you want the details.'
            ),
            h('p', {},
                'Everything is dynamically typed, but all the low-level operations are strictly typed. ' +
                'For example, we have ',
                h('code', {}, 'integer+'),
                ' to add integers together, and passing a floating-point number would raise an error. ' +
                'There are no automatic type conversions, and thus dramatically less chance of getting surprised. ' +
                'Our AI users don\'t mind adding explicit type conversions. ' +
                'In fact they seem to prefer them because they offer an explicit hint of intended behaviour.'
            ),
            h('p', {},
                'Lexical scoping, pattern matching, a module system, and tail calling round out the language — again, see the ' +
                'project page for the details, but the short version is: nothing here should surprise a Scheme programmer, and ' +
                'that\'s deliberate.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Zero library dependencies'),
            h('p', {},
                'Menai was designed to be incredibly easy to adopt, but I also wanted to make it easy to trust and easy to extend. ' +
                'As such, it has a "zero library dependencies" rule: Menai does not use any third-party libraries that are not ' +
                'found in the core toolchains used to build the compiler, runtime, and tools.'
            ),
            h('p', {},
                'At this point, most of the tools and the compiler are written in Python, while the runtime virtual machine is ' +
                'written in C, supporting gcc, clang, and Microsoft Visual C++. The minimalist approach should make it very easy ' +
                'to embed in other projects, and the C compiler backend support means it runs on macOS, Linux, and Windows.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Compiler and runtime'),
            h('p', {},
                'The original implementation of Menai was an interpreter. ' +
                'It was a great proof of concept but slow.'
            ),
            h('p', {},
                'I wanted Menai to be fast, and I also wanted it to compile fast. ' +
                'It\'s slightly ironic that I make that second comment given the compiler is currently written in Python, but it is ' +
                'still very quick. ' +
                'It\'s fast enough that the M3 ' +
                'MacBook Air I\'m writing this on can compile and run 4207 test cases in about 14 seconds, including a full ' +
                'garbage-collector sweep at the end to check for leaks.'
            ),
            h('p', {},
                'A long time ago, I learned about writing compilers by reading Niklaus Wirth\'s "Project Oberon", and the ' +
                'philosophy for balancing compile time with execution time stuck with me. ' +
                'Every optimization in Menai\'s compiler has to justify its cost. ' +
                'If a pass costs 10ms it needs to offer close to that as a saving in a single runtime use; if it costs 100ms it\'s ' +
                'probably not worth having. ' +
                'No pass is permitted to leave a mess for another pass to clean up unless there\'s a clear win from both.'
            ),
            h('p', {},
                'This might sound ambitious, but many of the trickiest and most expensive compiler problems relate to ' +
                'statefulness and mutation. ' +
                'Thanks to purity, the Menai compiler has an easier time of things than would be ' +
                'true for most other languages.'
            ),
            h('p', {},
                'The compiler goes through five internal representations on the way to bytecode ' +
                '(abstract syntax tree, intermediate representation, control-flow graph, virtual code, and finally bytecode itself), ' +
                'each suited to a different class of optimization. The ',
                h('a', {
                    href: 'https://davehudson.io/projects/menai',
                    target: '_blank',
                    rel: 'noopener'
                }, 'project page'),
                ' has the full breakdown if you\'re curious about the ' +
                'pipeline or the VM\'s register-based instruction set.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Tooling'),
            h('p', {},
                'Menai ships with the compiler, a bytecode disassembler, a benchmarking tool, a profiler, a test runner, a pretty ' +
                'printer, a code checker, and a pipeline runner. ' +
                'Most of these are self-explanatory, but two are worth calling out.'
            ),
            h('p', {},
                'The code checker ',
                h('code', {}, 'menai-check'),
                ' tracks down parenthesis-matching problems. ' +
                'It lets an AI work out where it has misbalanced parentheses. ' +
                'Much as current AIs can\'t count "R"s in "strawberry", they have a similar problem with runs of parentheses ' +
                'and will often write throwaway scripts to check their own work. ' +
                'It\'s easier to give them a reusable tool that does this.'
            ),
            h('p', {},
                'Humans can use it too, but it\'s usually easier for a human to just use an editor that highlights matching ' +
                'parentheses, since it\'s easy for us to handle that visually.'
            ),
            h('p', {},
                'The pipeline runner ',
                h('code', {}, 'menai-pipeline'),
                ' demonstrates using Menai with an external I/O framework, chaining Menai ' +
                'programs together with I/O operations written in Python. ' +
                'Adjacent Menai passes get combined and optimized together. ' +
                'This is still early work, but already encouraging.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Performance'),
            h('p', {},
                'The target is to exceed the performance of Python, but there\'s quite a lot of work to be done for this.'
            ),
            h('p', {},
                'To measure this, I built the ',
                h('code', {}, 'menai-benchmark'),
                ' tool, which compares Menai, idiomatic Python, and "functional" Python. ' +
                'Functional Python, here, means Python using a similar functional programming style to Menai.'
            ),
            h('p', {},
                'Idiomatic Python uses highly optimized C libraries for JSON parsing and sorting, so unsurprisingly Menai is quite ' +
                'a lot slower but the functional Python code that does not use those libraries is generally about 1.1x to 2.5x faster ' +
                '(with the exception of very large sorting operations involving 5000 or 10000 elements). ' +
                'I did think about implementing native code libraries for Menai too but for now I\'m focusing on how to make the ' +
                'Menai versions faster.'
            ),
            h('p', {},
                'The best Python version of the Rubik\'s cube solver is about 1.7x faster than the Menai version, but curiously it\'s the ' +
                'functional and not idiomatic version that wins there. ' +
                'The idiomatic Python and Menai versions are almost the same speed. ' +
                'The sudoku solver\'s idiomatic Python version is about 9x faster, so this is an area to investigate further.'
            ),
            h('p', {},
                'Of note, however: the ability to let an AI use Menai without anywhere near as much supervision means the ' +
                'overall performance inside Humbug\'s agentic workflows is much faster at a system level. ' +
                'To get this performance with Python we would need to disable the tool approval safety mechanisms that were the main ' +
                'reason the project was started.'
            ),
            h('p', {},
                'If you\'d like to track benchmark performance, I tend to post results to my ',
                h('a', {
                    href: 'https://davehudson.io/notes',
                    target: '_blank',
                    rel: 'noopener'
                }, 'Notes'),
                '.  You can find the latest ' +
                'results at the time of writing this at ',
                h('a', {
                    href: 'https://davehudson.io/notes/2026-08-30',
                    target: '_blank',
                    rel: 'noopener'
                }, 'davehudson.io/notes/2026-08-30'),
                '.'
            )
        ),
        h('section', {},
            h('h2', {}, 'How does this work in practice?'),
            h('p', {},
                'The original implementation proved itself very quickly, and I continue to see dozens of uses every week. ' +
                'It has been interesting to observe how much more effective AIs have become at writing code in a language they\'re not ' +
                'trained in.'
            ),
            h('p', {},
                'The early implementations of Humbug used to include a full short-form Menai tutorial in every conversation context to ' +
                'make this work, but now this is done on-demand. ' +
                'The tutorial is available via an AI tool call and none of the Menai tools will run until the AI reads that tutorial, ' +
                'but this means they only pay the context token cost as/when they first need to use the language.'
            ),
            h('p', {},
                'As a human, I\'m not the most meticulous writer, so I had GLM 5.2 fix the typos in this article. ' +
                'To do this it wrote a Menai file transform. ' +
                'An interesting point of comparison is the diff it gave me to review and check its work was 78 lines long, but the ' +
                'transform was just 14 lines of code.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-08-31/glm-edits-my-writing.webp',
                    alt: 'A screenshot of GLM fixing typos using Menai',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'A screenshot of GLM fixing typos using Menai'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'What\'s next'),
            h('p', {},
                'I\'m excited about new things that can be done with Menai!'
            ),
            h('p', {},
                'Obviously, I care a lot about performance, so I\'ll be looking to improve both the VM and the compiler ' +
                'code generation to make that happen.'
            ),
            h('p', {},
                'There\'s plenty more engineering work in flight beyond that too — new language bindings, profiler improvements, ' +
                'and more. ' +
                'I\'ll keep posting updates on all of that in my ',
                h('a', {
                    href: 'https://davehudson.io/notes',
                    target: '_blank',
                    rel: 'noopener'
                }, 'Notes'),
                ' as it happens.'
            ),
            h('p', {},
                'Integration with Humbug was the driver for the language, though, so what I care about most is how to leverage ' +
                'Menai further inside Humbug\'s tool-calling engine. ' +
                'I also want to see whether this approach can be applied to other agent frameworks.'
            ),
            h('p', {},
                'Perhaps, more than any of these, the idea of AIs being able to build ' +
                'their own libraries and skills around a safe, deterministic language now feels like an entirely natural next step.'
            ),
            h('p', {},
                'We\'ll have to see where things end up in another 12 months!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Getting Menai'),
            h('p', {},
                'You can try this out for yourself as it\'s open source under an Apache 2.0 license.'
            ),
            h('p', {},
                'The git repository is at: ',
                h('a', {
                    href: 'https://github.com/m6r-ai/menai',
                    target: '_blank',
                    rel: 'noopener'
                }, 'https://github.com/m6r-ai/menai'),
                '.'
            ),
            h('p', {},
                'You can also install ',
                h('code', {}, 'menai'),
                ' from PyPI:'
            ),
            CodeFragment.create({
                code: 'pip install menai',
                language: 'Text'
            })
        )
    ];
}

export const blogPost_2026_08_31 = new BlogPost(
    'Menai: a pure functional programming language (12 months on)',
    '2026-08-31',
    '/blog/2026-08-31',
    'A year after Claude Sonnet and I started building a safe, pure functional programming language for AI agents, Menai has been separated from the Humbug project and is now at v0.3.1 in its stand-alone form. Here\'s how it\'s gone.',
    null,
    null,
    blogOpening_2026_08_31,
    blogArticle_2026_08_31,
    null
);
