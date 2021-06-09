import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Content from '../components/Content';
import Paginaion from '../components/Paginaion';
import Genres from "../components/Genres";
import useGenre from "../Hooks/useGenre";
import langData from "../languages";
import Languages from "../components/Languages";

const Series = () => {
    window.scrollTo(0, 0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [arrivingToday, setArrivingToday] = useState([]);
    const [numPages, setNumpages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [lang, setLanguange] = useState("en");
    const genreForURL = useGenre(selectedGenres);
    const fetchArrivingToday = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
        setArrivingToday(data.results);
    }
    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}&with_genres=${genreForURL}&with_original_language=${lang}`)
        setContent(data.results);
        setNumpages(data.total_pages)
    };
    const setLang = (e) => {
        setPage(1)
        setLanguange(e.alpha2)
    }
    useEffect(() => {
        fetchMovies();        // eslint-disable-next-line
    }, [page, genreForURL, lang]);
    useEffect(() => {
        fetchArrivingToday();
    }, [])
    return (
        <div>

            <div className="page_title_language">
                <span className='pageTitle'>TV Series</span>
                <div className="languages">
                    <Languages
                        data={langData}
                        selected={lang}
                        handleAdd={setLang}
                    />
                </div>
            </div>
            <div className="genres_div">
                <Genres
                    type='tv'
                    selectedGenres={selectedGenres} genres={genres}
                    setSelectedGenres={setSelectedGenres} setGenres={setGenres}
                    setPage={setPage}
                />
            </div>
            <span className='pageTitle'>Arriving Today</span>
            <div className="arrivingToday">
                {
                    arrivingToday && arrivingToday.map(e => {
                        return <div style={{ paddingRight: "15px", height: "300px" }}><Content key={e.id} id={e.id} poster={e.poster_path} title={e.title || e.name} date={null} media="tv" rating={null} /></div>
                    })
                }
            </div>
            <div className="trending" style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {
                    content && content.map(e => {
                        return <Content key={e.id} id={e.id} poster={e.poster_path} title={e.title || e.name} date={e.release_date || e.first_air_date} media="tv" rating={e.vote_average} />
                    })
                }
            </div>
            {
                numPages > 1 && <Paginaion setPage={setPage} numOfPages={numPages} />
            }
        </div>
    )
}

export default Series
