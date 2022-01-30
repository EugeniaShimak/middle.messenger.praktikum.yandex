type TCallback = (...args: any[]) => void;

class EventBus {

    listeners: { [event: string]: TCallback[] } = {};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: TCallback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: TCallback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        const indexCallback = this.listeners[event].indexOf(callback)
        if (indexCallback !== -1) {
            this.listeners[event].splice(indexCallback, 1);
        }
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        })
    }
}

export default EventBus;

export const globalEventBus = new EventBus();
