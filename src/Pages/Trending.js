import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Content from '../components/Content';
import Paginaion from '../components/Paginaion';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const Trending = () => {
    const [content, setContent] = useState([]);
    const [dayWeek,setDayWeek] = useState('day')
    const [page ,setPage] = useState(1)
    const fetchData = async () => {
   
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/${dayWeek}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results)
    };
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [page,dayWeek]);
    const changeDayWeek = () => {
        setDayWeek(preVal => {
            return preVal==='day' ? 'week' : 'day'
        })
    }
    return (
        <div>
            
            <span onClick={changeDayWeek} className='pageTitle'>Trending {dayWeek === 'day' ? "Today" : "This Week"} { dayWeek==='day'? <ExpandLessIcon style={{ fontSize: 40 }} /> : <ExpandMoreIcon style={{ fontSize: 40 }}/> }</span>
            <div className = "trending" style={{ display:"flex", flexWrap:'wrap' ,justifyContent:'space-around'}}>
                {
                    content && content.map(e => {
                        return <Content key={e.id} id={e.id} poster={e.poster_path} title={e.title || e.name} date={e.release_date || e.first_air_date} media={e.media_type} rating={e.vote_average} />
                    })
                }
            </div>
            <Paginaion setPage={setPage} numOfPages ={10} />   
        </div>
    )
}

export default Trending
