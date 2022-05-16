import avatar from '../components/avatar.png';

const LOCAL_HOST = 'http://localhost:8080';

export function getImageURL(imageId) {
    if (imageId === null) {
        return avatar;
    } else {
        return `${LOCAL_HOST}/api/public/image/${imageId}`;
    }
};