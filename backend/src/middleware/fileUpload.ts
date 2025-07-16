import multer from 'multer'
import path from 'path'

// Destination and upload/filename management
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'dist/')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({storage})

export default upload