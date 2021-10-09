import '../../../static/sass/custom.scss'
import {chatTmplWithoutChosenMessage, chatTmplWithMessages} from "../../templates/chat.tmpl";

const chatEmpty = document.getElementById('chat');
const chatWithMessages = document.getElementById('chat_messages');
if (chatEmpty) {
    document.body.innerHTML = chatTmplWithoutChosenMessage;
}
if (chatWithMessages) {
    document.body.innerHTML = chatTmplWithMessages;
}
