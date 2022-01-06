import Block from '../../../../utils/services/Block';
import {errorBlockTmpl, inputTmpl, inputTmplFile, textareaTmpl, wrapperInputTmpl} from './input.tmpl';
import {
    compileHandlebars,
    getContentFromComponentProps,
    getValueAndNameTarget
} from '../../../../utils/functions/manipulateDOM';
import {THTMLElementEventInputOrTextArea} from '../../../../utils/interfaces';

interface IInputProps {
    name: string,
    label?: string,
    blur?: (e: Event) => void,
    focus?: (e: Event) => void,
    keyup?: (e: Event) => void,
    type?: string,
    error?: string,
    pattern?: RegExp,
    errorMessage?: string,
    classes?: string[],
    textarea?: boolean,
    value?: string,
}

interface IInputFieldProps {
    name: string,
    blur?: (e: Event) => void,
    focus?: (e: Event) => void,
    keyup?: (e: Event) => void,
    change?: (e: Event) => void,
    type?: string,
    textarea?: boolean,
    file?: boolean,
    classes?: string[],
    value?: string
}

interface IErrorBlock {
    error?: string
}

export class InputField extends Block {
    constructor(props: IInputFieldProps) {
        const {
            blur, focus, keyup, change, ...rest
        } = props;
        super('div', {
            ...rest,
            events: {
                blur,
                focus,
                keyup,
                change,
            },
            settings: {withInternalID: true, eventsToChild: true},
        });
    }

    render() {
        const {textarea, file = false} = this.props;
        const tmpl = textarea ? textareaTmpl : file ? inputTmplFile : inputTmpl;
        return compileHandlebars(tmpl, this.props)
    }
}

export class ErrorBlock extends Block {
    constructor(props: IErrorBlock) {
        super('div', {
            ...props,
            settings: {withInternalID: true},
        });
    }

    render() {
        return compileHandlebars(errorBlockTmpl, this.props)
    }
}

export default class Input extends Block {
    constructor(props: IInputProps) {
        const {
            blur, focus, type, name, keyup, error, pattern, errorMessage, classes = [], textarea, value, ...rest
        } = props;
        super('div', {
            ...rest,
            pattern,
            classes: [...classes, 'input_wrapper', ...(textarea ? ['textarea'] : [])],
            name,
            error,
            errorMessage,
            input: new InputField({
                blur: (e: THTMLElementEventInputOrTextArea) => {
                    if (blur) {
                        blur(e)
                    }
                },
                focus: (e: THTMLElementEventInputOrTextArea) => {
                    if (focus) {
                        focus(e)
                    }
                },
                keyup: (e: THTMLElementEventInputOrTextArea) => {
                    const {value} = getValueAndNameTarget(e);
                    if (pattern) {
                        this.validateInput(value);
                    }
                    if (keyup) {
                        keyup(e)
                    }
                },
                type,
                name,
                textarea,
                value
            }),
            errorComponent: new ErrorBlock({
                error
            }),
            validateInput: (value: string) => this.validateInput(value),
            isValidInput: (value: string) => this.isValidInput(value),
            settings: {withInternalID: true},
        });
    }

    isValidInput(value = '') {
        const {pattern} = this.props;
        return pattern ? value.match(pattern) : true;
    }

    validateInput(value = '') {
        const {error, errorMessage, pattern} = this.props;
        if (pattern) {
            if (!value.match(pattern)) {
                if (error !== errorMessage) {
                    this.props.errorComponent.setProps({error: errorMessage})
                }
            } else {
                this.props.errorComponent.setProps({error: ''});
            }
        }
    }

    render() {
        return compileHandlebars(wrapperInputTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}
