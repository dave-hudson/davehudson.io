import { h } from '/lib/dvdi.js';
import { navigateEvent } from '/app.js';
import { BlogPost } from '/blog/BlogPost.js'

function blogArticle_201512200000() {
    return [
        h('p', {},
            'In November 2014 I wrote an article, "',
            h('a', { href: '/blog/2014-11-11-0000', onClick: (e) => navigateEvent(e, '/blog/2014-11-11-0000') },
                'Bitcoin traffic bulletin?'
            ),
            '" that sought to look at what happens if the Bitcoin network started to get congested.  Since then there has ' +
            'been considerable debate about the Bitcoin block size and there are now many proposals to increase block capacity.'
        ),
        h('p', {},
            'In the original blog post the network\'s block capacity was at about 30%.  As of early December 2015 the ' +
            'network\'s block capacity is at least 58%.  In practice some blocks are mined smaller than the full 1M bytes ' +
            'that could be used (see "',
            h('a', { href: '/blog/2015-01-18-0000', onClick: (e) => navigateEvent(e, '/blog/2015-01-18-0000') },
                'The myth of the megabyte Bitcoin block'
            ),
            '") and so we may have more block capacity being used:'
        ),
        h('figure', {},
            h('img', { src: '/blog/2015-12-20-0000/blocksizes.png' }),
            h('figcaption', {}, 'Block sizes over time')
        ),
        h('p', {},
            'The simple Monte Carlo simulation from that earlier post models the effects of loading on first transaction ' +
            'confirmations:'
        ),
        h('figure', {},
            h('img', { src: '/blog/2015-12-20-0000/first-conf-0-100.png' }),
            h('figcaption', {}, 
                'Probabilities for time to a first block confirmation with the Bitcoin network at various load levels ' +
                '(log scale)'
            )
        ),
        h('p', {},
            'During 2015 we have seen a few attempts to generate "stress tests" that spam the Bitcoin network with large ' +
            'volumes of transactions.  In each instance transaction confirmation times were seen to increase, and ' +
            'arguably fees increases to match.  This suggests that the network can adapt reasonably well, but service ' +
            'was certainly affected, not least because transactions with small fees could be almost indefinitely delayed.'
        ),
        h('hr', {}),
        h('h2', {}, 'Related articles'),
        h('ul', {},
            h('li', {},
                h('a', { href: '/blog/2015-01-18-0000', onClick: (e) => navigateEvent(e, '/blog/2015-01-18-0000') },
                    'The myth of the megabyte Bitcoin block (2015-01-18)'
                )
            ),
            h('li', {},
                h('a', { href: '/blog/2014-11-11-0000', onClick: (e) => navigateEvent(e, '/blog/2014-11-11-0000') },
                    'Bitcoin traffic bulletin? (2014-11-11)'
                )
            )
        )
    ];
}

export const blogPost_201512200000 = new BlogPost(
    'Bitcoin traffic bulletin (redux)',
    '2015-12-20',
    '/blog/2015-12-20-0000',
    blogArticle_201512200000
);
