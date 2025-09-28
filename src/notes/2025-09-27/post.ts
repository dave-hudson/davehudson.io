import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_09_27(): VElement[] {
    return [
        h('p', {},
            'Improving AIFPL test coverage and reflecting on architectural thinking in LLMs'
        )
    ];
}

function notesArticle_2025_09_27(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving AIFPL test coverage'),
            h('p', {},
                'One of the more interesting problems of building a language is it has to be incredibly robust and very well tested. ' +
                'Designing a language for use by AIs is even harder because they won\'t file bug reports!  A bad language design will, at ' +
                'best, result in the AI having to debug their way around problems.  At worst, this will silently cause bad results to find ' +
                'their way into whatever the AI was trying to do.'
            ),
            h('p', {},
                'My benchmark is to aim for 100% test coverage of all lines of code and branches.  Even this isn\'t enough because we ' +
                'can still see "interesting" permutational problems, but at least with AIFPL we\'re dealing with a functional language so ' +
                'we can hope these problems are minimized.'
            ),
            h('p', {},
                'What this does mean in scrutinizing code coverage reports from ', h('code', {}, 'pytest'), '.  Today I\'ve been finding all those places Claude ' +
                'didn\'t think to remove during rework, or just added because "I might need this later".  This seems to be a problem with ' +
                'quite a few LLMs - they don\'t understand YAGNI at a fundamental level.'
            ),
            h('h2', {}, 'LLMs really don\'t think architecturally'),
            h('p', {},
                'I\'ve spent several hours cleaning up the AIFPL code and finding subtle weird things that just make everything a little ' +
                'more tricky to work with.  It\'s not dissimilar to reviewing the code of junior engineers who haven\'t yet learned to think ' +
                'about a bigger architectural picture.'
            ),
            h('p', {},
                'I found a few weird almost-duplicate code paths, and in several cases it was because the LLM had debugged its way out of ' +
                'a problem, but hadn\'t stopped to look if similar code existed elsewhere.'
            ),
            h('p', {},
                'As I\'d been in somewhat of a hurry to see what I could build in the last 10 days I\'d taken my eye off this.  The code worked ' +
                'just fine, it was just a bit clunky inside.'
            ),
            h('p', {},
                'I could conjecture several reasons why they are trained to work the way they do, but chief among them will be a lack of ' +
                'maintaining a vision of how the architecture is supposed to look.  Humans will learn some elements of this in a codebase ' +
                'with which they become familiar, but LLMs don\'t "learn".  TBH, though, give a human a few weeks away from a codebase and ' +
                'they\'ll start to forget everything too :-)'
            )
        )
    ];
}

export const notesPost_2025_09_27 = new NotesPost(
    '2025-09-27: Ensuring AIFPL',
    '2025-09-27',
    '/notes/2025-09-27',
    'Improving AIFPL test coverage and reflecting on architectural thinking in LLMs',
    null,
    null,
    notesOpening_2025_09_27,
    notesArticle_2025_09_27,
    null
);
