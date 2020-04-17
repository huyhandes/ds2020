#include <string>
#include <iostream>
#include <grpcpp/grpcpp.h>
#include "file.grpc.pb.h"

using namespace std;
using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;

using filetransfer::UploadFileInfo;
using filetransfer::FinishFile;
using filetransfer::UploadByte;
using filetransfer::ResponseStatus;
using filetransfer::FileTransfer;

class fileTransferImplementation final : public FileTransfer::Service {
    Status SetFileInfo(ServerContext* context, const UploadFileInfo* request, ResponseStatus* reply) override {
        int code = request->code();
        string data = request->data();
        cout<<code<<' '<<data<<'\n';
        reply->set_code(code);
        return Status::OK;
    }
    Status UploadFile(ServerContext* context, const UploadByte* request, ResponseStatus* reply) override {
        int code = request->code();
        string data = request->data();
        cout<<code<<' '<<data<<'\n';
        reply->set_code(code);
        return Status::OK;
    }
    Status EndFileStream(ServerContext* context, const FinishFile* request, ResponseStatus* reply) override {
        int code = request->code();
        cout<<code<<'\n';
        reply->set_code(code);
        return Status::OK;
    }
};

void Run(){
    string address("127.0.0.1:5000");
    fileTransferImplementation service;
    ServerBuilder builder;

    builder.AddListeningPort(address,grpc::InsecureServerCredentials());
    builder.RegisterService(&service);

    unique_ptr<Server> server(builder.BuildAndStart());
    cout<<"server is running on port: "<<address<<'\n';

    server->Wait();
}

int main(int argc, char** argv) {
    Run();
    return 0;
}