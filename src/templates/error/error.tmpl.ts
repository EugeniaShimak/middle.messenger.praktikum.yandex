import "../common/partials/wrapper_center_layout.tmpl";

export const errorTmpl = `<div class='content'>
        {{#> wrapperCenter}}
                {{#if url}}
                    <div class="code_img">
                        <img src="{{url}}" alt="error">
                    </div>
                {{/if}}
                <h1 class="code_error">{{codeError}}</h1>
                <div class="text_error">{{textError}}</div>
                 {{{button}}}    
        {{/ wrapperCenter}}
</div>`;