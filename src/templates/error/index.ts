import {errorTmpl} from './error.tmpl';
import Block from '../../utils/services/Block';
import {compileHandlebars} from '../../utils/functions/manipulateDOM';
import {buttonReturnToChats} from './components/buttonReturnToChats';

interface IError {
    codeError: string,
    textError: string,
    url?: URL
}

export default class ErrorPage extends Block {
    constructor(props: IError) {
        super('div', {
            ...props,
            classes: ['container_page'],
            button: buttonReturnToChats,
            settings: {withInternalID: true}
        });
    }

    render() {
        return compileHandlebars(errorTmpl, {
            ...this.props,
            button: this.props.button.getContent().outerHTML,
        });
    }
}
