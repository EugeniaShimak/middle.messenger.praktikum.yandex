import '../common/partials/wrapper_center_layout.tmpl';

export const authTmpl = `{{#> wrapperCenter}}
                        {{{title}}}
                        {{{form}}}
                        <a href='{{#if register}}/{{else}}/sign-up{{/if}}' class="link">{{linkLabel}}</a>
                    {{/ wrapperCenter}}`;

export const formAuth = `{{#if register}}
                               {{{first_name}}}
                               {{{second_name}}}
                               {{{login}}}
                               {{{email}}}
                               {{{phone}}}
                               {{{password}}}
                               {{{passwordClone}}}
                           {{else}}
                               {{{login}}}
                               {{{password}}}
                           {{/if}}
                           {{{button}}}`;