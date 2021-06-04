import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Content from '../components/Content';
import Paginaion from '../components/Paginaion';
import Genres from "../components/Genres";
import useGenre from "../Hooks/useGenre";
const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numPages, setNumpages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = useGenre(selectedGenres )
    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}&with_genres=${genreForURL}`)
        setContent(data.results);
        setNumpages(data.total_pages)
    };
        useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page,genreForURL]);
    return (
        <div>
            
            <span className='pageTitle'>Movies </span>
            <Genres
                type='movie'
                selectedGenres={selectedGenres} genres={genres}
                setSelectedGenres={setSelectedGenres} setGenres={setGenres}
                setPage={setPage}
            />
            <div className = "trending" style={{ display:"flex", flexWrap:'wrap' ,justifyContent:'space-around'}}>
                {
                    numPages>1 && content.map(e => {
                        return <Content key={e.id} id={e.id} poster={e.poster_path} title={e.title || e.name} date={e.release_date || e.first_air_date} media='movie' rating={e.vote_average} />
                    })
                }
            </div>
           {
                numPages > 1 &&  <Paginaion setPage={setPage} numOfPages = {numPages} />   
           }  
        </div>
    )
}

export default Movies
