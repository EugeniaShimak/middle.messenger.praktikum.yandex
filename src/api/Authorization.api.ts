import {fetchCustom} from '../utils/services/Request';
import {ISignInData, ISignUpData} from '../controllers/Auth.controller';

const authAPI = new fetchCustom('auth');

export class AuthorizationAPI {

    static async signUp(signUpData: ISignUpData) {
        return authAPI.post('/signup', {data: JSON.stringify(signUpData)});
    }

    static async signIn(signInData: ISignInData) {
        return authAPI.post('/signin', {data: JSON.stringify(signInData)});
    }

    static async getUser() {
        return authAPI.get('/user', {parse: true});
    }

    static async logOut() {
        return authAPI.post('/logout', {data: JSON.stringify({})});
    }
}