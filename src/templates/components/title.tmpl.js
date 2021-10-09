import Handlebars from "../../../static/lib/handlebars-v4.7.7";

const titleComponent = `<div class="title"><{{tag}}>{{title}}</{{tag}}></div>`;

export const titleTmpl = Handlebars.compile(titleComponent);