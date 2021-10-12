import '../../../static/sass/custom.scss';
import {errorTmpl} from "../../templates/error.tmpl";

document.getElementById('page').innerHTML = errorTmpl({
    code_error: '505',
    text_error: 'Что-то пошло не так... Уже занимаемся проблемой',
    url: new URL(
        "../../../static/img/error_505.png",
        import.meta.url
    )
});