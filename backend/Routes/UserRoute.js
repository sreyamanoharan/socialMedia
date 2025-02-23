import express from 'express'
import {Register} from '../Controllers/UserController.js'
import { login } from '../Controllers/UserController.js'
import { newPosts } from '../Controllers/PostController.js'
import { getAllPosts } from '../Controllers/PostController.js'
import { getUserPosts } from '../Controllers/PostController.js'
import { getLike } from '../Controllers/LikeController.js'
import { addComment } from '../Controllers/CommentController.js'
import { toggleLike } from '../Controllers/LikeController.js'
import { getCommets } from '../Controllers/CommentController.js'
import { getProfile } from '../Controllers/UserController.js'
const userRoute=express.Router()

userRoute.post('/register',Register)
userRoute.post('/login',login)
userRoute.post('/add-post',newPosts)
userRoute.get('/get-posts',getAllPosts)
userRoute.get('/user-posts/:userId',getUserPosts)
userRoute.get("/get-likes", getLike);
userRoute.post("/add-comment/:postId", addComment);
userRoute.get('/get-comments/:postId',getCommets)
userRoute.post('/toggle-like/:postId',toggleLike)
userRoute.get('/get-profile/:userId',getProfile)


export default userRoute