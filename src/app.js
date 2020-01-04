import express from 'express'
import bodyParser from 'body-parser'
const PORT = process.env.PORT || 5000

//app init
const app = express()

app.use(bodyParser.json())

//route
app.get('/', (req, res, next) => {
  res.send('send')
})

//server
app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`)
})
