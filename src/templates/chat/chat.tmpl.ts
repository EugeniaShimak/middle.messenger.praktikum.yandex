import '../common/partials/wrapper_center_layout.tmpl';
import '../common/partials/list_helper.ts';
import {headerTmpl} from '../common/partials/header_layout.tmpl';

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
}

export const chatTmpl = `${headerTmpl({withActions: true})}
<main class="chat_container">
    <section class="chat_feed">
        {{#if currentDialogId}}
            {{#list chatPreviews}}{{/list}}
        {{/if}}
    </section>
        {{#if currentDialogId}}
            <section class="chat_dialog">
            <div class="chat_dialog_context_menu">
                <div class="button_dialog_context_menu">
                    <img src=${iconsUrl.threePoints} alt="context_menu">
                    <button></button>
                </div>
            </div>
    
            <div class="chat_dialog_messages_container">
            <!-- в массиве-->
            {{#list days}}{{/list}}
            </div>
    
            <div class="chat_dialog_message_editor">
                {{{messageForm}}}
            </div>
        </section>
        {{else}}
            <section class="chat">
                <p class="chat_stub">Выберите чат.</p>
            </section>
        {{/if}}
</main>`;

export const chatPreviewTmpl = `<div class="chat_preview_text">
                    <div class="chat_preview_title">{{userName}}</div>
                    <p class="chat_preview_message">
                        {{message}}
                    </p>
                </div>
                <div class="chat_preview_info">
                    <div class="chat_preview_count {{#if countUnread}}{{else}}invisible{{/if}}">{{countUnread}}</div>
                    <time class="chat_preview_time">{{timeLastMessage}}</time>
                    <div class="avatar chat_preview_avatar">
                        <img src="{{#if userAvatar}}{{userAvatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar">
                    </div>
                </div>`;


export const dayContainerTmpl = `<time class="dialog_date">{{dialogDate}}</time>
                        {{#list messages}}{{/list}}`;

export const messageTmpl = `<div class="dialog_message_item">
                            <div class="avatar dialog_message_user_avatar">
                                <img src="{{#if userAvatar}}{{userAvatar}}{{else}}${defaultAvatar}{{/if}}" alt="avatar">
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
                    {{{message}}}
                    <div class="message_buttons">
                        <button type="button" class="message_buttons_attach_file">
                            <img src=${iconsUrl.attach} alt="attach_file">
                        </button>
                        {{{buttonSubmit}}}
                    </div>
                `;