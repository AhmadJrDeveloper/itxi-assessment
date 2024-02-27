import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AlbumCard.css';

const AlbumCard = () => {
  const [albums, setAlbums] = useState([]);
  const [url,setUrl] = useState();
  const { uri } = useParams();
  const extractedUri = uri.slice(15);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${extractedUri}/albums`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setAlbums(response.data.items);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    if (accessToken) {
      fetchAlbums();
    }
  }, []);

  const handleGetUrl = (link) => {
    return () => {
      setUrl(link);
      window.open(link, '_blank');
    };
  };
  

  return (
    <div className="d-flex justify-content-center">
      <div>
        <div className="titles">
        {albums.length > 0 && (
          <h1>{albums[0].artists[0].name}</h1>
        )}
        <h2 className='albums-word'>Albums</h2>
        </div>
        <div className="album-list d-flex flex-wrap justify-content-center" style={{ gap: "4.5rem" }}>
          {albums.map(album => (
            <div key={album.id} className="album-card card m-2 album-container" style={{ width: '22rem',borderColor:"black" }}>
              <img src={album.images[0].url} className="card-img-top" alt={album.name} style={{ borderRadius: '0px' }} />
              <div className="card-body">
                <h3 className="album-name">{album.name}</h3>
                <p className="card-subtitle">{album.artists[0].name}</p>
                <p className="card-subtitle" style={{marginTop:'2rem'}}>{album.release_date}</p>
                <p className="card-subtitle ">{album.total_tracks} Tracks</p>
              </div>
              <hr className="my-0" /> 
              <div className="preview-container">
              <p className='preview' onClick={handleGetUrl(album.external_urls.spotify)}> Preview in Spotify</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
