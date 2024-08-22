import React from "react";
import "./share.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Share ({files}) {
    const handleShare = () => {
     let data = window.URL.createObjectURL(files[0])
      navigator.clipboard.writeText(data)
      toast.success("Copied to clipboard")

    }

    return (
        <div>
             <button className="btn" id="share__btn" onClick={handleShare}>Share</button>
             <ToastContainer />
        </div>
       
    )
}

export default Share;