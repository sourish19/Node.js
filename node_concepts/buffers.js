// buffers are objects which handle binary data 
// These are of fixed length 
// More efficient than strings during binary operations
// file system, cryptography, image processing 
import { log } from "node:console"

const bufferOne = Buffer.alloc(10)
log(bufferOne)
log('Empty buffer -->',bufferOne.toString()) // Empty since i have not added anything to the buffer

const bufferFromString = Buffer.from("Hello")
log(bufferFromString)

const bufferFromInteger = Buffer.from([1, 2, 3])
log(bufferFromInteger)

bufferOne.write('Levi') // This will take the size of bufferOne and write on that buffer 
log('After writing --> ', bufferOne.toString()) // Now it contains the string "Levi"

// We can concatinate, slice and can do many more operations on buffers

log('Slice -->',bufferFromInteger.slice(0, 2))

const concatinateBuffer = Buffer.concat([bufferFromString, bufferOne]) // Need to write it in a array
log('Concatinate buffer -->',concatinateBuffer)

log(concatinateBuffer.toJSON())