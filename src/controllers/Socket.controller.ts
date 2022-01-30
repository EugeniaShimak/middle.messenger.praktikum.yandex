import {errorHandler} from '../utils/services/errorHandler';
import {ChatAPI} from '../api/Chat.api';
import {IUserInfo} from './User.controller';
import {Controller} from './Controller';
import {getCookie} from '../utils/functions/coockie';

export type TIdChat = string | number | undefined;

interface ISocketMessage {
    chat_id: number,
    content: string,
    id: number,
    is_read: boolean,
    time: string,
    user_id: number,
    type: string
}

export class SocketController extends Controller {
    public sockets: Record<number | string, WebSocket>;
    static __instance: SocketController | null;

    constructor() {
        if (SocketController.__instance) {
            return SocketController.__instance;
        }
        super();
        this.sockets = {};
    }

    public async chooseChat(idChat?: TIdChat) {
        if (idChat === undefined) {
            idChat = getCookie('idChat') as TIdChat;
        }
        if (idChat !== undefined) {
            try {
                document.cookie = `idChat=${idChat}; Path=/;`;
                const users = await ChatAPI.getUsersChat(idChat, {limit: 30}) as IUserInfo[];
                if (users.length > 1) {
                    await this.connectWithChat(idChat);
                }

                this.store.setState({
                    chatData: {
                        ...this.store.state.chatData,
                        id: idChat,
                        users,
                        messages: []
                    }
                });
                if (users.length > 1) {
                    this.getMessages(idChat, 0);
                }
            }
            catch (e) {
                errorHandler(e)
            }
        }
    }

    public async connectWithChat(chatId: string | number) {
        if (!this.sockets[chatId]) {
            const resp = await ChatAPI.getChatToken(chatId);
            const {token} = resp as { token: string };
            const userId = this.store.state.user?.id;
            if (token && userId) {
                const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

                socket.addEventListener('open', () => {
                    this.sockets[chatId] = socket;
                    this.getMessages(chatId, 0);
                });

                setInterval(() => {
                    socket.send(JSON.stringify({
                        type: 'ping',
                    }));
                }, 5000);

                socket.addEventListener('message',(e) => {
                    const msg = JSON.parse(e.data);
                    this.handleReceiveMessages(msg);
                    return;
                });
            }
        }
    }

    public handleReceiveMessages(messages: ISocketMessage[] | ISocketMessage) {
        const {chatData, user} = this.store.state;

        const getFieldsMsg = (msg: ISocketMessage) => ({
            myMessage: user?.id === msg.user_id,
            message: msg.content,
            time: msg.time,
            userAvatar: chatData.users?.find((user) => user.id === msg.user_id)?.avatar || undefined,
            userNameMessage: chatData.users?.find((user) => user.id === msg.user_id)?.first_name || '',
        });

        if (user) {
            const newMessages = Array.isArray(messages)
                ? messages
                    .filter(msg => msg.type === 'message')
                    .map((message: ISocketMessage) => getFieldsMsg(message))
                : messages.type === 'message' ? [getFieldsMsg(messages)] : [];

            if (newMessages.length) {
                this.store.setState({
                    chatData: {
                        ...chatData,
                        messages: [...newMessages, ...chatData.messages.reverse()].reverse(),
                    },
                });
            }
        }
    }

    getMessages(chatId: string | number, offset: number) {
        if (this.sockets[chatId]) {
            this.sockets[chatId].send(JSON.stringify({
                type: 'get old',
                content: offset,
            }));
        }
    }

    public sendMessage(message: string, idChat: string | number) {
        if (this.sockets[idChat]) {
            this.sockets[idChat].send(JSON.stringify({
                content: message,
                type: 'message',
            }));
        }
    }
}

export const Socket = new SocketController();
