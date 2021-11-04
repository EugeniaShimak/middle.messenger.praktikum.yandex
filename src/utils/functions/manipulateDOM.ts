import Handlebars from 'handlebars';
import Block from '../services/Block';
import {THTMLElementEventInputOrTextArea, TObjectStrings} from '../interfaces';

export const renderDOM = (query: string, block: Block) => {
    const root = document.querySelector(query);
    if (root) {
        const content = (<Node>block?.getContent())
        root.appendChild(content);
    }
    return root;
}

export const compileHandlebars = (tmpl: string, props: object) => {
    return Handlebars.compile(tmpl)(props);
}

export const getValueAndNameTarget = (event: THTMLElementEventInputOrTextArea) => {
    return {
        value: event.target.value,
        name: event.target.name
    }
}

export const getContentFromComponentProps = (props: any) => {
    const parsedProps = {...props};
    Object.keys(props).forEach(key => {
        if (props[key] && props[key] instanceof Block) {
            parsedProps[key] = props[key].getContent().outerHTML
        }
    });
    return parsedProps;
}

export const getValuesByForm = (form: HTMLFormElement | null) => {
    const obj: TObjectStrings = {};
    if (form) {
        const elements = form.elements;
        for (let i = 0; i < elements.length; i++) {
            const elem = (<HTMLInputElement | HTMLTextAreaElement>elements[i]);
            if (!['submit', 'button'].includes(elem.type)) {
                obj[elem.name] = elem.value;
            }
        }
    }
    return obj;
}
