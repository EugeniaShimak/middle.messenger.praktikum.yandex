import '../../../static/sass/custom.scss';
import {renderDOM} from "../../utils/functions/manipulateDOM";
import ErrorPage from "../../templates/error";

const Error505 = new ErrorPage({
    codeError: '505',
    textError: 'Что-то пошло не так... Уже занимаемся проблемой',
    url: new URL(
        "../../../static/img/error_505.png",
        import.meta.url
    )
});

renderDOM("#page", Error505);

