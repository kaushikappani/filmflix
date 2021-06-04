import axios from 'axios'
import React, { useEffect } from 'react';
import Chip from '@material-ui/core/Chip';


const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage
}) => {
    const addGenre = (genre) => {
        setSelectedGenres(preVal => {
            return [...preVal, genre]
        });
        setGenres(preVal => {
            return (preVal.filter((item) => {
                return item.id !== genre.id;
            }))
        })
        setPage(1)

    };
    const removeGenre = (g) => {
        setSelectedGenres(preVal => {
            return (
                preVal.filter(i => {
                    return i.id!==g.id
                })
            )
        })
        setGenres(preVal => {
            return [...preVal,g]
        })
    }
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    };
    useEffect(() => {
        fetchGenres();
    }, [])
    return (
        <div>
             {selectedGenres &&
                selectedGenres.map(e => <Chip key={e.id} style={{color:'#ffffff', backgroundColor:'#000000', margin:'1px'}} clickable onClick={()=>removeGenre(e)} label={e.name} variant="outlined" />)}
            {genres &&
                genres.map(e => <Chip key={e.id} style={{color:'#ffffff', backgroundColor:'#282c34', margin:'1px'}} clickable onClick={()=>addGenre(e)} label={e.name} variant="outlined" />)}
        </div>
    )
}

export default Genres
