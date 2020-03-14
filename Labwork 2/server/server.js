const PROTO_PATH = __dirname + '/../protos/file.proto'

const grpc = require('grpc')
const fs = require('fs')
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const fileTransfer_proto = grpc.loadPackageDefinition(packageDefinition).fileTransfer

var output;

const uploadFile = (call, callback) => {
    switch (call.request.code) {
        case "ON_CREATE":
            output = fs.createWriteStream(`${call.request.data}`)
            callback(null, { code: call.request.code })
            break
        case "ON_UPLOAD":
            try {
                output.write(Buffer.from(call.request.data))
                callback(null, { code: call.request.code })
            } catch (err) {
                console.log(err);
            }
            break
        case "ON_FINISH":
            callback(null, { code: call.request.code })
            break
    }
}

const server = new grpc.Server();
server.addService(fileTransfer_proto.fileTransfer.service, { uploadFile: uploadFile })
server.bind('localhost:8000', grpc.ServerCredentials.createInsecure())
server.start()