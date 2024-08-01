import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectVSTaPage(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'VSTa'),
            h('p', {},
                'VSTa (short for Valencia\'s Simple Tasker) was a self-hosting microkernel operating system build in the ' +
                '1990s.  It had a lot of novel ideas, a simple and elegant kernel, and featured user-space device drivers ' +
                'and filesystems.  Unusually, it also had a kernel debugger so if anythign went wrong it would drop into ' +
                'the debugger instead of just giving a kernel panic message.',
            ),
            h('p', {},
                'It had a services model inspired by Plan 9, and had a largely complete GNU toolchain so it was capable ' +
                'of building itself.  I was largely active in updating libc, porting tools, writing drivers, and performance ' +
                'tuning the kernel form 1993 to 1995.'
            ),
            h('hr', {}),
            h('section', {},
                h('h2', {}, 'Archives'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    'Andy Valencia (the guy behind the project) has an archive of the code and the mailing lists here: ',
                    h('a', {href: 'https://sources.vsta.org:7100/vsta/index', target: '_blank'},
                        'https://sources.vsta.org:7100/vsta/index'
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectVSTa = new ProjectPage(
    'VSTa',
    '/projects/VSTa',
    'VSTa was a self-hosting microkernel operating system build in the 1990s.  Written in C.',
    projectVSTaPage
);
