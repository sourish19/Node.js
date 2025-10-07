// import http from 'node:http'
// import url from 'node:url'

// const server = http.createServer()

// server.on('request',(req,res)=>{

//     const parsedUrl = url.parse(req.url).pathname

//     if(parsedUrl === '/'){
//         res.end('Home Page')
//     }
//     if(parsedUrl === '/about'){
//         res.end('About Page')
//     }
// })

// server.listen(3000, () => {
//     console.log('Server running on port 3000')
// })

import { log } from 'console'
import fs from 'node:fs/promises'
import { createReadStream } from 'node:fs'
import express from 'express'
import expressStatusMonitor from 'express-status-monitor'

const app = express()

app.use(expressStatusMonitor())

// This will create a sudden spike and the memory usage will increase which sometimes could lead to memory leaks and sudden crashes
app.get('/moreusage', async (req, res) => {
    const data = await fs.readFile('bigfile.txt', 'utf-8')
    res.send(data)
})

app.get('/lessusage', (req, res) => {
    const stream = createReadStream('./bigfile.txt','utf-8')
    stream.pipe(res) // This handles backpressures more stable comapred to the below code 
    // stream.on('data',(chunk)=>{
    //     res.write(chunk)
    // })
    // stream.on('end',()=>res.end())
})

app.listen(3000, () => {
    log('Server running on port 3000')
})