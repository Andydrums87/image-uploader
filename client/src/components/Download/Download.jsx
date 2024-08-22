import React from "react";
import "./download.css"
import axios from 'axios'


function Download({files}) {

  
    const handleDownload = () => {
      fetch(files).then((response) => {
        response.blob().then((blob) => {
            const imgUrl = window.URL.createObjectURL(files[0])
            let alink = document.createElement("a");
            alink.href = imgUrl
            alink.download = `${files[0].path}`
            alink.click()
        });
      });
    }
    
       
    return (
        <button className="btn" id="download__btn" onClick={handleDownload}>Download</button>
    )
}

export default Download;