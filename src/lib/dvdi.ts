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
export class VNode {
    parentVNode: VNode | null;

    /**
     * Create a VNode node.
     * @param namespace - The namespace for the matching DOM element.
     * @param type - The type of the node (e.g., 'div').
     * @param props - The properties and attributes of the node.
     * @param childNodes - The child nodes of this node.
     */
    constructor() {
        this.parentVNode = null;
    }
}

export class VText extends VNode {
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }
}

export class VElement extends VNode {
    namespace: string;
    type: string;
    props: Props;
    childNodes: VNode[];
    domElement: HTMLElement | null;
    isMounted: boolean;
    mountCallback: (() => void) | null;
    unmountCallback: (() => void) | null;

    /**
     * Create a VElement node.
     * @param namespace - The namespace for the matching DOM element.
     * @param type - The type of the node (e.g., 'div').
     * @param props - The properties and attributes of the node.
     * @param childNodes - The child nodes of this node.
     */
    constructor(namespace: string, type: string, props: Props = {}, childNodes: VNode[] = []) {
        super();
        this.namespace = namespace;
        this.type = type;
        this.props = props;
        this.childNodes = childNodes;
        this.domElement = null;
        this.isMounted = false;
        this.mountCallback = null;
        this.unmountCallback = null;
    }

    /**
     * Append a child node.
     * @param vElement - The child node to append.
     */
    appendChild(vNode: VNode) {
        this.childNodes.push(vNode);
        vNode.parentVNode = this;
    }

    /**
     * Remove a child node.
     * @param vNode - The child node to remove.
     */
    removeChild(vNode: VNode) {
        const index = this.childNodes.indexOf(vNode);
        this.childNodes = this.childNodes.slice(0, index).concat(this.childNodes.slice(index + 1));
        vNode.parentVNode = null;
    }

    /**
     * Replace an old child node with a new one.
     * @param newVNode - The new child node.
     * @param oldVNode - The old child node to replace.
     */
    replaceChild(newVNode: VNode, oldVNode: VNode) {
        const index = this.childNodes.indexOf(oldVNode);
        this.childNodes[index] = newVNode;
        newVNode.parentVNode = this;
        oldVNode.parentVNode = null;
    }
}

/*
 * Mount a virtual DOM node.
 */
function mountVNode(vNode: VNode) {
    if (vNode instanceof VText) {
        return;
    }

    const ve = vNode as VElement;
    if ((ve.mountCallback !== null) && !ve.isMounted) {
        ve.mountCallback();
    }

    (vNode as VElement).isMounted = true;

    for (let i of (vNode as VElement).childNodes) {
        mountVNode(i);
    }
}

/*
 * Unmount a virtual DOM node.
 */
function unmountVNode(vNode: VNode) {
    if (vNode instanceof VText) {
        return;
    }

    const ve = vNode as VElement;
    if ((ve.unmountCallback !== null) && ve.isMounted) {
        ve.unmountCallback();
    }

    (vNode as VElement).isMounted = false;

    for (let i of (vNode as VElement).childNodes) {
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
function render(vNode: VNode): Node {
    if (vNode instanceof VText) {
        const domElement = document.createTextNode((vNode as VText).text);
        return domElement;
    }

    const { namespace, type, props, childNodes } = vNode as VElement;
    const domElement = document.createElementNS(namespaces[namespace as keyof typeof namespaces], type) as HTMLElement;
    (vNode as VElement).domElement = domElement;

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
function unrender(vNode: VNode) {
    if (vNode instanceof VText) {
        return;
    }

    const { props, childNodes, domElement } = vNode as VElement;
    const len = childNodes.length;
    for (let i = len - 1; i >= 0; i--) {
        const vn = childNodes[i];
        (vNode as VElement).removeChild(vn);
        unrender(vn);
    }

    for (const key in props) {
        deleteAttribute(domElement as HTMLElement, key, props[key]);
    }

    (vNode as VElement).domElement = null;
}

/*
 * Check if two virtual DOM nodes are different.
 */
function changed(vnode1: VNode, vnode2: VNode): boolean {
    // Are our nodes of different types?
    if ((vnode1 instanceof VText) !== (vnode2 instanceof VText)) {
        return true;
    }

    // Do we have 2 strings?  If we do then just compare them
    if (vnode1 instanceof VText) {
        return (vnode1 as VText).text !== (vnode2 as VText).text;
    }

    // We have two elements.
    if ((vnode1 as VElement).namespace !== (vnode2 as VElement).namespace) {
        return true;
    }

    return (vnode1 as VElement).type !== (vnode2 as VElement).type;
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
export function updateElement(parent: HTMLElement, child: Node | null, parentVNode: VElement | null, oldChildVNode: VNode | null, newChildVNode: VNode | null) {
    // Did we add a new node?
    if ((oldChildVNode === null) && (newChildVNode !== null)) {
        if (parentVNode) {
            parentVNode.appendChild(newChildVNode);
        }

        parent.appendChild(render(newChildVNode));
        mountVNode(newChildVNode);
        return;
    }

    // Did we remove an old node?
    if ((oldChildVNode !== null) && (newChildVNode === null)) {
        unmountVNode(oldChildVNode);
        unrender(oldChildVNode);
        if (parentVNode) {
            parentVNode.removeChild(oldChildVNode);
        }

        parent.removeChild(child as Node);
        return;
    }

    // Did our node change?
    if (changed(oldChildVNode as VNode, newChildVNode as VNode)) {
        unmountVNode(oldChildVNode as VNode);
        unrender(oldChildVNode as VNode);
        if (parentVNode) {
            parentVNode.replaceChild(newChildVNode as VNode, oldChildVNode as VNode);
        }

        parent.replaceChild(render(newChildVNode as VNode), child as Node);
        mountVNode(newChildVNode as VNode);
        return;
    }

    // If this is a string VNode we can't have anything else to do.
    if (oldChildVNode instanceof VText) {
        return;
    }

    // Our new VDOM node is the same as our old VDOM node we need to scan the children
    // and update them.  To keep things sane, don't forget we need to record DOM element
    // in the new VDOM node.
    (newChildVNode as VElement).domElement = (oldChildVNode as VElement).domElement;
    updateProps((oldChildVNode as VElement).domElement as HTMLElement, (oldChildVNode as VElement).props, (newChildVNode as VElement).props);

    // We iterate backwards to remove any nodes to keep the child lists correct.
    let oldLen = (oldChildVNode as VElement).childNodes.length;
    let newLen = (newChildVNode as VElement).childNodes.length;
    for (let i = oldLen - 1; i > (newLen - 1); i--) {
        const nextParent = (oldChildVNode as VElement).domElement as HTMLElement;
        updateElement(nextParent, nextParent.childNodes[i], oldChildVNode as VElement, (oldChildVNode as VElement).childNodes[i], null);
    }

    // We iterate forwards to update and add nodes.  At this point we already know our list of child nodes
    // cannot be longer than our list of new nodes (although they can be the same length).
    if (oldLen > newLen) {
        oldLen = newLen;
    }

    for (let i = 0; i < oldLen; i++) {
        const nextParent = (oldChildVNode as VElement).domElement as HTMLElement;
        updateElement(nextParent, nextParent.childNodes[i], oldChildVNode as VElement, (oldChildVNode as VElement).childNodes[i], (newChildVNode as VElement).childNodes[i]);
    }

    // We iterate forwards to update and add nodes.
    for (let i = oldLen; i < newLen; i++) {
        const nextParent = (oldChildVNode as VElement).domElement as HTMLElement;
        updateElement(nextParent, nextParent.childNodes[i], oldChildVNode as VElement, null, (newChildVNode as VElement).childNodes[i]);
    }
}

/**
 * Creates an HTML virtual DOM element.
 * @param type The element type.
 * @param props The properties and attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function h(type: string, props?: Props, ...childNodes: (VNode | string)[]): VElement {
    let v = new VElement('html', type, props || {}, [])
    for (let i of childNodes) {
        if (typeof i === 'string') {
            v.appendChild(new VText(i));
        } else {
            v.appendChild(i as VNode);
        }
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
export function svg(type: string, props?: Props, ...childNodes: (VNode | string)[]): VElement {
    let v = new VElement('svg', type, props || {}, [])
    for (let i of childNodes) {
        if (typeof i === 'string') {
            v.appendChild(new VText(i));
        } else {
            v.appendChild(i as VNode);
        }
    }

    return v;
}
