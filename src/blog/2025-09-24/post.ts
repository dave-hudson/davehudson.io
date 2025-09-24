import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_09_24(): VElement[] {
    return [
        h('p', {},
            'LLMs are famously bad at counting letters in text. They\'re not very good at complicated maths, either, but they are ' +
            'pretty good at writing programs that can do these things. If they have tools available, they sometimes resort to ' +
            'writing Python scripts to do this sort of work, but those risk the AI doing weird or potentially dangerous things. ' +
            'If we could give them a safe programming environment, however, that would be pretty awesome.'
        ),
        h('p', {},
            'For a long time I\'ve wanted to build a pure functional programming language because I could see a lot of uses for ' +
            'it. For LLMs, though, this would offer the safety I had in mind. The language can be very expressive but sandboxed. ' +
            'It doesn\'t need access to filesystems or networks, for example. ' +
            'Instead, it can rely on the LLM setting up any inputs and interpreting the outputs.'
        ),
        h('p', {},
            'Previously, I\'ve put off trying to build this because it would have taken months to get everything I wanted. ' +
            'Now, of course, I could use an LLM to help me build this (Claude Sonnet).'
        )
    ];
}

function blogArticle_2025_09_24(): VElement[] {
    return [
        h('p', {},
            'Another interesting idea was to see if I could also use the LLM as a sounding board to ensure the language had the ' +
            'features it would want to use. In the end, 90%+ of the ' +
            'work in designing, building, refactoring, refining, writing tests, etc., was done by talking with the AI and ' +
            'having it do the actual work.'
        ),
        h('p', {},
            'So one week on, I now have a Lisp-inspired higher-order functional programming language (it\'s called AIFPL), a ' +
            'tool description and it\'s integrated into my open-source dev environment.'
        ),
        h('p', {},
            'Now for the magical part! The LLMs can now write code in this language to solve problems.'
        ),
        h('p', {},
            'Here\'s a test prompt: "I have a terminal open - please look at the last 5 lines of text in it and tell me how many ' +
            'times the letter d appears in each line".'
        ),
        h('figure', {},
            h('img', {
                src: '/blog/2025-09-24/terminal.webp',
                alt: 'The terminal I asked it to look at',
                style: 'width: 100%; height: auto;'
            }),
            h('figcaption', {},
                'The terminal I asked it to look at'
            )
        ),
        h('p', {},
            'It had to do a little unprompted working around the problem (I\'m running Sonnet in a non-thinking mode), but after 35 ' +
            'seconds we got to this:'
        ),
        h('figure', {},
            h('img', {
                src: '/blog/2025-09-24/answer.webp',
                alt: 'Claude gets the correct answer',
                style: 'width: 100%; height: auto;'
            }),
            h('figcaption', {},
                'Claude gets the correct answer'
            )
        ),
        h('p', {},
            'And for a bonus, it then explains what it did:'
        ),
        h('figure', {},
            h('img', {
                src: '/blog/2025-09-24/explanation.webp',
                alt: 'Explaining it all',
                style: 'width: 100%; height: auto;'
            }),
            h('figcaption', {},
                'Explaining it all'
            )
        ),
        h('p', {},
            'So there we go - my theory got some validation. The AI can now use the language it helped me build to write code that ' +
            'answers a non-programming question!'
        ),
        h('p', {},
            'If you\'re interested, the code is all open source. The AIFPL code is currently on a ',
            h('code', {}, 'v0.26'),
            ' branch but will merge later ' +
            'this week: ',
            h('a', {
                href: 'https://github.com/m6r-ai/humbug',
                target: '_blank',
                rel: 'noopener'
            }, 'https://github.com/m6r-ai/humbug'),
            '.'
        )
    ];
}

export const blogPost_2025_09_24 = new BlogPost(
    'I decided to design a functional programming language for LLMs to use',
    '2025-09-24',
    '/blog/2025-09-24',
    'How I built AIFPL, a Lisp-inspired functional programming language designed specifically for LLMs to use as a safe, sandboxed environment for solving mathematical and computational problems without the risks of general-purpose programming languages.',
    null,
    null,
    blogOpening_2025_09_24,
    blogArticle_2025_09_24,
    null
);
