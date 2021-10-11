import Handlebars from "handlebars";
const inputComponent = `<div class="input_wrapper">
                        <label class="label" for="{{name}}">{{label}}</label>
                        <input class="input" type="{{#if type}}{{type}}{{else}}text{{/if}}" name="{{name}}" id="{{name}}">
                    </div>`;

export const inputTmpl = Handlebars.compile(inputComponent);