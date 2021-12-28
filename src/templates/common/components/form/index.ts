import Block from '../../../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
    getValuesByForm
} from '../../../../utils/functions/manipulateDOM';
import {TObjectStrings} from '../../../../utils/interfaces';
import Button from '../button';
import {escapeSymbolsValues} from '../../../../utils/functions/escapeSymbols';
import Input from '../input';

interface IForm {
    classes?: string[],
    attributes?: TObjectStrings,
    submit: (e: Event, values: TObjectStrings) => void,
    formTmpl: string,
    button?: Button,
    [others: string]: any;
}

export default class Form extends Block {
    constructor(props: IForm) {
        const {
            classes = [], attributes = {}, submit
        } = props;
        super('form', {
            ...props,
            classes: [...classes],
            attributes: {method: 'post', ...attributes},
            settings: {withInternalID: true},
            events: {
                submit: (e: Event) => {
                    e.preventDefault();
                    const content = (<HTMLFormElement>this.getContent())
                    const values = getValuesByForm(content);
                    let formInvalid = false;
                    for (const propsKey in this.props) {
                        const prop = this.props[propsKey];
                        const val = values[propsKey];
                        if (prop instanceof Input && prop.validateInput) {
                            prop.validateInput(val);
                            if (!prop.isValidInput(val)) {
                                formInvalid = true;
                            }
                        }
                    }
                    if (!formInvalid) {
                        const data = escapeSymbolsValues(values);
                        submit(e, data);
                    }
                }
            }
        });
    }

    render() {
        return compileHandlebars(this.props.formTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}