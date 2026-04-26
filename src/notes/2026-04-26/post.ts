import {CodeFragment} from '../../lib/code-fragments';
import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_04_26(): VElement[] {
    return [
        h('p', {},
            'This week has been very exciting!  The new capabilities from v43 and v44 have really started to shine.'
        )
    ];
}

function notesArticle_2026_04_26(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Accelerating Menai'),
            h('p', {},
                'One of the exciting things I\'ve done in the last few weeks is make Menai\'s VM much faster.  With v45 I now have the Linux ' +
                'VM running with native code too, so that\'s all 3 platforms.'
            ),
            h('p', {},
                'It would be very easy to get over-excited by the rapid incremental gains, but to ground this I developed a benchmark tool. ' +
                'This compares idiomatic Python, Python written to use Menai\'s functional style, and Menai.'
            ),
            h('p', {},
                'Some of the examples really just demonstrate the current version take about 1.8 ms to do anything, vs Python that can be ready ' +
                'in microseconds.  It\'s the bigger tests that are starting to show very encouraging numbers.  This week I\'ve still seen some ' +
                'optimizations that have gained 8-12% on specific tests, so it feels like there\'s a huge potential for improvement.'
            ),
            h('p', {},
                'I compared the test results from 30th March and 4 weeks later we\'re between 6 and 7 time faster than we were!  In some cases, ' +
                'we\'re already close to giving Python a run for its money.'
            ),
            CodeFragment.create({
                code: '(venv) $ [19:37:01 ~/github/m6r/humbug] python tools/menai/benchmark/run.py\n' +
                    '\n' +
                    'JSON_PARSER\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                                      Menai                       Python (idiomatic)                      Python (functional)\n' +
                    '                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'object                         1.982      1.752 ✓       0.003      0.001     755x faster ✓       0.010      0.008     194x faster ✓\n' +
                    'integer                        1.829      1.788 ✓       0.001      0.001    2347x faster ✓       0.001      0.000    3070x faster ✓\n' +
                    'float                          1.844      1.785 ✓       0.001      0.001    2515x faster ✓       0.001      0.000    3115x faster ✓\n' +
                    'true                           1.860      1.794 ✓       0.001      0.001    2641x faster ✓       0.000      0.000    4422x faster ✓\n' +
                    'false                          1.863      1.805 ✓       0.001      0.001    2812x faster ✓       0.000      0.000    3823x faster ✓\n' +
                    'null                           1.883      1.823 ✓       0.001      0.001    2790x faster ✓       0.000      0.000    4654x faster ✓\n' +
                    'string_esc                     1.879      1.795 ✓       0.001      0.001    2424x faster ✓       0.001      0.001    1617x faster ✓\n' +
                    'empty_array                    1.898      1.829 ✓       0.001      0.001    2743x faster ✓       0.000      0.000    4465x faster ✓\n' +
                    'empty_object                   1.883      1.825 ✓       0.001      0.001    2954x faster ✓       0.000      0.000    5254x faster ✓\n' +
                    'nested                         1.911      1.838 ✓       0.001      0.001    2227x faster ✓       0.003      0.002     705x faster ✓\n' +
                    'long_string                    3.292      3.222 ✓       0.002      0.002    1568x faster ✓       0.071      0.070      46x faster ✓\n' +
                    'deep_array                     2.287      2.212 ✓       0.021      0.019     107x faster ✓       0.156      0.149      15x faster ✓\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Validation: Menai 12/12 ✓  |  Python (idiomatic) 12/12 ✓  |  Python (functional) 12/12 ✓\n' +
                    '\n' +
                    '\n' +
                    'RUBIKS_CUBE\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                                      Menai                       Python (idiomatic)                      Python (functional)\n' +
                    '                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    '1-move                        28.038     28.038 ✓       0.110      0.110     255x faster ✓       0.063      0.063     448x faster ✓\n' +
                    '2-move                        22.338     22.338 ✓       0.097      0.097     231x faster ✓       0.061      0.061     364x faster ✓\n' +
                    '3-move                        20.838     20.838 ✓       0.208      0.208     100x faster ✓       0.118      0.118     176x faster ✓\n' +
                    '4-move                        23.503     23.503 ✓       2.108      2.108      11x faster ✓       1.271      1.271      18x faster ✓\n' +
                    '5-move                        31.526     31.526 ✓       7.213      7.213     4.4x faster ✓       4.340      4.340     7.3x faster ✓\n' +
                    '6-move                        80.433     80.433 ✓      46.714     46.714     1.7x faster ✓      27.996     27.996     2.9x faster ✓\n' +
                    '7-move                       154.817    154.817 ✓     103.982    103.982     1.5x faster ✓      63.309     63.309     2.4x faster ✓\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Validation: Menai 7/7 ✓  |  Python (idiomatic) 7/7 ✓  |  Python (functional) 7/7 ✓\n' +
                    '\n' +
                    '\n' +
                    'SORT\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                                      Menai                       Python (idiomatic)                      Python (functional)\n' +
                    '                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'n=10                           0.066      0.059 ✓       0.000      0.000     150x faster ✓       0.005      0.003      14x faster ✓\n' +
                    'n=50                           0.109      0.102 ✓       0.002      0.001      71x faster ✓       0.024      0.022     4.5x faster ✓\n' +
                    'n=100                          0.171      0.165 ✓       0.003      0.002      55x faster ✓       0.052      0.049     3.3x faster ✓\n' +
                    'n=250                          0.409      0.401 ✓       0.009      0.006      48x faster ✓       0.141      0.138     2.9x faster ✓\n' +
                    'n=500                          0.958      0.910 ✓       0.018      0.013      52x faster ✓       0.318      0.315     3.0x faster ✓\n' +
                    'n=1000                         2.401      2.373 ✓       0.041      0.029      58x faster ✓       0.666      0.643     3.6x faster ✓\n' +
                    'n=2500                        10.129     10.071 ✓       0.114      0.082      89x faster ✓       1.892      1.882     5.4x faster ✓\n' +
                    'n=5000                        36.834     36.705 ✓       0.287      0.233     128x faster ✓       4.145      4.132     8.9x faster ✓\n' +
                    'n=10000                      150.612    148.666 ✓       0.696      0.636     217x faster ✓       8.679      8.660      17x faster ✓\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Validation: Menai 9/9 ✓  |  Python (idiomatic) 9/9 ✓  |  Python (functional) 9/9 ✓\n' +
                    '\n' +
                    '\n' +
                    'SUDOKU\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Case                                      Menai                       Python (idiomatic)                      Python (functional)\n' +
                    '                           mean (ms)   min (ms)     mean (ms)   min (ms)          vs ref     mean (ms)   min (ms)          vs ref\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Easy (36 givens)              29.891     29.645 ✓       3.199      3.177     9.3x faster ✓      11.305     11.282     2.6x faster ✓\n' +
                    'Medium (30 givens)             1.482      1.463 ✓       0.043      0.040      35x faster ✓       0.162      0.154     9.2x faster ✓\n' +
                    'Hard (25 givens)            6126.182   6126.182 ✓     713.161    713.161     8.6x faster ✓    1986.715   1986.715     3.1x faster ✓\n' +
                    'Expert (23 givens)           350.124    350.124 ✓      40.707     40.707     8.6x faster ✓     164.350    164.350     2.1x faster ✓\n' +
                    '───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n' +
                    'Validation: Menai 4/4 ✓  |  Python (idiomatic) 4/4 ✓  |  Python (functional) 4/4 ✓\n',
                language: 'text',
                caption: 'Menai benchmark results'
            }),
            h('p', {},
                'Another angle to this is that a huge amount of effort has gone into decoupling the Menai VM from the Python runtime library. ' +
                'There are still code paths to improve, but Menai now has its own bigint library, custom string processing, etc.  Within a week ' +
                'or two, I\'m hoping the core library has zero Python calls, and they\'re solely used on the boundary between C and Python.'
            )
        ),
        h('section', {},
            h('h2', {}, 'More UI improvements'),
            h('p', {},
                'Again, courtesy of Tharik, we have conversation that now nest child/delegate conversations underneath them.  Tharik\'s ' +
                'original version highlighted some problems with the conversation management, so I reworked things.  There\'s a sub-task ' +
                'running that indexes all conversations in the mindspace and can construct graph relationships.  This means we can link ' +
                'parents and children, but we can also track shared children of forked conversations, etc.'
            ),
            h('p', {},
                'This is very exciting as it can form the basis of a much more advanced audit trail.'
            ),
            h('p', {},
                'Tharik also gave us a beautiful icon rail, allowing us to collapse the mindspace view.  Each view is now separate but quick ' +
                'to view.  This is a huge improvement when working on a laptop (or anything without a wide screen) - we get about 15% more usable ' +
                'space for tabs'
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-26/v45-in-action.webp', alt: 'Humbug v45 in action'}),
                h('figcaption', {}, 'Humbug v45 in action')
            ),
            h('figure', {},
                h('img', {src: '/notes/2026-04-26/v45-collapsed.webp', alt: 'Humbug v45 with the mindspace panel collapsed'}),
                h('figcaption', {}, 'With the mindspace panel collapsed, there\'s significantly more screen real estate available for tabs')
            ),
            h('p', {},
                h('em', {},
                    'Spoiler alert: The image shows the final state of 8 minutes of vibe-coding a Markdown to Microsoft Word ',
                    h('code', {}, '.docx'),
                    ' converter.  This isn\'t working properly yet, but is shockingly close!'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'The impact of better tools'),
            h('p', {},
                'One of the last changes I made last week was to add better search capabilities within the filesystem tool.  Our AIs can now ' +
                'search anywhere in the mindspace for files or directories.  They can also regexp search, with certainty about how those ' +
                'searches will work.'
            ),
            h('p', {},
                'On MacOS and Linux this means far fewer tool approval requests because Humbug no longer needs to use shell commands to find ' +
                'things.  On Windows this is a revelation - the agentic experience is now on a par with the Unix-based systems.'
            ),
            h('p', {},
                'One huge surprise was just how much every AI model engaged with this tool.  The system prompt tells them to look for ' +
                'AGENTS.md files and now they all seem to start by searching for every such file in the mindspace!  Checking files are correct, ' +
                'finding approaches to implement things, etc., are dramatically better.  Using the terminal is a last resort, and used solely ' +
                'for custom debug scripts and running tests.'
            ),
            h('p', {},
                'This also means Humbug can run quite a lot longer without requiring tool approvals from a human.  Once Menai gains some new ' +
                'I/O integration tools things should change even more!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Windows experience is soooo much better!'),
            h('p', {},
                'One of the biggest frustrations I\'ve had with Humbug is that the Windows port has always sort-of felt second class.  Our AI ' +
                'friends appear to be trained to use the rich toolset offered by Unix-like systems, but Windows doesn\'t have them in the ',
                h('code', {}, 'cmd.exe'),
                ' command shell.'
            ),
            h('p', {},
                'Having enhanced the generic toolset, however, Windows can now do all the same agentic search and discovery.  This is ' +
                'game-changing.  Suddenly Humbug can do the same agentic discovery of code and code structures on all platforms, so ' +
                'fixing issues on Windows is now just as easy as Linux or MacOS.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Version 45'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'If an AI generates a diff hunk with ', h('code', {}, '@@'), ' but with no line numbers, the diff applier will try to find with a fuzzy match.'),
                h('li', {}, 'Added support for using the C version of the Menai VM for Linux systems.'),
                h('li', {}, 'Dramatically improve the performance of the Menai VM.'),
                h('li', {}, 'The Menai VM C code is now much cleaner and decoupled from the original Python implementation.'),
                h('li', {}, 'Added keyboard scrolling of diff tabs.'),
                h('li', {}, 'Double-clicking an ephemeral tab label will now make the tab persistent.'),
                h('li', {}, 'Find controls now have history buffers, so up and down arrow will navigate previous searches.'),
                h('li', {}, 'Conversations now track the relationships between parent conversations and child conversations, so the mindspace conversations view now groups conversations under each other.'),
                h('li', {}, 'When opening an editor tab from a diff tab, the editor tab will be scrolled to the same position being shown in the diff.'),
                h('li', {}, 'The mindspace panel can be expanded and collapsed.  Also the panel shows just one view at a time, giving more room to see what\'s there.'),
                h('li', {}, 'If you change a file extension when renaming a file, you will now be prompted to confirm that\'s what you want to do.'),
                h('li', {}, 'Adding "thinking" support to the DeepSeek backend.'),
                h('li', {}, 'Updated the DeepSeek models to v4 (flash and pro).'),
                h('li', {}, 'Updated the OpenAI models to include GPT-5.5 and updated nano and mini models to GPT-5.4.'),
                h('li', {}, 'Updated the Ollama Qwen 3.5 models to 3.6.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Tighten guidance on regexp syntax to AI models.'),
                h('li', {}, 'Despite instructions, an AI may use the wrong alternation format in regexps.  If we get no results using an escaped form, but get results when it\'s unescaped, the tool will now return the results and warning that it had to remove the escaping.'),
                h('li', {}, 'If you highlight text and then open the find control in a diff tab it now uses the selected text as the initial search option.'),
                h('li', {}, 'Enabled keyboard shortcuts for "copy" operations in diff tabs.'),
                h('li', {}, 'Resolved a problem where find positions could be lost when hiding and unhiding the find bar in a tab.'),
                h('li', {}, 'If you attempt to drag a file that cannot be opened then an exception would trigger and the exception canary would activate.  Now this action will trigger a popup message box.'),
                h('li', {}, 'Fixed a problem in the C and C++ syntax highlighters when preprocessor lines are continued with ', h('code', {}, '\\'), '.'),
                h('li', {}, 'Fixed menu and dialog edit control scaling problem on Ubuntu under WSL2 on Windows 11.'),
                h('li', {}, 'Fixed bugs in the Menai and Scheme syntax highlighting.'),
                h('li', {}, 'Added tests for the Scheme syntax highlighter.'),
                h('li', {}, 'Menai now supports ', h('code', {}, '#d'), ' and ', h('code', {}, '#D'), ' numeric literals.')
            )
        )
    ];
}

export const notesPost_2026_04_26 = new NotesPost(
    '2026-04-26: Humbug v45',
    '2026-04-26',
    '/notes/2026-04-26',
    '2026-04-26: Humbug v45 brings native Menai VM on Linux for 6-7x speed gains, nested conversation tracking, a collapsible mindspace panel, dramatically improved Windows agentic experience, and a full v45 changelog.',
    '/notes/2026-04-26/v45-in-action.webp',
    null,
    notesOpening_2026_04_26,
    notesArticle_2026_04_26,
    null
);
