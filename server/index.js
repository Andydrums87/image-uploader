require('dotenv').config()

const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs')
const cors = require('cors');
const cloudinary = require("cloudinary").v2;

const app = express()
app.use(cors());

cloudinary.config({
  cloud_name: 'dghzq6xtd',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


// async function handleUpload(file) {
//   const res = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return res;
// }

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({storage: storage})


app.post("/upload", upload.array("files"), async (req, res) => {

  const uploadedFiles = req.files
  console.log(uploadedFiles)

  if (!uploadedFiles) {
    return res.status(400).send("No files uploaded!")
  }
  for(const file of uploadedFiles) {
    const filePath = file.path
    const fileName = file.originalname
 

  try {
 
   await cloudinary.uploader
    .upload(
        `${filePath}`, {
            public_id: `${fileName}`})
    fs.renameSync(filePath, `./uploads/${fileName}`)

  } catch (error) {
    console.log("Error", error)
    res.send({
      message: error.message,
    });
    return res.status(500).send("error saving files")
  }
}
  res.status(200).send("Files uploaded successfully")
});



app.listen(5000, () => console.log("listening on port 5000"))