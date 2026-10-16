import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import './App.css';
import Movie from "./Components/Movie/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Closeup from "./Components/Closeup/Closeup";

function App(){
  const [list, setList] = useState([]);
  const movieapi = import.meta.env.VITE_MOVIEAPI;   
  const [wishlist, setWishlist] = useState(()=>{
    const savedWishlist = localStorage.getItem("geekmovies_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [genres, setGenres] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    fetch(movieapi)
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.genres.forEach(g => {
          map[g.id] = g.name;
        });
        setGenres(map);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(genres).length === 0) return;
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=ae722eb165ae793b746fd6275dcf3d01')
      .then(res => res.json())
      .then(data => {
        const formattedMovies = data.results.map(movie => ({
          id: movie.id.toString(),
          name: movie.title, 
          description: movie.overview, 
          img: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
          genre: movie.genre_ids ? movie.genre_ids.map(id => genres[id]).filter(Boolean).join(", ") : "",
          popularity: movie.popularity,
          release_date: movie.release_date,
          vote_average:movie.vote_average,
          vote_count:movie.vote_count
        }));
        setList(formattedMovies);
      })
      .catch(err => console.error("Error fetching movies:", err));
  }, [genres]);
  
  useEffect(()=>{
    localStorage.setItem("geekmovies_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.some(item => item.id === movie.id)) return prevWishlist;
      return [...prevWishlist, movie];
    });
  };

  const removeFromWishlist = (movieId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== movieId));
  };

  const filteredList = list.filter(movie => {
    const query = searchQuery.toLowerCase();
    if(searchBy === "genre"){
      return movie.genre && movie.genre.toLowerCase().includes(query);
    }
    else if(searchBy === "release_date"){
      return movie.release_date && movie.release_date.includes(query);
    }
    else if(searchBy == "vote_average"){
     const threshHold = parseFloat(query);
     if(isNaN(threshHold)) return true;
     return movie.vote_average !== undefined && movie.vote_average >= threshHold
    }
    return movie.name && movie.name.toLowerCase().includes(query);
  });

  return(
    <BrowserRouter>
      <div className="app-container">
        <Header onSearchChange={setSearchQuery} searchQuery={searchQuery} searchBy={searchBy} onSearchByChange={setSearchBy} />
        
        <Routes>
          <Route path="/" element={
            <div className="cemter">
              <main className="main-content">
                {filteredList.length === 0 ? (
                  <h2>No movies found</h2>
                ) : (
                  filteredList.map((movie) => (
                    <Movie
                      key={movie.id}
                      id={movie.id}
                      img={movie.img}
                      name={movie.name}
                      description={movie.description}
                      genre={movie.genre}
                      popularity={movie.popularity}
                      release_date = {movie.release_date}
                      vote_average={movie.vote_average}
                      vote_count={movie.vote_count}
                      isWishlisted={wishlist.some(item => item.id === movie.id)}
                      onCardClick={()=>setSelectedMovie(movie)}
                      onAddToWishlist={addToWishlist}
                      onRemoveFromWishlist={removeFromWishlist}
                    />
                  ))
                )}
              </main>
         {selectedMovie && ( 
  <div className="closeup-overlay" onClick={() => setSelectedMovie(null)}>
    <div onClick={(e) => e.stopPropagation()}>
      <Closeup
        img={selectedMovie.img}
        name={selectedMovie.name}
        description={selectedMovie.description}
        genre={selectedMovie.genre}
        popularity={selectedMovie.popularity}
        release_date={selectedMovie.release_date}
        vote_average={selectedMovie.vote_average}
        vote_count={selectedMovie.vote_count}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  </div>
)}
             
            </div>
          } />

          <Route path="/wishlist" element={
            <div className="cemter">
              <main className="main-content">
                {wishlist.length === 0 ? (
                  <h2>Your wishlist is empty</h2>
                ) : (
                  wishlist.map((movie) => (
                    <Movie
                     key={movie.id}
                      id={movie.id}
                      img={movie.img}
                      name={movie.name}
                      description={movie.description}
                      genre={movie.genre}
                      popularity={movie.popularity}
                      release_date = {movie.release_date}
                      vote_average={movie.vote_average}
                      vote_count={movie.vote_count}
                      isWishlisted={wishlist.some(item => item.id === movie.id)}
                      onCardClick={()=>setSelectedMovie(movie)}
                      onAddToWishlist={addToWishlist}
                      onRemoveFromWishlist={removeFromWishlist}
                    />
                  ))
                )}
                   {selectedMovie && ( 
  <div className="closeup-overlay" onClick={() => setSelectedMovie(null)}>
    <div onClick={(e) => e.stopPropagation()}>
      <Closeup
        img={selectedMovie.img}
        name={selectedMovie.name}
        description={selectedMovie.description}
        genre={selectedMovie.genre}
        popularity={selectedMovie.popularity}
        release_date={selectedMovie.release_date}
        vote_average={selectedMovie.vote_average}
        vote_count={selectedMovie.vote_count}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  </div>
)}
              </main>
            </div>
          } />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;