const express=require('express')
const router=express.Router()

const fs = require('fs');
const pdfparser = require('pdf-parse');
 router.post("/pdftojson",function(req,res){
	let file=req.files[0].originalname
	
const getPDFText = async (pdfFile, maxPages) => {
    let parsedPDF = ""
    let pdfBuffer = null
    try {
        if (fs.existsSync(pdfFile)) {
            pdfBuffer = fs.readFileSync(pdfFile)
            if (maxPages) {
                parsedPDF = await pdfparser(pdfBuffer, { max: maxPages })
            } else {
                parsedPDF = await pdfparser(pdfBuffer)
            }
            if (parsedPDF) {
                return parsedPDF.text
            }
        }
    } catch (err) {
        return err.message
    }
}

getPDFText(file).then(text => {
	    res.status(200).send(text)
	}).catch(err => {
	    res.status(400).send(err)
	})
 })
 module.exports=router