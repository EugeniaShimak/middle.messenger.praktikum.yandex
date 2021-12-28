import {store, Store} from '../utils/store/Store';

export class Controller {
    public store: Store;

    constructor() {
        this.store = store;
    }
}