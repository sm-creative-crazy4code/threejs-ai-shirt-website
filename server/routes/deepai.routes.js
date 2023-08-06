const deepai = require('deepai')
import express from 'express'
import * as dotenv from 'dotenv'

const deepai = require('deepai')
deepai.setApiKey('0d2d3930-7f5c-4f81-b4f3-58c12127830d');

const router=express.Router()

router.route("/deepai").post(async(req,res)=>{
try {
    
    const {prompt} = req.body
    console.log(prompt);

    
} catch (error) {
    
}


})