import {expect} from 'chai';
import '../../../../global';

import {router} from '../Router';
import {routes} from '../../consts';
import ErrorPage from '../../../templates/error';
import {error404DefaultProps} from '../../../pages/404';
import AuthPage from '../../../templates/auth';
import {registrationDefaultProps} from '../../../pages/registration';

const host = 'http://localhost:8080';

beforeEach(done => setTimeout(done, 1000))
describe('Проверяем переходы у Роутера', () => {
    it('Проверяем добавление и переход по одному маршруту в истории', () => {
        router.use(routes.err404, ErrorPage, error404DefaultProps)
        router.go(routes.err404);
        expect(window.history.length).to.eq(2);
    });
    it('Переходим на роут, которого нет в роутере ( должно перенаправить на страницу ошибки)', () => {
        router.go(routes.settings);
        expect(window.history.length).to.eq(4);
        expect(document.location.href).to.eq(`${host}${routes.err404}`);
    });
    it('Переход на новый существующий роут', () => {
        router.use(routes.signup, AuthPage, registrationDefaultProps);
        router.go(routes.signup);
        expect(document.location.href).to.eq(`${host}${routes.signup}`);
    });

    it('Переход назад', () => {
        router.back();
    });
    it('Проверка успешного перехода назад', () => {
        expect(router.history.state?.route).to.eq(`${routes.err404}`);
        expect(document.location.href).to.eq(`${host}${routes.err404}`);
    });

    it('Переход вперед', () => {
        router.forward();
    });
    it('Проверка успешного перехода вперед', () => {
        expect(router.history.state?.route).to.eq(`${routes.signup}`);
    });
}); 
