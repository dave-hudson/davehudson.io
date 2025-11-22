import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';

function notesOpening_2025_11_21(): VElement[] {
    return [
        h('p', {},
            'Sometimes LLMs are incredibly frustrating. They are amazing engines, but there are some problems it\'s impossible to get them to do straightforward things reliably.'
        )
    ];
}

function notesArticle_2025_11_21(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Getting LLMs to follow rules is really hard'),
            h('p', {},
                'I spent a very frustrating few hours trying to get my new agentic editing code to behave reliably. I\'ve finally concluded this isn\'t going to work with the current generations of LLMs.'
            ),
            h('p', {},
                'The problem is LLMs wanting to apply "human like" heuristic, or at least that\'s the excuse they keep systematically giving.'
            ),
            h('p', {},
                'What\'s going on here. Let\'s look at my latest tool definitions for the ', h('code', {}, 'system'), ' tool in Humbug:'
            ),
            CodeFragment.create({
                language: 'python',
                code: `# Build description from operations
base_description = (
    "The system tool let's you (the AI) control the application user interface for the user.\\n" \\
    "The user interface is organized into columns, each containing tabs\\n\\n" \\

    "You MUST adhere to the following RULES:\\n" \\
    "- You MUST ONLY use editor_search to find starting or ending line/column numbers in editor tabs\\n" \\
    "- You MUST NOT use editor_read_lines to find line/column numbers\\n"
    "- If you attempt to use editor_delete_lines immediately after calling editor_read_lines this will be rejected"
)`
            }),
            h('p', {},
                'That seems pretty explicit, right? You must use ', h('code', {}, 'editor_search'), ' to work out line numbers and you must not use ', h('code', {}, 'editor_read_lines'), '.'
            ),
            h('p', {},
                'Why are these rules here? The problem is LLMs have an inability to count things accurately. All the LLMs, given 40 to 50 lines of text from ', h('code', {}, 'editor_read_lines'), ' end up trying to guess what line number relates to a particular line. This estimate will never be predictable, even with the same model, as slight variations will cause different estimates.'
            ),
            h('p', {},
                'This is catastrophic when you\'re asking an LLM to make a predictable edit to a document. Occasionally they get the right line number, but more often they don\'t and they mess up the edits.'
            ),
            h('p', {},
                'The be fair to Claude Sonnet 4.5, it does do a very good job of trying to follow these rules, but it\'s the only LLM that I can find that does right now (this includes Gemini 3, GPT 5.1 and Grok 4).'
            ),
            h('p', {},
                'Interestingly, if you ask open-ended questions about what they did then all the models eventually conclude they didn\'t follow the rules they were given, but no amount of prompting up-front seems to prevent this reliably. I could try to implement some sort of list of examples of where things go wrong, but that will just pollute context windows.'
            ),
            h('p', {},
                'OK - that experiment didn\'t really work as planned.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Attempt 2'),
            h('p', {},
                'The definition of stupidity is to try something that already failed before and expect a different result. Sometimes this doesn\'t feel quite right with LLMs, but it\'s probably a good bet for humans.'
            ),
            h('p', {},
                'Having failed to get the LLM to use tools to work out line numbers I decided that maybe I just had to force the LLM to use them instead!'
            ),
            h('p', {},
                'Here\'s what changed:'
            ),
            CodeFragment.create({
                language: 'python',
                code: `content = editor_tab.get_text_range(start_line, end_line)`
            }),
            h('p', {},
                'It became this:'
            ),
            CodeFragment.create({
                language: 'python',
                code: `content = editor_tab.get_text_range(start_line, end_line)
context_object = {}
content_lines = content.splitlines()
for line_num, line_text in enumerate(content_lines):
    context_object[line_num + start_line if start_line is not None else line_num + 1] = line_text`
            }),
            h('p', {},
                'The idea was instead of returning a string full of newlines, I\'d split the lines into a JSON structure of this form:'
            ),
            CodeFragment.create({
                language: 'json',
                code: `{
    "1": "Content of line 1",
    "2": "Content of line 2",
    "3": "you get the picture..."
}`
            }),
            h('p', {},
                'Now suddenly the LLM no longer needs to guess at line numbers - it\'s given them explicitly. And, as if by magic, suddenly all the agentic editing started to work with pretty-much every LLM I could test!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Take 3'),
            h('p', {},
                'The work with the "insert", "append", and "delete" operations was interesting, but they still weren\'t really working well. Instead I decided to go with an approach which the LLM generated a unified diff and then patches the file in the editor.'
            ),
            h('p', {},
                '[Aside: this might be useful with the filesystem tool too].'
            ),
            h('p', {},
                'This exposed a couple of minor bugs in some of the newer code (e.g. some problems with double-escaping escaped characters such as double quotes) but this approach works well.'
            ),
            h('p', {},
                'LLMs are quite good at generating diffs as long as line numbers don\'t have to be too precise, so there\'s some fuzzy matching required. The tool design is fairly conservative and doesn\'t allow things to be too fuzzy. Instead LLMs are expected to correct major issues and resubmit.'
            ),
            h('p', {},
                'One interesting characteristic that has emerged now is by being able to interrupt the LLM while it\'s doing a series of tool calls I can point out that it won\'t be able to test changes without me restarting the app. Once I\'ve done this, it becomes a happy experience of the LLM asking me to restart, me telling it when it has been restarted (but in the same conversation), and then the LLM running tests on its own tools!'
            )
        )
    ];
}

export const notesPost_2025_11_21 = new NotesPost(
    '2025-11-21: Agentic editing - aaarggghhh!',
    '2025-11-21',
    '/notes/2025-11-21',
    'Agentic editing - aaarggghhh!',
    null,
    null,
    notesOpening_2025_11_21,
    notesArticle_2025_11_21,
    null
);
