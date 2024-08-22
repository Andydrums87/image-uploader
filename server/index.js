const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs')
const cors = require('cors');

const app = express()
app.use(cors());



const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({storage: storage})


app.post("/upload", upload.array("files"), (req, res) => {

  const uploadedFiles = req.files
  console.log(uploadedFiles)

  if (!uploadedFiles) {
    return res.status(400).send("No files uploaded!")
  }
  for(const file of uploadedFiles) {
    const filePath = file.path
    const fileName = file.originalname

  try {

    fs.renameSync(filePath, `./uploads/${fileName}`)
    // const result = await cloudinary.uploader.upload(file.path);
    // console.log(result)
  } catch (error) {
    console.log("Error", error)
    return res.status(500).send("error saving files")
  }
}
  res.status(200).send("Files uploaded successfully")
});



app.listen(5000, () => console.log("listening on port 5000"))