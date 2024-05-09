/**
 * Performs shallow comparison between two objects.
 * @param {Object} obj1 The first object.
 * @param {Object} obj2 The second object.
 * @returns {boolean} True if objects are shallowly equal, false otherwise.
 */
function shallowEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

/**
 * Determines if a property name is an event handler.
 * @param {string} propName The property name to check.
 * @returns {boolean} True if the property name is an event handler, false otherwise.
 */
function isEventProperty(propName) {
    return /^on/.test(propName);
}

/**
 * Sets a property or attribute on a real DOM element.
 * @param {Element} element The DOM element.
 * @param {string} propName The property or attribute name.
 * @param {*} value The value to set.
 */
function setDomElementProperty(element, propName, value) {
    if (propName === 'className') {
        element.setAttribute('class', value);
        return;
    }

    if (propName === 'style' && typeof value === 'object') {
        Object.keys(value).forEach(styleName => {
            element.style[styleName] = value[styleName];
        });
        return;
    }

    if (isEventProperty(propName)) {
        const eventType = propName.toLowerCase().substring(2);
        element.addEventListener(eventType, value);
        return;
    }

    element.setAttribute(propName, value);
}

/**
 * Renders a virtual DOM node to the real DOM.
 * @param {Element} container The DOM container to render into.
 * @param {Object|string} vnode The virtual DOM node or string to render.
 */
function renderDomFromVNode(container, vnode) {
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        if (container) {
            container.appendChild(textNode);
        }

        return textNode;
    }

    const element = document.createElement(vnode.type);
    Object.keys(vnode.props || {}).forEach(propName => {
        setDomElementProperty(element, propName, vnode.props[propName]);
    });

    vnode.children.forEach(child => renderDomFromVNode(element, child));
    if (container) {
        container.appendChild(element);
    }

    return element;
}

/**
 * Determines if two virtual DOM nodes are different.
 * @param {Object} node1 The first virtual DOM node.
 * @param {Object} node2 The second virtual DOM node.
 * @returns {boolean} True if nodes are different, false otherwise.
 */
function vNodeChanged(node1, node2) {
    return typeof node1 !== typeof node2 ||
           (typeof node1 === 'string' && node1 !== node2) ||
           node1.type !== node2.type;
}

/**
 * Updates a DOM element based on changes in the virtual DOM.
 * @param {Element} parent The parent DOM element.
 * @param {Object} newNode The new virtual DOM node.
 * @param {Object} oldNode The old virtual DOM node.
 * @param {number} index The child index.
 */
export function updateDomElement(parent, newNode, oldNode, index = 0) {
    // If there's no old node then we add the new one.
    if (!oldNode) {
        let x = renderDomFromVNode(null, newNode);
        console.log(x);
        parent.appendChild(x);
        return;
    }

    // If there's no new node then we remove the old one.
    if (!newNode) {
        parent.removeChild(parent.childNodes[index]);
        return;
    }

    // If the new and old nodes are different then replace them.
    if (vNodeChanged(newNode, oldNode)) {
        parent.replaceChild(renderDomFromVNode(null, newNode), parent.childNodes[index]);
        return;
    }

    if (newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateDomElement(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}

// Batch updates and state management
let updateQueue = [];
let nextFrame = null;

/**
 * Performs all enqueued component updates.
 */
function performVNodeUpdates() {
    updateQueue.forEach(component => component.updateVDom());
    updateQueue = [];
    nextFrame = null;
}

/**
 * Enqueues a component for batch updates.
 * @param {Component} component The component to update.
 */
export function enqueueVNodeUpdate(component) {
    if (!updateQueue.includes(component)) {
        updateQueue.push(component);
    }

    if (!nextFrame) {
        nextFrame = requestAnimationFrame(performVNodeUpdates);
    }
}

/**
 * Creates a virtual DOM element.
 * @param {string} type The element type.
 * @param {Object} props The properties and attributes of the element.
 * @param {Array} children The child elements or strings.
 * @returns {Object} A virtual DOM element.
 */
export function h(type, props, ...children) {
    return {
        type,
        props: props || {},
        children
    };
}
