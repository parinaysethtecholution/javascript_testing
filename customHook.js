
// Import necessary modules and hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiOptions, movieVideoUrl } from "../Constants/apiConstants";
import { setMovieTrailer } from "../store/moviesSlice";
import { isEmpty } from "lodash";

// Custom hook to fetch movie trailer
const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  // Function to fetch trailer data from API
  const fetchTrailer = async () => {
    try {
      const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
      const jsonData = await apiData.json();

      // Filter and find the trailer object
      let trailerObject;
      if (jsonData && jsonData.results) {
        const trailers = jsonData.results.filter(
          (elem) => elem && elem.type === "Trailer"
        );
        trailerObject = trailers.length > 0 ? trailers[0] : jsonData.results[0];
      }

      // Dispatch the trailer object to the Redux store
      dispatch(setMovieTrailer(trailerObject));
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  // Fetch trailer data when the component mounts and trailer is not available
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, []);

  return trailer;
};

export default useFetchMovieTrailer;
