import {h, VNode} from '../../lib/dvdi';
import {navigateEvent} from '../../app';
import {BlogPost} from '../BlogPost'

function blogOpening_2014_05_24(): VNode[] {
    return [
        h('p', {},
            'Everyone knows that mining is a noisy task.  Did you realize just how noisy Bitcoin mining is though? ' +
            'These aren\'t the noises you were looking for...'
        )
    ]
}

function blogArticle_2014_05_24(): VNode[] {
    return [
        h('figure', {},
            h('img', {
                src: '/blog/2014-05-24/high-noise-levels.jpg',
                alt: 'Image of a high noise level warning sign',
                width: 253,
                height: 190
            }),
        ),
        h('section', {},
            h('h2', {}, 'A simple question'),
            h('p', {},
                'An earlier article, "',
                h('a', {href: '/blog/2014-05-20', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-05-20')},
                    'Hash rate headaches'
                ),
                '" looked at the statistics associated with Bitcoin mining and how it is a random Poisson Process.  It was ' +
                'pretty clear that the global hashing rate, and thus the Bitcoin mining difficulty, are subject to quite a ' +
                'lot of noise, but it wasn\'t completely obvious how much.'
            ),
            h('p', {},
                'One way to think about this is to ask a simple question: If the hash rate stayed constant for 52 ' +
                'difficulty changes (approximately 2 years) then what would happen to the Bitcoin difficulty during that time?'
            ),
            h('p', {},
                'Intuitively it seems that the difficulty shouldn\'t really change, but what are the statistics?  This seemed ' +
                'like an interesting thing to try to unravel so I built another simulator (it\'s another one written in C, ' +
                'please contact me if you\'d like to know more about it).'
            )
        ),
        h('section', {},
            h('h2', {}, 'A simple mining simulation'),
            h('p', {},
                'The simulation sets up a nomalized difficulty of 1 and then models each individual block being found.  ' +
                'Every 2016 blocks it then updates the the difficulty and the random mining continues.  It\'s not a perfect ' +
                'simulation because it ignores network latency or the possibility of orphaned blocks, but these have a very ' +
                'small impact. Here\'s one run:'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2014-05-24/simulation.png',
                    alt: 'Chart showing the noise spikes in the Bitcoin difficulty based on a simulation of a constant hash rate',
                    width: 1758,
                    height: 1033
                }),
                h('figcaption', {},
                    'Chart showing noise spikes in the Bitcoin difficulty based on a simulation of a constant hash rate'
                )
            ),
            h('p', {},
                'This is just one of many random simulation runs.  The difficulty changes are somewhat surprising. On 7 ' +
                'occasions the difficulty increases by more than 5% and on 3 it reduces by more than 5% (over a much larger ' +
                'number of runs the number higher and lower are typically the same; in this instance if we move the ' +
                'threshold to 4% then it\'s 8 higher and 7 lower).'
            ),
            h('p', {},
                'Our intuition about the difficulty basically staying the same isn\'t actually wrong, it\'s just that ' +
                'that\'s an average behaviour.  Run the simulations for long enough and everything levels out. Each set of ' +
                '2016 blocks takes almost exactly 14 days to find.'
            ),
            h('p', {},
                'Doubters may question the simulation because negative difficulty changes have been so rare, but for most ' +
                'of the last 5 years the hashing rate has been climbing.  Even when it wasn\'t climbing at current levels ' +
                'though it was still generally increasing.  With this first simulation, as long as the hashing rate ' +
                'increases by more than 5% then we will rarely see a negative difficulty change.  By Bitcoin standards, 5% is ' +
                'a very gentle growth rate.  If we have 14 successive difficulty changes of 5% then we end up at 1.98x the ' +
                'original hashing rate. That same 14 difficulty changes would take 186.7 days; more than 6 months.'
            ),
            h('p', {},
                'It\'s a little difficult to extract the increase in hashing rate from the current difficulty levels, but ' +
                'let\'s assume it has had still a steady exponential growth.  The steady rate would be 16.9% for the last 4 ' +
                'months.  The assumption doesn\'t strictly hold as we\'re seeing a gradual slowdown but even with the ' +
                'simplification we can still see that the variance from our 16.9% is very similar to what the simulation shows:'
            ),
            h('table', {},
                h('thead', {},
                    h('tr', {},
                        h('th', {align: 'left'}, 'Date'),
                        h('th', {align: 'right'}, 'Difficulty'),
                        h('th', {align: 'right'}, 'Change'),
                        h('th', {align: 'right'}, 'Variance')
                    )
                ),
                h('tbody', {},
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-05-24'),
                        h('td', {align: 'right'}, '10455720138'),
                        h('td', {align: 'right'}, '18.10%'),
                        h('td', {align: 'right'}, '1.20%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-05-12'),
                        h('td', {align: 'right'}, '8853416309'),
                        h('td', {align: 'right'}, '10.66%'),
                        h('td', {align: 'right'}, '-6.24%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-04-29'),
                        h('td', {align: 'right'}, '8000872136'),
                        h('td', {align: 'right'}, '14.64%'),
                        h('td', {align: 'right'}, '-2.26%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-04-17'),
                        h('td', {align: 'right'}, '6978842650'),
                        h('td', {align: 'right'}, '14.04%'),
                        h('td', {align: 'right'}, '-2.86%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-04-05'),
                        h('td', {align: 'right'}, '6119726089'),
                        h('td', {align: 'right'}, '22.23%'),
                        h('td', {align: 'right'}, '5.33%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-03-24'),
                        h('td', {align: 'right'}, '5006860589'),
                        h('td', {align: 'right'}, '17.80%'),
                        h('td', {align: 'right'}, '0.90%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-03-13'),
                        h('td', {align: 'right'}, '4250217920'),
                        h('td', {align: 'right'}, '11.39%'),
                        h('td', {align: 'right'}, '-5.21%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-02-28'),
                        h('td', {align: 'right'}, '3815723799'),
                        h('td', {align: 'right'}, '21.92%'),
                        h('td', {align: 'right'}, '5.02%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-02-17'),
                        h('td', {align: 'right'}, '3129573175'),
                        h('td', {align: 'right'}, '19.39%'),
                        h('td', {align: 'right'}, '2.49%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-02-05'),
                        h('td', {align: 'right'}, '2621404453'),
                        h('td', {align: 'right'}, '19.49%'),
                        h('td', {align: 'right'}, '2.59%')
                    ),
                    h('tr', {},
                        h('td', {align: 'left'}, '2014-01-24'),
                        h('td', {align: 'right'}, '2193847870'),
                        h('td', {align: 'right'}, '22.59%'),
                        h('td', {align: 'right'}, '5.69%')
                    )
                )
            ),
            h('p', {},
                'The variations here are slightly larger than we would expect for just our random noise but the rate at ' +
                'which hashing is added to the network can\'t be completely steady.  The behaviour is very close to what the ' +
                'statistical model predicts.'
            ),
            h('p', {},
                'One simulation isn\'t anywhere near sufficient of course.  As we compare more trials though the behaviour ' +
                'is essentially the same. Here are 2 additional simulation runs overlaid on top of our original one:'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2014-05-24/simulation_x3.png',
                    alt: 'Chart showing 2 additional different simulations of mining with a constant hash rate',
                    width: 1759,
                    height: 1088
                }),
                h('figcaption', {}, 'Simulated mining with constant hash rate')
            ),
            h('p', {},
                'The good news for miners is that for every spike that goes up there\'s one that goes down, but the cries ' +
                'of despair from the latest 18.10% difficulty change are already echoing around the Internet.  Unlike space, ' +
                'where no-one can hear your scream, it seems that in Cyberspace a little noise can sometimes be very loud ' +
                'indeed!'
            )
        )
    ];
}

function blogPostScript_2014_05_24(): VNode[] {
    return [
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Related articles'),
            h('ul', {},
                h('li', {},
                    h('a', {href: '/blog/2014-05-20', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-05-20')},
                        'Hash rate headaches (2014-05-20)'
                    )
                )
            )
        )
    ];
}

export const blogPost_2014_05_24 = new BlogPost(
    'Reach for the ear defenders!',
    '2014-05-24',
    '/blog/2014-05-24',
    'Bitcoin mining relies on a highly random process, but random approaches are quite noisy!  This blog post looks at ' +
    'some of that statistical noise.',
    '/blog/2014-05-24/simulation.png',
    null,
    blogOpening_2014_05_24,
    blogArticle_2014_05_24,
    blogPostScript_2014_05_24
);
