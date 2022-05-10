import { useState, useEffect } from 'react';
import { userProfile } from '../../lib/api';
import { getImageURL } from './GetImageURL';

const GetMyImage = () => {
    const [showPic, setShowPic] = useState();

    useEffect(() => {
        userProfile().then(res => {
            if (res.userImage !== null){
                setShowPic(getImageURL(res.userImage.imageId))
            }
        });
    }, []);

    return(
        <img alt='' src={showPic} />
    )
};

export default GetMyImage;