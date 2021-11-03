import Input from "./components/input";
import {PATTERNS} from "../../utils/consts";

const nameValidator = {
    pattern: PATTERNS.firstLastName,
    errorMessage: 'Латиница/кириллица, первая буква заглавная, без пробелов и без цифр, допустим дефис',
}

const passwordValidator = {
    pattern: PATTERNS.password,
    errorMessage: 'Длина 8-40, обязательно хотя бы одна заглавная буква и цифра',
}

export const firstNameField = new Input({
    ...nameValidator,
    name: 'firstName',
    label: 'Имя'
});

export const secondNameField = new Input({
    ...nameValidator,
    name: 'secondName',
    label: 'Фамилия'
});

export const loginField = new Input({
    pattern: PATTERNS.login,
    errorMessage: 'Длина 3 - 20, латиница, цифры, знаки -_, без пробелов',
    name: 'login',
    label: 'Логин'
});

export const emailField = new Input({
    pattern: PATTERNS.email,
    errorMessage: 'Латиница, цифры, знаки -_., обязательно наличие @',
    name: 'email',
    label: 'Email'
});

export const phoneField = new Input({
    pattern: PATTERNS.phone,
    errorMessage: 'Длина 10-15, цифры, может начинаться с +',
    name: 'phone',
    label: 'Телефон'
});

export const passwordField = new Input({
    ...passwordValidator,
    type: 'password',
    name: 'password',
    label: 'Пароль'
});

export const passwordCloneField = new Input({
    ...passwordValidator,
    type: 'password',
    name: 'passwordClone',
    label: 'Повторите пароль'
});

export const passwordOldField = new Input({
    ...passwordValidator,
    type: 'password',
    name: 'passwordOld',
    label: 'Старый пароль'
});