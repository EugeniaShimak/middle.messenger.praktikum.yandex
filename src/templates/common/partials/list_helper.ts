import Handlebars from 'handlebars';
import Block from '../../../utils/services/Block';

export default Handlebars.registerHelper('list', (items) => {
    const itemsAsHtml = items.map((preview: Block) => preview?.getContent()?.outerHTML);
    return itemsAsHtml.join('\n');
});
