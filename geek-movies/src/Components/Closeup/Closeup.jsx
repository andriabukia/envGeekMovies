import decline from '../../assets/declineBest.png';
import './Closeup.css';

function Closeup({ img, vote_average, vote_count, popularity, description, name, genre, release_date, onClose }) {
    return(
        <>
        <div className='global'>
            <img src={img} alt={name} />
            
            <div className='columnz'>
                <div className='topRow'>
                    <p>{name}</p>
                    <button onClick={onClose}><img src={decline} alt="decline" /></button>
                </div>
                <p className="movie-desc">{description}</p>
                <p className='sumInfo'>popularity: {popularity}</p>
                <p className='sumInfo'>release date: {release_date}</p>
                <p className='sumInfo'>average vote: <span>{vote_average}</span>, vote count: <span>{vote_count}</span></p>
                <span className="movie-genre">{genre}</span>
            </div>
        </div>
        </>
    );
} 
export default Closeup;