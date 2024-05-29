import { jest } from '@jest/globals';

import { VDom, updateElement, h } from '../../src/lib/dvdi.js';

// Mocking the requestAnimationFrame for enqueueUpdate tests
global.requestAnimationFrame = (callback) => callback();

describe('VDom Class', () => {
    test('constructor initializes properties correctly', () => {
        const vDom = new VDom('div', { id: 'test' }, []);
        expect(vDom.type).toBe('div');
        expect(vDom.props).toEqual({ id: 'test' });
        expect(vDom.childNodes).toEqual([]);
    });

    test('appendChild adds a child VNode', () => {
        const vDom = new VDom('div', {}, []);
        const child = new VDom('span', {}, []);
        vDom.appendChild(child);
        expect(vDom.childNodes).toContain(child);
        expect(child.parentVNode).toBe(vDom);
    });

    test('appendChild adds a string child VNode', () => {
        const vDom = new VDom('div', {}, []);
        const child = 'fred';
        vDom.appendChild(child);
        expect(vDom.childNodes).toContain(child);
    });

    test('removeChild removes a child VNode', () => {
        const vDom = new VDom('div', {}, []);
        const child = new VDom('span', {}, []);
        vDom.appendChild(child);
        vDom.removeChild(child);
        expect(vDom.childNodes).not.toContain(child);
        expect(child.parentVNode).toBeNull();
    });

    test('removeChild removes a child VNode', () => {
        const vDom = new VDom('div', {}, []);
        const child = 'fred';
        vDom.appendChild(child);
        vDom.removeChild(child);
        expect(vDom.childNodes).not.toContain(child);
    });

    test('replaceChild replaces an old child VNode with a new one', () => {
        const vDom = new VDom('div', {}, []);
        const oldChild = new VDom('span', {}, []);
        const newChild = new VDom('p', {}, []);
        vDom.appendChild(oldChild);
        vDom.replaceChild(newChild, oldChild);
        expect(vDom.childNodes).not.toContain(oldChild);
        expect(vDom.childNodes).toContain(newChild);
        expect(newChild.parentVNode).toBe(vDom);
        expect(oldChild.parentVNode).toBeNull();
    });

    test('replaceChild replaces an old string child VNode with a new one', () => {
        const vDom = new VDom('div', {}, []);
        const oldChild = 'fred';
        const newChild = new VDom('p', {}, []);
        vDom.appendChild(oldChild);
        vDom.replaceChild(newChild, oldChild);
        expect(vDom.childNodes).not.toContain(oldChild);
        expect(vDom.childNodes).toContain(newChild);
        expect(newChild.parentVNode).toBe(vDom);
    });

    test('replaceChild replaces an old child VNode with a new string one', () => {
        const vDom = new VDom('div', {}, []);
        const oldChild = new VDom('span', {}, []);
        const newChild = 'fred';
        vDom.appendChild(oldChild);
        vDom.replaceChild(newChild, oldChild);
        expect(vDom.childNodes).not.toContain(oldChild);
        expect(vDom.childNodes).toContain(newChild);
        expect(oldChild.parentVNode).toBe(null);
    });
});

describe('updateElement function', () => {
    test('updateElement adds a new node', () => {
        const parent = document.createElement('div');
        const newVNode = new VDom('span', {}, []);
        updateElement(parent, null, null, newVNode, 0);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement adds a new node to a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VDom('div');
        const newVNode = new VDom('span', {}, []);
        updateElement(parent, parentVNode, null, newVNode, 0);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement removes an old node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', {}, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, null, 0);
        expect(parent.childNodes).not.toContain(oldVNode.domElement);
    });

    test('updateElement removes and old node from a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VDom('div');
        const newVNode = new VDom('span', {}, []);
        updateElement(parent, parentVNode, null, newVNode, 0);
        updateElement(parent, parentVNode, newVNode, null, 0);
        expect(parent.childNodes).not.toContain(newVNode.domElement);
    });

    test('updateElement replaces a node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', {}, []);
        const newVNode = new VDom('p', {}, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a node of a parent node', () => {
        const parent = document.createElement('div');
        const parentVNode = new VDom('div');
        const oldVNode = new VDom('span', {}, []);
        const newVNode = new VDom('p', {}, []);
        updateElement(parent, parentVNode, null, oldVNode, 0);
        updateElement(parent, parentVNode, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a node with a string node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', {}, []);
        const newVNode = 'george';
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('george');
    });

    test('updateElement replaces a string node with a node', () => {
        const parent = document.createElement('div');
        const oldVNode = 'fred';
        const newVNode = new VDom('span', {}, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a string node with another string node', () => {
        const parent = document.createElement('div');
        const oldVNode = 'fred';
        const newVNode = 'george';
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('george');
    });

    test('updateElement replaces a string node with an identical string node', () => {
        const parent = document.createElement('div');
        const oldVNode = 'fred';
        const newVNode = 'fred';
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes[0].textContent).toBe('fred');
    });

    test('updateElement replaces a composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'));
        const newVNode = h('span', {}, h('p', {}, 'new text'));
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite node with a bigger composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'));
        const newVNode = h('span', {}, h('p', {}, 'new text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement replaces a composite node with a smaller composite node', () => {
        const parent = document.createElement('div');
        const oldVNode = h('span', {}, h('p', {}, 'old text'), h('h2', {}, 'heading 2'), h('h3', {}, 'heading 3'));
        const newVNode = h('span', {}, h('p', {}, 'new text'));
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement adds a node with properties', () => {
        const parent = document.createElement('div');
        const newVNode = new VDom('span', { className: 'test', onClick: () => {} }, []);
        updateElement(parent, null, null, newVNode, 0);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement removes a node with properties', () => {
        const parent = document.createElement('div');
        const newVNode = new VDom('span', { className: 'test', onClick: () => {} }, []);
        updateElement(parent, null, null, newVNode, 0);
        updateElement(parent, null, newVNode, null, 0);
        expect(parent.childNodes.length).toBe(0);
    });

    test('updateElement replaces a node with properties', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', { className: 'test', id: 'bob', onClick: () => {} }, []);
        const newVNode = new VDom('span', { className: 'test', id: 'fred', onClick: () => {} }, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(Object.keys(newVNode.props).length).toBe(3);
        expect(newVNode.props['id']).toBe('fred');
    });

    test('updateElement replaces a node with different properties', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', { className: 'test', style: 'bob', onClick: () => {} }, []);
        const newVNode = new VDom('span', { className: 'test', id: 'fred', onClick: () => { foo(); } }, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(Object.keys(newVNode.props).length).toBe(3);
        expect(newVNode.props['id']).toBe('fred');
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
        updateElement(parent, null, null, newVNode, 0);
        expect(newVNode.mountCallback).toHaveBeenCalled();
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement unmounts a component', () => {
        function TestComponent() {
            const component = () => h('div', {},
                h('h2', {}, `Count: 0`),
                h('button', {}, 'Increment'),
                h('button', {}, 'Decrement')
            );

            let vNode = component();
            vNode.unmountCallback = jest.fn();

            return vNode;
        }

        const parent = document.createElement('div');
        const newVNode = TestComponent();
        updateElement(parent, null, null, newVNode, 0);
        updateElement(parent, null, newVNode, null, 0);
        expect(newVNode.unmountCallback).toHaveBeenCalled();
        expect(parent.childNodes.length).toBe(0);
    });
});

describe('h function', () => {
    test('h creates a virtual DOM element', () => {
        const vDom = h('div', { id: 'test' }, 'child');
        expect(vDom.type).toBe('div');
        expect(vDom.props).toEqual({ id: 'test' });
        expect(vDom.childNodes).toContain('child');
    });

    test('h created with no params', () => {
        const vDom = h('div');
        expect(vDom.type).toBe('div');
        expect(vDom.props).toEqual({});
    });
});