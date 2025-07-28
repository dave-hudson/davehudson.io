import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectCountdownPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'countdown',
                subtitle: 'Find solutions to the "Countdown" numbers game as quickly as possible'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('p', {},
                        'This project came about as a programming challenge to build some software to identify solutions to the ' +
                        '"Countdown" numbers game as quickly as possible.'
                    ),
                    h('p', {},
                        'The idea of the game is to take 6 randonly chosen numbers from a set of 24 available numbers (1, 1, 2, 2, 3, ' +
                        '3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100) and find a way to get to a larger random ' +
                        'number in the range of 101 to 999, using only simple addition, subtraction, multiplication, and division.'
                    ),
                    h('p', {},
                        'I wrote this one in C++ and spent a few hours coming up with ways to shrink the problem search space.  ' +
                        'It\'s pretty quick but I never attempted to tune it to the instruction level!'
                    ),
                    h('section', {},
                        h('h2', {}, 'Source code'),
                        h('p', {},
                            'The source code can be found on GitHub: ',
                            h('a', {href: 'https://github.com/dave-hudson/countdown', target: '_blank'},
                                'https://github.com/dave-hudson/countdown'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectCountdown = new ProjectPage(
    'countdown',
    '/projects/countdown',
    'Identify solutions to the "Countdown" numbers game as quickly as possible.  Written in C++.',
    projectCountdownPage
);
