#include <string>
#include<iostream>
#include <grpcpp/grpcpp.h>
#include "file.grpc.pb.h"

using namespace std;
using grpc::Channel;
using grpc::ClientContext;
using grpc::Status;

using filetransfer::UploadByte;
using filetransfer::FinishFile;
using filetransfer::UploadFileInfo;
using filetransfer::ResponseStatus;
using filetransfer::FileTransfer;

class fileTransferClient{
    public: fileTransferClient(shared_ptr<Channel> channel): stub_(FileTransfer::NewStub(channel)){}
    int SetFileInfo(int code, string data){
        UploadFileInfo request;
        request.set_code(code);
        request.set_data(data);
        ResponseStatus reply;
        ClientContext context;
        Status status = stub_->SetFileInfo(&context, request, &reply);
        if(status.ok()){
            return reply.code();
        }
        else {
            cout << status.error_code() << ": " << status.error_message() << '\n';
            return -1;
        }
    }
    int UploadFile(int code, string data){
        UploadByte request;
        request.set_code(code);
        request.set_data(data);
        ResponseStatus reply;
        ClientContext context;
        Status status = stub_->UploadFile(&context, request, &reply);
        if(status.ok()){
            return reply.code();
        }
        else {
            cout << status.error_code() << ": " << status.error_message() << '\n';
            return -1;
        }
    }
    int EndFileStream(int code){
        FinishFile request;
        request.set_code(code);
        ResponseStatus reply;
        ClientContext context;
        Status status = stub_->EndFileStream(&context, request, &reply);
        if(status.ok()){
            return reply.code();
        }
        else {
            cout << status.error_code() << ": " << status.error_message() << '\n';
            return -1;
        }
    }
    private:
        std::unique_ptr<FileTransfer::Stub> stub_;
};

void Run(){
    string address("127.0.0.1:5000");
    fileTransferClient client(grpc::CreateChannel(address, grpc::InsecureChannelCredentials()));
    int x;
    while(cin>>x){
        switch (x)
        {
        case 0:
            cout<<client.SetFileInfo(x,"file title")<<'\n';
            break;
        case 1:
            cout<<client.UploadFile(x,"sample buffer")<<'\n';
            break;
        case 2:
            cout<<client.EndFileStream(x)<<'\n';
            break;
        default:
            return;
        }
    }
}

int main(int argc, char* argv[]){
    Run();

    return 0;
}