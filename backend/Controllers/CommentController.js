import  db  from '../index.js'

export const addComment = (req, res) => {
    const { postId } = req.params;
    const { user_id, comment } = req.body;

    if (!postId || !user_id || !comment) {
        return res.status(400).json({ message: "Post ID, User ID, and Comment are required" });
    }

    const sql = `INSERT INTO comments (post_id, user_id, comment_text) VALUES (?, ?, ?)`;

    db.query(sql, [postId, user_id, comment], (err, result) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        console.log(result,'ccoommeenennttt');
        
        return res.status(201).json({ 
            message: "Comment added successfully",
            commentId: result.insertId, // Return the newly added comment ID
            postId,
            user_id,
            comment
        });
    });
};


export const getCommets=(req,res)=>{
    
}