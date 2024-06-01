import { h, VDom, updateElement } from '/lib/dvdi.js';

console.log('SCRIPT RELOADED!')

const updateQueue = new Set();

/*
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 */
function enqueueVDomUpdate(update) {
    updateQueue.add(update);
    if (updateQueue.size === 1) {
        requestAnimationFrame(runVDomUpdates);
    }
}

/*
 * Runs all updates that have been enqueued.
 */
function runVDomUpdates() {
    updateQueue.forEach(update => update());
    updateQueue.clear();
}

let darkTheme = null;
let darkModeSun = null;
let darkModeMoon = null;

function sunMoonIcon(isSun, clickCallback) {
    const component = () => h('div', {
            className: "icon",
            id: isSun ? 'dark-mode-sun' : 'dark-mode-moon',
            onClick: () => clickCallback(!isSun)
        },
        h('a', {},
            h('i', { 'data-feather': isSun ? 'sun' : 'moon' })
        )
    )

    return component();
}

function pageHeader() {
    const component = () => h('header', { className: 'header'},
        h('table', { className: "site-title"},
            h('tbody', {},
                h('tr', {},
                    h('td', {},
                        h('h1', {}, 'Dave Hudson'),
                        h('h2', {},
                            h('a', { href: '/', onClick: (e) => navigateEvent(e, '/') }, 'hashingit.com')
                        )
                    ),
                    h('td', {},
                        h('nav', { className: 'social' },
                            h('div', { className: 'icon' },
                                h('a', { href: '/index.xml', title: 'RSS' },
                                    h('i', { 'data-feather': 'rss' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://twitter.com/hashingitcom', title: 'Twitter' },
                                    h('i', { 'data-feather': 'twitter' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://facebook.com/hashingitcom', title: 'Facebook' },
                                    h('i', { 'data-feather': 'facebook' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://linkedin.com/in/davejh', title: 'LinkedIn' },
                                    h('i', { 'data-feather': 'linkedin' })
                                )
                            ),
                            h('div', { className: 'icon' },
                                h('a', { href: 'https://github.com/dave-hudson', title: 'GitHub' },
                                    h('i', { 'data-feather': 'github' })
                                )
                            )
                        )
                    )
                )
            )
        ),
        h('nav', { className: 'site-menu' },
            h('div', { className: 'menu' },
                h('a', { href: '/blog', onClick: (e) => navigateEvent(e, '/blog') }, 'Blog')
            ),
            h('div', { className: 'menu' },
                h('a', { href: '/about', onClick: (e) => navigateEvent(e, '/about') }, 'Me')
            ),
            sunMoonIcon(false, setDarkTheme),
            sunMoonIcon(true, setDarkTheme)
        )
    );

    const windowMedia = window.matchMedia("(prefers-color-scheme: dark)");

    function setDarkTheme(dark) {
        if (dark === true) {
            darkModeSun.style.display = '';
            darkModeMoon.style.display = 'none';
            darkTheme.disabled = false;
            if (windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'dark');
            }
        } else {
            darkModeSun.style.display = 'none';
            darkModeMoon.style.display = '';
            darkTheme.disabled = true;
            if (!windowMedia.matches) {
                localStorage.removeItem('darkTheme');
            } else {
                localStorage.setItem('darkTheme', 'light');
            }
        }
    }

    let vNode = component();
    vNode.mountCallback = () => {
        darkTheme = document.getElementById('dark-mode-theme');
        darkModeSun = document.getElementById('dark-mode-sun');
        darkModeMoon = document.getElementById('dark-mode-moon');

        // If we can, work out whether we should default to dark or light mode.
        let localDarkTheme = localStorage.getItem('darkTheme');
        if (localDarkTheme === null) {
            setDarkTheme(windowMedia.matches);
        } else {
            setDarkTheme(localDarkTheme === 'dark');
        }

        if (windowMedia.addEventListener) {
            windowMedia.addEventListener('change', () => {
                setDarkTheme(windowMedia.matches);
            });
        } else if (windowMedia.addListener) {
            windowMedia.addListener(() => {
                setDarkTheme(windowMedia.matches);
            });
        }
    }

    return vNode;
}

function articleTitle(title, timeStr = '') {
    return h('header', { className: 'title' },
        h('h1', {}, title),
        h('time', { className: 'meta' }, timeStr)
    );
}

function pageFooter() {
    return h('footer', { className: 'footer' },
        h('div', { className: 'copyright' },
            '© 2014-2024 David J. Hudson'
        )
    );
}

function homePage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('hashingit.com')
        ),
        pageFooter()
    );
}

function aboutPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('About Me', '2024-05-29 07:45'),
            h('p', {},
                'Hello, good morning/afternoon/evening* and welcome! ',
                h('em', {}, '(*please delete as appropriate)')
            ),
            h('p', {},
                'I\'m an unrepentant geek who loves all things engineering, scientific or otherwise techie. ' +
                'I would say I love maths too, but I should probably leave that to the experts :-)'
            ),
            h('p', {},
                'I\'ve been playing with computers and writing software since I was 9 which is way more years than ' +
                'I care to think about. In that time I\'ve had the pleasure of working on everything from massive scale ' +
                'embedded systems (IoT before anyone called it that) to mainframes, and now to decentralised systems. ' +
                'Along the way, I stopped to build operating systems, network stacks, compilers. For a while I also ' +
                'helped design CPU instruction sets.'
            ),
            h('p', {},
                'Lately I\'ve been building blockchain and distributed ledger systems.'
            ),
            h('figure', {},
                h('img', { src: "/content/about/dave.jpg", alt: "Me (apparently always pictured with a drink!)" }),
                h('figcaption', {}, 'Me (apparently always pictured with a drink!)'
                )
            ),
            h('p', {},
                'That journey has led me all over the world and I\'ve had the privilege of collaborating with some ' +
                'amazing people.  I live in North Wales (UK), but for 17 years I “commuted” to Northern California. ' +
                'Now my travels tend to take me to London (UK) and Abu Dhabi (UAE).'
            ),
            h('h2', {}, 'What\'s this site about?'),
            h('p', {},
                'This site is a little bit of an experiment.  Over the years I\'ve researched and developed a lot ' +
                'of things I think are interesting, and I wanted to have somewhere to try and share some of what ' +
                'I\'ve learned and some of what I learn as I go along. If you do find anything interesting then ' +
                'please feel free to reach out to me on: ',
                h('a', { href: "http://twitter.com/hashingitcom" }, 'Twitter'),
                ' or ',
                h('a', { href: "http://linkedin.com/in/davejh/" }, 'LinkedIn')
            )
        ),
        pageFooter()
    );
}

function blogArticle_201403090000() {
    return [
        h('p', {},
            'Bitcoin mining is seemingly unique. There has probably never been any technology problem that ' +
            'has triggered such sustained growth and it may be a very long time before we see another one. ' +
            'A convergence of the scalable Bitcoin protocol design, readily available technology, money ' +
            'and mining incentives have accelerated this particular mine train in a truly explosive way. ' +
            'Let\'s look at the trends and what they suggest for future mining activities.'
        ),
        h('h2', {}, 'What has been happening?'),
        h('p', {},
            'There is probably a lot to be said for looking at the history of Bitcoin mining prior to the ' +
            'last 12 months but it\'s more interesting to look at how it has progressed since the introduction ' +
            'of ASIC (application specific integrated circuit) mining. We might argue that this is the ' +
            'point at which mining started to become a professional task since the hardware involved can\'t be ' +
            'used for anything else. Previous generations used hardware that was originally designed for ' +
            'other purposes and so let amateurs play too.'
        ),
        h('p', {},
            'Let\'s look at the worldwide hashing data:'
        ),
        h('figure', {},
            h('img', { src: "/content/blog/2014-03-09-0000/20140309-hash-12months.png" })
        ),
        h('p', {},
            'The first thing to notice is that this isn\'t an ordinary graph. It\'s plotted on a logarithmic ' +
            'Y axis meaning that each major graduation is 10 times larger than the one below.  If we look at ' +
            'the red trend line though it\'s a straight line, signalling that we have had exponential ' +
            '(runaway) growth. There was a small period of time before the value of Bitcoins soared late in ' +
            '2013 where things had slowed down but then everything caught up (which rarely happens with ' +
            'technology problems).'
        ),
        h('h2', {}, 'Exponential growth'),
        h('p', {},
            'It\'s useful to think about what that red trend line shows us. What we see is that in the last ' +
            '12 months the worldwide hashing rate has increased by a factor of approximately 1000. That ' +
            'means that roughly every 4 months it got 10x larger, that it doubles almost every 37 days ' +
            'and that it increases by almost 1.9% per day! We don\'t know how long this trend will continue ' +
            'but it has been somewhat stable for the last year. Given that newer and faster ASIC hardware is ' +
            'due to ship throughout the next few months it seems likely that it will continue for some time yet.'
        ),
        h('h2', {}, 'The economics of professional mining'),
        h('p', {},
            'Bitcoin mining is a zero-sum game; if one player wins then everyone else has to lose. When the ' +
            'value of Bitcoins increases it means that even winning a small share of the total can be highly ' +
            'valuable so, rather than play alone, most people join a mining pool. Mining pools let a player ' +
            'win fractions of the payout to that pool in proportion to the resources supplied to the pool but ' +
            'what we\'ve just seen is that any resources a player contributes are reduced by almost 1.9% per ' +
            'day. After a week they\'re down by more than 12% and after 37 days they\'re only 50% of what they ' +
            'started at.'
        ),
        h('p', {},
            'What this really means is that mining equipment has a staggering level of depreciation. If the ' +
            'value of a Bitcoin doesn\'t change in that 37 day period then the mining hardware is only ' +
            'producing half of the value it started with. After 74 days it\'s a quarter and after 4 months ' +
            'it\'s only a tenth. It quickly reaches the point where the operating cost (OpEx) outweighs the ' +
            'value of what\'s being produced and the hardware is worthless. At this point the entire capital ' +
            'cost (CapEx) of buying the equipment is wiped out.'
        ),
        h('p', {},
            'Almost nothing else we encounter works this way; consider that servers in a data centre or a ' +
            'laptop may be assumed to have a useful life of 3 to 5 years, while a car would typically be more ' +
            'than 10 years. With a stagnant Bitcoin price, mining hardware has depreciated to just 1% of its ' +
            'original value in 8 months and its useful lifespan (where it produces more value than it costs ' +
            'to operate) is probably much shorter! Even if the value of Bitcoin increases by a factor of 10 it ' +
            'still only defers the huge reduction in capital value by 4 months.'
        ),
        h('h2', {}, 'How does this affect the hashing rate?'),
        h('p', {},
            'The huge rate of depreciation means that there\'s only one sensible approach that a bitcoin miner ' +
            'can take: Run the hardware 24/7 at the highest speed that doesn\'t cause it to break from the ' +
            'moment it arrives until it\'s no longer generating more value than it costs to run. Not doing this ' +
            'simply means a miner is losing the most valuable portion of their hardware\'s life.'
        ),
        h('p', {},
            'This simple rule has an important consequence; It guarantees a constant supply of the newest and ' +
            'fastest hashing engines driving the worldwide hashing rate. Once an order is placed a miner is ' +
            'committed to fueling this expansion. Unlike the rides in theme parks around the world, this ' +
            'particular runaway mine train isn\'t slowing down for anyone!'
        )
    ];
}

function blogArticle_201403120000() {
    return [
        h('p', {},
            'There\'s something odd about the fluctuations in the price of Bitcoins. The data shows a set of ' +
            'spikes when the price jumps up and then falls back somewhat and levels out. This wouldn\'t be so ' +
            'unusual if the spikes occurred intermittently but in the case of Bitcoins the spikes happen ' +
            'with a very surprising regularity!'
        ),
        h('p', {}, 'Let\'s look at the graph:'),
        h('figure', {},
            h('img', { src: "/content/blog/2014-03-12-0000/20140312_BTC_Price.png" })
        ),
        h('p', {},
            'The first thing to note is that the graph is plotted with a logarithmic Y axis so each step ' +
            'indicates a price point ten times larger than the one below. Using a log scale means that we see ' +
            'patterns in the relative change in price much more easily, rather than changes in the actual value.'
        ),
        h('p', {},
            'There are 7 major spikes in the Bitcoin price starting on 17th November 2010 and finishing on the ' +
            '30th November 2013. If we ignore the spike on 10th February 2011 the other 6 spikes have an ' +
            'amazingly consistent spacing!'
        ),
        h('p', {},
            'All of the major price spikes also show another remarkable similarity. In each case the price ' +
            'ramps up very quickly, hits its highest point for a day or two and then slowly drops off.'
        ),
        h('p', {},
            'So there are a few big questions (to which I don\'t have any answers right now):'
        ),
        h('ul', {},
            h('li', {}, 'Why does the price spike up every 7 to 7.5 months?'),
            h('li', {}, 'Why does the price never drop back below where it starts from?'),
            h('li', {}, 'Is the behaviour just coincidence or is someone or something triggering it?')
        ),
        h('p', {},
            'Does anyone have any data that might explain this?'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: "http://blockchain.info" }, 'blockchain.info')
        )
    ];
}

function blogArticle_201403170000() {
    return [
        h('p', {},
            'Which comes first: The miners or the money? Much as the old question of “Which came first: The ' +
            'chicken or the egg?” there appears to have been a lot of debate about whether the price of Bitcoins ' +
            'is a result of mining activity or whether mining activity is the result of the price of Bitcoins.'
        ),
        h('p', {},
            'The generally-held belief is that as the value of Bitcoins has increased there has been more interest ' +
            'in Bitcoins and this has in turn driven miners to mine, but is it really this simple?'
        ),
        h('p', {},
            'Let\'s look at a chart comparing the value of Bitcoin in US Dollars vs the global hashrate in GHash/s ' +
            'and see if we can make any sense of this?'
        ),
        h('figure', {},
            h('img', { src: "/content/blog/2014-03-17-0000/20140317_Bitcoin-vs-hash.png" })
        ),
        h('p', {},
            'This chart is plotted on two logarithmic axis but they\'re not on the same scale. The price trace increases ' +
            'by approximately a factor of a thousand but the hashing traces increases by approximately a factor of ' +
            'ten million. Essentially this means that the hashing rate has increased 56 times faster than the price. ' +
            'There\'s nothing particularly significant about the ratios other than that they let us watch the two ' +
            'traces relative to each other.'
        ),
        h('p', {},
            'We can see something a little curious here though. The hashing rate does indeed speed up as the price of a ' +
            'Bitcoin increases and the rate slows once the price starts to fall but it\'s almost as if the hashing ' +
            'rate has been acting as an anchor for the price. If we think about the hardware that has been used for ' +
            'hashing, however, there\'s an interesting pattern.'
        ),
        h('p', {},
            'In 2010 and the first half of 2011 miners could rapidly bring new hardware on-stream in the form of CPUs ' +
            'and then GPUs. In many cases these were already available and so mining profitability didn\'t really ' +
            'have to account for the hardware costs and people would want CPUs and fast GPUs anyway.'
        ),
        h('p', {},
            'From mid 2011 to early 2013 the initial euphoria waned, yet that seems a little strange for something ' +
            'that had seen such rapid growth only a short while earlier. There were the ',
            h('a', { hRef: '/blog/2014-03-12-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-12-0000') },
                'strange periodic spikes in the Bitcoin price every 7-ish months'
            ),
            ' but neither the price nor the hashing rate really changed that much. Roll forward to early 2013 though ' +
            'and things suddenly changed - a lot.'
        ),
        h('p', {},
            'In early 2013 Bitcoin mining ASICs started to take over the hashing activity. Unlike previous generations ' +
            'that used CPUs and GPUs that were intrinsically useful for other purposes the ASICs weren\'t; they ' +
            'weren’t cheap either! Suddenly a lot of Bitcoin miners were having to pay a lot of money to mine Bitcoins ' +
            'but curiously the price started to go up just as the ASICs started to become available. Even more curiously, ' +
            'the ASICs had long lead times so miners had made a financial commitment to mining months in advance of their ' +
            'mining hardware being available. Was it just “good luck” that the Bitcoin price suddenly surged, and then ' +
            'surged again, or was the price increase simply reflecting that a lot of money had been spent to go mining?'
        ),
        h('p', {},
            'It seems quite possible that at least part of the reason for the surges in the Bitcoin price is a result of ' +
            'the miners investing in mining. The price increases have encouraged more miners too and that means more ' +
            'money spent on mining by those new miners. This really does feel like a “chicken and egg” problem. A bigger ' +
            'question, however, is what happens when the number of miners is large and the technology roadmap eventually ' +
            'limits the ability to increase the hash rate? At that point there will need to be some other driver for any ' +
            'other price increases.'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: "http://blockchain.info" }, 'blockchain.info')
        )
    ];
}

function blogArticle_201701061400() {
    return [
        h('em', {},
            'Note 2020-03-06: This was originally published as an opinion piece at ',
            h('a', { hRef: 'https://www.coindesk.com/what-iot-history-reveals-about-blockchains-challenges' },
                'Coindesk'
            ),
            '.'
        ),
        h('hr', {}),
        h('figure', {},
            h('img', { src: "/content/blog/2017-01-06-1400/rock-paintings-art.jpg" }),
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
            'Early enthusiasm for new technologies is nothing new. With most, an initial wave of excitement sees new ideas ' +
            'touted as solutions to a huge range of problems, the hype fades, gives way to skepticism, and ultimately, real ' +
            'applications.'
        ),
        h('p', {},
            'In the late 1990s, the idea of Internet-connecting every electronic device seemed inescapable.'
        ),
        h('p', {},
            'Every vending machine, coffee pot, toaster, refrigerator, microwave, and TV, would be cabled to the “net”, and ' +
            'a utopian sharing of data would improve life for everyone.'
        ),
        h('p', {},
            'The reality for what we now term the “Internet of Things”, or IoT, was a little different.'
        ),
        h('h2', {},
            'It\'s all about money'
        ),
        h('p', {},
            'The original theory of IoT was that data would make everything better.'
        ),
        h('p', {},
            'Microwave ovens might scan cooking instructions and thus not make mistakes, refrigerators might reorder milk, ' +
            'etc. Automation would liberate users of these appliances, and give them time for other things.'
        ),
        h('p', {},
            'Unfortunately, the theory hadn\'t been worked out fully.'
        ),
        h('p', {},
            'Adding Internet connectivity to a device is never free-of-charge.  In most cases this was a realm of small, ' +
            'low-CPU-powered devices, with no connectivity, so making them Internet-connected was going to cost money.'
        ),
        h('p', {},
            'In the 20 years since those original ideas, little has changed.'
        ),
        h('p', {},
            'Let\'s consider the microwave oven example.  A microwave would need a pretty simple IoT hardware design, so ' +
            'perhaps $5 in parts cost. The first problem is that the $5 turns into nearer $15 by the time we add the margins ' +
            'for the company making the circuit boards, the company building the product and the retailer that sells it.'
        ),
        h('p', {},
            'Our next problem is that just having the hardware in our microwave oven isn\'t sufficient. We need to make it ' +
            'communicate with servers that know how long, and at what power level, each new type of frozen pizza needs to ' +
            'cook. That implies servers, it implies dev-ops teams, it implies software engineers, and it implies business ' +
            'development people who persuade pizza manufacturers to provide cooking details for each new product they design.'
        ),
        h('p', {},
            'The infrastructure side has perhaps cost us another $10 per unit.'
        ),
        h('h2', {},
            'Nice ideas'
        ),
        h('p', {},
            'Smart devices are a little like smart contracts.'
        ),
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
            'interesting concept into a liability. It isn\'t worth the setup time and $50 to a customer, and the trouble ' +
            'isn\'t worth it for the manufacturer.'
        ),
        h('h2', {},
            'Same old story'
        ),
        h('p', {},
            'We have the same challenges when thinking about uses for blockchains.'
        ),
        h('p', {},
            'Not every problem needs a blockchain as a solution. Blockchains cost money in terms of processing, storage and ' +
            'replication technology. In the case of a decentralized cryptocurrency, such as Bitcoin, the blockchain-like ' +
            'concept is an essential characteristic to build a viable design, but for other problems we need to ask if the ' +
            'blockchain features are doing something valuable.'
        ),
        h('p', {},
            'If domestic microwaves aren\'t an option, then maybe refrigerators might be? Domestic ones have many of the ' +
            'same problems as microwaves, but how about commercial refrigeration? What if we could connect these devices so ' +
            'that if they broke down we could avoid expensive losses?'
        ),
        h('p', {},
            'A large industrial cold store might contain hundreds of thousands of dollars of refrigerated products, so ' +
            'signaling breakdowns and avoiding stock losses must be a valuable problem to solve?'
        ),
        h('p', {},
            'The maths is compelling, but the problem is that it was 25 years ago, too.'
        ),
        h('p', {},
            'While they might not have matched our IoT vision, many companies already found approaches to network these ' +
            'devices a long time ago.'
        ),
        h('p', {},
            'This example has another subtlety. Food storage is generally subject to regulations, and many countries ' +
            'require that records are kept of the temperatures at which products were stored.'
        ),
        h('p', {},
            'Without networking, there would be a need for someone to manually record temperatures every few hours, and ' +
            'this is both expensive and error-prone. Commercial refrigeration equipment also involves service companies ' +
            'and manufacturers providing on-site repairs, so we have more stakeholders for whom access to data is important.'
        ),
        h('p', {},
            'A naïve view of the problem might well have ignored them. Unexpected stakeholders introduce unexpected costs, ' +
            'and may resist changes that do not also offer them substantial benefits.'
        ),
        h('p', {},
            'The implications for blockchains are very similar.'
        ),
        h('p', {},
            'If a problem is already being solved, then, even if a blockchain might be useful, we need to ask if it offers ' +
            'enough incremental advantages? Do we know what all the problems are, including the ones that might not be ' +
            'obvious unless we were domain experts? Are there stakeholders, such as network architects, security experts, ' +
            'data architects, dev-ops teams, etc., who must change existing systems to adopt a new one? Are there ' +
            'analytical needs that require big-data, relational, graph, or time-series, views of any data that is being ' +
            'processed?'
        ),
        h('h2', {},
            'Forever is a long time'
        ),
        h('p', {},
            'Leaving aside specific uses of IoT for a moment, it\'s worth considering an important characteristic of the ' +
            'devices that were supposed to become smart and connected.  These devices don\'t get replaced very quickly.'
        ),
        h('p', {},
            'Most of our connected devices get replaced quite quickly. Vendors provide support for a few years but then ' +
            'expect users to discard them and buy new ones.'
        ),
        h('p', {},
            'The problem is we don\'t do this with most of our electrical items. We typically only replace them when they ' +
            'fail. By making them connected we introduce entirely new modes of failure.'
        ),
        h('p', {},
            'One such problem is how do we keep older devices working? Typically, manufacturers don\'t receive any form of ' +
            'revenue once a device is sold, so what is the incentive to keep providing software updates once those devices ' +
            'are out of warranty?'
        ),
        h('p', {},
            'Another problem is that, even if we might want to pay for updates and bug fixes, it may not be economically ' +
            'feasible to provide them. Older devices will have less powerful hardware that may not lend itself to new ' +
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
        h('h2', {},
            'Parallel problems'
        ),
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
            'of governance issues to be reviewed and resolved? If we consider systems that might potentially operate for ' +
            'many years, then what does it mean to have immutable storage indefinitely? How will the inevitable mistakes ' +
            'of various human users be corrected? What are the incentives for participants to keep systems running ' +
            'correctly?'
        ),
        h('p', {},
            'In the case of commercial deployments, what are the implications for rolling out updates and upgrades across ' +
            'organizations that have different priorities?'
        ),
        h('h2', {},
            'A new hype?'
        ),
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
        h('p', {},
            'IoT arrived but not quite as expected.'
        ),
        h('p', {},
            'Business empires based on the concepts of VHS tapes and DVDs were displaced. Users gained access to far more ' +
            'content, with lower costs and dramatically improved convenience. IoT technologies were not used in ' +
            'isolation, but were combined to solve real problems for the people who ultimately pay for the solutions, ' +
            'customers.'
        ),
        h('p', {},
            'This, then, is part of the challenge for blockchains.'
        ),
        h('p', {},
            'The commercial refrigeration systems slowly changed too.  Internet connectivity was a better approach than ' +
            'the ad-hoc methods used 20 years ago, and so replaced earlier designs when they reached natural replacement ' +
            'cycles. Likewise, mature and more capable blockchain designs may well have opportunities to replace other ' +
            'technologies in the future.'
        ),
        h('p', {},
            'Bitcoin stands as the first example of a viable blockchain solution to a well-defined problem.  As with many ' +
            'first-generation designs it has also served to highlight challenges, and its ultimate success or failure will ' +
            'depend on its ability to see them resolved.'
        ),
        h('p', {},
            'The challenge for other blockchains might be similar, but won\'t be the same.'
        ),
        h('p', {},
            'Blockchain technology will be well served by recognizing, and confronting the hardest problems that we know ' +
            'about, rather than imagining that we can resolve them later. We know that issues such as security, privacy, ' +
            'deployment and governance need to be addressed.'
        ),
        h('p', {},
            'At the same time, we must avoid the temptation to use blockchains, and blockchain ideas, where they are not ' +
            'the best solutions, and champion those where they are.'
        ),
        h('p', {},
            'If we do these things, then 2017 should be a year where blockchain hype gives way to blockchain hope.'
        )
    ];
}

function blogArticle_202001272336() {
    return [
        h('p', {},
            'When I decided to create this site, one of the main things I wanted to do was keep the blog as ' +
            'something of a journal. I\'ve tried this in the past when I was writing a C++ library, ',
            h('a', { href: 'http://github.com/dave-hudson/c8/wiki/Dev-Notes' }, 'c8'),
            ', and it was an interesting experience.'
        ),
        h('p', {},
            'While my earlier efforts related to something a little more complex, one of the reasons I found the ' +
            'exercise interesting was that it would allow me, and others, to come back and review what I did and why. ' +
            'Looking back nearly 3 years on from that previous experiment I realised there was a lot of interesting ' +
            'detail that wouldn\'t be at all obvious from the Git commits.'
        ),
        h('p', {},
            'Unlike C++, my HTML and CSS skills are pretty limited, but I found myself applying lessons learned in ' +
            'other software development to keep my future self sane.'
        ),
        h('h2', {}, 'Names matter'),
        h('p', {},
            'The names of things really matter. We want them to make sense and not be surprising. The original ' +
            'theme files I\'d picked up had some rather odd names. For example the ',
            h('code', {}, '<head>'),
            ' tag had a partial HTML snippet file called ',
            h('code', {}, 'header.html'),
            ' while the HTML header was called ',
            h('code', {}, 'head.html'),
            '. These are things that confused me over the last couple of days and would have done so again. ' +
            'They weren\'t big sources of confusion, but every incremental time would have been more time wasted ' +
            'for me. More importantly, they\'d have been an incremental source of confusion to anyone else who ' +
            'read the code for this site.'
        ),
        h('h2', {}, 'Good source code is as simple as possible'),
        h('p', {},
            'I\'ve seen too many examples of source code being made very dense in the apparent interests of ' +
            'simplification, but all too often I see pointless refactoring. Sometimes it\'s ok to just copy 2 or 3 ' +
            'lines of code to make it easy to read things all in one place. Sometimes it\'s better to make the CSS ' +
            'match up with the HTML structure, even if that leads to a little duplication, as that can make it ' +
            'easier to work out how those things line up together.'
        ),
        h('h2', {}, 'Great source code is consistent'),
        h('p', {},
            'One of the things that\'s most frustrating to me is lack of consistency. Doing the same thing in ' +
            'different ways just makes it harder for everyone who comes after you. Future readers will wonder what ' +
            'makes one different to the other and worry about what they\'ve not understood. Left unchecked this ' +
            'creates islands of code that maintainers don\'t want to touch in case they didn\'t fully get it.'
        ),
        h('h2', {}, 'Self documenting code completely misses the point of comments'),
        h('p', {},
            'This also brings me to a rant about commenting of code.  There\'s a school of thought that “self ' +
            'documenting” code is possible, but I\'d argue that that\'s ridiculous. How do we tell the difference ' +
            'between buggy code and correct code? How do we tell our future selves about things that we shouldn\'t ' +
            'do because they don\'t work well? How do we hint at things that might want to happen in the future? ' +
            'There are certainly bad comments; those that don\'t match up with the code, or just describe obvious ' +
            'syntactic characteristics, but good comments explain why the code is the way it\'s written!'
        ),
        h('h2', {}, 'Unconvinced? Here\'s a test'),
        h('p', {},
            'I don\'t expect to have convinced anyone yet, but here\'s a test that might help persuade you.  Take ' +
            'any significant piece of software that you\'ve written and find another developer who doesn\'t ' +
            'already understand it. Your role is to answer any questions about your software, while their role is ' +
            'to read it and explain back to you how each part works. To see this properly you have to arrange to ' +
            'do this in person.'
        ),
        h('p', {},
            'What I\'ve always found interesting about this test is the number of questions that get asked by the ' +
            'other person. Usually they\'ll seek clarifications. Often they\'ll end up saying things like “err, ' +
            'oh, no, that\'s not what it\'s doing”. Sometimes they\'re completely baffled. Occasionally they\'ll ' +
            'find bugs. Almost never do they scroll quickly through the code just describing it!'
        ),
        h('h2', {}, 'Source code needs to be written for people'),
        h('p', {},
            'So, finally, here\'s the thing that I wish more software developers thought about.'
        ),
        h('p', {},
            'The objective of writing good source code isn\'t just for a compiler or interpreter - it\'s for the ' +
            'benefit of future maintainers. Those people are going to need a lot more hints and help. They not ' +
            'only need to know what you wanted the code to do now but also how it might need to be modified by ' +
            'the time they\'re looking at it.'
        ),
        h('p', {},
            'Things aren\'t done when the machine in front of you gets it right, they\'re done when the next ' +
            'developer who needs to alter something is able to get it right too.'
        )
    ];
}

class BlogPosts {
    constructor(title, dateTime, hRef, articleFunction) {
        this.title = title;
        this.dateTime = dateTime;
        this.hRef = hRef;
        this.articleFunction = articleFunction;
    }
}

// Enumerate all the blog content served up here.  Newest content goes at the end.
let blogContent = [
    new BlogPosts(
        'The Bitcoin runaway mine train',
        '2014-03-09',
        '/blog/2014-03-09-0000',
        blogArticle_201403090000
    ),
    new BlogPosts(
        'Strange spikes in the Bitcoin price',
        '2014-03-12',
        '/blog/2014-03-12-0000',
        blogArticle_201403120000
    ),
    new BlogPosts(
        'Chickens and eggs?',
        '2014-03-17',
        '/blog/2014-03-17-0000',
        blogArticle_201403170000
    ),
    new BlogPosts(
        'What IoT history reveals about blockchain\'s challenges',
        '2017-01-06-1400',
        '/blog/2017-01-06-1400',
        blogArticle_201701061400
    ),
    new BlogPosts(
        'Understanding other people\'s code',
        '2020-01-27 23:36',
        '/blog/2020-01-27-2336',
        blogArticle_202001272336
    )
]

function navPrevNext(prevStr, prevHRef, nextStr, nextHRef) {
    return h('nav', { className: 'prev-next'},
        h('h2', {}, 'More blog posts'),
        h('table', { className: 'meta-nav' },
            h('tr', {},
                h('td', { className: 'prev' },
                    !prevStr ? '' : h('div', { className: 'icon' },
                        h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) },
                            h('i', { 'data-feather': 'chevron-left' })
                        )
                    )
                ),
                h('td', { className: 'prev-text' },
                    !prevStr ? '' : h('a', { href: prevHRef, onClick: (e) => navigateEvent(e, prevHRef) }, prevStr)
                ),
                h('td', { className: 'next-text' },
                    !nextStr ? '' : h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) }, nextStr)
                ),
                h('td', { className: 'next' },
                    !nextStr ? '' : h('div', { className: 'icon' },
                        h('a', { href: nextHRef, onClick: (e) => navigateEvent(e, nextHRef) },
                            h('i', { 'data-feather': 'chevron-right' })
                        )
                    )
                )
            )
        )
    );
}

function blogArticlePage(index) {
    let prevArticle = (index > 0) ? blogContent[index - 1] : null;
    let thisArticle = blogContent[index];
    let nextArticle = (index < (blogContent.length - 1)) ? blogContent[index + 1] : null;
    let prevTitle = prevArticle ? prevArticle.title : null;
    let prevHRef = prevArticle ? prevArticle.hRef : null;
    let nextTitle = nextArticle ? nextArticle.title : null;
    let nextHRef = nextArticle ? nextArticle.hRef : null;

    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle(thisArticle.title, thisArticle.dateTime),
            ...thisArticle.articleFunction()
        ),
        navPrevNext(prevTitle, prevHRef, nextTitle, nextHRef),
        pageFooter()
    );
}

function blogLink(href, title, meta) {
    return h('div', { className: 'blog-post' },
        h('span', { className: 'title' },
            h('a', { href: href, onClick: (e) => navigateEvent(e, href) }, title)
        ),
        h('span', { className: 'meta' }, meta)
    )
}

// Handle generating the '/blog' page
function blogPage() {
    let pageView = [];
    let headlineYear = '';

    // Iterate all the blog content and create year and item enties.
    for (let i = blogContent.length - 1; i >= 0; i--) {
        const blogPost = blogContent[i];
        const blogYear = blogPost.dateTime.slice(0, 4);
        if (headlineYear != blogYear) {
            headlineYear = blogYear;
            pageView.push(h('h2', {}, headlineYear));
        }

        pageView.push(blogLink(blogPost.hRef, blogPost.title, blogPost.dateTime));
    }

    // Return the VDOM for the blog page.
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('Blog posts'),
            h('div', { className: 'blog-posts' }, ...pageView)
        ),
        pageFooter()
    );
}

function notFoundPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('404: Page not found'),
            h('p', {}, 'Move along, nothing to see here!')
        ),
        pageFooter()
    );
}

const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/blog': blogPage
};

let rootVNode = null;

function handleLocation() {
    const path = window.location.pathname;
    const pageFunction = routes[path] || notFoundPage;
    const newVNode = pageFunction();
    const app = document.querySelector('#app');

    updateElement(app, null, rootVNode, newVNode, 0);
    rootVNode = newVNode;
    console.log(`navigated to ${path}`)
    feather.replace();
}

function navigateEvent(e, path) {
    e.preventDefault();
    window.history.pushState({}, '', path);
    handleLocation();
}

function route_init() {
    // Add all the blog content to the router.
    for (let i = 0; i < blogContent.length; i++) {
        routes[blogContent[i].hRef] = () => blogArticlePage(i);
    }

    // Set up the navigation for stepping backwards.
    window.onpopstate = () => handleLocation();
    handleLocation();
}

document.addEventListener('DOMContentLoaded', route_init());
