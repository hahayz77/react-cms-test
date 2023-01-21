import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './App.css';


export function App() {

    // INIT #################################
    const [images, setImages] = useState([]);
    const [loadingImg, setLoadingImg] = useState(false);
    
    // GET #################################
    
    useEffect(() => {getApiData()}, []);
    
    const getApiData = async () => {
        const response = await fetch(
            "http://localhost:3000"
            ).then((response) => response.json());
            setImages(response);
        };
        
        // POST #################################  
        const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        if(!data){
            console.log("No imgs to upload!");
            return;
        }
        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const response = await fetch("http://localhost:3000/post", {
            method: "POST",
            body: formData,
        })
        .then(() => console.log(response))
        .catch((error) => {
            setLoadingImg(false);
            console.log(error)
        });
        await getApiData();
        setLoadingImg(false);
    };

    // DELETE #################################
    

    return (
        <div className='App'>
            <h1>S3 Bucket</h1>
            <div className='inputFile'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("file")} />
                <input type="submit" />
            </form>
            </div>
            { loadingImg === true && <div className='loading'>Loading ...</div> }
            {images.map((imgs, index)=>{return (
                <>
                <div className='container'>
                    <div className='image_container'>
                        <img style={{height: "150px"}} alt={imgs.name} src={imgs.url}/>
                    </div>
                    <div className='description'>
                        <p>{imgs.name}</p>
                        <p>{imgs.mimetype}</p>
                        <p>{imgs.size}</p>
                    </div>
                </div>
                <hr/>
                </>
            )})}

            {images.length === 0 && <h3>Nothing here!</h3>}
        </div>
    );
}

export default App;
