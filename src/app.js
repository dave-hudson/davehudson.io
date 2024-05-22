//import './obsi.js';

class VDom {
    constructor(type, props, childNodes) {
        this.type = type;
        this.props = props;
        this.childNodes = childNodes;
        this.domElement = null;
        this.mountCallback = null;
        this.unmountCallback = null;
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

function updateElement(parent, oldVNode, newVNode, index = 0) {
    if (!oldVNode && newVNode) {
        parent.appendChild(render(newVNode)); // Node added
        return;
    }

    if (oldVNode && !newVNode) {
        parent.removeChild(parent.childNodes[index]); // Node removed
        return;
    }

    if (oldVNode && newVNode && changed(oldVNode, newVNode)) {
        parent.replaceChild(render(newVNode), parent.childNodes[index]); // Node changed
        return;
    }

    if (oldVNode && newVNode && typeof oldVNode !== 'string' && oldVNode.type === newVNode.type) {
        updateProps(parent.childNodes[index], oldVNode.props, newVNode.props); // Update props
        const maxLength = Math.max(oldVNode.childNodes.length, newVNode.childNodes.length);
        for (let i = 0; i < maxLength; i++) {
            updateElement(parent.childNodes[index], oldVNode.childNodes[i], newVNode.childNodes[i], i);
        }
    }
}

function mapVDomToDom(vNode, domNode) {
    if (typeof vNode === 'string') {
        return;
    }

    vNode.domElement = domNode;
    if (vNode.mountCallback) {
        vNode.mountCallback();
    }

    for (let i = 0; i < vNode.childNodes.length; i++) {
        mapVDomToDom(vNode.childNodes[i], domNode.childNodes[i]);
    }
}

function unmapVDomFromDom(vNode) {
    if (typeof vNode === 'string') {
        return;
    }

    if (vNode.mountCallback) {
        vNode.unmountCallback();
    }

    for (let i of vNode.childNodes) {
        unmapVDomFromDom(i);
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

    for (const key in props) {
        if (key.startsWith('on')) {
            element.addEventListener(key.substring(2).toLowerCase(), props[key]);
        } else {
            element[key] = props[key];
        }
    }

    childNodes.map(render).forEach(child => element.appendChild(child));

    return element;
}

function createState(initialState) {
    let state = initialState;
    let subscribers = [];

    const getState = () => state;

    const setState = (newState) => {
        if (state !== newState) {
            state = newState;
            subscribers.forEach((subscriber) => subscriber()); // Notify all subscribers
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
            const parentElem = vNode.domElement.parentNode;
            const index = Array.from(parentElem.childNodes).indexOf(vNode.domElement);
            const newVNode = component();
            newVNode.domElement = vNode.domElement;
            updateElement(parentElem, vNode, newVNode, index);
            vNode = newVNode;
        });
    };

    vNode.unmountCallback = () => {
        console.log('remove', vNode);
        unsubscribe(subIndex);
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
        unmapVDomFromDom(rootVNode);
    }

    const path = window.location.pathname;
    const pageFunction = routes[path] || notFoundPage;

    rootVNode = pageFunction();
    let rootElement = render(rootVNode);

    // Add our new page to the DOM and map its VDOM.
    app.appendChild(rootElement);
    mapVDomToDom(rootVNode, app.childNodes[0]);
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
