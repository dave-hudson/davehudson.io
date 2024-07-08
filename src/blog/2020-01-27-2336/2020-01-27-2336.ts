import { h, VNode } from '../../lib/dvdi';
import { BlogPost } from '../BlogPost'

function blogOpening_202001272336(): VNode[] {
    return [
        h('p', {},
            'A few days ago I decided to move away from my old Joomla-based blog site and set up my own static web site.  ' +
            'After some investigation I settled on using Hugo.  I was impressed by some of the web sites I\'d found ' +
            'that were using it.  Also my expertise in CSS, and JavaScript were pretty limited and Hugo didn\'t appear ' +
            'to need much of either.'
        ),
        h('p', {},
            'As I started to build the site I found myself treading a famililar path.  Every example I looked at did things ' +
            'in different ways so it was hard to work out how to put the learnings together in a coherent way.  As is the ' +
            'norm for busy engineers, the developers got things to work and then moved on to other things.  "Documentation ' +
            'is boring!"'
        ),
        h('p', {},
            'In some instances I could look at git histories and discern more of the developers\' intents, but all too often ' +
            'I ended up with a frustrating effort to reverse engineer what they\'d ended up building.  It\'s not like this ' +
            'was a surprise - I\'ve done this dozens, maybe hundreds of times.  But I wish, as an industry, we could do ' +
            'better.  I\'ve worked with many engineers and tried to persuade them we should, so maybe I can persuade you too?'
        )
    ];
}

function blogArticle_202001272336(): VNode[] {
    return [
        h('section', {},
            h('h2', {}, 'Names matter'),
            h('p', {},
                'As the joke goes, "there are two hard problems in computer sciences, cache invalidation, naming things, and ' +
                'off-by-one errors".'
            ),
            h('p', {},
                'When it comes to understanding something, however, names really matter.  We want them to make sense and not be ' +
                'surprising.  The original theme files I\'d picked up had some rather odd names.  For example the ',
                h('code', {}, '<head>'),
                ' tag had a partial HTML snippet file called ',
                h('code', {}, 'header.html'),
                ' while the HTML header was called ',
                h('code', {}, 'head.html'),
                '.  These are things that confused me over the last couple of days and would have done so again.  ' +
                'They weren\'t big sources of confusion, but every incremental time would have been more time wasted ' +
                'for me.  More importantly, they\'d have been an incremental source of confusion to anyone else who ' +
                'read the code for this site.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Good source code is as simple as possible'),
            h('p', {},
                'Developers seem to love to go to one of two extremes.  They either refactor nothing and leave large rambling ' +
                'blocks of code that are impossible to follow, or they refactor everything, turning trivial one and two line ' +
                'snippets into functions or methods.'
            ),
            h('p', {},
                'On the first extreme, large amounts of duplicate code is just a recipe for future problems.  Bugs don\'t end ' +
                'being fixed everywhere, or there\'s just way more code to understand than we should want.  If two blocks of ' +
                'code do the same thing then make it one block of code and save future maintainers from having to guess if ' +
                'they\'re the same or not.'
            ),
            h('p', {},
                'In the other extreme, if refactoring will result in more lines of source code than not, then is it really ' +
                'making life easier for anyone?'
            )
        ),
        h('section', {},
            h('h2', {}, 'Great source code is consistent'),
            h('p', {},
                'One of the things that\'s most frustrating to me is lack of consistency.  Doing the same thing in ' +
                'different ways just makes it harder for everyone who comes after you.  Future readers will wonder what ' +
                'makes one different to the other and worry about what they\'ve not understood.'
            ),
            h('p', {},
                'Great software, like great architecture, or art, should feel coherent.  It should appear to be the work of a ' +
                'single mind.  It has a singular style.'
            ),
            h('p', {},
                'It doesn\'t really matter what the style is, it should just always feel the same.  When ',
                h('code', {}, 'addFoo()'),
                ', ',
                h('code', {}, 'subtractFoo()'),
                ', and ',
                h('code', {}, 'multiplyFoo()'),
                ', are suddenly joined by ',
                h('code', {}, 'FooDivide()'),
                ', the inconsistency is grating.  We\'re left wondering how and why this last one is different from the others.  ' +
                'Even if we eventually conclude it isn\'t, we\'ve expended unecessary time and mental effort thinking about it.' 
            )
        ),
        h('section', {},
            h('h2', {}, 'Self documenting code completely misses the point of comments'),
            h('p', {},
                'This also brings me to a rant about commenting of code.  There\'s a school of thought that “self ' +
                'documenting” code is the best approach, but I\'d argue that that\'s ridiculous.  How do we tell the difference ' +
                'between buggy code and correct code?  How do we tell our future selves about things that we shouldn\'t ' +
                'do because they don\'t work well?  How do we hint at things that might want to happen in the future?  '
            ),
            h('p', {},
                'Yes, the commit logs in git, or whatever revision control system we\'re using, might provide some hints, but ' +
                'when was the last time you saw a long commentary about why code is the way it is in those logs?'
            ),
            h('p', {},
                'There are certainly bad comments.  There are those that don\'t match up with the code, or just describe ' +
                'obvious syntactic characteristics.  But just because it\'s possible to write bad comments doesn\'t offset the ' +
                'huge benefit of good ones.'
            ),
            h('p', {},
                'Great comments explain why the code is the way it\'s written.  They describe the paths not taken and the dragons ' +
                'that might be lurking there.  They provide the backstory for the code and can offer references to papers, ' +
                'articles, or standards.  They help a future reader understand all the thinking that went into it.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Unconvinced?  Here\'s a test'),
            h('p', {},
                'I don\'t expect to have convinced anyone yet, but here\'s a test that might help persuade you.  Take ' +
                'any significant piece of software that you\'ve written and find another developer who doesn\'t ' +
                'already understand it.  Your role is to answer any questions about your software, while their role is ' +
                'to read it and explain back to you how each part works.'
            ),
            h('p', {},
                'What I\'ve always find interesting about doing this (and it works much better in person) is the dialogue that ' +
                'invariably happens.  You reader will likely seek clarifications.  Often they\'ll end up saying to themselves ' +
                'things like “err, oh, hang on, no, that\'s not what it\'s doing”.  Sometimes they\'re completely baffled.  ' +
                'Occasionally they\'ll find bugs.  Almost never do they scroll quickly through the code just describing it!'
            ),
            h('p', {},
                'Of course, in this test, you\'re the one that wrote the code, so you understand it completely.  As you watch ' +
                'your counterpart struggle, though, you may find yourself offering insights that are neither obvious from the ' +
                'code structure, nor in the comments.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Source code needs to be written for people'),
            h('p', {},
                'So, finally, here\'s the thing that I wish more software developers thought about.'
            ),
            h('p', {},
                'The objective of writing good source code isn\'t to make a compiler or interpreter happy, it\'s for the ' +
                'benefit of future readers.  Those people are our most important audience.'
            )
        )
    ];
}

export const blogPost_202001272336 = new BlogPost(
    'Understanding other people\'s code',
    '2020-01-27 23:36',
    '/blog/2020-01-27-2336',
    '',
    null,
    blogOpening_202001272336,
    blogArticle_202001272336,
    null
);
