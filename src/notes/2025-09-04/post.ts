import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2025_09_04(): VElement[] {
    return [
        h('p', {},
            'Over the last few days I\'ve been using Humbug to help a company build something very cool. As part of that I got to use Humbug to build something other than itself. I found a few interesting quirks that I\'ve been fixing today.'
        )
    ];
}

function notesArticle_2025_09_04(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Human hallucination breaks LLM!'),
            h('p', {},
                'I realized it\'s quite annoying to edit text while a find operation is active and highlighting text, only for the editing ' +
                'to not update things. For example, the numbers of matches should change and highlighting should move as edits occur.'
            ),
            h('p', {},
                'This was also an interesting example of how my first intuitions about a design change can sometimes not quite be right.'
            ),
            CodeFragment.create({
                language: 'metaphor',
                code: `# A template for planning updates to Humbug.

Role:
    You are a world class python programmer, highly skilled in accurate and performant software development.  You
    are going to assist me in making modifications to my application.

Context:
    # Pull in the default Python coding rules for the project.
    Include: metaphor/python-rules.m6r

    # The project only uses external dependencies if there's no other choice.  This makes it
    # much easier for the AI to know what it's working with.
    Context: Dependencies
        Leverage standard library tools before custom solutions, unless specifically instructed, or
        unless a depdency is already in use.

    Context: Tool use
        You have a number of tools at your disposal.  Before using any of them, consider whether you need to use them or
        if you already have the information you require and only use them if you don't have it, or are unsure.

    Context: Existing code
        The following files are used in my application - as you have them here you do not need to re-read them:

        # Embed all the files that the AI will need to modify the code successfully.  If necessary,
        # describe what those files are used for.
        Embed: src/humbug/tabs/editor/*.py

Action:
    # Describe the details of the change required.
    When the editor is used to modify code, this may cause the current "find" to change.  The editor currently signals
    modifications, and irrespective of whether the code becomes modified or returns from being modified to unmodified
    this may need to trigger updating the search.

    Please propose a solution for this.

    I don't want you to code anything yet - I want to understand ways we can do this and to ask questions.`
            }),
            h('p', {},
                'This triggered Claude to give me 4 options, one of which seemed good and almost worked perfectly first time. What I ' +
                'realized, however, is the "almost perfectly" was because I\'d given it a bad steer about the behaviour I wanted. I had ' +
                'taken Claude\'s very sensible idea and told it to do something that didn\'t really make sense.'
            ),
            h('p', {},
                'The second version was better and was closer to correct, but was wrong because I\'d told it to use a signal that didn\'t ' +
                'work the way I\'d thought it did. This being despite me designing that signal in the first place!'
            ),
            h('p', {},
                'We\'re so used to the narrative that it\'s LLMs that hallucinate, but clearly both of these were down to me. The LLM just ' +
                'did what I told it!'
            ),
            h('p', {},
                'Anyway, find operations now do the right things when you\'re editing text.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Cleaning up tool approvals when the user hits "cancel"'),
            h('p', {},
                'Another quirk I\'d noticed was that if the user hits cancel while a tool approval was pending then the tool approval widget ' +
                'was left on the screen. Now it isn\'t.'
            )
        )
    ];
}

export const notesPost_2025_09_04 = new NotesPost(
    '2025-09-04: It\'s amazing how using software exposes bugs :-)',
    '2025-09-04',
    '/notes/2025-09-04',
    'Over the last few days I\'ve been using Humbug to help a company build something very cool. As part of that I got to use Humbug to build something other than itself. I found a few interesting quirks that I\'ve been fixing today.',
    null,
    null,
    notesOpening_2025_09_04,
    notesArticle_2025_09_04,
    null
);
