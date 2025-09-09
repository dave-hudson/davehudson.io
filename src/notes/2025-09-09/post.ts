import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2025_09_09(): VElement[] {
    return [
        h('p', {},
            'One of the aspirations for Humbug is that it can be the basis for an AI operating system. It didn\'t start that way, however. ' +
            'It started as an AI development application.'
        )
    ];
}

function notesArticle_2025_09_09(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Dependency checking'),
            h('p', {},
                'A few months ago I started trying to tease the front-end and back-end modules to make it possible to test this concept. The ' +
                'idea was that if I could separate these then I could build a different front-end, or build apps that needed no front-end ' +
                'at all.'
            ),
            h('p', {},
                'This change is more than just philosophically interesting, however. The idea is that the AI back-end layer should be able to ' +
                'invoke front-end capabilities without even really knowing what they are sometimes. For example, the AI might decide it needs ' +
                'to show the user a file, but different front-end implementations might do this same thing in different ways.'
            ),
            h('p', {},
                'I did the initial separation by hand and I\'ve generally avoided breaking things, but as the code has become more complex it ' +
                'has also start to be easy to make mistakes. I anticipated this might be the case, so a couple of months ago I wrote a ' +
                'GitHub issue saying I needed a special linter tool.'
            ),
            h('p', {},
                'I finally got to this today. I had Claude build me a dependency analysis tool.'
            ),
            h('p', {},
                'The build took a couple of hours because there\'s quite a lot of code involved in doing this right, but the result is quite ' +
                'pleasing. I did have to stop Claude hugely overengineering things again, however. This is a recurring theme with LLMs.'
            ),
            h('p', {},
                'Entertainingly, it did find an issue. My change yesterday introduced a dependency it shouldn\'t have done!'
            ),
            CodeFragment.create({
                code: `(venv) $ [15:35:23 ~/github/m6r/humbug] python -m tools.dependency_checker check
Dependency Check Results
========================

✓ ai_conversation_transcript/ - checked, no violations
✓ ai_tool/ - checked, no violations
✓ dast/ - checked, no violations
✓ dmarkdown/ - checked, no violations
✓ humbug/ - checked, no violations
✓ metaphor/ - checked, no violations
✓ syntax/ - checked, no violations
✓ terminal/ - checked, no violations
✗ ai/ - 1 violation(s) found (1 internal)

Internal Module Violations:
----------------------------
src/ai/ai_conversation.py:19
  └─ 🔗 Illegal import: from humbug.language.language_manager import LanguageManager
     Rule: ai cannot depend on humbug


Summary:
  Files checked: 249
  Modules checked: 9
  Total violations: 1
  Internal violations: 1
  Status: ✗ FAILED - 1 violation(s)`,
                language: 'text'
            }),
            h('p', {},
                'Fortunately this only took 5 minutes to fix.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Letting Humbug control the terminal'),
            h('p', {},
                'The current terminal design gave Humbug the ability to open and close terminal tabs, but not to do anything with them after ' +
                'that. That\'s interesting, but a little limiting!'
            ),
            h('p', {},
                'I explained I wanted to be able to use the terminal to send and check commands within the Humbug environment, then ' +
                'reminded the AI that it already had a sleep call so it could arrange to wait for things to happen. One small nudge ' +
                'to Claude was that I wanted the existing system AI tool to be updated rather than adding a new one and it then coded up ' +
                'something, with user tool approvals for commands being submitted.'
            ),
            h('p', {},
                'The first version worked first time (yay!) but had some ', h('code', {}, 'mypy'), ' issues. I asked it to run ', h('code', {}, 'mypy'), ' and it proceeede to iterate ' +
                'through debugging how to do that, got results, waited for things to stabilize, then debugged and fixed the errors.'
            ),
            h('p', {},
                h('img', {src: '/notes/2025-09-09/terminal-commands.png', alt: 'Terminal commands screenshot'})
            ),
            h('p', {},
                'Total elapsed time, including writing this note of 39 minutes.'
            ),
            h('p', {},
                'This isn\'t perfect (there are some protected attribute accesses I need to fix) but that\'s pretty bloody amazing!'
            ),
            h('p', {},
                'What\'s equally interesting is this is another case of providing an LLM a set of orthogonal tools and it being able to string ' +
                'them together in surprising an interesting ways. E.g. "open terminal", "run command", "sleep", "read the terminal", rinse ' +
                'and repeat.'
            )
        )
    ];
}

export const notesPost_2025_09_09 = new NotesPost(
    '2025-09-08: Towards the AI OS vision',
    '2025-09-09',
    '/notes/2025-09-09',
    'One of the aspirations for Humbug is that it can be the basis for an AI operating system. It didn\'t start that way, however. It started as an AI development application.',
    null,
    null,
    notesOpening_2025_09_09,
    notesArticle_2025_09_09,
    null
);
