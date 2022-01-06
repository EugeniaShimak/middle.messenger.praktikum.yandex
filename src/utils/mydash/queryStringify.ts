import {isArrayOrObject, isObject} from './isObject';

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for(const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

export function queryString(data: PlainObject) {
    if (!isObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data).map(arr => arr.join('=')).join('&');
} 
