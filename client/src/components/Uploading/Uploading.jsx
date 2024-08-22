import React from "react";
import "./uploading.css"


function Uploading ({loading}) {
    return (
        <div className="loading__container" style={{visibility: loading === true ? "visible" : "hidden"}}>
            <p className="uploading__content"><span style={{fontWeight: "bold"}}>Uploading,</span> please wait..</p>


 <progress id="bar" value={0} max={100}></progress>
          
        </div>
    )

}


export default Uploading;

