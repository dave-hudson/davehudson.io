import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_11(): VElement[] {
    return [
        h('p', {},
            'Handling control characters in the terminal, and persuading gpt-oss that it can use the terminal interactively.'
        )
    ];
}

function notesArticle_2025_09_11(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the terminal'),
            h('p', {},
                'During a demo, today, I discovered a subtle problem with the terminal. The problem is LLMs don\'t ever emit control ' +
                'characters in their output streams, with the exception of newline, carriage return, and tab. Things like escape or ' +
                'Ctrl+C were being converted into text that we\'d write to describe the control character, but that text could equally ' +
                'just be text.'
            ),
            h('p', {},
                'The test was to have the LLM control ', h('code', {}, 'vi'), '. This needs a lot of conventional key presses, but escape is necessary!'
            ),
            h('p', {},
                'The most interesting part of this was not fixing, it but how it got narrowed down.'
            ),
            h('p', {},
                'I explained the problem to a new LLM session and over the course of 4 delegated session and 7 minutes it explored the ' +
                'codebase, found places the problem was not, came up with a theory, wrote and executed a test program to test the theory, ' +
                'and the design a fix.'
            ),
            h('p', {},
                'The suggestions for the fix weren\'t brilliant because they would have had similar classes of problems to the original, ' +
                'but Claude did correctly narrow down where the change was needed.'
            ),
            h('p', {},
                'In the end we added code to interpret ', h('code', {}, '\\uXXXX'), ' as a control character as long as the XXXX was less than 0x20 ' +
                '(i.e. non printable). I also updated the tool description to tell it to use this format for control characters.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Persuading gpt-oss that it can use the terminal interactively'),
            h('p', {},
                'One of the more frustrating aspects of AI tool descriptions is that LLMs can really take things too literally. A case ' +
                'in point was switching to testing with gpt-oss:120b instead of Claude Sonnet 4. Claude seemed to just "get" that it ' +
                'could interact with the terminal, but gpt-oss get both confused and argumentative.'
            ),
            h('p', {},
                'In the end I had to describe terminal interactions more carefully.'
            ),
            h('p', {},
                'This did also trigger an interesting tool description problem I\'ve seen before. One tool description can cause some LLMs ' +
                'to associate aspects of that tool description with aspects of other tools. I suspect this is the cause of many of the ' +
                'cases of MCP servers causing bad things to happen. In my case, I had to clarify that the "sandbox" in the filesystem ' +
                'tool is solely a filesystem sandbox, and not anything related to the terminal!'
            )
        )
    ];
}

export const notesPost_2025_09_11 = new NotesPost(
    '2025-09-11: More on terminals',
    '2025-09-11',
    '/notes/2025-09-11',
    'Handling control characters in the terminal, and persuading gpt-oss that it can use the terminal interactively.',
    null,
    null,
    notesOpening_2025_09_11,
    notesArticle_2025_09_11,
    null
);
