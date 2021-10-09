import Handlebars from "../../../static/lib/handlebars-v4.7.7";

const buttonComponent = `<button type="{{type}}" class="button">{{label}}</button>`;

export const buttonTmpl = Handlebars.compile(buttonComponent);