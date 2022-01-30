import {fetchCustom} from '../utils/services/Request';
import {TIdChat} from '../controllers/Chats.controller';

const chatAPIInstance = new fetchCustom('chats');

export interface IChatDataAvatar {
    chatId: string,
    avatar: File
}

export interface IChatUsers {
    chatId: string|number,
    users: string[]
}

export class ChatAPI {
    static create(title: string) {
        return chatAPIInstance.post('/', {parse: true, data: JSON.stringify({title})});
    }

    static getAll() {
        return chatAPIInstance.get('/', {parse: true});
    }

    static delete(chatId: string) {
        return chatAPIInstance.delete('/', {data: JSON.stringify({chatId})});
    }

    static getChatById(id: string) {
        return chatAPIInstance.get(`/${id}/common`, {parse: true});
    }

    static getUsersOfChat(idChat: TIdChat) {
        return chatAPIInstance.get(`/${idChat}/users`, {parse: true});
    }

    static getNewMessagesCount(idChat: TIdChat) {
        return chatAPIInstance.get(`/new/${idChat}`, {parse: true});
    }


    static uploadChatAvatar(data: IChatDataAvatar) {
        return chatAPIInstance.put('/avatar', {parse: true, data: JSON.stringify({...data})});
    }

    static addUsersToChat(data: IChatUsers) {
        return chatAPIInstance.put('/users', {data: JSON.stringify({...data})});
    }

    static deleteUsersFromChat(data: IChatUsers) {
        return chatAPIInstance.delete('/users', {data: JSON.stringify({...data})});
    }

    static getChatToken(chatId: TIdChat) {
        return chatAPIInstance.post(`/token/${chatId}`, {data: JSON.stringify({id: chatId}), parse: true});
    }

    static getUsersChat(chatId: TIdChat, option?: {limit: number}) {
        return chatAPIInstance.get(`/${chatId}/users/`, {data: option, parse: true});
    }

}
