"use client";
import React, { useState, useEffect, Suspense } from "react";
import ArtworkItem from "./ArtworkItem";
import { useRouter, useSearchParams } from "next/navigation";
import artworksData from "../../data/artworksData";
import './styles.css';

const ITEMS_PER_PAGE = 4;

const ProjectsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => parseInt(searchParams.get("page")) || 1);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handleProjectClick = (projectId) => {
    router.push(`/sculptures/${projectId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`sculptures/?page=${page}`);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedArtworks = artworksData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(artworksData.length / ITEMS_PER_PAGE);

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-6 transition-opacity duration-500 opacity-100" id="projects">
      <h2 className="text-center text-4xl font-bold mt-4 mb-8 md:mb-12 pt-12">My Sculptures</h2>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-2">
        {selectedArtworks.map((artwork) => (
          <ArtworkItem key={artwork.id} artwork={artwork} handleProjectClick={handleProjectClick} />
        ))}
      </ul>
      <div className="pagination mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

const SuspendedProjectsSection = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProjectsSection />
  </Suspense>
);

export default SuspendedProjectsSection;
