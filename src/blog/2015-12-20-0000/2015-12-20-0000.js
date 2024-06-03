import { h } from '/lib/dvdi.js';
import { navigateEvent } from '/app.js';

export function blogArticle_201512200000() {
    return [


        h('p', {},
            ''
        ),
        h('h2', {}, ''),
        h('figure', {},
            h('img', { src: '/blog/2015-12-20-0000/' }),
            h('figcaption', {}, '')
        ),
        h('hr', {}),
        h('h2', {}, 'Source code'),
        h('p', {},
            'This article was written with the help of data from a C language simulation.  The data was rendered into ' +
            'charts using Excel.  The source code can be found on github: ',
            h('a', { href: 'https://github.com/dave-hudson/bitcoin-traffic-bulletin' },
                'https://github.com/dave-hudson/bitcoin-traffic-bulletin'
            )
        ),
        h('hr', {}),
        h('h2', {}, 'Related articles'),
        h('ul', {},
            h('li', {},
                h('a', { href: '/blog/2014-11-02-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-11-02-0000') },
                    '7 transactions per second?  Really? (2014-11-02)'
                )
            )
            h('li', {},
                h('a', { href: '/blog/2014-06-15-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-06-15-0000') },
                    'Finding 2016 blocks (2014-06-15)'
                )
            ),
            h('li', {},
                h('a', { href: '/blog/2014-05-20-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-05-20-0000') },
                    'Hash rate headaches (2014-05-20)'
                )
            )
        )
    ];
}
