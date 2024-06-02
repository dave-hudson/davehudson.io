import { h, VDom, updateElement } from '/lib/dvdi.js';
import { pageHeader, articleTitle, pageFooter } from '/lib/page.js';
import { routes, navigateEvent } from '/app.js';

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
            h('img', { src: '/blog/2014-03-09-0000/20140309-hash-12months.png' }),
            h('figcaption', {}, 'Worldwide hashing rate')
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
            h('img', { src: '/blog/2014-03-12-0000/20140312_BTC_Price.png' }),
            h('figcaption', {}, 'Bitcoin price over time')
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
            h('a', { href: 'http://blockchain.info' }, 'blockchain.info')
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
            h('img', { src: '/blog/2014-03-17-0000/20140317_Bitcoin-vs-hash.png' }),
            h('figcaption', {}, 'Bitcoin price vs global hashrate')
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
            h('a', { hRef: '/blog/2014-03-12-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-12-0000')},
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
            h('a', { href: 'http://blockchain.info' }, 'blockchain.info')
        )
    ];
}

function blogArticle_201403230000() {
    return [
        h('p', {},
            'ASIC mining is now the norm for Bitcoin, and 28 nm ASICs are now becoming the mainstream replacing the 65 ' +
            'nm, or even 110 nm, designs of a year ago. Bitcoin ASICs have leapfrogged several integrated circuit (IC) ' +
            'technologies in a way that\'s rarely been seen before and at an almost unprecedented rate of progress.'
        ),
        h('p', {},
            'How have things been able to move so fast, how much further can this go, and what might we expect from ' +
            'new designs?'
        ),
        h('h2', {}, 'Why Have Things Moved So Fast?'),
        h('p', {},
            'There are two characteristics of Bitcoin\'s design that have enabled the current style of ASIC mining:'
        ),
        h('ul', {},
            h('li', {}, 'It was designed from the outset to be incredibly scalable.'),
            h('li', {}, 'It uses a commonly-used SHA256 hash function for most of the work.')
        ),
        h('p', {},
            'From a hardware designer\'s perspective the scalability of Bitcoin was a brilliant piece of engineering. ' +
            'Its design allows many parallel engines to work on the same problem without significant serialization (where ' +
            'things get bottlenecked through one part of the system) and the system design anticipated the need to ' +
            'automatically adapt as processing capacity increased or decreased, so adding a huge increase in processing ' +
            'wouldn\'t break anything. This sort of design is sometimes referred to as "embarrassingly parallel", and is ' +
            'one of the reasons why GPU mining worked so well prior to the development of ASICs as graphics processing ' +
            'is very similar.'
        ),
        h('p', {},
            'The SHA256 hash has been the subject of some criticism from other cryptocurrency advocates (although the ' +
            'introduction of Scrypt ASICs is showing that their arguments in favour of more complex hashes are somewhat ' +
            'weaker than they originally believed), but from an ASIC designer\'s perspective SHA256 was ideal. SHA256 has ' +
            'been supported in hardware for some time and so there were designs readily available to be used in mining ' +
            'chips.'
        ),
        h('p', {},
            'As two of the most tricky aspects of building an ASIC were already solved they were able to be developed far ' +
            'faster and with far less expense than would be true for most chips. With the first generation ASICs being so ' +
            'profitable for their designers then the rapid push towards newer and faster chips was almost inevitable.'
        ),
        h('h2', {}, 'Why does the "nm" size matter?'),
        h('p', {},
            'Silicon designers think in terms of the "feature size" or "geometry" of a design and this is measured in ' +
            'nanometers (nm). This number describes the smallest sized part used in constructing the transistors or wires ' +
            'within the integrated circuit (IC). The smaller the number, the more such elements can be fitted into the ' +
            'same space. It\'s important to realize that because ICs are two dimensional then making the feature size ' +
            'half of what it was means that we can actually get four times as many things in the same space.'
        ),
        h('p', {},
            'Over the course of time silicon designers "shrink" the feature size, typically at the rate of about 2x every ' +
            'four years. 130 nm designs were state of the art in 2002, 65 nm in 2006, 32 nm in 2010, etc. At the time of ' +
            'writing (2014), x86 processors used in PCs, laptops and servers are using 22 nm and are scheduled to jump to ' +
            '14 nm, while a state of the art mobile phone or tablet is probably using 28 nm.'
        ),
        h('figure', {},
            h('img', { src: '/blog/2014-03-23-0000/ASIC_geometry.png' }),
            h('figcaption', {}, 'ASIC geometry')
        ),
        h('p', {},
            'Looking at this as a picture we can see just how much difference there is between 110 nm, 65 nm and 28 nm. ' +
            'We\'re able to get more than 5x the number of transistors in a 28 nm device than a 65 nm one, and about 16x ' +
            'the number of a 110 nm one. What this means for mining ASICs is that we can get 16x as many hashing engines ' +
            'in the same amount of silicon. The solid block colours indicate geometries in which Bitcoin ASICs have ' +
            'either shipped or have been announced.'
        ),
        h('p', {},
            'The process geometry matters for many reasons:'
        ),
        h('ul', {},
            h('li', {},
                'As the feature size shrinks the speed of the devices increases! We don\'t just gain in terms of having ' +
                'more hashing engines, but each one can run faster too.'
            ),
            h('li', {},
                'When larger ICs are built there\'s usually some amount of parts that don\'t work because of small flaws ' +
                'in manufacturing. The smaller the devices, the more working ones that helps to keep the cost down.'
            ),
            h('li', {},
                'ICs generate a lot of heat when they are run but we can offset some of that by running with lower ' +
                'operating voltages. As the process size shrinks, so too do the required operating voltages. This is ' +
                'something of a balancing act though, as it also tends to make them slightly slower.'
            )
        ),
        h('p', {},
            'This isn\'t the full story as there are lots of subtleties that we won\'t go into here, such as there ' +
            'being "fast" and "slow" processes where typically faster processes consume a lot more power for the same ' +
            'work and slower ones consume less. When looking at 28 nm mining ASICs, though, it\'s worth noting that ' +
            'they\'re not all created equal and there will inevitably be quite large differences between the different ' +
            'designs we see.'
        ),
        h('h2', {}, 'Where Do Bitcoin ASICs Go Next?'),
        h('p', {},
            'Bitcoin ASICs have jumped forwards to the point where they\'re catching up with the limits of what can be ' +
            'done. Realistically they should be able to shrink to 16 nm by the end of the year or the beginning of 2015, ' +
            'and at 16 nm there\'s potentially a 3x improvement over an equivalent 28 nm device. Once things reach the ' +
            'limits of the fabs that produce the ASICs, though, then process-related gains will slow down dramatically.'
        ),
        h('p', {},
            'This doesn\'t mean that there are no more big jumps possible. It\'s likely that designers this year will ' +
            'have to start (if they haven\'t already) at other ways to try to keep propelling the ASIC ',
            h('a', { hRef: '/blog/2014-03-09-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-09-0000')},
                'mining train'
            ),
            '. Here are a few thoughts on where things may go next:'
        ),
        h('ul', {},
            h('li', {},
                'Look at how to reduce the power required for each hashing operation so that they can build systems ' +
                'with perhaps more ASICs but the same power consumption.'
            ),
            h('li', {},
                'Improve the implementation of the SHA256 engines to make them take fewer gates/transistors and thus ' +
                'pack even more into each new chip.'
            ),
            h('li', {},
                'Develop novel chip packaging that can dissipate heat more effectively.'
            )
        ),
        h('p', {},
            'These sorts of changes are going to require more work though because they won\'t just be based on ' +
            'known-working hardware concepts.'
        ),
        h('p', {},
            'It will be interesting to see just how this progresses; while the pace of progress will slow from where it ' +
            'is now, and the steep exponential growth in the hashing rate is likely to slow, there\'s every reason to ' +
            'believe that progressively faster hashing rates will continue to be a reality for quite some time to come.'
        )
    ];
}

function blogArticle_201404030000() {
    return [
        h('p', {},
            'Bitcoin mining can be a very profitable activity. It\'s good that it is because Bitcoin, as a system, only ' +
            'works because of the mining activity; it\'s the mining that ensures the transactions actually take place. ' +
            'Just how much money does it generate though and does this help us make any predictions for the future?'
        ),
        h('p', {},
            'Like mining any other finite resource, Bitcoin mining gets harder over time and requires more investment to ' +
            'mine profitably. Mining requires a capital outlay to buy mining equipment, incurs operating costs to keep ' +
            'it running and is ultimately only successful if, over the useful life of the mining equipment, the value of ' +
            'what\'s mined is higher than the total costs to mine it.'
        ),
        h('p', {},
            'For Bitcoin the mining rewards seem pretty simple to estimate. The current (2014-04-03) fixed block reward ' +
            'is 25 BTC and there are a nominal 144 blocks per day. This yields a nominal 3600 BTC per day. 1 BTC is ' +
            'currently worth about \$450 (USD) so that\'s \$1.62M being mined per day. In practice though, this ' +
            'underestimates the mining reward for a couple of reasons:'
        ),
        h('ul', {},
            h('li', {},
                'The difficulty level is going through a rapid (exponential) growth that means we\'re seeing far more ' +
                'than 144 blocks mined per day.'
            ),
            h('li', {},
                'The mining activity also earns the successful miner any transaction fees.'
            ),
        ),
        h('h2', {}, 'Blocks mined per day'),
        h('p', {},
            'Bitcoin was set up to try to track the amount of hashing capacity in the total network and to adjust the ' +
            'difficulty of the next batch of blocks every 2016 block (nominally every 2 weeks). The aim is to try to ' +
            'have the next 2016 blocks take 2 weeks to complete. Between the adoption of GPUs and the introduction of ' +
            'ASICs for mining this actually worked out quite well but the huge increases in hashing capacity enabled by ' +
            'ASICs have meant that the difficulty level has lagged behind. ',
            h('a', { hRef: '/blog/2014-03-23-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-23-0000')},
                'ASIC technology'
            ),
            ' limits will eventually slow this but not for some months at least.'
        ),
        h('p', {},
            'The impact of steadily increasing hashing rates can be seen when we look at the date at which the fixed ' +
            'block reward halves. The genesis block was created on 2009-01-03, with the first mined block being on ' +
            '2009-01-09. The fixed reward halves every 210000 blocks so at 144 blocks per day this should have been 1458 ' +
            'days later, or 2013-01-06. In practice block 210000 occurred on 2012-11-28, some 39 days earlier.'
        ),
        h('p', {},
            'If we consider more recent trends the effect is even more marked. Between blocks 210000 and 294000 there ' +
            'should have been 583.3 days, but we actually reached block 294000 in just 490 days. Over 19 months of ' +
            'hashing work was completed in a little over 16 months. Our average number of blocks per day has been ' +
            'slightly more than 171. In fact most of the gain has come in the last 14 months so the average block rate ' +
            'has been higher still.'
        ),
        h('p', {},
            'For the next few months at least it seems likely that we\'ll see this much larger average block rate so ' +
            'based on our original \$450 per BTC then we get a fixed reward per day of \$1.92M; this is \$300k per day ' +
            'more than we might have guessed.  The downside, of course, is that while there\'s more money being made now, ' +
            'so the date of the next halving of the reward is moving closer. Instead of being in November 2016 it\'s ' +
            'already moved to August 2016 and, unless something unexpected happens, will almost certainly happen a month ' +
            'or two before that.'
        ),
        h('h2', {}, 'Transaction fees'),
        h('p', {},
            'Bitcoin mining was designed to steadily move from a phase where mining was about collecting the fixed ' +
            'per-block reward of new coins to one in which transaction fees represented the majority of what a successful ' +
            'miner gained. So far the numbers of transactions haven\'t been high enough to provide significant rewards ' +
            'from the fees and they\'re typically only generating about 10-15 BTC per day. It\'s not unreasonable to ' +
            'state that Bitcoin needs transaction fees to become a larger part of the system otherwise the reduction in ' +
            'the fixed mining reward will be a serious problem.'
        ),
        h('p', {},
            'Typically miners will invest in the best hardware available in order to maximize their returns but that ' +
            'investment is funded by what they mine. If there\'s not a major increase in the value of transaction fees ' +
            'when the fixed mining reward halves again then there\'s an equally strong risk that mining investments will ' +
            'drop substantially. Given that mining uses highly specialized hardware and that the hardware comes from ' +
            'highly specialized companies then any such drop poses a serious risk to the profitability of companies ' +
            'supplying the virtual picks and shovels!'
        ),
        h('h2', {},
            'Chickens and eggs part 2'
        ),
        h('p', {},
            'In an earlier article, "',
            h('a', { hRef: '/blog/2014-03-17-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-17-0000')},
                'Chickens and eggs?'
            ),
            '", I speculated about the relationship between hashing rates and BTC price. In retrospect it seems a more ' +
            'interesting comparison is between hashing rates and the total daily miners\' reward. Here\'s that new chart:'
        ),
        h('figure', {},
            h('img', { src: '/blog/2014-04-03-0000/hash-vs-reward.png' }),
            h('figcaption', {}, 'Bitcoin hashing rate compared with total mining rewards April 2014')
        ),
        h('p', {},
            'As with earlier charts both of these traces are plotted on logarithmic axes but the two lines are spaced ' +
            'apart a little to make comparisons easier.'
        ),
        h('p', {},
            'If we consider that a state-of-the-art Bitcoin mining platform can generate a little over 300 MHash/s/\$ ' +
            'then the current worldwide capacity of 48 PHash/s would require an investment of \$160M. In practice most of ' +
            'the hashing capacity is nowhere near as cost effective as 300 MHash/s/\$ so it seems likely that the actual ' +
            'investment worldwide in the hardware that is currently running has been more like \$300M to \$500M. Given ' +
            'that the hashing rates have been increasing so dramatically for more than 12 months it\'s also highly ' +
            'unlikely that more than a very small fraction of the currently-deployed hardware has been in use for more ' +
            'than 8 months.'
        ),
        h('p', {},
            'If we look at the estimated miner\'s reward for the last 8 months it\'s \$514M. This suggests that a huge ' +
            'fraction of the money being made from mining is now also being spent on mining hardware. Another jump in the ' +
            'BTC price will help make things more profitable for miners but will probably also just trigger yet more ' +
            'spending on mining hardware. It also suggests that the correlation between mining hash rates and the BTC ' +
            'price is certainly more circular than might otherwise seem likely as purchases of mining hardware has been ' +
            'one of the biggest uses of Bitcoin itself.'
        ),
        h('h2', {}, 'Limits on hashing?'),
        h('p', {},
            'The \$514M represents a realistic limit on the hashing rate since no-one can afford to operate at a loss ' +
            'for long. Some of that \$514 has to have been used to cover operating costs such as electricity, HVAC, ' +
            'premises, and some amount of miner\'s profit. Unless ASIC and mining equipment vendors reduce their prices ' +
            'significantly then that puts an upper bound of \$514M \* 300 MHash/s/\$; a little over 150 PHash/s. ' +
            'Realistically it\'s probably less than 120 PHash/s and that\'s assuming that everyone was suddenly able to ' +
            'buy currently-shipping state-of-the-art equipment.'
        ),
        h('p', {},
            'As ASICs start to hit the limits of the process technology the huge expansions in the hashing rate will have ' +
            'to slow down and that will start to change the mining economics again\... seems like something to write ' +
            'about next time :-)'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: 'http://blockchain.info' }, 'blockchain.info')
        ),
        h('hr', {}),
        h('h2', {}, 'Related articles'),
        h('ul', {},
            h('li', {},
                h('a', { hRef: '/blog/2014-03-23-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-23-0000')},
                    'Where next for Bitcoin mining ASICs? (2014-03-23)'
                )
            ),
            h('li', {},
                h('a', { hRef: '/blog/2014-03-09-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-09-0000')},
                    'The Bitcoin runaway mine train (2014-03-09)'
                )
            )
        )
    ];
}

function blogArticle_201406050000() {
    return [
        h('p', {},
            'About 3 months ago I looked at how the BTC price seems to spike up approximately every 7 months. It seems ' +
            'to be happening again!'
        ),
        h('p', {},
            'Over the last couple of weeks the BTC price has reversed its earlier falls and has yet again started to jump ' +
            'back up again. The timing is pretty-much consistent with previous spikes.'
        ),
        h('p', {}, 'Let\'s look at the graph (plotted on a logarithmic Y axis):'),
        h('figure', {},
            h('img', { src: '/blog/2014-06-05-0000/BTC-price.png' }),
            h('figcaption', {}, 'Chart of BTC price over time')
        ),
        h('p', {},
            'The trend of high points in the graph (red line) shows another ',
            h('a', { href: '/blog/2014-03-09-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-09-0000')}, 
                'theme park ride'
            ),
            '. Like any good thrill ride we see regular highs and lows; here the peaks are anywhere between 212 days ' +
            'and 235 days, but in general the later ones have been nearer 235 days. 235 days from the last high would ' +
            'be 2014-07-24. It will be interesting to see if the current rises follow the same trend and if that\'s ' +
            'near our next destination.'
        ),
        h('p', {},
            'While our roller coaster may be an entertaining ride for many, the gentle slopes of the low point trend ' +
            '(green line) form an intriguingly steady path. Perhaps it\'s this trend that should be attracting far more ' +
            'attention?'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: 'http://blockchain.info' }, 'blockchain.info')
        ),
        h('hr', {}),
        h('h2', {}, 'Related articles'),
        h('ul', {},
            h('li', {},
                h('a', { hRef: '/blog/2014-03-12-0000/', onClick: (e) => navigateEvent(e, '/blog/2014-03-12-0000')},
                    'Strange spikes in the Bitcoin price (2014-03-12)'
                )
            )
        )
    ];
}

function blogArticle_201602030000() {
    return [
        h('p', {},
            'Most participants in the ongoing Bitcoin block size debates have a point of agreement; that a shortage of ' +
            'block space should have an effect on transaction fees. Arguments aside, then, let\'s see what has actually ' +
            'been happening. Are fees going through the roof? Are miners going to be celebrating a potential offset to ' +
            'the block reward halving that looms in July 2016? The results seem a little surprising!'
        ),
        h('h2', {}, 'Rewards for a Bitcoin miner'),
        h('p', {},
            'Bitcoin miners earn their per-block rewards in two ways. They collect a block reward subsidy that halves ' +
            'every 210,000 blocks and they collect the fees assigned each transaction within a block. Historically the ' +
            'fees have represented a tiny fraction of the total reward.'
        ),
        h('p', {},
            'Despite being far smaller, they are still actually worth a reasonable amount of money per year to the block ' +
            'makers who collect them. At the time of writing they represent around \$20,000 per day, potentially \$7.3M ' +
            'per year.'
        ),
        h('h2', {}, 'An emerging fee market?'),
        h('p', {},
            'If capacity is scarce within the Bitcoin blockchain we would expect to see transaction fees rise ' +
            'dramatically as users seek to ensure their transactions are processed ahead of everyone else\'s, but are ' +
            'there any strong indications that this has happened?'
        ),
        h('figure', {},
            h('img', { src: '/blog/2016-02-03-0000/fees-per-tx-btc.png' }),
            h('figcaption', {}, 'Fees per Bitcoin transaction in BTC')
        ),
        h('p', {},
            'We can see that throughout 2014 the BTC-denominated average fee per transaction steadily declined, ' +
            'stabilized in the first half of 2015 and then jumped in July 2015. Thereafter the average fee actually ' +
            'started to fall again. Transaction fees have bounced back up a little in the first few weeks of 2016, but ' +
            'this doesn\'t appear to be the fee armageddon that was forecast! If anything fee levels are now back where ' +
            'they were in early 2014.'
        ),
        h('p', {}, 'The trend is certainly curious, so let\'s look at the transaction volumes:'),
        h('figure', {},
            h('img', { src: '/blog/2016-02-03-0000/tx-per-day.png' }),
            h('figcaption', {}, 'Transactions per day in the Bitcoin network')
        ),
        h('p', {},
            'As we\'d expect, the transaction volume has been steadily increasing (otherwise there would be no block ' +
            'size bickering). The last 2 months have seen particular jumps, but that may in part be explained by the ' +
            'dramatic increases in hash rates again. Rather than a nominal 10 minute block time we\'ve been seeing nearer ' +
            'to 9 so the available capacity for low-fee or zero-fee transactions has been higher than we\'d expect. ' +
            'Instead of 6 MBytes per hour we\'ve probably had more like 6.6 MBytes per hour of block capacity.'
        ),
        h('p', {},
            'It\'s quite odd that the transaction rates have jumped quite so much in the last 7 months though, almost ' +
            'doubling. This is the very same period in which the average per-transaction fee had jumped up. The spike in ' +
            'July gives some indication of what happened, however, as this corresponds to the first "Bitcoin flood attack"' +
            ' (see: ',
            h('a', { href: 'https://en.bitcoin.it/wiki/July_2015_flood_attack' }),
            '). The flooding event caused the network to adjust fees upwards, but thereafter fees steadily declined again ' +
            'as fee-bearing transactions saw minimal impact on confirmation times.'
        ),
        h('p', {}, 'The first chart we looked at considered BTC-denominated fees, but what if we look at them in USD?'),
        h('figure', {},
            h('img', { src: '/blog/2016-02-03-0000/fees-per-tx-usd.png' }),
            h('figcaption', {}, 'Fees per Bitcoin transaction in USD')
        ),
        h('p', {},
            'This one actually looks worse.  It appears that the fee levels have steadily been increasing since July ' +
            '2015, but we\'re seeing the effect of two different things.  As the BTC-denominated fees started to fade ' +
            'back, the USD price of BTC was increasing so dollar-denominated fees do look like they\'ve been increasing. ' +
            'It\'s notable though that they\'re still lower than they were in the first 9 months of 2014.'
        ),
        h('h2', {}, 'Total costs per transaction'),
        h('p', {},
            'Finally, something curious: If we look at the cost of each transaction as measured by the USD-valued total ' +
            'mining rewards for each day and the numbers of transactions per day we see that things have been incredibly ' +
            'stable for the last 12 months:'
        ),
        h('figure', {},
            h('img', { src: '/blog/2016-02-03-0000/rewards-per-tx-usd.png' }),
            h('figcaption', {}, 'Rewards per transaction in USD')
        ),
        h('h2', {}, 'Final thoughts'),
        h('p', {},
            'Far from a fee market emerging to inflate transaction costs, we don\'t appear to have very much evidence of ' +
            'anything dramatic happening yet. There are a number of possibilities, but one is that the transaction ' +
            'volume doesn\'t really reflect transactions that most users care about. Low value fees for unimportant ' +
            'transactions may well be leaving more interesting transactions unaffected by any concerns about capacity. ' +
            'While the block size squabbles will continue it\'s unclear that there have yet been any wide-scale ' +
            'implications for current users of the network.'
        ),
        h('hr', {}),
        h('h2', {}, 'Data reference'),
        h('p', {},
            'Data for this article was sourced via: ',
            h('a', { href: 'http://blockchain.info' }, 'blockchain.info')
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
            'Early enthusiasm for new technologies is nothing new. With most, an initial wave of excitement sees new ideas ' +
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
            'Our next problem is that just having the hardware in our microwave oven isn\'t sufficient. We need to make it ' +
            'communicate with servers that know how long, and at what power level, each new type of frozen pizza needs to ' +
            'cook. That implies servers, it implies dev-ops teams, it implies software engineers, and it implies business ' +
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
            'interesting concept into a liability. It isn\'t worth the setup time and $50 to a customer, and the trouble ' +
            'isn\'t worth it for the manufacturer.'
        ),
        h('h2', {}, 'Same old story'),
        h('p', {}, 'We have the same challenges when thinking about uses for blockchains.'),
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
        h('p', {}, 'The maths is compelling, but the problem is that it was 25 years ago, too.'),
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
        h('p', {}, 'The implications for blockchains are very similar.'),
        h('p', {},
            'If a problem is already being solved, then, even if a blockchain might be useful, we need to ask if it offers ' +
            'enough incremental advantages? Do we know what all the problems are, including the ones that might not be ' +
            'obvious unless we were domain experts? Are there stakeholders, such as network architects, security experts, ' +
            'data architects, dev-ops teams, etc., who must change existing systems to adopt a new one? Are there ' +
            'analytical needs that require big-data, relational, graph, or time-series, views of any data that is being ' +
            'processed?'
        ),
        h('h2', {}, 'Forever is a long time'),
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
            'of governance issues to be reviewed and resolved? If we consider systems that might potentially operate for ' +
            'many years, then what does it mean to have immutable storage indefinitely? How will the inevitable mistakes ' +
            'of various human users be corrected? What are the incentives for participants to keep systems running ' +
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
            'Business empires based on the concepts of VHS tapes and DVDs were displaced. Users gained access to far more ' +
            'content, with lower costs and dramatically improved convenience. IoT technologies were not used in ' +
            'isolation, but were combined to solve real problems for the people who ultimately pay for the solutions, ' +
            'customers.'
        ),
        h('p', {}, 'This, then, is part of the challenge for blockchains.'),
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
        h('p', {}, 'The challenge for other blockchains might be similar, but won\'t be the same.'),
        h('p', {},
            'Blockchain technology will be well served by recognizing, and confronting the hardest problems that we know ' +
            'about, rather than imagining that we can resolve them later. We know that issues such as security, privacy, ' +
            'deployment and governance need to be addressed.'
        ),
        h('p', {},
            'At the same time, we must avoid the temptation to use blockchains, and blockchain ideas, where they are not ' +
            'the best solutions, and champion those where they are.'
        ),
        h('p', {}, 'If we do these things, then 2017 should be a year where blockchain hype gives way to blockchain hope.')
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
        'Where next for Bitcoin mining ASICs?',
        '2014-03-23',
        '/blog/2014-03-23-0000',
        blogArticle_201403230000
    ),
    new BlogPosts(
        'The rewards for a Bitcoin miner',
        '2014-04-03',
        '/blog/2014-04-03-0000',
        blogArticle_201404030000
    ),
    new BlogPosts(
        'Strange spikes revisited!',
        '2014-06-05',
        '/blog/2014-06-05-0000',
        blogArticle_201406050000
    ),
    new BlogPosts(
        'A market for Bitcoin transaction fees?',
        '2016-02-03',
        '/blog/2016-02-03-0000',
        blogArticle_201602030000
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
export function blogPage() {
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

export function blogRouteInit() {
    // Add all the blog content to the router.
    for (let i = 0; i < blogContent.length; i++) {
        routes[blogContent[i].hRef] = () => blogArticlePage(i);
    }
}
