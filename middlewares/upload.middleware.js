const multer = require("multer")

const filtroImagenes = (req, file, callback) => {
  let esImagen = (file.mimetype.startsWith("image/png") || file.mimetype.startsWith("image/jpeg") || file.mimetype.startsWith("image/jpg"))
  let extensionValida = (file.originalname.endsWith(".png") || file.originalname.endsWith(".jpeg") || file.originalname.endsWith(".jpg"))

  if ( esImagen && extensionValida) {
    callback(null, true)
  } else {
    callback("Solo se permiten imágenes con extensión JPG, JPEG o PNG", false)
  }
}

const almacenamiento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})

const subirarchivo = multer({ storage: almacenamiento, fileFilter: filtroImagenes })

module.exports = subirarchivo