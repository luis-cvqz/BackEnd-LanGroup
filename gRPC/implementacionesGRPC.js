//const { archivomultimedia, solicitud, Sequelize } = require('../models')
const fs = require('fs')
const logger = require('../logger/logger')

const UPLOADS_PATH = './uploads/'
const CHUNK_SIZE = 10240

// Implementacion de subirVideo
function subirVideoImpl(call, callback) {
  try {
    let nombreVideo, archivoid, chunk
    let tempFilePath
  
    call.on('data', async (DescargarArchivoResponse) => {
      if (DescargarArchivoResponse.nombre) {
        //archivoid = DescargarArchivoResponse.archivoid
        nombreVideo = DescargarArchivoResponse.nombre
        tempFilePath = `./uploads/${nombreVideo}`
        console.debug(`Recibiendo el video ${nombreVideo}`)
      } 
      else if (DescargarArchivoResponse.archivo) {
        chunk = DescargarArchivoResponse.archivo
        fs.appendFileSync(tempFilePath, chunk)
        process.stdout.write('.')
      }
    }).on('end', function() {
      callback(null, { nombre: nombreVideo })
      console.log('\nEnvio de datos terminado.')
  
      // video = fs.readFileSync(UPLOADS_PATH + nombreVideo)
      // fs.existsSync(UPLOADS_PATH + nombreVideo) && fs.unlinkSync(UPLOADS_PATH + nombreVideo)
  
      // archivomultimedia.update({
      //   archivo: video
      // }, { where: { id: archivoid } })
    })
  } catch (error) {
    logger.error(`Error interno del servidor gRPC: ${error}`)
  }
}

// Implementacion de descargarVideo
function descargarVideoImpl(call) {
  try {
    let nombreVideo = call.request.nombre
  
    const stream = fs.createReadStream(UPLOADS_PATH + nombreVideo, { highWaterMark: CHUNK_SIZE })
  
    console.log(`\n\nEnviando el archivo: ${nombreVideo}`)
    stream.on('data', function(chunk) {
      call.write({ archivo: chunk })
      process.stdout.write('.');
    }).on('end', function() {
      call.end()
      stream.close()
      console.log('\nEnvio de datos terminado')
    })
  } catch (error) {
    logger.error(`Error interno del servidor gRPC: ${error}`)
  }
}

// Implementeacion de subirConstancia
function subirConstanciaImpl(call, callback) {
  try {
    let nombreConstancia, constanciaid, chunk
    let tempFilePath
  
    call.on('data', async (DescargarArchivoResponse) => {
      if (DescargarArchivoResponse.nombre) {
        // constanciaid = DescargarArchivoResponse.archivoid
        nombreConstancia = DescargarArchivoResponse.nombre
        tempFilePath = `./uploads/${nombreConstancia}`
        console.debug(`Recibiendo el documento ${nombreConstancia}`)
      } else if (DescargarArchivoResponse.archivo) {
        chunk = DescargarArchivoResponse.archivo
        fs.appendFileSync(tempFilePath, chunk)
        process.stdout.write('.')
      }
    }).on('end', function() {
      callback(null, { nombre: nombreConstancia })
      console.log('\nEnvio de datos terminado.')
  
      // documento = fs.readFileSync(UPLOADS_PATH + nombreConstancia)
      // fs.existsSync(UPLOADS_PATH + nombreConstancia) && fs.unlinkSync(UPLOADS_PATH + nombreConstancia)
      
      // solicitud.update({
      //   constacia: documento
      // }, { where: { id: constanciaid } })
    })
  } catch (error) {
    logger.error(`Error interno del servidor gRPC: ${error}`)
  }
}

// Implementacion de descargarConstancia
function descargarConstanciaImpl(call) {
  try {
    let nombreConstancia = call.request.nombre
  
    const stream = fs.createReadStream(UPLOADS_PATH + nombreConstancia, { highWaterMark: CHUNK_SIZE })
  
    console.log(`\n\nEnviando el archivo: ${nombreConstancia}`)
    stream.on('data', function(chunk) {
      call.write({ archivo: chunk })
      process.stdout.write('.');
    }).on('end', function() {
      call.end()
      stream.close()
      console.log('\nEnvio de datos terminado')
    })
  } catch (error) {
    logger.error(`Error interno del servidor gRPC: ${error}`)
  }
}

// Exporta las implementaciones de las funciones
module.exports = {
  subirVideoImpl,
  descargarVideoImpl,
  subirConstanciaImpl,
  descargarConstanciaImpl
}