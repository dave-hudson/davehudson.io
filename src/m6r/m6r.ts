import {h, VNode} from '../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../lib/page";

export function m6rPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'M6R - "so long, and thanks for all the fish!"',
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('figure', {style: 'text-align: center; margin: 2rem 0;'},
                            h('img', {
                                src: '/m6r/m6r-512x512.svg',
                                alt: 'M6R Logo',
                                style: 'max-width: 256px; width: 100%; height: auto;'
                            })
                        ),
                        h('p', {},
                            'Eluned and I are both sad and happy to announce that we have decided to close down our company, M6R. ' +
                            'Sometimes opportunities arise that are so unusual it\'s impossible to turn them down. ' +
                            'I got offered one of them so I\'m writing this from the beautiful city of Abu Dhabi!'
                        ),
                        h('p', {},
                            'M6R was set up with a clear goal to build software that could help everyone involved in software development. ' +
                            'We did just that!'
                        ),
                        h('p', {},
                            'Our software was designed to do things in a very different way to other AI development systems. ' +
                            'We embraced a brand new GUI design, where others chose a less expressive route of running inside a terminal, ' +
                            'or simply clones other GUI dev tools. We championed users getting to own their AI development lifecycle by ' +
                            'making LLMs totally interchangeable at any point. We were doing what others now call "spec driven development" ' +
                            'via ',
                            h('a', {href: '/projects/metaphor'}, 'Metaphor'),
                            ' back in October 2024.'
                        ),
                        h('p', {},
                            'Our product, ',
                            h('a', {href: '/projects/humbug'}, 'Humbug'),
                            ' included all these elements, alongside an agentic terminal design that allows any LLM to interact with any ' +
                            'terminal running in the system. This has demonstrated some astonishing emergent properties where even non-thinking ' +
                            'AIs could automatically debug complex issues, heal themselves against incorrect tool uses, and all while ' +
                            'maintaining human-in-the-loop safety mechanisms.'
                        ),
                        h('p', {},
                            'Most recently, we\'ve also just embarked on building ',
                            h('a', {href: '/projects/aifpl'}, 'AIFPL'),
                            ', a pure higher-order functional programming language designed explicitly for AIs to use. ' +
                            'It\'s 100% side-effect free and thus allows LLMs to do complex deterministic processing without any need ' +
                            'for human supervision or approval.'
                        ),
                        h('p', {},
                            'Taking a somewhat extreme approach to dependency management a correct design meant Humbug was going to take a ' +
                            'long time to get going, but the last few months have reconfirmed that this was the right choice. ' +
                            'The agentic terminal and AIFPL designs were able to leverage very robust features that were added earlier ' +
                            'in the year and were built at incredible speed. There is still something magical about switching away from ' +
                            'the human needing to control the tools to watching an AI start to do exactly the same things with those same tools.'
                        ),
                        h('p', {},
                            'While all good things must come to an end, I\'m very happy to confirm this is not the end for Humbug. ' +
                            'Humbug was always open source and will remain so. I use it for all my software development work and couldn\'t ' +
                            'imagine doing anything else now. I may not have as much time to spend on this myself, but I am now confident ' +
                            'I can leave much more of the heavy lifting to LLMs!'
                        ),
                        h('p', {},
                            'If you\'ve followed and supported us on the M6R journey, please accept our thanks. Your encouragement and ' +
                            'feedback has been invaluable, and I hope you will still continue to support the now pure open-source Humbug, ' +
                            'Metaphor, AIFPL, and whatever else happens next.'
                        ),
                        h('p', {},
                            'Dave'
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}
