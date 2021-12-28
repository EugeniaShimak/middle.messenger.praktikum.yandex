import {TObjectStrings} from '../interfaces';
import {host} from '../consts';
import {AuthController} from '../../controllers/Auth.controller';

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

const TIMEOUT = 5000;

type TData = any;

interface IOptions {
    method?: string, data?: TData, headers?: TObjectStrings, retries?: number, timeout?: number, [others: string]: any
}

function queryStringify(data: TData) {
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    _endpoint = host;

    constructor(endpoint: string) {
        this._endpoint = `${host}${endpoint}`;
    }

    get = (url: string, options: IOptions | undefined = {}) => {
        return this.request(`${this._endpoint}${url}`, {...options, method: METHODS.GET}, options?.timeout);
    };

    post = (url: string, options: IOptions | undefined = {}) => {
        return this.request(`${this._endpoint}${url}`, {...options, method: METHODS.POST}, options?.timeout);
    };

    put = (url: string, options: IOptions | undefined = {}) => {
        return this.request(`${this._endpoint}${url}`, {...options, method: METHODS.PUT}, options?.timeout);
    };

    delete = (url: string, options: IOptions | undefined = {}) => {
        return this.request(`${this._endpoint}${url}`, {...options, method: METHODS.DELETE}, options?.timeout);
    };

    request = (url: string, options: IOptions, timeout: number = TIMEOUT) => {
        const {method = '', data = {}, headers = {}, file = false, parse = false} = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, method === METHODS.GET || !data
                ? `https://${url}${queryStringify(data)}`
                : `https://${url}`);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            if (!file) {
                xhr.setRequestHeader('content-type', 'application/json');
            }
            xhr.withCredentials = true;

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status <= 299) {
                    resolve(parse ? JSON.parse(xhr.response): xhr);
                } else {
                    if (xhr.status === 401) {
                        const authController = new AuthController();
                        authController.clearDataAndGoToLogin();
                        resolve(xhr);
                    }
                    reject(xhr);
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

function fetchWithRetry(url: string, options: IOptions) {
    const {retries = 1} = options;

    function onError(err: object): object {
        const triesLeft = retries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(url, {...options, retries: triesLeft});
    }

    const req = (url: string, options: IOptions): Promise<any> => {
        // @ts-ignore
        const http = new HTTPTransport();
        switch (options.method) {
            case METHODS.GET:
                return http.get(url, options).catch(onError);
            case METHODS.POST:
                return http.post(url, options).catch(onError);
            case METHODS.PUT:
                return http.put(url, options).catch(onError);
            case METHODS.DELETE:
                return http.delete(url, options).catch(onError);
        }
        return http.get(url, options).catch(onError);
    }

    return req(url, options).catch(onError);
}

export const fetchCustom = HTTPTransport;

export const fetchRetry = fetchWithRetry;