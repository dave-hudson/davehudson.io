import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';
import {CodeFragment} from '../../lib/code-fragments';

function notesOpening_2025_08_18(): VElement[] {
    return [
        h('p', {},
            'More improvements to the mindspace UI styling, solving splitter constraints, and ' +
            'observations about LLM behavior patterns in engineering solutions.'
        )
    ];
}

function notesArticle_2025_08_18(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Improving mindspace styling'),
            h('p', {},
                'A couple of weeks ago I redid all the Qt style sheet handling for the various tabs. I decided to do the same for the ' +
                'mindspace view as that helps keep things consistent.'
            ),
            h('p', {},
                'Mostly this was pretty straightforward, apart from the collapsible header. For some reason this didn\'t auto-style ' +
                'and so was ignoring the style sheet. It required the call to ', h('code', {}, 'setAttribute'), ' in this code fragment to resolve it.'
            ),
            CodeFragment.create({
                language: 'python',
                code: `    super().__init__(parent)
    self.setObjectName("MindspaceCollapsibleHeader")
    self.setAttribute(Qt.WidgetAttribute.WA_StyledBackground, True)
    self._style_manager = StyleManager()`
            }),
            h('p', {},
                'Once resolved, this was another 100 line net reduction in code, for improved functionality!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Splitter problems'),
            h('p', {},
                'One interesting problem I\'d faced was having the splitter view for the mindspace follow some interesting constraints. ' +
                'The challenge was handling the headers associated with the conversations and files views. Left alone, Qt\'s layout engine ' +
                'doesn\'t let you collapse just one widget in a ', h('code', {}, 'QVBoxLayout'), ' when you shrink the vbox smaller than the smaller of the two ' +
                'widgets (the header).'
            ),
            h('p', {},
                'To solve this I had to make the minimum size for an expanded widget more than 2x the size of the header, but ' +
                'if the widget was unexpanded then use a fixed height of the header. This use of a fixed height was necessary to stop the ' +
                'splitter from expanding the size of the header widget - effectively it locks the splitter in place.'
            ),
            h('p', {},
                'This was not something Claude was able to come up with. Claude had suggested 5 or 6 alternative approaches that were a lot ' +
                'more complex, and didn\'t actually work. Just before I came up with this approach it did suggest subclassing the ', h('code', {}, 'QSplitter'), ' ' +
                'class, which would probably have worked but would have been a lot more code.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Changing mindspace click/double-click handling'),
            h('p', {},
                'The current model of single and double clicks doing different things is just deeply confusing. I\'ve removed it. ' +
                'Single clicks now open a file in the default way but with an ephemeral tab. Double clicks now open the same view but ' +
                'with a non-ephemeral tab.'
            ),
            h('p', {},
                'To replace the previous functionality there are now additional context menu items.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Claude "locally" engineering things again'),
            h('p', {},
                'One of the quirks I\'ve seen with some LLMs is a tendency to "locally" engineer solutions to problems. As I used Claude ' +
                'Sonnet 4 the most, I see it most with Claude.'
            ),
            h('p', {},
                'The problem is even if you give an LLM all the context it needs, it will often assume it\'s not seeing everything unless ' +
                'you\'re very clear that you\'ve given it absolutely everything. This sometimes results in strange local optimizations, ' +
                'where the LLM builds new functions rather than modifying other ones that handle a capability already.'
            ),
            h('p', {},
                'I saw another example today where it tried to make a local styling change to a widget even though that widget was clearly ' +
                'styled elsewhere. It then "fixed" this by moving the styling but creating a much more complex series of signals. ' +
                'Third time around (and with some nudging) it did a trivial property update that was a lot smaller than either of the ' +
                'other designs.'
            ),
            h('p', {},
                'This tendency to "fix" problems via locally-optimized solutions eventually makes code unmaintainable, but I\'ve not yet ' +
                'got an approach that stops this other than reviewing and critiquing fixes. I wonder if there\'s an LLM persona that could ' +
                'do this effectively?'
            )
        ),
        h('section', {},
            h('h2', {}, 'Blog post on LLM security issues'),
            h('p', {},
                'This one caught my attention - an interesting read on threats posed by many LLM tools: ',
                h('a', {
                    href: 'https://garymarcus.substack.com/p/llms-coding-agents-security-nightmare',
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }, 'https://garymarcus.substack.com/p/llms-coding-agents-security-nightmare')
            )
        )
    ];
}

export const notesPost_2025_08_18 = new NotesPost(
    '2025-08-18: More mindspace UI work',
    '2025-08-18',
    '/notes/2025-08-18',
    '2025-08-18: More improvements to the mindspace UI styling, solving splitter constraints, and observations about LLM behavior patterns in engineering solutions.',
    null,
    null,
    notesOpening_2025_08_18,
    notesArticle_2025_08_18,
    null
);
