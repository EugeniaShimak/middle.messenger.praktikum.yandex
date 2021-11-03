import {objectStrings} from "../interfaces";

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

const TIMEOUT = 5000;

type data = any;
type headers = objectStrings;

type options = {
    method: string, data?: data, headers?: headers, retries?: number, timeout?: number
}

function queryStringify(data: data) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

class HTTPTransport {
    get = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: options, timeout: number = TIMEOUT) => {
        const {method, data = {}, headers = {}} = options;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, method === METHODS.GET || !data
                ? `${url}${queryStringify(data)}`
                : url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
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

function fetchWithRetry(url: string, options: options) {
    const {retries = 1} = options;

    function onError(err: object): object {
        const triesLeft = retries - 1;
        if (!triesLeft) {
            throw err;
        }

        return fetchWithRetry(url, {...options, retries: triesLeft});
    }

    const req = (url: string, options: options): Promise<any> => {
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