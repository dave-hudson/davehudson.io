import {enqueueVNodeUpdate, updateDomElement, renderDomFromVNode, h} from './dvdi.js';
import './obsi.js';

// Example usage
//document.addEventListener('DOMContentLoaded', () => {
//    const app = document.querySelector('#app');
//    const button = new ButtonComponent({});
//    button.parent = app;
//    enqueueVNodeUpdate(button);
//});


/**
 * Represents a UI component with state and props.
 */
export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.currentVNode = null;
        this.parent = undefined;
    }

    /**
     * Sets the state of the component, triggering a re-render if necessary.
     * @param {Object} newState The new state object.
     */
    setState(newState) {
        if (!shallowEqual(this.state, newState)) {
            this.state = { ...this.state, ...newState };
            enqueueVNodeUpdate(this);
        }
    }

    /**
     * Updates the component by re-rendering its virtual DOM and applying any changes.
     */
    updateVDom() {
        const newVNode = this.renderVDom();
        updateDomElement(this.parent, newVNode, this.currentVNode);
        this.currentVNode = newVNode;
    }

    renderVDom() {
        // Overridden by subclass
    }
}

export class ButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };  // Initialize state with count
    }

    renderVDom() {
        return h('button', {
            onClick: () => this.handleClick(),
            style: { fontSize: '16px', padding: '10px 20px', cursor: 'pointer' }
        }, `Click me: ${this.state.count} times`);
    }

    handleClick() {
        this.setState({ count: this.state.count + 1 });
    }
}
export class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.button = new ButtonComponent();
    }

    renderVDom() {
        return h('div', null,
            h('h1', null, 'Home Page'),
//            this.button.renderVDom(),
            h('a', { href: '/about', onClick: () => navigate('/about') }, 'About')
        );
    }
}

export class AboutPageComponent extends Component {
    constructor(props) {
        super(props);
    }

    renderVDom() {
        return h('div', null,
            h('h1', null, 'About Page'),
            h('a', { href: '/', onClick: () => navigate('/') }, 'Home')
        );
    }
}

export class NotFoundComponent extends Component {
    constructor(props) {
        super(props);
    }

    renderVDom() {
        return h('div', null,
            h('h1', null, 'Page Not Found 404'),
            h('a', { href: '/', onClick: () => navigate('/') }, 'Home')
        );
    }
}

function homePage() {
    return h('div', null,
        h('h1', null, 'Home Page'),
        h('a', { href: '/about', onClick: () => navigate('/about') }, 'About')
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

function clearPageContent(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const routes = {
    '/': homePage,
    '/about': aboutPage
};

function handleLocation() {
    const app = document.querySelector('#app');
    clearPageContent(app);
    const path = window.location.pathname;
    const pageFunction = routes[path] || notFoundPage;
    let pageVDom = pageFunction()
    renderDomFromVNode(app, pageVDom)
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