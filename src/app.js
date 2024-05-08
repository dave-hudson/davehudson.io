import {ButtonComponent, Component, enqueueVNodeUpdate, h} from './dvdi.js';
import './obsi.js';

// Example usage
//document.addEventListener('DOMContentLoaded', () => {
//    const app = document.querySelector('#app');
//    const button = new ButtonComponent({});
//    button.parent = app;
//    enqueueVNodeUpdate(button);
//});

export class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.button = new ButtonComponent();
    }

    renderVDom() {
        return h('div', null,
            h('h1', null, 'Home Page'),
            this.button.renderVDom(),
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

function clearPageContent(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const routes = {
    '/': HomePageComponent,
    '/about': AboutPageComponent
};

function handleLocation() {
    const app = document.querySelector('#app');
    clearPageContent(app);
    const path = window.location.pathname;
    const Component = routes[path] || NotFoundComponent;
    const componentInstance = new Component();
    componentInstance.parent = app;
    enqueueVNodeUpdate(componentInstance);
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