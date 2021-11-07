import '../common/partials/wrapper_center_layout.tmpl';
import {headerTmpl} from '../common/partials/header_layout.tmpl';

const defaultAvatar =  new URL(
    '../../../static/img/avatar.png',
    import.meta.url
);

export const profileTmpl = `${headerTmpl({withActions: false})}
<main class="profile_container">
    <div class="wrapper_middle">
        <div class="avatar user_avatar">
            <img src="{{#if urlAvatar}}{{urlAvatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar">
            <button class="button_user_avatar">Изменить фото</button>
        </div>
        {{{title}}}
        {{{form}}}
    </div>
</main>`;

export const formProfile = `{{{firstName}}}
             {{{secondName}}}
             {{{login}}}
             {{{email}}}
             {{{phone}}}
             {{{password}}}
             {{{passwordClone}}}
             {{{passwordOld}}}
             {{{button}}}`;