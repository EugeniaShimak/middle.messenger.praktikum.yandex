import {fetchCustom} from '../utils/services/Request';
import {IUserInfo} from '../controllers/User.controller';


const userAPI = new fetchCustom('user');

export class UserAPI {

    static changeUserProfile(userInfo: IUserInfo) {
        return userAPI.put('/profile', {parse: true, data: JSON.stringify(userInfo)});
    }

    static changeUserAvatar(form: any) {
        return userAPI.put('/profile/avatar', {file: true, parse: true, data: form});
    }

    static changeUserPassword(data: any) {
        return userAPI.put('/password', {data: JSON.stringify(data)});
    }

    static getUserById(id: string) {
        return userAPI.get('/', {parse: true, data: {id}});
    }

    static getUserByLogin(login: string) {
        return userAPI.post('/search', {parse: true, data: JSON.stringify({login})});
    }
}
