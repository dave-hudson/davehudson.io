import {h, VNode} from '../../lib/dvdi';
import {pageHeader, pageFooter, hero} from "../../lib/page";
import {ProjectPage} from '../ProjectPage';

export function projectHumbugPage(): VNode {
    return h('div', {className: 'app'},
        pageHeader(),
        h('main', {className: 'main'},
            hero({
                title: 'Humbug',
                subtitle: 'An operating system for human/AI collaboration'
            }),
            h('div', {className: 'content'},
                h('div', {className: 'container'},
                    h('article', {},
                        h('p', {},
                            'Humbug is a project that explores building a secure and reliable operating system for human/AI ' +
                            'collaboration.'
                        ),
                        h('p', {},
                            'Traditional operating systems are designed to securely use and share hardware resources.  The best ones attempt ' +
                            'to protect users from buggy and malicious software.  The weakest link in this security chain is the human user, ' +
                            'who can be tricked into running unsafe software or leaking access to sensitive data.'
                        ),
                        h('p', {},
                            'The introduction of AI suddenly makes this a lot more complicated.  Our default model of the last few decades was ' +
                            'an unpredictable human interacting with what should be a predictable system.  With AI participant our unpredictable ' +
                            'human is suddenly dealing with an equally unpredictable AI too.'
                        ),
                        h('p', {},
                            'We need to rethink our approach to security, privacy, and trust.'
                        ),
                        h('figure', {},
                            h('img', {
                                    src: '/projects/humbug/v0.22-demo.gif',
                                    alt: 'A quick demo of Humbug v0.22'
                                }
                            ),
                            h('figcaption', {}, 'A quick demo of Humbug v0.22')
                        ),
                        h('section', {},
                            h('h2', {}, 'Background'),
                            h('p', {},
                                'Humbug was started as a project to build tools that would let me explore and develop legacy codebases, ' +
                                'but has since evolved into a more general purpose platform.  "Traditional" operating systems I\'ve ' +
                                'worked on, or designed, were able to draw on significant research from the 70s, 80s, and 90s, but ' +
                                'AI changes the game.'
                            ),
                            h('p', {},
                                'The blog post, "',
                                h('a', {href: '/blog/2025-08-11', target: '_blank'},
                                    'A path to an AI operating system'
                                ),
                                '" outlines some of my thoughts on why AI changes many long-standing assumptions.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Design philosophy'),
                            h('p', {},
                                'Humbug is designed to offer AIs a first class experience, while still catering to the needs of human users.  The UI ' +
                                'is designed to allow both humans and AIs to interact with it, allowing for a more collaborative experience.  As a ' +
                                'principle, anything major operation a human can do, an AI should be able to do something equivalent, giving AIs a ' +
                                'way to make collaborative work a two way experience.'
                            ),
                            h('p', {},
                                'As current LLMs are still prone to making serious mistakes, Humbug is designed to operate with a human in the loop.  ' +
                                'Wherever potentially dangerous operations are performed, the human is consulted for approval, and the tool calling ' +
                                'approvals cannot be bypassed.'
                            ),
                            h('p', {},
                                'For example, an AI may read a file, but cannot write to it without human approval.  An AI may read a terminal window, ' +
                                'but cannot type into it without human agreeing.  As AI may edit a file in an editor window, but cannot save it without ' +
                                'a human saying it\'s ok.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'The Humbug way of working'),
                            h('p', {},
                                'Humbug is designed around the idea that AIs and humans need to work together to achieve complex goals. Part of this, ' +
                                'however, is to recognise that AIs and humans have different strengths and weaknesses, but that this is really no ' +
                                'different to human teams that have diverse strengths and weaknesses.'
                            ),
                            h('p', {},
                                'Humans are good at understanding context, driving goals, making high-level decisions, and providing creative input. ' +
                                'AIs have incredible amounts of knowledge and an ability to process information and context orders of magnitude faster. ' +
                                'AIs can synthesize contextual information and execute on it way faster than humans, so conversations are the focal ' +
                                'point for collaboration.'
                            ),
                            h('p', {},
                                'Just like human teams, almost everything starts with a conversation. For example you can ask an AI to solve a problem ' +
                                'but ask it to explain how it will solve it first. Review the plan, ask questions, make suggestions, and then let the AI ' +
                                'get on with it at speeds no human can even start to emulate.'
                            ),
                            h('p', {},
                                'You don\'t step away from the process though. Almost any interesting problem will quickly lead to the AI either ' +
                                'asking for your feedback, or for you to review and approve its work. You can explore options, ask for changes, ask ' +
                                'for explanations, and move on to whatever comes next.'
                            ),
                            h('p', {},
                                'Humbug has been built using this same conversational approach.  As of v38, some of the conversations that have helped shape ' +
                                'its development are now available in the git repository.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Tool system'
                            ),
                            h('p', {},
                                'A key aspect of this type of system is the ability for the AI to make use of tools.  Humbug\'s tool system is designed to ' +
                                'provdide a range of orthogonal tools that can be combined to perform complex tasks.  Tools are designed with composability ' +
                                'in mind, allowing AIs to build complex workflows from simple building blocks.'
                            ),
                            h('p', {},
                                'A major expression of this concept is AIFPL (AI Functional Programming Language).  AIFPL is a pure, higher-order, ' +
                                'functional programming language designed specifically for AIs to use to perform algorithmic tasks.  As it is side-effect ' +
                                'free, it is safe for an AI to use without human supervision.'
                            ),
                            h('p', {},
                                'The tool system has taken a pragmatic approach.  Rather than trying to build a perfect system from the ground up, ' +
                                'Humbug has been built iteratively.  New tools have been added as needed to support specific use cases, many of which ' +
                                'have related to building the next parts of Humbug itself.  The aim is that new tools should demonstrably ' +
                                'accelerate real problems.  It also means that some tools have already come and gone, ' +
                                'with newer and better tools superseding them.'
                            ),
                            h('p', {},
                                'Humbug\'s current tools are:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'AIFPL:'), ' For running AIFPL code'),
                                h('li', {}, h('strong', {}, 'File System:'), ' For reading and writing files and directories'),
                                h('li', {}, h('strong', {}, 'Clock:'), ' For getting the time, setting alarms, and setting timers'),
                                h('li', {}, h('strong', {}, 'System:'), ' For interacting with the system UI tabs'),
                                h('li', {}, h('strong', {}, 'Delegate AI:'), ' For delegating tasks to child AIs'),
                                h('li', {}, h('strong', {}, 'Conversation:'), ' For interacting with conversational AIs in UI tabs'),
                                h('li', {}, h('strong', {}, 'Terminal:'), ' For interacting with terminal sessions in UI tabs'),
                                h('li', {}, h('strong', {}, 'Editor:'), ' For editing text files in UI tabs'),
                                h('li', {}, h('strong', {}, 'Preview:'), ' For previewing content in UI tabs'),
                                h('li', {}, h('strong', {}, 'Log:'), ' For interacting with system log messages in UI tabs'),
                            ),
                            h('p', {},
                                'Notably, many of these are designed to let the AI share the UI with a human user. The AI can see what ' +
                                'the human sees, and can control all the same things a human can control.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'AI backends'),
                            h('p', {},
                                'AI models are emerging at an incredible rate.  Humbug is designed to be able to make use of a variety of different AI backends, ' +
                                'allowing users to choose the best model for their needs.  Humbug currently supports the following AI backends:'
                            ),
                            h('ul', {},
                                h('li', {}, h('strong', {}, 'Anthropic:'), ' Support for Claude in all its variants'),
                                h('li', {}, h('strong', {}, 'Deepseek:'), ' Support for Deepseek models'),
                                h('li', {}, h('strong', {}, 'Google:'), ' Support for Gemini models'),
                                h('li', {}, h('strong', {}, 'Mistral AI:'), ' Support for Mistral models'),
                                h('li', {}, h('strong', {}, 'Ollama:'), ' Support for a open weight models'),
                                h('li', {}, h('strong', {}, 'OpenAI:'), ' Support ChatGPT models'),
                                h('li', {}, h('strong', {}, 'vLLM:'), ' Support for open weight models'),
                                h('li', {}, h('strong', {}, 'xAI:'), ' Support Grok models'),
                                h('li', {}, h('strong', {}, 'Zai:'), ' Support for GLM models')
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Project status'),
                            h('p', {},
                                'Humbug is under active development.  At the time of writing this (2026-01-17), the current version is v38.  The first version, ' +
                                'v0.1 was released in January 2025.  Releases happen every week or two.'
                            ),
                            h('p', {},
                                'One of the more interesting aspects of Humbug is that it is largely built using itself.  New features are often prototyped ' +
                                'by AI models inside Humbug, allowing both me and the AIs to dogfood the experience and identify issues early.'
                            ),
                            h('p', {},
                                'You can find the full change log on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug/blob/main/CHANGELOG.md', target: '_blank'},
                                    'CHANGELOG.md'
                                ),
                                '.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Related projects'),
                            h('p', {},
                                'Humbug incorporates several other projects I\'m working on, including:',
                            ),
                            h('ul', {},
                                h('li', {},
                                    h('a', {href: '/projects/aifpl', target: '_blank'}, 'AIFPL')
                                ),
                                h('li', {},
                                    h('a', {href: '/projects/metaphor', target: '_blank'}, 'Metaphor')
                                )
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'More information'),
                            h('p', {},
                                'You can find out more about the project on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug'
                                ),
                                '.'
                            ),
                            h('p', {},
                                'This site also hosts more information in the ',
                                h('a', {href: '/blog'}, 'blog'),
                                ' area.  You can also find design notes published since early August 2025 in the ',
                                h('a', {href: '/notes'}, 'notes'),
                                ' section.'
                            )
                        ),
                        h('section', {},
                            h('h2', {}, 'Source code and binaries'),
                            h('p', {},
                                'The source code can be found on GitHub: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug'
                                )
                            ),
                            h('p', {},
                                'MacOS binaries for each release can be found on the GitHub releases page: ',
                                h('a', {href: 'https://github.com/m6r-ai/humbug/releases', target: '_blank'},
                                    'https://github.com/m6r-ai/humbug/releases'
                                ),
                                '.'
                            )
                        )
                    )
                )
            )
        ),
        pageFooter()
    );
}

export const projectHumbug = new ProjectPage(
    'humbug',
    '/projects/humbug',
    'An AI operating system.',
    projectHumbugPage
);
