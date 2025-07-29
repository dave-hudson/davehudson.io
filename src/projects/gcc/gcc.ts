import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectGccPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'gcc (Ubicom processor backends)',
                subtitle: 'GCC backends for Ubicom\'s IP2k and Ubicom32 processor families'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'From 2001 to 2012 I maintained the backends for Ubicom\'s IP2k and Ubicom32 processor family versions of gcc.'
                        ),
                        h('p', {},
                            'The Ubicom32 processor family was very unusual.  All versions were heavily multithreaded (between 8 and 12 ' +
                            'threads), executing in a single pipeline.  Threads were interlaced so each instruction could be operating ' +
                            'on a separate thread context.  Used carefully this could make things incredibly efficient as most pipeline ' +
                            'hazards could be hidden by other threads.  The ISA was also very unusual in that it supported a ' +
                            'memory-to-memory architecture where many instructions could include 2 memory references in a single 32-bit ' +
                            'RISC instruction.'
                        ),
                        h('section', {},
                            h('h2', {}, 'Source code'),
                            h('p', {},
                                'The source code can be found on GitHub: ',
                                h('a', {href: 'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain', target: '_blank'},
                                    'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain'
                                )
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectGcc = new ProjectPage(
    'gcc (Ubicom processor backends)',
    '/projects/gcc',
    'Backends for Ubicom\'s IP2k and Ubicom32 processor family versions of gcc.',
    projectGccPage
);
