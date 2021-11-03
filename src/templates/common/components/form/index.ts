import Block from "../../../../utils/services/Block";
import {
    compileHandlebars,
    getContentFromComponentProps,
    getValuesByForm
} from "../../../../utils/functions/manipulateDOM";
import {objectStrings} from "../../../../utils/interfaces";
import Input from "../input";
import Button from "../button";

interface IForm {
    classes?: string[],
    attributes?: objectStrings,
    submit: (e: Event, values: objectStrings) => void,
    formTmpl: string,
    button?: Button,
    [others: string]: any;
}

export default class Form extends Block {
    constructor(props: IForm) {
        const {
            classes = [], attributes = {}, submit
        } = props;
        super("form", {
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
                    console.log(values);
                    if (!formInvalid){
                        submit(e, values);
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