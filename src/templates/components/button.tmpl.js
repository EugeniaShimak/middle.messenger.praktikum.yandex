import Handlebars from "handlebars";
const buttonComponent = `<button type="{{type}}" class="button">{{label}}</button>`;

export const buttonTmpl = Handlebars.compile(buttonComponent);