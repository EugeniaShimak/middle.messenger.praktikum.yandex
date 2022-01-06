import {router} from '../router/Router';
import {routes} from '../consts';

export const errorHandler = (error: Error) => {
    console.error(error);
    router.go(routes.err505);
}
