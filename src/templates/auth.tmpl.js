import Handlebars from "handlebars";
import {buttonTmpl} from "./components/button.tmpl";
import {titleTmpl} from "./components/title.tmpl";
import "./partials/wrapper_center_layout.tmpl";
import {inputTmpl} from "./components/input.tmpl";

const authPageCommon = `{{#> wrapperCenter}}
                        ${titleTmpl({title: "{{title}}", tag: 'h1'})}
                        <form action="#" class="form_auth" method="post">
                           {{#if register}}
                                ${inputTmpl({
                                    name: 'first_name',
                                    label: 'Имя',
                                })}
                                ${inputTmpl({
                                    name: 'second_name',
                                    label: 'Фамилия',
                                })}
                                ${inputTmpl({
                                    name: 'login',
                                    label: 'Логин',
                                })}
                               ${inputTmpl({
                                    name: 'email',
                                    label: 'Email',
                                })}
                                ${inputTmpl({
                                    name: 'phone',
                                    label: 'Телефон',
                                })}
                                ${inputTmpl({
                                    name: 'password',
                                    label: 'Пароль',
                                    type: 'password',
                                })}   
                              ${inputTmpl({
                                    name: 'password_clone',
                                    label: 'Повторите пароль',
                                    type: 'password',
                                })}
                           {{else}}
                              ${inputTmpl({
                                    name: 'login',
                                    label: 'Логин',
                                })}
                              ${inputTmpl({
                                    name: 'password',
                                    label: 'Пароль',
                                    type: 'password',
                                })}
                           {{/if}}
                            ${buttonTmpl({label: '{{buttonLabel}}', type: 'submit'})}
                        </form>
                        <a href='#' class="link">{{linkLabel}}</a>
                    {{/ wrapperCenter}}`;

export const authTmpl = Handlebars.compile(authPageCommon)({
    title: 'Войти',
    linkLabel: 'Зарегистрироваться',
    buttonLabel: 'Войти',
    register: false
});

export const registerTmpl = Handlebars.compile(authPageCommon)({
    title: 'Регистрация',
    linkLabel: 'Войти',
    buttonLabel: 'Зарегистрироваться',
    register: true
});