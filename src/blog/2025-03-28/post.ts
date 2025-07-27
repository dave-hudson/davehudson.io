import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_03_28(): VElement[] {
    return [
        h('p', {},
            'I was interested to see what Google Gemini 2.5 pro could do, compared with Claude Sonnet 3.7. ' +
            'Claude has been my go-to model for months now.'
        )
    ];
}

function blogArticle_2025_03_28(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'The good'),
            h('ul', {},
                h('li', {},
                    'Gemini can handle a very large context - my 35k lines of python required less than 35% of the ' +
                    'available context window. Google continue to win hands down on this as Claude can only get to ' +
                    'just over 20k lines of code before it hits its limits.'
                ),
                h('li', {},
                    'I asked it to find opportunities to refactor my code and it found quite a few (I knew about most ' +
                    'of them already). Its suggestions all looked architecturally sound.'
                ),
                h('li', {},
                    'It can clearly generate very large amounts of software (and it seems to be high quality), including ' +
                    'breaking things into file-sized chunks to make things easy to work with.'
                ),
                h('li', {}, 'Gemini is very fast at generating code.'),
                h('li', {}, 'You can try it for free as Google offer a free API tier!')
            )
        ),
        h('section', {},
            h('h2', {}, 'The not-so-good'),
            h('ul', {},
                h('li', {},
                    'Despite quite a lot of discussion it was very hard to get Gemini to not try and do other things ' +
                    'while it was doing the refactoring problem I asked it to try.'
                ),
                h('li', {},
                    'Even after I got it to stop adding pointless comments it insisted on "helpfully" doing unrelated ' +
                    'things. To be fair, it picked up and fixed a couple of bugs, corrected some type hinting issues, ' +
                    'and fixed some comments that were incorrect, but I\'d asked it not to touch anything that wasn\'t ' +
                    'directly related to my change. A big part of engineering process is to change one thing at a time, ' +
                    'so I\'d be happy if it told me about issues it found, but silently changing code is frustrating.'
                ),
                h('li', {}, 'I fairly quickly hit the "requests-per-day" limit.')
            )
        ),
        h('section', {},
            h('p', {},
                'On balance I\'m pretty impressed. It\'s dramatically better than earlier Google models, but I\'m not ' +
                'trading in Claude for doing implementation work just yet. Claude is just that bit better at doing what it\'s asked.'
            ),
            h('p', {},
                'With that said, I can now see me regularly using Gemini 2.5 to help me plan work for Claude. No matter ' +
                'how much I do this, there is still something enormously impressive about watching an AI review 35,000 lines ' +
                'of code and then make high quality suggestions about how to improve it within 15 seconds!'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2025-03-28/gemini.webp',
                    alt: 'Gemini offers thoughts on the design of Humbug.',
                    width: 1024,
                    height: 'auto'
                })
            )
        )
    ];
}

export const blogPost_2025_03_28 = new BlogPost(
    'Initial thoughts on Google Gemini 2.5',
    '2025-03-28',
    '/blog/2025-03-28',
    'An initial comparison of Google Gemini 2.5 Pro with Claude Sonnet 3.7 for code refactoring tasks.',
    '/blog/2025-03-28/gemini.webp',
    null,
    blogOpening_2025_03_28,
    blogArticle_2025_03_28,
    null
);