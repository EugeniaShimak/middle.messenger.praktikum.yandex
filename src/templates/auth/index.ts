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
import {AuthController} from '../../controllers/Auth.controller';
import Input from '../common/components/input';

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
    public authController: AuthController;
    constructor(props: IAuthPage) {
        const {title, buttonLabel, register} = props;
        const fieldsAuth = {
            login: new Input({
                name: 'login',
                label: 'Логин'
            }),
            password: new Input({
                type: 'password',
                name: 'password',
                label: 'Пароль'
            }),
        };

        const fieldsRegister = {
            login,
            password,
            email,
            first_name: firstName,
            second_name: secondName,
            phone,
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
                submit: (_e: Event, values: TObjectStrings) => {
                    if (register) {
                        this.authController.signUp(values);
                    }
                    else {
                        this.authController.signIn(values);
                    }
                },
                button: new Button({
                    type: 'submit',
                    label: buttonLabel,
                }),
                ...fields,
                register
            }),
        });
        this.authController = new AuthController();
    }

    render() {
        return compileHandlebars(authTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}
