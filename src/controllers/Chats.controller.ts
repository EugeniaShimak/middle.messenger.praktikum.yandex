import {errorHandler} from '../utils/services/errorHandler';
import {ChatAPI, IChatUsers} from '../api/Chat.api';
import {IUserInfo, UserController} from './User.controller';
import {Controller} from './Controller';
import {getCookie} from '../utils/functions/coockie';
import {IChat} from '../templates/chat';

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

export class ChatsController extends Controller {
    public userController: UserController;
    public sockets: Record<number | string, WebSocket>;
    static __instance: ChatsController | null;

    constructor() {
        if (ChatsController.__instance) {
            return ChatsController.__instance;
        }
        super();
        this.userController = new UserController();
        this.sockets = {};
    }

    public createChat(title: string) {
        ChatAPI.create(title)
            .then(async () => {
                await this.getAllChats();
            })
            .catch(errorHandler)
    }

    public getAllChats() {
        return ChatAPI.getAll()
            .then((chats: IChat[]) => {
                this.store.setState({
                    chats
                });
                return chats;
            })
            .catch(errorHandler)
    }

    public getUsersOfChat(idChat?: TIdChat): Promise<any> {
        if (idChat) {
            return ChatAPI.getUsersOfChat(idChat)
                .then((users: IUserInfo[]) => {
                    this.store.setState({
                        chatData: {
                            ...this.store.state.chatData,
                            users,
                        }
                    });
                    return users;
                })
                .catch(errorHandler)
        } else return Promise.resolve([]);
    }

    public deleteUsersFromChat(data: IChatUsers): Promise<any> {
        return ChatAPI.deleteUsersFromChat(data)
            .then((res) => {
                return res;
            })
            .catch(errorHandler)
    }

    public async addUser(chatId: string | number, userLogin: string): Promise<any> {
        const users = await this.userController.getUserByLogin(userLogin);
        if (users && users.length) {
            return ChatAPI.addUsersToChat({
                chatId,
                users: users.map((user: any) => user.id)
            })
                .then(resp => {
                    return resp;
                })
        } else {
            return Promise.resolve()
        }
    }

    public async chooseChat(idChat?: TIdChat) {
        if (idChat === undefined) {
            idChat = getCookie('idChat') as TIdChat;
        }
        if (idChat !== undefined) {
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

    public getMessages(chatId: string | number, offset: number) {
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

export const ChatController = new ChatsController();
