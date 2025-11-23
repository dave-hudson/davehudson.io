import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_23(): VElement[] {
    return [
        h('p', {},
            'Having fixed my agentic editing problems and quite a lot of bugs, I\'ve decided today should be Humbug v0.30.'
        )
    ];
}

function notesArticle_2025_11_23(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Bug fixing the UI'),
            h('p', {},
                'Sometimes one LLM will show something odd that others do not. A couple of days ago I noticed GLM doing something odd when streaming both AI responses and reasoning. The reasoning messages were in the correct place in the UI, but weren\'t completing until after the response messages.'
            ),
            h('p', {},
                'This turned out to be silly assumption in the widget code that only one message type would be being updated incrementally. Once I spotted the problem, Claude one-shotted a fix.'
            ),
            h('p', {},
                'Annoyingly, the fix was correct, but GLM started to add delays in its network responses at the same time so it looked like the fix wasn\'t working properly. Coincidences can be annoying!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Learning from the agentic editing tools'),
            h('p', {},
                'One thing I learned a few days ago is that LLMs work much better if we give them line numbers along with lines of text. If that works well in one place, it probably works well in others.'
            ),
            h('p', {},
                'I added a ', h('code', {}, 'read_file_lines'), ' operation to the filesystem tool to give AIs a chance to read files the same way (without having to first open them in an editor tab).'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.30'),
            h('p', {},
                'With this all done, it\'s time for v0.30!'
            ),
            h('p', {},
                'Here\'s the change log:'
            ),
            h('p', {},
                h('strong', {}, 'New features')
            ),
            h('ul', {},
                h('li', {}, 'Added support for Google Gemini 3 Pro, and removed support for Gemini 1.5 models.'),
                h('li', {}, 'Added a new patch applying operation to the system AI editor tools.'),
                h('li', {}, 'Removed the code from v0.29 that would modify text in an editor, as the new patch tool supersedes it.'),
                h('li', {}, 'Added a ', h('code', {}, 'read_file_lines'), ' tool to provide line numbers with each line to improve AI tool use reliability.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes')
            ),
            h('ul', {},
                h('li', {}, 'Removed "patch" tests as the provisional patch tool has now been removed from the project.'),
                h('li', {}, 'Fixed a problem when editing the last line of a file.'),
                h('li', {}, 'Some of the system AI tool descriptions were not clear about the need to use tab IDs.'),
                h('li', {}, 'Fixed a problem where the user queues a message during an AI streaming response but where no tool call occurs.'),
                h('li', {}, 'Fixed a problem with cancelling messages after an API error.'),
                h('li', {}, 'Fixed a problem with "thinking" Claude models.'),
                h('li', {}, 'Fixed a problem where renaming conversations did not always correctly resize tab labels.'),
                h('li', {}, 'Modified the ', h('code', {}, 'editor_read_lines'), ' tool to provide line numbers with each line to improve AI tool use reliability.'),
                h('li', {}, 'Resolved a visual update problem where reasoning and AI replies come back concurrently.')
            )
        )
    ];
}

export const notesPost_2025_11_23 = new NotesPost(
    '2025-11-23: Humbug v0.30',
    '2025-11-23',
    '/notes/2025-11-23',
    'Humbug v0.30',
    null,
    null,
    notesOpening_2025_11_23,
    notesArticle_2025_11_23,
    null
);
