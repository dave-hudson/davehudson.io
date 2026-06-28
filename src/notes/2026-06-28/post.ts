import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_28(): VElement[] {
    return [
        h('p', {},
            'I don\'t normally release new versions so quickly, but v51 has some important bug fixes.  It also has a ton of code quality ' +
            'improvements that will hopefully limit code style regressions in the future.'
        )
    ];
}

function notesArticle_2026_06_28(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Style consistency'),
            h('p', {},
                '20 years ago I worked on a codebase where we had strong automated checking of many things.  Fast forward to now and it has ' +
                'never been easier to build custom linting tools that will do the same.  Humbug now has a ', h('code', {}, 'style_checker'),
                ' tool that enforces code styling and Python implementation specifics.  It\'s implemented as a ', h('code', {}, 'pylint'),
                ' extension.'
            ),
            h('p', {},
                'Armed with this tool I was also able to build a throw-away script that fixed the 1000+ issues flagged by the new linter.  20 ' +
                'years ago this would have taken many engineers weeks to do the same!'
            )
        ),
        h('section', {},
            h('h2', {}, 'Farewell aiohttp'),
            h('p', {},
                'aiohttp has been a core dependency since Humbug started, one of only 4 such dependencies outside of the Python standard library. ' +
                'Today I replaced this with a custom HTTP client.'
            ),
            h('p', {},
                'I have slightly mixed feelings about this as aiohttp has been very useful, but the new approach is much more in keeping ' +
                'with Humbug\'s implementation philosophy.  It also offers scope for more HTTP client tools in the future.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Humbug v51'),
            h('p', {},
                h('strong', {}, 'New features:')
            ),
            h('ul', {},
                h('li', {},
                    'Added feature to close all tabs in a column from the tab label context menu.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Bug fixes:')
            ),
            h('ul', {},
                h('li', {},
                    'Resolved a problem with image previews on Windows.'
                ),
                h('li', {},
                    'Resolved a problem with the sidebar breadcrumb folders now always unlatching a folder correctly.'
                ),
                h('li', {},
                    'Resolved a problem where bullet lists were not always correctly extracted from docx files.'
                ),
                h('li', {},
                    'Resolved a problem in the generation of Markdown code blocks from docx files.'
                ),
                h('li', {},
                    'Resolved a problem with hyperlinks when converting docx files to Markdown.'
                ),
                h('li', {},
                    'Resolved a performance issue with scrolling Markdown documents that contain images.'
                ),
                h('li', {},
                    'Resolved a problem with column splitters not moving correctly.'
                )
            ),
            h('p', {},
                h('strong', {}, 'Internal structure changes:')
            ),
            h('ul', {},
                h('li', {},
                    'Removed aiohttp and replaced it with a new built-in HTTP client.'
                ),
                h('li', {},
                    'Added ', h('code', {}, 'style_checker'), ' to augment ', h('code', {}, 'pylint'), ' with Humbug style checking.'
                ),
                h('li', {},
                    'Extended ', h('code', {}, 'mypy'), ' and ', h('code', {}, 'pylint'), ' checking to the ', h('code', {}, 'tools'), ' directory.'
                ),
                h('li', {},
                    'Updated code to use modern type hinting for Python (e.g. ', h('code', {}, 'list'), ', not ', h('code', {}, 'List'),
                    ', ', h('code', {}, 'tuple'), ' not ', h('code', {}, 'Tuple'), ', and ', h('code', {}, 'type1 | type2'), ' not ',
                    h('code', {}, 'Union[type1, type2]'), ').'
                ),
                h('li', {},
                    'Reduced logging level for ', h('code', {}, 'qasync'), ' to info, from debug to reduce noise in log files.'
                )
            )
        )
    ];
}

export const notesPost_2026_06_28 = new NotesPost(
    '2026-06-28: Humbug v51',
    '2026-06-28',
    '/notes/2026-06-28',
    '2026-06-28: Humbug v51 - Important bug fixes, code quality improvements with a new style_checker pylint extension, and aiohttp replaced with a custom HTTP client.',
    null,
    null,
    notesOpening_2026_06_28,
    notesArticle_2026_06_28,
    null
);