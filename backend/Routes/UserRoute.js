import express from 'express'
import {Register} from '../Controllers/UserController.js'
import { login } from '../Controllers/UserController.js'
import { newPosts } from '../Controllers/UserController.js'
import { getAllPosts } from '../Controllers/UserController.js'
import { getUserPosts } from '../Controllers/UserController.js'
import { likePost } from '../Controllers/LikeController.js'
import { addComment } from '../Controllers/CommentController.js'
import { unlikePost } from '../Controllers/LikeController.js'
import { getCommets } from '../Controllers/CommentController.js'

const userRoute=express.Router()

userRoute.post('/register',Register)
userRoute.post('/login',login)
userRoute.post('/add-post',newPosts)
userRoute.get('/get-posts',getAllPosts)
userRoute.get('/user-posts/:userId',getUserPosts)
userRoute.post("/like-post/:postId", likePost);
userRoute.post("/add-comment/:postId", addComment);
userRoute.get('/get-comments/:postId',getCommets)
userRoute.post('/unlike-post/:postId',unlikePost)


export default userRoute