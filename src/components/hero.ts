import { h, VNode } from '../lib/dvdi';

/**
 * Interface for hero component properties
 */
export interface HeroProps {
    title: string;
    subtitle?: string;
    className?: string;
}

/**
 * Creates a hero component for page headers with consistent styling
 * 
 * @param props - The properties for the hero component
 * @returns A VNode representing the hero section
 */
export function hero(props: HeroProps): VNode {
    return h('header', { className: `hero ${props.className || ''}` },
        h('div', { className: 'container' },
            h('h1', {}, props.title),
            props.subtitle ? h('p', {}, props.subtitle) : h('span', { style: 'display: none;' })
        )
    );
}
