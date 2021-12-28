import {TIndexed} from '../interfaces';

export function isObject(value: unknown): value is TIndexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}


export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | TIndexed {
    return isObject(value) || isArray(value);
}