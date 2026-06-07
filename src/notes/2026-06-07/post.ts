import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_07(): VElement[] {
    return [
        h('p', {},
            'I\'d planned to release v49 yesterday, but a "bright idea" got in the way.  v49 is out today.'
        )
    ];
}

function notesArticle_2026_06_07(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Document processing revisited'),
            h('p', {},
                'I\'d added DOCX and Markdown conversion support, but it occurred to me that it would be nice to have HTML as well.  As I\'ve often ' +
                'noted, the 3rd version of something one sees is often the one that solidifies core abstractions, so having a 3rd format made ' +
                'sense.  It turns out this third one was quite tricky.'
            ),
            h('p', {},
                'Markdown is a very specific subset of HTML, but HTML has interesting quirks I\'d not thought about.  Some formatting controls ' +
                'in HTML just can\'t be expressed in Markdown, or in DOCX.'
            ),
            h('p', {},
                'The HTML support I have today isn\'t fully complete as a result, because the document IR will probably need an update to ' +
                'accomodate everything correctly.  It\'s not bad though, and perfect is the enemy of done.'
            ),
            h('p', {},
                'Implementing the HTML parsing was interesting though.  Claude was fairly insistent on wanting to pull in a third party library, ' +
                'and I\'m pretty sure would have ignored all other instructions to the contrary had it been left to make the decision on its own.'
            ),
            h('p', {},
                'Building the HTML DOM parser really wasn\'t that hard though, so this feels like another area where vibe coders would have got ' +
                'a bad outcome, while human-in-the-loop coders would not.'
            )
        ),
        h('section', {},
            h('h2', {}, 'GUI quirks'),
            h('p', {},
                'I really hate building GUIs.  The probability that some innocuous-looking change has unexpected consequences elsewhere is high.'
            ),
            h('p', {},
                'At some point I really want to build a new UI that\'s based on functional design principles, rather than being object-based.'
            )
        ),
        h('section', {},
            h('h2', {}, 'v49'),
            h('p', {},
                h('strong', {}, 'New features:'),
            ),
            h('ul', {},
                h('li', {},
                    'The GUI is now in src/desktop, not src/humbug.  This allows for other (future) frontends.  This means you must use ' +
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
                    'Added support for strikethrough in the markdown parser.'
                ),
                h('li', {},
                    'Added a new DOCX AST and code to read/write DOCX format using it.'
                ),
                h('li', {},
                    'Added a new HTML DOM and code to read/write HTML using it.'
                ),
                h('li', {},
                    'Added a \u0060convert_document\u0060 CLI tool to convert docs between markdown, DOCX, and HTML.'
                ),
                h('li', {},
                    'Added a document converter AI tool.  Initially this can convert between markdown, DOCX, and HTML.'
                ),
                h('li', {},
                    'Replaced the app icon!'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:'),
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
                ),
                h('li', {},
                    'Removed the ability to pass "current" as the session ID to be shared with a child AI.  Passing the history became very ' +
                    'confusing as the child didn\'t understand what it was being presented.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:'),
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
                    'Hoisted all tabs and sidebars to the top of the src/desktop directory.'
                ),
                h('li', {},
                    'Added pytest tests for the Markdown syntax highlighter.'
                ),
                h('li', {},
                    'Added a new abstract document IR.'
                )
            )
        )
    ];
}

export const notesPost_2026_06_07 = new NotesPost(
    '2026-06-07: Last minute polish and Humbug v49',
    '2026-06-07',
    '/notes/2026-06-07',
    '2026-06-07: Last minute polish and Humbug v49 - Document processing revisited, GUI quirks, and Humbug v49 release notes.',
    null,
    null,
    notesOpening_2026_06_07,
    notesArticle_2026_06_07,
    null
);
