const cloudinary = require('cloudinary');
const fs = require('fs/promises');
const AppError = require('./errorUtils');

//upload file to cloudinary 
const uploadOnCloudinary = async (filePath) => {
    try {
        //if no file path is provided 
        if (!filePath) {
            throw new AppError('No file is available', 400)
        }
        // upload file to cloudinaly
        //  Cloudinary - Takes that file and stores it on cloud, gives back a URL and returns → { url: 'https://cloudinary.com/your-image.jpg' } inside the result,
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "lms",
            width: 250,
            height: 250,
            gravity: "faces",
            crop: "fill",
            resource_type: "image"
        })

        //After uploading to Cloudinary, file is no longer needed on your server,Deletes the temporary file Multer saved locally
        // await fs.rm(`uploads/${req.file.filename}`) // another way

        await fs.unlink(filePath);

        // return uploaded image details 
        return result ;

    } catch (error) {
        // delete local file if upload fail 
        if (filePath) {
            await fs.unlink(filePath).catch(() => {});
        }
        throw new AppError(error.message || "Cloudinary upload failed",500 );
    }
   
}

module.exports = uploadOnCloudinary;