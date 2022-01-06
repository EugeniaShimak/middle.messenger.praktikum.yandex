import Route from './Route';
import {routes} from '../consts';
import {AuthController} from '../../controllers/Auth.controller';

class Router {

    static __instance: Router | null;
    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _rootQuery: string | null;
    public authController: AuthController;
    private privateRoutes: (string)[];
    private publicRoutes: (string)[];

    constructor(_rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = _rootQuery

        Router.__instance = this;
        this.authController = new AuthController();
        this.privateRoutes = [routes.messenger, routes.settings];
        this.publicRoutes = [routes.login, routes.signup];
    }

    use(pathname: string, block: any, propsBlock: object = {}) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery, propsBlock});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = event => {
            // @ts-ignore
            this._onRoute(event.currentTarget?.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            this.go(routes.err404);
        } else {
            const userInSystem = this.authController.isAuth();

            if (!userInSystem && this.privateRoutes.includes(pathname)) {
                this.go(routes.login);
            }
            else if (this.publicRoutes.includes(pathname) && userInSystem) {
                this.go(routes.messenger);
            }
            else {
                if (this._currentRoute) {
                    this._currentRoute.leave();
                }

                route.render();
                this._currentRoute = route;
            }
        }

    }

    go(pathname: string) {
        this.history.pushState({route: pathname}, '', pathname);
        this._onRoute(pathname);
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }
}

export const router = new Router('#app');
