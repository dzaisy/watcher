import React from 'react';

function Like(props) {
  const { likedMovies, likedSeries, handleMovieLike, handleSeriesLike } = props;
  return (
    <div className="liked-items">
      <h2>Liked Items</h2>
        <ul>
          {likedMovies.map(name => (
            <li key={name}>
              Movie ID: {name}{''}
              <button onClick={() => handleMovieLike(name)}>x</button>
            </li>
          ))}
        </ul>
        <ul>
          {likedSeries.map(name => (
            <li key={name}>
              Series ID: {name}{''}
              <button onClick={() => handleSeriesLike(name)}>x</button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Like;
