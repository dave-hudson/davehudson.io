import {h, VNode} from '../lib/dvdi';
import {gitHubIcon, linkedInIcon, mailIcon, xIcon} from '../lib/icons';

export function pageFooter(): VNode {
    return h('footer', {className: 'footer'},
        h('div', {className: 'container'},
            h('div', {className: 'copyright'},
                '© 2014-2025 David J. Hudson'
            ),
            h('nav', {className: 'social'},
                h('a', {className: 'icon', href: 'https://x.com/davehudsonio', target: '_blank', title: 'X'},
                    xIcon()
                ),
                h('a', {className: 'icon', href: 'https://linkedin.com/in/davejh', target: '_blank', title: 'LinkedIn'},
                    linkedInIcon()
                ),
                h('a', {className: 'icon', href: 'https://github.com/dave-hudson', target: '_blank', title: 'GitHub'},
                    gitHubIcon()
                ),
                h('a', {
                        className: 'icon',
                        href: 'mailto:hello@davehudson.io?subject=Email\ about\ davehudson.io',
                        title: 'Email'
                    },
                    mailIcon(),
                )
            )
        )
    );
}
