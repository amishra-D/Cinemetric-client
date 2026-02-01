"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchRecommendations } from "@/store/recommendationthunk";
import { fetchmoviedetails } from "../../utils/fetchmovies";
import Loader from "@/components/Loader";
import { ChevronDown, Search, BarChart3 } from 'lucide-react';

export default function Page() {
  const dropdown = ['Collaborative', 'Content-Based', 'Hybrid'];
  const [open, setOpen] = useState(false);
  const [activeModel, setActiveModel] = useState(dropdown[2]);
  const [val, setVal] = useState(50);
  
  const dispatch = useDispatch();
  const router = useRouter();

  const { recommendations, status, queryMovie } = useSelector((state) => state.recommendation);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    
    if (!query.trim() || showLoader) return;
    
    setMovies([]);
    setShowLoader(true);
    
    dispatch(fetchRecommendations({
      movietitle: query, 
      model_name: activeModel, 
      top_n: 10, 
      alpha: (val / 100).toFixed(2),
    }));
  };

  useEffect(() => {
    const enrichMovies = async () => {
      if (!Array.isArray(recommendations) || recommendations.length === 0) return;
      
      const titles = recommendations
        .map((m) => (typeof m === "string" ? m : m.title))
        .filter((t) => typeof t === "string" && !/S\d+E\d+/i.test(t) && t.length < 60);

      const detailed = await Promise.all(titles.map((title) => fetchmoviedetails({ movietitle: title })));
      const validMovies = detailed.filter(Boolean);
      
      setMovies(validMovies.length === 0 ? recommendations.map((m, idx) => ({
        imdbID: idx, 
        Title: m.title ?? m, 
        Year: "N/A", 
        imdbRating: m.score?.toFixed(2) ?? "N/A", 
        Poster: "N/A"
      })) : validMovies);
    };
    enrichMovies();
  }, [recommendations]);

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => setShowLoader(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 min-h-screen">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent italic tracking-tighter">
          CineMetric
        </h1>
        <p className="text-neutral-400 mt-3 text-sm md:text-base font-medium">
          ML-powered hybrid movie recommender system.
        </p>
      </header>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a movie name..."
            disabled={showLoader}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-yellow-500/50 transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={showLoader}
          className="bg-yellow-400 px-10 py-4 rounded-xl text-black font-bold hover:bg-yellow-500 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap"
        >
          {showLoader ? "Processing..." : "Recommend"}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-3">
          <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">Inference Model</label>
          <div className="relative">
            <button
              type="button"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-left flex justify-between items-center"
              onClick={() => setOpen(!open)}
            >
              <span className="text-sm">Model: <span className="text-yellow-400 font-semibold ml-1">{activeModel}</span></span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute left-0 top-full mt-2 w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden z-50 shadow-2xl">
                {dropdown.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { setActiveModel(option); setOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${option === activeModel ? "text-yellow-400 bg-yellow-400/10" : "text-white hover:bg-neutral-800"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {activeModel === "Hybrid" && (
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold">Hybrid Weight (Alpha)</label>
                <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">α: {(val / 100).toFixed(2)}</span>
             </div>
             <input 
              type="range"
              min="0"
              max="100"
              value={val}
              onChange={(e) => setVal(parseInt(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
             />
          </div>
        )}
      </div>

      {!showLoader && queryMovie && (
        <div className="mt-6 flex justify-center md:justify-start">
          <button 
            type="button"
            onClick={() => router.push(`/evaluation-metrics?movie=${encodeURIComponent(queryMovie)}`)} 
            className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-5 py-2.5 text-xs text-yellow-400 rounded-full font-bold hover:bg-neutral-800 transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            View Evaluation Metrics
          </button>
        </div>
      )}

      <div className="mt-12">
        {showLoader ? (
          <div className="py-20 flex flex-col items-center justify-center gap-6">
            <Loader />
            <p className="text-white font-medium animate-pulse">Running ML Engine...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="group">
                <div className="aspect-[2/3] bg-neutral-800 rounded-2xl overflow-hidden relative border border-neutral-800 group-hover:border-yellow-500/40 transition-all duration-300">
                  {movie.Poster !== "N/A" ? (
                    <img src={movie.Poster} alt={movie.Title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600 text-[10px] uppercase font-bold bg-neutral-900 text-center px-2">No Image Found</div>
                  )}
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-sm text-neutral-100 line-clamp-1 group-hover:text-yellow-400 transition-colors">{movie.Title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-neutral-500">{movie.Year}</span>
                    <span className="text-[10px] font-bold text-yellow-500/80">★ {movie.imdbRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}