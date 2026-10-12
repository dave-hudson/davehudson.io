import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments';
import {BlogPost} from '../BlogPost';
import {navigateEvent} from '../../app';

function blogOpening_2026_10_11(): VElement[] {
    return [
        h('p', {},
            'This morning I asked an AI to tell me what was in a Microsoft Word document I wrote years ago. ' +
            'It wrote a program to do it, ran it, showed me the answer, and threw the program away. ' +
            'The whole exercise, including a follow-up question a little later, took just over a minute and cost less than $0.02.'
        ),
        h('p', {},
            'I believe that\'s a sign that the economics of software have already changed. ' +
            'Software has been so expensive to build that we could only afford it if the cost was amortized across a large ' +
            'number of users. ' +
            'Now an LLM can write glue logic in seconds, so some of our software can be built on demand. ' +
            'It can be built to answer a single question, used once, and then discarded.'
        ),
        h('p', {},
            'That comes with risk, and it only works if we can do it safely.'
        )
    ];
}

function blogArticle_2026_10_11(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Composable software'),
            h('p', {},
                'I build an open source AI environment called ',
                h('a', {href: '/projects/humbug'}, 'Humbug'),
                ', something that has been largely written by AI since its inception in late 2024.'
            ),
            h('p', {},
                'One of the spin-offs from the Humbug project is a programming language ',
                h('a', {href: '/projects/menai'}, 'Menai'),
                '. Menai is a Lisp/Scheme-like language designed for LLMs to use, and focused on a key safety constraint. ' +
                'It only has pure functions (literally no I/O in the language and no state mutation), with any sources of data ' +
                'provided to it by a separate tool framework (in this case Humbug).'
            ),
            h('p', {},
                'There are a few interesting ideas in Menai:'
            ),
            h('ul', {},
                h('li', {},
                    'The worst a Menai program can do is use too much time or memory, and Humbug enforces restrictions on both. ' +
                    'There is a strict time limit on virtual machine (VM) program execution, and a limit on the amount of heap space ' +
                    'that can be used.'
                ),
                h('li', {},
                    'It can only work on the data provided to it by the tool framework (Humbug in this case), so if Humbug doesn\'t let ' +
                    'you read your ',
                    h('code', {}, '.ssh'),
                    ' directory or the file with your API keys then the LLM can\'t write a program that will fetch them.'
                ),
                h('li', {},
                    'It\'s designed to be fast to compile and run so users don\'t perceive a pause when an LLM builds software using it.'
                ),
                h('li', {},
                    'Using pure functions makes it very easy for an LLM to compose functions on top of each other.'
                ),
                h('li', {},
                    'It has a standard library of modules written by LLMs that can be composed on demand. The libraries are in source ' +
                    'form so the LLM gets to read the code to understand how they work and how to use them. They\'re "discoverable".'
                )
            ),
            h('p', {},
                'Library modules are defined in the spirit of the Unix philosophy. Each provides small chunks of orthogonal ' +
                'functionality that can be freely composed to solve a more complex problem defined by an LLM. Give a capable LLM a ' +
                'problem, it can find the library components that can help and then craft a custom program to help achieve the user\'s ' +
                'request. If it can\'t find a component it needs then it\'s also free to write new ones, including tests.'
            ),
            h('p', {},
                'The user experience is to express a desired outcome, the LLM works out how to solve it deterministically, then ' +
                'processes the results until it\'s ready to present them back to the user.'
            ),
            h('p', {},
                'The actions are auditable. Each operation and each deterministic program execution is captured in the AI conversation ' +
                'transcripts.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A worked example'),
            h('p', {},
                'Back to my experiment this morning...'
            ),
            h('p', {},
                'Many years ago I used to work in procurement and wrote a spec for a long-obsolete PC. I have a version of the spec as ' +
                'a Microsoft Word docx file. I asked DeepSeek v4.1 Flash (a fast, inexpensive LLM) to read the spec and tell me what ' +
                'the document was about (and asked it not to cheat by using the pre-existing ',
                h('code', {}, 'read_text'),
                ' tool).'
            ),
            h('p', {},
                'The speed with which it acquired the skill to do this may remind you of Trinity asking for a program to fly a B212 ' +
                'helicopter in the Matrix...'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-10-11/block1.png',
                    alt: 'The first 9 seconds',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'The first 9 seconds'
                )
            ),
            h('p', {},
                'In 9 seconds, DeepSeek found the file I requested, read the Menai help file (to understand the language because it ' +
                'doesn\'t know anything about it when it started), found and read the project ',
                h('code', {}, 'blueprint.md'),
                ' file, found and read the ',
                h('code', {}, 'AGENTS.md'),
                ' that goes with it, and read the implementation of the ',
                h('code', {}, 'docx-decode.menai'),
                ' library file.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-10-11/block2.png',
                    alt: 'The next 14 seconds',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'The next 14 seconds'
                )
            ),
            h('p', {},
                'Another 14 seconds, and DeepSeek had started to write code to pull apart the docx file (for anyone unfamiliar, the ' +
                'main file in a docx file is an XML file inside a zip file). It now knew there were 618 elements within it.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-10-11/block3.png',
                    alt: 'Decoding the document',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'Decoding the document'
                )
            ),
            h('p', {},
                'DeepSeek had now fixed a syntax error (LLMs can struggle with paren nesting in s-expressions sometimes, but the ' +
                'Menai compiler does a lot of work to help them pinpoint and resolve issues), and we had the program that was summoned ' +
                'to answer my question.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-10-11/block4.png',
                    alt: 'And there we have it...',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'And there we have it...'
                )
            ),
            h('p', {},
                'At 33 seconds, from start to finish, we had a description of the document contents.'
            ),
            h('p', {},
                'Things got more interesting with a follow-on prompt: "can you give me all the section headings and how long each ' +
                'section is".'
            ),
            h('p', {},
                'This added another 34 seconds of work, and resulted in a total cost for all the work of less than $0.02 ' +
                '(it might be less than $0.01 but there\'s some rounding on the billing report).'
            ),
            h('p', {},
                'The ',
                h('code', {}, 'read_text'),
                ' tool\'s built-in docx converter would have handled the initial query faster, but it couldn\'t handle this one. ' +
                'At best our LLM would either try to guess or resort to writing a Python script.'
            ),
            h('p', {},
                'The AI didn\'t write all the code from scratch. It wrote the last 106 lines required to bridge the problem, but ' +
                'it\'s worth noting that the libraries it did leverage were also built by posing a series of problems to AI models ' +
                'in the same Humbug framework.'
            ),
            h('p', {},
                'You can see the full, disposable program in the ',
                h('a', {
                    href: '#postscript',
                    onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2026-10-11#postscript')
                }, 'postscript'),
                ' section. It existed for long enough to meet my objective for this blog post and then had no further purpose. ' +
                'It\'s a demonstration of something that cost next to nothing to build and thus could be discarded.'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2026-10-11/block5.png',
                    alt: 'Analyzing document sections',
                    style: 'width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'Analyzing document sections'
                )
            ),
            h('p', {},
                'I didn\'t exhaustively check the results, but I couldn\'t find any mistakes after I manually sampled sections at ' +
                'random. Word counts were correct and matched my own. It was certainly enough to give me the sort of qualitative ' +
                'assessment I was looking for on relative sizing.'
            ),
            h('p', {},
                'The most important thing worth noting is how none of this needed my approval. Menai programs have no ambient ' +
                'authority bestowed by the user\'s permissions, so there was nothing to approve. This matters. If approvals are ' +
                'rare then users are much more likely to pay close attention to them and are far less likely to fall into ' +
                'authorization fatigue and keep clicking "approve".'
            ),
            h('p', {},
                'Were such tools written in Python code I\'d have to carefully review every script to ensure safety, or ' +
                'else put the Python interpreter in a container and orchestrate interactions between the LLM and that sandbox.'
            ),
            h('p', {},
                'It\'s worth noting that there\'s nothing particularly special about the use of DeepSeek in this example. ' +
                'Humbug and Menai have been developed using models from OpenAI, Anthropic, Google, and Z.ai, and all are quite ' +
                'capable of doing similar things.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A few last thoughts'),
            h('p', {},
                'I don\'t claim Menai and Humbug are the only way to approach the problem of safely creating software on demand, ' +
                'but they do help explore some potential solutions.'
            ),
            h('p', {},
                'Here\'s what I think we should start with:'
            ),
            h('ul', {},
                h('li', {},
                    'Generated programs should have no ambient authority. Data can only be passed from or to the AI tooling harness.'
                ),
                h('li', {},
                    'A pure language is much safer to work with, and we don\'t lose any computational power. We can still process ' +
                    'complex binary data, as the docx example showed.'
                ),
                h('li', {},
                    'Strong audit trails are important. We can see what was requested and why. We can also check for bugs in ' +
                    'summoned programs later, should we have concerns.'
                ),
                h('li', {},
                    'We should make approvals infrequent by design. They should signify a genuine need for caution.'
                )
            ),
            h('p', {},
                'Summoning software on demand seems inevitable. Doing it safely is not, but it should be. We should be designing ' +
                'for it now. If we get that right then we should be looking forward to an era in which software can be personalized ' +
                'in ways that used to look like pure science fiction.'
            )
        ),
        h('section', {},
            h('h2', {id: 'postscript'}, 'Postscript'),
            h('p', {},
                'The throwaway program written to calculate the section details and sizing is here. This is extracted, unedited, ' +
                'from the tool call that was made.'
            ),
            CodeFragment.create({
                code: '(letrec\n' +
                    '  ((docx-decode (import "docx-decode"))\n' +
                    '\n' +
                    '   (collect-text\n' +
                    '    (lambda (node)\n' +
                    '      (if (string? node)\n' +
                    '          node\n' +
                    '          (fold-list (lambda (acc child) (string-concat acc (collect-text child)))\n' +
                    '                     ""\n' +
                    '                     (dict-get node "children")))))\n' +
                    '\n' +
                    '   (para-style\n' +
                    '    (lambda (p)\n' +
                    '      (let ((ppr (find-list (lambda (c) (and (dict? c) (string=? (dict-get c "tag") "w:pPr")))\n' +
                    '                            (dict-get p "children"))))\n' +
                    '        (if (dict? ppr)\n' +
                    '            (let ((s (find-list (lambda (c) (and (dict? c) (string=? (dict-get c "tag") "w:pStyle")))\n' +
                    '                                (dict-get ppr "children"))))\n' +
                    '              (if (dict? s) (dict-get (dict-get s "attrs") "w:val") "none"))\n' +
                    '            "none"))))\n' +
                    '\n' +
                    '   (level-num\n' +
                    '    (lambda (style)\n' +
                    '      (match style\n' +
                    '        ("Heading1" 1)\n' +
                    '        ("Heading2" 2)\n' +
                    '        ("Heading3" 3)\n' +
                    '        ("Heading4" 4)\n' +
                    '        (_ 0))))\n' +
                    '\n' +
                    '   (is-heading?\n' +
                    '    (lambda (p)\n' +
                    '      (integer>? (level-num (para-style p)) 0)))\n' +
                    '\n' +
                    '   (word-count\n' +
                    '    (lambda (s)\n' +
                    '      (list-length\n' +
                    '        (filter-list (lambda (w) (string!=? w ""))\n' +
                    '                     (string->list s " ")))))\n' +
                    '\n' +
                    '   (child-text\n' +
                    '    (lambda (c) (if (dict? c) (collect-text c) "")))\n' +
                    '\n' +
                    '   (walk\n' +
                    '    (lambda (children state)\n' +
                    '      (if (list-null? children)\n' +
                    '          (let ((heading (list-nth state 0)))\n' +
                    '            (if (string=? heading "")\n' +
                    '                (list-nth state 4)\n' +
                    '                (list-append (list-nth state 4)\n' +
                    '                             (dict "heading" heading\n' +
                    '                                   "level" (list-nth state 1)\n' +
                    '                                   "words" (list-nth state 2)\n' +
                    '                                   "paras" (list-nth state 3)))))\n' +
                    '          (let ((c (list-first children)))\n' +
                    '            (let ((heading (list-nth state 0))\n' +
                    '                  (style (list-nth state 1))\n' +
                    '                  (wc (list-nth state 2))\n' +
                    '                  (pc (list-nth state 3))\n' +
                    '                  (secs (list-nth state 4)))\n' +
                    '              (if (and (dict? c)\n' +
                    '                       (string=? (dict-get c "tag") "w:p")\n' +
                    '                       (is-heading? c))\n' +
                    '                  (let ((newsecs (if (string=? heading "")\n' +
                    '                                     secs\n' +
                    '                                     (list-append secs (dict "heading" heading\n' +
                    '                                                             "level" style\n' +
                    '                                                             "words" wc\n' +
                    '                                                             "paras" pc)))))\n' +
                    '                    (walk (list-rest children)\n' +
                    '                          (list (string-trim (collect-text c))\n' +
                    '                                (para-style c)\n' +
                    '                                0\n' +
                    '                                0\n' +
                    '                                newsecs)))\n' +
                    '                  (walk (list-rest children)\n' +
                    '                        (list heading style\n' +
                    '                              (integer+ wc (word-count (child-text c)))\n' +
                    '                              (integer+ pc 1)\n' +
                    '                              secs))))))))\n' +
                    '\n' +
                    '   (inclusive-words\n' +
                    '    (lambda (secs idx)\n' +
                    '      (let ((level (level-num (dict-get (list-nth secs idx) "level"))))\n' +
                    '        (letrec ((loop (lambda (j acc)\n' +
                    '                         (if (integer>=? j (list-length secs))\n' +
                    '                             acc\n' +
                    '                             (let ((l (level-num (dict-get (list-nth secs j) "level"))))\n' +
                    '                               (if (integer<=? l level)\n' +
                    '                                   acc\n' +
                    '                                   (loop (integer+ j 1) (integer+ acc (dict-get (list-nth secs j) "words")))))))))\n' +
                    '          (integer+ (dict-get (list-nth secs idx) "words") (loop (integer+ idx 1) 0)))))))\n' +
                    '\n' +
                    '  (let ((doc ((:: docx-decode decode) (dict-get inputs "input-bytes"))))\n' +
                    '    (let ((body (list-first (dict-get (dict-get doc "document") "children"))))\n' +
                    '      (let ((secs (walk (dict-get body "children") (list "" "" 0 0 (list)))))\n' +
                    '        (map-list\n' +
                    '          (lambda (pair)\n' +
                    '            (let ((idx (list-first pair))\n' +
                    '                  (s (list-nth pair 1)))\n' +
                    '              (dict "heading" (dict-get s "heading")\n' +
                    '                    "level" (dict-get s "level")\n' +
                    '                    "own-words" (dict-get s "words")\n' +
                    '                    "own-paras" (dict-get s "paras")\n' +
                    '                    "incl-words" (inclusive-words secs idx))))\n' +
                    '          (list-zip (range 0 (list-length secs)) secs))))))',
                language: 'Menai'
            })
        )
    ];
}

export const blogPost_2026_10_11 = new BlogPost(
    'Summoning software on demand',
    '2026-10-11',
    '/blog/2026-10-11',
    'AI can now write a throwaway program for a single question, run it safely, and discard it for under two cents. ' +
    'What does that do to the economics of software?',
    '/blog/2026-10-11/block3.png',
    null,
    blogOpening_2026_10_11,
    blogArticle_2026_10_11,
    null
);
