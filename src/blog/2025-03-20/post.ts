import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_03_20(): VElement[] {
    return [
        h('p', {},
            'It seems lots of people are losing their minds over the pros and cons of "vibe coding", so I\'ve been ' +
            'reflecting on my experiences over the last year.'
        )
    ];
}

function blogArticle_2025_03_20(): VElement[] {
    return [
        h('p', {},
            'Most of the great software engineers I\'ve worked have built "rapid prototypes" to try out ideas and ' +
            'learn from them. These were almost always intended to be thrown away (although the occasional prototype ' +
            'turned out to be awesome). Vibe coding offers a great way to experiment, and learn from, throw-away ' +
            'prototypes! There has never been a time before where it was so easy to try several different approaches ' +
            'to a problem to see what works better.'
        ),
        h('p', {},
            'The problem comes with the "learn from them" part. Our current LLM AI models don\'t learn from these ' +
            'experiments. They don\'t accumulate the knowledge of the paths that didn\'t work out unless we capture ' +
            'them in some way that they can read when we ask them to do something new. Importantly, the next ' +
            'generations of LLMs are trained on what made it into our software, not all the rejected prototypes. ' +
            'This means our future LLMs don\'t get to learn what didn\'t work because they rarely see that side.'
        ),
        h('p', {},
            'With human teams, we try to have our engineers talk about the things that didn\'t work as much as the ' +
            'things that did. This lets other people on the team, or future joiners to them team, understand what ' +
            'was learned. We get reports, presentations, workshops, etc. Engineering is as much about handling and ' +
            'learning from failures as successes. It\'s all about the details, and the details are unique to each problem.'
        ),
        h('p', {},
            'We can do the same for our AI assistants too. We can give them context such as design docs, product ' +
            'specs, or even just really great comments explaining *why* our software behaves in particular ways. ' +
            'Just like with human engineers we can discuss new software designs with our AIs to ensure they actually ' +
            'make sense. This is how we enable our AIs to be engineers, and it\'s this attention to detail that is ' +
            'why "vibe engineering" will never be a thing!'
        )
    ];
}

export const blogPost_2025_03_20 = new BlogPost(
    'Vibe coding',
    '2025-03-20',
    '/blog/2025-03-20',
    'Reflections on the "vibe coding" trend and how we can learn from experimental approaches while still maintaining engineering rigor.',
    null,
    null,
    blogOpening_2025_03_20,
    blogArticle_2025_03_20,
    null
);