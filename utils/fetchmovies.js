import axios from "axios";

// const BACKEND_URL = "https://vitreum-unventilated-curt.ngrok-free.dev";
 const BACKEND_URL="http://127.0.0.1:8000";
const OMDB_URL = "https://www.omdbapi.com/";
const OMDB_KEY = "57f54e16";

export const fetchmovies = async ({ n = 10 } = {}) => {
  const res = await axios.get(`${BACKEND_URL}/random`, {
    params: { n },
  });
  return res.data;
};
export const recommendmovies = async ({
  movietitle,
  top_n = 10,
  alpha = 0.5,
  model_name = "Hybrid",
}) => {
  print("api hit in reccomend movies");
  const res = await axios.get(`${BACKEND_URL}/recommend`, {
    params: {
      movie: movietitle,
      top_n,
      alpha,
      model_name: model_name,
    },
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  console.log("Recommender response:", res.data);
  return res.data;
};

export const fetchmoviedetails = async ({ movietitle }) => {
  try {
    const cleanTitle = movietitle.replace(/\(\d{4}\)/, "").trim();

    const res = await axios.get(OMDB_URL, {
      params: {
        apikey: OMDB_KEY,
        t: cleanTitle,
      },
    });

    if (res.data.Response === "False") return null;
    return res.data;
  } catch {
    return null;
  }
};
