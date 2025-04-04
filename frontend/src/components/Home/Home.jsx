import { useState } from 'react'
import RoomSearch from '../common/RoomSearch/RoomSearch'
import RoomResult from '../common/RoomResults/RoomResult'
import "./home.css"
const Home = () => {

  const [roomSeachResult, setRoomSearchResult] = useState([])

  const handleSearchResult = (results) =>{
    setRoomSearchResult(results)
  }
  return (
    <div className='home'>
      <div className='banner-container'>
          <h4 className='banner-text'>
        Encontra las mejores opciones para tu descanso
      </h4>

      <RoomSearch handleSearchResult={handleSearchResult}/>
      </div>
    


      <RoomResult roomSearchResults={roomSeachResult}/>
    </div>
  )
}

export default Home