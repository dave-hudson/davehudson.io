import {jest} from '@jest/globals';

// __tests__/createElement.test.js
import { h, ButtonComponent } from '../src/dvdi.js';

describe('h', () => {
    it('creates a virtual DOM element', () => {
      const element = h('div', { id: 'test' }, 'Hello');
      expect(element).toEqual({
        type: 'div',
        props: { id: 'test' },
        children: ['Hello']
      });
    });
  });
  
  describe('ButtonComponent', () => {
    let buttonComponent;
  
    // Setup a new button component for each test to prevent test coupling
    beforeEach(() => {
      buttonComponent = new ButtonComponent({});
      buttonComponent.parent = document.createElement('div'); // Mock parent element
    });
  
    it('initializes with count 0', () => {
      expect(buttonComponent.state.count).toBe(0);
    });
  
    it('increments count on button click', () => {
      // Assuming handleClick is the method called on click
      buttonComponent.handleClick();
      expect(buttonComponent.state.count).toBe(1);
    });
  
    it('renders correctly based on the count', () => {
      // Call render and check the resulting virtual DOM
      const renderedOutput = buttonComponent.render();
      expect(renderedOutput.children.includes('Click me: 0 times')).toBeTruthy();
  
      // Simulate a click and check rendering again
      buttonComponent.handleClick();
      const updatedOutput = buttonComponent.render();
      expect(updatedOutput.children.includes('Click me: 1 times')).toBeTruthy();
    });
  });
