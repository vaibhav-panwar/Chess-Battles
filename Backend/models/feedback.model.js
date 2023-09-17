const  mongoose  = require("mongoose")

const feedbackSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true}
},
{
    versionKey:false,
    timestamps:true
})

const FeedbackModel = mongoose.model("feedback",feedbackSchema);

module.exports = {FeedbackModel};