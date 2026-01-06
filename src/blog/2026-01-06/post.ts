import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2026_01_06(): VElement[] {
    return [
        h('p', {},
            'I\'ve been building ',
            h('a', {
                href: 'https://davehudson.io/projects/humbug',
                target: '_blank',
                rel: 'noopener'
            }, 'Humbug'),
            ' for over a year, and it\'s one year this week since I released v0.1. For all that time I\'ve been ' +
            'planning for a future v1.0 of Humbug, but no specific version felt like it warranted such a big bang change.'
        ),
        h('p', {},
            'I started Humbug with a view that it could help engineers, product managers, security analysts, etc. all collaborate ' +
            'with AI in a new sort of tool.'
        ),
        h('p', {},
            'That vision has worked out far better than I imagined. I now use it daily for building and testing software, for reviewing ' +
            'design ideas, editing and critiquing specifications, assessing third party code, and even maintaining my blog site. ' +
            'With lots of agentic features, and 100k net-new lines of code (with many hundreds of thousands more that came and went), ' +
            'the v0 prefix has been feeling increasingly stale.'
        ),
        h('p', {},
            'The obvious thing would be to move to v1.0, but I\'ve been starting to realize that aside from being rather arbitrary, ' +
            'I couldn\'t see an obvious way I\'d ever move to a v2.0 in the future. Semantic versioning just doesn\'t feel right.'
        )
    ];
}

function blogArticle_2026_01_06(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'The end of SemVer for Humbug'),
            h('p', {},
                'I\'ve used semantic versioning (SemVer) for a very long time (over 30 years) and until now it has served me very well. ' +
                'Everything I built before strove for determinism. Predictable logic delivered predictable results against predictable ' +
                'APIs. Any non-determinism only appeared at the level of the human user.'
            ),
            h('p', {},
                'Humbug poses a new problem, however. We put a non-deterministic LLM on top of the deterministic tools, and now suddenly ' +
                'the behaviour seen by a human user is no longer so predictable. Even worse, AI models change and update so ' +
                'frequently that tool usage becomes more an art than a science. Minor changes in some aspect of a prompt, or innocuous ' +
                'backwards-compatible changes in a deterministic API, can suddenly cause one or more models to behave in new and ' +
                'unexpected ways.'
            ),
            h('p', {},
                'The tools and core mechanisms inside Humbug all fit with the SemVer model, but Humbug itself really doesn\'t.'
            ),
            h('p', {},
                'At this point there are really only 2 options: calendar versioning (CalVer) or a simple sequence number.'
            ),
            h('p', {},
                h('em', {}, '[Aside: yes, I know there are some other more obscure approaches. MAME has stuck at v0.x forever, the "perpetual beta" feel seems wrong.]')
            )
        ),
        h('section', {},
            h('h2', {}, 'Decisions, decisions'),
            h('p', {},
                'If you read my ',
                h('a', {
                    href: 'https://davehudson.io/notes',
                    target: '_blank',
                    rel: 'noopener'
                }, 'Notes'),
                ' you\'ll see I like CalVer approaches to many things, but in the end I decided this would get messy. As the pace ' +
                'of releases picks up, CalVer invariably starts to get messy with either a sequence number for the year or month, or else ' +
                'ends up getting progressively more granular. If I\'m going to end up with a sequence number anywhere, I might as well ' +
                'just use a sequence number. The bigger the number, the better the version - done!'
            ),
            h('p', {},
                'Starting with the next release (today), I\'m dropping the leading zero. The last release was v0.36, and this one is v37. The ' +
                'next one will be v38, etc.'
            ),
            h('p', {},
                'So perhaps Humbug really came of age about a year ago with what I\'d now call v1, I just never realized!'
            )
        )
    ];
}

export const blogPost_2026_01_06 = new BlogPost(
    'Humbug comes of age',
    '2026-01-06',
    '/blog/2026-01-06',
    'After over a year of development and 100k+ lines of code, Humbug is graduating from v0.x to a simpler versioning scheme that better reflects the non-deterministic nature of AI-powered tools.',
    null,
    null,
    blogOpening_2026_01_06,
    blogArticle_2026_01_06,
    null
);
