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

    public changeUserInfo(data: IUserInfo) {
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
                    if (resultIsNotValid(results)) {
                        throw new Error('Ошибка обновления данных пользователя');
                    } else {
                        const user = results.reduce((acc, result) => {
                            const {value} = result as PromiseFulfilledResult<any>;
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

        const resultIsNotValid = (results: any[]) => results.some(res => {
            const {reason} = res;
            if (reason) {
                console.error(reason);
                return true;
            }
            return false;
        });
    }

    public changeUserProfile(userInfo: IUserInfo) {
        return UserAPI.changeUserProfile(userInfo);
    }

    public changeUserPassword({oldPassword, password}: IUserInfo) {
        return UserAPI.changeUserPassword({oldPassword, newPassword: password});
    }

    public changeUserAvatar(file: File) {
        const form = new FormData();
        form.append('avatar', file);
        UserAPI.changeUserAvatar(form)
            .then((user: IUserInfo) => {
                this.store.setState({user});
            })
            .catch(errorHandler)
    }

    public getUserByLogin(login: string) {
        return UserAPI.getUserByLogin(login)
            .then((user: IUserInfo[]) => {
                return user;
            })
            .catch(errorHandler)
    }
}
