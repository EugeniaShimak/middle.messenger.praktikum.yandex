import {TIndexed} from '../interfaces';
import {isArrayOrObject} from './isObject';

function isEqual(obj1: TIndexed, obj2: TIndexed) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (const [key, value] of Object.entries(obj1)) {
        const valObj2 = obj2[key];
        if (isArrayOrObject(value) && isArrayOrObject(valObj2)) {
            if (isEqual(value, valObj2)) {
                continue;
            }
            return false;
        }

        if (value !== valObj2) {
            return false;
        }
    }

    return true;
}

export default isEqual