import { CodeFragment } from '../../lib/code-fragments';
import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_09(): VElement[] {
    return [
        h('p', {},
            'Following on from the last few days, I\'ve been experimenting with having LLMs do even more work when I\'m creating ' +
            'new blog posts and notes pages. I also tested Ollama\'s new gpt-oss models with impressive results.'
        )
    ];
}

function notesArticle_2025_08_09(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Creating notes and blog posts'),
            h('p', {},
                'Following on from the last few days, I\'ve been experimenting with having LLMs do even more work when I\'m creating ' +
                'new blog posts and notes pages.  The idea is to have the LLM read a markdown file with the content and then ' +
                'create the content pages with this content loaded.'
            ),
            h('p', {},
                'Used this to create a new blog page (',
                h('a', {href: '/blog/2025-08-09'}, 'blog/2025-08-09'),
                ').'
            ),
            CodeFragment.create({
                file: '/notes/2025-08-09/blog-post.md',
                language: 'markdown',
                caption: 'Blog post content included in this notes page'
            })
        ),
        h('section', {},
            h('h2', {}, 'Ollama gpt-oss:20b and gpt-oss:120b'),
            h('p', {},
                'After yesterday\'s less than impressive GPT-5 experience I\'ve been trying gpt-oss:20b and gpt-oss:120b.  This is ' +
                'OpenAI actually being open!'
            ),
            h('p', {},
                'My MacBook Air M3 has 16 GBytes of RAM.  Trying to run this locally was less than impressive.  I gave up waiting for ' +
                'a response to "hello".  They\'ve added a "Turbo" feature, however, that runs the LLMs in the cloud.'
            ),
            h('p', {},
                'I added code to the Ollama backend in Humbug and signed up for the Turbo service.  Generated a new API key ' +
                'on the ollama.com website.'
            ),
            h('p', {},
                'It wasn\'t obvious what endpoint I should be using for this.  The docs are pretty vague!  It turns out we need to use ',
                h('code', {}, 'https://ollama.com/api/chat'),
                '.'
            ),
            h('p', {},
                'I\'m guessing that perhaps this isn\'t yet under a lot of load, but the initial performance for the Turbo service is ' +
                'staggering.  I\'ve not seen any LLMs do anything like this.'
            ),
            h('p', {},
                'Here\'s a fairly non-scientific comparison of asking 4 different LLMs to do this:'
            ),
            h('blockquote', {},
                h('p', {},
                    '"please review the source code of my website - the code is in the src directory. ' +
                    'I\'d like a summary of the capabilities"'
                )
            ),
            h('table', {},
                h('thead', {},
                    h('tr', {},
                        h('th', {}, 'Model'),
                        h('th', {}, 'Speed'),
                        h('th', {}, 'Summary')
                    )
                ),
                h('tbody', {},
                    h('tr', {},
                        h('td', {}, 'gpt-oss:120b'),
                        h('td', {}, '15s'),
                        h('td', {}, 'Detailed description of the site and core components')
                    ),
                    h('tr', {},
                        h('td', {}, 'Claude Sonnet 4'),
                        h('td', {}, '60s'),
                        h('td', {}, 'High level summary of the design with pros and cons')
                    ),
                    h('tr', {},
                        h('td', {}, 'GPT 4.1'),
                        h('td', {}, '30s'),
                        h('td', {}, 'Less detailed than the previous 2 but a reasonable summary.  Read fewer files and inferred more')
                    ),
                    h('tr', {},
                        h('td', {}, 'GPT 5'),
                        h('td', {}, '1200s+'),
                        h('td', {}, 'Went on a token-fueled rampage that constantly rate limited.  Looks like it was going to be more thorough than other models, but I\'m not waiting any longer!')
                    )
                )
            ),
            h('p', {},
                'gpt-oss is impressively quick and did a nice job with the tool use.'
            )
        )
    ];
}

export const notesPost_2025_08_09 = new NotesPost(
    '2025-08-09: Notes, blog posts, and Ollama\'s gpt-oss',
    '2025-08-09',
    '/notes/2025-08-09',
    '2025-08-09: Experimenting with LLMs creating blog posts and notes pages, and testing Ollama\'s impressive new gpt-oss models.',
    null,
    null,
    notesOpening_2025_08_09,
    notesArticle_2025_08_09,
    null
);
