import {chatPreviewTmpl, chatTmpl, dayContainerTmpl, iconsUrl, messageFormTmpl, messageTmpl} from './chat.tmpl';
import Block from '../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../utils/functions/manipulateDOM';
import Button from '../common/components/button';
import Form from '../common/components/form';
import Input from '../common/components/input';
import {PATTERNS} from '../../utils/consts';
import {TObjectStrings} from '../../utils/interfaces';

const data = {
    chats: [
        {
            id: 1,
            userName: 'Ивыаыа',
            message: 'svxvxcv',
            countUnread: 10,
            timeLastMessage: '12:12',
            active: true
        },
        {
            id: 2,
            userName: 'Ивыаzczczxcыа',
            message: 'wwwwwwww',
            countUnread: 0,
            timeLastMessage: '12:16',
            active: false
        }
    ],
    days: [
        {
            dialogDate: '23.12.1111',
            messages: [
                {
                    myMessage: true,
                    userNameMessage: 'Me',
                    message: 'djfsjhf sjdfhkjsdh jshdfjkhdf skdjfksjf sdjkjh',
                    time: '23.12',
                    read: true
                },
                {
                    myMessage: false,
                    userNameMessage: 'User2',
                    message: 'djfsjhf sjdfhkjsdh jshdfj sjdfhkjsdh jshdfjkhdf sjdfhkjsdh jshdfjkhdfkhdf skdjfksjf sdjkjh',
                    time: '23.12',
                },
                {
                    myMessage: false,
                    userNameMessage: 'User2',
                    message: 'djfsjhf sjdfhk sjdfhkjsdh jshdfjkhdf sjdfhkjsdh jshdfjkhdf sjdfhkjsdh jshdfjkhdf sjdfhkjsdh jshdfjkhdf sjdfhkjsdh jshdfjkhdfjkhdf skdjfksjf sdjkjh',
                    time: '23.12',
                },
                {
                    myMessage: true,
                    userNameMessage: 'Me',
                    message: 'AAAAAA HELP',
                    time: '23.12',
                    read: false
                }
            ],
        },
    ]
};

interface IChat {
    id: number,
    userName: string,
    message: string,
    countUnread: number,
    timeLastMessage: string,
    active: boolean
}

interface IMessage {
    myMessage: boolean,
    userNameMessage: string,
    message: string,
    time: string,
    read?: boolean
}

interface IDay {
    dialogDate: string,
    messages: IMessage[],
}

interface IChatPage {
    currentDialogId?: number|null,
}

const getChatPreviews = (chats: IChat[]) => {
    return chats.map((chat) => {
        return new ChatPreview(chat)
    })
}

const getDaysContainerMessages = (days: IDay[]) => {
    return days.map((day) => {
        return new DayContainer(day)
    })
}

const getMessageBlock = (messages: IMessage[]) => {
    return messages.map((msg) => {
        return new MessageBlock(msg)
    })
}

class ChatPreview extends Block {
    constructor(props: IChat) {
        const {active} = props;
        super('div', {
            ...props,
            classes: ['chat_preview', ...(active ? ['active'] : [])],
            settings: {withInternalID: true},
        });
    }

    render() {
        return compileHandlebars(chatPreviewTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

class DayContainer extends Block {
    constructor(props: IDay) {
        super('div', {
            ...props,
            classes: ['dialog_day_container'],
            settings: {withInternalID: true},
            messages: getMessageBlock(props.messages)
        });
    }

    render() {
        return compileHandlebars(dayContainerTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}

class MessageBlock extends Block {
    constructor(props: IMessage) {
        const {
            myMessage
        } = props;
        super('div', {
            ...props,
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
    constructor(props: IChatPage) {
        const {currentDialogId} = props;

        super('div', {
            ...props,
            currentDialogId,
            classes: ['container_page'],
            chatPreviews: getChatPreviews(data.chats),
            days: getDaysContainerMessages(data.days),
            messageForm: new Form({
                formTmpl: messageFormTmpl,
                classes: ['form_message'],
                submit: (e: Event, values: TObjectStrings) => {
                    console.log(e, values);
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
                    name: 'message'
                })
            }),
        });
    }


    render() {
        return compileHandlebars(chatTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}