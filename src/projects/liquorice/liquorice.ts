import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectLiquoricePage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Liquorice',
                subtitle: 'A very small operating system and IPv4 network stack for embedded systems'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('p', {},
                        'Liquorice was a very small operating system and IPv4 network stack, written entirely from scratch.  It was ' +
                        'designed to run on 8-bit Atmel AVR and 32-bit x86 processors.'
                    ),
                    h('p', {},
                        'The project ran through much of 2000, but I stopped working on the public version when I joined Ubicom ' +
                        'at the end of 2000.  The project evolved as a commercial operating system and network stack called ' +
                        'ipOS.  While ipOS started out very similar to Liquorice, it quickly diverged as we simplified concepts ' +
                        'eliminated the software threading, and implemented much better design patterns to support some of the ' +
                        'networking.  Liquorice has some interesting ideas, and has a very small IP stack.',
                    ),
                    h('section', {},
                        h('h2', {}, 'Source code'),
                        h('p', {},
                            'The source code can be found on GitHub: ',
                            h('a', {href: 'https://github.com/dave-hudson/liquorice', target: '_blank'},
                                'https://github.com/dave-hudson/liquorice'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectLiquorice = new ProjectPage(
    'Liquorice',
    '/projects/liquorice',
    'A very small operating system and IPv4 network stack, designed to run on 8-bit Atmel AVR and ' +
    '32-bit x86 processors.  Written in C',
    projectLiquoricePage
);
