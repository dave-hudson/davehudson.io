//import './obsi.js';

class VDom {
    constructor(type, props, childNodes) {
        this.type = type;
        this.props = props;
        this.parentVNode = null;
        this.childNodes = childNodes;
        this.domElement = null;
        this.mountCallback = null;
        this.unmountCallback = null;
    }

    appendChild(vNode) {
        this.childNodes.push(vNode);
        if (typeof vNode !== 'string') {
            vNode.parentVNode = this;
        }
    }

    removeChild(vNode) {
        const index = this.childNodes.indexOf(vNode);
        this.childNodes = this.childNodes.slice(0, index).concat(this.childNodes.slice(index + 1));
        if (typeof vNode !== 'string') {
            console.log('removeChild', vNode);
            vNode.parentVNode = null;
        }
    }

    replaceChild(newVNode, oldVNode) {
        const index = this.childNodes.indexOf(oldVNode);
        this.childNodes[index] = newVNode;
        if (typeof newVNode !== 'string') {
            newVNode.parentNode = this;
        }
    }
}

/**
 * Creates a virtual DOM element.
 * @param {string} type The element type.
 * @param {Object} props The properties and attributes of the element.
 * @param {Array} childNodes The child elements or strings.
 * @returns {Object} A virtual DOM element.
 */
export function h(type, props, ...childNodes) {
    let v = new VDom(type, props || {}, childNodes)
    return v;
}

function changed(vnode1, vnode2) {
    return typeof vnode1 !== typeof vnode2 ||
           (typeof vnode1 === 'string' && vnode1 !== vnode2) ||
           vnode1.type !== vnode2.type;
}

function updateProps(element, oldProps, newProps) {
    for (const prop in oldProps) {
        if (!(prop in newProps)) {
            if (prop.startsWith('on')) { // Remove event listeners
                element.removeEventListener(prop.substring(2).toLowerCase(), oldProps[prop]);
            } else { // Remove attributes
                element[prop] = '';
            }
        }
    }

    for (const prop in newProps) {
        if (!(prop in oldProps)) {
            if (prop.startsWith('on')) { // Add event listeners
                element.addEventListener(prop.substring(2).toLowerCase(), newProps[prop]);
            } else { // Update attributes
                element[prop] = newProps[prop];
            }
        }
    }
}

function preRender(parentVNode, vNode) {
    if (typeof vNode == 'string') {
        return;
    }

    const len = vNode.childNodes.length;
    for (let i = 0; i < len; i++) {
        preRender(vNode, vNode.childNodes[i]);
    }

    vNode.parentVNode = parentVNode;
}

function updateElement(parent, parentVNode, oldVNode, newVNode, index = 0) {
    if (!oldVNode && newVNode) {
        preRender(parentVNode, newVNode);
        parent.appendChild(render(newVNode)); // Node added

        if (parentVNode) {
            parentVNode.appendChild(newVNode);
        }

        return;
    }

    if (oldVNode && !newVNode) {
        console.log('remove element', oldVNode);
        if (parentVNode) {
            parentVNode.removeChild(oldVNode);
        }

        unrender(oldVNode);
        parent.removeChild(parent.childNodes[index]); // Node removed
        return;
    }

    if (oldVNode && newVNode && changed(oldVNode, newVNode)) {
        console.log('replace child', newVNode);
        unrender(oldVNode);

        preRender(parentVNode, newVNode);
        const r = render(newVNode);
        console.log(r);
        parentVNode.replaceChild(newVNode, oldVNode);

        parent.replaceChild(r, parent.childNodes[index]); // Node changed
        return;
    }

    if (oldVNode && newVNode && typeof oldVNode !== 'string' && oldVNode.type === newVNode.type) {
        console.log('recurse', oldVNode);
        updateProps(parent.childNodes[index], oldVNode.props, newVNode.props); // Update props
        const maxLength = Math.max(oldVNode.childNodes.length, newVNode.childNodes.length);
        for (let i = 0; i < maxLength; i++) {
            updateElement(parent.childNodes[index], oldVNode, oldVNode.childNodes[i], newVNode.childNodes[i], i);
        }
    }
}

function mountVNode(vNode) {
    if (typeof vNode === 'string') {
        return;
    }

    if (vNode.mountCallback) {
        vNode.mountCallback();
    }

    for (let i of vNode.childNodes) {
        mountVNode(i);
    }
}

function unmountVNode(vNode) {
    if (typeof vNode === 'string') {
        return;
    }

    if (vNode.unmountCallback) {
        vNode.unmountCallback();
    }

    for (let i of vNode.childNodes) {
        unmountVNode(i);
    }
}

// Enhanced render function to attach events
function render(vNode) {
    if (typeof vNode === 'string') {
        const element = document.createTextNode(vNode);
        return element;
    }

    const { type, props, childNodes } = vNode;
    const element = document.createElement(type);
    vNode.domElement = element;

    for (const key in props) {
        if (key.startsWith('on')) {
            element.addEventListener(key.substring(2).toLowerCase(), props[key]);
        } else {
            element[key] = props[key];
        }
    }

    const len = childNodes.length;
    for (let i = 0; i < len; i++) {
        const vn = childNodes[i];
        element.appendChild(render(vn));
    }

    return element;
}

// Enhanced unrender function to detach events
function unrender(vNode) {
    console.log('unrender', vNode);
    if (typeof vNode === 'string') {
        return;
    }

    const { type, props, childNodes, domElement } = vNode;
    const len = childNodes.length;
    for (let i = len - 1; i >= 0; i--) {
        const vn = childNodes[i];
        if (typeof vn === 'string') {
            continue;
        }

        const de = vn.domElement;
        unrender(vn);
        vNode.removeChild(vn);
        domElement.removeChild(de);
    }

    for (const key in props) {
        if (key.startsWith('on')) {
            domElement.removeEventListener(key.substring(2).toLowerCase(), props[key]);
        } else {
            domElement[key] = '';
        }
    }

    console.log(vNode);
    vNode.domElement = null;
}

const updateQueue = new Set();

/**
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 * @param {Function} update The update function to enqueue.
 */
function enqueueUpdate(update) {
    updateQueue.add(update);
    if (updateQueue.size === 1) {
        requestAnimationFrame(runUpdates);
    }
}

/**
 * Runs all updates that have been enqueued.
 */
function runUpdates() {
    updateQueue.forEach(update => update());
    updateQueue.clear();
}


function createState(initialState) {
    let state = initialState;
    let subscribers = [];

    const getState = () => state;

    const setState = (newState) => {
        if (state !== newState) {
            state = newState;
            subscribers.forEach((subscriber) => enqueueUpdate(subscriber));
        }
    };

    const subscribe = (callback) => {
        return subscribers.push(callback) - 1;
    };

    const unsubscribe = (index) => {
        subscribers = subscribers.slice(0, index).concat(subscribers.slice(index + 1));
    }

    return [getState, setState, subscribe, unsubscribe];
}

function Counter() {
    const [count, setCount, subscribe, unsubscribe] = createState(0);

    const incCount = () => setCount(count() + 1);
    const decCount = () => setCount(count() - 1);

    const component = () => h('div', {},
        h('h2', {}, `Count: ${count()}`),
        h('button', { onClick: () => incCount() }, 'Increment'),
        h('button', { onClick: () => decCount() }, 'Decrement')
    );

    let vNode = component()
    let subIndex = -1;

    vNode.mountCallback = () => {
        subIndex = subscribe(() => {
            const parentElem = vNode.parentVNode.domElement;
            const index = Array.from(parentElem.childNodes).indexOf(vNode.domElement);
            const newVNode = component();
            newVNode.parentVNode = vNode.parentVNode;
            newVNode.domElement = vNode.domElement;
            console.log('mountCallback', newVNode);
            updateElement(parentElem, vNode.parentVNode, vNode, newVNode, index);
            vNode = newVNode;
        });
    };

    vNode.unmountCallback = () => {
        unsubscribe(subIndex);

        const parentElem = vNode.parentVNode.domElement;
        const index = Array.from(parentElem.childNodes).indexOf(vNode.domElement);
        updateElement(parentElem, vNode.parentVNode, vNode, null, index);
    }

    return vNode;
}

function homePage() {
    return h('div', { className: 'app' },
        h('header', { className: 'header' }, 'Welcome to My App with Two Counters'),
        h('main', { className: 'main-content' },
            h('section', { className: 'description' },
                'Explore the counters below to interact with the virtual DOM:',
                Counter(),
                Counter()
            ),
            h('article', {}, 'More content can follow here.')
        ),
        h('a', { href: '/about', onClick: () => navigate('/about') }, 'About'),
        h('footer', { className: 'footer' }, 'Footer content goes here. © 2024.')
    );
}

function aboutPage() {
    return h('div', null,
        h('h1', null, 'About Page'),
        h('a', { href: '/', onClick: () => navigate('/') }, 'Home')
    );
}

function notFoundPage() {
    return h('div', null,
        h('h1', null, '404: Page Not Found'),
        h('a', { href: '/', onClick: () => navigate('/') }, 'Home')
    );
}

const routes = {
    '/': homePage,
    '/about': aboutPage
};

let rootVNode = null;

function handleLocation() {
    const app = document.querySelector('#app');

    // If we already rendered a page then remove it from the DOM and unmap its VDOM.
    if (rootVNode) {
        app.removeChild(rootVNode.domElement);
        unmountVNode(rootVNode);
    }

    const path = window.location.pathname;
    const pageFunction = routes[path] || notFoundPage;

    rootVNode = pageFunction();
    updateElement(app, null, null, rootVNode);
    mountVNode(rootVNode);
}

function navigate(path) {
    window.history.pushState({}, '', path);
    handleLocation();
}

function route_init() {
    window.onpopstate = () => handleLocation();
    handleLocation();
}

document.addEventListener('DOMContentLoaded', route_init());
