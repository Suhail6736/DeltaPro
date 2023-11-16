const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ReviewSchema = new Schema ({
    Comment : String,
    rating :{
        type : Number,
        min: 1,
        max: 6,
    },
    ceatedAt : {
        type:Date,
        default: Date.now(),
    },
    author : {
        type : Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Review",ReviewSchema);