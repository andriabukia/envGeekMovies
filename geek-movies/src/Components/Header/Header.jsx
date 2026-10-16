import './Header.css';
import logo from '../../assets/GeekMovies.png';
import user from '../../assets/user2.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onSearchChange, searchQuery, searchBy, onSearchByChange }) {
    const [clickedProfile, setClickedProfile] = useState(false);

    return (
        <>
        <nav className='navy'>
            <div className='row'>
                <Link to="/">
                    <img className='logo' src={logo} alt="logo" />
                </Link>
                
                {/* Filter mode buttons */}
                <button 
                    onClick={() => onSearchByChange('name')} 
                    className={searchBy === 'name' ? 'active-filter' : ''}
                >
                    <p>name</p>
                </button>
                <button 
                    onClick={() => onSearchByChange('genre')} 
                    className={searchBy === 'genre' ? 'active-filter' : ''}
                >
                    <p>genre</p>
                </button>
                 <button 
                    onClick={() => onSearchByChange('release_date')} 
                    className={searchBy === 'release_date' ? 'active-filter' : ''}
                >
                    <p>release date</p>
                </button>
                       <button 
                    onClick={() => onSearchByChange('vote_average')} 
                    className={searchBy === 'vote_average' ? 'active-filter' : ''}
                >
                    <p>vote average</p>
                </button>
            </div>
        <div className='inpers'>
          <input 
                    type="text" 
                    placeholder={`Search by ${searchBy}...`}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='search-input' 
                />

            <div className='rowyo'>
                <img 
                    onClick={() => setClickedProfile(!clickedProfile)} 
                    className='user' 
                    src={user} 
                    alt="user" 
                />
                {clickedProfile ? (
                    <div className='wishlists'>
                        <Link to="/wishlist"><button>wishlist</button></Link>
                    </div>
                ) : null}
            </div>
        </div>
              
        </nav>
        </>
    );
}

export default Header;