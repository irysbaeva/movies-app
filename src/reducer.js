let initialState = {
  movies: [],
  movieCount: null,
  loading: true,
  error: null,
  allComments: [
    {
      id: 36666,
      comments: [
        { text: "Good movie", name: "Alex" },
        { text: "Excellent", name: "Irina" },
        { text: "Nice movie", name: "Tommy" },
      ],
    },
    {
      id: 36656,
      comments: [
        { text: "Good movie", name: "Alex" },
        { text: "Excellent", name: "Irina" },
        { text: "Nice movie", name: "Tommy" },
      ],
    },
    {
      id: 2,
      comments: [
        { text: "comment", name: "name" },
        { text: "comment", name: "name" },
        { text: "comment", name: "name" },
      ],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES_REQUEST":
      return {
        ...state,
        movies: [],
        loading: true,
        error: null,
      };

    case "FETCH_MOVIES_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_MOVIES_FAILURE":
      return {
        ...state,
        movies: [],
        loading: false,
        error: action.payload,
      };
    case "COUNT_MOVIES":
      return {
        ...state,
        movieCount: action.payload,
      };
    case "ADD_COMMENT":
      const movieComments = state.allComments.find(
        (el) => el.id === action.payload.id
      );
      if (movieComments) {
        movieComments.comments = [
          ...movieComments.comments,
          { name: action.payload.name, text: action.payload.text },
        ];

        return {
          ...state,
          allComments: [...state.allComments, movieComments],
        };
      } else {
        return {
          ...state,
          allComments: [
            ...state.allComments,
            {
              id: action.payload.id,
              comments: [
                { name: action.payload.name, text: action.payload.text },
              ],
            },
          ],
        };
      }
    case "DELETE_COMMENT":
      const commentsMovie = state.allComments.find(
        (el) => el.id === action.payload.id
      );
      commentsMovie.comments = [
        ...commentsMovie.comments.slice(0, action.payload.idx),
        ...commentsMovie.comments.slice(action.payload.idx + 1),
      ];

      return {
        ...state,
        allComments: [...state.allComments, commentsMovie],
      };

    default:
      return state;
  }
};

export default reducer;
