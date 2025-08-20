import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2025_08_20(): VElement[] {
    return [
        h('p', {},
            'Humbug v0.22 release notes covering model changes, UI improvements, delegate_ai tool enhancements, and various bug fixes.'
        )
    ];
}

function notesArticle_2025_08_20(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving the `delegate_ai` tool'),
            h('p', {},
                'One of the more interesting problems of the last month has been making the ', h('code', {}, 'delegate_ai'), ' tool work better. The tool ' +
                'definition has gone through a number of subtle evolutions'
            ),
            h('p', {},
                'This morning I realized I\'d made a fairly obvious (in hindsight) mistake! I had assumed that an child AI ' +
                'instance would "just know" it had been spawned by a parent AI, but of course it didn\'t because the parent didn\'t tell ' +
                'it most of the time (although sometimes it did). In most cases, the child assumed it was conversing with a human. This ' +
                'was leading to strange problems such as the child spawning another child, or creating files assuming a human was ' +
                'watching for them.'
            ),
            h('p', {},
                'Here\'s what the description has now evolved into:'
            ),
            CodeFragment.create({
                language: 'python',
                code: `    description=(
        "The delegate_ai tool lets you (the parent AI) delegate cognitive tasks to other specialized child AI instances "
        "by creating a focused AI conversation for a specified task. The delegated AI has access to the same tools as "
        "you and can engage in multi-turn collaboration with you if you provide it with a session_id returned from a "
        "previous delegated conversation. Each call creates a temporary UI tab that closes after the response is "
        "returned.\\n"
        "Delegation is useful for many reasons, such as:\\n,"
        "- To use AI capabilities from a different model, or with different settings\\n"
        "- To parallelize problem solving (you must use parallel tool/function calls to do this)\\n"
        "- To seek analysis from a different perspective (you must provide the perspective in the task_prompt)\\n"
        "- To use a subset of your current conversation context for more focused reasoning\\n"
        "- To process a lot of context/tokens where you don't need all the context in your main conversation\\n"
        "- To explore multiple approaches to a problem before converging on a solution in your main conversation\\n"
        "- To give you a sounding board for ideas or to brainstorm with a different AI\\n"
        "Important:\\n"
        "- Do not use this tool if you would simply be giving the child AI the same task and with no significant "
        "differences in context or requirements\\n"
        "- The child AI does not have access to any different tools to the ones you have\\n"
        "- You must use the session_id parameter to continue a previous conversation\\n"
        "- You must generate the task_prompt and that can be very expensive if you need to provide a lot of "
        "context in it. If you need to provide something that is already in the filesystem, tell the "
        "delegated AI where to read it and do not provide the contents in the task_prompt. If the content is not "
        "already in the filesystem, you must provide it in the task_prompt. You must also tell the child AI that it "
        "is a child AI instance that has been tasked using the delegate_ai tool. You must also tell the child AI that "
        "if it creates any files, it must inform you (the parent AI) about them.\\n"
        "- You have the option to provide your current conversation context to a new child AI instance. This is very "
        "useful if your context has a lot of information that is relevant to the task, but this can also limit the "
        "amount of new context the child AI can process."
        "Returns: the delegated AI's response to the task_prompt, or an error message if the operation fails"
    ),`
            }),
            h('p', {},
                'I\'m reminded of one of my favourite YouTube videos on the subject of precise instructions!'
            ),
            h('figure', {},
                h('div', {
                        style: 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;'
                    },
                    h('iframe', {
                        src: 'https://www.youtube.com/embed/FN2RM-CHkuI',
                        style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;',
                        width: 560,
                        height: 315,
                        title: 'Peanut butter and jelly sandwich making instructions',
                        'aria-label': 'YouTube video: Peanut butter and jelly sandwich making instructions'
                    })
                ),
                h('figcaption', {}, 'Peanut butter and jelly sandwich making instructions')
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v0.22'),
            h('p', {},
                'I\'ve just finished v0.22 of Humbug. As with a few of the more recent releases, this one has quite a mixed set of changes.'
            ),
            h('h3', {}, 'Model changes'),
            h('p', {},
                'Let\'s start with the model changes:'
            ),
            h('ul', {},
                h('li', {}, 'Removed GPT-4.5 as that was super-expensive and is deprecated'),
                h('li', {}, 'Added GPT-5, as that\'s now the main model from OpenAI (love it or hate it)'),
                h('li', {}, 'Removed the M6R backend - it was used for local testing but no longer serves and useful purpose'),
                h('li', {}, 'Added GPT-OSS 20b and 120b, and added support for ollama.com\'s Turbo instances of both (they\'re very fast!)'),
                h('li', {}, 'Added Z.ai\'s GLM-4.5 models')
            ),
            h('h3', {}, 'UI changes'),
            h('p', {},
                'The UI got a significant update, with more due soon. The mindspace tree on the left of the screen is now split into ' +
                'a conversations view and a files view. The conversations view will be updated in future releases, and this new approach ' +
                'prevents the files view from constantly opening the ', h('code', {}, 'conversations'), ' folder.'
            ),
            h('p', {},
                'While I was making this change I also cleaned up the click, double-click, and drag & drop behaviours. This is based on ' +
                'some UX feedback and on the importance of making click and double-click do similar things. Wiki views are now available ' +
                'from the context menu but aren\'t the default, since no files would naturally default to a wiki view being their primary ' +
                'interaction.'
            ),
            h('h3', {}, 'delegate_ai tool changes'),
            h('p', {},
                'The ', h('code', {}, 'delegate_ai'), ' tool has a revised description. This should make it much more effective and avoid some weird problems ' +
                'where one child AI would often spawn another.'
            ),
            h('h3', {}, 'Bug fixes'),
            h('p', {},
                'A lot of bugs were fixed, and performance was improved again. There were some interesting lessons learned and they\'re in ' +
                'the ', h('a', {href: 'https://davehudson.io/notes'}, 'Notes'), '.'
            ),
            h('h3', {}, 'Internals improvements'),
            h('p', {},
                'I modified more of the internals of the system to expose capabilities that could be used in other applications. The main ' +
                'change was in the handling of AI conversation transcripts, with that code now having much cleaner APIs.'
            ),
            h('p', {},
                'I\'m anticipating more of this in the future. I would like to add more of an inversion of control so backend events can ' +
                'trigger frontend updates rather than requiring tight coupling with the frontend.'
            )
        )
    ];
}

export const notesPost_2025_08_20 = new NotesPost(
    '2025-08-20: Humbug v0.22',
    '2025-08-20',
    '/notes/2025-08-20',
    '2025-08-20: Humbug v0.22 release notes covering model changes, UI improvements, delegate_ai tool enhancements, and various bug fixes.',
    null,
    null,
    notesOpening_2025_08_20,
    notesArticle_2025_08_20,
    null
);
