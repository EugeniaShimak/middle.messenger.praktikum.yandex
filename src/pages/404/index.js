import Handlebars from 'handlebars';
import '../../../static/sass/custom.scss'

const string = "<div class='content'>\n" +
    "    <div class=\"container_center\">\n" +
    "        <div class=\"wrapper_middle\">\n" +
    "            <div class=\"code_error\">{{code_error}}</div>\n" +
    "            <div class=\"text_error\">{{text_error}}</div>\n" +
    "            <button class=\"button\">Вернуться к чатам</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"

let template = Handlebars.compile(string);


document.getElementById('page').innerHTML = template({code_error: '404', text_error: 'Здесь ничего нет'});