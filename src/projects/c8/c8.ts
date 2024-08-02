import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectC8Page(): VNode {
    return h('div', {},
        pageHeader(),
        h('main', {className: 'main'},
            h('h1', {}, 'c8'),
            h('p', {},
                'c8 (calculate) is designed as an easy-to-use arbitrary precision (big number) maths library that has no ' +
                'dependencies other than the standard C++ libraries provided with gcc or clang.'
            ),
            h('p', {},
                'The design of c8 emphasizes ease of use, but it is intended to be used in high performance applications.  ' +
                'Comprehensible software should not have to be intrinsically slow!'
            ),
            h('p', {},
                'c8 provides supports for three primary classes of numbers:'
            ),
            h('ul', {},
                h('li', {},
                    h('code', {}, 'c8::natural'),
                    ' - provides natural numbers (between zero and +infinity)'
                ),
                h('li', {},
                    h('code', {}, 'c8::integer'),
                    ' - provides integers (between -infinity and +infinity)'
                ),
                h('li', {},
                    h('code', {}, 'c8::rational'),
                    ' - provides rational numbers (all ratios between -infinity and +infinity)'
                )
            ),
            h('p', {},
                'Each class supports functions to construct objects from, and to export object values to, standard C++ value types.'
            ),
            h('p', {},
                'Between the three classes it\'s possible to represent all the interesting numbers that a computer can directly ' +
                'represent, since floating point numbers are a subset of the set of rational numbers.  By using rationals instead ' +
                'of floating point it\'s also much easier to avoid some types of computational error.'
            ),
            h('section', {},
                h('h2', {}, 'License'),
                h('p', {}, 'The software is released under a BSD 3-Clause license.')
            ),
            h('section', {},
                h('h2', {}, 'Implementation'),
                h('p', {},
                    'The code is written in modern C++, and relies of features found in C++14 and later.'
                )
            ),
            h('section', {},
                h('h2', {}, 'Project wiki and documentation'),
                h('p', {},
                    'The project wiki and documentation is hosted on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8/wiki', target: '_blank'},
                        'https://github.com/dave-hudson/c8/wiki'
                    )
                ),
                h('p', {},
                    'When I built this code I also tracked the development journey on the wiki.  This includes all my notes on ' +
                    'how I was performance tuning things, down to the machine instruction level in many cases: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8/wiki/Dev-Notes', target: '_blank'},
                        'https://github.com/dave-hudson/c8/wiki/Dev-Notes'
                    )
                )
            ),
            h('section', {},
                h('h2', {}, 'Contributing'),
                h('p', {},
                    'Please feel free to submit PRs or to reach out to the author directly.'
                )
            ),
            h('section', {},
                h('h2', {}, 'Source code'),
                h('p', {},
                    'The source code can be found on GitHub: ',
                    h('a', {href: 'https://github.com/dave-hudson/c8', target: '_blank'},
                        'https://github.com/dave-hudson/c8'
                    ),
                )
            )
        ),
        pageFooter()
    );
}

export const projectC8 = new ProjectPage(
    'c8',
    '/projects/c8',
    'c8 is a high performance arbitrary precision natural numbers, integers, and rational numbers library written ' +
    'in "modern" C++.',
    projectC8Page
);
