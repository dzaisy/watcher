import React from 'react';
import Like from './Like';
import WatchList from './WatchList';

function Display(props) {
  const {movies, series, likedMovies, likedSeries, movieWatchlist, seriesWatchlist,
    renderLiked, renderWatchlist, handleMovieLike, handleSeriesLike,
    handleMovieWatchlist, handleSeriesWatchlist} = props;

  return (
    <div className="content">
      {renderLiked && (
        <Like
          likedMovies={likedMovies}
          likedSeries={likedSeries}
          handleMovieLike={handleMovieLike}
          handleSeriesLike={handleSeriesLike}
        />
      )}
      {renderWatchlist && (
        <WatchList
          movieWatchlist={movieWatchlist}
          seriesWatchlist={seriesWatchlist}
          handleMovieWatchlist={handleMovieWatchlist}
          handleSeriesWatchlist={handleSeriesWatchlist}
        />
      )}

      <div className="grid-container">
        {movies.map(movie => (
          <div key={movie.id} className="card">
            <img src={movie.image} alt={movie.name} />
            <div className="card-info">
              <h2>{movie.name}</h2>
              <p className="genre">{movie.genre}</p>
              <p>{movie.description}</p>
              <div className="card-button">
                <button
                  className="like-btn"
                  onClick={() => handleMovieLike(movie.id)}
                  style={{ color: likedMovies.includes(movie.id) ? 'red' : '#3700a6' }}
                >
                  ♥
                </button>
                <button
                  className="wtchl-btn"
                  onClick={() => handleMovieWatchlist(movie.id)}
                  style={{ color: movieWatchlist.includes(movie.id) ? 'red' : '#3700a6' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </div>

      <div className="grid-container">
        {series.map(serie => (
          <div key={serie.id} className="card">
            <img src={serie.image} alt={serie.name} />
            <div className="card-info">
              <h2>{serie.name}</h2>
              <p className="genre">{serie.genre}</p>
              <p>{serie.description}</p>
              <div className="card-button">
                <button
                  className="like-btn"
                  onClick={() => handleSeriesLike(serie.id)}
                  style={{ color: likedSeries.includes(serie.id) ? 'red' : '#3700a6' }}
                >
                  ♥
                </button>
                <button
                  className="wtchl-btn"
                  onClick={() => handleSeriesWatchlist(serie.id)}
                  style={{ color: seriesWatchlist.includes(serie.id) ? 'red' : '#3700a6' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
