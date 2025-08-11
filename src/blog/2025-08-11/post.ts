import {h, VElement} from '../../lib/dvdi';
import {BlogPost} from '../BlogPost';

function blogOpening_2025_08_11(): VElement[] {
    return [
        h('p', {},
            'I\'m going to try to convince you we need to rethink some of our ideas about operating systems.'
        ),
        h('p', {},
            'That\'s a pretty bold concept, given that all our major operating systems have been around for a very ' +
            'long time. They\'ve been very effective, and have become progressively more capable as hardware ' +
            'has evolved. Importantly, as the base of our software stack, operating systems are the single most ' +
            'difficult thing to change because that entire software stack depends on their stability.'
        ),
        h('p', {},
            'Even so, my argument is the AI era has already changed a few fundamental assumptions significantly enough ' +
            'that we need to reconsider some things we\'ve not questioned in years!'
        )
    ];
}

function blogArticle_2025_08_11(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Why might we need something new?'),
            h('p', {},
                'Operating systems come in all sorts of sizes and capabilities. Many of these will blithely carry on as ' +
                'they are because they\'re not impacted by the introduction of AI. Embedded and realtime systems are unlikely ' +
                'to change because we typically don\'t want the cost or non-deterministic of AIs anywhere near most of them. ' +
                'The pressure for change comes when both human user and AIs come together.'
            ),
            h('p', {},
                'This changes things in very important ways.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Anatomy of existing operating systems'),
            h('p', {},
                'Pick up any text book or look at online content, such as Wikipedia, and you\'re likely to see a diagram ' +
                'something like this one to describe what an OS is:'
            ),
            h('figure', {},
                h('img', {
                    src: '/blog/2025-08-11/Operating_system_placement.svg',
                    alt: 'Operating system placement diagram showing the layered structure of hardware, operating system, applications, and user',
                    style: 'max-width: 100%; height: auto;'
                }),
                h('figcaption', {},
                    'Source: ',
                    h('a', {
                        href: 'https://en.wikipedia.org/wiki/File:Operating_system_placement.svg',
                        target: '_blank',
                        rel: 'noopener'
                    }, 'https://en.wikipedia.org/wiki/File:Operating_system_placement.svg')
                )
            ),
            h('p', {},
                'The user controls applications, that use the operating system, that provides access to the hardware. In our ' +
                'very conventional operating system, the bottom three layers of this diagram are all intended to be ' +
                'predictable and deterministic. Indeed, one of the primary reasons we wanted computers in the first place ' +
                'was because they would be fast, predictable, and accurate. Obviously, not everything follows these goals, ' +
                'but where we introduced randomness or variability it was usually to serve some important goal that would ' +
                'then be served by other software that met the fast, predictable, and accurate characteristics.'
            ),
            h('p', {},
                'In this model, the primary source of both motivation to do anything, of randomness, and of error is the user. ' +
                'Our human user is both the source of any creativity and invention, but also of the actions that might ' +
                'trigger unpredictable or bad behaviour.'
            ),
            h('p', {},
                'How or why would AI alter this picture? The answer is we just gained an entirely new category of "user".'
            )
        ),
        h('section', {},
            h('h2', {}, 'AI as an OS user'),
            h('p', {},
                'Sceptics might argue that AI doesn\'t do this. AI is just software after all. Indeed, if we dial back all ' +
                'sources of randomness within our current large language models (LLMs) they will also act deterministically, ' +
                'albeit in fairly unknowable ways. This, however, isn\'t how we use AI. We deliberately include randomness ' +
                'because it\'s that aspect that leads to interesting and new behaviour. We want AI to do things that would ' +
                'previously have required a human user, and this has significant consequences.'
            ),
            h('p', {},
                'Advocates of artificial general intelligence (AGI) or artificial super-intelligence (ASI) might argue that ' +
                'our next AIs will not have the same quirks as our current LLMs, but this ignores some important practical ' +
                'concerns. Even if these next generation AIs could do perfect maths, or think without making any mistakes, ' +
                'they will still want to be efficient and fast. Custom hardware designed to be predictable in the way ' +
                'human users wanted will be equally valuable to our AIs. They also need to communicate with other devices ' +
                '(hardware), with other AIs, and with humans. They will intrinsically need to use the same dumb computational ' +
                'resources we already access via operating systems.'
            ),
            h('p', {},
                'Even if these next generation AIs did not make "user" mistakes, they would still require the same ' +
                'safeguards and fault limiting behaviour we build into operating systems. They will still be dealing with ' +
                'hardware that has finite resources and sometimes fails, humans that do strange things, and adversarial ' +
                'actions from other entities.'
            ),
            h('p', {},
                'Fundamentally, any AIs we might build will be users of operating systems. Operating systems are not going ' +
                'away.'
            )
        ),
        h('section', {},
            h('h2', {}, 'AI as an application user'),
            h('p', {},
                'Operating systems are an enabler of applications in our system software diagram, and applications are the ' +
                'software that users tend to interact with the most.'
            ),
            h('p', {},
                'It\'s perhaps worth thinking about what we mean by "application software". Applications are the primary ' +
                'means by which users achieve some result that\'s important to them. This could be some enterprise software ' +
                'that solves specific business problems, communications tools such as email, web, and social media/messaging ' +
                'platforms, general productivity tools such as word processors, spreadsheets, and slide presentation ' +
                'software, games, or more niche digital processing software.'
            ),
            h('p', {},
                'There are a few key characteristics. Each solves some specific niche problem for its users, each ' +
                'invariably attempts to provide a consistent and predictable form of operation, and, in almost all cases, ' +
                'each takes inputs that originally came from a user request and generates outputs that will eventually ' +
                'make their way back to that same user.'
            ),
            h('p', {},
                'In the OS world we refer to this realm of applications and their supporting library software as "user space", ' +
                'precisely because this is where the user\'s software and data resides.'
            ),
            h('p', {},
                'This same concept of "user space" is also exactly where our AI users will end up operating. Right now AI ' +
                'tends to be bolted onto the side of existing applications, but any sort of agentic AI that can perform tasks ' +
                'on our behalf will want to make use of applications, not be inside them. AI inside applications feels like ' +
                'it will be an antipattern, certainly in the long term. That it is being put inside applications now ' +
                'really reflects an attempt to preseve existing market share from software companies who designed their ' +
                'software in a pre-AI era.'
            ),
            h('p', {},
                'But let\'s think about what most of that software currently looks like. Over the last 40 years the majority ' +
                'of our applications have progressively focused on providing visually and audibly rich environments to ' +
                'engage human users. The early part of that era was defined by applications that had radically different ' +
                'behaviours and experiences from app to app, but that coalesced into standard forms within our operating ' +
                'systems.'
            ),
            h('p', {},
                'Seamless AI will require similar standardization.'
            )
        ),
        h('section', {},
            h('h2', {}, 'What do we really do with applications?'),
            h('p', {},
                'It\'s worth pausing for a moment to consider what we use most applications for. The vast majority of them ' +
                'are used for human users to share things with other human users. A huge amount of our software is ' +
                'designed to allow one or more humans to share ideas and concepts with a much larger set of other humans.'
            ),
            h('p', {},
                'We create diagrams, images, tables, documents and videos, then enable users to converse about them, ' +
                'because these are the highest bandwidth and most engaging ways we can do this for human users.'
            ),
            h('p', {},
                'If anything we\'ll want to find even more engaging ways to share information, including smell, taste, and ' +
                'touch. These would all be ways to increase the bandwidth of communiciation.'
            ),
            h('p', {},
                'If anyone believes we\'re going to want to give that up in favour of anything more restricted then they\'re ' +
                'swimming against the tide. We\'re going to want our AIs to produce even more of this multifaceted content.'
            ),
            h('p', {},
                'The problem is AIs don\'t want things presented the same way we do. It makes no sense for AIs to engage in ' +
                'using these ever-more-complex multimedia forms. They want well defined interfaces and APIs that let them ' +
                'achieve a task in the most efficient ways possible, saving the human-friendly rendering to the very last ' +
                'step where a human is involved. If any AI shows us a spreadsheet on a grid, it\'s because it makes it easy ' +
                'for humans, not because the AI needed it that way!'
            ),
            h('p', {},
                'The application needs of human and AI users are very different.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Back to the past'),
            h('p', {},
                'In the early days of mainframe and mid-range servers, operating systems, such as Unix, had a model of ' +
                'computing based on a distributed set of users all sharing centralized hardware resources. A core idea of ' +
                'these operating systems was to make the computing experience as personal as possible. As users of these ' +
                'systems, even if we didn\'t own or control the hardware, it felt like it was ours. Only a small group of ' +
                'system administrators ever needed to know how things really worked, or how to resolve any problems that ' +
                'might have arisen.'
            ),
            h('p', {},
                'As computing has become more personal, those tools have continued to exist but most users are unaware of them ' +
                'or what they do. Even though their computing devices are doing lots of things on their behalf, they don\'t ' +
                'need to understand this aspect.'
            ),
            h('p', {},
                'I just ran ',
                h('code', {}, 'ps aux | wc -l'),
                ' on my MacBook and it revealed 686 processes (tasks) active, but there\'s only me ' +
                'as an actual end-user. They\'re all running on just 8 CPU cores. I have no idea what most of them do, although ' +
                'there are many that are running applications I specifically requested, and a few running the software I wrote ' +
                'and that I\'m using to write this blog post. I have to trust that the OS has sensible and secure behaviour ' +
                'that will keep my laptop running safely and well.'
            ),
            h('p', {},
                'Let\'s imagine, however, a future in which we each have many AI agents acting on our behalf. Unlike those existing ' +
                'processes that are running at our behest, suddenly there may be a great many more processes running under the ' +
                'direction of our agents. They\'re sharing access to the same hardware, but we won\'t want them sharing ' +
                'access to the same information! Do we really want an agent we task with finding photographs from a particular ' +
                'family holiday to have access to our sensitive banking details? Absolutely not!'
            ),
            h('p', {},
                'The challenge is in an era in which we are dramatically outnumbered by our own AI agents, our "personal" systems ' +
                'suddenly looks a lot more like those older time-sharing systems with many different users. They will need to ' +
                'be managed to ensure nothing bad happens. I don\'t believe we\'ve even started to think about how we\'ll address ' +
                'questions about how adversaries may try to compromise or subvert our agents!'
            ),
            h('p', {},
                'Managing teams of agents is an entirely new type of operating system problem and not one built into our ' +
                'current designs. It won\'t just be sufficient to have a trusted "application". We will want to ' +
                'ensure we know sensitive information is protected, and that our agents are correctly acting on our behalf. ' +
                'It\'s unlikely we want our agents to go all ',
                h('a', {
                    href: 'https://en.wikipedia.org/wiki/Tay_(chatbot)',
                    target: '_blank',
                    rel: 'noopener'
                }, '"Tay"'),
                ' on us!'
            ),
            h('p', {},
                'Having AI agents act on our behalf comes with new operational headaches.'
            )
        ),
        h('section', {},
            h('h2', {}, 'A path to an AI operating system'),
            h('p', {},
                'We\'ve seen some of the challenges, so what new concepts might an AI operating system need, or do differently?'
            )
        ),
        h('section', {},
            h('h3', {}, 'Conversation as the "thread" of execution'),
            h('p', {},
                'In conventional operating systems we have the concept of a process or task that represents the in-memory state ' +
                'of some work. Associated with this we can have other resources such as some file space. Most importantly, ' +
                'we have a concept of one or more threads of execution. These are where the actual processing takes place.'
            ),
            h('p', {},
                'With our current LLM AIs we can\'t really have more than one thread of execution. They\'re designed around a ' +
                'model of a "user" and an AI "assistant" communicating with each other. Like the process model, the AI ' +
                'assistant will respond to the user\'s input and generate some output. Along the way it may also call ' +
                'applications and use other tools to undertake tasks for it.'
            ),
            h('p', {},
                'Where processes work on raw memory, LLMs work on context windows. We need to manage these as resources, in ' +
                'much the same way as we manage memory in conventional processes.'
            ),
            h('p', {},
                'If we want a parent LLM to delegate tasks to one or more child LLMs we must be able to start new conversations, ' +
                'providing them with either a copy of the parent\'s current context, or some new context. Both have advantages.'
            ),
            h('p', {},
                'Forking (starting with the parent\'s context) allow one AI to start a dialog with another AI that knows all the ' +
                'same things. For example, this can be used for the parent AI to discuss things with itself, perhaps with ' +
                'explicit guidance to the child AI that it should adopt some particular role or position. This is also ' +
                'very effective for having multiple LLMs explore solutions to the same problem independently of each other, ' +
                'allowing the parent LLM to evaluate the solutions that were proposed.'
            ),
            h('p', {},
                'Executing a new conversation with a new context is ideal for targeted investigations and research tasks ' +
                'where the parent\'s context might constrain the new work. This may also have security benefits because the ' +
                'child AI does not have all the context (and thus all the same sensitive information) as the parent. This ' +
                'follows the ',
                h('a', {
                    href: 'https://en.wikipedia.org/wiki/Principle_of_least_privilege',
                    target: '_blank',
                    rel: 'noopener'
                }, 'principle of least privilege'),
                ' (PoLP).'
            ),
            h('p', {},
                'Care must be taken to provide protection against ',
                h('a', {
                    href: 'https://en.wikipedia.org/wiki/Fork_bomb',
                    target: '_blank',
                    rel: 'noopener'
                }, 'fork-bomb'),
                '-like scenarios.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Abstract the concept of conversations'),
            h('p', {},
                'Being able to create new conversations is an important concept, but if we want to embrace operating system ' +
                'design principles, we want to introduce some abstractions. One of these is the need to abstract conversations ' +
                'so it\'s possible to migrate them from one AI to another.'
            ),
            h('p', {},
                'Why might this be important? We can reasonably assume that AI models will come and go rapidly, while tasks ' +
                'we might want to perform on behalf of a user might be quite long-lived and outlive those models. Designing ' +
                'with suitable abstractions can eliminate these problems.'
            ),
            h('p', {},
                'Additionally, if we have this style of abstraction it\'s possible to leverage many different types of AI. We ' +
                'can evaluate them against each other, seek assistance from ones that have different strengths and weaknesses, or ' +
                'operate with inexpensive local models but switch to more expensive and more capable ones where necessary.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Protect access to filesystems and other information resources'),
            h('p', {},
                'LLMs gain access to filesystems and other resources via "tool calls" (also known as "function calls"). A key ' +
                'security aspect will be for a parent to be able to place restrictions on a child. It may be that the child ' +
                'is only granted a private filesystem or significantly reduced access credentials.'
            ),
            h('p', {},
                'This would mirror some of the capabilities of a Unix filesystem in that the parent could decide whether to allow ' +
                'a child to share its filesystem space. Alternatively we might imagine hierarchical permissions in which the ' +
                'parent is able access the child\'s resources but not vice versa.'
            ),
            h('p', {},
                'Following the PoLP, this would render child AIs to perform tasks for the parent, while not risking compromising ' +
                'the parent\'s secure information.'
            ),
            h('p', {},
                'Wherever the parent grants access, however, the tools through which access is granted must be very carefully ' +
                'managed to ensure the child is correctly restricted.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Carefully protect systems against rogue tools'),
            h('p', {},
                'One of the more popular features of many LLM clients right now is the Model Context Protocol (MCP). This works ' +
                'by allowing an LLM client to discover tools in other processes or on other systems. This is incredibly useful ' +
                'at times, but also very dangerous.'
            ),
            h('p', {},
                'Tool use works by injecting information into the "user" messages to the LLM about tools that are available and ' +
                'how to use them. Unfortunately this also makes them a powerful attack vector. They might masquerade as a ' +
                'different type of tool or inject responses into the LLM\'s context that poisons it.'
            ),
            h('p', {},
                'Our AI operating system must be able to strongly restrict tools that are available within any LLM context to ' +
                'limit potentially untrustworthy tools to only having very limited access, if any, to other tools.'
            ),
            h('p', {},
                'We need to be able to secure tools in the same way we would device drivers. This probably also means taking ' +
                'steps to never auto-accept tool descriptions that were themselves generated by another AI, and may require ' +
                'that a human administrator sign off on any change to a tool description that did not come from a verifiably ' +
                'trustworthy source.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Assume responses from other LLMs may be wrong, faulty, or malicious'),
            h('p', {},
                'A feature of current LLMs is that when presented with an ambiguous request, or one for which too little ' +
                'context information is available, an LLM may "hallucinate" some or all of its response.'
            ),
            h('p', {},
                'The safest way to deal with this is to assume any response may be wrong, faulty, or malicious, until ' +
                'verified otherwise. There are a variety of ways we might design for this, but one is to take inspiration ' +
                'from more traditional human systems. Typically in systems that require high degrees of accuracy or ' +
                'correctness, we don\'t simply take another person\'s work and use it. Instead we take some action to check that ' +
                'the work has been done correctly before we use it.'
            ),
            h('p', {},
                'In engineering activities it\'s common to review design work and ask questions to verify it. We can adopt a ' +
                'similar approach within our AI OS, and we should ensure we have methodologies in place to limit the impact ' +
                'of any error. One approach is to delete any erroneous response once it is detected, protecting the recipient ' +
                'LLM from being polluted by invalid or unsafe context contents.'
            ),
            h('p', {},
                'This means our AI OS must have a means to review responses and reject them before they can do any harm.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Synchronization and rendezvous capabilities'),
            h('p', {},
                'In conventional operating systems we have a wide variety of synchronization and rendezvous capabilities. These ' +
                'allow us to coordinate actions between multiple processes. An AI OS will need similar capabilities.'
            ),
            h('p', {},
                'We can trivially perform synchronous operations by having one LLM invoke actions on another via a tool call ' +
                'that delegates some action to a child LLM. While powerful, this could leave parent LLMs blocked for a ' +
                'considerable amount of time.'
            ),
            h('p', {},
                'Instead we might think about the need to asynchronously control actions. We might delegate a task and ' +
                'simply be returned a session ID that can be checked later. This might be combined with a sleep/alarm ' +
                'tool that could be used to trigger the checking of multiple outstanding sessions. This, for example, would ' +
                'let us build systems in which multiple agents might be given the same task and where we take the first valid ' +
                'result, cancelling all others.'
            ),
            h('p', {},
                'We might also take inspiration from other designs, so for example we might provide something like a Kanban ' +
                'board (task queue). In this instance, we\'d probably restrict some operations to a parent AI, so perhaps ' +
                'only it could add new tasks, while a child might mark them complete. This sort of approach is much more ' +
                'robust than, say, the ad-hoc use of shared files for the same purpose.'
            ),
            h('p', {},
                'Importantly, though, we want our AIs to be clear which way they should remain synchronized so we need to ' +
                'think very carefully about how specific tools are chosen to be used.'
            )
        ),
        h('section', {},
            h('h3', {}, 'Design tools to do one thing and do it well'),
            h('p', {},
                'When given a confusing set of potential ways to achieve a result, it\'s likely our AIs might become confused ' +
                'about how to go about a task. It turns out, however, that LLMs are already good at working out sequences ' +
                'of steps that can be used that involve multiple steps.'
            ),
            h('p', {},
                'For example, if we ask an LLM "tell me how many minutes ago file <x> was last edited", they will check file ' +
                'metadata, check the date and time, then use a calculator to compute the difference in times. This works ' +
                'because the tools do not have overlapping remits.'
            ),
            h('p', {},
                'In this respect our AI OS probably wants to embrace the ',
                h('a', {
                    href: 'https://en.wikipedia.org/wiki/Unix_philosophy',
                    target: '_blank',
                    rel: 'noopener'
                }, 'Unix philosophy'),
                ' in which each tool does exactly one thing ' +
                'and does it well. This allows operations to be chained together. Fortunately, unlike Unix shells, AIs are ' +
                'able to process quite involved outputs and interpret them as inputs to other tools. This makes the tool ' +
                'chaining far simpler.'
            ),
            h('p', {},
                'This philosophy also applies to error handling. If tools provide very clear information about errors then ' +
                'AIs can interpret that to correct any mistakes. The more clear the errors, the more likely the error ' +
                'recovery is to be automatic.'
            ),
            h('p', {},
                'Such an approach also lends itself to trying to break complex application behaviours into simpler ' +
                'ones that can be composed together. Should the need for higher performance arise then we could always ' +
                'introduce more complex composite tools, but the default should always be for simplicity where we can ' +
                'achieve it.'
            ),
            h('p', {},
                'It is quite likely that we will find AIs are quite adept at helping us break down complex tools into ' +
                'simpler elements. This concept also has the potential to dramatically reduce "application" ' +
                'complexity over time, reducing many applications to sequences of tool uses. This ability to chain ' +
                'tools quickly is something at which AIs excel.'
            )
        ),
        h('section', {},
            h('h3', {}, 'UIs are for people, but AIs must be able to drive them too'),
            h('p', {},
                'While the primary consumers of any user interface (video, audio, and probably others in the future) are ' +
                'human users, we should reflect that we will see the greatest benefits when our AIs are able to drive these ' +
                'UIs too. Much as we want to give them composable components with which to process, we really want them ' +
                'to have composable user interfaces with which to interact with humans.'
            ),
            h('p', {},
                'This is perhaps the greatest challenge, but could yield the most impressive results. In being able to ' +
                'provide information and ideas in many different ways, we will allow our AIs to have multiple options for ' +
                'how they interact with human users.'
            ),
            h('p', {},
                'Key to this will be the same philosophy of simple, composable elements that we imagined for tools.'
            )
        ),
        h('section', {},
            h('h3', {}, 'An AI OS requires thinking more like a manager than an engineer at times'),
            h('p', {},
                'One interesting aspect of building an AI OS is that many of the problems feel more like managing teams ' +
                'of people than managing deterministic processes in a more conventional OS.'
            ),
            h('p', {},
                'In much the same way people require alignment towards a task, teams of AIs require the same ' +
                'coordination to ensure they keep on track. Given unclear, or ambiguous, requirements they will do ' +
                'strange and sometimes byzantine things. If they fail to complete tasks as they should, they sometimes ' +
                'fallback to pretending they did, and we need to "trust but verify".'
            ),
            h('p', {},
                'This does suggest, however, there may be a rich seam of ideas that can be applied from many of the ' +
                'best management practices applied to people.'
            )
        ),
        h('section', {},
            h('h2', {}, 'First steps towards this'),
            h('p', {},
                'If you\'ve made it this far, I\'m guessing you\'re hoping this is more than just a passing fantasy?'
            ),
            h('p', {},
                'I can\'t say all of these things exist yet, but I have an initial prototype that has evolved to include ' +
                'many of these ideas, and a few others.'
            ),
            h('p', {},
                'The platform is called Humbug, it\'s open source, and at the time of writing it has been in development ' +
                'for about 9 months. As of right now I\'m working on v0.22. You can find it on GitHub at ',
                h('a', {
                    href: 'https://github.com/m6r-ai/humbug',
                    target: '_blank',
                    rel: 'noopener'
                }, 'https://github.com/m6r-ai/humbug'),
                '.'
            ),
            h('p', {},
                'In some areas it\'s already making good progress. It already supports many different types of LLMs and ' +
                'can use them independently and concurrently. LLMs can delegate tasks to other LLMs and change the scope ' +
                'of what\'s shared with the child LLMs.'
            ),
            h('p', {},
                'The tools concepts are starting to work well, although some of the application concepts need to be ' +
                'broken down more.'
            ),
            h('p', {},
                'Filesystem permissions are not yet granular enough but I\'m hoping to have that done shortly, the ' +
                'integrations with the UI components aren\'t clean yet, and there are a lot of tools that want to be ' +
                'added. It would be no fun if it was all finished already though would it?'
            ),
            h('p', {},
                'It\'s already demonstrating interesting emergent behaviour. In giving it access to control the UI ' +
                'you will sometimes find the LLMs decide to just open files for you to show you their work. Other ' +
                'times they\'ll open terminals so you can perform tasks they can\'t. I\'ve also seen them fall back ' +
                'to sending files in messages when blocked from writing to the filesystem. This is all very ' +
                'encouraging!'
            ),
            h('p', {},
                'If you want to know more, check out the GitHub repo, or follow the links on the ',
                h('a', {href: '/about'}, 'about'),
                ' page.'
            )
        )
    ];
}

export const blogPost_2025_08_11 = new BlogPost(
    'A path to an AI operating system',
    '2025-08-11',
    '/blog/2025-08-11',
    'Exploring why the AI era requires rethinking operating system design, from managing AI agents as users to new concepts like conversation threads and tool security.',
    null,
    null,
    blogOpening_2025_08_11,
    blogArticle_2025_08_11,
    null
);
