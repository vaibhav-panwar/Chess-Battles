const  mongoose  = require("mongoose")

const profileSchema = mongoose.Schema({
    userID:{type:String,required:true},
    userImage:{type:String,required:true},
    userScore:{type:Number}
},
{
    versionKey:false,
    timestamps:true
})

const ProfileModel = mongoose.model("Profile",profileSchema);

module.exports = {ProfileModel};