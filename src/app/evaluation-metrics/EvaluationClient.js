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
    if (movie && recommendations.length === 0) {
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

  const avgScore =
    recommendations.length > 0
      ? (
          recommendations.reduce((sum, r) => sum + r.score, 0) /
          recommendations.length
        ).toFixed(3)
      : null;

  return (
    <div className="bg-neutral-950 min-h-screen text-white px-6 pt-10">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
        Evaluation Metrics
      </h1>
      {movie && (
        <div className="mt-6 max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-sm text-neutral-400">Input Movie</p>
          <p className="text-lg font-semibold text-yellow-400">{movie}</p>
          <p className="text-xs text-neutral-500 mt-1">
            Recommendations generated using a hybrid model combining
            content-based similarity and collaborative filtering.
          </p>
        </div>
      )}

      {!movie && (
        <p className="text-neutral-500 mt-6">
          No movie was provided for evaluation.
        </p>
      )}

      {recommendations.length > 0 && (
        <div className="mt-8 max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
            <p className="text-xs text-neutral-400">Total Recommendations</p>
            <p className="text-xl font-bold">{recommendations.length}</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
            <p className="text-xs text-neutral-400">Top Score</p>
            <p className="text-xl font-bold">
              {recommendations[0]?.score.toFixed(3)}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
            <p className="text-xs text-neutral-400">Average Score</p>
            <p className="text-xl font-bold">{avgScore}</p>
          </div>
        </div>
      )}

      {recommendations.length === 0 ? (
        <p className="text-neutral-500 mt-6">
          No recommendations available.
        </p>
      ) : (
        <table className="mt-10 w-full max-w-3xl border border-neutral-800 text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="border border-neutral-800 px-3 py-2 text-left">
                Rank
              </th>
              <th className="border border-neutral-800 px-3 py-2 text-left">
                Movie
              </th>
              <th className="border border-neutral-800 px-3 py-2 text-right">
                Score
              </th>
            </tr>
          </thead>

          <tbody>
            {recommendations.map((rec, i) => (
              <tr
                key={i}
                className={`transition ${
                  i === 0
                    ? "bg-yellow-400/10"
                    : "hover:bg-neutral-900"
                }`}
              >
                <td className="border border-neutral-800 px-3 py-2">
                  {i + 1}
                </td>
                <td className="border border-neutral-800 px-3 py-2 truncate max-w-[260px]">
                  {rec.title}
                  {i === 0 && (
                    <span className="ml-2 text-xs text-yellow-400 font-semibold">
                      TOP MATCH
                    </span>
                  )}
                </td>
                <td className="border border-neutral-800 px-3 py-2 text-right font-mono">
                  {rec.score.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {recommendations.length > 0 && (
        <div className="mt-10 max-w-3xl bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-4">
          <h3 className="text-lg font-semibold text-yellow-400">
            How to interpret these scores
          </h3>
          <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
            Each recommendation score represents a weighted combination of
            content similarity (movie metadata and genres) and collaborative
            filtering signals (latent user interaction patterns). Higher scores
            indicate stronger relevance to the input movie within the learned
            feature space.
          </p>
        </div>
      )}
    </div>
  );
}
