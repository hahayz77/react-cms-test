import { useEffect, useState } from 'react';
import './App.css';


export function App() {
    
    const [images, setImages] = useState([]);
    
    useEffect(() => {getApiData()}, []);
    
    const getApiData = async () => {
        const response = await fetch(
          "http://localhost:3000"
        ).then((response) => response.json());
      
        // update the state
        setImages(response);
      };
    

    return (
        <div className="App">
            <h1>S3 Bucket</h1>
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
        </div>
    );
}

export default App;
