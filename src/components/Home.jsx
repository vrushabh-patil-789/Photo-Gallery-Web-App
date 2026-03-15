import { useEffect, useReducer, useCallback, useMemo, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";



export default function Home() {
    
    function favouritesReducer(state, action) {
    switch(action.type) {
        case "ADD_FAVOURITE":
            return[...state, action.payload];

        case "REMOVE_FAVOURITE":
            return state.filter((images)=> images.id !== action.payload);

        default:
            return state
    }
}

const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];

const [favourites, dispatch] = useReducer(
    favouritesReducer,
    storedFavourites
);

useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites))
},[favourites]);

const toggleFav = (images) => {
    const isFav = favourites.some((fav) => fav.id === images.id);

    if (isFav) {
        dispatch({
            type:"REMOVE_FAVOURITE",
            payload: images.id,
        })
    } else {
        dispatch({
            type:"ADD_FAVOURITE",
            payload:images,
        })
    }
}

    const {images,loading,error} = useFetchPhotos();

    const [search,setSearch] = useState("");

    const searchResult = useCallback((e)=> {
        setSearch(e.target.value);
    },[])

    const filteredImages = useMemo(() => {
        return images.filter((item) =>
        item.author.toLowerCase().includes(search.toLowerCase())
        )
    },[images, search]);

    if (loading) {
        return (

            <div
            className="flex justify-center items-center h-screen"
            >
                <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-emerald-400 animate-spin"></div>
            </div>

        )
    }

    if (error) {
        return(<h1>Error Loading photos...</h1>);
    }

    return (
        <>

        <div className="my-5 flex flex-wrap items-center gap-3 px-4">
            <h1
            className="text-2xl ml-2 mr-40"
            >PhotoGalleryApp</h1>
            <nav
            className="flex-1 min-w-[200px]"
            >
                <input
                type="search"
                placeholder="   Search Here"
                value={search}
                onChange={searchResult}
                className="h-10 w-full rounded-2xl border-b-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                </input>
            </nav>
        </div>
            <div
            className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            >
                
                {filteredImages.map((data)=> (
                    <div key={data.id}>

                        <img
                        src={data.download_url}
                        className="w-full h-48 object-cover"
                        
                        >
                        </img>

                        <div className="flex items-center mt-1">
                            <h1 className="flex-1">Author: {data.author}</h1>
                            <img
                            src={
                                favourites.some((fav) => fav.id === data.id) ? "/heart-solid-full.svg" : "/heart-regular-full.svg"
                            }
                            className="h-5 w-5 mt-0.5 ml-2"
                            onClick={() => toggleFav(data)}
                            >
                            </img>
                        </div>


                    </div>
                ))}

            </div>

        


        </>
    )
}