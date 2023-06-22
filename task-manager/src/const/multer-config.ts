import multer from 'multer'
import ServerError from 'src/const/server-errors'
import CustomError from 'src/errors/CustomError'

export const allowedAvatarExt = ['jpg', 'jpeg', 'png']
const uploadAvatarConf = multer({
  dest: 'uploads/avatars',
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter(req, file, cb) {
    const regex = new RegExp(`\.(${allowedAvatarExt.join('|')})$`)
    if (!file.originalname.match(regex)) {
      return cb(new CustomError(ServerError.AvatarExtension))
    }

    cb(null, true)
  },
}).single('avatar')

export { uploadAvatarConf }
