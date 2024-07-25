"use client"
import React from "react";
import { useParams } from "next/navigation";
import artworksData from "../../data/artworksData";

const SculpturePage = () => {
  const { id } = useParams();
  const artwork = artworksData.find(item => item.id === parseInt(id));

  if (!artwork) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen m-20">
        <h2 className="text-black">Artwork not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-20">
      <h2 className="text-black text-4xl font-bold mb-4">{artwork.title}</h2>
      <div className="flex flex-wrap justify-center mb-4">
        {artwork.images.map((img, index) => (
          <img
            key={index}
            src={img.image}
            alt={`${artwork.title} image ${index + 1}`}
            className="w-full h-auto max-w-md mb-4"
          />
        ))}
      </div>
      <p className="text-black text-lg">{artwork.description}</p>
      {/* Add more artwork details as needed */}
    </div>
  );
};

export default SculpturePage;
