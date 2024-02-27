// ArtistCard.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Star from '../../assets/star.png';
import { useNavigate } from 'react-router-dom';
import User from '../../assets/user.jpg'
import './artistCard.css';

const ArtistCard = ({ artistData }) => {
  const [uri, setUri] = useState();
  const navigate = useNavigate();

  const getStarRating = (popularity) => {
    if (popularity >= 0 && popularity <= 20) {
      return 1;
    } else if (popularity <= 40) {
      return 2;
    } else if (popularity <= 60) {
      return 3;
    } else if (popularity <= 80) {
      return 4;
    } else {
      return 5;
    }
  };

  const handleSetUri = (uri) => {
    setUri(uri);
    navigate(`/artist-album/${uri}`);
  };
  

  return (
    <div className="artist-card-container">
      {artistData.artists.items.map((artist, index) => (
        <Card 
          key={index} 
          style={{ width: '22rem', borderRadius: '0px',borderColor:"black" }} 
          onClick={() => handleSetUri(artist.uri)} 
        >
          {(artist.images.length > 0 ? (
            <Card.Img className='artist-image' variant="top" src={artist.images[0].url} />
          ) : (
            <Card.Img className='artist-image' variant="top" src={User} /> 
          ))}
          <Card.Body>
            <Card.Title>{artist.name}</Card.Title>
            <Card.Text>
              <p className='artists-followers'>{artist.followers.total} Followers</p>
            </Card.Text>
            <div className="star-wrapper">
              {[...Array(getStarRating(artist.popularity))].map((_, i) => (
                <img key={i} className='star-image' src={Star} alt="star" />
              ))}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ArtistCard;
