import '../../../static/sass/custom.scss'
import ChatPage from '../../templates/chat';

export const Chat = ({currentChatId}: { currentChatId: number | null }) => new ChatPage({
    currentChatId
});


