import Likes from "../Models/likeModel.js"

export const getLike=async(req,res)=>{
console.log('hhhiiiiii');

const userId=req.query.user_id
console.log(userId,'getLikessss');

const likes=await Likes.find({user:userId}).populate('post')
const likedPost=likes.map((data)=>data.post._id)
console.log(likes,likedPost,'llllliiikkkeesss');
res.status(200).json({likedPost})
   
     
}
export const toggleLike=async(req,res)=>{

   const postId=req.params.postId
   const userId=req.query.user_id
   console.log(postId,userId,'ppppppppppppp');
    
   const existingLike=await Likes.findOne({user:userId, post:postId})
   console.log(existingLike,'existimgggggggg.......');

   if(existingLike){
      const likes=await Likes.deleteOne({user:userId, post:postId})
      const likeCount=await Likes.countDocuments({post:postId})
      console.log(likeCount,'likecounssssss');
      
      res.status(200).json({liked:false ,likeCount})      
   }else{
      const likes=await Likes.create({user:userId,post:postId})
      const likeCount=await Likes.countDocuments({post:postId})
      console.log(likes,likeCount,'likeddddddd');
      res.status(200).json({likeCount,liked:true})
      
   }
   
   
}