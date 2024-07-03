import { h, VNode } from '../../lib/dvdi';
import { navigateEvent } from '../../app';
import { BlogPost } from '../BlogPost'

function blogOpening_201406050000(): VNode[] {
    return [
        h('p', {},
            'About 3 months ago I looked at how the BTC price seems to spike up approximately every 7 months.  It seems ' +
            'to be happening again!'
        ),
        h('p', {},
            'Over the last couple of weeks the BTC price has reversed its earlier falls and has yet again started to jump ' +
            'back up again.  The timing is pretty-much consistent with previous spikes.'
        )
    ]
}

function blogArticle_201406050000(): VNode[] {
    return [
        h('p', {}, 'Let\'s look at the graph (plotted on a logarithmic Y axis):'),
        h('figure', {},
            h('img', { src: '/blog/2014-06-05-0000/BTC-price.png' }),
            h('figcaption', {}, 'Chart of BTC price over time')
        ),
        h('p', {},
            'The trend of high points in the graph (red line) shows another ',
            h('a', { href: '/blog/2014-03-09-0000/', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-03-09-0000') }, 
                'theme park ride'
            ),
            '. Like any good thrill ride we see regular highs and lows; here the peaks are anywhere between 212 days ' +
            'and 235 days, but in general the later ones have been nearer 235 days.  235 days from the last high would ' +
            'be 2014-07-24.  It will be interesting to see if the current rises follow the same trend and if that\'s ' +
            'near our next destination.'
        ),
        h('p', {},
            'While our roller coaster may be an entertaining ride for many, the gentle slopes of the low point trend ' +
            '(green line) form an intriguingly steady path. Perhaps it\'s this trend that should be attracting far more ' +
            'attention?'
        )
    ];
}

function blogPostScript_201406050000(): VNode[] {
    return [
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Related articles'),
            h('ul', {},
                h('li', {},
                    h('a', { href: '/blog/2014-03-12-0000', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-03-12-0000') },
                        'Strange spikes in the Bitcoin price (2014-03-12)'
                    )
                )
            )
        )
    ];
}

export const blogPost_201406050000 = new BlogPost(
    'Strange spikes revisited!',
    '2014-06-05',
    '/blog/2014-06-05-0000',
    null,
    blogOpening_201406050000,
    blogArticle_201406050000,
    blogPostScript_201406050000
);
