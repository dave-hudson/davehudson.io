import { jest } from '@jest/globals';

import { VDom, mountVNode, unmountVNode, runUpdates, updateElement, enqueueUpdate, h } from '../src/dvdi.js';

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

describe('mountVNode and unmountVNode functions', () => {
    test('mountVNode calls mountCallback if present', () => {
        const vDom = new VDom('div', {}, []);
        const mountCallback = jest.fn();
        vDom.mountCallback = mountCallback;
        mountVNode(vDom);
        expect(mountCallback).toHaveBeenCalled();
        expect(vDom.isMounted).toBe(true);
    });

    test('unmountVNode calls unmountCallback if present', () => {
        const vDom = new VDom('div', {}, []);
        const unmountCallback = jest.fn();
        vDom.unmountCallback = unmountCallback;
        vDom.isMounted = true;
        unmountVNode(vDom);
        expect(unmountCallback).toHaveBeenCalled();
        expect(vDom.isMounted).toBe(false);
    });
});

describe('updateElement function', () => {
    test('updateElement adds a new node', () => {
        const parent = document.createElement('div');
        const newVNode = new VDom('span', {}, []);
        updateElement(parent, null, null, newVNode, 0);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });

    test('updateElement removes an old node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', {}, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, null, 0);
        expect(parent.childNodes).not.toContain(oldVNode.domElement);
    });

    test('updateElement replaces a node', () => {
        const parent = document.createElement('div');
        const oldVNode = new VDom('span', {}, []);
        const newVNode = new VDom('p', {}, []);
        updateElement(parent, null, null, oldVNode, 0);
        updateElement(parent, null, oldVNode, newVNode, 0);
        expect(parent.childNodes).not.toContain(oldVNode.domElement);
        expect(parent.childNodes).toContain(newVNode.domElement);
    });
});

describe('enqueueUpdate and runUpdates functions', () => {
    test('enqueueUpdate schedules an update', () => {
        const update = jest.fn();
        enqueueUpdate(update);
        expect(update).toHaveBeenCalled();
    });

    test('runUpdates runs all enqueued updates', () => {
        const update1 = jest.fn();
        const update2 = jest.fn();
        enqueueUpdate(update1);
        enqueueUpdate(update2);
        runUpdates();
        expect(update1).toHaveBeenCalled();
        expect(update2).toHaveBeenCalled();
    });
});

describe('h function', () => {
    test('h creates a virtual DOM element', () => {
        const vDom = h('div', { id: 'test' }, 'child');
        expect(vDom.type).toBe('div');
        expect(vDom.props).toEqual({ id: 'test' });
        expect(vDom.childNodes).toContain('child');
    });
});
