import {TIndexed} from '../interfaces';

function cloneDeep(obj: any) {
    return (function _cloneDeep(item: any) {
        if (item === null || typeof item !== 'object') {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf());
        }

        if (item instanceof Array) {
            const copyArr: any[] = [];

            item.forEach((_, i) => (copyArr[i] = _cloneDeep(item[i])));

            return copyArr;
        }

        if (item instanceof Set) {
            const copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        if (item instanceof Map) {
            const copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        if (item instanceof Object) {
            const copy: TIndexed = {};

            Object.keys(item).forEach((k:string) => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}

export default cloneDeep
