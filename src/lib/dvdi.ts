/*
 * Various different namespaces that can be used in the DOM.
 */
const namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    html: 'http://www.w3.org/1999/xhtml',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/xmlns/'
}

/**
 * Interface representing the properties of a virtual DOM node.
 */
interface Props {
    [key: string]: any;
}

/**
 * Class representing a virtual DOM node.
 */
export class VDom {
    namespace: string;
    type: string;
    props: Props;
    parentVNode: VDom | null;
    childNodes: (VDom | string)[];
    domElement: HTMLElement | Text | null;
    isMounted: boolean;
    mountCallback: (() => void) | null;
    unmountCallback: (() => void) | null;

    /**
     * Create a VDom node.
     * @param namespace - The namespace for the matching DOM element.
     * @param type - The type of the node (e.g., 'div').
     * @param props - The properties and attributes of the node.
     * @param childNodes - The child nodes of this node.
     */
    constructor(namespace: string, type: string, props: Props = {}, childNodes: (VDom | string)[] = []) {
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
    appendChild(vNode: VDom | string) {
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
    removeChild(vNode: VDom | string) {
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
    replaceChild(newVNode: VDom | string, oldVNode: VDom | string) {
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
function mountVNode(vNode: VDom | string) {
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
function unmountVNode(vNode: VDom | string) {
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
function newAttribute(domElement: HTMLElement, key: string, value: any) {
    if (key.startsWith('on')) {
        domElement.addEventListener(key.substring(2).toLowerCase(), value);
        return;
    }

    if (key === 'className') {
        domElement.className = value;
        return;
    }

    const [prefix, ...unqualifiedName] = key.split(':');
    let ns: string | null = null;
    if (prefix === 'xmlns' || unqualifiedName.length && namespaces[prefix as keyof typeof namespaces]) {
        ns = namespaces[prefix as keyof typeof namespaces];
    }

    domElement.setAttributeNS(ns, key, String(value));
}

/*
 * Remove an attribute from a DOM element.
 */
function deleteAttribute(domElement: HTMLElement, key: string, value: any) {
    if (key.startsWith('on')) {
        domElement.removeEventListener(key.substring(2).toLowerCase(), value);
        return;
    }

    if (key == 'className') {
        domElement.className = '';
        return;
    }

    const [prefix, ...unqualifiedName] = key.split(':');
    let ns: string | null = null;
    if (prefix === 'xmlns' || unqualifiedName.length && namespaces[prefix as keyof typeof namespaces]) {
        ns = namespaces[prefix as keyof typeof namespaces];
    }

    domElement.removeAttributeNS(ns, key);
}

/*
 * Render a virtual DOM node into a real DOM node.
 */
function render(vNode: VDom | string): HTMLElement | Text {
    if (typeof vNode === 'string') {
        const domElement = document.createTextNode(vNode);
        return domElement;
    }

    const { namespace, type, props, childNodes } = vNode;
    const domElement = document.createElementNS(namespaces[namespace as keyof typeof namespaces], type) as HTMLElement;
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
function unrender(vNode: VDom | string) {
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
        deleteAttribute(domElement as HTMLElement, key, props[key]);
    }

    vNode.domElement = null;
}

/*
 * Check if two virtual DOM nodes are different.
 */
function changed(vnode1: VDom | string, vnode2: VDom | string): boolean {
    return typeof vnode1 !== typeof vnode2 ||
            (typeof vnode1 === 'string' && (vnode1 !== vnode2)) ||
            (typeof vnode1 !== 'string' && typeof vnode2 !== 'string' && (vnode1.namespace !== vnode2.namespace)) ||
            (vnode1 as VDom).type !== (vnode2 as VDom).type;
}

/*
 * Update the properties of a DOM element.
 */
function updateProps(domElement: HTMLElement, oldProps: Props, newProps: Props) {
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
export function updateElement(parent: HTMLElement, parentVNode: VDom | null, oldVNode: VDom | string | null, newVNode: VDom | string | null, index: number) {
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
    if (changed(oldVNode as VDom | string, newVNode as VDom | string)) {
        unmountVNode(oldVNode as VDom | string);
        unrender(oldVNode as VDom | string);
        if (parentVNode) {
            parentVNode.replaceChild(newVNode as VDom | string, oldVNode as VDom | string);
        }

//        console.log(parent.childNodes[index], (oldVNode as VDom).domElement);
        parent.replaceChild(render(newVNode as VDom | string), parent.childNodes[index]);
        mountVNode(newVNode as VDom | string);
        return;
    }

    // If this is a string VNode we can't have anything else to do.
    if (typeof oldVNode === 'string') {
        return;
    }

    // Our new VDOM node is the same as our old VDOM node we need to scan the children
    // and update them.  To keep things sane, don't forget we need to record DOM element
    // in the new VDOM node.
    (newVNode as VDom).domElement = (oldVNode as VDom).domElement;
    updateProps((oldVNode as VDom).domElement as HTMLElement, (oldVNode as VDom).props, (newVNode as VDom).props);

    // We iterate backwards to remove any nodes to keep the child lists correct.
    let oldLen = (oldVNode as VDom).childNodes.length;
    let newLen = (newVNode as VDom).childNodes.length;
    for (let i = oldLen - 1; i > (newLen - 1); i--) {
        updateElement((oldVNode as VDom).domElement as HTMLElement, oldVNode as VDom, (oldVNode as VDom).childNodes[i], null, i);
    }

    // We iterate forwards to update and add nodes.  At this point we already know our list of child nodes
    // cannot be longer than our list of new nodes (although they can be the same length).
    if (oldLen > newLen) {
        oldLen = newLen;
    }

    for (let i = 0; i < oldLen; i++) {
        updateElement((oldVNode as VDom).domElement as HTMLElement, oldVNode as VDom, (oldVNode as VDom).childNodes[i], (newVNode as VDom).childNodes[i], i);
    }

    // We iterate forwards to update and add nodes.
    for (let i = oldLen; i < newLen; i++) {
        updateElement((oldVNode as VDom).domElement as HTMLElement, oldVNode as VDom, null, (newVNode as VDom).childNodes[i], i);
    }
}

/**
 * Creates an HTML virtual DOM element.
 * @param type The element type.
 * @param props The properties and attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function h(type: string, props?: Props, ...childNodes: (VDom | string)[]): VDom {
    let v = new VDom('html', type, props || {}, [])
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
export function svg(type: string, props?: Props, ...childNodes: (VDom | string)[]): VDom {
    let v = new VDom('svg', type, props || {}, [])
    for (let i of childNodes) {
        v.appendChild(i);
    }

    return v;
}

