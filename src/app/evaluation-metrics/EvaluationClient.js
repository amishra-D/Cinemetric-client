"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { fetchRecommendations } from "../../store/recommendationthunk";
import Loader from "../../components/Loader";

export default function EvaluationClient() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");

  const { recommendations, status } = useSelector(
    (state) => state.recommendation
  );

  useEffect(() => {
    if (recommendations.length === 0 && movie) {
      dispatch(
        fetchRecommendations({
          movietitle: movie,
          top_n: 10,
          alpha: 0.6,
        })
      );
    }
  }, [movie, recommendations.length, dispatch]);

  if (status === "loading") return <Loader />;

  return (
    <div className="bg-neutral-950 min-h-screen text-white px-6 pt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
        Evaluation Metrics
      </h1>

      {!movie && (
        <p className="text-neutral-500 mt-4">
          No movie selected for evaluation.
        </p>
      )}

      {recommendations.length === 0 ? (
        <p className="text-neutral-500 mt-4">
          No recommendations available.
        </p>
      ) : (
        <table className="mt-6 w-full max-w-3xl border border-neutral-800 text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="border border-neutral-800 px-3 py-2">#</th>
              <th className="border border-neutral-800 px-3 py-2">Movie</th>
              <th className="border border-neutral-800 px-3 py-2 text-right">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((m, i) => (
              <tr key={i} className="hover:bg-neutral-900 transition">
                <td className="border border-neutral-800 px-3 py-2">
                  {i + 1}
                </td>
                <td className="border border-neutral-800 px-3 py-2 truncate max-w-[240px]">
                  {m.title}
                </td>
                <td className="border border-neutral-800 px-3 py-2 text-right font-mono">
                  {m.score?.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
