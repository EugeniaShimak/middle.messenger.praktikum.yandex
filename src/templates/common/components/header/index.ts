import Block from '../../../../utils/services/Block';
import {compileHandlebars, getContentFromComponentProps} from '../../../../utils/functions/manipulateDOM';
import {headerTmpl} from './header_layout.tmpl';
import Button from '../button';
import Link from './components/link';
import {routes} from '../../../../utils/consts';
import {AuthController} from '../../../../controllers/Auth.controller';
import {router} from '../../../../utils/router/Router';
import Dialog from '../dialog';
import CreateChatDialog from './components/createChatDialog/createChatDialog';

interface IHeader {
    withActions: boolean
}

const createChatDialog: Dialog = new Dialog({
    id: 'createChatDialog',
    contentDialog: new CreateChatDialog({close: () => createChatDialog.hide()})
})

export default class Header extends Block {
    public authController: AuthController;
    constructor(props: IHeader = {withActions: false}) {
        super('header', {
            ...props,
            classes: ['header_wrapper'],
            settings: {withInternalID: true},
            buttonCreateChat: new Button({
                type: 'button',
                label: 'Создать чат',
                events: {
                    click: () => {
                        createChatDialog.show();
                    },
                },
            }),
            linkProfile: new Link({
                label: 'Профиль',
                href: routes.settings,
                click: () => {
                    router.go(routes.settings);
                }
            }),
            linkChats: new Link({
                label: 'Чаты',
                href: routes.messenger,
                click: () => {
                    router.go(routes.messenger);
                }
            }),
            logoutButton: new Link({
                label: 'Выйти',
                href: '/logout',
                grey: true,
                click: () => {
                    this.authController.logOut();
                }
            }),
            createChatDialog
        });
        this.authController = new AuthController();
    }

    render() {
        return compileHandlebars(headerTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}
