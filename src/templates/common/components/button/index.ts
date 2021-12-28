import Block from '../../../../utils/services/Block';
import {buttonTmpl} from './button.tmpl';
import {compileHandlebars} from '../../../../utils/functions/manipulateDOM';

interface IButton {
    classesButton?: string[],
    type?: string,
    label?: string | HTMLElement,
    events?: object,
    defaultView?: boolean
}

export default class Button extends Block {
    constructor(props: IButton) {
        const {classesButton = [], defaultView = true} = props;
        super('div', {
            ...props,
            classesButton: classesButton.join(' '),
            defaultView,
            settings: {withInternalID: true, eventsToChild: true}
        });
    }

    render() {
        return compileHandlebars(buttonTmpl, this.props);
    }
}