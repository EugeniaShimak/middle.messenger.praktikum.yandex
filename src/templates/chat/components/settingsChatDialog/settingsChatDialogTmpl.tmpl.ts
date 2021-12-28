export const settingsChatDialogTmpl = `
<div class="settings_chat_title">Настройки чата</div>
 <div class="settings_chat_users_container">
      {{#list users}}{{/list}}
</div>
{{{formAddUser}}}`;

export const userTmpl = `
<div class="user">{{{login}}}</div>
{{{buttonDeleteUser}}}
`;

export const formAddUserTmpl = `{{{inputUser}}}{{{buttonAddUser}}}`

