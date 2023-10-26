const express = require('express')
const cors = require('cors')
const bodyParser=require('body-parser')
const productsRouter = require('./routes/productRoutes')
const commentsRouter=require('./routes/commentRoutes')
const usersRouter = require('./routes/usersRoutes')

const app =express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/products',productsRouter)
app.use('/api/comments',commentsRouter)
app.use('/api.users',usersRouter)



app.listen(3000,()=>{
    console.log('server running on port 3000');
})