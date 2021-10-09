import Handlebars from "../../static/lib/handlebars-v4.7.7";
import "./partials/wrapper_center_layout.tmpl";
import {headerTmpl} from "./partials/header_layout.tmpl";

const defaultAvatar =  new URL(
    "../../static/img/avatar.png",
    import.meta.url
);

const iconsUrl = {
    plane: new URL(
        "../../static/icons/plane.svg",
        import.meta.url
    ),
    attach: new URL(
        "../../static/icons/attach.svg",
        import.meta.url
    ),
    threePoints: new URL(
        "../../static/icons/threePoints.svg",
        import.meta.url
    ),
}

const chat = `${headerTmpl({withActions: true})}
<main class="chat_container">
    <section class="chat_feed">
        {{#if currentDialogId}}
            <div class="chat_preview active">
                <div class="chat_preview_text">
                    <div class="chat_preview_title">Имя юзера</div>
                    <p class="chat_preview_message">
                        ыаыаыаыа ыаыва ыаввыа ыаыаы ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                        ыаыаыаыа ыаыва ыаввыа
                        ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                        аыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                    </p>
                </div>
                <div class="chat_preview_info">
                    <div class="chat_preview_count">1</div>
                    <div class="chat_preview_time">10:00</div>
                    <div class="avatar chat_preview_avatar">
                        <img src="${defaultAvatar}" alt="avatar">
                    </div>
                </div>
                <button class="button_chat_preview"></button>
            </div>
            <div class="chat_preview">
                <div class="chat_preview_text">
                    <div class="chat_preview_title">Оченб длинное предлинное название</div>
                    <p class="chat_preview_message">
                        ыаыаыаыа ыаыва ыаввыа ыаыаы ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                        ыаыаыаыа ыаыва ыаввыа
                        ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                        аыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа ыаыаыаыа ыаыва ыаввыа
                    </p>
                </div>
                <div class="chat_preview_info">
                    <div class="chat_preview_count">22</div>
                    <div class="chat_preview_time">23.12.21</div>
                    <div class="avatar chat_preview_avatar">
                        <img src="${defaultAvatar}" alt="avatar">
                    </div>
                </div>
                <button class="button_chat_preview"></button>
            </div>
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
                <div class="dialog_day_container">
                    <div class="dialog_date">06.10.21</div>
    
                    <div class="dialog_message_container">
                        <div class="dialog_message_item">
                            <div class="avatar dialog_message_user_avatar">
                                <img src="${defaultAvatar}" alt="avatar">
                            </div>
                        </div>
                        <div class="dialog_message_item">
                            <div class="dialog_message_user_name">Имя юзера</div>
                            <div class="dialog_message_info_container">
                                <div class="dialog_message_content">
                                    <div class="dialog_message_text">ssgdgdfgdfg ssgdgdfgdfgdgdgfdgf ssgdgdfgdfgdgdgfdgf
                                        ssgdgdfgdfgdgdgfdgf ssgdgdfgdfgdgdgfdgf ssgdgdfgdfgdgdgfdgf dgdgfdgf
                                        ssgdgdfgdfgdgdgfdgf ssgdgdfgdfgdgdgfdgf
                                    </div>
                                </div>
                                <div class="dialog_message_info">
                                    <div class="dialog_message_time">
                                        23.12
                                    </div>
                                    <div class="dialog_message_status"></div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="dialog_message_container my_message">
                        <div class="dialog_message_item">
                            <div class="avatar dialog_message_user_avatar">
                                <img src="${defaultAvatar}" alt="avatar">
                            </div>
                        </div>
                        <div class="dialog_message_item">
                            <div class="dialog_message_user_name">Я</div>
                            <div class="dialog_message_info_container">
                                <div class="dialog_message_content">
                                    <div class="dialog_message_text">вап вамва gdавав fgdgdgfdgf</div>
                                    <div class="dialog_message_picture">
                                        <img src="${defaultAvatar}" alt="message_picture">
                                    </div>
                                </div>
                                <div class="dialog_message_info">
                                    <div class="dialog_message_time">
                                        23.12
                                    </div>
                                    <div class="dialog_message_status read"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="chat_dialog_message_editor">
                <form action="#" class="form_message" method="post">
                    <div class="message_editor">
                        <textarea class="message_textarea"></textarea>
                    </div>
                    <div class="message_buttons">
                        <button class="message_buttons_attach_file">
                            <img src=${iconsUrl.attach} alt="attach_file">
                        </button>
                        <button type="submit" class="button message_buttons_send">
                            <img src=${iconsUrl.plane} alt="send_message">
                        </button>
                    </div>
                </form>
            </div>
        </section>
        {{else}}
            <section class="chat">
                <p class="chat_stub">Выберите чат.</p>
            </section>
        {{/if}}
</main>`;

export const chatTmplWithoutChosenMessage = Handlebars.compile(chat)({
    currentDialogId: null,
});

export const chatTmplWithMessages =  Handlebars.compile(chat)({
    currentDialogId: '1',
    dialogs: []
});