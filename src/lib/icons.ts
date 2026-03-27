/*
 * MIT License
 *
 * Copyright (c) 2017 Carmelo Pullara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {svg, VNode} from './dvdi';

export function chevronLeftIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('polyline', {points: '15 18 9 12 15 6'})
    );
}

export function chevronRightIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('polyline', {points: '9 18 15 12 9 6'})
    );
}

export function gitHubIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('path', {
                d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 ' +
                '20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 ' +
                '0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'
            }
        )
    );
}

export function linkedInIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('path', {d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'}),
        svg('rect', {x: 2, y: 9, width: 4, height: 12}),
        svg('circle', {cx: 4, cy: 4, r: 2})
    );
}

export function mailIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('path', {d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'}),
        svg('polyline', {points: '22,6 12,13 2,6'})
    );
}

export function moonIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('path', {d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'})
    );
}

export function sunIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('circle', {cx: 12, cy: 12, r: 5}),
        svg('line', {x1: 12, y1: 1, x2: 12, y2: 3}),
        svg('line', {x1: 12, y1: 21, x2: 12, y2: 23}),
        svg('line', {x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64}),
        svg('line', {x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78}),
        svg('line', {x1: 1, y1: 12, x2: 3, y2: 12}),
        svg('line', {x1: 21, y1: 12, x2: 23, y2: 12}),
        svg('line', {x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36}),
        svg('line', {x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22})
    );
}

export function xIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
        },
        svg('polygon', {points: '21.3,21.1 9.9,2.9 2.7,2.9 14.1,21.1'}),
        svg('line', {x1: 2.7, y1: 21.1, x2: 9.9, y2: 14.5}),
        svg('line', {x1: 14.1, y1: 9.5, x2: 21.3, y2: 2.9})
    );
}

export function discordIcon(): VNode {
    return svg('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: 24,
            height: 24,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2
        },
        svg('path', {
            d: 'M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 ' +
                '0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 ' +
                '0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 ' +
                '2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 ' +
                '0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 ' +
                '3.44 1.57 7.15 1.57 10.55 0a.06.06 0 0 1 ' +
                '.07.01c.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 ' +
                '1.19 1.07 1.74.03.02.06.03.09.02 1.72-.53 3.45-1.33 ' +
                '5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 ' +
                '13.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 ' +
                '2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 ' +
                '2.12-1.89 2.12z'
        })
    );
}
