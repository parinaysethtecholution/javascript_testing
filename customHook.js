
const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { apiOptions, movieVideoUrl } = require("../Constants/apiConstants");
const { setMovieTrailer } = require("../store/moviesSlice");
const { isEmpty } = require("lodash");

const useFetchMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailer = useSelector(store => store?.movie?.movieTrailer);
    const fetchTrailer = async () => {
        const apiData = await fetch(movieVideoUrl(movieId), apiOptions);
        const jsonData = await apiData.json();
        let trailers;
        if (jsonData && jsonData.results) {
            trailers = jsonData.results.filter((elem) => {
                if (elem && elem.type === "Trailer") {
                    return true;
                }
                return false;
            });
        }
        let trailerObject;
        if (trailers && trailers.length > 0) {
            trailerObject = trailers[0];
        } else {
            trailerObject = jsonData.results[0];
        }
        dispatch(setMovieTrailer(trailerObject))
    }

    useEffect(() => {
        if (isEmpty(trailer)) {
            fetchTrailer()
        }
    }, [])
}

updateItemQuantity(itemName, newQuantity) { // Updates the quantity of a specific item
    const item = this.getItemByName(itemName);
    if (item) {
        item.quantity = newQuantity;
    } else {
        console.error(`Item "${itemName}" not found in the cart.`);
    }
}

removeItemByName(itemName) { // Removes a specific item by its name
    const itemIndex = this.items.findIndex((item) => item.name === itemName);
    if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
    } else {
        console.error(`Item "${itemName}" not found in the cart.`);
    }
}

export default useFetchMovieTrailer;
