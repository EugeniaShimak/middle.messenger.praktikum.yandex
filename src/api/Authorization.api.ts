import {fetchCustom} from '../utils/services/Request';
import {ISignInData, ISignUpData} from '../controllers/Auth.controller';

const authAPI = new fetchCustom('auth');

export class AuthorizationAPI {

    static signUp(signUpData: ISignUpData) {
        return authAPI.post('/signup', {data: JSON.stringify(signUpData)});
    }

    static signIn(signInData: ISignInData) {
        return authAPI.post('/signin', {data: JSON.stringify(signInData)});
    }

    static getUser() {
        return authAPI.get('/user', {parse: true});
    }

    static logOut() {
        return authAPI.post('/logout', {data: JSON.stringify({})});
    }
}
