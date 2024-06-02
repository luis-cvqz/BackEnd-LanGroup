const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require('dotenv');
const fs = require('fs')
const PROTO_PATH = "./proto/audio.proto";

dotenv.config()

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const archivosProto = grpc.loadPackageDefinition(packageDefinition)

const stub = new archivosProto.ArchivosServices(`localhost:${process.env.GRP_PORT}`, grpc.credentials.createInsecure())

async function main() {
    nombre_video = 'video.mp4'

    subirVideo(stub, nombre_video)

    await waitForKey(13)
}

main()

function subirVideo(stub, nombre_video) {
    console.log(`\nEnviando el video ${nombre_video}`)

    const serviceCall = stub.subirVideo((err, response) => {
        if (err) {
            console.log(err)
        } else {
            console.log("\nEl servidor indica que recibió correctamente el archivo: " + response.nombre)
        }
    })

    serviceCall.write({
        nombre: nombre_video
    })

    const stream = fs.createReadStream(`./recursos/${nombre_video}`)
    stream.on('archivo', (chunk) => {
        serviceCall.write({ archivo: chunk })
        process.stdout.write('.')
    }).on('end', function () {
        serviceCall.end()
        console.log('\nEnvio de datos terminado')
    })
}

function waitForKey(keyCode) {
    return new Promise(resolve => {
        process.stdin.on('archivo', function (chunk) {
            if (chunk[0] === keyCode) {
                resolve();
                process.stdin.pause();
            }
        });
    });
}