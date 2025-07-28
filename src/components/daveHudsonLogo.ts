import { h, VNode } from '../lib/dvdi';

/**
 * Creates the davehudson.io logo as a proper logo component
 *
 * @returns A VNode representing the site logo
 */
export function daveHudsonLogo(): VNode {
    return h('div', { className: 'logo-component' },
        h('span', { className: 'logo-text' }, 'davehudson.io')
    );
}
