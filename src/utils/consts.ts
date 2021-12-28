export const PATTERNS = {
    firstLastName: /^[A-ZА-Я][a-zA-ZА-Яа-я-]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
    login: /^(?!\d+$)[\w.-]{3,20}[0-9a-zA-Z-_]$/gm,
    email: /^[a-z0-9-_.]+@[a-z0-9-_.]+\.\S+$/i,
    phone: /^\+*[0-9]{10,15}$/,
    message: /^(?=\s*\S).*$/gm,
}

export const host = 'ya-praktikum.tech/api/v2/';
export const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

export const routes = {
    login: '/',
    messenger: '/messenger',
    err505: '/505',
    err404: '/404',
    signup: '/sign-up',
    settings: '/settings',
}