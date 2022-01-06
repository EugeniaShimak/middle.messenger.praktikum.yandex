import {errorHandler} from '../utils/services/errorHandler';
import {ChatAPI, IChatUsers} from '../api/Chat.api';
import {IUserInfo, UserController} from './User.controller';
import {Controller} from './Controller';
import {IChat} from '../templates/chat';

export type TIdChat = string | number | undefined;

export class ChatsController extends Controller {
    public userController: UserController;
    static __instance: ChatsController | null;

    constructor() {
        if (ChatsController.__instance) {
            return ChatsController.__instance;
        }
        super();
        this.userController = new UserController();
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
        try {
            const users = await this.userController.getUserByLogin(userLogin);
            if (users && users.length) {
                return ChatAPI.addUsersToChat({
                    chatId,
                    users: users.map((user: any) => user.id)
                })
                    .then(resp => {
                        return resp;
                    })
            }
        } catch (e) {
            errorHandler(e);
        }
    }
}

export const ChatController = new ChatsController();
