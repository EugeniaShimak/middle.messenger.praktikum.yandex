import {expect} from 'chai';
import '../../../../global';
import Block from '../Block';
import {compileHandlebars} from '../../functions/manipulateDOM';

beforeEach(done => setTimeout(done, 100))
describe('Проверяем блок', () => {

    interface IText {
        text?: string
    }

    const text = 'Привет';

    class Text extends Block {
        constructor(props: IText) {
            super('div', {
                ...props,
            });
        }

        render() {
            return compileHandlebars('{{text}}', this.props);
        }
    }

    const textBlock = new Text({text});

    it('Проверка получения контента', () => {
        expect(textBlock.getContent()?.innerHTML).to.eq(text);
    });
    it('Проверка добавления атрибута', () => {
        textBlock.setProps({
            attributes: {id: '123'}
        })
        textBlock._addAttributes()
        expect(textBlock.element?.attributes[0].name).to.eq('id');
        expect(textBlock.element?.attributes[0].value).to.eq('123');
    });
    it('Изменение пропса', () => {
        textBlock.setProps({
            text: 'Пока'
        });
    });
    it('Проверка изменения пропса и перерендера компонента', () => {
        expect(textBlock.getContent()?.innerHTML).to.eq('Пока');
    });
    it('Проверка добавления класса', () => {
        textBlock.setProps({
            classes: ['my-class']
        })
        textBlock._addClasses();
        expect(textBlock.element?.classList.contains('my-class')).to.eq(true);
    });
    it('Проверка упрятывания компонента', () => {
        textBlock.hide();
        expect(textBlock.element?.classList.contains('hidden')).to.eq(true);
    });
    it('Проверка показывания компонента', () => {
        textBlock.show();
        expect(textBlock.element?.classList.contains('hidden')).to.eq(false);
    });
    it('Проверка добавления евента', () => {
        textBlock.setProps({
            events: {
                click: () => {
                    setTimeout(() => {
                        textBlock.setProps({
                            text: 'CLICK!'
                        })
                    }, 300)
                }
            }
        })
        textBlock._addEvents();
        expect(typeof textBlock.getEvents()?.click).to.eq('function');
    });
    it('Вызов евента', () => {
        const elem = textBlock.element as HTMLElement;
        elem.click();
    });
    it('Проверка срабатывания евента', () => {
        expect(textBlock.getContent()?.innerHTML).to.eq('CLICK!');
    });
}); 
