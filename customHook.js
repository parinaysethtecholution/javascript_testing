
const useFetchMovieTrailer = (movieId) => {
  // Add comments to explain the purpose of each block of code
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store?.movie?.movieTrailer);

  // Fetch the movie trailer from the API
  const fetchTrailer = async () => {
    const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
    const jsonData = await apiData.json();
    let trailers;
    if (jsonData && jsonData.results) {
      // Filter the results to get only the trailer
      trailers = jsonData.results.filter((elem) => {
        if (elem && elem.type === "Trailer") {
          return true;
        }
        return false;
      });
    }
    let trailerObject;
    if (trailers && trailers.length > 0) {
      // Use the first trailer in the list
      trailerObject = trailers[0];
    } else {
      // Use the first result if no trailer is found
      trailerObject = jsonData.results[0];
    }
    // Dispatch the trailer object to the store
    dispatch(setMovieTrailer(trailerObject));
  };

  // Fetch the trailer if it's not already in the store
  useEffect(() => {
    if (isEmpty(trailer)) {
      fetchTrailer();
    }
  }, []);

  return useFetchMovieTrailer;
};

export default useFetchMovieTrailer;
