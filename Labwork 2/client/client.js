const PROTO_PATH = __dirname + '/../protos/file.proto'

const grpc = require('grpc')
const fs = require('fs')
const chunkingStreams = require('chunking-streams')
const SizeChunker = chunkingStreams.SizeChunker
const protoLoader = require('@grpc/proto-loader')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const fileTransfer_proto = grpc.loadPackageDefinition(packageDefinition).fileTransfer

const client = new fileTransfer_proto.fileTransfer('localhost:8000', grpc.credentials.createInsecure())

const filePath = __dirname + '/send/random.txt'
const defaultSize = 10 * 1024
const input = fs.createReadStream(filePath)
const uploadFileProcess = async() => {
    client.uploadFile({ code: 0, data: "random.txt" }, (err, response) => {
        console.log(response.code)
        chunker = new SizeChunker({
            chunkSize: defaultSize,
            flushTail: true
        })
        chunker.on('data', (chunk) => {
            client.uploadFile({ code: 1, data: chunk.data.toString() }, (err, response) => {
                console.log(response.code)
            })
        })
        input.pipe(chunker)
        input.on('end', () => {
            client.uploadFile({ code: 2, data: "" }, (err, response) => {
                console.log(response.code)
                input.close()
            })
        })
    })
}
uploadFileProcess()