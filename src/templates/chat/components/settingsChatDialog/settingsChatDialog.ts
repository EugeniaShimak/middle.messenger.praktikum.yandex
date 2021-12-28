import Block from '../../../../utils/services/Block';
import {compileHandlebars, getContentFromComponentProps} from '../../../../utils/functions/manipulateDOM';
import {formAddUserTmpl, settingsChatDialogTmpl, userTmpl} from './settingsChatDialogTmpl.tmpl';
import {iconsUrl} from '../../chat.tmpl';
import Input from '../../../common/components/input';
import Form from '../../../common/components/form';
import {TObjectStrings} from '../../../../utils/interfaces';
import Button from '../../../common/components/button';
import {ChatController, ChatsController, TIdChat} from '../../../../controllers/Chats.controller';
import {Store, store} from '../../../../utils/store/Store';


interface ISettingsChatDialog {
    idChat?: TIdChat,
    chatData?: object
}

interface IUser {
    login: string,
    id: string,
    idChat?: TIdChat,
    getUsersOfChat: (idChat: TIdChat) => void
}

class UserContainer extends Block {
    public chatsController: ChatsController;

    constructor(props: IUser) {
        const {id} = props;
        super('div', {
            ...props,
            classes: ['setting_chat_user'],
            settings: {withInternalID: true},
            buttonDeleteUser: new Button({
                defaultView: false,
                label: `<img src=${iconsUrl.deleteBtn} alt="delete_button">`,
                classesButton: ['settings_chat_delete_button'],
                events: {
                    click: () => {
                        this.deleteUsersFromChat(id);
                    },
                },
            }),
        });
        this.chatsController = ChatController;
    }

    deleteUsersFromChat(id: string) {
        const {idChat, getUsersOfChat} = this.props;
        this.chatsController.deleteUsersFromChat({chatId: idChat, users: [id]})
            .then(() => {
                getUsersOfChat(idChat);
            })
    }

    render() {
        return compileHandlebars(userTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

export default class SettingsChatDialog extends Block {
    public chatsController: ChatsController;
    public store: Store;

    constructor(props: ISettingsChatDialog) {
        super('div', {
            ...props,
            settings: {withInternalID: true},
            users: [],
            formAddUser: new Form({
                formTmpl: formAddUserTmpl,
                classes: ['settings_chat_add_user_form'],
                submit: (_e: Event, values: TObjectStrings) => {
                    const {idChat} = this.props;
                    this.chatsController.addUser(idChat, values.new_user)
                        .then(() => {
                            this.getUsersOfChat(idChat);
                        })
                },
                buttonAddUser: new Button({
                    type: 'submit',
                    defaultView: false,
                    label: `<img src=${iconsUrl.addBtn} alt="add_button">`,
                    classesButton: ['settings_chat_add_button']
                }),
                inputUser: new Input({
                    name: 'new_user',
                    label: 'Логин нового пользователя'
                }),

            }),
        });
        this.chatsController = ChatController;
        this.store = store;
    }

    async componentDidUpdate(oldProps: any, newProps: any) {
        const {idChat: idChatOld, users: usersOld} = oldProps;
        const {idChat, users} = newProps;
        if (idChat && idChat !== idChatOld || users.length !== usersOld.length) {
            return this.getUsersOfChat(idChat).then(() => {
                return true
            })
        }
        return false
    }

    getUsersOfChat(idChat?: TIdChat) {
        if (idChat !== undefined) {
            return this.chatsController.getUsersOfChat(idChat)
                .then((res) => {
                    this.setProps({
                        users: this.getUsersContainer(res, idChat, this.getUsersOfChat.bind(this)),
                    })
                    return;
                })
        }
        return Promise.resolve();
    }

    getUsersContainer(users: IUser[] = [], idChat: any, getUsersOfChat: (idChat?: TIdChat) => Promise<any>) {
        return users
            // @ts-ignore
            .filter(user => this.store.state.user?.login !== user?.login)
            .map((user) => {
                return new UserContainer({...user, idChat, getUsersOfChat})
            })
    }


    render() {
        return compileHandlebars(settingsChatDialogTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}