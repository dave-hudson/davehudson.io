import {h, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../lib/page";
import {navigateEvent} from '../app';

export function aboutPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'About me (Dave Hudson) and this site',
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
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
                                alt: 'Me',
                                width: 600
                            })
                        ),
                        h('p', {},
                            'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                            'I care to think about. In that time I\'ve been lucky enough to work on almost everything from tiny ' +
                            'embedded systems to mainframes, and from simple stand-alone devices to vast distributed or decentralised ' +
                            'systems. Along the way, I built operating systems, network stacks, compilers, and blockchains/distributed ' +
                            'ledgers. For a while I also helped design CPU instruction sets.'
                        ),
                        h('p', {},
                            'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                            'amazing people.  I now live in Abu Dhabi (UAE), although you\'ll occasionally still find me in North Wales (UK).'
                        ),
                        h('section', {},
                            h('h2', {}, 'What is this site?'),
                            h('p', {},
                                'This site hosts information about open source projects I\'ve been involved with, my blog, and my open ' +
                                'source research notes.'
                            ),
                            h('p', {},
                                'Lately my open source work has focused on AI, looking at what it takes to build an AI operating system.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Design philosophy'),
                            h('p', {},
                                'Over the years I have used a lot of different frameworks to host my blog site.  This one is very ' +
                                'different.  Early in my experiments using ChatGPT to help me write code, I decided to build my own ' +
                                'virtual DOM library so I could understand how single page applications (SPAs) work.  Over time that ' +
                                'library has evolved into a simple component framework.  This site is built using that framework, ' +
                                'with no third party dependencies apart from the nginx web server that serves the static files.'
                            ),
                            h('p', {},
                                'While pure HTML sites are all the rage, this site has exactly 37 lines of HTML!  Everything else is ' +
                                'generated using TypeScript.  The SPA is very fast to try to give a great user experience.'
                            ),
                            h('p', {},
                                'One problem with SPAs is search engine optimisation (SEO) as they really can\'t do much with ' +
                                'JavaScript.  To help with that I wrote a pre-rendering tool called ',
                                h('a', {
                                        href: ('/projects/siterender'),
                                        onclick: (e: MouseEvent) => navigateEvent(e, '/projects/siterender')
                                    },
                                    'siterender'
                                ),
                                '.  It ensures that whatever page you first hit has been pre-rendered to give a full HTML page, but ' +
                                'subsequent navigation is super fast as it\'s all done in the browser.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Disclaimer'),
                            h('p', {},
                                'Any opinions expressed are solely my own.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Privacy'),
                            h('p', {},
                                'The site does not use cookies (which is why you don\'t get asked about them).  The back-end ' +
                                'server does collect temporary logs for 28 days so I can check the site is working correctly.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Third party links and advertising'),
                            h('p', {},
                                'This site does not host any advertising.  If I include a link to anything, it\'s because I think it\'s ' +
                                'interesting or useful.  If there are any ads there, it\'s the linked article that I think is ' +
                                'interesting, not any advert.'
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
                    )
                )
            )
        ),
        pageFooter()
    );
}
