import { h, VNode } from '../lib/dvdi';

/**
 * Creates the davehudson.io logo as a text-based component
 * 
 * @returns A VNode representing the site logo
 */
export function daveHudsonLogo(): VNode {
    return h('span', { className: 'logo-text' }, 'davehudson.io');
}
