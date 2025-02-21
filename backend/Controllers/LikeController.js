import Likes from "../Models/likeModel.js"

export const likePost=async(req,res)=>{

    const user=req.body.user_id
    const post=req.params.postId
    console.log(user,post,'lkkkkkkkssssss');
    
    const likes=await Likes.create({user ,post})
    const likeCount = await Likes.countDocuments({ post });
    res.status(200).json({likeCount})

     console.log(likeCount,'lllllllllllliiiiiiikkkkkkkkeesss');
     
}
export const unlikePost=()=>{
    
}