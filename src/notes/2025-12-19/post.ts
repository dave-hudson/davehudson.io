import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_12_19(): VElement[] {
    return [
        h('p', {},
            'Sometimes a software release isn\'t all about a major new feature, but about making a lot of incremental improvements to ' +
            'things that already existed.  Humbug v0.35 is one of those releases.'
        )
    ];
}

function notesArticle_2025_12_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Giving the human-in-the-loop more insights'),
            h('p', {},
                'One problem with being the human-in-the-loop for reviewing the work of an AI is to work out what the AI was trying to do, ' +
                'why it was trying to do it, and working out what happened afterwards.'
            ),
            h('p', {},
                'Key to this is to offer information about tool call contents and results.  v0.34 took the first steps with this, but v0.35 ' +
                'goes much further.  Doing this highlighted a few quirkly inconsistencies in many of the tools, however.  For example the ' +
                'response from the filesystem tool for ', h('code', {}, 'read_file_lines'), ' and the editor tool for ', h('code', {}, 'read_lines'),
                ' was different.  Worse, it was slightly weird text.'
            ),
            h('p', {},
                'This turned out to be a general problem across many of the tools.  The clock would return either ISO or Unix timestamp ' +
                'details but the filesystem would only return Unix timestamps.  The filesystem ', h('code', {}, 'read_file'), ' operation added text above the ' +
                'actual file contents but the AI would have no idea what that meant if the file contents looked similar.'
            ),
            h('p', {},
                'The resulting changes aren\'t perfect, but they\'re now dramatically less surprising to an AI that wants similar results ' +
                'from different tools.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Improving tool result handling'),
            h('p', {},
                'Until now we\'ve had "Approve Tool Call" and "Reject Tool Call" as a pretty binary set of options to any tool authorization. ' +
                'There was also a third, undocument, option to just submit a new message and that would reject the tool call but with an ' +
                'explanation of why, but this was a pretty weird user experience.'
            ),
            h('p', {},
                'In v0.35 I\'ve added the option for the user to say "I\'m unsure about this".  This rejects the tool call but tells the AI ' +
                'the user is unsure whether to approve or reject.  It does this by sending the AI a message along with the tool rejection, ' +
                'but that now triggers the AI to explain what it was trying to do.  This turns out to be a dramatically better user experience.'
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-12-19/tool-auth.webp', alt: 'New authorization options'}),
                h('figcaption', {}, 'New authorization options')
            ),
            h('figure', {},
                h('img', {src: '/notes/2025-12-19/lets-discuss.webp', alt: 'I\'m Not Sure'}),
                h('figcaption', {}, 'An example of "I\'m Not Sure"')
            )
        ),
        h('section', {},
            h('h2', {}, 'Using Humbug for writing documents'),
            h('p', {},
                'One of the things I\'ve been doing all this week is to use Humbug to help me write documents, more so than to write code. ' +
                'The markdown and preview capabilities make this a very powerful option.  I\'ll be doing more to make this particular ' +
                'experience even better, but this showed how powerful agentic editing and agentic document reviewing can be.  It also found ' +
                'a few bugs!'
            ),
            h('p', {},
                'Markdown is quite a tricky format because it\'s not formally defined.  In turn, there are a few quirky but unusual ' +
                'behaviours and it turned out the ', h('code', {}, 'dmarkdown'), ' code didn\'t handle a couple of them correctly.  Claude fixed these without ' +
                'much help once I gave it a test case and let it write a stand-alone test program.'
            ),
            h('p', {},
                'These problems were pretty grating when editing markdown, but also occasionally showed up in streaming content.  I\'d failed ' +
                'to fix one of these problems in about 4 hours earlier this year.  Claude fixed both in 25 minutes.  Another win for Claude!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.35'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'The filesystem AI tool now has an option to set the date/time format for ', h('code', {}, 'get_info'), ' requests.  This allows it to be more ' +
                    'consistent with the clock AI tool.'
                ),
                h('li', {},
                    'Added the ability for tool results to provide pretty-printed context information.  Updated all tools to offer this ' +
                    'capability where relevant.'
                ),
                h('li', {},
                    'Added a mindspace setting to allow terminal tabs to auto-close when the underlying shell exits (default enabled).'
                ),
                h('li', {},
                    'Auto-hide queued user messages after they have been used for the next user prompt.'
                ),
                h('li', {},
                    'Added a third "I\'m not sure" button to the AI tool approval widget.  This tells the AI the user is not actually ready ' +
                    'to approve and wants to discuss further.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Updated the AI tool documentation.'
                ),
                h('li', {},
                    'Fixed a minor race condition in the message UI that could lead to queued messages becoming the active message without ' +
                    'updating the display to show that had happened.'
                ),
                h('li', {},
                    'The clock AI tool never used to indicate which format it would use for outputs.  It now states that it defaults to ISO.'
                ),
                h('li', {},
                    'Relax an assertion that can occur when processing an empty markdown list.'
                ),
                h('li', {},
                    'Resolved a problem with deleting messages while the AI is streaming a response.'
                ),
                h('li', {},
                    'Resolved a problem with deleting messages where a tool approval is visible.'
                ),
                h('li', {},
                    'Fixed a problem in the markdown parser where we have multiple paragraphs in a list item.'
                ),
                h('li', {},
                    'Fixed a problem with rendering horizontal rules following tables.'
                ),
                h('li', {},
                    'Fixed a problem with the AIFPL syntax lexer/parser so it handles multi-line strings correctly.'
                ),
                h('li', {},
                    'Fixed a problem with the Scheme syntax lexer/parser so it handles multi-line strings correctly.'
                )
            )
        )
    ];
}

export const notesPost_2025_12_19 = new NotesPost(
    '2025-12-19: Humbug v0.35',
    '2025-12-19',
    '/notes/2025-12-19',
    'Humbug v0.35',
    null,
    null,
    notesOpening_2025_12_19,
    notesArticle_2025_12_19,
    null
);
