import Handlebars from "handlebars";
import {buttonTmpl} from "./components/button.tmpl";
import "./partials/wrapper_center_layout.tmpl";
import {headerTmpl} from "./partials/header_layout.tmpl";
import {titleTmpl} from "./components/title.tmpl";
import {inputTmpl} from "./components/input.tmpl";

const defaultAvatar =  new URL(
    "../../static/img/avatar.png",
    import.meta.url
);

const profile = `${headerTmpl({withActions: false})}
<main class="profile_container">
    <div class="wrapper_middle">
        <div class="avatar user_avatar">
            <img src="{{#if urlAvatar}}{{urlAvatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar">
            <button class="button_user_avatar">Изменить фото</button>
        </div>
        ${titleTmpl({title: 'Имя юзера', tag: 'h3'})}
        <form action="#" class="form_profile" method="post">
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
                ${inputTmpl({
                    name: 'password_old',
                    label: 'Старый пароль',
                    type: 'password',
                })}
             ${buttonTmpl({label: 'Сохранить изменения', type: 'submit'})}
        </form>
    </div>
</main>`;

export const profileTmpl = Handlebars.compile(profile);