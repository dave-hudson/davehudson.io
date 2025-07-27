import {h, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter} from "../lib/page";

export function aboutPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'About me (Dave Hudson) and this site'),
            h('p', {className: 'meta'},
                'Last updated: ',
                h('time', {datetime: '2024-08-28T21:32'}, '2024-08-28 21:32')
            ),
            h('p', {},
                'Hello, good morning/afternoon/evening* and welcome! ',
                h('em', {}, '(*please delete as appropriate)')
            ),
            h('p', {},
                'I\'m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                'I would say I love maths too, but I should probably leave that to the experts :-)'
            ),
            h('figure', {},
                h('img', {
                    src: '/about/dave.webp',
                    alt: 'Me (apparently always pictured with a drink!)',
                    width: 600
                })
            ),
            h('p', {},
                'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                'I care to think about. In that time I\'ve had the pleasure of working on everything from massive scale ' +
                'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                'Along the way, I stopped to build operating systems, network stacks, compilers, and blockchains/DLTs. ' +
                'For a while I also helped design CPU instruction sets.'
            ),
            h('p', {},
                'Lately I\'ve been working with AI, looking at what it takes to build an AI operating system.'
            ),
            h('p', {},
                'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
            ),
            h('section', {},
                h('h2', {}, 'About this site'),
                h('p', {},
                    'This site hosts my personal blog and links to projects I\'ve been involved with.  It is not ' +
                    'affiliated with my employeer.  To use a common disclaimer, all opinions are my own.'
                )
            ),
            h('section', {},
                h('h2', {}, 'Privacy'),
                h('p', {},
                    'The site does not make use of cookies (which is why you don\'t get asked about them).  The back-end ' +
                    'server does collect temporary logs for 28 days, to let me check the site is working correctly.'
                )
            ),
            h('section', {},
                h('h2', {}, 'Contact me'),
                h('p', {},
                    'Please feel free to reach out to me on: ',
                    h('a', {href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io'}, 'Email'),
                    ', ',
                    h('a', {href: 'http://linkedin.com/in/davejh/', target: '_blank'}, 'LinkedIn'),
                    ', or ',
                    h('a', {href: 'http://x.com/davehudsonio', target: '_blank'}, 'X')
                )
            )
        ),
        pageFooter()
    );
}
