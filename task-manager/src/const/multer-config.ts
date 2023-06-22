import multer from 'multer'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'

const uploadAvatarConf = multer({
  dest: 'uploads/avatars',
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg)$/)) {
      return cb(new CustomError(ServerError.JpgOnlyAllowed))
    }

    cb(null, true)
  },
}).single('avatar')

export { uploadAvatarConf }
