import {renderDOM} from '../functions/manipulateDOM';
import Block from '../services/Block';

export default class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: null | Block;
    private _props: any;

    constructor(pathname: string, view: any, props: object) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (this._blockClass && this._props && this._props.propsBlock) {
            this._block = new this._blockClass(this._props.propsBlock);
            renderDOM(this._props.rootQuery, this._block);
            return;
        }
    }
}