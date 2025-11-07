import {h, VElement} from '../../lib/dvdi';
import {CodeFragment} from '../../lib/code-fragments/CodeFragment';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_11_07(): VElement[] {
    return [
        h('p', {},
            'Teeing up Humbug v0.27 (no it\'s not ready yet)'
        )
    ];
}

function notesArticle_2025_11_07(): VElement[] {
    return [
        h('section', {},
            h('p', {},
                'I\'ve been thinking about what v0.27 should contain.  It won\'t be a "big bang" release but I\'ve come to realize it will ' +
                'represent quite a distinct shift in how I\'ve been thinking about Humbug.'
            ),
            h('h2', {}, 'AIFPL discussions on Reddit'),
            h('p', {},
                'I posted a summary of AIFPL on r/lisp on Reddit a couple of day ago and got some interesing feedback.  This has shifted ' +
                'some of my thinking in an unexpected way (have to love surprises)!'
            ),
            h('p', {},
                'A user, u/Valuable_Leopard_799, pointed out that while AIFPL is Lispy, its list concept isn\'t.  In Lisp/Scheme, lists are ' +
                'generally constructed of cons cells, but for AIFPL I deliberately avoided this because objects are immutable.  The ' +
                'array-like lists are much more efficient, but this has some subtle consequences.  One is that the ', h('code', {}, 'cons'), ' operator in ' +
                'AIFPL is more restrictive because it only deals in lists, and never other atoms.  I\'m ok with this, but it needed ' +
                'documenting.'
            ),
            h('p', {},
                'u/Valuable_leopard_799 also pointed out that it actually is possible to create a cyclic data strcture in AIFPL, but it ' +
                'takes some jumping through hoops.  The trick is the data structure has to capture a closure in an interesting way!'
            ),
            h('p', {},
                'Here\'s what they came up with:'
            ),
            CodeFragment.create({
                language: 'aifpl',
                code: '(let ((x (list (lambda () x)))) ((first ((first ((first ((first x)))))))))'
            }),
            h('p', {},
                'This is very cool.'
            ),
            h('p', {},
                'This also means my assumption I could do all my memory management with reference counting in a future AIFPL compiler or VM ' +
                'will not work!  All isn\'t too bad though.  With AIFPL not supporting mutations, we don\'t have to worry about arbitrary ' +
                'list mutations and instead just have to worry about closures being created.  Only closures can create cycles, thus all ' +
                'other object types can be reference counted and closures will need a mark and sweep cycle-detecting GC.  This is still ' +
                'a big simplification and performance optimization.'
            ),
            h('h2', {}, 'Farewell "wiki", hello "preview"'),
            h('p', {},
                'Some time ago, I added the concept of a wiki tab and wiki view.  The original plan was to allow these pages to automatically ' +
                'aggregate data from users, from source files, and from AIs.  While I did get started with the latter part, I never really ' +
                'did much with it.  That\'s because it turned out that the agentic operations in conversations are just a much more ' +
                'natural way to pull things together.  If an AI wants to materialize a view for you, it can do it in much more interesting ' +
                'ways now!'
            ),
            h('p', {},
                'The wiki code has some useful features, however, so I\'m now rebranding this as a previewer, which is what I have been ' +
                'using it for over the last few months.'
            ),
            h('h2', {}, 'A shift in thinking'),
            h('p', {},
                'The wiki change is an example of a subtle shift in my perspective.  Ever since I added the tool to allow an AI to control ' +
                'the UI, I\'ve found I spend even more time in conversations than ever.  Ironically, Humbug started with conversations at the ' +
                'core, but the lack of tools made them somewhat limited.'
            ),
            h('p', {},
                'Looking back at the early days of Humbug, I can now see I was stuck building a UI that focused on the human user with AI ' +
                'being sort of bolted onto the side.  Oddly, at the time, I didn\'t see it quite that way.'
            ),
            h('p', {},
                'Now the whole design has shifted to being more of a paired exploration of a problem and solutions.  They key insight was ' +
                'in allowing the AI to control everything the user can control then we suddenly get a much more balanced system design!'
            ),
            h('p', {},
                'The next few versions will focus more in this area.'
            ),
            h('p', {},
                'Along these lines, my new "user interrupt" feature has simply become "user queueing" as the human is simply queueing ' +
                'messages for the AI - essentially just interjecting while the AI holds an monologue with itself.  The UX is elegant, and ' +
                'this feels like quite a natural approach.'
            ),
            h('h2', {}, 'Fixing some long-latent UI problems'),
            h('p', {},
                'There\'s an annoying glitchiness if you try to read part of a newly-streamed message while more is streaming below it.  I\'ve ' +
                'long suspected this is a Qt issue, but I did think to look carefully at the code today.'
            ),
            h('p', {},
                'The first thing I noticed was there was no attempt to do incremental edits of documents when streaming message data.  This ' +
                'was pretty silly and wasteful.  Now fixed.'
            ),
            h('p', {},
                'The seocond thing was discovering my deferred streaming update logic got broken months ago!  It may actually never have ' +
                'worked properly.  Now it does!  Streaming is now more fluid and takes less CPU time.'
            ),
            h('p', {},
                'The third issue was I found some duplicated/redundant code.  Not a lot, but now it\'s gone.'
            ),
            h('p', {},
                'I also fixed a minor irritant bug that had crept in over the last few months - it had meant the syntax highlighting header ' +
                'wasn\'t always rendered correctly, even though the code would be.'
            )
        )
    ];
}

export const notesPost_2025_11_07 = new NotesPost(
    '2025-11-07: Teeing up Humbug v0.27 (no it\'s not ready yet)',
    '2025-11-07',
    '/notes/2025-11-07',
    'Teeing up Humbug v0.27 (no it\'s not ready yet)',
    null,
    null,
    notesOpening_2025_11_07,
    notesArticle_2025_11_07,
    null
);