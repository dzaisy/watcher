import React from "react";

function MediaCard({ media }) {
  const { name, description, genre, image } = media;
  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="poster" />
      <p>{description}</p>
      <p>{genre}</p>
      <button className="like-btn">&#10084;</button>
      <button className="del-btn">x</button>
      <button className="add-wtcl">+</button>
    </div>
  );
}

export default MediaCard;