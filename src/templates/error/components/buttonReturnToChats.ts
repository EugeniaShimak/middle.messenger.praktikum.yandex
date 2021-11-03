import Button from "../../common/components/button";

export const buttonReturnToChats = new Button({
    type: 'button',
    label: 'Вернуться к чатам',
    events: {
        click: () => {
            document.location.replace('/');
        },
    },
});
