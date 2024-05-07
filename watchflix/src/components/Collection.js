import React from "react";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";

function Collection({movies, series}) {
    console.log('Movies:', movies);
    console.log('Series:', series);
  
    // const movieCards = movies.map(movie => (
    //     <MovieCard 
    //         key={movie.id}
    //         movie={movie}
    //     />
    // ))

    // const seriesCards = series.map(series => (
    //     <SeriesCard
    //         key={series.id}
    //         series={series}
    //     />
    // ))

    return (
        <>
            <div className="card-container">{movies}</div>
            <div className="card-container">{series}</div>
        </>
    )
}
export default Collection;