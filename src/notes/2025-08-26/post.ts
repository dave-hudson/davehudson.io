import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2025_08_26(): VElement[] {
    return [
        h('p', {},
            'Bug fixing for mindspace opening issues and improvements to the calculator tool with bitwise operations and base conversions. Includes discussion of LLM instruction following challenges.'
        )
    ];
}

function notesArticle_2025_08_26(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Fix problem opening mindspaces'),
            h('p', {},
                'Previously, if the user selected a directory to open as a mindspace we\'d start the close the current one before discovering ' +
                'the problem. This meant the mindspace tabs were closed. Now this won\'t happen.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving the calculator tool'),
            h('p', {},
                'One of the earliest tools I added was the calculator tool. It\'s very useful, but it couldn\'t do bitwise operations or ' +
                'base conversions - i.e. it wasn\'t a programmer\'s calculator, just a scientific one.'
            ),
            h('p', {},
                'To solve this I used a Metaphor prompt:'
            ),
            CodeFragment.create({
                language: 'metaphor',
                code: `Role:
    You are a world class python programmer, highly skilled in accurate and performant software development.  You
    are going to assist me in making modifications to my application.

Context:
    # Pull in the default Python coding rules for the project.
    Include: metaphor/python-rules.m6r

    # The project only uses external dependencies if there's no other choice.  This makes it
    # much easier for the AI to know what it's working with.
    Context: Dependencies
        Leverage standard library tools before custom solutions, unless specifically instructed, or
        unless a depdency is already in use.

    Context: Tool use
        You have a number of tools at your disposal.  Before using any of them, consider whether you need to use them or
        if you already have the information you require and only use them if you don't have it, or are unsure.

    Context: Existing code
        The following files are used in my application - as you have them here you do not need to re-read them:

        # Embed all the files that the AI will need to modify the code successfully.  If necessary,
        # describe what those files are used for.
        Embed: src/ai_tool/*.py
        Embed: src/ai_tool/tools/*.py

Action:
    # Describe the details of the change required.
    My application provides tools that are used by LLMs.  I've given you the code for the tool infrastructure
    and for 3 of the tools.

    The calculator tool currently handles scientific calculations but I would like to extend this to cover
    a programmer's calculator needs.  This should handle base conversions and bitwise operators.

    The current design is modelled on python syntax via the ast library, so it seems to make sense to use
    the same approach for these new capabilities.

    I don't want you to code anything yet - I want to understand ways we can do this`
            }),
            h('p', {},
                'The design was pretty reasonable, but then we got into one of those places where the LLM suggested something weird. This ' +
                'is exactly where "vibe coders" will come unstuck:'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-26/calculator-design.png',
                    alt: 'Calculator design discussion showing LLM suggesting multiple outputs',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'Calculator design discussion showing LLM suggesting multiple outputs')
            ),
            h('p', {},
                'I nudged the design to remove the slightly mad use of multiple outputs!'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-26/calculator-nudge.png',
                    alt: 'First nudge to simplify the calculator design',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'First nudge to simplify the calculator design')
            ),
            h('p', {},
                'That got some reasonable code, but Claude was still overcomplicating things...'
            ),
            h('figure', {},
                h('img', {
                    src: '/notes/2025-08-26/calculator-nudge-again.png',
                    alt: 'Second nudge to further simplify the design',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {}, 'Second nudge to further simplify the design')
            ),
            h('p', {},
                'This one actually made sense. It was interesting to see Claude indulge its tendency to overcomplicate things, however. ' +
                'Each of these incremental complexities eventually leads to a very complex codebase.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Following instructions'),
            h('p', {},
                'A variant on the calculator problem was that some LLMs would try to use the caret ', h('code', {}, '^'), ' symbol for exponentiation. This was ' +
                'in spite of the tool description saying it needed to use ', h('code', {}, '**'), ' for exponentiation.'
            ),
            h('p', {},
                'After adding the new bitwise ops, the use of ', h('code', {}, '^'), ' was no longer safe because something like ', h('code', {}, '23 ^ 3'), ' would generate ' +
                'a result of ', h('code', {}, '20'), ', not ', h('code', {}, '12167'), '. The weird thing was that some LLMs still tried to use ', h('code', {}, '^'), ', despite being told that that now ' +
                'did bitwise xor.'
            ),
            h('p', {},
                'This required a very explicit addition to the tool description to fix it:'
            ),
            CodeFragment.create({
                language: 'python',
                code: `    "- The ^ operator is for bitwise XOR and must not be used for exponentiation - use ** or pow() instead\\n"`
            })
        )
    ];
}

export const notesPost_2025_08_26 = new NotesPost(
    '2025-08-26: Bug fixing',
    '2025-08-26',
    '/notes/2025-08-26',
    'Bug fixing for mindspace opening issues and improvements to the calculator tool with bitwise operations and base conversions. Includes discussion of LLM instruction following challenges.',
    null,
    null,
    notesOpening_2025_08_26,
    notesArticle_2025_08_26,
    null
);
