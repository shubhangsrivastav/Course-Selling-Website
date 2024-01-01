const express = require('express');
const app = express();
const jwt=require("jsonwebtoken");
const fs=require("fs")
const cors=require("cors");
const mongoose=require("mongoose");

app.use(express.json());
app.use(cors());

// Define Mongoose Schema
const userSchema=new mongoose.Schema(
  {
    username:mongoose.Schema.Types.String,
    password:String,
    purchased:[{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}]
  }
)
const adminSchema=new mongoose.Schema({
  username:String,
  password:String,
  })
const coursSchema=new mongoose.Schema({
  title:String,
  description:String,
  price:String,
  published:String,
  image:String,
  organiser:String
})
 const Admin=mongoose.model("Admin",adminSchema);
 const User=mongoose.model("User",userSchema);
 const Courses=mongoose.model("Courses",coursSchema);

 mongoose.connect("mongodb+srv://Shubhang:67WexsBlgWqz33Qt@cluster0.ic1hndy.mongodb.net/",{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })

let secretKey="shubhang";

const generateJwt=(user)=>{
const payload={username:user};
const token=jwt.sign(payload,secretKey,{expiresIn:"1hr"});
return token;
}
// { username: 'ss009', iat: 1697713072, exp: 1697716672 } // this is the user format;
const authenticateJwt=(req,res,next)=>{
  let header=req.headers.authorization;
  if(header){
  const token=header.split(' ')[1];
  jwt.verify(token,secretKey,(err,user)=>{
    if(err){
      res.status(403);
    }
    req.user=user;
    next();
    
  });
  }
  else{
    res.status(403);
  }
};
// Admin routes
app.post('/admin/signup', async(req, res) => {
  // logic to sign up admin
  const {username,password}=req.body;
  const admin = await Admin.findOne({username,password});
  if(admin){
    res.status(403).json({message:"Admin already exists"});
  }
  else{
    const token=generateJwt(username);
    const newadmin=new Admin({username:username,password:password});
    await newadmin.save();
    res.json({message:"Admin successfully created",token :token});
  
  }

});

app.post('/admin/login', async(req, res) => {
  // logic to log in admin
  const {username,password}=req.headers;
  const admin=await Admin.findOne({username,password});
  if(admin){
    const token=generateJwt(username);
    res.status(201).json({message:"Logged in successfully",token:token});
  }
  else{
    res.json({message:"Authentification failed"});
  }
});
app.get("/admin/me",authenticateJwt,(req,res)=>{
let user=req.user.username;
res.json({username:user});
});

app.post('/admin/courses',authenticateJwt, async(req, res) => {
  // logic to create a course
let course=req.body;
const newcourse= new Courses(course);
await newcourse.save();

res.json({message:"Course created successfully",couseId:newcourse.id});
});


app.put('/admin/courses/:courseId',authenticateJwt, async(req, res) => {
  // logic to edit a course
 const updatedcourse=req.body;
  const course=await Courses.findByIdAndUpdate(req.params.courseId,updatedcourse,{new:true});
if(course){
  
res.json({message:"Course updated successfully"});
}
else{
  res.json({message:"Course not found"});
}
});


app.get('/admin/courses',authenticateJwt, async(req, res) => {
  // logic to get all courses
  const course=await Courses.find({});
res.json({course:course});
});

app.get('/admin/courses/:courseid',authenticateJwt, async(req,res)=>{
  const course=await Courses.findById(req.params.courseid);
 if(course){
  return res.json(course);
 }
  res.status(404).json({message:"Course doesn't exist"});
})
// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const {username,password}=req.body;
  const found=await User.findOne({username,password});
  if(found){
    res.json({message:"User already exists"});
  }
  else{
  const newuser=new User({username:username,password:password});
  await newuser.save();
  const token=generateJwt(username);
  res.json({message:"User successfully created",token:token});}
});


app.post('/users/login', async(req, res) => {
  // logic to log in user
  const {username,password}=req.headers;

  const found=await User.findOne({username:username,password:password});

  if(found){
    const token=generateJwt(username);

    res.json({message:"Logged in successfully",token:token});
  }
else{
  res.json({message:"User not found"});
}
});

app.get('/users/courses',authenticateJwt, async(req, res) => {
  // logic to list all courses
 const published=await Courses.find({published:"true"});
res.json({published:published});
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Courses.findById(req.params.courseId);

  if (course) {
    const user = await User.findOne({ username: req.user.username });
    const found= user.purchased.find((ele)=>{
      return ele==req.params.courseId;
    })
    if (user) {
     if(!found){
      user.purchased.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });}
      else{
        res.json({message:'Course already purchased'})
      }

    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses',authenticateJwt, async(req, res) => {
  // logic to view purchased courses
const username=req.user.username;
const user=await User.findOne({username:username});
const purchasedIds=user.purchased;
let purchasedCourses=[];
for(let i=0;i<purchasedIds.length;i++){
  let temp=await Courses.findById(purchasedIds[i]);
  purchasedCourses.push(temp);
}
res.json({purchasedCourses:purchasedCourses});
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
