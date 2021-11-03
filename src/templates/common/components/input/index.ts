import Block from "../../../../utils/services/Block";
import {inputTmpl, textareaTmpl, wrapperInputTmpl} from "./input.tmpl";
import {compileHandlebars, getValueAndNameTarget} from "../../../../utils/functions/manipulateDOM";
import {HTMLElementEventInputOrTextArea} from "../../../../utils/interfaces";

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
}

interface IInputFieldProps {
    name: string,
    blur: (e: Event) => void,
    focus: (e: Event) => void,
    keyup: (e: Event) => void,
    type?: string,
    textarea?: boolean,
}

class InputField extends Block {
    constructor(props: IInputFieldProps) {
        const {
            blur, focus, keyup, ...rest
        } = props;
        super("div", {
            ...rest,
            events: {
                blur,
                focus,
                keyup,
            },
            settings: {withInternalID: true, eventsToChild: true},
        });
    }

    render() {
        const {textarea} = this.props;
        return compileHandlebars(textarea ? textareaTmpl : inputTmpl, this.props);
    }
}

export default class Input extends Block {
    constructor(props: IInputProps) {
        const {
            blur, focus, type, name, keyup, error, pattern, errorMessage, classes = [], textarea, ...rest
        } = props;
        super("div", {
            ...rest,
            pattern,
            classes: [...classes, 'input_wrapper', error ? 'error' : 'valid', ...(textarea ? ['textarea'] : [])],
            name,
            error,
            errorMessage,
            input: new InputField({
                blur: (e: HTMLElementEventInputOrTextArea) => {
                    if (blur) {
                        blur(e)
                    }
                },
                focus: (e: HTMLElementEventInputOrTextArea) => {
                    const {value} = getValueAndNameTarget(e);
                    if (pattern) {
                        this.validateInput(value);
                    }
                    if (focus) {
                        focus(e)
                    }
                    if (document.activeElement !== e.target) {
                        e.target.focus();
                    }

                },
                keyup: (e: HTMLElementEventInputOrTextArea) => {
                    const {value} = getValueAndNameTarget(e);
                    if (pattern) {
                        this.validateInput(value);
                    }
                    if (keyup) {
                        keyup(e)
                    }
                    if (document.activeElement !== e.target) {
                        e.target.focus();
                    }
                },
                type,
                name,
                textarea,
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


    validateInput(value: string) {
        const {error, classes, errorMessage, pattern} = this.props;
        if (pattern) {
            if (!value.match(pattern)) {
                if (error !== errorMessage) {
                    this.setProps({error: errorMessage, classes: [...classes, 'error']})
                }
            } else {
                const newClasses = [...classes].filter(cl => cl !== 'error');
                if (error) {
                    this.setProps({error: '', classes: [...newClasses]});
                }
            }
        }
    }


    render() {
        return compileHandlebars(wrapperInputTmpl, {
            ...this.props,
            input: this.props.input.getContent().outerHTML,
        });
    }
}