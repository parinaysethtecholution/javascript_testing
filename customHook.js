 
const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { apiOptions, movieVideoUrl } = require("../Constants/apiConstants");
const { setMovieTrailer } = require("../store/moviesSlice");
const { isEmpty } = require("lodash");

/**
 * Custom hook to fetch movie trailer
 * @param {string} movieId - The id of the movie
 */
const useFetchMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailer = useSelector(store => store?.movie?.movieTrailer);

    /**
     * Fetch trailer from API and dispatch it to the store
     */
    const fetchTrailer = async () => {
        const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
        const jsonData = await apiData.json();
        let trailers = jsonData?.results?.filter(elem => elem?.type === "Trailer") || [];
        let trailerObject = trailers.length > 0 ? trailers[0] : jsonData.results[0];
        dispatch(setMovieTrailer(trailerObject))
    }

    useEffect(() => {
        if (isEmpty(trailer)) {
            fetchTrailer()
        }
    }, [])
}

/**
 * Update the quantity of an item in the cart
 * @param {string} itemName - The name of the item
 * @param {number} newQuantity - The new quantity of the item
 */
updateItemQuantity(itemName, newQuantity) {
    const item = this.getItemByName(itemName);
    if (item) {
      item.quantity = newQuantity;
    } else {
      console.error(`Item "${itemName}" not found in the cart.`);
    }
}

/**
 * Remove an item from the cart by its name
 * @param {string} itemName - The name of the item
 */
removeItemByName(itemName) {
    const itemIndex = this.items.findIndex((item) => item.name === itemName);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    } else {
      console.error(`Item "${itemName}" not found in the cart.`);
    }
}

export default useFetchMovieTrailer;
