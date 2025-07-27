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
 * Interface representing the attributes of a virtual DOM node.
 */
interface Attributes {
    [key: string]: any;
}

/**
 * Interface representing the attributes of an HTML virtual DOM node.
 */
interface HTMLAttributes {
    // Data attributes.
    align?: string;
    alt?: string;
    'aria-expanded'?: string;
    'aria-hidden'?: string;
    'aria-label'?: string;
    className?: string;
    datetime?: string;
    disabled?: boolean;
    height?: number | string;
    hidden?: boolean;
    href?: string;
    id?: string;
    name?: string;
    role?: string;
    src?: string;
    style?: string;
    tabIndex?: number;
    type?: string;
    target?: string;
    title?: string;
    value?: string;
    width?: number | string;

    // Event attributes.
    onchange?: (event: Event) => void;
    onclick?: (event: MouseEvent) => void;
    onkeydown?: (event: KeyboardEvent) => void;
    onmouseenter?: (event: MouseEvent) => void;
    onmouseleave?: (event: MouseEvent) => void;
    onresize?: (event: UIEvent) => void;
    onsubmit?: (event: SubmitEvent) => void;
}

/**
 * Interface representing the attributes of an SVG virtual DOM node.
 */
interface SVGAttributes {
    // Data attributes.
    cx?: number;
    cy?: number;
    d?: string;
    fill?: string;
    'fill-opacity'?: number;
    height?: number;
    points?: string;
    preserveAspectRatio?: string;
    r?: number;
    rx?: number;
    ry?: number;
    stroke?: string;
    'stroke-linecap'?: string;
    'stroke-linejoin'?: string;
    'stroke-width'?: number;
    transform?: string;
    version?: string;
    viewBox?: string;
    width?: number;
    x?: number;
    x1?: number;
    x2?: number;
    xmlns?: string;
    'xmlns:xlink'?: string;
    y?: number;
    y1?: number;
    y2?: number;
    zoomAndPan?: string;
}

/**
 * Class representing a virtual DOM node.
 */
export class VNode {
    parentVNode: VNode | null;
    isMounted: boolean;

    /**
     * Create a VNode node.
     */
    constructor() {
        this.parentVNode = null;
        this.isMounted = false;
    }
}

/**
 * Asserts that a given parameter is of type VNode.
 *
 * This function throws an error if the provided parameter is not an instance of VNode,
 * ensuring that it can be safely treated as a VNode in subsequent code.
 *
 * @param {any} v - The parameter to check.
 * @throws {Error} Throws an error if the parameter is not a VNode.
 */
export function assertIsVNode(v: any): asserts v is VNode {
    if (!(v instanceof VNode)) {
        throw new Error(`Not a VNode: ${v}`);
    }
}

/**
 * Class representing a virtual DOM text node.
 */
export class VText extends VNode {
    text: string;

    /**
     * Create a VText node
     * @param text - The text represented by the node.
     */
    constructor(text: string) {
        super();
        this.text = text;
    }
}

/**
 * Type guard function to check if a given VNode is of type VText.
 *
 * @param {VNode} vNode - The VNode to check.
 * @returns {vNode is VText} - Returns true if the vNode is an instance of VText, otherwise false.
 */
export function isVText(vNode: VNode): vNode is VText {
    return vNode instanceof VText;
}

/**
 * Asserts that a given VNode is of type VText.
 *
 * This function throws an error if the provided VNode is not an instance of VText,
 * ensuring that the VNode can be safely treated as a VText in subsequent code.
 *
 * @param {VNode} vNode - The VNode to check.
 * @throws {Error} Throws an error if the VNode is not a VText.
 */
export function assertIsVText(vNode: VNode): asserts vNode is VText {
    if (!(vNode instanceof VText)) {
        throw new Error(`Not a VText ${vNode}`);
    }
}

/**
 * Class representing a virtual DOM element node.
 */
export class VElement extends VNode {
    namespace: string;
    type: string;
    attrs: Attributes;
    childNodes: VNode[];
    domElement: HTMLElement | null;
    mountCallback: (() => void) | null;
    unmountCallback: (() => void) | null;

    /**
     * Create a VElement node.
     *
     * @param namespace - The namespace for the matching DOM element.
     * @param type - The type of the node (e.g., 'div').
     * @param attrs - The attributes of the node.
     * @param childNodes - The child nodes of this node.
     */
    constructor(namespace: string, type: string, attrs: Attributes = {}, childNodes: VNode[] = []) {
        super();
        this.namespace = namespace;
        this.type = type;
        this.attrs = attrs;
        this.childNodes = childNodes;
        this.domElement = null;
        this.mountCallback = null;
        this.unmountCallback = null;
    }

    /**
     * Append a child node.
     *
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
     *
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

/**
 * Type guard function to check if a given VNode is of type VElement.
 *
 * @param {VNode} vNode - The VNode to check.
 * @returns {vNode is VElement} - Returns true if the vNode is an instance of VElement, otherwise false.
 */
export function isVElement(vNode: VNode): vNode is VElement {
    return vNode instanceof VElement;
}

/**
 * Asserts that a given VNode is of type VElement.
 *
 * This function throws an error if the provided VNode is not an instance of VElement,
 * ensuring that the VNode can be safely treated as a VElement in subsequent code.
 *
 * @param {VNode} vNode - The VNode to check.
 * @throws {Error} Throws an error if the VNode is not a VElement.
 */
export function assertIsVElement(vNode: VNode): asserts vNode is VElement {
    if (!(vNode instanceof VElement)) {
        throw new Error(`Not a VElement ${vNode}`);
    }
}

/*
 * Queue to store the updates that need to be applied to the DOM.
 */
const updateQueue: (() => void)[] = [];

/*
 * Function to flush all queued updates in a single step.
 */
function flushUpdates() {
    while (updateQueue.length) {
        const update = updateQueue.shift();
        if (update) update();
    }
}

/*
 * Function to schedule an update to be executed in the next animation frame.
 */
function scheduleUpdate(update: () => void) {
    updateQueue.push(update);

    // If the page is hidden then don't attempt to schedule an update.
    if (document.hidden) {
        flushUpdates();
        return;
    }

    if (updateQueue.length == 1) {
        requestAnimationFrame(flushUpdates);
    }
}

/*
 * Mount a virtual DOM node.
 */
function mountVNode(vNode: VNode) {
    if (isVText(vNode)) {
        return;
    }

    assertIsVElement(vNode);
    if ((vNode.mountCallback !== null) && !vNode.isMounted) {
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
function unmountVNode(vNode: VNode) {
    if (isVText(vNode)) {
        return;
    }

    assertIsVElement(vNode);
    if ((vNode.unmountCallback !== null) && vNode.isMounted) {
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
        domElement.addEventListener(key.substring(2), value);
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
        domElement.removeEventListener(key.substring(2), value);
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
    if (isVText(vNode)) {
        const domElement = document.createTextNode(vNode.text);
        return domElement;
    }

    assertIsVElement(vNode);
    const {namespace, type, attrs, childNodes} = vNode;
    const domElement = document.createElementNS(
        namespaces[namespace as keyof typeof namespaces],
        type
    ) as HTMLElement;
    vNode.domElement = domElement;

    for (const key in attrs) {
        newAttribute(domElement, key, attrs[key]);
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
    if (isVText(vNode)) {
        return;
    }

    assertIsVElement(vNode);
    const {attrs, childNodes, domElement} = vNode;
    const len = childNodes.length;
    for (let i = len - 1; i >= 0; i--) {
        const vn = childNodes[i];
        vNode.removeChild(vn);
        unrender(vn);
    }

    for (const key in attrs) {
        deleteAttribute(domElement as HTMLElement, key, attrs[key]);
    }

    vNode.domElement = null;
}

/*
 * Check if two virtual DOM nodes are different enough to replace one with the other.
 */
function changed(vNode1: VNode, vNode2: VNode): boolean {
    // Are our nodes of different types?
    if (isVText(vNode1) !== isVText(vNode2)) {
        return true;
    }

    // Do we have 2 strings?  If we do then just compare them
    if (isVText(vNode1)) {
        assertIsVText(vNode2);
        return vNode1.text !== vNode2.text;
    }

    // We have two elements.
    assertIsVElement(vNode1);
    assertIsVElement(vNode2);
    if (vNode1.namespace !== vNode2.namespace) {
        return true;
    }

    if (vNode1.type !== vNode2.type) {
        return true;
    }

    return (vNode1.childNodes.length !== vNode2.childNodes.length);
}

/*
 * Update the attributes of a DOM element.
 */
function updateAttributes(domElement: HTMLElement, oldAttrs: Attributes, newAttrs: Attributes) {
    // Iterate over all the old attributes and remove any that are not in the new attributes.
    for (const key in oldAttrs) {
        if (!(key in newAttrs) || (oldAttrs[key] !== newAttrs[key])) {
            deleteAttribute(domElement, key, oldAttrs[key]);
        }
    }

    // Iterate over all the new attributes and add any that are not in the old attributes.
    for (const key in newAttrs) {
        if (!(key in oldAttrs) || (oldAttrs[key] !== newAttrs[key])) {
            newAttribute(domElement, key, newAttrs[key]);
        }
    }

    // Reset the properties of the DOM element to defaults.
    if (domElement.tagName === 'INPUT') {
        const inputElement = domElement as HTMLInputElement;
        if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
            inputElement.checked = inputElement.defaultChecked;
        } else {
            inputElement.value = inputElement.defaultValue;
        }
    } else if (domElement.tagName === 'TEXTAREA') {
        const textAreaElement = domElement as HTMLTextAreaElement;
        textAreaElement.value = textAreaElement.defaultValue;
    } else if (domElement.tagName === 'SELECT') {
        const selectElement = domElement as HTMLSelectElement;
        selectElement.selectedIndex = selectElement.options.selectedIndex;
    }
}

/*
 * Update a DOM element based on differences between virtual DOM nodes.
 */
export function updateElement(
    parent: HTMLElement,
    child: Node | null,
    parentVNode: VElement | null,
    oldChildVNode: VNode | null,
    newChildVNode: VNode | null
) {
    // Did we add a new node?
    if ((oldChildVNode === null) && (newChildVNode !== null)) {
        if (parentVNode) {
            parentVNode.appendChild(newChildVNode);
        }

        scheduleUpdate(() => {
            parent.appendChild(render(newChildVNode));
            mountVNode(newChildVNode);
        });
        return;
    }

    // Did we remove an old node?
    if ((oldChildVNode !== null) && (newChildVNode === null)) {
        scheduleUpdate(() => {
            unmountVNode(oldChildVNode);
            unrender(oldChildVNode);
            if (parentVNode) {
                parentVNode.removeChild(oldChildVNode);
            }

            parent.removeChild(child as Node);
        });
        return;
    }

    // Did our node change?
    assertIsVNode(oldChildVNode);
    assertIsVNode(newChildVNode);
    if (changed(oldChildVNode, newChildVNode)) {
        scheduleUpdate(() => {
            unmountVNode(oldChildVNode);
            unrender(oldChildVNode);
            if (parentVNode) {
                parentVNode.replaceChild(newChildVNode, oldChildVNode);
            }

            parent.replaceChild(render(newChildVNode), child as Node);
            mountVNode(newChildVNode);
        });
        return;
    }

    // If this is a string VNode we can't have anything else to do.
    if (isVText(oldChildVNode)) {
        return;
    }

    // Update our child nodes.
    assertIsVElement(oldChildVNode);
    assertIsVElement(newChildVNode);
    newChildVNode.domElement = oldChildVNode.domElement;

    scheduleUpdate(() => {
        updateAttributes(oldChildVNode.domElement as HTMLElement, oldChildVNode.attrs, newChildVNode.attrs);
    });

    let len = oldChildVNode.childNodes.length;
    for (let i = 0; i < len; i++) {
        const nextParent = oldChildVNode.domElement as HTMLElement;
        updateElement(nextParent,
            nextParent.childNodes[i],
            oldChildVNode,
            oldChildVNode.childNodes[i],
            newChildVNode.childNodes[i]
        );
    }
}

/**
 * Creates an HTML virtual DOM element.
 *
 * @param type The element type.
 * @param attrs The attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function h(type: string, attrs?: HTMLAttributes, ...childNodes: (VNode | string)[]): VElement {
    let v = new VElement('html', type, attrs || {}, [])
    for (let i of childNodes) {
        if (typeof i === 'string') {
            v.appendChild(new VText(i));
        } else {
            v.appendChild(i);
        }
    }

    return v;
}

/**
 * Creates an SVG virtual DOM element.
 *
 * @param type The element type.
 * @param attrs The attributes of the element.
 * @param childNodes The child elements or strings.
 * @returns A virtual DOM element.
 */
export function svg(type: string, attrs?: SVGAttributes, ...childNodes: (VNode | string)[]): VElement {
    let v = new VElement('svg', type, attrs || {}, [])
    for (let i of childNodes) {
        if (typeof i === 'string') {
            v.appendChild(new VText(i));
        } else {
            v.appendChild(i);
        }
    }

    return v;
}
