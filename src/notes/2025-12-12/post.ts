import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_12_12(): VElement[] {
    return [
        h('p', {},
            'One of the headaches with AIs doing lots of tool calling is it\'s quite hard to work out what they\'re doing when they ' +
            'request tool approvals.  I figured the best way to address this was to make them produce diffs, especially as recent ' +
            'updates had enabled the editor and filesystem tools to apply diffs.'
        )
    ];
}

function notesArticle_2025_12_12(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Diffs'),
            h('p', {},
                'One of the headaches with AIs doing lots of tool calling is it\'s quite hard to work out what they\'re doing when they ' +
                'request tool approvals.  I figured the best way to address this was to make them produce diffs, especially as recent ' +
                'updates had enabled the editor and filesystem tools to apply diffs.'
            ),
            h('p', {},
                'The starting point was to add a diff syntax highlighter.  That took about 30 minutes earlier this week.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-12-12/diff-syntax.webp', alt: 'Diff syntax highlighting'}),
                h('figcaption', {}, 'Diff syntax highlighting')
            ),
            h('p', {},
                'The next part was to modify the AI tool infrastructure so the "tool call" approval UI can take additional context and ' +
                'display it above the approval buttons.  This disappears once the approval is given or not given.'
            ),
            h('p', {},
                'Lastly, one of the things that has frustrated me since I built the tool calling was that many of the operations in the tools ' +
                'generate code/text/diffs but this was only visible as part of a JSON data structure.  As I was making updates to this code, ' +
                'I added the ability for tools to provide markdown-formatted context information that can be pretty-printed.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-12-12/tool-approval.webp', alt: 'Tool approvals now offer more context'}),
                h('figcaption', {}, 'Tool approvals now offer more context')
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-12-12/putting-it-together.webp', alt: 'Putting it all together'}),
                h('figcaption', {}, 'Putting it all together')
            ),
            h('p', {},
                'This feels like a big improvement.  I can now get a much clearer idea what an LLM is doing before I have to agree to let it ' +
                'do anything.'
            ),
            h('p', {},
                'It\'s also much easier to work out how an LLM is using the AIFPL tool.  I\'ve noticed that Claude Sonnet is very fond of ' +
                'writing small AIFPL snippets that appear to help it debate approaches to problems.  This is quite curious behaviour so ' +
                'the new update should help me understand that more.  I\'ll now be able to read the AIFPL code quite easily.'
            )
        ),
        h('section', {},
            h('h2', {}, 'AI tool refactoring'),
            h('p', {},
                'While I was doing the updates to the tool system I noticed quite a lof of duplication between my various AI tools.  I ' +
                'figured this should be refactored to simplify maintenance.'
            ),
            h('p', {},
                'It turned out that the various tools had diverged in unexpected ways so the refactoring has put them back into a standard ' +
                'form.  This will make it easier to extend the tooling system in the future.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.34'),
            h('p', {},
                'v0.34 features the changes above plus some more AI model updates.  This eliminates some old ones that have been replaced ' +
                'by substantially better new ones.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added grok-4-fast and grok-4.1-fast models.'),
                h('li', {}, 'Removed grok-3 models.'),
                h('li', {}, 'Added diff/patch syntax highlighting.'),
                h('li', {},
                    'Added the ability to extract diffs between the current editor buffer and the previously-saved version of an editor file, ' +
                    'and added that as a ', h('code', {}, 'get_diff'), ' editor AI tool operation.'
                ),
                h('li', {},
                    'Added code to allow tool calls to register a context extraction function that can present pretty-printed context to the ' +
                    'user in the tool call messages.'
                ),
                h('li', {}, 'Updated the editor AI tool diff applier to pretty-print the diff that was applied.'),
                h('li', {}, 'Updated the AIFPL AI tool evaluate operation to pretty-print the expression being evaluated.'),
                h('li', {}, 'Updated the filesystem AI tool to show the diff in the approval widget.'),
                h('li', {}, 'Removed Claude Haiku 3.5 and Claude Sonnet 3.7 models.'),
                h('li', {}, 'Added GPT 5.2 models.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Improved took operation naming in the filesystem tool.'),
                h('li', {},
                    'Resolved problem when reloading a preview tab while find was active and after editing and saving the source file on which ' +
                    'the preview was based.'
                ),
                h('li', {},
                    'Resolved problem if you deleted a message and the changed the zoom level (this would duplicate the text in the input ' +
                    'prompt box).'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Harmonized all the AI tools to use a new standard operation-based approach.')
            )
        )
    ];
}

export const notesPost_2025_12_12 = new NotesPost(
    '2025-12-12: A diff-erent version, Humbug v0.34',
    '2025-12-12',
    '/notes/2025-12-12',
    'A diff-erent version, Humbug v0.34',
    null,
    null,
    notesOpening_2025_12_12,
    notesArticle_2025_12_12,
    null
);
