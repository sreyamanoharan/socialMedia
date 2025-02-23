import Post from "../Models/postModel.js";

export const newPosts=async(req,res)=>{

    try {
        console.log(req.body,'asdfghjklkjhgfdsa');
  
        const {images ,caption, user_id}=req.body
        console.log(req.body,'22222222222222');
        
    
        const data=await (await Post.create({images,caption,user:user_id})).populate('user')
        console.log(data,'daaaaaaataaaaaaaa');
        res.status(200).json({data})
    } catch (error) {
        console.log(error);
        
    }

    

}


// export const getAllPosts=async(req,res)=>{
//     try {
//         const data = await Post.find().populate({ path: "user" , select :'name'});

//         console.log(data,'poooatttttt');
//         res.status(200).json({data})
//     } catch (error) {
//         console.log(error);
        
//     }

  
// }



export const getAllPosts = async (req, res) => {
    try {
        const data = await Post.aggregate([
            {
                $lookup: {
                    from: 'users', 
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },

            {
                $lookup: {
                    from: 'likes', 
                    localField: '_id', 
                    foreignField: 'post', 
                    as: 'likes'
                }
            },
            {
                $addFields: {
                    likeCount: { $size: '$likes' } 
                }
            },{
                $sort:{createdAt:-1}
            }
        ]);
        console.log(data);
        
        res.status(200).json({data});
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const getUserPosts=(req,res)=>{

}