import {h, VNode} from '../../lib/dvdi';
import {navigateEvent} from '../../app';
import {BlogPost} from '../BlogPost'

function blogOpening_2014_04_30(): VNode[] {
    return [
        h('p', {},
            'Over the last few months I\'ve written about patterns and trends in Bitcoin mining while I\'ve been trying ' +
            'to predict how things will evolve.  More recently I\'ve built simulations that attempt to model how various ' +
            'trends will affect the mining network.  Irrespective of the "improvements", be they improved hashing rates, ' +
            'lower power consumption per hash, lower price per kWh of electricity or higher BTC price, one thing is ' +
            'inescapable:  The Bitcoin difficulty increases quickly absorb everything thrown at them in order to maintain ' +
            'the system\'s block finding rate.  This has very significant implications for the not-too-distant future.'
        )
    ]
}

function blogArticle_2014_04_30(): VNode[] {
    return [
        h('section', {},
            h('h2', {}, 'The role of difficulty'),
            h('p', {},
                'The Bitcoin difficulty concept is a very elegant approach to ensure that no matter how the hashing ' +
                'infrastructure changes the intrinsic timescales envisaged for Bitcoin mining stay essentially the same.  The ' +
                'design allows for the system to remain computationally stable and secure as technology changes and ' +
                'expansions in the numbers of participants take place.  It also helped solve a problem of how to start up ' +
                '(bootstrap) the mining network.  Mining could use commodity hardware that already existed and had other ' +
                'purposes.  It also required no capital investment, just the additional cost of running PCs at higher CPU ' +
                'loads than they had been.'
            ),
            h('p', {},
                'As Bitcoins started to become worth money, however, the prospect of mining a larger share of them has been ' +
                'ever more enticing.  Mining became an end in itself, rather than just a means to support the transmission ' +
                'of Bitcoins.  Once mining became seen as valuable there was a clear challenge to any intent that miners ' +
                'would co-operate for the good of the network.  Instead individuals could gain an advantage, albeit at the ' +
                'expense of everyone else.  The behaviour of miners essentially became a real-world prisoner\'s dilemma.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Prisoner\'s dilemma'),
            h('p', {},
                'In the prisoner\'s dilemma, two prisoners, A and B, suspected of committing the same crime (and for which ' +
                'there is no other evidence) are arrested and held such that they cannot communicate with each other.  Each ' +
                'has a choice: confess (known as defecting) or remain silent (known as cooperating).'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2014-04-30/Prisoners_Dilemma.png',
                    alt: 'Infographic showing the principal of the Prisoner\'s Dilema',
                    width: 1000,
                    height: 773
                }),
                h('figcaption', {}, 'Depiction of the Prisoner\'s Dilema. Image by Chris Jensen and Greg Riestenberg')
            ),
            h('p', {},
                'The choices lead to 4 possible outcomes:'
            ),
            h('ol', {},
                h('li', {}, 'A and B both stay silent: both go free.'),
                h('li', {}, 'A and B both confess: both get 2 years in jail.'),
                h('li', {}, 'A confesses and B stays silent: A gets 1 year in jail and B gets 3 years in jail.'),
                h('li', {}, 'A stays silent and B confesses: A gets 3 years in jail and B gets 1 year in jail.')
            ),
            h('p', {},
                'Clearly the best option is for both to stay silent (neither acts to harm the interests of the other), but ' +
                'the average outcome is: (0.25 \* 0) + (0.25 \* 1) + (0.25 \* 3) + (0.25 \* 2) = 1.5 years in jail.  The ' +
                'potential risk of getting 3 years in jail is probably enough to have more confess than not but there\'s no ' +
                'strong favourite position.  If A confesses then it\'s a 50:50 chance of a positive or negative result'
            ),
            h('p', {},
                'Now imagine the same game but with 3 members of the same criminal gang - if any one confesses either of the ' +
                'others who stays silent get the full 3 year penalty, while all those who do confess get just 1 year in jail. ' +
                'There are 8 possible options here and the average result is still 1.5 years in jail.  Now, however, if A ' +
                'stays silent then only 1 out of the 4 outcomes is positive (0 years) and 3 out of the 4 are the most ' +
                'negative (3 years).  Remaining silent now carries an average cost of 9/4 = 2.25 years in jail.  Conversely ' +
                'confessing now carries an average cost of 5/4 = 1.25 years in jail!'
            ),
            h('p', {},
                'This is the core of the problem with Bitcoin difficulty, but the outcomes are slightly different. With ' +
                'mining we have a zero sum game (the total result however played is the same).  Consider 2 miners:'
            ),
            h('ol', {},
                h('li', {}, 'A and B have the same hardware: Both get 50% of the mining reward.'),
                h('li', {}, 'A and B both double their hashing rates: Both get 50% of the mining reward.'),
                h('li', {}, 'A doubles their hashing rate but B does not: A gets 67% of the mining reward, B gets 33%.'),
                h('li', {},
                    'A keeps the same hardware but B doubles their hashing rate: A gets 33% of the mining reward, B gets 67%.'
                )
            ),
            h('p', {},
                'In this version the average is still 50% of the total, but now defecting (increasing hashing rate) ' +
                'averages 58.3% of the mining reward vs 41.7% for cooperating.  If we play the same game with 3 miners then ' +
                'all start with 33.3% of the total, but cooperating averages only 26% and defecting averages 41%.  ' +
                'Statistically it seems obvious that defecting and doubling hash rates leads to the best outcome.  Of course ' +
                'all of the miners know this so where possible they will always defect; it becomes an ongoing race to try ' +
                'to continually leapfrog the other players.  Sometimes a player will choose to leave the game but then ' +
                'another will likely try to join and ultimately no-one gains an advantage.'
            ),
            h('p', {},
                'Interestingly one of Satoshi Nakamoto\'s last public posts (2010-12-12) alluded to this same problem: "We ' +
                'should have a gentleman\'s agreement to postpone the GPU arms race as long as we can for the good of the ' +
                'network".  It\'s unclear just how far he had gone in thinking about this though.'
            ),
            h('p', {},
                'This then is the headache for mining.  The headlong race of miners trying to prevent anyone else from ' +
                'outdoing themselves simply leads to a point where all of the resources that each miner can bring to bear end ' +
                'up fully consumed in the arms race itself.  A very small number of miners will make money (where they have a ' +
                'short-term advantage) and exit the game, while most will make long-term losses.'
            )
        ),
        h('section', {},
            h('h2', {}, 'The runaway mining headache'),
            h('p', {},
                'As with gold rushes of the past, most of the money has recently flowed to suppliers who have enabled ' +
                'ever-larger-scale mining.  While much more efficient than previous generations the difficulty levels increased ' +
                'exponentially to absorb the improvements and the trend towards ever-increasing operating costs was simply ' +
                'deferred, not prevented.  A short term respite has recently seen a move to locations with lower cost ' +
                'electricity suppliers but this has simply freed up money to spend on yet more hashing capacity and that in ' +
                'turn requires more electricity.  There are probably a few more short term improvements that might be made, ' +
                'such as utilizing waste heat in some more useful way, but these too only act to make more money available ' +
                'to increase hashing capacity.  Even BTC price increases only offer temporary respite.  Whatever the cause, ' +
                'the difficulty level increases accordingly and this quickly negates any benefits.'
            ),
            h('p', {},
                'It\'s already apparent that difficulty level increases are also affecting the price of hardware.  This has ' +
                'started to fall in order to offer any potential prospect of useful mining rewards.  Technology limits mean ' +
                'that technology improvements do not offer a path to enable the necessary cost reductions, so hardware ' +
                'vendors margins are being cut too.  Inexorably the balance will continue to move towards operating costs ' +
                'consuming almost all of the available mining rewards.'
            ),
            h('p', {},
                'In traditional "arms race" problems the participants often end up mutually agreeing to try to de-escalate ' +
                'things and verify that all parties have honoured their commitments, but the decentralized nature of ' +
                'Bitcoin mining means that such agreements are all but impossible; the participants just aren\'t knowable.'
            ),
            h('p', {},
                'Other cryptocurrencies have tried to prevent an arms race by making things harder for custom hardware.  ' +
                'While this relieves some short-term pressure any computational problem ends up susceptible to the same ' +
                'economic pressures.  Given the scope of Bitcoin mining deployments it seems improbable that changing the ' +
                'core hashing algorithm would be an option anyway.'
            ),
            h('p', {},
                'Early miners and ASIC suppliers have already seen their profits, and indeed may still earn more yet.  They ' +
                'can sit on a sunny beach sipping champagne cocktails, but as the difficulty levels eat into everyone else\'s ' +
                'margins it\'s unclear how the mining dilemma can end up having a happy ending for anyone else but the energy ' +
                'suppliers.'
            )
        ),
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Acknowledgments'),
            h('p', {},
                'The last line of this article was rewritten thanks to an ',
                h('a', {
                    href: 'https://bitcointalk.org/index.php?topic=580632.msg6572887#msg6572887',
                    target: '_blank'
                }, 'insightful remark'),
                ' when I first posted a link to it!'
            )
        )
    ];
}

function blogPostScript_2014_04_30(): VNode[] {
    return [
        h('hr', {}),
        h('section', {},
            h('h2', {}, 'Related articles'),
            h('ul', {},
                h('li', {},
                    h('a', {href: '/blog/2014-04-28', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-04-28')},
                        'Megawatts of mining (2014-04-28)'
                    )
                ),
                h('li', {},
                    h('a', {href: '/blog/2014-04-03', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-04-03')},
                        'The rewards for a Bitcoin miner (2014-04-03)'
                    )
                ),
                h('li', {},
                    h('a', {href: '/blog/2014-03-23', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-03-23')},
                        'Where next for Bitcoin mining ASICs? (2014-03-23)'
                    )
                ),
                h('li', {},
                    h('a', {href: '/blog/2014-03-09', onclick: (e: MouseEvent) => navigateEvent(e, '/blog/2014-03-09')},
                        'The Bitcoin runaway mine train (2014-03-09)'
                    )
                )
            )
        )
    ];
}

export const blogPost_2014_04_30 = new BlogPost(
    'Prisoner\'s dilemmas?',
    '2014-04-30',
    '/blog/2014-04-30',
    'This blog post looks at the rationale that leads Bitcoin miners to cooperate to secure the mining network.',
    '/blog/2014-04-30/Prisoners_Dilemma.png',
    null,
    blogOpening_2014_04_30,
    blogArticle_2014_04_30,
    blogPostScript_2014_04_30
);
