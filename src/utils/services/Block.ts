import EventBus from './EventBus';
import {v4 as uuidv4} from 'uuid';

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    _element: Element | HTMLElement| HTMLFormElement| null = null;
    _meta: {
        tagName: string,
        props?: object,
    } = {
        tagName: 'div'
    };
    props: any = {};
    eventBus: any;
    _id: string;

    constructor(tagName = 'div', props: any) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };
        const {settings} = props;
        if (settings && settings.withInternalID) {
            this._id = uuidv4();
        }

        this.props = this._makePropsProxy({...props, __id: this._id});

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    getId() {
        return this._id;
    }

    getEvents() {
        const {events = {}} = this.props;
        return events;
    }

    _registerEvents(eventBus: any) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount(oldProps: object) {
        this.componentDidMount(oldProps);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(_oldProps: object) {
        return;
    }

    async _componentDidUpdate(oldProps: object, newProps: object) {
        const response = await this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    async componentDidUpdate(_oldProps: any, _newProps: any) {
        return true;
    }

    setProps = (nextProps: object) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    _addEvents() {
        const {events = {}, settings} = this.props;

        Object.keys(events).forEach(eventName => {
            if (settings && settings.eventsToChild && this._element?.firstChild) {
                this._element?.firstChild.addEventListener(eventName, events[eventName]);
            } else {
                this._element?.addEventListener(eventName, events[eventName]);
            }
        });
    }

    _addAttributes() {
        const {attributes = {}} = this.props;
        Object.keys(attributes).forEach(key => {
            this._element?.setAttribute(key, attributes[key]);
        });
    }

    _addClasses() {
        const {classes = []} = this.props;
        classes.forEach((className: string) => {
            this._element?.classList.add(className);
        });
    }


    _removeEvents() {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _removeAttributes() {
        const {attributes = {}} = this.props;

        Object.keys(attributes).forEach(key => {
            this._element?.removeAttribute(key);
        });
    }

    _removeClasses() {
        const {classes = []} = this.props;
        classes.forEach((className: string) => {
            this._element?.classList.remove(className);
        });
    }

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        this._removeEvents();
        this._removeClasses();
        this._removeAttributes();
        if (this._element) {
            this._element.innerHTML = block;
            this._addEvents();
            this._addClasses();
            this._addAttributes();
            this._replaceChildNodesToNodesWithEvents();
        }
    }

    _replaceChildNodesToNodesWithEvents() {
        const childElements = this._getChildElements();
        childElements.forEach((elem: {
            id: string,
            node: Node,
        }) => {
            const element = this._element?.querySelector(`[data-id='${elem.id}']`);
            if (element) {
                const parentElement = element.parentElement;
                parentElement?.replaceChild(elem.node, element);
            }
        })
    }

    _getChildElements() {
        const childElements: object[] = [];

        const addBlockToChildElements = (block: Block, elements: object[] = []) => {
            const idElement = block.getId();
            elements.push({
                id: idElement,
                node: block.getContent(),
            })
        }
        for (const propsKey in this.props) {
            if (Array.isArray(this.props[propsKey]) && this.props[propsKey][0] instanceof Block) {
                this.props[propsKey].forEach((item: Block) => {
                    addBlockToChildElements(item, childElements);
                })
            }
            if (this.props[propsKey] instanceof Block) {
                addBlockToChildElements(this.props[propsKey], childElements);
            }
        }
        return childElements;
    }

    render() {
        return '';
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: object) {
        return new Proxy(props, {
            get: (target: any, prop: string) => {
                const value = target[prop];
                return (typeof value === 'function') ? value.bind(target) : value;
            },
            set: (target: any, prop: string, val) => {
                if (target[prop] !== val) {
                    const oldProps = {...target};
                    target[prop] = val;
                    this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...oldProps}, target);
                }
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        if (this._id) {
            element.setAttribute('data-id', this._id);
        }
        return element;
    }

    show() {
        const content = this.getContent();
        content?.classList.remove('hidden');
    }

    hide() {
        const content = this.getContent();
        content?.classList.add('hidden');
    }
}

export default Block;
