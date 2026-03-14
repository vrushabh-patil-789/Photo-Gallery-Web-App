import { useEffect } from "react";
import { useState } from "react";


export default function useFetchPhotos() {

    const [images, setImages] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=> {
        
        const getImages = async ()=> {
            try {
                const url = "https://picsum.photos/v2/list?limit=30";
                let response = await fetch(url);
                const data = await response.json();
                setImages(data)
            } catch (err) {
                setError(err.message);
                console.error("Couldnt fetch api",err);
            } finally {
                setLoading(false);
            }
        }

        getImages();
            
    },[])

    



    

    return (
        {
        images,
        loading,
        error }
    );
}