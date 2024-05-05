import {ButtonComponent, enqueueVNodeUpdate} from './dvdi.js';

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    const button = new ButtonComponent({});
    button.parent = app;
    enqueueVNodeUpdate(button);
});
