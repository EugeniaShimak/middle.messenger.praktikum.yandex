import Handlebars from "handlebars";
const titleComponent = `<div class="title"><{{tag}}>{{title}}</{{tag}}></div>`;

export const titleTmpl = Handlebars.compile(titleComponent);