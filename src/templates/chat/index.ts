import {chatDialog, chatPreviewTmpl, chatTmpl, iconsUrl, messageFormTmpl, messageTmpl} from './chat.tmpl';
import Block from '../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../utils/functions/manipulateDOM';
import Button from '../common/components/button';
import Form from '../common/components/form';
import Input from '../common/components/input';
import {PATTERNS, RESOURCES_URL} from '../../utils/consts';
import {TObjectStrings} from '../../utils/interfaces';
import Header from '../common/components/header';
import Dialog from '../common/components/dialog';
import SettingsChatDialog from './components/settingsChatDialog/settingsChatDialog';
import {ChatController, ChatsController, TIdChat} from '../../controllers/Chats.controller';
import {Store, store, StoreEvents} from '../../utils/store/Store';
import {AuthController} from '../../controllers/Auth.controller';
import {IUserInfo} from '../../controllers/User.controller';

export interface IChat {
    avatar: null | string,
    created_by: number,
    id: TIdChat,
    last_message: null | { time?: string, id?: string | number, content?: string },
    title: 'chat1',
    unread_count: number,
    active: boolean,
}

export interface IMessage {
    myMessage: boolean,
    userNameMessage: string,
    message: string,
    time: string,
    read?: boolean,
    userAvatar?: string,
}

export interface IChatData {
    id?: TIdChat,
    messages: IMessage[],
    users?: IUserInfo[]
}

interface IChatPage {
    chats?: IChat[],
    chatData?: IChatData
}

let scrollInTheBottomOfChat = false;

const scrollToBottomOfChat = (forceScroll = false) => {
    setTimeout(() => {
        const chatDialog = document.querySelector('.chat_dialog');
        if (chatDialog && forceScroll || scrollInTheBottomOfChat) {
            chatDialog?.scrollTo(0, chatDialog.scrollHeight);
            scrollInTheBottomOfChat = true;
        }
    }, 10);
}

const getChatPreviews = (chats?: IChat[], currentChatId?: TIdChat) => {
    return chats?.map((chat: IChat) => {
        return new ChatPreview({...chat, active: currentChatId == chat.id})
    })
}

class ChatPreview extends Block {
    private chatsController: ChatsController;

    constructor(props: IChat) {
        const {active, id, last_message = {}} = props;

        let date = '';
        if (last_message?.time) {
            const dateObj = new Date(last_message.time);
            date = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
        }

        super('div', {
            ...props,
            timeLastMessage: date,
            content: last_message?.content,
            classes: ['chat_preview', ...(active ? ['active'] : [])],
            settings: {withInternalID: true},
            events: {
                click: async () => {
                    await this.chatsController.chooseChat(id);
                    scrollToBottomOfChat(true);
                }
            }
        });
        this.chatsController = ChatController;
    }

    render() {
        return compileHandlebars(chatPreviewTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

class ChatDialog extends Block {
    constructor(props: any) {
        super('section', {
            ...props,
            classes: ['chat_dialog'],
            settings: {withInternalID: true},
            events: {
                scroll: () => {
                    const chatDialog = document.querySelector('.chat_dialog') as HTMLElement;
                    const messagesContainer = document.querySelector('.chat_dialog_messages_container');
                    const scrollHeight = Math.round(messagesContainer?.scrollHeight || 0);
                    const clientHeight = Math.round(chatDialog.clientHeight);
                    const scrollTop = Math.round(chatDialog.scrollTop);
                    scrollInTheBottomOfChat = clientHeight + scrollTop == scrollHeight;
                }
            }
        });
    }

    render() {
        return compileHandlebars(chatDialog, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

const getMessageBlock = (messages: IMessage[] = []) => {
    return messages.map((msg) => {
        return new MessageBlock(msg)
    })
}

class MessageBlock extends Block {
    constructor(props: IMessage) {
        const {
            myMessage, userAvatar, time
        } = props;
        let parsedTime = time;
        if (time) {
            const dateObj = new Date(time);
            parsedTime = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}`;
        }
        super('div', {
            ...props,
            time: parsedTime,
            userAvatar: userAvatar ? `${RESOURCES_URL}/${userAvatar}` : undefined,
            classes: ['dialog_message_container', ...(myMessage ? ['my_message'] : [])],
            settings: {withInternalID: true},
        });
    }

    render() {
        return compileHandlebars(messageTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

export default class ChatPage extends Block {
    public chatsController: ChatsController;
    public authController: AuthController;
    public store: Store;

    constructor(props: IChatPage) {
        const settingsChatDialog = new Dialog({
            id: 'settingsChatDialog',
            contentDialog: new SettingsChatDialog({
                idChat: undefined
            })
        });

        super('div', {
            ...props,
            currentChatId: undefined,
            dialogIsChosen: false,
            classes: ['container_page'],
            chatPreviews: [],
            header: new Header({
                withActions: true
            }),
            settingsChatDialog,
            chatDialog: new ChatDialog({
                buttonMenuChat: new Button({
                    classesButton: ['dropbtn'],
                    events: {
                        click: () => {
                            document.getElementById('dropdown_settings_chat')?.classList.toggle('show');
                        },
                    },
                }),
                buttonSettingsChat: new Button({
                    classesButton: ['dropdown_item'],
                    defaultView: false,
                    label: 'Настройки чата',
                    events: {
                        click: () => {
                            settingsChatDialog.show();
                        },
                    },
                }),
                buttonDeleteChat: new Button({
                    classesButton: ['dropdown_item'],
                    defaultView: false,
                    label: 'Удалить чат',
                    events: {
                        click: () => {
                            console.log('Функционал не реализован')
                        },
                    },
                }),
                messages: getMessageBlock([]),
                messageForm: new Form({
                    formTmpl: messageFormTmpl,
                    usersMoreThanOne: false,
                    classes: ['form_message'],
                    submit: (_e: Event, values: TObjectStrings) => {
                        this.setInputMessageValue(values.message);
                        const {chatData: {id}} = this.store.state;
                        if (id && values.message) {
                            this.chatsController.sendMessage(values.message, id);
                            this.setInputMessageValue('');
                            scrollToBottomOfChat(true);
                        }
                    },
                    buttonSubmit: new Button({
                        type: 'submit',
                        label: `<img src=${iconsUrl.plane} alt="send_message">`,
                        classesButton: ['message_buttons_send']
                    }),
                    message: new Input({
                        pattern: PATTERNS.message,
                        errorMessage: 'Не должно быть пустым',
                        textarea: true,
                        name: 'message',
                        value: ''
                    })
                }),
            })
        });
        this.store = store;
        this.subscribeStore();
        this.chatsController = ChatController;
        this.chatsController.getAllChats()
        this.authController = new AuthController();
        this.authController.getUser();
    }

    subscribeStore() {
        this.store.eventBus.on(StoreEvents.UPDATED, () => {
            this.updateChatPreviews();
            this.updateSettingsChatDialog();
            this.updateMessages();
        });
    }

    setInputMessageValue(value: string) {
        this.props.chatDialog.props.messageForm.props.message.props.input?.setProps({
            value
        });
    }

    updateChatPreviews() {
        const {chatData: {id}, chats} = this.store.state;
        this.setProps({
            chats,
            chatPreviews: getChatPreviews(chats, id),
            currentChatId: id,
            dialogIsChosen: Boolean(id),
        });
    }

    updateSettingsChatDialog() {
        const {chatData: {id, users}} = this.store.state;
        const {settingsChatDialog} = this.props;
        if (settingsChatDialog.props.contentDialog.idChat !== id) {
            settingsChatDialog.props.contentDialog.setProps({
                idChat: id
            })
        }
        this.props.chatDialog.props.messageForm.setProps({
            usersMoreThanOne: users && users?.length > 1
        })
    }

    updateMessages() {
        const {chatData: {messages}} = this.store.state;
        this.props.chatDialog.setProps({
            messages: getMessageBlock(messages)
        });
        scrollToBottomOfChat();
    }


    render() {
        return compileHandlebars(chatTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}
