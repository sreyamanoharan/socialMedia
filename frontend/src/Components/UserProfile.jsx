import React, { useEffect } from 'react'
import Axios from '../axios'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UserProfile = () => {
    const [profile, setProfile] = useState({})
    const [editProfile,setEditProfile]=useState({name:'',email:''})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user_id = localStorage.getItem("userId");


    useEffect(() => {
        Axios.get(`/get-profile/${user_id}`).then((res) => {
            setProfile(res.data.user)
        })
    }, [])


   const handleProfile=(e)=>{
   const {name,email}=e.target 
   console.log(name,email);
      
        
   }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '130px', width: '130px', borderRadius: '50%', color: 'blue', background: 'red' }}>
                <img src="" alt="" />
                <div style={{ display: 'flex' }}>
                    <h3 style={{ marginLeft: '190px' }}>{profile.name}</h3>
                    <Button onClick={handleOpen} style={{ minWidth: '100px', fontSize: '9px', marginLeft: '30px', height: '22px', marginTop: '20px' }} variant="contained" disableElevation>
                        Edit Profile
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Edit Profile
                                </Typography>
                                <div style={{ height: '130px', width: '130px', borderRadius: '50%', color: 'blue', background: 'red' }}></div>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <label>Name</label>
                                    <input type="text" placeholder={profile.name} value={editProfile.name}
                                    onChange={handleProfile}/>
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <label>Name</label>
                                    <input type="text" placeholder={profile.email} onChange={(e) => { }} />
                                </Typography>
                                <Button style={{ minWidth: '100px', fontSize: '9px', marginLeft: '30px', height: '22px', marginTop: '20px' }} variant="contained" disableElevation>
                                    Done
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </div>

                <h5 style={{ marginLeft: '190px', marginTop: '2px' }}>{profile.email}</h5>



            </div>


        </div>

    )
}

export default UserProfile



