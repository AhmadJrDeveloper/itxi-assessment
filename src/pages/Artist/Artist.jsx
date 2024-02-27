import React, { useState } from 'react';
import SearchButton from "../../components/SearchButton/SearchButton"
import ArtistCard from "../../components/artistCard/ArtistCard"
import './Artist.css'
const Artist = () => {
  const [artistData, setArtistData] = useState(null);

  return (
    <div className='artist-page-container'>
      <div className="searching">
        <SearchButton  setData={setArtistData} />
        </div>
        {artistData !== null && <ArtistCard artistData={artistData} />}
    </div>
  )
}

export default Artist;
