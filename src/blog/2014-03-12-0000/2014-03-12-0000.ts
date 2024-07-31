import {h, VNode} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost'

function blogOpening_2014_03_12_0000(): VNode[] {
    return [
        h('p', {},
            'There\'s something odd about the fluctuations in the price of Bitcoins.  The data shows a set of ' +
            'spikes when the price jumps up and then falls back somewhat and levels out.  This wouldn\'t be so ' +
            'unusual if the spikes occurred intermittently but in the case of Bitcoins the spikes happen ' +
            'with a very surprising regularity!'
        )
    ]
}

function blogArticle_2014_03_12_0000(): VNode[] {
    return [
        h('p', {}, 'Let\'s look at the graph:'),
        h('figure', {},
            h('img', {
                src: '/blog/2014-03-12-0000/20140312_BTC_Price.png',
                alt: 'Chart plotting the Bitcoin price over time',
                width: 1759,
                height: 1188
            }),
            h('figcaption', {}, 'Bitcoin price over time')
        ),
        h('p', {},
            'The first thing to note is that the graph is plotted with a logarithmic Y axis so each step ' +
            'indicates a price point ten times larger than the one below.  Using a log scale means that we see ' +
            'patterns in the relative change in price much more easily, rather than changes in the actual value.'
        ),
        h('p', {},
            'There are 7 major spikes in the Bitcoin price starting on 17th November 2010 and finishing on the ' +
            '30th November 2013.  If we ignore the spike on 10th February 2011 the other 6 spikes have an ' +
            'amazingly consistent spacing!'
        ),
        h('p', {},
            'All of the major price spikes also show another remarkable similarity.  In each case the price ' +
            'ramps up very quickly, hits its highest point for a day or two and then slowly drops off.'
        ),
        h('p', {},
            'So there are a few big questions (to which I don\'t have any answers right now):'
        ),
        h('ul', {},
            h('li', {}, 'Why does the price spike up every 7 to 7.5 months?'),
            h('li', {}, 'Why does the price never drop back below where it starts from?'),
            h('li', {}, 'Is the behaviour just coincidence or is someone or something triggering it?')
        ),
        h('p', {},
            'Does anyone have any data that might explain this?'
        )
    ];
}

export const blogPost_2014_03_12_0000 = new BlogPost(
    'Strange spikes in the Bitcoin price',
    '2014-03-12',
    '/blog/2014-03-12-0000',
    'There are strange periodic spikes in the Bitcoin price.  This blog post looks at them.',
    '/blog/2014-03-12-0000/20140312_BTC_Price.png',
    null,
    blogOpening_2014_03_12_0000,
    blogArticle_2014_03_12_0000,
    null
);
