import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import { bookRoute } from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// middlewars for parsing request body
app.use(express.json())

// middleware for handling CORS policy
// option 1 : allow all origins with default of cors (*)
app.use(cors())
// option 2 : allow custom origins
// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ))

app.get('/', (req,res)=>{
    res.send('working')
})

app.use('/books', bookRoute)

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, ()=>{
            console.log(`server is listening on port ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
})