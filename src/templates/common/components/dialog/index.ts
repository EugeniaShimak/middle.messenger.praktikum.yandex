import Block from '../../../../utils/services/Block';
import {
    compileHandlebars,
    getContentFromComponentProps,
} from '../../../../utils/functions/manipulateDOM';
import Button from '../button';
import {wrapperDialogTmpl} from './dialog.tmpl';

interface IDialog {
    classes?: string[],
    contentDialog: Block,
    [others: string]: any;
}

export default class Dialog extends Block {
    constructor(props: IDialog) {
        const {
            classes = [], id,
        } = props;
        super('div', {
            ...props,
            attributes: {id},
            classes: ['dialog', ...classes],
            settings: {withInternalID: true},
            buttonClose: new Button({
                classesButton: ['dialog_close_btn'],
                defaultView: false,
                label: 'Закрыть',
                events: {
                    click: () => {
                        this.hide();
                    },
                },
            }),
        });
    }
    
    componentDidMount() {
        this.hide();
    }

    render() {
        return compileHandlebars(wrapperDialogTmpl, {
            ...getContentFromComponentProps(this.props),
        });
    }
}