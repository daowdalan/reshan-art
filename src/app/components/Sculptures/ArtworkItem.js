import React from "react";
import PropTypes from "prop-types";

const ArtworkItem = ({ artwork, handleProjectClick }) => {
  return (
    <li className="project-card relative overflow-hidden rounded-sm bg-gray-800 group">
      <div className="project-card__image h-full relative">
        <img
          src={artwork.images[0].image}
          alt={artwork.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => handleProjectClick(artwork.id)}
        />
        <div className="absolute inset-x-0 top-0 flex flex-col justify-center p-2">
          <h5 className="text-white text-sm font-bold cursor-pointer" onClick={() => handleProjectClick(artwork.id)}>
            {artwork.title}
          </h5>
        </div>
      </div>
    </li>
  );
};

ArtworkItem.propTypes = {
  artwork: PropTypes.object.isRequired,
  handleProjectClick: PropTypes.func.isRequired,
};

export default ArtworkItem;
