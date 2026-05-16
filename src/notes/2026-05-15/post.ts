import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_05_15(): VElement[] {
    return [
        h('p', {},
            'Following the theme of Humbug v46, v47 is also dominated by user experience improvements.  While many of these are ' +
            'incremental, it does feature one new experimental idea: blueprints.'
        )
    ];
}

function notesArticle_2026_05_15(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Blueprints'),
            h('p', {},
                'A few months ago I retired my Metaphor language design.  It was a very interesting idea but felt too limited given the ' +
                'evolution of agentic search capabilities.  There was one area, however, which the agentic search didn\'t quite do how I wanted. ' +
                'AGENTS.md files are great for orienting AIs to what is in a mindspace, but aren\'t really quite right for capturing the shared ' +
                'intent of humans and AIs for what the mindspace is for and how it should evolve.  To fix this I\'ve added an experimental ' +
                'feature: blueprints.'
            ),
            h('p', {},
                'The idea of a blueprint is that we add a new type of file, named blueprint.md to the mindspace root folder, and potentially ' +
                'to sub-folders within it.  These files allow both humans and AIs to define the intent.'
            ),
            h('p', {},
                'AGENTS.md and README.md files orient AIs and humans as to what is there, blueprint.md files orient both as to how this ' +
                'should evolve.'
            ),
            h('p', {},
                'This is very much experimental right now, but the results have been very positive so far.  I\'ve seen Claude start to apply ' +
                'discipline around dependency management and in code structure that I\'ve not seen before.'
            ),
            h('p', {},
                'I also updated the system prompt to tell the AIs to update both types of docs where changes are appropriate.  Previously, this ' +
                'would have been quite ad-hoc, but now it feels much more systematic.'
            )
        ),
        h('section', {},
            h('h2', {}, 'PDF and Microsoft Word files'),
            h('p', {},
                'One of the original design intents for Humbug was to help with non-code related projects as much as software projects.  I ' +
                'finally took this a step further by adding support for reading the text content of PDF and Microsoft Word (.docx) files. ' +
                'These can either be attached to conversations or the AI can read them from the filesystem.'
            ),
            h('p', {},
                'Now it\'s possible to have an AI compare its code directly against a spec, a research paper, a product requirement, etc., but ' +
                'with those documents in their natural form.'
            ),
            h('p', {},
                'True to the Humbug ethos (and it\'s in the blueprint), this has been done without adding any new third party dependencies!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Non-baked in AI models'),
            h('p', {},
                'I need to do something more effective, but for now there\'s an ability to add AI models to the catalogue via a user-defined ' +
                'config file in ' +
                h('code', {}, '~/.humbug/user-ai-config.json') +
                '.  There\'s an example in the docs directory.'
            ),
            h('p', {},
                'This makes it possible to configure Humbug to use, say, custom LLMs in an enterprise environment.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Version 47'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Updated the grok model catalogue to grok 4.3, removing the now-obsolete 4.0 and 4.1 models.'),
                h('li', {}, 'Added the ability to view files that were attached to a message in a conversation.'),
                h('li', {}, 'Introduced the idea of ' +
                    h('code', {}, 'blueprint.md') +
                    ' files, allowing both AIs and human users to understand the intent of a mindspace.'
                ),
                h('li', {}, 'Allow a ' +
                    h('code', {}, '~/.humbug/user-ai-config.json') +
                    ' file to be used to define models not directly supported by Humbug.'
                ),
                h('li', {}, 'Added support for reading the text in PDF and DOCX files when attaching files to a conversation or when reading files via the filesystem AI tool.'),
                h('li', {}, 'The message input box now floats above historical messages when scrolling, making it easier to read earlier parts of a conversation while typing.'),
                h('li', {}, 'The alt+up/alt+down keyboard shortcuts in the conversation tabs now scroll between user messages, skipping all other types of message.  This lets you scroll to the important events more quickly.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Resolved an issue with lazy loading introduced in v46.'),
                h('li', {}, 'Improved the tab bar rendering with a custom painter (faster and contents are positioned more accurately).'),
                h('li', {}, 'Dragging a file from the mindspace tree that is already open in a column will now correctly open the tab in the correct location.'),
                h('li', {}, 'Scroll wheel operations on the Windows terminal now work correctly.'),
                h('li', {}, 'When shrinking a conversation tab\'s width, the message label will now elide (replace text with ' +
                    h('code', {}, '...') +
                    ') so the message does not end up too wide.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Attachments have been added as a specific concept inside AI conversations.  This keeps the context cleaner and will allow future innovations.')
            )
        )
    ];
}

export const notesPost_2026_05_15 = new NotesPost(
    '2026-05-15: Humbug v47',
    '2026-05-15',
    '/notes/2026-05-15',
    '2026-05-15: Humbug v47 introduces experimental blueprint files, PDF/DOCX support, user-configurable AI models, and many UX improvements.',
    null,
    null,
    notesOpening_2026_05_15,
    notesArticle_2026_05_15,
    null
);
