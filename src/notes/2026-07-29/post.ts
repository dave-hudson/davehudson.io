import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_07_29(): VElement[] {
    return [
        h('p', {},
            'Over the last couple of weeks I\'ve added ',
            h('code', {}, 'bytes'),
            ' and improved ',
            h('code', {}, 'struct'),
            ' handling in Menai so it\'s time to make this available as a stand-alone package.'
        )
    ];
}

function notesArticle_2026_07_29(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Stand-alone Menai'),
            h('p', {},
                'Menai started out as a language to embed inside an AI environment, but its origins go back about 12 years when I was first ' +
                'working with blockchains.  At that time I also wanted an efficient, pure functional language that I could use for smart contract ' +
                'programming.  Since then I\'ve had several other occasions where the same concept would have been useful.'
            ),
            h('p', {},
                'Until the last few days Menai has only been available inside Humbug, but I\'ve now separated it out into a sibling package.'
            ),
            h('p', {},
                'Along with the compiler and VM runtime, I\'ve also separated out all the CLI tools and tests so Menai can be used easily in ' +
                'other projects.'
            ),
            h('p', {},
                'As Menai is implemented in Python, it made sense to publish Menai to PyPI, and also to set up the dev environment so all the ' +
                'binary builds of the VM are packaged correctly too.  These all now build and install via GitHub actions.'
            ),
            h('p', {},
                'With Menai now set up as a stand-alone package, I was also able to simplify Humbug\'s build system to use this instead of ' +
                'doing more complex build steps.'
            )
        )
    ];
}

export const notesPost_2026_07_29 = new NotesPost(
    '2026-07-29: Stand-alone Menai',
    '2026-07-29',
    '/notes/2026-07-29',
    '2026-07-29: Stand-alone Menai - Separating Menai into a stand-alone package, published to PyPI with binary VM builds via GitHub Actions.',
    null,
    null,
    notesOpening_2026_07_29,
    notesArticle_2026_07_29,
    null
);