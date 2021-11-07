import '../../../static/sass/custom.scss'
import {renderDOM} from '../../utils/functions/manipulateDOM';
import ProfilePage from '../../templates/profile';

const Profile = new ProfilePage({
    urlAvatar: ''
});

renderDOM('#page', Profile);

