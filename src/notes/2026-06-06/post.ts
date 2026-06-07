import {h, VElement} from '../../lib/dvdi';
import {NotesPost} from '../NotesPost';

function notesOpening_2026_06_06(): VElement[] {
    return [
        h('p', {},
            'The last day and a half have brought a lot of interesting ideas into play.  These are a major focus for Humbug v49.'
        )
    ];
}

function notesArticle_2026_06_06(): VElement[] {
    return [
        h('section', {},
            h('h2', {}, 'Document processing'),
            h('p', {},
                'I used Humbug for a lot of things, but increasingly I\'m using it to review documents.  A lot of features have been added in the ' +
                'last couple of months to make this easier.'
            ),
            h('p', {},
                'Markdown has been a fundamental element of the design since its inception, but while this is great for engineers, it\'s less ' +
                'great for the rest of the world.  Most of the world\'s docs are either PDF or DOCX (Microsoft Word).'
            ),
            h('p', {},
                'PDF will have to wait, but DOCX and Markdown have a lot of similar features so I built a document intermediate representation ' +
                '(\u0060document_ir\u0060) and converters both to and from both DOCX and Markdown.  There are stand-alone conversion tools in the tools ' +
                'directory but more importantly there\'s now a new AI tool, \u0060document_convert_ai_tool\u0060 that will let an AI do this for you.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Gemma 4 QAT'),
            h('p', {},
                'Google always do really interesting things.  This caught my eye today because I\'ve long wanted a very capable local model that ' +
                'can be an always-on companion within Humbug while more capable cloud models will be introduced as needed.'
            ),
            h('p', {},
                h('a', {href: 'https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/'},
                    'https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/'
                )
            ),
            h('p', {},
                'I will experiment with this some more in the future.'
            )
        ),
        h('section', {},
            h('h2', {}, 'Signs of interesting things'),
            h('p', {},
                'A couple of days ago I added support for the AI to use a Menai program to edit files or editor buffers.  This felt like it would ' +
                'be a really useful feature but I\'ve not actually seen it used.  Today I have seen it used when the AI couldn\'t work out how ' +
                'to handle a character escaping problem.'
            ),
            h('p', {},
                'Previously it would have always tried to do this with \u0060sed\u0060 or by writing a python script!'
            )
        )
    ];
}

export const notesPost_2026_06_06 = new NotesPost(
    '2026-06-06: Code, lots of code...',
    '2026-06-06',
    '/notes/2026-06-06',
    '2026-06-06: Code, lots of code... - Document processing, Gemma 4 QAT, and Claude using Menai in an interesting way.',
    null,
    null,
    notesOpening_2026_06_06,
    notesArticle_2026_06_06,
    null
);
