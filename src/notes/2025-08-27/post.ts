import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2025_08_27(): VElement[] {
    return [
        h('p', {},
            'Implementing sleep and alarm capabilities for LLMs to enable better time management and asynchronous operations. ' +
            'Also includes improvements to AI delegation rules to prevent cascading delegations.'
        )
    ];
}

function notesArticle_2025_08_27(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Making better use of time (clock)'),
            h('p', {},
                'In most operating systems, we have an ability to sleep for a duration, or to set an alarm that will go off at some ' +
                'particular time. These are very useful operations because they allow us to defer some operation until later.'
            ),
            h('p', {},
                'For example, we might start an operation that we need to periodically poll to see if it has ' +
                'finished or not, or we might want to trigger some action at a specific time of day.'
            ),
            h('p', {},
                'With LLMs we have a more complicated arrangement than in, say, a Unix process. With Unix we can use mechanisms such ' +
                'as ', h('code', {}, 'select'), ' or we can have alarm signals, but this doesn\'t fit with the way LLMs interact with tools. This is for good ' +
                'reason!'
            ),
            h('p', {},
                'For example, there\'s no easy way to "interrupt" an LLM in the same way we might do with a Unix process because we have ' +
                'no way to know what the state of the conversation will be when the interrupt occurs.'
            ),
            h('p', {},
                'Many LLMs do have an ability to launch parallel tool calls which enables a level of parallelism, but these require the ' +
                'LLM to block until all tools have finished so the results can be put back into the conversation context.'
            ),
            h('p', {},
                'So how might we solve for this? The approach I\'ve just implemented is to allow the LLM to sleep for a duration or set ' +
                'an alarm where the LLM sleeps until the alarm triggers:'
            ),
            h('ul', {},
                h('li', {}, 'Sleep allows the LLM to schedule sleeping for a number of seconds, making this easy to set up for polling events.'),
                h('li', {}, 'Alarm allows the LLM to schedule the next action in a conversation to occur at a specific time.')
            ),
            h('p', {},
                'Technically both of these do pretty-much the same things, but the interfaces are slightly different.'
            ),
            h('p', {}, 'Ok, but so what?'),
            h('p', {},
                'If we can now schedule a wakeup, we can now also start to think about asynchronous tool calls! The idea is we can trigger ' +
                'many parallel tool calls, but return immediately, even though the tool use hasn\'t actually finished. The LLM can use the ' +
                'sleep capability to wait for a short while, and then check the status of the tool calls. The LLM can then decide what to ' +
                'do about each individual tool call, including discarding one or more of them.'
            ),
            h('p', {},
                'For example, an LLM might launch 5 identical tasks knowing it needs 3 from 5 to complete correctly. In our purely ' +
                'synchronous model we have to wait for all 5 tool calls to complete, but in our new model we can wait until we see the first ' +
                'three respond and be in agreement. If the first three agree we can ignore the fourth and fifth and carry on processing.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Implementing the new operations'),
            h('p', {},
                'I was originally going to build a new tool for these new operations, but it occurred to me these are both clock operations. ' +
                'We already had a clock tool, so I updated that.'
            ),
            h('p', {},
                'While I was at it I removed the confusing "human" time format - we just have ISO times and Unix timestamps. These are ' +
                'far less ambiguous and LLMs handle both just fine!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Tightening the AI delegation rules (again)'),
            h('p', {},
                'I caught Claude not telling a child AI that it was a child so we got a cascade of delegations. Clearly my instruction ' +
                'tightening the other day wasn\'t quite strong enough, so made this much more explicit this time!'
            )
        )
    ];
}

export const notesPost_2025_08_27 = new NotesPost(
    '2025-08-27: Making better use of time within LLM conversations',
    '2025-08-27',
    '/notes/2025-08-27',
    'Implementing sleep and alarm capabilities for LLMs to enable better time management and asynchronous operations. Also includes improvements to AI delegation rules to prevent cascading delegations.',
    null,
    null,
    notesOpening_2025_08_27,
    notesArticle_2025_08_27,
    null
);
