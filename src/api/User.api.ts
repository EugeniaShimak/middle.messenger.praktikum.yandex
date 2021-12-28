import {fetchCustom} from '../utils/services/Request';
import {IUserInfo} from '../controllers/User.controller';


const userAPI = new fetchCustom('user');

export class UserAPI {

    static async changeUserProfile(userInfo: IUserInfo) {
        return userAPI.put('/profile', {parse: true, data: JSON.stringify(userInfo)});
    }

    static async changeUserAvatar(form: any) {
        return userAPI.put('/profile/avatar', {file: true, parse: true, data: form});
    }

    static async changeUserPassword(data: any) {
        return userAPI.put('/password', {data: JSON.stringify(data)});
    }

    static async getUserById(id: string) {
        return userAPI.get('/', {parse: true, data: {id}});
    }

    static async getUserByLogin(login: string) {
        return userAPI.post('/search', {parse: true, data: JSON.stringify({login})});
    }
}