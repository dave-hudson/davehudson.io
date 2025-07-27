import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_06_01(): VElement[] {
    return [
        h('p', {},
            'Over the last few months, quite a few people have asked me whether it\'s possible to get an AI to build good tests for ' +
            'software. I\'ve always told them LLMs can do a pretty amazing job, but you need to be very clear about what you want them ' +
            'to do. I\'ve also been asked how I manage to get large amounts of working code from Metaphor prompts.'
        ),
        h('p', {},
            'I figured a good example might go a long way!'
        ),
        h('p', {},
            'Over the last month or so, I\'ve built a new Markdown parser (abstract syntax tree builder). I needed to add some tests, ' +
            'so I recorded a video of me adding them. All done using a couple of Metaphor prompts and Humbug.'
        )
    ];
}

function blogArticle_2025_06_01(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Why Humbug has its own Markdown parser'),
            h('p', {},
                'You might be asking why Humbug has a special Markdown parser.  After all, there are lots of good open-source ones around. ' +
                'The answer is Humbug has a few unusual requirements:'
            ),
            h('ul', {},
                h('li', {},
                    'There are a lot of parsing capabilities inside Humbug and I want them to all work in a consistent way to make the code ' +
                    'easier to understand.'
                ),
                h('li', {},
                    'Most Markdown parsers assume a complete Markdown file, but Humbug has to deal with streaming responses from LLMs and ' +
                    'that means we can end up with contents that don\'t make sense until more data arrives. Humbug has to handle that gracefully.'
                ),
                h('li', {},
                    'Markdown doesn\'t have a very clean syntax and has some interesting quirks. One important one for Humbug is around ' +
                    'the handling of code fence blocks (denoted by 3 backticks). Humbug needs to handle the scenario where a code fence ' +
                    'appears inside a code block (e.g. in a multi-line string or comment block).'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'Building tests with AI assistance'),
            h('p', {},
                'The video has two halves. The first walks through setting up the original test design and shows how to have an ' +
                'LLM build something new with some constraints. The second shows the original tests being enhanced.'
            ),
            h('p', {},
                'At the end there\'s 90%+ test coverage and about 1400 lines of commented tests and test support.'
            ),
            h('figure', {},
                h('div', {
                    style: 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000;'
                },
                    h('iframe', {
                        src: 'https://www.youtube.com/embed/Q0BGCs_4flk',
                        style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
                        width: 560,
                        height: 315,
                        title: 'Writing tests with Metaphor',
                        'aria-label': 'YouTube video: Writing tests with Metaphor'
                    })
                ),
                h('figcaption', {}, 'Writing tests with Metaphor demonstration')
            )
        ),
        h('section', {},
            h('h2', {}, 'Key takeaways'),
            h('p', {},
                'This demonstration shows several important principles for successful AI-assisted development:'
            ),
            h('ul', {},
                h('li', {},
                    'Clear constraints and requirements lead to better AI output. By being specific about what the tests needed to do, ' +
                    'the AI could generate appropriate test cases.'
                ),
                h('li', {},
                    'Metaphor\'s structured approach helps maintain consistency across different AI interactions, making it easier to ' +
                    'build on previous work.'
                ),
                h('li', {},
                    'Iterative enhancement works well with AI assistance. Starting with a solid foundation and then building on it ' +
                    'produces better results than trying to create everything at once.'
                ),
                h('li', {},
                    'Good test coverage is achievable with AI assistance when you provide proper context and clear expectations.'
                )
            )
        ),
        h('section', {},
            h('h2', {}, 'What\'s next?'),
            h('p', {},
                'This example demonstrates how Metaphor and Humbug can work together to produce substantial, high-quality code with ' +
                'AI assistance. The ability to generate comprehensive test suites quickly and reliably is a significant productivity ' +
                'multiplier for any development team.'
            ),
            h('p', {},
                'If you\'re interested in trying this approach yourself, check out our ',
                h('a', {
                    href: 'https://github.com/m6r-ai/getting-started-with-metaphor',
                    target: '_blank',
                    title: 'Getting started with Metaphor guide'
                }, 'getting started guide'),
                ' and join us on ',
                h('a', {href: 'https://discord.gg/GZhJ7ZtgwN', target: '_blank'}, 'Discord'),
                ' to share your experiences and learn from others in the community.'
            )
        )
    ];
}

export const blogPost_2025_06_01 = new BlogPost(
    'Writing tests with Metaphor',
    '2025-06-01',
    '/blog/2025-06-01',
    'A practical demonstration of using Metaphor and AI assistance to build comprehensive test suites, showing how to get large amounts of working code from structured prompts.',
    null,
    null,
    blogOpening_2025_06_01,
    blogArticle_2025_06_01,
    null
);