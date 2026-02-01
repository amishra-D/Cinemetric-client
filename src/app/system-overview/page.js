import React from "react";
import { Download } from "lucide-react";
import Card from "../../components/Card";
import RatingDistributionChart from "../../components/RatingChartDistribution";

function Page() {
  return (
    <div className="bg-neutral-950 min-h-screen w-full text-white">
      
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <h1 className="text-4xl pb-1 md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
          System Overview
        </h1>
        <p className="text-neutral-400 mt-2">
          Dataset summary & rating distribution
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          
          {["Movielens 1M", "TMDB 5000"].map((item) => (
            <div
              key={item}
              className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex justify-between items-center text-sm font-semibold
                         hover:border-yellow-500/40 hover:bg-neutral-800 transition"
            >
              <p>{item}</p>
              <Download
                size={16}
                className="cursor-pointer text-neutral-400 hover:text-yellow-400"
              />
            </div>
          ))}

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        <div className="grid grid-cols-2 gap-6">
          <Card title="Users" value="1M" />
          <Card title="Movies" value="4K" />
          <Card title=" Sparsity Level" value="95.53%" />
        </div>

        <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <RatingDistributionChart />
        </div>

      </div>
    </div>
  );
}

export default Page;
