"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchRecommendations } from "@/store/recommendationthunk";
import { fetchmoviedetails } from "../../utils/fetchmovies";
import Loader from "@/components/Loader";
import { ChevronDown } from 'lucide-react';

export default function Page() {
  const dropdown = ['Collaborative', 'Content-Based', 'Hybrid'];
  const [open, setopen] = useState(false);
  const [activemodel, setactivemodel] = useState(dropdown[2]);
  const dispatch = useDispatch();
  const router = useRouter();
  const sliderRef = useRef(null);
  const [val, setVal] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateValue = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setVal(percent);
  };

  const { recommendations, status, queryMovie } = useSelector((state) => state.recommendation);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  // Recommendation Enrichment Logic
  useEffect(() => {
    const enrichMovies = async () => {
      if (!Array.isArray(recommendations) || recommendations.length === 0) return;
      const titles = recommendations
        .map((m) => (typeof m === "string" ? m : m.title))
        .filter((t) => typeof t === "string" && !/S\d+E\d+/i.test(t) && t.length < 60);

      const detailed = await Promise.all(titles.map((title) => fetchmoviedetails({ movietitle: title })));
      const validMovies = detailed.filter(Boolean);
      setMovies(validMovies.length === 0 ? recommendations.map((m, idx) => ({
        imdbID: idx, Title: m.title ?? m, Year: "N/A", imdbRating: m.score?.toFixed(2) ?? "N/A", Poster: "N/A"
      })) : validMovies);
    };
    enrichMovies();
  }, [recommendations]);

  const handleSearch = () => {
    if (!query.trim()) return;
    setMovies([]);
    setShowLoader(true);
    dispatch(fetchRecommendations({
      movietitle: query, model_name: activemodel, top_n: 10, alpha: (val / 100).toFixed(2),
    }));
  };

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => setShowLoader(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
        CineMetric
      </h1>
      <p className="text-neutral-400 mt-2 text-sm">ML-powered hybrid movie recommender system.</p>

      {/* SEARCH SECTION: Fixed Stacking for Mobile */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter a movie name..."
          disabled={showLoader}
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 outline-none disabled:opacity-50 w-full"
        />
        <button
          onClick={handleSearch}
          disabled={showLoader}
          className="bg-yellow-400 px-8 py-3 rounded-lg text-black font-bold hover:bg-yellow-500 transition-colors disabled:opacity-60 w-full sm:w-auto"
        >
          {showLoader ? "Running..." : "Recommend"}
        </button>
      </div>

      {/* SLIDER & MODEL SELECTION: Mobile-Optimized Spacing */}
      <div className="mt-6 space-y-6">
        {activemodel === "Hybrid" && (
          <div>
            <label className="text-xs text-neutral-500 uppercase tracking-widest mb-2 block">Hybrid Weight (Alpha)</label>
            <div 
              ref={sliderRef}
              className="relative w-full max-w-xs h-2 bg-neutral-800 rounded-full cursor-pointer"
              onMouseDown={(e) => { setDragging(true); updateValue(e.clientX); }}
              onMouseMove={(e) => dragging && updateValue(e.clientX)}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
            >
              <div className="absolute h-2 bg-yellow-400 rounded-full" style={{ width: `${val}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white border-2 border-black rounded-full" style={{ left: `calc(${val}% - 10px)` }} />
            </div>
            <p className="text-sm text-yellow-400 mt-2 font-mono">α: {(val / 100).toFixed(2)}</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative w-full md:w-60">
            <button
              className="w-full px-4 py-2.5 text-sm rounded-md bg-neutral-900 border border-neutral-800 text-left flex justify-between items-center"
              onClick={() => setopen(!open)}
            >
              <span>Model: <span className="text-yellow-400 ml-1">{activemodel}</span></span>
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute left-0 top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-md p-1 z-50 shadow-2xl">
                {dropdown.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setactivemodel(option); setopen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm ${option === activemodel ? "text-yellow-400 bg-neutral-800" : "text-white hover:bg-neutral-800"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!showLoader && queryMovie && (
            <button onClick={() => router.push(`/evaluation-metrics?movie=${encodeURIComponent(queryMovie)}`)} className="bg-neutral-800 border border-neutral-700 px-4 py-2 text-sm text-yellow-400 rounded-lg font-semibold hover:bg-neutral-700 w-fit">
              View Evaluation Metrics
            </button>
          )}
        </div>
      </div>

      {/* RESULTS GRID: Responsive Columns */}
      <div className="mt-10">
        {showLoader ? (
          <div className="mt-20 flex flex-col items-center justify-center gap-4">
            <Loader />
            <p className="text-neutral-500 animate-pulse">Running ML Models...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all">
                <div className="aspect-[2/3] bg-neutral-800 relative">
                  {movie.Poster !== "N/A" ? (
                    <img src={movie.Poster} alt={movie.Title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600 text-xs italic">No Poster</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm line-clamp-1">{movie.Title}</p>
                  <p className="text-[10px] text-neutral-500 mt-1">{movie.Year} • ⭐ {movie.imdbRating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}