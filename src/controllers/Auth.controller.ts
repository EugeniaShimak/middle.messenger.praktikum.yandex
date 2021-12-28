import {AuthorizationAPI} from '../api/Authorization.api';
import {router} from '../utils/router/Router';
import {routes} from '../utils/consts';
import {errorHandler} from '../utils/services/errorHandler';
import {Controller} from './Controller';
import {IUserInfo} from './User.controller';
import {initialState} from '../utils/store/Store';

export interface ISignUpData {
    first_name?: string,
    second_name?: string,
    login?: string,
    email?: string,
    password?: string,
    phone?: string
}

export interface ISignInData {
    login?: string,
    email?: string,
}

const AuthFlag = 'Auth';

export class AuthController extends Controller {
    static __instance: AuthController | null;

    constructor() {
        if (AuthController.__instance) {
            return AuthController.__instance;
        }
        super();
    }

    public async signUp(data: ISignUpData) {
        AuthorizationAPI.signUp(data)
            .then(async (res) => {
                console.log(res);
                await this.getUser();
                localStorage.setItem(AuthFlag, 'true');
                router.go(routes.messenger);
            })
            .catch(errorHandler)
    }

    public async signIn(data: ISignInData) {
        AuthorizationAPI.signIn(data)
            .then(async (res) => {
                console.log(res);
                await this.getUser();
                localStorage.setItem(AuthFlag, 'true');
                router.go(routes.messenger);
            })
            .catch(errorHandler)
    }


    public async getUser() {
        return AuthorizationAPI.getUser()
            .then((user: IUserInfo) => {
                this.store.setState({user});
                return user;
            })
            .catch(errorHandler)
    }

    public async logOut() {
        AuthorizationAPI.logOut()
            .then(() => {
                this.clearDataAndGoToLogin();
            }).catch(errorHandler)
    }

    public isAuth(): boolean {
        return localStorage.getItem(AuthFlag) === 'true';
    }

    public clearDataAndGoToLogin() {
        localStorage.clear();
        document.cookie = 'idChat=' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.store.setState({
            ...initialState
        });
        router.go(routes.login);
    }
}