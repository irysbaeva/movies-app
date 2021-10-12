import axios from "axios";
const instance = axios.create({
  baseURL: "https://yts.mx/api/v2/list_movies.json",
});
const moviesService = {
  getMovies: (limit, page) => instance.get(`/?limit=${limit}&page=${page}`),
};

export default moviesService;
