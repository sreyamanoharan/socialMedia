import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'

export const Register=async(req,res)=>{
try {
  const {name,email,password}=req.body
  console.log(req.body,'llllllllllllllllll');
  const salt = 10
  const hashedPassword=await bcrypt.hash(password,salt)
  console.log(hashedPassword);
  
const users=await User.findOne({email})
if(users){
  res.status(200).json({message:'user already exists'})
}else{
  const user=await User.create({name,email,password:hashedPassword})


res.status(200).json({user:user ,message:'registration successful'})
}
} catch (error) {
  
}

 
}



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('1');
      
      return res.status(200).json({ message: "No user exists" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('2');

      return res.status(200).json({ message: "Incorrect password" });
    }
    console.log('3');
    console.log(user);
    
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile=async(req,res)=>{
  const id=req.params.userId
  console.log(id);
  const user=await User.findOne({_id:id})
  console.log(user,'heheheheheheheeheh');
  res.status(200).json({user})
  
}