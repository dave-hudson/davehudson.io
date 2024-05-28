/**
 * @fileoverview A simple reactive state management system inspired by MobX, with observables,
 * computed values, reactions, and basic garbage collection.
 */
let currentTracker = null;
const updateQueue = new Set();


/**
 * Enqueues updates and executes them in a batch using requestAnimationFrame.
 * @param {Function} update The update function to enqueue.
 */
function enqueueUpdate(update) {
    updateQueue.add(update);
    if (updateQueue.size === 1) {
        requestAnimationFrame(runUpdates);
    }
}

/**
 * Runs all updates that have been enqueued.
 */
function runUpdates() {
    updateQueue.forEach(update => update());
    updateQueue.clear();
}

/**
 * Represents a reactive observable value.
 */
class Observable {
    /**
     * Creates an instance of Observable.
     * @param {*} value The initial value of the observable.
     */
    constructor(value) {
        this._value = value;
        this._listeners = new Set();
    }

    /**
     * Gets the current value of the observable.
     * @returns {*} The current value.
     */
    get value() {
        if (currentTracker) {
            this._listeners.add(currentTracker);
        }
        return this._value;
    }

    /**
     * Sets a new value for the observable and notifies listeners if the value has changed.
     * @param {*} newValue The new value to set.
     */
    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this._listeners.forEach(listener => enqueueUpdate(listener));
        }
    }

    /**
     * Subscribes a listener to changes in the observable.
     * @param {Function} listener The function to call when the value changes.
     * @returns {Function} A function to unsubscribe the listener.
     */
    subscribe(listener) {
        this._listeners.add(listener);
        return () => {
            this._listeners.delete(listener);
        };
    }
}

/**
 * Represents a value derived from one or more observables.
 */
class Computed {
    /**
     * Creates an instance of Computed.
     * @param {Function} computeFunction The function used to compute the value.
     */
    constructor(computeFunction) {
        this._computeFunction = computeFunction;
        this._value = undefined;
        this._listeners = new Set();
        this._computed = false;
        this.compute();
    }

    get value() {
        if (currentTracker) {
            this._listeners.add(currentTracker);
        }

        if (!this._computed) {
            this.compute();
        }

        return this._value;
    }

    /**
     * Computes the value by calling the compute function and updates listeners if the value has changed.
     */
    compute() {
        if (this._computed) {
            return;
        }

        currentTracker = this.update.bind(this);
        const newValue = this._computeFunction();
        currentTracker = null;
        this._computed = true;

        if (newValue !== this._value) {
            this._value = newValue;
            console.log(`${newValue}`)
            this._listeners.forEach(listener => enqueueUpdate(listener));
        }
    }

    /**
     * Subscribes a listener to changes in the computed value.
     * @param {Function} listener The function to call when the value changes.
     * @returns {Function} A function to unsubscribe the listener.
     */
    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    /**
     * Updates the computed value by recomputing.
     */
    update() {
        this._computed = false;
        this.compute();
    }
}

/**
 * Automatically runs a reaction function whenever observable dependencies change.
 * @param {Function} reactionFunction The function to execute reactively.
 * @returns {Function} A function to unsubscribe the reaction.
 */
function autorun(reactionFunction) {
    const executeReaction = () => {
        currentTracker = executeReaction;
        reactionFunction();
        currentTracker = null;
    };

    enqueueUpdate(executeReaction);
}

// Usage example: see documentation for examples on setting up observables and computed values.

// Assume the classes Observable, Computed, and the function autorun from the previous code are available.

// Create observables for price and tax rate.
const price = new Observable(100);  // Initial price is 100
const taxRate = new Observable(0.15);  // 15% tax rate

// Create a computed value that calculates the total cost including tax.
const totalCost = new Computed(() => {
    return price.value + (price.value * taxRate.value);
});

// Subscribe to changes in the total cost and log them.
totalCost.subscribe(() => {
    console.log(`The total cost is now: ${totalCost.value.toFixed(2)}`);
});

// Set up an autorun to monitor changes and log specific updates.
autorun(() => {
    console.log(`Price: ${price.value}, Tax Rate: ${taxRate.value * 100}%`);
});

// Now let's make some changes to see the reactive system in action.
console.log('Initial total cost:', totalCost.value.toFixed(2));  // Should log the initial total cost

price.value = 200;  // Update price
taxRate.value = 0.20;  // Update tax rate

// Further changes
setTimeout(() => {
    price.value = 150;  // This will trigger the computation and logging again
}, 1000);

setTimeout(() => {
    taxRate.value = 0.18;  // This will also trigger updates
}, 2000);
