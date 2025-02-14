import { useState } from "react";
import { Avatar, IconButton, TextField, Grid, Dialog, DialogContent } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Axios from "../axios";
import Button from '@mui/joy/Button';

const AddPost = ({ handleClose }) => {
  const [images, setImages] = useState([]); 
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); 

  const user_id = localStorage.getItem("userId");

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
      const res = await Axios.post('/add-post', { images, caption, user_id });
      console.log(res.data.message);
      
      const newPost = {
        images,
        caption,
        user_id,
        _id: res.data.postId, // Assuming backend returns post ID
      };
  
      if (props.onPostAdded) {
        props.onPostAdded(newPost); // Update feed state in parent component
      }
  
      setCaption("");
      setImages([]);
      props.handleClose(); // Close modal
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
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

        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
          <DialogContent>
            {selectedImage && (
              <img src={selectedImage} alt="Uploaded" style={{ width: "100%", height: "auto", borderRadius: 8 }} />
            )}
          </DialogContent>
        </Dialog>

        <Button type="submit" sx={{ mt: 1 }}>Add</Button>
      </form>
    </div>
  );
};

export default AddPost;
