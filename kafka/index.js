const express = require('express');

const HomeController = require('./controller/home')
const ProducerController = require('./controller/producer')


const app = express()

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000

app.get('/', HomeController.index)

app.post('/produce', ProducerController.produce)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})