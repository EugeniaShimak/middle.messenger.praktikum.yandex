import {formProfile, profileTmpl} from './profile.tmpl';
import Block from '../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../utils/functions/manipulateDOM';
import {titleUserName} from './components/titleUserName';
import Button from '../common/components/button';
import {
    displayNameField,
    emailField,
    firstNameField,
    loginField,
    phoneField,
    secondNameField
} from '../common/userFields';
import Form from '../common/components/form';
import {THTMLElementEventInputOrTextArea, TObjectStrings} from '../../utils/interfaces';
import Header from '../common/components/header';
import Input, {InputField} from '../common/components/input';
import {UserController} from '../../controllers/User.controller';
import {store, Store, StoreEvents} from '../../utils/store/Store';
import {RESOURCES_URL} from '../../utils/consts';
import {AuthController} from '../../controllers/Auth.controller';

const firstName = firstNameField;

const displayName = displayNameField;

const secondName = secondNameField;

const login = loginField;

const email = emailField;

const phone = phoneField;

const password = new Input({
    type: 'password',
    name: 'password',
    label: 'Пароль'
});

const passwordClone = new Input({
    type: 'password',
    name: 'passwordClone',
    label: 'Повторите пароль'
});

const oldPassword = new Input({
    type: 'password',
    name: 'oldPassword',
    label: 'Старый пароль'
});

interface IProfileProps {
    title?: string,
    urlAvatar?: string | URL,
}

export default class ProfilePage extends Block {
    public store: Store;
    public authController: AuthController;
    public userController: UserController;
    constructor(props: IProfileProps) {
        const {title} = props;
        super('div', {
            ...props,
            classes: ['container_page'],
            title: titleUserName(title),
            form: new Form({
                formTmpl: formProfile,
                classes: ['form_profile'],
                submit: (_e: Event, values: TObjectStrings) => {
                    this.userController.changeUserInfo(values);
                },
                first_name: firstName,
                second_name: secondName,
                login,
                email,
                phone,
                password,
                passwordClone,
                oldPassword,
                display_name: displayName,
                button: new Button({
                    type: 'submit',
                    label: 'Сохранить изменения',
                }),
            }),
            header: new Header({
                withActions: false
            }),
            inputAvatarLoad: new InputField({
                change: (e: THTMLElementEventInputOrTextArea) => {
                    // @ts-ignore
                    const file = e.target?.files[0];
                    this.userController.changeUserAvatar(file);
                },
                name: 'avatar',
                file: true,
                classes: ['button_user_avatar']
            }),
        });
        this.store = store;
        this.authController = new AuthController();
        this.userController = new UserController();
        this.subscribeStore();
        this.authController.getUser();
    }

    subscribeStore() {
        this.store.eventBus.on(StoreEvents.UPDATED, () => {
            this.updateInputs();
            this.updateAvatar();
        });
    }
    
    updateInputs() {
        const {user} = this.store.state;
        const propsForm = this.props.form.props;
        Object.keys(propsForm).forEach((key: string)=>{
            // @ts-ignore
            const valueUser = user?.[key];
            if (propsForm[key] instanceof Input && valueUser) {
                propsForm[key].props.input?.setProps({
                    value: valueUser
                })
            }
        })
    }

    updateAvatar() {
        const {user} = this.store.state;
        this.setProps({
            urlAvatar: user?.avatar ? `${RESOURCES_URL}${user.avatar}` : undefined,
        });
    }

    render() {
        return compileHandlebars(profileTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}