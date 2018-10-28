import React from 'react';
import './Background.scss';

const IMAGE_URL = 'https://images.pexels.com/photos/358528/pexels-photo-358528.jpeg?h=1000';

const Background = (props) => (
    <div className='background' style={{backgroundImage: `url(${IMAGE_URL})`}}/>
);

export default Background;