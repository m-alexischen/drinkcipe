const LOCAL_HOST = 'http://localhost:8080';

export function getImageURL(imageId) {
    return `${LOCAL_HOST}/api/public/image/${imageId}`;
};