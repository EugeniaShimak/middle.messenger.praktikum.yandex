import {linkTmpl} from './link.tmpl';
import Block from '../../../../../../utils/services/Block';
import {compileHandlebars} from '../../../../../../utils/functions/manipulateDOM';

interface ILink {
    grey?: boolean,
    label?: string | HTMLElement,
    href?: string,
    click?: () => void
}

export default class Link extends Block {
    constructor(props: ILink) {
        const {href = window.location.href} = props;
        super('li', {
            ...props,
            active: window.location.href === href,
            classes: ['header_item'],
            settings: {withInternalID: true, eventsToChild: true},
            events: {
                click: (event: Event) => {
                    event.preventDefault();
                    if (props.click) {
                        props.click();
                    }
                },
            },
        });
    }

    render() {
        return compileHandlebars(linkTmpl, this.props);
    }
}