import React from "react";
import "./uploaded.css"

function UploadedImage ({files, uploaded}) {
    return (
        <img className="uploaded__img"
         style={{display: uploaded === true ? "block" : "none"}} 
         src={uploaded === true && URL.createObjectURL(files[0])} alt="" 
         />
    )
}

export default UploadedImage;