import Block from "../../../../utils/services/Block";
import {buttonTmpl} from "./button.tmpl";
import {compileHandlebars} from "../../../../utils/functions/manipulateDOM";

interface IButton {
    classesButton?: string[],
    type?: string,
    label?: string | HTMLElement,
    events?: object
}

export default class Button extends Block {
    constructor(props: IButton) {
        const {classesButton = []} = props;
        super("div", {
            ...props,
            classesButton: classesButton.join(' '),
            settings: {withInternalID: true, eventsToChild: true}
        });
    }

    render() {
        return compileHandlebars(buttonTmpl, this.props);
    }
}