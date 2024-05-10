
// For testing Unit Test Code Generation

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiOptions, movieVideoUrl } from "../Constants/apiConstants";
import { setMovieTrailer } from "../store/moviesSlice";
import { isEmpty } from "lodash";

/**
 * Custom hook to fetch and store the movie trailer in the Redux store.
 *
 * @param {number} movieId - The ID of the movie for which to fetch the trailer.
 */
const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  /**
   * Fetches the movie trailer from the API and dispatches it to the Redux store.
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

    // If there are trailers, use the first one; otherwise, use the first result
    if (trailers && trailers.length > 0) {
      trailerObject = trailers[0];
    } else {
      trailerObject = jsonData.results[0];
    }

    // Dispatch the trailer object to the Redux store
    dispatch(setMovieTrailer(trailerObject));
  };

  // Fetch the trailer if it's not already in the store
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, []);
};

export default useFetchMovieTrailer;
