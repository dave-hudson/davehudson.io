import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2024_11_06(): VElement[] {
    return [
        h('p', {},
            'Metaphor is designed to help you build software, but a key part of the software lifecycle is reviewing what ' +
            'we\'ve built to make sure it does what we expect it to do. So, how do we get Metaphor to help with this problem?'
        )
    ];
}

function blogArticle_2024_11_06(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Creating a code review engine'),
            h('p', {},
                'Our starting point is to recognize this problem is just another variant on a problem where we want to ask a ' +
                'large language model (LLM) AI to take on a role, given some relevant context, and some actions we\'d like it ' +
                'to perform. This is exactly the sort of problem Metaphor is designed to solve. It\'s also designed to solve ' +
                'it in a way that lets us try ideas quickly, build on ones that work well, and quickly discard ones that don\'t.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Define a role'),
            h('p', {},
                'The Metaphor syntax allows us to specify a role that we\'d like our LLM to fulfil. In this case we\'re looking ' +
                'for it to be an expert code reviewer. We can therefore start with something like this:'
            ),
            h('pre', {},
                h('code', {},
                    'Role: Code reviewer\n' +
                    '    You are an expert software engineer, highly skilled in reviewing code\n' +
                    '    written by other engineers.  You are able to provide highly insightful and\n' +
                    '    useful feedback on how their software might be improved.'
                )
            ),
            h('p', {},
                'We might be able to improve on this in the future, but it sets the scene.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Define some code review roles'),
            h('p', {},
                'The next thing needed is some rules against which to review our code. This is quite subtle because the LLM ' +
                'training data invariably contains a lot of information about what makes for good code. There are a few ' +
                'problems with this:'
            ),
            h('ul', {},
                h('li', {}, 'Any given LLM probably has too much information and won\'t be consistent about what it looks for.'),
                h('li', {}, 'Different LLMs will look for different things.'),
                h('li', {}, 
                    'The things the LLMs might want to look for may not match things that we really care about. For example, ' +
                    'they won\'t know about any project or company specific rules.'
                )
            ),
            h('p', {},
                'One thing we can do, however, is ask our available AIs what they consider to be important code review rules ' +
                'using an interactive session with them.'
            ),
            h('p', {},
                'When I did this with Claude 3.5 Sonnet, here\'s a fragment of what it replied:'
            ),
            h('ol', {},
                h('li', {}, 
                    h('b', {}, 'Code Style and Readability'),
                    h('ul', {},
                        h('li', {}, 'Follow PEP 8 style guide consistently'),
                        h('li', {}, 'Use meaningful variable and function names (descriptive_name vs x)'),
                        h('li', {}, 'Keep functions focused and under 50 lines when possible'),
                        h('li', {}, 'Use type hints for function arguments and return values'),
                        h('li', {}, 'Break complex expressions into well-named variables'),
                        h('li', {}, 'Limit line length to 79-88 characters'),
                        h('li', {}, 'Use consistent indentation (4 spaces, not tabs)'),
                        h('li', {}, 'Add docstrings for modules, classes, and functions'),
                        h('li', {}, 'Include examples in docstrings for complex functionality')
                    )
                ),
                h('li', {}, 
                    h('b', {}, 'Architecture and Design'),
                    h('ul', {},
                        h('li', {}, 'Follow SOLID principles'),
                        h('li', {}, 'Use composition over inheritance when possible'),
                        h('li', {}, 'Keep coupling low between modules'),
                        h('li', {}, 'Make dependencies explicit (avoid hidden side effects)'),
                        h('li', {}, 'Use dependency injection for better testing and flexibility')
                    )
                ),
                h('li', {}, 
                    h('b', {}, 'Performance Considerations'),
                    h('ul', {},
                        h('li', {}, 'Use appropriate data structures (dict for lookups, set for uniqueness)'),
                        h('li', {}, 'Avoid unnecessary list/dict comprehensions inside loops'),
                        h('li', {}, '...')
                    )
                )
            )
        ),
        h('section', {},
            h('h3', {}, 'Define what we want to review'),
            h('p', {},
                'Within our top-level Context: block we also need to say what it is we\'d like our LLM to review. We can do ' +
                'this with the Metaphor Embed: keyword. As of v0.2, Embed: can also take wildcards, so this is easier to do!'
            ),
            h('pre', {},
                h('code', {},
                    'Context: Files\n' +
                    '    The following files form the software I would like you to review:\n\n' +
                    '    # Replace this next line with the files you would like to review.\n' +
                    '    Embed: ../m6rc/src/m6rc/*.py'
                )
            ),
            h('p', {},
                'In this instance we\'re going to review all the Python source files in the Metaphor compiler, m6rc.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Define the action we\'d like the AI to take'),
            h('p', {},
                'Our Action: block simply needs to describe what the output should look like:'
            ),
            h('pre', {},
                h('code', {},
                    'Action: Review code\n' +
                    '    Please review the software described in the files I provided to you.\n\n' +
                    '    I would like you to summarise how the software works.\n\n' +
                    '    I would also like you to review each file individually and comment on how\n' +
                    '    it might be improved.  When you do this, you should tell me the name of the\n' +
                    '    file you\'re reviewing, and the modification you  believe should happen. Where\n' +
                    '    useful, I would like you to write new software to show me how those\n' +
                    '    modifications should look.'
                )
            ),
            h('p', {},
                'Strictly, we don\'t need the "summarise" request, but it\'s useful to see if the AI understood the software.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Running the code'),
            h('p', {},
                'To make this easier, I posted the source code on GitHub. You can find it at:'
            ),
            h('a', {
                    href: 'https://github.com/m6r-ai/demo-code-review',
                    target: '_blank',
                    title: 'Metaphor code review demo'
                }, 
                'https://github.com/m6r-ai/demo-code-review'
            ),
            h('p', {},
                'The output is too long to post here, but here\'s a snapshot from the middle of what ChatGPT 4o generated:'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2024-11-06/snapshot.webp',
                    alt: 'A snapshot of some of the ChatGPT 4o output.',
                    width: 800,
                    height: 'auto'
                }),
                h('figcaption', {}, 'A snapshot of some of the ChatGPT 4o output')
            ),
            h('p', {},
                'It turns out there were quite a lot of really good suggestions to improve this software!'
            )
        ),
        h('section', {},
            h('h2', {}, 'What next?'),
            h('p', {},
                'We\'ve seen how we can use Metaphor to build the core of a code reviewing engine.'
            ),
            h('p', {},
                'Given Metaphor\'s design, we can also evolve the code review capabilities over time. If we want to add new ' +
                'review guidelines we can simply update the relevant .m6r files and they\'re available the next time we go ' +
                'to review our code.'
            ),
            h('p', {},
                'As an example, after I got the first working reviews I wrote another Metaphor file that passed in the ' +
                'code review suggestions from Clause 3.5 Sonnet, and asked ChatGPT o1 to suggest improvements.  I merged ' +
                'these into the version you\'ll see in the git repo.'
            ),
            h('p', {},
                'Why don\'t you give this a try?'
            ),
            h('p', {},
                'I\'m planning to keep adding to the review guidelines in the git repo. If you\'ve got suggestions to improve ' +
                'the current ones, or new ones you\'d like to add (perhaps for different languages) then please do reach out ' +
                'or submit a PR.'
            )
        )
    ];
}

export const blogPost_2024_11_06 = new BlogPost(
    'Code reviews using Metaphor',
    '2024-11-06',
    '/blog/2024-11-06',
    'We take a look at how to use Metaphor to set up a large language model (LLM) AI to conduct detailed code reviews.',
    '/blog/2024-11-06/snapshot.webp',
    null,
    blogOpening_2024_11_06,
    blogArticle_2024_11_06,
    null
);