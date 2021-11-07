import '../../../static/sass/custom.scss'
import ChatPage from '../../templates/chat';
import {renderDOM} from '../../utils/functions/manipulateDOM';

const Chat = ({currentDialogId}: { currentDialogId: number | null }) => new ChatPage({
    currentDialogId
});

renderDOM('#chat', Chat({currentDialogId: null}));

renderDOM('#chat_messages', Chat({currentDialogId: 1}));
