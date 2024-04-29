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
function isEventProp(propName) {
    return /^on/.test(propName);
}

/**
 * Creates a virtual DOM element.
 * @param {string} type The element type.
 * @param {Object} props The properties and attributes of the element.
 * @param {Array} children The child elements or strings.
 * @returns {Object} A virtual DOM element.
 */
export function h(type, props, ...children) {
    return { type, props, children };
}

/**
 * Sets a property or attribute on a real DOM element.
 * @param {Element} element The DOM element.
 * @param {string} propName The property or attribute name.
 * @param {*} value The value to set.
 */
function setProp(element, propName, value) {
    if (propName === 'className') {
        element.setAttribute('class', value);
    } else if (propName === 'style' && typeof value === 'object') {
        Object.keys(value).forEach(styleName => {
            element.style[styleName] = value[styleName];
        });
    } else if (isEventProp(propName)) {
        const eventType = propName.toLowerCase().substring(2);
        element.addEventListener(eventType, value);
    } else {
        element.setAttribute(propName, value);
    }
}

/**
 * Renders a virtual DOM node to the real DOM.
 * @param {Element} container The DOM container to render into.
 * @param {Object|string} vnode The virtual DOM node or string to render.
 */
function renderDom(container, vnode) {
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        if (container) {
            container.appendChild(textNode);
        }

        return textNode;
    }

    const element = document.createElement(vnode.type);
    Object.keys(vnode.props || {}).forEach(propName => {
        setProp(element, propName, vnode.props[propName]);
    });

    vnode.children.forEach(child => renderDom(element, child));
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
function changed(node1, node2) {
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
function updateDomElement(parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        parent.appendChild(renderDom(null, newNode));
        return;
    }

    if (!newNode) {
        parent.removeChild(parent.childNodes[index]);
        return;
    }

    if (changed(newNode, oldNode)) {
        parent.replaceChild(renderDom(null, newNode), parent.childNodes[index]);
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
 * Enqueues a component for batch updates.
 * @param {Component} component The component to update.
 */
export function enqueueUpdate(component) {
    if (!updateQueue.includes(component)) {
        updateQueue.push(component);
    }

    if (!nextFrame) {
        nextFrame = requestAnimationFrame(performUpdates);
    }
}

/**
 * Performs all enqueued component updates.
 */
function performUpdates() {
    updateQueue.forEach(component => component.update());
    updateQueue = [];
    nextFrame = null;
}

/**
 * Represents a UI component with state and props.
 */
export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.currentVNode = null;
    }

    /**
     * Sets the state of the component, triggering a re-render if necessary.
     * @param {Object} newState The new state object.
     */
    setState(newState) {
        if (!shallowEqual(this.state, newState)) {
            this.state = { ...this.state, ...newState };
            enqueueUpdate(this);
        }
    }

    /**
     * Updates the component by re-rendering its virtual DOM and applying any changes.
     */
    update() {
        const newVNode = this.render();
        updateDomElement(this.parent, newVNode, this.currentVNode);
        this.currentVNode = newVNode;
    }

    render() {
        // Overridden by subclass
    }
}

export class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };  // Initialize state with count
    }

    render() {
        return h('button', {
            onClick: () => this.handleClick(),
            style: { fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }
        }, `Click me: ${this.state.count} times`);
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
}
