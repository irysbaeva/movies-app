import moviesService from "./movies-service";

const countMovies = (num) => {
  return { type: "COUNT_MOVIES", payload: num };
};

const moviesLoaded = (newMovies) => {
  return { type: "FETCH_MOVIES_SUCCESS", payload: newMovies };
};

const moviesRequested = () => {
  return { type: "FETCH_MOVIES_REQUEST" };
};

const moviesError = (error) => {
  return { type: "FETCH_MOVIES_FAILURE", payload: error };
};

const fetchMovies = (limit, page) => (dispatch) => {
  dispatch(moviesRequested());
  moviesService
    .getMovies(limit, page)
    .then((data) => {
      const movies = data.data.data.movies;

      dispatch(countMovies(data.data.data.movie_count));
      dispatch(moviesLoaded(movies));
    })
    .catch((err) => {
      dispatch(moviesError(err));
      return Promise.reject(new Error(err));
    });
};

const addComment = (comment) => {
  return { type: "ADD_COMMENT", payload: comment };
};

const deleteComment = (id) => {
  return { type: "DELETE_COMMENT", payload: id };
};
export { fetchMovies, addComment, deleteComment };
