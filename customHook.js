
// For testing Unit Test Code Generation

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiOptions, movieVideoUrl } from "../Constants/apiConstants";
import { setMovieTrailer } from "../store/moviesSlice";
import { isEmpty } from "lodash";

/**
 * Custom hook to fetch and store the movie trailer for a given movie ID.
 *
 * @param {number} movieId - The ID of the movie to fetch the trailer for.
 */
const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  /**
   * Fetches the movie trailer from the API and dispatches the action to store it in the Redux store.
   */
  const fetchTrailer = async () => {
    const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
    const jsonData = await apiData.json();
    let trailers;

    // Filter the API response to get only the trailer videos
    if (jsonData && jsonData.results) {
      trailers = jsonData.results.filter((elem) => {
        if (elem && elem.type === "Trailer") {
          return true;
        }
        return false;
      });
    }

    let trailerObject;

    // Select the first trailer video or the first result if no trailers are available
    if (trailers && trailers.length > 0) {
      trailerObject = trailers[0];
    } else {
      trailerObject = jsonData.results[0];
    }

    // Dispatch the action to store the trailer in the Redux store
    dispatch(setMovieTrailer(trailerObject));
  };

  // Fetch the trailer if it's not already stored in the Redux store
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, []);
};

export default useFetchMovieTrailer;
