import { h, VNode } from '../../lib/dvdi';
import { BlogPost } from '../BlogPost';
import { highlight, TypeScriptLexer } from '../../lib/Lexer';

function blogOpening_2024_07_15_0800(): VNode[] {
    return [
        h('p', {},
            'In many years of writing software, I\'ve written a lot of software to help me build other software.  Having ' +
            'code generators, interpreters, and compilers take the toil out of programming is a great way to be more ' +
            'productive.  There\'s a tradeoff, however.  It only makes sense to invest in building and improving these tools ' +
            'if the effort required to build them saves more they cost.  When that cost is high then we had better be solving ' +
            'a worthwhile problem!'
        ),
        h('p', {},
            'A few months ago I decided to experiment with generative AI (ChatGPT mainly) to see just how far it can shift ' +
            'that effort/reward balance.  Here\'s the story of a few hours spent understanding some of what\'s already ' +
            'possible.'
        )
    ]
}

function blogArticle_2024_07_15_0800(): VNode[] {
const blogCode = '// app.ts\n' +
'document.getElementById(\'fileInput\')?.addEventListener(\'change\', handleFileSelect, false); kdfj\n' +
'\n' +
'function handleFileSelect(event: Event) {\n' +
'    const input = event.target as HTMLInputElement;\n' +
'    if (!input.files?.length) {\n' +
'        console.error(\'No file selected\');\n' +
'        return;\n' +
'    }\n' +
'\n' +
'    const file = input.files[0];\n' +
'    readFile(file);\n' +
'}\n' +
'\n';

    return [
        h('section', {},
            h('h2', {}, 'Blah'),
            h('pre', {},
                h('code', {},
                    ...highlight(blogCode, TypeScriptLexer)
                )
            )
        ),
    ];
}

export const blogPost_2024_07_15_0800 = new BlogPost(
    'Can my tools build tools?  Pre-rendering with ChatGPT',
    '2024-07-13T16:08',
    '/blog/2024-07-13-1608',
    'ChatGPT 4o is pretty amazing, but how good is it at building non-trivial software?' +
    'Here\'s how it did when I had it help build a website pre-rendering tool',
    null,
    null,
    blogOpening_2024_07_15_0800,
    blogArticle_2024_07_15_0800,
    null
);
