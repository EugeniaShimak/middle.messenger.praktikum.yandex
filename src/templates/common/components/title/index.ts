import Block from "../../../../utils/services/Block";
import {titleTmpl} from "./title.tmpl";
import {compileHandlebars} from "../../../../utils/functions/manipulateDOM";

interface ITitle {
    tag?: string,
    title?: string
}

export default class Title extends Block {
    constructor(props: ITitle) {
        super("div", {
            ...props,
            classes: ['title']
        });
    }

    render() {
        return compileHandlebars(titleTmpl, this.props);
    }
}