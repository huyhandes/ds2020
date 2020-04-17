#include <mpi.h>
#include <iostream>
#include<thread>
#include "./protos/file.pb.cc"
using namespace std;
 
 int main(int argc, char *argv[])
 {
   char idstr[32];
   char buff[128];
   int numprocs;
   int myid;
   int i;
   MPI_Status stat;

   MPI_Init(&argc,&argv); 
   MPI_Comm_size(MPI_COMM_WORLD,&numprocs);
   MPI_Comm_rank(MPI_COMM_WORLD,&myid);
 
   if(myid == 0)
   {
     cout<<"We have "<<numprocs<<" processors\n";
     for(i=1;i<numprocs;i++)
     {
       sprintf(buff, "Hello %d! ", i);
       MPI_Send(buff, 128, MPI_CHAR, i, 0, MPI_COMM_WORLD);
     }
     for(i=1;i<numprocs;i++)
     {
       MPI_Recv(buff, 128, MPI_CHAR, i, 0, MPI_COMM_WORLD, &stat);
     }
   }
   else
   {
     MPI_Recv(buff, 128, MPI_CHAR, 0, 0, MPI_COMM_WORLD, &stat);
     sprintf(idstr, "Processor %d ", myid);
     strcat(buff, idstr);
     strcat(buff, "reporting for duty\n");
     MPI_Send(buff, 128, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
   }
 
   MPI_Finalize();
   return 0;
 }