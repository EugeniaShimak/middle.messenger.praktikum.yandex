import '../common/partials/wrapper_center_layout.tmpl';

const defaultAvatar =  new URL(
    '../../../static/img/avatar.png',
    import.meta.url
);

export const profileTmpl = `{{{header}}}
<main class="profile_container">
    <div class="wrapper_middle">
        <div class="avatar user_avatar">
            <img src="{{#if urlAvatar}}{{urlAvatar}}{{else}}${defaultAvatar}{{/if}}" crossorigin="use-credentials" alt="avatar">
            <div class="button_user_avatar_text"><p>Изменить фото</p></div>
            {{{inputAvatarLoad}}}
        </div>
        {{{title}}}
        {{{form}}}
    </div>
</main>`;

export const formProfile = `{{{first_name}}}
             {{{second_name}}}
             {{{display_name}}}
             {{{login}}}
             {{{email}}}
             {{{phone}}}
             {{{password}}}
             {{{passwordClone}}}
             {{{oldPassword}}}
             {{{button}}}`;