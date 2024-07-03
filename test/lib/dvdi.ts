import { jest } from '@jest/globals';

import {
    VElement,
    assertIsVElement,
    isVElement,
    VNode,
    assertIsVNode,
    VText,
    assertIsVText,
    isVText,
    updateElement,
    h,
    svg
} from '../../src/lib/dvdi';

describe('VNode Class and sub-classes', () => {
    test('constructor initializes properties correctly', () => {
        const vNode = new VElement('html', 'div', { id: 'test' }, []);
        expect(vNode.type).toBe('div');
        expect(vNode.attrs).toEqual({ id: 'test' });
        expect(vNode.childNodes).toEqual([]);
    });

    test('appendChild adds a child VNode', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const child = new VElement('html', 'span', {}, []);
        vNode.appendChild(child);
        expect(vNode.childNodes).toContain(child);
        expect(child.parentVNode).toBe(vNode);
    });

    test('appendChild adds a string child VNode', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const child = new VText('fred');
        vNode.appendChild(child);
        expect(vNode.childNodes).toContain(child);
    });

    test('removeChild removes a child VNode', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const child = new VElement('html', 'span', {}, []);
        vNode.appendChild(child);
        vNode.removeChild(child);
        expect(vNode.childNodes).not.toContain(child);
        expect(child.parentVNode).toBeNull();
    });

    test('removeChild removes a string child VNode', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const child = new VText('fred');
        vNode.appendChild(child);
        vNode.removeChild(child);
        expect(vNode.childNodes).not.toContain(child);
    });

    test('replaceChild replaces an old child VNode with a new one', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const oldChild = new VElement('html', 'span', {}, []);
        const newChild = new VElement('html', 'p', {}, []);
        vNode.appendChild(oldChild);
        vNode.replaceChild(newChild, oldChild);
        expect(vNode.childNodes).not.toContain(oldChild);
        expect(vNode.childNodes).toContain(newChild);
        expect(newChild.parentVNode).toBe(vNode);
        expect(oldChild.parentVNode).toBeNull();
    });

    test('replaceChild replaces an old string child VNode with a new one', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const oldChild = new VText('fred');
        const newChild = new VElement('html', 'p', {}, []);
        vNode.appendChild(oldChild);
        vNode.replaceChild(newChild, oldChild);
        expect(vNode.childNodes).not.toContain(oldChild);
        expect(vNode.childNodes).toContain(newChild);
        expect(newChild.parentVNode).toBe(vNode);
    });

    test('replaceChild replaces an old child VNode with a new string one', () => {
        const vNode = new VElement('html', 'div', {}, []);
        const oldChild = new VElement('html', 'span', {}, []);
        const newChild = new VText('fred');
        vNode.appendChild(oldChild);
        vNode.replaceChild(newChild, oldChild);
        expect(vNode.childNodes).not.toContain(oldChild);
        expect(vNode.childNodes).toContain(newChild);
        expect(oldChild.parentVNode).toBe(null);
    });
});

describe('VNode Type Guards', () => {
    test('VNode type guards work correctly for a VNode', () => {
        const newVNode = new VNode();
        expect(() => assertIsVNode(newVNode)).not.toThrow();
    })

    test('VNode type guards work correctly for a non-VNode', () => {
        const newVNode = new Object();
        expect(() => assertIsVNode(newVNode)).toThrow();
    })

    test('VElement type guards work correctly for a VElement', () => {
        const newVNode = new VElement('html', 'div');
        expect(() => assertIsVElement(newVNode)).not.toThrow();
        expect(isVElement(newVNode)).toBe(true);
    })

    test('VElement type guards work correctly for a non-VElement', () => {
        const newVNode = new VNode();
        expect(() => assertIsVElement(newVNode)).toThrow();
        expect(isVElement(newVNode)).toBe(false);
    })

    test('VText type guards work correctly for a VText', () => {
        const newVNode = new VText('str');
        expect(() => assertIsVText(newVNode)).not.toThrow();
        expect(isVText(newVNode)).toBe(true);
    })

    test('VText type guards work correctly for a non-VText', () => {
        const newVNode = new VNode();
        expect(() => assertIsVText(newVNode)).toThrow();
        expect(isVText(newVNode)).toBe(false);
    })
});

describe('updateElement function', () => {
    test('updateElement adds a new node', () => {
        const parent = document.createElement('div');
        const newVNode = new VElement('html', 'span', {}, []);
        updateElement(parent, null, null, null, newVNode);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement adds a new node to a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VElement('html', 'div');
        const newVNode = new VElement('html', 'span', {}, []);
        updateElement(parent, null, parentVNode, null, newVNode);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement removes an old node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', {}, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, null);
        expect(parent.childNodes).not.toContain(oldVNode.domElement);
    });

    test('updateElement removes and old node from a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VElement('html', 'div');
        const newVNode = new VElement('html', 'span', {}, []);
        updateElement(parent, null, parentVNode, null, newVNode);
        updateElement(parent, parent.childNodes[0], parentVNode, newVNode, null);
        expect(parent.childNodes).not.toContain(newVNode.domElement);
    });

    test('updateElement replaces a node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', {}, []);
        const newVNode = new VElement('html', 'p', {}, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a node of a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VElement('html', 'div');
        const oldVNode = new VElement('html', 'span', {}, []);
        const newVNode = new VElement('html', 'p', {}, []);
        updateElement(parent, null, parentVNode, null, oldVNode);
        updateElement(parent, parent.childNodes[0], parentVNode, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a node with a string node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', {}, []);
        const newVNode = new VText('george');
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('george');
    });

    test('updateElement replaces a string node with a node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VText('fred');
        const newVNode = new VElement('html', 'span', {}, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a string node with another string node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VText('fred');
        const newVNode = new VText('george');
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('george');
    });

    test('updateElement replaces a string node with an identical string node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VText('fred');
        const newVNode = new VText('fred');
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('fred');
    });

    test('updateElement replaces a composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'));
        const newVNode = h('span', {}, h('p', {}, 'new text'));
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite HTML node with a bigger composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'));
        const newVNode = h('span', {}, h('p', {}, 'new text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite HTML node with a smaller composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        const newVNode = h('span', {}, h('p', {}, 'new text'));
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite SVG node with a bigger composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = svg('span', {}, svg('p', {}, 'old text'));
        const newVNode = svg('span', {}, svg('p', {}, 'new text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite SVG node with a smaller composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = svg('span', {}, svg('p', {}, 'old text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        const newVNode = svg('span', {}, svg('p', {}, 'new text'));
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement adds a node with properties', () => {
        const parent = document.createElement('div');
        const newVNode = new VElement('html', 'span', { className: 'test', onclick: () => {} }, []);
        updateElement(parent, null, null, null, newVNode);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement removes a node with properties', () => {
        const parent = document.createElement('div');
        const newVNode = new VElement('html', 'span', { className: 'test', onclick: () => {} }, []);
        updateElement(parent, null, null, null, newVNode);
        updateElement(parent, parent.childNodes[0], null, newVNode, null);
        expect(parent.childNodes.length).toBe(0);
    });

    test('updateElement replaces a node with properties', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', { className: 'test', id: 'bob', onclick: () => {} }, []);
        const newVNode = new VElement('html', 'span', { className: 'test', id: 'fred', onclick: () => {} }, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(Object.keys(newVNode.attrs).length).toBe(3);
        expect(newVNode.attrs['id']).toBe('fred');
    });

    test('updateElement replaces a node with different properties', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', { className: 'test', style: 'bob', onclick: () => {} }, []);
        const newVNode = new VElement('html', 'span', { className: 'test', id: 'fred', onclick: () => {} }, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(Object.keys(newVNode.attrs).length).toBe(3);
        expect(newVNode.attrs['id']).toBe('fred');
    });

    test('updateElement replaces an HTML node with an SVG node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('html', 'span', { className: 'test', style: 'bob', onclick: () => {} }, []);
        const newVNode = new VElement('svg', 'svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                'xml:space': 'preserve',
                onclick: () => { console.log('click'); }
            },
            []
        );
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(Object.keys(newVNode.attrs).length).toBe(3);
        expect(newVNode.attrs['xmlns']).toBe('http://www.w3.org/2000/svg');
    });

    test('updateElement replaces an SVG node with an HTML node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VElement('svg', 'svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                'xml:space': 'preserve',
                onclick: () => { console.log('click'); }
            },
            []
        );
        const newVNode = new VElement('html', 'span', { className: 'test', style: 'bob', onclick: () => {} }, []);
        updateElement(parent, null, null, null, oldVNode);
        updateElement(parent, parent.childNodes[0], null, oldVNode, newVNode);
        expect(Object.keys(newVNode.attrs).length).toBe(3);
        expect(newVNode.attrs['style']).toBe('bob');
    });

    test('updateElement mounts a component', () => {
        function TestComponent() {
            const component = () => h('div', {},
                h('h2', {}, `Count: 0`),
                h('button', {}, 'Increment'),
                h('button', {}, 'Decrement')
            );

            let vNode = component();
            vNode.mountCallback = jest.fn();

            return vNode;
        }

        const parent = document.createElement('div');
        const newVNode = TestComponent();
        updateElement(parent, null, null, null, newVNode);
        expect((newVNode as VElement).mountCallback).toHaveBeenCalled();
        expect(parent.childNodes).toContain((newVNode as VElement).domElement);
    });

    test('updateElement unmounts a component', () => {
        function TestComponent() {
            const component = () => h('div', {},
                h('h2', {}, `Count: 0`),
                h('button', {}, 'Increment'),
                h('button', {}, 'Decrement')
            );

            let vNode = component();
            (vNode as VElement).unmountCallback = jest.fn();

            return vNode;
        }

        const parent = document.createElement('div');
        const newVNode = TestComponent();
        updateElement(parent, null, null, null, newVNode);
        updateElement(parent, parent.childNodes[0], null, newVNode, null);
        expect((newVNode as VElement).unmountCallback).toHaveBeenCalled();
        expect(parent.childNodes.length).toBe(0);
    });
});

describe('h function', () => {
    test('h creates a virtual DOM element', () => {
        const vNode = h('div', { id: 'test' }, 'child');
        expect(vNode.type).toBe('div');
        expect(vNode.attrs).toEqual({ id: 'test' });
        expect(vNode.childNodes[0] instanceof VText);
        expect((vNode.childNodes[0] as VText).text).toBe('child');
    });

    test('h created with no params', () => {
        const vNode = h('div');
        expect(vNode.type).toBe('div');
        expect(vNode.attrs).toEqual({});
    });
});

describe('svg function', () => {
    test('svg creates a virtual DOM element', () => {
        const vNode = svg('svg', { xmlns: 'http://www.w3.org/2000/svg' }, 'child');
        expect(vNode.type).toBe('svg');
        expect(vNode.attrs).toEqual({ xmlns: 'http://www.w3.org/2000/svg' });
        expect(vNode.childNodes[0] instanceof VText);
        expect((vNode.childNodes[0] as VText).text).toBe('child');
    });

    test('svg created with no params', () => {
        const vNode = svg('svg');
        expect(vNode.type).toBe('svg');
        expect(vNode.attrs).toEqual({});
    });
});
