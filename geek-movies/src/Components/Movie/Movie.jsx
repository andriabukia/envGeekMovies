import './Movie.css'; 
import favIcon from '../../assets/fav.png';
import checkIcon from '../../assets/checkicongud.png';
import { useState } from 'react';

function Movie({ onCardClick,id,vote_average,vote_count, img,popularity, release_date,name, description, genre, onRemoveFromWishlist, onAddToWishlist }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isClicked) {
      onRemoveFromWishlist(id); 
      setIsClicked(false);
    } else {
      onAddToWishlist({ id,vote_average,release_date,vote_count,popularity, img, name, description, genre });
      setIsClicked(true);
    }
  };

  return (
    <div className="movie-card" onClick={onCardClick}>
      <img src={img} alt={name} className="movie-img" />
      <div className="movie-content">
        <h2>{name}</h2>
        <p className="movie-desc">{description}</p>
        <p className='sumInfo'>popularity: {popularity}</p>
        <p className='sumInfo'>release date: {release_date}</p>
        <p className='sumInfo'>average vote: <span>{vote_average}</span>, vote count: <span>{vote_count}</span></p>
        <div className="movie-footer">
          <span className="movie-genre">{genre}</span>
          <button 
            onClick={handleClick} 
            className={`watchlist-btn ${isClicked ? 'active' : ''}`}
          >
            <img src={isClicked ? checkIcon : favIcon} alt="watchlist" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;