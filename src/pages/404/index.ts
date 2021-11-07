import '../../../static/sass/custom.scss';
import {renderDOM} from '../../utils/functions/manipulateDOM';
import ErrorPage from '../../templates/error';

const Error404 = new ErrorPage({
    codeError: '404',
    textError: 'Здесь ничего нет',
});

renderDOM('#page', Error404);
