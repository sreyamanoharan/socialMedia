import Likes from "../Models/likeModel.js"

export const likePost=async(req,res)=>{

    const user=req.body.user_id
    const post=req.params.postId
    console.log(user,post,'lkkkkkkkssssss');
    
    const likes=await Likes.create({user ,post})
    const likeCount = await Likes.countDocuments({ post });
    res.status(200).json({likeCount})

     console.log(likeCount,likes,'lllllllllllliiiiiiikkkkkkkkeesss');
     
}
export const unlikePost=async(req,res)=>{
   const user=req.query.user_id;
   const post=req.params.postId
   const likes=await Likes.deleteOne({user,post})
   const likeCount=await Likes.countDocuments({post})    
   console.log(likes,likeCount,'deleteLikesssss');
   res.status(200).json({likeCount})
   
}