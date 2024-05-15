
import { useEffect, useDispatch, useSelector } from "react";
import { apiOptions, movieVideoUrl } from "../Constants/apiConstants";
import { setMovieTrailer } from "../store/moviesSlice";
import { isEmpty } from "lodash";

const useFetchMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  const fetchTrailer = async () => {
    const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
    const jsonData = await apiData.json();
    let trailers = [];
    if (jsonData && jsonData.results) {
      trailers = jsonData.results.filter((elem) => elem.type === "Trailer");
    }
    const trailerObject = trailers.length > 0 ? trailers[0] : jsonData.results[0];
    dispatch(setMovieTrailer(trailerObject));
  };

  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, [trailer]);
};

export default useFetchMovieTrailer;
