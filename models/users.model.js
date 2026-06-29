const mongoose = require("mongoose")

const userSchema = new mongoose.schema({
    name:{
        type:String,
        required:true,
    }
});

module.exports = new mongoose.model("myUser", userSchema)