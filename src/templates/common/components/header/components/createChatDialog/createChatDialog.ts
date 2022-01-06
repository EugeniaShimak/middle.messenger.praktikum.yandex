import Block from '../../../../../../utils/services/Block';
import Form from '../../../form';
import {createChatDialogTmpl, formCreateChatTmpl} from './createChatDialogTmpl.tmpl';
import {TObjectStrings} from '../../../../../../utils/interfaces';
import Button from '../../../button';
import Input from '../../../input';
import {compileHandlebars, getContentFromComponentProps} from '../../../../../../utils/functions/manipulateDOM';
import {ChatController, ChatsController} from '../../../../../../controllers/Chats.controller';

interface ICreateChatDialog {
    close: () => void
}

export default class CreateChatDialog extends Block {
    public chatsController: ChatsController;
    constructor(props: ICreateChatDialog) {
        super('div', {
            ...props,
            settings: {withInternalID: true},
            formCreateChat: new Form({
                formTmpl: formCreateChatTmpl,
                classes: ['create_chat_dialog'],
                submit: (_e: Event, values: TObjectStrings) => {
                    this.chatsController.createChat(values.title);
                    props.close();
                },
                buttonSubmit: new Button({
                    type: 'submit',
                    label: `Создать чат`
                }),
                title: new Input({
                    name: 'title',
                    label: 'Название чата'
                })
            }),
        });
        this.chatsController = ChatController;
    }

    render() {
        return compileHandlebars(createChatDialogTmpl, {
            ...getContentFromComponentProps(this.props)
        });
    }
}
