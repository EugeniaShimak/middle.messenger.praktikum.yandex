import '../../../static/sass/custom.scss'
import AuthPage from '../../templates/auth';
import {renderDOM} from '../../utils/functions/manipulateDOM';

const Registration = new AuthPage({
    title: 'Регистрация',
    linkLabel: 'Войти',
    buttonLabel: 'Зарегистрироваться',
    register: true
});

renderDOM('#page', Registration);
