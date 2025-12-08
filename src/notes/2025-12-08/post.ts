import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_12_08(): VElement[] {
    return [
        h('p', {},
            'Some lessons learned while fixing a tricky UI glitch in Humbug, and notes on the Humbug v0.33 and v0.32 releases.'
        )
    ];
}

function notesArticle_2025_12_08(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'A UI glitch'),
            h('p', {},
                'For the last few days I\'ve been trying to resolve a really annoying problem in Humbug.  The problem could only be seen if ' +
                'you were streaming a conversation that had lots of switches between code and non-code sections, and you were trying to read ' +
                'the parts of the conversation before that.'
            ),
            h('p', {},
                'This might sound a little odd, but I often find myself reading what an AI has started replying while its getting on with ' +
                'new things.  With agentic workflows where an AI does a series of tool uses and then moves on to plan or implement code, I\'d ' +
                'often find myself reading those tool uses.'
            ),
            h('p', {},
                'The problem manifested as the text glitching - text would bounce up the screen and then back down each time a new message ' +
                'section was added to the conversation.  It was pretty unusable!'
            ),
            h('p', {},
                'I have been trying to resolve versions of this problem for months.  Sometimes things would seem to be getting better, only ' +
                'to then get worse again over time.'
            ),
            h('p', {},
                'This weekend I decided to see if Claude could help.  It did - sort of.'
            ),
            h('p', {},
                'The thing Claude did really well was to instrument all the code around where the problem might be.'
            ),
            h('p', {},
                'Claude wrote a couple of different sets of instrumentation.  The first of these quickly confirmed my guess ' +
                'that we were fighting with the Qt layout engine.  The second approach narrowed things down.'
            ),
            h('p', {},
                'The ', h('code', {}, 'MinHeightTextEdit'), ' widget class is the core of both the code and the conversational text and this was "bouncing" in ' +
                'size during the initial load.  As the text size bounced then this was causing a cascade of layout adjustments that then ' +
                'caused new layout adjustments, and eventually would settle of few ms later.  Unfortunately these bouncing adjustments led ' +
                'to the text bouncing.'
            ),
            h('p', {},
                'So far, so good!'
            ),
            h('p', {},
                'Where Claude did less well was iterating over a solution, but it did it in a very human way.  The problem was that there ' +
                'was never going to be just one step to fix this.  It was going to require making a series of co-ordinated improvements ' +
                'until the problem ceased to be visible.  As with many human engineers in this situation, it was looking for a single ' +
                '"big bang" fix, and when it didn\'t find one it would get quite frustrated and suggest the problem couldn\'t be solved.  My ' +
                'guess is that human developers show their frustration when faced with this sort of problem and set an unfortunate pattern ' +
                'in the training data!'
            ),
            h('p', {},
                'After several hours, and quite a few iterations, the problem is not fully fixed, but it\'s now dramatically better.  Ironically, ' +
                'the final diff was only about 40 lines of code, although I\'ve made a few more tweaks since then.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.33'),
            h('p', {},
                'I didn\'t have time to write up notes online for everything here, but here are the notes for Humbug v0.33:'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added Ministral-3 and Mistral-large-3 support via the Ollama AI backend.'),
                h('li', {}, 'Added smooth scrolling for log and conversation tabs.')
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {}, 'Resolved a problem with tool definitions that affected the OpenAI backend.'),
                h('li', {},
                    'Resolved a problem with scrolling conversation and log tabs where scrolling to the centre of a message would be very ' +
                    'confusing.'
                ),
                h('li', {},
                    'Massively reduced the "jitter" when viewing a conversation that is streaming and you are viewing something above the ' +
                    'bottom of the conversation tab.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {}, 'Split out the system AI tool functionality into separate per-tab-type AI tools.')
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.32'),
            h('p', {},
                'I actually released Humbug v0.32 a week ago, so belatedly, here are the notes for Humbug v0.32:'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {}, 'Added Claude Opus 4.5 support via the Anthropic AI backend.'),
                h('li', {},
                    'Added Kimi-k2, Minimax-m2, GLM-4.6, and Gemini3-Pro-Preview via the Ollama AI backend.  Updated GLM and Gemini3 3 via the ' +
                    'Z.ai and Google backends to differentiate the two ways to access the same things.'
                ),
                h('li', {}, 'Added a series of new features to the system AI tool to allow AIs to interact with conversation tabs.'),
                h('li', {}, 'Added a series of new features to the system AI tool to allow AIs to interact with the mindspace log.'),
                h('li', {}, 'Added a series of new features to the system AI tool to allow AIs to interact with preview tabs.')
            )
        )
    ];
}

export const notesPost_2025_12_08 = new NotesPost(
    '2025-12-08: Humbug v0.33 (and belatedly v0.32)',
    '2025-12-08',
    '/notes/2025-12-08',
    'Humbug v0.33 (and belatedly v0.32)',
    null,
    null,
    notesOpening_2025_12_08,
    notesArticle_2025_12_08,
    null
);
