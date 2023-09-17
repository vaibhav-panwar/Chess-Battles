const express = require("express")

const feedRouter = express.Router();

const {FeedbackModel} = require("../models/feedback.model")

feedRouter.post("/savefeedback", async (req,res)=>{
    try {
        const feed = new FeedbackModel(req.body)
        await feed.save()
        res.status(200).send({"msg":"New Feedback has been added"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }

})




feedRouter.get("/showfeedback",async(req,res)=>{
    // const que = req.query
    try {
        const feedbacks= await FeedbackModel.find()
    
        res.send(feedbacks)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
    })

    module.exports = {feedRouter}