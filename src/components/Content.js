import React from 'react'
import { img_300, unavailable } from '../config/config'
import './Content.css';
import Rating from '@material-ui/lab/Rating';
import ContentModel from "./ContentModel"

const Content = ({id,poster,title,date,media,rating}) => {
    return (
        <ContentModel media={media} id={id}>
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className='title'>{title}</b>
            <div className='subTitle subType'>{media === 'tv' ? "TV Series" : "Movie"}</div>
            <div className='subTitle subDate'>{date}</div>
             {rating>0 && <Rating name="half-rating-read" defaultValue={rating/2} precision={0.1} readOnly /> }
        </ContentModel>
    )
}

export default Content
