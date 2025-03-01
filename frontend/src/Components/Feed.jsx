import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "../axios";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import AddIcon from "@mui/icons-material/Add";
import { Menu, MenuItem, Grid, Dialog, DialogContent, Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Modal from "@mui/material/Modal";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Feed = ({ userId }) => {
  const [data, setData] = useState([]);
  const [commentInput, setCommentInput] = useState({});
  const [likedPost, setLikedPost] = useState([]);
  const [likes, setLikes] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const user_id = localStorage.getItem("userId");
  const opens = Boolean(anchorEl);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const endpoint = userId ? `/user-posts/${userId}` : "/get-posts";
        const res = await Axios.get(endpoint);
        setData(res.data.data);
        console.log(res.data.data, '=========================================================');
 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);





  useEffect(() => {
    Axios.get(`/get-likes?user_id=${user_id}`).then((res)=>{
      console.log(res.data.likedPost,'llllllllllllliiiiiiiii');
      
      setLikedPost(res.data.likedPost)
    },[user_id])
    
  }, []);
  const handleLikes=(postId)=>{
    console.log(likedPost,postId,'chnagggggggeeesss');
    
    console.log(postId,'frontendddddd');
    
    Axios.post(`/toggle-like/${postId}?user_id=${user_id}`).then((res)=>{
      console.log(res.data.likeCount,res.data.liked,'wooooowwww');
      setData((prev)=>prev.map((post)=>post._id===postId?{...post,likeCount:res.data.likeCount}:post))
        if(res.data.liked){
          setLikedPost((prev)=>[...prev,postId])
        }else{
          setLikedPost((prev)=>prev.filter((id)=> id!==postId))
        }
    })
  }


  const handleCommentChange = (postId, value) => {
    setCommentInput((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentInput[postId]) return;
    try {
      await Axios.post(`/add-comment/${postId}`, {
        user_id,
        comment: commentInput[postId],
      });
      setCommentInput((prev) => ({ ...prev, [postId]: "" }));
      const res = await Axios.get(`/get-posts`);
      setData(res.data.result);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Social");
        data.append("cloud_name", "ds0dvm4ol");

        const res = await fetch("https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload", {
          method: "POST",
          body: data,
        });

        const imgData = await res.json();
        return imgData.secure_url;
      })
    );

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await Axios.post("/add-post", { images, caption, user_id }).then((res)=>{
        setData((prevData) => [res.data.data, ...prevData]);

      })


      setCaption("");
      setImages([]);
      handleClose();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filterType) => {
    setAnchorEl(null);
    if (filterType) {
      setSortCriteria(filterType);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-around", width: "90px", gap: "30px" }}>
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="imageInput">
                <IconButton component="span" color="primary">
                  {images.length > 0 ? (
                    <Grid container spacing={0.5} sx={{ width: "200px", height: "auto" }}>
                      {images.map((img, index) => (
                        <Grid item key={index} xs={4}>
                          <Avatar
                            src={img}
                            sx={{ width: "60px", height: "60px", borderRadius: 1, cursor: "pointer" }}
                            onClick={() => setSelectedImage(img)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
                  )}
                </IconButton>
              </label>
              <TextField
                label="Add a caption"
                variant="outlined"
                fullWidth
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <Button type="submit" sx={{ mt: 1 }}>
                Add
              </Button>
            </form>
          </Box>
        </Modal>

      </div>

      {data?.map((dat) => (
        <Card key={dat.id} sx={{ maxWidth: 450, marginTop: "25px" }}>
          <CardHeader title={dat?.user?.name} />
          <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
            {dat.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Post ${dat.id}`} height="500" />
              </SwiperSlide>
            ))}
          </Swiper>
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {dat.caption}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="like" onClick={() => handleLikes(dat._id)}>
              <FavoriteIcon sx={{ color: likedPost.includes(dat._id) ? 'red' : 'inherit' }} />
            </IconButton>
            <Typography>{dat.likeCount}</Typography>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
            <Typography>{dat.comments?.length || 0}</Typography>
          </CardActions>
          <CardContent>
            {dat?.comments?.map((comment, index) => (
              <Typography key={index} variant="body2" sx={{ color: "text.primary" }}>
                <strong>{comment.user}:</strong> {comment.text}
              </Typography>
            ))}
            <TextField
              label="Add a comment..."
              variant="outlined"
              fullWidth
              value={commentInput[dat.id] || ""}
              onChange={(e) => handleCommentChange(dat.id, e.target.value)}
              sx={{ mt: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCommentSubmit(dat.id)}
              sx={{ mt: 1 }}
            >
              Comment
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;