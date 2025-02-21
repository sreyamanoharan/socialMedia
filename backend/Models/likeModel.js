import mongoose from "mongoose";

const likeShema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
})

const Likes=mongoose.model('Likes',likeShema)
export default Likes