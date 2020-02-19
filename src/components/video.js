import React from 'react';

const BASE_URL = "https://www.youtube.com/embed/"


const Video = ({videoId}) => {
    
    return (
        
        
            <iframe height="60%" className="w-100 embed-responsive-item" title="film" src={`${BASE_URL}${videoId}`}/>
  
    )
}

export default Video