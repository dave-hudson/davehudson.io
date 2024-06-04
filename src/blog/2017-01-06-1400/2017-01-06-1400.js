import { h } from '/lib/dvdi.js';

export function blogArticle_201701061400() {
    return [
        h('em', {},
            'Note 2020-03-06: This was originally published as an opinion piece at ',
            h('a', { href: 'https://www.coindesk.com/what-iot-history-reveals-about-blockchains-challenges' },
                'Coindesk'
            ),
            '.'
        ),
        h('hr', {}),
        h('figure', {},
            h('img', { src: '/blog/2017-01-06-1400/rock-paintings-art.jpg' }),
            h('figcaption', {},
                'Cave paintings via https://www.shutterstock.com/pic-94533745/' +
                'stock-photo-famous-prehistoric-rock-paintings-of-tassili-najjer-algeria.html'
            )
        ),
        h('p', {},
            '2009 saw Satoshi Nakamoto deploy the first Bitcoin node, and within five years its blockchain had become a' +
            'large-scale industry.'
        ),
        h('p', {},
            'Early enthusiasm for new technologies is nothing new.  With most, an initial wave of excitement sees new ideas ' +
            'touted as solutions to a huge range of problems, the hype fades, gives way to skepticism, and ultimately, real ' +
            'applications.'
        ),
        h('p', {}, 'In the late 1990s, the idea of Internet-connecting every electronic device seemed inescapable.'),
        h('p', {},
            'Every vending machine, coffee pot, toaster, refrigerator, microwave, and TV, would be cabled to the “net”, and ' +
            'a utopian sharing of data would improve life for everyone.'
        ),
        h('p', {}, 'The reality for what we now term the “Internet of Things”, or IoT, was a little different.'),
        h('h2', {}, 'It\'s all about money'),
        h('p', {}, 'The original theory of IoT was that data would make everything better.'),
        h('p', {},
            'Microwave ovens might scan cooking instructions and thus not make mistakes, refrigerators might reorder milk, ' +
            'etc. Automation would liberate users of these appliances, and give them time for other things.'
        ),
        h('p', {}, 'Unfortunately, the theory hadn\'t been worked out fully.'),
        h('p', {},
            'Adding Internet connectivity to a device is never free-of-charge.  In most cases this was a realm of small, ' +
            'low-CPU-powered devices, with no connectivity, so making them Internet-connected was going to cost money.'
        ),
        h('p', {}, 'In the 20 years since those original ideas, little has changed.'
),
        h('p', {},
            'Let\'s consider the microwave oven example.  A microwave would need a pretty simple IoT hardware design, so ' +
            'perhaps $5 in parts cost. The first problem is that the $5 turns into nearer $15 by the time we add the margins ' +
            'for the company making the circuit boards, the company building the product and the retailer that sells it.'
        ),
        h('p', {},
            'Our next problem is that just having the hardware in our microwave oven isn\'t sufficient.  We need to make it ' +
            'communicate with servers that know how long, and at what power level, each new type of frozen pizza needs to ' +
            'cook.  That implies servers, it implies dev-ops teams, it implies software engineers, and it implies business ' +
            'development people who persuade pizza manufacturers to provide cooking details for each new product they design.'
        ),
        h('p', {}, 'The infrastructure side has perhaps cost us another $10 per unit.'),
        h('h2', {}, 'Nice ideas' ),
        h('p', {}, 'Smart devices are a little like smart contracts.'),
        h('p', {},
            'They\'re great when they “just work”, but not so great when people make mistakes.  The 1990s vision of IoT ' +
            'involved lots of network cables, but then we got Wi-Fi, and the wires could go away.'
        ),
        h('p', {},
            'Anyone who knows the technology understands that microwave ovens and 2.4 GHz Wi-Fi don\'t play nicely ' +
            'together. Similarly, 5 GHz Wi-Fi and solid walls don\'t play nicely together.'
        ),
        h('p', {},
            'While our IoT microwave oven might connect to a home router just fine in 95% of homes, the other 5% wouldn\'t' +
            'work reliably, if at all.  Unlike software that tends to be notoriously unreliable, microwave ovens pretty ' +
            'much just work.'
        ),
        h('p', {},
            'If they don\'t, then customers get irate and phone the manufacturer (more costs), they return “faulty” devices, ' +
            'they leave bad reviews on Amazon and they vow never to buy that brand again.'
        ),
        h('p', {},
            'The idea of a smart microwave might still look great on a PowerPoint slide, but the niggling details turn an ' +
            'interesting concept into a liability.  It isn\'t worth the setup time and $50 to a customer, and the trouble ' +
            'isn\'t worth it for the manufacturer.'
        ),
        h('h2', {}, 'Same old story'),
        h('p', {}, 'We have the same challenges when thinking about uses for blockchains.'),
        h('p', {},
            'Not every problem needs a blockchain as a solution.  Blockchains cost money in terms of processing, storage and ' +
            'replication technology.  In the case of a decentralized cryptocurrency, such as Bitcoin, the blockchain-like ' +
            'concept is an essential characteristic to build a viable design, but for other problems we need to ask if the ' +
            'blockchain features are doing something valuable.'
        ),
        h('p', {},
            'If domestic microwaves aren\'t an option, then maybe refrigerators might be? Domestic ones have many of the ' +
            'same problems as microwaves, but how about commercial refrigeration?  What if we could connect these devices so ' +
            'that if they broke down we could avoid expensive losses?'
        ),
        h('p', {},
            'A large industrial cold store might contain hundreds of thousands of dollars of refrigerated products, so ' +
            'signaling breakdowns and avoiding stock losses must be a valuable problem to solve?'
        ),
        h('p', {}, 'The maths is compelling, but the problem is that it was 25 years ago, too.'),
        h('p', {},
            'While they might not have matched our IoT vision, many companies already found approaches to network these ' +
            'devices a long time ago.'
        ),
        h('p', {},
            'This example has another subtlety.  Food storage is generally subject to regulations, and many countries ' +
            'require that records are kept of the temperatures at which products were stored.'
        ),
        h('p', {},
            'Without networking, there would be a need for someone to manually record temperatures every few hours, and ' +
            'this is both expensive and error-prone.  Commercial refrigeration equipment also involves service companies ' +
            'and manufacturers providing on-site repairs, so we have more stakeholders for whom access to data is important.'
        ),
        h('p', {},
            'A naïve view of the problem might well have ignored them.  Unexpected stakeholders introduce unexpected costs, ' +
            'and may resist changes that do not also offer them substantial benefits.'
        ),
        h('p', {}, 'The implications for blockchains are very similar.'),
        h('p', {},
            'If a problem is already being solved, then, even if a blockchain might be useful, we need to ask if it offers ' +
            'enough incremental advantages?  Do we know what all the problems are, including the ones that might not be ' +
            'obvious unless we were domain experts?  Are there stakeholders, such as network architects, security experts, ' +
            'data architects, dev-ops teams, etc., who must change existing systems to adopt a new one?  Are there ' +
            'analytical needs that require big-data, relational, graph, or time-series, views of any data that is being ' +
            'processed?'
        ),
        h('h2', {}, 'Forever is a long time'),
        h('p', {},
            'Leaving aside specific uses of IoT for a moment, it\'s worth considering an important characteristic of the ' +
            'devices that were supposed to become smart and connected.  These devices don\'t get replaced very quickly.'
        ),
        h('p', {},
            'Most of our connected devices get replaced quite quickly.  Vendors provide support for a few years but then ' +
            'expect users to discard them and buy new ones.'
        ),
        h('p', {},
            'The problem is we don\'t do this with most of our electrical items.  We typically only replace them when they ' +
            'fail. By making them connected we introduce entirely new modes of failure.'
        ),
        h('p', {},
            'One such problem is how do we keep older devices working?  Typically, manufacturers don\'t receive any form of ' +
            'revenue once a device is sold, so what is the incentive to keep providing software updates once those devices ' +
            'are out of warranty?'
        ),
        h('p', {},
            'Another problem is that, even if we might want to pay for updates and bug fixes, it may not be economically ' +
            'feasible to provide them.  Older devices will have less powerful hardware that may not lend itself to new ' +
            'features.'
        ),
        h('p', {},
            'A final problem is that our manufacturer may not have considered the possibility of a device becoming ' +
            'compromised.'
        ),
        h('p', {},
            'The recent Mirai botnet has undoubtedly highlighted these issues, but how many toaster manufacturers have ' +
            'the level of security engineering skill to secure, and continue to secure, an IoT device against advanced ' +
            'adversaries?'
        ),
        h('p', {},
            'These are all governance problems.  How will our IoT device, once installed, continue to function, and avoid ' +
            'becoming a problem?'
        ),
        h('h2', {}, 'Parallel problems'),
        h('p', {},
            'The parallels for blockchains are, again, striking.'
        ),
        h('p', {},
            'With Bitcoin, the block size has seen miners incentivized to restrict block expansion to maximize mining ' +
            'rewards, while the ',
            h('a', { href: 'https://www.coindesk.com/understanding-dao-hack-journalists'}, 'DAO hack'),
            ' incentivized users to want their coins back.'
        ),
        h('p', {},
            'When we consider the deployment of blockchains into other types of applications, then how are these sorts ' +
            'of governance issues to be reviewed and resolved?  If we consider systems that might potentially operate for ' +
            'many years, then what does it mean to have immutable storage indefinitely?  How will the inevitable mistakes ' +
            'of various human users be corrected?  What are the incentives for participants to keep systems running ' +
            'correctly?'
        ),
        h('p', {},
            'In the case of commercial deployments, what are the implications for rolling out updates and upgrades across ' +
            'organizations that have different priorities?'
        ),
        h('h2', {}, 'A new hype?'),
        h('p', {},
            'Our journey through the history of IoT has been somewhat cautionary, and there are many unanswered questions, ' +
            'but this is not the story of a lost war.'
        ),
        h('p', {},
            'Twenty years ago, Internet radio stations had barely surfaced, TiVo had yet to produce a set-top box, and ' +
            'ideas of 4k video on-demand streaming were distant science fiction.'
        ),
        h('p', {},
            'Fast forward 20 years later, and designers have leveraged advances in processing, power management, wide-area ' +
            'networking, wireless networking, storage, display technologies and distributed cloud storage, to construct ' +
            'new end-user experiences.'
        ),
        h('p', {},
            'Smart TVs and smartphones are barely recognizable from earlier CRT TVs and crude mobile phones, and yet both ' +
            'have a clear lineage to the original idea of connected things.'
        ),
        h('p', {}, 'IoT arrived but not quite as expected.'),
        h('p', {},
            'Business empires based on the concepts of VHS tapes and DVDs were displaced.  Users gained access to far more ' +
            'content, with lower costs and dramatically improved convenience.  IoT technologies were not used in ' +
            'isolation, but were combined to solve real problems for the people who ultimately pay for the solutions, ' +
            'customers.'
        ),
        h('p', {}, 'This, then, is part of the challenge for blockchains.'),
        h('p', {},
            'The commercial refrigeration systems slowly changed too.  Internet connectivity was a better approach than ' +
            'the ad-hoc methods used 20 years ago, and so replaced earlier designs when they reached natural replacement ' +
            'cycles.  Likewise, mature and more capable blockchain designs may well have opportunities to replace other ' +
            'technologies in the future.'
        ),
        h('p', {},
            'Bitcoin stands as the first example of a viable blockchain solution to a well-defined problem.  As with many ' +
            'first-generation designs it has also served to highlight challenges, and its ultimate success or failure will ' +
            'depend on its ability to see them resolved.'
        ),
        h('p', {}, 'The challenge for other blockchains might be similar, but won\'t be the same.'),
        h('p', {},
            'Blockchain technology will be well served by recognizing, and confronting the hardest problems that we know ' +
            'about, rather than imagining that we can resolve them later.  We know that issues such as security, privacy, ' +
            'deployment and governance need to be addressed.'
        ),
        h('p', {},
            'At the same time, we must avoid the temptation to use blockchains, and blockchain ideas, where they are not ' +
            'the best solutions, and champion those where they are.'
        )
    ];
}
