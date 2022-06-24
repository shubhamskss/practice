const express=require('express')
const bodyparser=require('body-parser')
const app=express()

let multer=require('multer')
app.use(bodyparser.json())
app.use(multer().any())
const route=require("./routes/route")

app.use('/',route)
app.listen(process.env.port||3000, function(){
    console.log(`express app is running`)
})
