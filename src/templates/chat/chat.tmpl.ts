import '../common/partials/wrapper_center_layout.tmpl';
import '../common/partials/list_helper.ts';

const defaultAvatar = new URL(
    '../../../static/img/avatar.png',
    import.meta.url
);

export const iconsUrl = {
    plane: new URL(
        '../../../static/icons/plane.svg',
        import.meta.url
    ),
    attach: new URL(
        '../../../static/icons/attach.svg',
        import.meta.url
    ),
    threePoints: new URL(
        '../../../static/icons/threePoints.svg',
        import.meta.url
    ),
    addBtn: new URL(
        '../../../static/icons/addBtn.svg',
        import.meta.url
    ),
    deleteBtn: new URL(
        '../../../static/icons/deleteBtn.svg',
        import.meta.url
    ),
}

export const chatTmpl = `{{{header}}}
<main class="chat_container">
    <section class="chat_feed">
            {{#list chatPreviews}}{{/list}}
    </section>
        {{#if dialogIsChosen}}
           {{{chatDialog}}}
        {{else}}
            <section class="chat">
                <p class="chat_stub">Выберите чат.</p>
            </section>
        {{/if}}
       {{{settingsChatDialog}}}
</main>`;

export const chatDialog = `
            <div class="chat_dialog_context_menu">
                <div class="button_dialog_context_menu">
                    <img src=${iconsUrl.threePoints} alt="context_menu">
                    {{{buttonMenuChat}}}
                    <div class="dropdown">
                          <div id="dropdown_settings_chat" class="dropdown_content">
                              {{{buttonSettingsChat}}}
                              {{{buttonDeleteChat}}}
                          </div>
                     </div>         
                </div>
            </div>
    
            <div class="chat_dialog_messages_container">
            {{#list messages}}{{/list}}
            </div>
    
            <div class="chat_dialog_message_editor">
                {{{messageForm}}}
            </div>
       `

export const chatPreviewTmpl = `<div class="chat_preview_text">
                    <div class="chat_preview_title">{{title}}</div>
                    <p class="chat_preview_message">
                        {{content}}
                    </p>
                </div>
                <div class="chat_preview_info">
                    <div class="chat_preview_count {{#if unread_count}}{{else}}invisible{{/if}}">{{unread_count}}</div>
                    <time class="chat_preview_time">{{timeLastMessage}}</time>
                    <div class="avatar chat_preview_avatar">
                        <img src="{{#if avatar}}{{avatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar" crossorigin="use-credentials">
                    </div>
                </div>`;

export const messageTmpl = `<div class="dialog_message_item">
                            <div class="avatar dialog_message_user_avatar">
                                <img src="{{#if userAvatar}}{{userAvatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar" crossorigin="use-credentials">
                            </div>
                        </div>
                        <div class="dialog_message_item">
                            <div class="dialog_message_user_name">{{userNameMessage}}</div>
                            <div class="dialog_message_info_container">
                                <div class="dialog_message_content">
                                    <div class="dialog_message_text">{{message}}</div>
                                    {{#if messagePicture}}
                                    <div class="dialog_message_picture">
                                        <img src="{{messagePicture}}" alt="message_picture">
                                    </div>
                                    {{/if}}
                                </div>
                                <div class="dialog_message_info">
                                    <time class="dialog_message_time">
                                        {{time}}
                                    </time>
                                    {{#if myMessage}}<div class="dialog_message_status {{#if read}}read{{/if}}"></div>{{/if}}
                                </div>
                            </div>
                        </div>
                    `

export const messageFormTmpl = `
                    {{#if usersMoreThanOne}}
                    {{{message}}}
                    <div class="message_buttons">
                        <button type="button" class="message_buttons_attach_file">
                            <img src=${iconsUrl.attach} alt="attach_file">
                        </button>
                        {{{buttonSubmit}}}
                    </div>
                    {{else}}
                    <span class="empty_chat">Чтобы начать общение, добавьте пользователя в чат</span>
                    {{/if}}
                `;