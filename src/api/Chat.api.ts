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
    static async create(title: string) {
        return chatAPIInstance.post('/', {parse: true, data: JSON.stringify({title})});
    }

    static async getAll() {
        return chatAPIInstance.get('/', {parse: true});
    }

    static async delete(chatId: string) {
        return chatAPIInstance.delete('/', {data: JSON.stringify({chatId})});
    }

    static async getChatById(id: string) {
        return chatAPIInstance.get(`/${id}/common`, {parse: true});
    }

    static async getUsersOfChat(idChat: TIdChat) {
        return chatAPIInstance.get(`/${idChat}/users`, {parse: true});
    }

    static async getNewMessagesCount(idChat: TIdChat) {
        return chatAPIInstance.get(`/new/${idChat}`, {parse: true});
    }


    static async uploadChatAvatar(data: IChatDataAvatar) {
        return chatAPIInstance.put('/avatar', {parse: true, data: JSON.stringify({...data})});
    }

    static async addUsersToChat(data: IChatUsers) {
        return chatAPIInstance.put('/users', {data: JSON.stringify({...data})});
    }

    static async deleteUsersFromChat(data: IChatUsers) {
        return chatAPIInstance.delete('/users', {data: JSON.stringify({...data})});
    }

    static async getChatToken(chatId: TIdChat) {
        return chatAPIInstance.post(`/token/${chatId}`, {data: JSON.stringify({id: chatId}), parse: true});
    }

    static async getUsersChat(chatId: TIdChat, option?: {limit: number}) {
        return chatAPIInstance.get(`/${chatId}/users/`, {data: option, parse: true});
    }

}