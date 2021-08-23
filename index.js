const express = require('express')
const app = express()
const routes = require('./routes/routes.js')

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))

app.use('/static', express.static('static'))
app.use(routes)
console.log("listening on 8009")
app.listen(8009)
