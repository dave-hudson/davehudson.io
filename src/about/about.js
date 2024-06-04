import { h } from '/lib/dvdi.js';
import { pageHeader, articleTitle, pageFooter } from "/lib/page.js";

export function aboutPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('About Me', '2024-05-29 07:45'),
            h('p', {},
                'Hello, good morning/afternoon/evening* and welcome! ',
                h('em', {}, '(*please delete as appropriate)')
            ),
            h('p', {},
                'I\'m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                'I would say I love maths too, but I should probably leave that to the experts :-)'
            ),
            h('figure', {},
                h('img', { src: '/about/dave.jpg', alt: 'Me (apparently always pictured with a drink!)' }),
                h('figcaption', {}, 'Me (apparently always pictured with a drink!)')
            ),
            h('p', {},
                'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                'I care to think about. In that time I\'ve had the pleasure of working on everything from massive scale ' +
                'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                'Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also ' +
                'helped design CPU instruction sets.'
            ),
            h('p', {},
                'Lately I\'ve been building blockchain and distributed ledger systems.'
            ),
            h('p', {},
                'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
            ),
            h('h2', {}, 'Contact me'),
            h('p', {},
                'Please feel free to reach out to me on: ',
                h('a', { href: 'http://twitter.com/hashingitcom' }, 'Twitter'),
                ' or ',
                h('a', { href: 'http://linkedin.com/in/davejh/' }, 'LinkedIn')
            )
        ),
        pageFooter()
    );
}
