import bcrypt from 'bcrypt'
import  db  from '../index.js'

export const Register=async(req,res)=>{
    try {
  const {name,email,password} =req.body
  console.log(req.body,'lllllllllllllllllllllllllllllllll');
  
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        console.log('aaaaaaaaaaaaa');
        
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "Email already exists!" });
                }
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


   export const login = async (req, res) => { 
        try {
            const { email, password } = req.body;
    
            const sql = `SELECT * FROM users WHERE email = ?`;
            db.query(sql, [email], async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
    
                if (result.length === 0) {
                    return res.status(400).json({ message: "User not found!" });
                }
    
                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.password);
    
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid email or password!" });
                }

          console.log(user.id);
          
                res.status(200).json({ message: "Login successful" ,user_id:user.id});
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };



    export const newPosts = (req, res) => {
        try {
          console.log('Request Body:', req.body);
      
          const { user_id, images, caption } = req.body;
      
          if (!user_id || !caption || !images || !Array.isArray(images)) {
            return res.status(400).json({ message: "Invalid input data" });
          }
      
          const imagesJson = JSON.stringify(images); // Convert images array to JSON
      
          // Step 1: Insert the new post into the database
          const insertSql = `INSERT INTO posts (user_id, images, caption) VALUES (?, ?, ?)`;
      
          db.query(insertSql, [user_id, imagesJson, caption], (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ message: "Database error", error: err.message });
            }
      
            const postId = result.insertId; // Get the ID of the newly inserted post
      
            // Step 2: Fetch the user's name from the users table
            const fetchUserSql = `SELECT name FROM users WHERE id = ?`;
      
            db.query(fetchUserSql, [user_id], (err, userResult) => {
              if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error", error: err.message });
              }
      
              if (userResult.length === 0) {
                return res.status(404).json({ message: "User not found" });
              }
      
              const user_name = userResult[0].name; // Get the user's name
      
              // Step 3: Return the response with the post ID and user_name
              return res.status(201).json({
                message: "Post added successfully",
                postId: postId,
                user_name: user_name, // Include the user_name in the response
              });
            });
          });
        } catch (error) {
          console.error("Server error:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      };
    export const getAllPosts = (req, res) => {

        console.log('loaaddd');
        
        const sql = `
            SELECT 
                posts.*, 
                users.name AS user_name, 
                COUNT(comments.id) AS comment_count,  -- Count the total comments for each post
                GROUP_CONCAT(comments.comment_text ORDER BY comments.created_at SEPARATOR '||') AS comments,
                GROUP_CONCAT(comment_users.name ORDER BY comments.created_at SEPARATOR '||') AS comment_users
            FROM posts 
            JOIN users ON posts.user_id = users.id
            LEFT JOIN comments ON posts.id = comments.post_id
            LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
            GROUP BY posts.id
            ORDER BY posts.created_at DESC`;
    
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }
    
            // Format comments and images properly
            const formattedResult = result.map(post => ({
                ...post,
                images: post.images ? JSON.parse(post.images) : [], // Convert stored JSON string into an array
                comments: post.comments ? post.comments.split("||").map((comment, index) => ({
                    user: post.comment_users.split("||")[index],
                    text: comment
                })) : [],
                comment_count: post.comment_count // Total comments for the post
            }));
            console.log(formattedResult,'formatttedddd');
            
            return res.status(200).json({ result: formattedResult });
        });
    };
    
    
    export const getUserPosts = (req, res) => {
        const { userId } = req.params;
        console.log(userId, 'Fetching posts for user ID');
      
        const sql = `
          SELECT 
            posts.*, 
            users.name AS user_name, 
            COUNT(comments.id) AS comment_count,  -- Count the total comments for each post
            GROUP_CONCAT(comments.comment_text ORDER BY comments.created_at SEPARATOR '||') AS comments,
            GROUP_CONCAT(comment_users.name ORDER BY comments.created_at SEPARATOR '||') AS comment_users
          FROM posts 
          JOIN users ON posts.user_id = users.id
          LEFT JOIN comments ON posts.id = comments.post_id
          LEFT JOIN users AS comment_users ON comments.user_id = comment_users.id
          WHERE posts.user_id = ?  -- Filter posts by the specific user ID
          GROUP BY posts.id
          ORDER BY posts.created_at DESC`;
      
        db.query(sql, [userId], (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Database error", error: err.message });
          }
      
          // Format comments and images properly
          const formattedResult = result.map(post => ({
            ...post,
            images: post.images ? JSON.parse(post.images) : [], // Convert stored JSON string into an array
            comments: post.comments ? post.comments.split("||").map((comment, index) => ({
              user: post.comment_users.split("||")[index],
              text: comment
            })) : [],
            comment_count: post.comment_count // Total comments for the post
          }));
      
          console.log(formattedResult, 'Formatted result for user posts');
          return res.status(200).json({ result: formattedResult });
        });
      };

