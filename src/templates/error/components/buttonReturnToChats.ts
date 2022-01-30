import Button from '../../common/components/button';
import {routes} from '../../../utils/consts';

export const buttonReturnToChats = new Button({
    type: 'button',
    label: 'Вернуться к чатам',
    events: {
        click: () => {
            document.location.replace(routes.messenger);
        },
    },
});
