"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import ratingDist from "../json-files/rating-dist.json";

export default function RatingDistributionChart() {
  const data = Object.entries(ratingDist).map(([rating, count]) => ({
    rating: `${rating}★`,
    count
  }));

  return (
    <div className="w-full bg-neutral-900 rounded-xl p-4 md:p-6 shadow-lg">
      <h2 className="text-white mb-6 text-lg md:text-xl font-bold tracking-tight">
        Rating Distribution
      </h2>

      <div className="w-full aspect-square md:aspect-video max-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="rating" 
              stroke="#888" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#888" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ 
                backgroundColor: '#171717', 
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff' 
              }}
              itemStyle={{ color: '#ebe656' }}
            />
            <Bar 
              dataKey="count" 
              fill="#ebe656" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}