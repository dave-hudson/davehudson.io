import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_11(): VElement[] {
    return [
        h('p', {},
            'Thinking about AI agents and the intellectual property challenges that "bring your own agent" would create, ' +
            'plus notes while writing about AI operating systems.'
        )
    ];
}

function notesArticle_2025_08_11(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, '"Bring your own agent" is an IP disaster'),
            h('p', {},
                'I\'m writing a blog post about the case for an AI operating system. While I\'ve been writing it, I\'ve also been ' +
                'thinking about ways we will want to use AI in the future.'
            ),
            h('p', {},
                'Over the last few days I\'ve been seeing a few comments across LinkedIn and Reddit arguing that the era of ' +
                '"bring your own device" (BYOD) will give way to "bring your own agents". I\'m very sceptical that this is ' +
                'either desirable or safe.'
            ),
            h('p', {},
                'The problem is intellectual property (IP).'
            ),
            h('p', {},
                'If I work for a company, I invariably have to sign a contract that restricts my use of their IP. I\'m usually ' +
                'only allowed to use it solely on behalf of that company and not for my own use, or that of any future organization ' +
                'I might work for. This is enforced via legal contracts and either civil or criminal penalties if I breach those ' +
                'terms.'
            ),
            h('p', {},
                'Almost always, on ceasing work for that company I return all IP back to them, and commit to not having any ' +
                'copies that I could use in the future. I\'m allowed to keep my imperfect memories of things, but even then I\'m ' +
                'supposed to be very careful not to infringe on my employer\'s IP in the future.'
            ),
            h('p', {},
                'Even in situations where I work on open IP (e.g. open source software), there will often be sensitive internal ' +
                'material I\'m not able to reuse later.'
            ),
            h('p', {},
                'BYOD caused a lot of headaches this way. A lot of confidential information might have been retained on my device ' +
                'when I left an organization and this could lead to problems with IP. Software providers have worked around this ' +
                'in a variety of ways but typically companies have insisted you either could not use your own devices for ' +
                'company business, or else had to install software that would ensure all IP was deleted from your device when you ' +
                'left.'
            ),
            h('p', {},
                'What does this have to do with "bring your own agent"? Well, if I bring my own agent, how do I control what that ' +
                'agent does with that sensitive IP? Where does that information go, and how is it deleted or put beyond use on ' +
                'leaving a role?'
            ),
            h('p', {},
                'We don\'t have any solutions for this right now. Worse, we\'re only just starting to scratch the surface of the ' +
                'security and IP risks posed by autonomous agents who do not seek approval before doing something on our behalf.'
            ),
            h('p', {},
                'Bringing your own agent to a role will be fraught with problems, both for the individual who brings it, and for ' +
                'any company who is accidentally exposed to some other company\'s IP through it.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Notes while writing "A path to an AI operating system"'),
            h('p', {},
                'Anthropic note on using confidential computing for inference: ',
                h('a', {href: 'https://assets.anthropic.com/m/c52125297b85a42/original/Confidential_Inference_Paper.pdf'}, 
                    'https://assets.anthropic.com/m/c52125297b85a42/original/Confidential_Inference_Paper.pdf'
                )
            ),
            h('p', {},
                'Operating System And Artificial Intelligence: A Systematic Review: ',
                h('a', {href: 'https://arxiv.org/html/2407.14567v1'}, 
                    'https://arxiv.org/html/2407.14567v1'
                )
            )
        )
    ];
}

export const notesPost_2025_08_11 = new NotesPost(
    '2025-08-11: Thinking about AI agents',
    '2025-08-11',
    '/notes/2025-08-11',
    '2025-08-11: Thinking about AI agents and the intellectual property challenges that "bring your own agent" would create.',
    null,
    null,
    notesOpening_2025_08_11,
    notesArticle_2025_08_11,
    null
);
