import {TIndexed} from '../interfaces';

function set(object: TIndexed | unknown, path: string, value: unknown): TIndexed | unknown {
    if (typeof path !== 'string') {
        new Error('path must be string')
    }
    if (typeof object === 'object' && object !== null) {
        const paths = path.split('.');
        const lastPath = paths[paths.length - 1];
        let target: TIndexed = object;
        paths.forEach(pt => {
            if (target[pt] === undefined && pt !== lastPath) {
                target[pt] = {}
            }
            if (target[pt] && typeof target[pt] === 'object') {
                target = target[pt];
            }
        });
        target[lastPath] = value;
    }
    return object;
}

export default set;

export function getDeep(obj: any, path: string) {
    const paths = path.split('.');
    let current = {...obj}
    paths.forEach(path => {
        if (current[path] == undefined) {
            return undefined;
        }
        else {
            current = current[path];
        }
    });
    return current;
}
