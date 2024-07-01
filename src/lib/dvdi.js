/*
 * Various different namespaces that can be used in the DOM.
 */
const namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    html: 'http://www.w3.org/1999/xhtml',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/xmlns/'
};
/**
 * Class representing a virtual DOM node.
 */
export class VDom {
    /**
     * Create a VDom node.
     * @param namespace - The namespace for the matching DOM element.
     * @param type - The type of the node (e.g., 'div').
     * @param props - The properties and attributes of the node.
     * @param childNodes - The child nodes of this node.
     */
    constructor(namespace, type, props = {}, childNodes = []) {
        this.namespace = namespace;
        this.type = type;
        this.props = props;
        this.parentVNode = null;
        this.childNodes = childNodes;
        this.domElement = null;
        this.isMounted = false;
        this.mountCallback = null;
        this.unmountCallback = null;
    }
    /**
     * Append a child node.
     * @param vNode - The child node to append.
     */
    appendChild(vNode) {
        this.childNodes.push(vNode);
        if (typeof vNode === 'string') {
            return;
        }
        vNode.parentVNode = this;
    }
    /**
     * Remove a child node.
     * @param vNode - The child node to remove.
     */
    removeChild(vNode) {
        const index = this.childNodes.indexOf(vNode);
        this.childNodes = this.childNodes.slice(0, index).concat(this.childNodes.slice(index + 1));
        if (typeof vNode === 'string') {
            return;
        }
        vNode.parentVNode = null;
    }
    /**
     * Replace an old child node with a new one.
     * @param newVNode - The new child node.
     * @param oldVNode - The old child node to replace.
     */
    replaceChild(newVNode, oldVNode) {
        const index = this.childNodes.indexOf(oldVNode);
        this.childNodes[index] = newVNode;
        if (typeof newVNode !== 'string') {
            newVNode.parentVNode = this;
        }
        if (typeof oldVNode !== 'string') {
            oldVNode.parentVNode = null;
        }
    }
}
/*
 * Mount a virtual DOM node.
 */
function mountVNode(vNode) {
    if (typeof vNode === 'string') {
        return;
    }
    if (vNode.mountCallback && !vNode.isMounted) {
        vNode.mountCallback();
    }
    vNode.isMounted = true;
    for (let i of vNode.childNodes) {
        mountVNode(i);
    }
}
/*
 * Unmount a virtual DOM node.
 */
function unmountVNode(vNode) {
    if (typeof vNode === 'string') {
        return;
    }
    if (vNode.unmountCallback && vNode.isMounted) {
        vNode.unmountCallback();
    }
    vNode.isMounted = false;
    for (let i of vNode.childNodes) {
        unmountVNode(i);
    }
}
/*
 * Add an attribute to a DOM element.
 */
function newAttribute(domElement, key, value) {
    if (key.startsWith('on')) {
        domElement.addEventListener(key.substring(2).toLowerCase(), value);
        return;
    }
    if (key === 'className') {
        domElement.className = value;
        return;
    }
    const [prefix, ...unqualifiedName] = key.split(':');
    let ns = null;
    if (prefix === 'xmlns' || unqualifiedName.length && namespaces[prefix]) {
        ns = namespaces[prefix];
    }
    domElement.setAttributeNS(ns, key, String(value));
}
/*
 * Remove an attribute from a DOM element.
 */
function deleteAttribute(domElement, key, value) {
    if (key.startsWith('on')) {
        domElement.removeEventListener(key.substring(2).toLowerCase(), value);
        return;
    }
    if (key == 'className') {
        domElement.className = '';
        return;
    }
    const [prefix, ...unqualifiedName] = key.split(':');
    let ns = null;
    if (prefix === 'xmlns' || unqualifiedName.length && namespaces[prefix]) {
        ns = namespaces[prefix];
    }
    domElement.removeAttributeNS(ns, key);
}
/*
 * Render a virtual DOM node into a real DOM node.
 */
function render(vNode) {
    if (typeof vNode === 'string') {
        const domElement = document.createTextNode(vNode);
        return domElement;
    }
    const { namespace, type, props, childNodes } = vNode;
    const domElement = document.createElementNS(namespaces[namespace], type);
    vNode.domElement = domElement;
    for (const key in props) {
        newAttribute(domElement, key, props[key]);
    }
    const len = childNodes.length;
    for (let i = 0; i < len; i++) {
        const vn = childNodes[i];
        domElement.appendChild(render(vn));
    }
    return domElement;
}
/*
 * Unrender a virtual DOM node.
 */
function unrender(vNode) {
    if (typeof vNode === 'string') {
        return;
    }
    const { props, childNodes, domElement } = vNode;
    const len = childNodes.length;
    for (let i = len - 1; i >= 0; i--) {
        const vn = childNodes[i];
        vNode.removeChild(vn);
        unrender(vn);
    }
    for (const key in props) {
        deleteAttribute(domElement, key, props[key]);
    }
    vNode.domElement = null;
}
/*
 * Check if two virtual DOM nodes are different.
 */
function changed(vnode1, vnode2) {
    return typeof vnode1 !== typeof vnode2 ||
        (typeof vnode1 === 'string' && (vnode1 !== vnode2)) ||
        (typeof vnode1 !== 'string' && typeof vnode2 !== 'string' && (vnode1.namespace !== vnode2.namespace)) ||
        vnode1.type !== vnode2.type;
}
/*
 * Update the properties of a DOM element.
 */
function updateProps(domElement, oldProps, newProps) {
    // Iterate over all the old properties and remove any that are not in the new properties.
    for (const key in oldProps) {
        if (!(key in newProps) || (oldProps[key] !== newProps[key])) {
            deleteAttribute(domElement, key, oldProps[key]);
        }
    }
    // Iterate over all the new properties and add any that are not in the old properties.
    for (const key in newProps) {
        if (!(key in oldProps) || (oldProps[key] !== newProps[key])) {
            newAttribute(domElement, key, newProps[key]);
        }
    }
}
/*
 * Update a DOM element based on differences between virtual DOM nodes.
 */
export function updateElement(parent, parentVNode, oldVNode, newVNode, index) {
    // Did we add a new node?
    if ((oldVNode === null) && (newVNode !== null)) {
        if (parentVNode) {
            parentVNode.appendChild(newVNode);
        }
        parent.appendChild(render(newVNode));
        mountVNode(newVNode);
        return;
    }
    // Did we remove an old node?
    if ((oldVNode !== null) && (newVNode === null)) {
        unmountVNode(oldVNode);
        unrender(oldVNode);
        if (parentVNode) {
            parentVNode.removeChild(oldVNode);
        }
        parent.removeChild(parent.childNodes[index]);
        return;
    }
    // Did our node change?
    if (changed(oldVNode, newVNode)) {
        unmountVNode(oldVNode);
        unrender(oldVNode);
        if (parentVNode) {
            parentVNode.replaceChild(newVNode, oldVNode);
        }
        parent.replaceChild(render(newVNode), parent.childNodes[index]);
        mountVNode(newVNode);
        return;
    }
    // If this is a string VNode we can't have anything else to do.
    if (typeof oldVNode === 'string') {
        return;
    }
    // Our new VDOM node is the same as our old VDOM node we need to scan the children
    // and update them.  To keep things sane, don't forget we need to record DOM element
    // in the new VDOM node.
    newVNode.domElement = oldVNode.domElement;
    updateProps(parent.childNodes[index], oldVNode.props, newVNode.props);
    // We iterate backwards to remove any nodes to keep the child lists correct.
    let oldLen = oldVNode.childNodes.length;
    let newLen = newVNode.childNodes.length;
    for (let i = oldLen - 1; i > (newLen - 1); i--) {
        updateElement(parent.childNodes[index], oldVNode, oldVNode.childNodes[i], null, i);
    }
    // We iterate forwards to update and add nodes.  At this point we already know our list of child nodes
    // cannot be longer than our list of new nodes (although they can be the same length).
    if (oldLen > newLen) {
        oldLen = newLen;
    }
    for (let i = 0; i < oldLen; i++) {
        updateElement(parent.childNodes[index], oldVNode, oldVNode.childNodes[i], newVNode.childNodes[i], i);
    }
    // We iterate forwards to update and add nodes.
    for (let i = oldLen; i < newLen; i++) {
        updateElement(parent.childNodes[index], oldVNode, null, newVNode.childNodes[i], i);
    }
}
/**
 * Creates an HTML virtual DOM element.
 * @param type The element type.
 * @param props The properties and attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function h(type, props, ...childNodes) {
    let v = new VDom('html', type, props || {}, []);
    for (let i of childNodes) {
        v.appendChild(i);
    }
    return v;
}
/**
 * Creates an SVG virtual DOM element.
 * @param type The element type.
 * @param props The properties and attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function svg(type, props, ...childNodes) {
    let v = new VDom('svg', type, props || {}, []);
    for (let i of childNodes) {
        v.appendChild(i);
    }
    return v;
}
