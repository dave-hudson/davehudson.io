import { h, VNode } from '../../lib/dvdi';
import { pageHeader, pageFooter } from "../../lib/page";
import { ProjectPage } from '../ProjectPage';

export function projectGccPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', { className: 'main' },
            h('h1', {}, 'gcc (Ubicom processor backends)'),
            h('p', {},
                'From 2001 to 2012 I maintained the backends for Ubicom\'s IP2k and Ubicom32 processor family versions of gcc. ' +
                'I no longer have links for the IP2k version, but the 32-bit Ubicom32 version can be found here: ',
                h('a', { href: 'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain', target: '_blank' },
                    'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain')
            ),
            h('p', {},
                'The Ubicom32 processor family was very unusual.  All versions were heavily multithreaded (between 8 and 12 ' +
                'threads), executing in a single pipeline.  Threads were interlaced so each instruction could be operating ' +
                'on a separate thread context.  Used carefully this could make things incredibly efficient as most pipeline ' +
                'hazards could be hidden by other threads.  The ISA was also very unusual in that it supported a ' +
                'memory-to-memory architecture where many instructions could include 2 memory references in a single 32-bit ' +
                'RISC instruction.'
            )
        ),
        pageFooter()
    );
}

export const projectGcc = new ProjectPage(
    '/projects/gcc',
    projectGccPage
);
