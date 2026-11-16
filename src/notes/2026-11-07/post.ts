import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_11_07(): VElement[] {
    return [
        h('p', {},
            'Humbug v59 is now available.'
        )
    ];
}

function notesArticle_2026_11_07(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Menai v59'),
            h('p', {},
                'Humbug v59 is ready.  There are a lot of usability improvements, and for the first time we have an ',
                'auto mode where we can bulk approve filesystem writes within a message turn (this can last a long ',
                'time).  We also have file journaling across the whole mindspace allowing things to be undone if ',
                'they go wrong.'
            ),
            h('h3', {}, 'New features'),
            h('ul', {},
                h('li', {},
                    'Added a change journal: every file mutation made through Humbug, by the AI or by the user, ',
                    'records the content it replaced so the change can be reversed.'
                ),
                h('li', {},
                    'Added a Changes panel listing recent mutations, showing which files changed and how far back ',
                    'the record reaches.  A change can be reverted individually, or the mindspace restored to the ',
                    'state it held at any listed change by reverting everything recorded after it, and a replaced ',
                    'version can be viewed read-only or compared with the file as it now stands.'
                ),
                h('li', {},
                    'Deleting a file or an empty folder from the Files, Preview or VCS panel now records its ',
                    'content in the change journal first, so the deletion can be reverted from the Changes panel ',
                    'instead of being permanent.  The trash is now only for deleted conversations, which the ',
                    'journal cannot cover because their transcripts live under ',
                    h('code', {}, '.humbug'),
                    '.  Emptying the trash no longer destroys a deleted file; forgetting the journalled history ',
                    'does.'
                ),
                h('li', {},
                    'Journalled history can be forgotten from the Changes panel, up to and including any listed ',
                    'change or in its entirety, and the panel reports what it reclaimed.'
                ),
                h('li', {},
                    'A file dragged from a sidebar panel onto a conversation\'s input box is now attached to the ',
                    'message being composed, instead of opening in a tab as a drop anywhere else in the tab area ',
                    'does.  The input highlights its border while the file is over it.'
                ),
                h('li', {},
                    'A file change in your mindspace can now be approved for the rest of the current turn: the ',
                    'approval prompt offers "Auto-approve file changes until your next message", and the AI then ',
                    'works through a long task without stopping for each write.  Only changes the change journal ',
                    'records are covered, so terminal commands, network requests and anything outside the ',
                    'mindspace still ask every time, and sending a message takes the approval back.  Every change ',
                    'made under it is logged as before, and the log records that a standing approval resolved it.'
                ),
                h('li', {},
                    'Improved the rendering of the mindspace VCS entries so they aren\'t as wide horizontally.'
                ),
                h('li', {},
                    'As we now have journalling, filesystem writes within a single conversation turn can now be ',
                    'set to auto-approve on the first approval call.'
                ),
                h('li', {},
                    'The filesystem tool no longer refuses a file because of its size where the content is not ',
                    'held in memory.  A range of lines can be read from a file of any size, a search streams each ',
                    'file and lists the ones it could not read as text under ',
                    h('code', {}, 'skipped'),
                    ' with the reason, and copying a file has no size limit.  ',
                    h('code', {}, 'analyse_file'),
                    ' gains ',
                    h('code', {}, 'offset'),
                    ' and ',
                    h('code', {}, 'length'),
                    ' for binary files, so a range of bytes can be analysed from a file larger than the limit.  ',
                    'The 64KB limit on what enters the conversation is unchanged, and an operation that does hold ',
                    'a file whole now says that is why it refused it.'
                )
            ),
            h('h3', {}, 'Bug fixes'),
            h('ul', {},
                h('li', {},
                    'Editing one of your previous messages now loads the files attached to it into the input box, ',
                    'as chips you can detach before submitting.  Previously the box showed the text alone and the ',
                    'files were lost from the revised message.'
                ),
                h('li', {},
                    'Fixed issues with various sidebar panels not scaling correctly with zoom size.'
                ),
                h('li', {},
                    'All filesystem read operations now protect against polluting the context window.'
                )
            ),
            h('h3', {}, 'Internal structure changes'),
            h('ul', {},
                h('li', {},
                    'Conversations gained an identifier that lives in the transcript and survives renaming, ',
                    'duplicating and moving, so activity attributed to a conversation stays attributed to it.  A ',
                    'duplicated conversation receives a new identifier and records the conversation it came from.  ',
                    'See ADR-0019.'
                ),
                h('li', {},
                    'An authorization request now states what it would change, and the approval policy decides ',
                    'whether a standing approval can resolve it.  The classification is the journal\'s own scope ',
                    'rule, so a change no journal entry could cover is never approved on the user\'s behalf.  See ',
                    'ADR-0022.'
                ),
                h('li', {},
                    'Downloading a file over HTTP now records the file it replaces in the change journal, like ',
                    'every other write inside the mindspace, instead of leaving the change to be reported after ',
                    'the fact as unattributed.'
                ),
                h('li', {},
                    'A journal entry now records whether a path is a directory after the mutation as well as ',
                    'before it, so a creation can be described and reversed.  Creating a folder, and moving an ',
                    'empty one, are therefore recorded, reversible and covered by the standing approval, which ',
                    'they were not before.  See ADR-0023.'
                ),
                h('li', {},
                    'Writing git output to a file, and the image folder a document conversion writes beside its ',
                    'output, are now recorded in the change journal.  Both were writers the journal missed: a git ',
                    'diff written to a file appeared in the changes list as a change nothing had made, and ',
                    'reversing a conversion left its images behind.'
                )
            )
        )
    ];
}

export const notesPost_2026_11_07 = new NotesPost(
    '2026-11-07: Humbug v59',
    '2026-11-07',
    '/notes/2026-11-07',
    '2026-11-07: Humbug v59 - a change journal that makes every file mutation reversible, a Changes panel, auto-approve for filesystem writes within a turn, drag-to-attach files in the conversation input, and a filesystem tool that no longer refuses large files.',
    null,
    null,
    notesOpening_2026_11_07,
    notesArticle_2026_11_07,
    null
);
