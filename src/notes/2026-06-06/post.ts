import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_06(): VElement[] {
    return [
        h('p', {},
            'The last day and a half have brought a lot of interesting ideas into play.  These are a major focus for Humbug v49.'
        )
    ];
}

function notesArticle_2026_06_06(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Document processing'),
            h('p', {},
                'I used Humbug for a lot of things, but increasingly I\'m using it to review documents.  A lot of features have been added in the ' +
                'last couple of months to make this easier.'
            ),
            h('p', {},
                'Markdown has been a fundamental element of the design since its inception, but while this is great for engineers, it\'s less ' +
                'great for the rest of the world.  Most of the world\'s docs are either PDF or DOCX (Microsoft Word).'
            ),
            h('p', {},
                'PDF will have to wait, but DOCX and Markdown have a lot of similar features so I built a document intermediate representation ' +
                '(\u0060doc_ir\u0060) and converters both to and from both DOCX and Markdown.  There are stand-alone conversion tools in the tools ' +
                'directory but more importantly there\'s now a new AI tool, \u0060document_convert_ai_tool\u0060 that will let an AI do this for you.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Gemma 4 QAT'),
            h('p', {},
                'Google always do really interesting things.  This caught my eye today because I\'ve long wanted a very capable local model that ' +
                'can be an always-on companion within Humbug while more capable cloud models will be introduced as needed.'
            ),
            h('p', {},
                h('a', {href: 'https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/'},
                    'https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/'
                )
            ),
            h('p', {},
                'I will experiment with this some more in the future.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Signs of interesting things'),
            h('p', {},
                'A couple of days ago I added support for the AI to use a Menai program to edit files or editor buffers.  This felt like it would ' +
                'be a really useful feature but I\'ve not actually seen it used.  Today I have seen it used when the AI couldn\'t work out how ' +
                'to handle a character escaping problem.'
            ),
            h('p', {},
                'Previously it would have always tried to do this with \u0060sed\u0060 or by writing a python script!'
            )
        ),
        h('section', {},
            h('h2', {}, 'v49'),
            h('p', {},
                h('strong', {}, 'New features'),
                ':'
            ),
            h('ul', {},
                h('li', {},
                    'The GUI is now in \u0060src/desktop\u0060, not \u0060src/humbug\u0060.  This allows for other (future) frontends.  This means you must use ' +
                    '\u0060python -m desktop\u0060 to launch the application now, not \u0060python -m humbug\u0060.'
                ),
                h('li', {},
                    'The filesystem and editor tools now have the ability for an AI to use Menai programs to modify files/editor buffers.'
                ),
                h('li', {},
                    'Markdown rendering (including in AI conversations) now supports blockquotes.'
                ),
                h('li', {},
                    'When delegating a task to an AI, if the AI model is available from more than one backend provider, the tool now tells the AI ' +
                    'and asks it to select the correct one.'
                ),
                h('li', {},
                    'Google Gemini models now show their reasoning.'
                ),
                h('li', {},
                    'Added Claude Opus 4.8 and removed 4.6.'
                ),
                h('li', {},
                    'Added a new abstract document IR and conversion logic to convert markdown and DOCX format files into/out-of this format.'
                ),
                h('li', {},
                    'Added a new DOCX AST and code to read/write DOCX format using it.'
                ),
                h('li', {},
                    'Added support for strikethrough in the markdown parser.'
                ),
                h('li', {},
                    'Added a tool to convert docs to markdown.'
                ),
                h('li', {},
                    'Replaced the app icon!'
                ),
                h('li', {},
                    'Added a document converter AI tool.  Initially this can convert between markdown and DOCX.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes'),
                ':'
            ),
            h('ul', {},
                h('li', {},
                    'Resolved a problem that could leave the cursor in the wrong column after the UI resized a terminal.'
                ),
                h('li', {},
                    'On moving tabs between columns we could end up placing the tab in the wrong position in the new column.'
                ),
                h('li', {},
                    'System shell and AI tool operations could end up leaving ephemeral tabs as ephemeral instead of making them permanent.'
                ),
                h('li', {},
                    'If a task was delegated to an AI that generated an HTTP error, the error wasn\'t propagated to the caller.'
                ),
                h('li', {},
                    'Fixed a problem where no syntax highlighting was applied for YAML, TOML, bash, PHP and Ruby files.'
                ),
                h('li', {},
                    'Resolved a problem where new tabs might not have the correct focus.'
                ),
                h('li', {},
                    'Fixed a regression related to file attachments in conversations.'
                ),
                h('li', {},
                    'Improved text extraction from PDF files.'
                ),
                h('li', {},
                    'The tab label for "File Save As" did not automatically update to reflect the new name.'
                ),
                h('li', {},
                    'If a file is moved and had an open tab then the new location is picked up and the tab is updated to the new path.'
                ),
                h('li', {},
                    'Markdown indentation for embedded code blocks could end up incorrect.'
                ),
                h('li', {},
                    'When applying diffs via the filesystem or an editor buffer, if any hunk fails to apply then none apply.  Updated ' +
                    'the error responses to make this clear so the AI never assumes some did apply.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes'),
                ':'
            ),
            h('ul', {},
                h('li', {},
                    'Moved the core AI tools into separate top-level modules so the dependency management is clearer.'
                ),
                h('li', {},
                    'Switched GUI-interacting AI tools to use a new context registry enabling other front ends in the future.'
                ),
                h('li', {},
                    'Separated out more functionality from the tab manager (was the column manager) into the tabs.'
                ),
                h('li', {},
                    'Created a clean separation of sidebar functionality and added a new sidebar manager.'
                ),
                h('li', {},
                    'Hoisted all tabs and sidebars to the top of the \u0060src/desktop\u0060 directory.'
                ),
                h('li', {},
                    'Added pytest tests for the Markdown syntax highlighter.'
                )
            )
        )
    ];
}

export const notesPost_2026_06_06 = new NotesPost(
    '2026-06-06: Code, lots of code... oh, and v49',
    '2026-06-06',
    '/notes/2026-06-06',
    '2026-06-06: Code, lots of code... oh, and v49 - Document processing, Gemma 4 QAT, and Humbug v49 release notes.',
    null,
    null,
    notesOpening_2026_06_06,
    notesArticle_2026_06_06,
    null
);
