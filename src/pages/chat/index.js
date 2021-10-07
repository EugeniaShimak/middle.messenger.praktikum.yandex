import Handlebars from 'handlebars';
import '../../../static/sass/custom.scss'

const string = "<div class='content'></div>"

let template = Handlebars.compile(string);


document.getElementById('page').innerHTML = template();