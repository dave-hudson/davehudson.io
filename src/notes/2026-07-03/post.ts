import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_07_03(): VElement[] {
    return [
        h('p', {},
            'I\'ve been wanting binary installs for MacOS, Windows, and Linux for a long time.  As of v52 I now have them for all three!'
        )
    ];
}

function notesArticle_2026_07_03(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Humbug v52'),
            h('p', {},
                'Humbug v52 has a couple of new syntax highlighters, a couple of small features and fixes, but finally delivers binary builds ' +
                'via GitHub Actions.'
            ),
            h('p', {},
                'There are a few highlights:'
            ),
            h('ul', {},
                h('li', {},
                    'Linux builds are now supported alongside MacOS and Windows.'
                ),
                h('li', {},
                    'The Menai VM is now only available in C, with the Python version having been retired (this will make future maintenance much ' +
                    'easier).  To allow for building Humbug on systems without the right compilers, however, we now build 25 different versions ' +
                    'of the binary library and have a script to fetch the correct one.'
                ),
                h('li', {},
                    'Application binary installers are now built for Linux (x86 and ARM64), MacOS (ARM64 and x86), and Windows (x86).'
                )
            ),
            h('p', {},
                'It\'s now finally possible to use Humbug on platforms other than Macs with Apple silicon without needing to downloads source code.'
            ),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'AI messages that contain no content (previously displayed as "...") are now suppressed.'
                ),
                h('li', {},
                    'Removed the ', h('code', {}, 'trace'), ' special form from Menai.  It was an interesting idea a few months ago but didn\'t turn out ' +
                    'to be that useful in practice.'
                ),
                h('li', {},
                    'Set up GitHub actions to build binaries for the Menai VM and added a script to fetch these instead ' +
                    'of needing to compile them locally.'
                ),
                h('li', {},
                    'Removed the legacy Python implementation fo the Menai VM.  The C version is now definitive on all platforms, with binaries ' +
                    'available from GitHub.'
                ),
                h('li', {},
                    'Added Linux binary app build scripts.'
                ),
                h('li', {},
                    'Set up GitHub actions to build binaries for MacOS, Windows, and Linux.'
                ),
                h('li', {},
                    'Added YAML and TOML syntax highlighters.'
                ),
                h('li', {},
                    'Added Claude Sonnet 5 and Claude Fable 5.  Removed Claude Opus 4.7.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'On moving a token usage tab the provider stats retain their expansion state.'
                )
            )
        )
    ];
}

export const notesPost_2026_07_03 = new NotesPost(
    '2026-07-03: Humbug v52',
    '2026-07-03',
    '/notes/2026-07-03',
    '2026-07-03: Humbug v52 - Binary builds for MacOS, Windows, and Linux via GitHub Actions, new syntax highlighters, and bug fixes.',
    null,
    null,
    notesOpening_2026_07_03,
    notesArticle_2026_07_03,
    null
);