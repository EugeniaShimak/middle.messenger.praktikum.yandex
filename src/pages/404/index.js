import '../../../static/sass/custom.scss';
import {errorTmpl} from "../../templates/error.tmpl";
document.getElementById('page').innerHTML = errorTmpl({code_error: '404', text_error: 'Здесь ничего нет'});