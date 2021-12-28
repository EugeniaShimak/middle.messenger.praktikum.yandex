import {errorHandler} from '../utils/services/errorHandler';
import {UserAPI} from '../api/User.api';
import {Controller} from './Controller';

export interface IUserInfo {
    first_name?: string,
    second_name?: string,
    display_name?: string,
    login?: string,
    email?: string,
    phone?: string,
    oldPassword?: string,
    passwordClone?: string,
    password?: string,
    avatar?: string,
    id?: string | number,
}


export class UserController extends Controller {

    static __instance: UserController | null;

    constructor() {
        if (UserController.__instance) {
            return UserController.__instance;
        }
        super();
    }

    public async changeUserInfo(data: IUserInfo) {
        const {oldPassword, password, passwordClone, ...rest} = data;
        const needUpdatePassword = oldPassword && password;
        if (needUpdatePassword && passwordClone !== password) {
            console.log('Новый пароль не совпадает');
            return;
        }

        const passwordData = {oldPassword, password};

        const userData = rest;

        const changeUserInfoPromise = () => this.changeUserProfile(userData);
        const changeUserPasswordPromise = () => this.changeUserPassword(passwordData);

        if (needUpdatePassword) {
            Promise.allSettled([
                changeUserPasswordPromise(),
                changeUserInfoPromise(),
            ])
                .then((results) => {
                    if (results.some(res => {
                        // @ts-ignore
                        const {reason} = res;
                        if (reason) {
                            console.error(reason);
                            return true;
                        }
                        return false;
                    })) {
                        throw new Error('Ошибка обновления данных пользователя');
                    } else {
                        const user = results.reduce((acc, result) => {
                            // @ts-ignore
                            const {value} = result;
                            return {
                                ...acc,
                                ...value
                            }
                        }, {});
                        this.store.setState({user});
                    }
                })
                .catch(errorHandler)
        } else {
            changeUserInfoPromise()
                .then((user: IUserInfo) => {
                    this.store.setState({user});
                })
                .catch(errorHandler)
        }

    }

    public async changeUserProfile({first_name, second_name, display_name, login, email, phone}: IUserInfo) {
        const userInfo = {
            first_name, second_name, display_name, login, email, phone
        };
        return UserAPI.changeUserProfile(userInfo);
    }

    public async changeUserPassword({oldPassword, password}: IUserInfo) {
        const passwordData = {oldPassword, newPassword: password};
        return UserAPI.changeUserPassword(passwordData);
    }

    public async changeUserAvatar(file: File) {
        const form = new FormData();
        form.append('avatar', file);
        UserAPI.changeUserAvatar(form)
            .then((user: IUserInfo) => {
                this.store.setState({user});
            })
            .catch(errorHandler)
    }

    public async getUserById(id: string) {
        UserAPI.getUserById(id)
            .then((user: IUserInfo[]) => {
                return user;
            })
            .catch(errorHandler)
    }

    public async getUserByLogin(login: string) {
        return UserAPI.getUserByLogin(login)
            .then((user: IUserInfo[]) => {
                return user;
            })
            .catch(errorHandler)
    }
}