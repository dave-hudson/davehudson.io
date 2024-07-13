import { h, VNode } from '../../lib/dvdi';
import { BlogPost } from '../BlogPost'

function blogOpening_202407131608(): VNode[] {
    return [
        h('p', {},
            'TBD.'
        )
    ]
}

function blogArticle_202407131608(): VNode[] {
    return [
        h('section', {},
            h('h2', {}, 'Blah'),
            h('p', {},
                'TBD.'
            )
        ),
    ];
}

export const blogPost_202407131608 = new BlogPost(
    'Building tools with ChatGPT',
    '2024-07-13T16:08',
    '/blog/2024-07-13-1608',
    'ChatGPT 4o is pretty amazing, but how good is it at building non-trivial software?' +
    'Here\'s how it did when I had it help build a website pre-rendering tool',
    null,
    null,
    blogOpening_202407131608,
    blogArticle_202407131608,
    null
);
