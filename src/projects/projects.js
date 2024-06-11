import { h } from '/lib/dvdi.js';
import { pageHeader, articleTitle, pageFooter } from "/lib/page.js";

export function projectsPage() {
    return h('div', { className: 'container' },
        pageHeader(),
        h('article', { className: 'article' },
            articleTitle('Open source projects', '2024-06-10 21:30'),
            h('p', {},
                'I\'ve been involved in building open source software since the early 90s.  Unfortunately I can\'t find ' +
                'links for some of them, but here are ones for which I do.'
            ),
            h('h2', {}, 'countdown'),
            h('p', {},
                'This one was a programming challenge at r3 to build some software to identify solutions to the "Countdown" ' +
                'numbers game as quickly as possible.  The idea of the game is to take 6 randonly chosen numbers from a set ' +
                'of 24 available numbers (1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 25, 50, 75, 100) and ' +
                'find a way to get to a larger random number in the range of 100 to 999, using only simple addition, ' +
                'subtraction, multiplication, and division.'
            ),
            h('p', {},
                ' I wrote this one in C++ and spent a few hours coming up with ways to shrink the problem search space: ',
                h('a', { href: '' },
                    'https://github.com/dave-hudson/countdown'
                ),
                '.  It\'s pretty quick but I never attempted to tune it to the instruction level!'
            ),
            h('h2', {}, 'c8'),
            h('p', {},
                'c8 is a high performance arbitrary precision natural numbers, integers, and rational numbers library written ' +
                'in "modern" C++.  The git repo is here: ',
                h('a', { href: 'https://github.com/dave-hudson/c8' },
                    'https://github.com/dave-hudson/c8'
                ),
                '.  There\'s also a project wiki here: ',
                h('a', { href: 'https://github.com/dave-hudson/c8/wiki' },
                    'https://github.com/dave-hudson/c8/wiki'
                ),
                '.'
            ),
            h('p', {},
                'When I built this code I also tracked the development journey on the wiki.  This includes all my notes on ' +
                'how I was performance tuning things, down to the machine instruction level in many cases: ',
                h('a', { href: 'https://github.com/dave-hudson/c8/wiki/Dev-Notes' },
                    'https://github.com/dave-hudson/c8/wiki/Dev-Notes'
                )
            ),
            h('h2', {}, 'gcc (Ubicom processor backends)'),
            h('p', {},
                'From 2001 to 2012 I maintained the backends for Ubicom\'s IP2k and Ubicom32 processor family versions of gcc. ' +
                'I no longer have links for the IP2k version, but the 32-bit Ubicom32 version can be found here: ',
                h('a', { href: 'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain' },
                    'https://git.codelinaro.org/clo/external-ubicom/ubicom32-toolchain'),
                '.'
            ),
            h('p', {},
                'The Ubicom32 processor family was very unusual.  All versions were heavily multithreaded (between 8 and 12 ' +
                'threads), executing in a single pipeline.  Threads were interlaced so each instruction could be operating ' +
                'on a separate thread context.  Used carefully this could make things incredibly efficient as most pipeline ' +
                'hazards could be hidden by other threads.  The ISA was also very unusual in that it supported a ' +
                'memory-to-memory architecture where many instructions could include 2 memory references in a single 32-bit ' +
                'RISC instruction.'
            ),
            h('h2', {}, 'Liquorice'),
            h('p', {},
                'Liquorice was a very small operating system and IPv4 network stack, written entirely from scratch.  It was ' +
                'designed to run on 8-bit Atmel AVR and 32-bit x86 processors.'
            ),
            h('p', {},
                'The project ran through much of 2000, but I stopped working on the public version when I joined Ubicom' +
                'at the end of 2000.  The project evolved as a commercial operating system and network stack called ' +
                'ipOS.  While ipOS started out very similar to Liquorice, it quickly diverged as we simplified concepts ' +
                'eliminated the software threading, and implemented much better design patterns to support some of the ' +
                'networking.  Liquorice has some interesting ideas, and is a very small IP stack: ',
                h('a', { href: 'https://github.com/dave-hudson/liquorice' },
                    'https://github.com/dave-hudson/liquorice'
                )
            ),
            h('h2', {}, 'VSTa'),
            h('p', {},
                'VSTa (short for Valencia\'s Simple Tasker) was a self-hosting microkernel operating system build in the ' +
                '1990s.  It had a lot of novel ideas, a simple and elegant kernel, and featured user-space device drivers ' +
                'and filesystems.  Unusually, it also had a kernel debugger so if anythign went wrong it would drop into ' +
                'the debugger instead of just giving a kernel panic message.',
            ),
            h('p', {},
                'It had a services model inspired by Plan 9, and had a largely complete GNU toolchain so it was capable ' +
                'of building itself.  I was largely active in updating libc, porting tools, writing drivers, and performance ' +
                'tuning the kernel form 1993 to 1995'
            ),
            h('p', {},
                'Andy Valencia (the guy behind the project) has an archive of the code and the mailing lists here: ',
                h('a', { href: 'https://sources.vsta.org:7100/vsta/index' },
                    'https://sources.vsta.org:7100/vsta/index')
            ),
            h('h2', {}, 'mkdosfs (Linux)'),
            h('p', {},
                'I wrote the first 2 versions of mkdosfs back in 1993 and 1994.  Eventually other maintainers folded this ' +
                'into the dosfstools repo, and can be found here (my original notes are in the change logs): ',
                h('a', { href: 'https://github.com/dosfstools/dosfstools' },
                    'https://github.com/dosfstools/dosfstools')
            )
        ),
        pageFooter()
    );
}
