import {buttonTmpl} from "./components/button.tmpl";
import Handlebars from "../../static/lib/handlebars-v4.7.7";
import "./partials/wrapper_center_layout.tmpl";


const errorPage = `<div class='content'>
        {{#> wrapperCenter}}
                {{#if url}}
                    <div class="code_img">
                        <img src="{{url}}" alt="error">
                    </div>
                {{/if}}
                <div class="code_error">{{code_error}}</div>
                <div class="text_error">{{text_error}}</div>
                ${buttonTmpl({label: 'Вернуться к чатам'})}
        {{/ wrapperCenter}}
</div>`
export const errorTmpl = Handlebars.compile(errorPage);