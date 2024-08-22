import React, { useState } from "react";
import axios from "axios"
import { useDropzone } from "react-dropzone"
import Exit from "/images/exit.svg"
import "./dropbox.css"
import UploadedImage from "../UploadedImage/UploadedImage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Download from "../Download/Download";
import Share from "../Share/Share";
import Uploading from "../Uploading/Uploading";



function Dropbox ({setLoading, loading}) {
    const [files, setFiles] = useState([])
    const [uploaded, setUploaded] = useState(false)
    const [percentage, setPercentage] = useState(0)
   

  const bar = document.getElementById("bar")
  

    const onDrop = async (acceptedFiles) => {
      if(acceptedFiles.length > 0) {
        setLoading(true)
      
        setFiles(acceptedFiles.map(file => file));
    
        const formData = new FormData();
        for (const file of acceptedFiles) {
            formData.append("files", file)
           
        }
        await axios.post("https://image-uploader-backend-48ij.onrender.com/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            timeout: 6000,
            timeoutErrorMessage: "file took too long",
              onUploadProgress: (progressEvent) => {
                const percentCompleted = (progressEvent.loaded / progressEvent.total) * 100;
                bar.setAttribute('value', percentCompleted)
                bar.previousElementSibling.textContent = `${percentCompleted.toFixed()}%`
                if (percentCompleted === 100) {
                  bar.previousElementSibling.textContent = "Upload Complete"
              
                }
            }
        })
        .then(response => {
           console.log("file uploaded successfully")
          })
          .catch((error) => {
          console.error("Upload Error:", error)
          })
      } else {
        toast.error("Unaccepted File Type")
      }
    
      setLoading(false)
      setUploaded(true) 
    }

    const {getRootProps, getInputProps, isDragActive, isDragAccept} = useDropzone({
      onDrop,
      accept: {
        'image/jpeg' : [".jpeg", ".jpg"],
        'image/png': [".png"],
        "image/gif": [".gif"]
      },
      maxFiles:1,
      maxSize: 2*1024*1024,
    })
      
return (
    <div>
     
       <Uploading 
      loading={loading}
      percent={percentage}
      
      />
    <section style={{display: loading === true ? "none" : "block"}}>
  
  <div style={{borderColor: isDragAccept ? '#3662E3' : null}}{...getRootProps({className: "dropzone"})}>
    <input {...getInputProps()} />

    <UploadedImage files={files} uploaded={uploaded}/>

    {isDragActive ? (
       <p className="dropzone-content">
       Release to drop the files here
     </p>
    ) : ( 
      <ul id="dropbox__content" style={{display: uploaded === true && "none"}}>
        <li>  <img src={Exit} alt="" /></li>
        <li className="middle__line">  Drag & Drop a file or <span style={{color: "#3662E3", cursor: "pointer"}}>browse files</span></li>
        <li className="bottom__line">  JPG, PNG or GIF - Max File Size 2MB</li>
      </ul>

  
    )}

  </div>
</section>
<ul id="share__container" style={{display: uploaded === false && "none"}}>
<li><Share files={files} /></li>
          <li><Download files={files}/></li>
        </ul>
<ToastContainer />

  </div>
     
)  


}

export default Dropbox;
