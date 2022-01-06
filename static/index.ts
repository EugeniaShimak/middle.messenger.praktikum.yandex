import './sass/custom.scss'
import {router} from '../src/utils/router/Router';
import ErrorPage from '../src/templates/error';
import AuthPage from '../src/templates/auth';
import ChatPage from '../src/templates/chat';
import ProfilePage from '../src/templates/profile';
import {authorizationDefaultProps} from '../src/pages/authorization';
import {error505DefaultProps} from '../src/pages/505';
import {error404DefaultProps} from '../src/pages/404';
import {registrationDefaultProps} from '../src/pages/registration';
import {profileDefaultProps} from '../src/pages/profile';
import {routes} from '../src/utils/consts';

router
    .use(routes.login, AuthPage, authorizationDefaultProps)
    .use(routes.err505, ErrorPage, error505DefaultProps)
    .use(routes.err404, ErrorPage, error404DefaultProps)
    .use(routes.messenger, ChatPage)
    .use(routes.signup, AuthPage, registrationDefaultProps)
    .use(routes.settings, ProfilePage, profileDefaultProps)
    .start();


window.onclick = function(event: Event) {
    // @ts-ignore
    if (!event.target?.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown_content');
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
