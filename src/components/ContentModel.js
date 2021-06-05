import React, { useState, useEffect } from 'react';
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { img_500, unavailableLandscape } from "../config/config";
import Button from '@material-ui/core/Button';
import YouTubeIcon from '@material-ui/icons/YouTube';
import "./contentModel.css"
import Carousel from "./Caurasol";
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#404040",
    border: "1px solid #282c34",
    borderRadius: 3,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));


export default function ContentModel({ children, media, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
    setLoading(false)
  };


  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  });


  return (
    <>
      {
        loading ? <div className="loading_div"><CircularProgress size="1rem" style={{ color: "#ffffff" }} /></div> : <div className="media" type="button" onClick={handleOpen}>
          {children}
        </div>
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && <div className={classes.paper}>
            <div className="contentModel" >
              <img className="content_img" alt={content.name || content.title} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailableLandscape} />
              <img className="content_img_landscape" alt={content.name || content.title} src={content.poster_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} />

              <div className="contentModel_about">

                <span className="content_title">{content.name || content.title} ({content.first_air_date || content.release_date || "----"} )</span>
                {content.tagline && <i className="content_tagline">{content.tagline}</i>}
                {
                  content.vote_average > 0 && <div className="contentModel_rating">
                    <p>Rating:</p>
                    <Rating name="half-rating-read" defaultValue={content.vote_average / 2} precision={0.1} readOnly /> <p>{content.vote_average}/10</p>

                  </div>

                }

                <div className="genres">
                  {
                    content.genres.map(g => {
                      return <Chip size="medium" key={g.id} style={{ color: '#ffffff', backgroundColor: '#282c34', margin: '2px' }} label={g.name} variant="outlined" />
                    })
                  }
                </div>

                <span className="content_dscription">{content.overview}</span>

                <div>
                  <Carousel media={media} id={id} />
                </div>
                {video && <Button style={{ backgroundColor: '#181818', color: "#ffffff" }} variant="contained" startIcon={<YouTubeIcon />} target="_blank" href={`https://www.youtube.com/watch?v=${video}`}>TRAILER</Button>}
              </div>
            </div>
          </div>}
        </Fade>
      </Modal>
    </>
  );
}
