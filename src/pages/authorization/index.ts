import '../../../static/sass/custom.scss'
import {renderDOM} from "../../utils/functions/manipulateDOM";
import AuthPage from "../../templates/auth";

const Authorization = new AuthPage({
    title: 'Войти',
    linkLabel: 'Зарегистрироваться',
    buttonLabel: 'Войти',
    register: false
});

renderDOM("#page", Authorization);