import { h } from '/lib/dvdi.js';

export function blogArticle_201405190000() {
    return [
        h('p', {},
            'I was just pointed at an article over on ',
            h('a', { href: 'http://bitcoinmagazine.com/12914/bitcoins-made-in-china/' }, 'bitcoinmagazine.com'),
            '.  It (quite independently) reaches many of the same conclusions that I\'ve been reaching for the last ' +
            'few months. I highly recommend it!',
        ),
        h('p', {},
            'As the web has a habit of breaking over time, there\'s a PDF of this too: ',
            h('a', { href: '/blog/2014-05-19-0000/Bitcoins-Made-in-China.pdf' }, 'Bitcoins Made in China')
        )
    ];
}
