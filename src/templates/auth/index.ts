import {authTmpl, formAuth} from './auth.tmpl';
import Block from '../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../utils/functions/manipulateDOM';
import {titleAuth} from './components/titleAuth';
import Button from '../common/components/button';
import {
    emailField,
    firstNameField,
    loginField,
    passwordCloneField,
    passwordField,
    phoneField,
    secondNameField
} from '../common/userFields';
import Form from '../common/components/form';
import {TObjectStrings} from '../../utils/interfaces';

const firstName = firstNameField

const secondName = secondNameField;

const login = loginField;

const email = emailField;

const phone = phoneField;

const password = passwordField;

const passwordClone = passwordCloneField;

interface IAuthPage {
    title: string,
    linkLabel: string,
    buttonLabel: string,
    register: boolean
}

export default class AuthPage extends Block {
    constructor(props: IAuthPage) {
        const {title, buttonLabel, register} = props;
        const fieldsAuth = {
            login,
            password,
        };

        const fieldsRegister = {
            ...fieldsAuth,
            email,
            firstName,
            secondName,
            phone,
            password,
            passwordClone,
        }

        const fields = register ? fieldsRegister : fieldsAuth;

        super('div', {
            ...props,
            classes: ['container_page'],
            title: titleAuth(title),
            form: new Form({
                formTmpl: formAuth,
                classes: ['form_auth'],
                submit: (e: Event, values: TObjectStrings) => {
                    console.log(e, values);
                },
                button: new Button({
                    type: 'submit',
                    label: buttonLabel,
                }),
                ...fields,
                register
            }),
        });
    }

    render() {
        return compileHandlebars(authTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}