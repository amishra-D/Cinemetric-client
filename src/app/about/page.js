import React from "react";

const formula ="Final Score = (1 - α) × Content + α × Collaborative";

function Page() {
  return (
    <div className="bg-neutral-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
            What is CineMetric?
          </h1>
          <div className="mt-6 max-w-3xl">
            <p className="text-neutral-400 text-lg leading-relaxed">
              CineMetric is a state-of-the-art movie recommendation system designed to bridge the gap between 
              raw metadata and human preference. By combining multiple ML techniques, it produces results that 
              are both mathematically relevant and surprisingly diverse.
            </p>
            <p className="text-neutral-300 mt-4 italic border-l-2 border-yellow-400 pl-4 py-1">
              “If a user likes this movie, what else are they likely to enjoy — and why?”
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-400"></span>
            What CineMetric Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Multi-Strategy", desc: "Switch between different AI strategies depending on your specific needs." },
              { title: "Hybrid Control", desc: "Fine-tune the balance between content similarity and user behavior." },
              { title: "Cold-Start Ready", desc: "Handle new movies and users instantly using content-based metadata." },
              { title: "High Performance", desc: "Near-instant recommendations powered by precomputed similarity engines." }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
                <h3 className="text-yellow-400 font-bold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
            How the System Works
          </h2>

          <div className="group border-b border-neutral-900 pb-10">
            <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-3">
              <span className="text-neutral-700 font-mono">01.</span> Content-Based
            </h3>
            <p className="text-neutral-400 mt-4 leading-relaxed max-w-4xl">
              This model analyzes the DNA of a movie. Using <strong>Cosine Similarity</strong> on genre and 
              metadata vectors, it identifies "structural siblings." It effectively solves the 
              <span className="text-neutral-200"> cold-start problem</span> by ignoring user history 
              and focusing on the film's intrinsic attributes.
            </p>
          </div>

          <div className="group border-b border-neutral-900 pb-10">
            <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-3">
              <span className="text-neutral-700 font-mono">02.</span> Collaborative Filtering
            </h3>
            <p className="text-neutral-400 mt-4 leading-relaxed max-w-4xl">
              Powered by <strong>Singular Value Decomposition (SVD)</strong>, this approach maps user 
              behaviors to a latent feature space. It uncovers hidden tastes that aren't visible 
              through genres alone—connecting horror fans to unexpected comedies based on community patterns.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-yellow-500/20 rounded-3xl">
            <h3 className="text-xl font-semibold text-yellow-400">03. The Hybrid Model</h3>
            <p className="text-neutral-400 mt-4 leading-relaxed">
              To achieve the perfect balance, CineMetric implements a linear weighted fusion. 
              The alpha parameter ($\alpha$) acts as a slider between "Discovery" and "Similarity."
            </p>
            <div className="my-8 py-6 bg-black/40 rounded-xl overflow-x-auto">
               <div className="text-neutral-200 text-center px-4">
                 {formula}
               </div>
            </div>
          </div>
        </section>

        <section className="mt-24 pt-10 border-t border-neutral-900">
          <h3 className="text-lg font-semibold text-yellow-400 mb-6 flex items-center gap-2">
            Project Resources
          </h3>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="https://colab.research.google.com/drive/15rku2KIhCETH3m7JbNCdAdwwbjqjfFtY?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-center hover:bg-neutral-800 transition-all text-sm font-medium"
            >
            View Notebook on Google Colab
            </a>
            <a
              href="https://github.com/amishra-D/Cinemetric"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-center hover:bg-neutral-800 transition-all text-sm font-medium"
            >
            GitHub Source Code
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Page;