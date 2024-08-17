import {VNode} from '../lib/dvdi';
import {pageFooter, pageHeader} from "../lib/page";
import {
    anchor,
    div,
    emphasis,
    figure,
    figureCaption,
    heading1,
    heading2,
    image,
    main,
    paragraph,
    section,
    time
} from "../lib/dvdi.html-elements";

export function aboutPage(): VNode {
    return div({},
        pageHeader(),
        main({className: 'main'},
            heading1({}, 'About me (Dave Hudson) and this site'),
            paragraph({className: 'meta'},
                'Last updated: ',
                time({datetime: '2024-05-29T07:45'}, '2024-05-29 07:45')
            ),
            paragraph({},
                'Hello, good morning/afternoon/evening* and welcome! ',
                emphasis({}, '(*please delete as appropriate)')
            ),
            paragraph({},
                'I\'m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                'I would say I love maths too, but I should probably leave that to the experts :-)'
            ),
            figure({},
                image({
                    src: '/about/dave.jpg',
                    alt: 'Me (apparently always pictured with a drink!)',
                    width: 539,
                    height: 509
                }),
                figureCaption({}, 'Me (apparently always pictured with a drink!)')
            ),
            paragraph({},
                'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                'I care to think about. In that time I\'ve had the pleasure of working on everything from massive scale ' +
                'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                'Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also ' +
                'helped design CPU instruction sets.'
            ),
            paragraph({},
                'Lately I\'ve been building blockchain and distributed ledger systems.'
            ),
            paragraph({},
                'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
            ),
            section({},
                heading2({}, 'About this site'),
                paragraph({},
                    'This site hosts my personal blog and links to projects I\'ve been involved with.  It is not ' +
                    'affiliated with my employeer.  To use a common disclaimer, all opinions are my own.'
                ),
                paragraph({},
                    'From time-to-time, I may also use it to showcase new ideas or concepts.'
                )
            ),
            section({},
                heading2({}, 'Privacy'),
                paragraph({},
                    'The site does not make use of cookies (which is why you don\'t get asked about them).  The back-end ' +
                    'server does collect logs for up to 28 days, to let me understand how the site is behaving and ' +
                    'which pages are generating interest.'
                )
            ),
            section({},
                heading2({}, 'Contact me'),
                paragraph({},
                    'Please feel free to reach out to me on: ',
                    anchor({href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io'}, 'Email'), ', ',
                    anchor({href: 'http://linkedin.com/in/davejh/', target: '_blank'}, 'LinkedIn'), ', ',
                    anchor({href: 'http://x.com/davehudsonio', target: '_blank'}, 'X'), ', or ',
                    anchor({href: 'http://instagram.com/davehudsonio', target: '_blank'}, 'Instagram')
                )
            )
        ),
        pageFooter()
    );
}
