import {formProfile, profileTmpl} from './profile.tmpl';
import Block from '../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../utils/functions/manipulateDOM';
import {titleUserName} from './components/titleUserName';
import Button from '../common/components/button';
import {
    emailField,
    firstNameField,
    loginField,
    passwordCloneField,
    passwordField, passwordOldField,
    phoneField,
    secondNameField
} from '../common/userFields';
import Form from '../common/components/form';
import {TObjectStrings} from '../../utils/interfaces';

const firstName = firstNameField;

const secondName = secondNameField;

const login = loginField;

const email = emailField;

const phone = phoneField;

const password = passwordField;

const passwordClone = passwordCloneField;

const passwordOld = passwordOldField;

interface IProfileProps {
    title?: string,
    urlAvatar?: string | URL
}

export default class ProfilePage extends Block {
    constructor(props: IProfileProps) {
        const {title} = props;
        super('div', {
            ...props,
            classes: ['container_page'],
            title: titleUserName(title),
            form: new Form({
                formTmpl: formProfile,
                classes: ['form_profile'],
                submit: (e: Event, values: TObjectStrings) => {
                    console.log(e, values);
                },
                firstName,
                secondName,
                login,
                email,
                phone,
                password,
                passwordClone,
                passwordOld,
                button: new Button({
                    type: 'submit',
                    label: 'Сохранить изменения',
                }),
            }),
        });
    }

    render() {
        return compileHandlebars(profileTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}