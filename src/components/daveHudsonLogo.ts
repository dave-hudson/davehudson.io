import { h, VNode } from '../lib/dvdi';

/**
 * Creates the davehudson.io logo using the site icon
 *
 * @returns A VNode representing the site logo
 */
export function daveHudsonLogo(): VNode {
    return h('div', { className: 'logo-component' },
        h('img', {
            className: 'logo-icon',
            src: '/icons/android-chrome-192x192.png',
            alt: 'davehudson.io',
            width: '64',
            height: '64'
        })
    );
}
