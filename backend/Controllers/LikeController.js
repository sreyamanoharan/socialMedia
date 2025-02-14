import  db  from '../index.js'


export const likePost = (req, res) => {
    const { postId ,userId} = req.params;
    console.log(postId);
    
    const sql = `UPDATE posts SET likes = likes + 1 WHERE id = ?`;

    db.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        return res.status(200).json({ message: "Post liked successfully" });
    });
};


export const unlikePost=(req,res)=>{

    const {postId}=req.params;
    console.log(postId);
    
    const sql = `UPDATE posts SET likes = likes - 1 WHERE id = ?`;

    db.query(sql, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
        }
        return res.status(200).json({ message: "Post unliked successfully" });
    });

}