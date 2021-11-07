import Title from '../../common/components/title';

export const titleUserName = (title = '') => new Title({
    tag: 'h3',
    title
});
