const path = require('path');
const multer = require('multer');

const upload = multer({
    // STEP 1: Set file size limit
    limits: {fileSize: 50 * 1024 * 1024}, // 50 mb in size max limit

    // STEP 2: Configure storage (where and how to save)
    storage: multer.diskStorage({
        // Temp folder to save file
        destination: "uploads/",

        // Keep original file name
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),

    // STEP 3: Filter - which file types to allow
    fileFilter: (req, file, cb) => {

         // Get file extension (.jpg, .mp4 etc)
        let ext = path.extname(file.originalname); 
        // Reject if not in allowed list
        if( ext !== ".jpg" && 
            ext !== ".jpeg" && 
            ext !== ".webp" && 
            ext !== ".png" && 
            ext !== ".mp4") {
            cb(new Error(`unsupported file type! ${ext}`), false); // reject file 
            return ;
        }
        // Accept file
        cb(null, true);
    }
});

module.exports = upload;




// User's browser sends multipart/form-data
// This is raw binary data of the file

// Multer receives this raw data and:
// 1. Reads the file
// 2. Saves it to disk
// 3. Extracts metadata (size, type, name)
// 4. Puts all info in req.file object
// 5. Passes to your controller

// Think of it like:
// Raw file data → Multer processes → req.file object