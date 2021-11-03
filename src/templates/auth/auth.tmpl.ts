import "../common/partials/wrapper_center_layout.tmpl";

export const authTmpl = `{{#> wrapperCenter}}
                        {{{title}}}
                        {{{form}}}
                        <a href='#' class="link">{{linkLabel}}</a>
                    {{/ wrapperCenter}}`;

export const formAuth = `{{#if register}}
                               {{{firstName}}}
                               {{{secondName}}}
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