Streams in Node.js are objects that let you read data or write data piece by piece (chunks) instead of loading the entire data at once.

Node.js streams are perfect for compression and encryption, because both of those operations process data in chunks — just like streams do.

Suppose i have a application which has a / route and when user hits the route the data from my file.txt is send as a response 

So lets say that that file is of 400 mb so when user hits the route i can monitor my serever using express-status-monitor npm package which tells the CPU usage Memory usage etc.. so when user hits suddenly there will be a spike because traditionally we would forst read the data and get the entire data to our server and then will send it so it will take a lot of memory and servers dosent have that much of memory and if there are multiple or 100s of user hitting the route this could led to server crash 

This is the main reason why we use streams 

so basically the streams works like it sends data not at once but like in chunks so read & write is continuously happening 

In Node.js, streams are built on the EventEmitter interface and emit events like:
data — when a chunk arrives
end — when no more data
error — if something goes wrong
finish — when writing is complete

Compression & Encryption
Read a small piece of data
Compress/encrypt it
Write or send it
Move on to the next chunk

This linux comand will generate a file of around 100mb with random text - increase the number to make it more big 
tr -dc "A-Za-z0-9 " < /dev/urandom | fold -w100 | head -n 1000000 > bigfile.txt

https://medium.com/@vedanshdwivedi0/streams-in-nodejs-6e84f566b411