import './LoginButton.css';
import { useEffect } from 'react';
import Logo from '../../assets/Spotify.png';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate instead of useHistory

const LoginButton = () => {
  const CLIENT_ID = '8b2395cb4e464715adfb81a056b9e199'
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
    }, {});

    return paramsSplitUp;
  };

  const navigate = useNavigate(); 

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      navigate('/artist-search'); 
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };    
  
  return (
    <div className='login-button-container'>
      <div className="main-button">
        <button className='login-button' onClick={handleLogin}>Login</button>
        <img className='spotify-logo' src={Logo} alt="Spotify Logo" />
      </div>
    </div>
  );
};

export default LoginButton;
