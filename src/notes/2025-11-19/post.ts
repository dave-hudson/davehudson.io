import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_19(): VElement[] {
    return [
        h('p', {},
            'In the few days since I released v0.29, I\'ve been spending a lot of time trying to work out how to get the best out of the agentic editing code. It has been more frustrating than I\'d hoped.'
        )
    ];
}

function notesArticle_2025_11_19(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Agentic editing'),
            h('p', {},
                'There are a couple of core problems:'
            ),
            h('ul', {},
                h('li', {}, 'LLMs are awful at counting things.  They almost invariably guess, and guess wrong, for things such as line numbers, etc.'),
                h('li', {}, 'They default to being quite sloppy in thinking about how to use editor tools.')
            ),
            h('p', {},
                'The first of these can be solved a few different ways, but essentially LLMs need to find ways to orient themselves by using tool calls rather than by estimating.  For example if an LLM searches for some text then they know exactly which line number the text appears.'
            ),
            h('p', {},
                'The second one is subtle.  If I "remind" an LLM to be careful and think through any changes then they will tend to become more thoughtful about checking what they\'re about to do and then confirming they\'ve done it.  I have seen this lead to quite slow and deliberate conversations, but where the output quality is very high.'
            ),
            h('p', {},
                'Another headache was to discover that my initial APIs for editing turned out to be ambiguous.  Coupled with not thinking about the impact of edits on line numbers and the LLMs were more likely to cause chaos than to help.  As of now, the APIs have been revised so they\'re line-oriented and the composite "replace" operation has been changed so we have "delete", "insert", and "append".  It turns out trying to combine append and insert also causes more trouble than it\'s worth!'
            ),
            h('p', {},
                'It feels like I\'m going to need to add agentic patching to keep things fast.  For now, at least, the agentic editing is viable, especially for large documents.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Google Gemini 3'),
            h('p', {},
                'Google Gemini 3 got released yesterday.  It\'s a very capable model and I wanted to include it.'
            ),
            h('p', {},
                'It turns out this one does some interesting things to support reasoning around tool calls.  Essentially it has to record a signature that means something to Google\'s servers and that isn\'t visible in the conversation history held by the user.'
            ),
            h('p', {},
                'The AI backend already had support for a similar concept by virtue of the "redacted reasoning" support that was added for the Anthropic models, but that also turned out to have a couple of bugs which I had to fix.  Now the reasoning signatures are captured in the conversation model, allowing them to be replayed on new conversation turns.'
            ),
            h('p', {},
                'As I was adding Gemini 3, I removed the Gemini 1.5 models as they\'re obsolete.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Miscellaneous bugs'),
            h('p', {},
                'As always, testing things exposed some bugs.  One interesting one related to queued user messages interacting with API call failures.  There was a very subtle indentation bug in a `finally` handler that was not resetting a state machine correctly.  Now fixed!'
            )
        )
    ];
}

export const notesPost_2025_11_19 = new NotesPost(
    '2025-11-19: Experiments with agentic editing',
    '2025-11-19',
    '/notes/2025-11-19',
    'Experiments with agentic editing',
    null,
    null,
    notesOpening_2025_11_19,
    notesArticle_2025_11_19,
    null
);