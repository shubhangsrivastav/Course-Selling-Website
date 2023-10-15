const express = require('express');
const app = express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
var id=1;

const authenticateAdmin=(req,res,next)=>{
const {username,password}=req.headers;

const admin=ADMINS.find((element)=>{
  return element.username===username && element.password===password ;
})
console.log(admin);
if(admin){
  next();
}
else{
  res.status(403).json({message:"Admin authentication failed"});
}
};

const authenticateUser=(req,res,next)=>{
  const {username,password}=req.headers;
  
  const user=USERS.find((element)=>{
    return element.username===username && element.password===password ;
  })
  console.log(user);
  if(user){
    req.user=user;
    next();
  }
  else{
    res.status(403).json({message:"Admin authentication failed"});
  }
  };

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin

  const {username,password}=req.body;

const found=ADMINS.find((element)=>{
  return element.username===username && element.password===password;
})
console.log(found);
if(found){
  res.send("Admin already exist");
}
else{
ADMINS.push({username:username,
password:password});
res.status(201).send("Admin created successfully")
}
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
  // logic to log in admin
 res.json({message:"Logged in successfully"});
   
});

app.post('/admin/courses', authenticateAdmin,(req, res) => {
  // logic to create a course
  const course=req.body;
  course.id=id++;
  COURSES.push(course);
res.json({message:"Course Created Successfully",
courseID:course.id})
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  // logic to edit a course
 const courseid=parseInt(req.params.courseId);
  const newCourse=req.body;
  var flag=0;
  
  COURSES=COURSES.map((ele)=>{
    if(ele.id===courseid){
      newCourse.id=courseid;
      flag=1;
      return newCourse;
    }
    else{
      return ele;
    }
  })
 if(flag){
  res.json({ message: 'Course updated successfully' });
 }
else{
  res.json({message:'course not found'});
}
});

app.get('/admin/courses',authenticateAdmin, (req, res) => {
  // logic to get all courses
  res.json({courses:COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const {username,password}=req.body;
  const user=USERS.find((ele)=>{
    return ele.username===username && ele.password===password;
  })
  if(user){
    res.json({message:"User already exists"});
  }
  else{
    const newuser={username:username,password:password,purchasedCourses:[]};
    USERS.push(newuser);
    res.json({message:"User created successfully"});
  }
});

app.post('/users/login',authenticateUser, (req, res) => {
  // logic to log in user
  res.send({message:"User logged in successfully"});
});

app.get('/users/courses',authenticateUser, (req, res) => {
  // logic to list all courses
  const publishedCourses=COURSES.filter((ele)=>{
    return ele.published==true;
  })
  res.json({publishedCourses:publishedCourses});
});

app.post('/users/courses/:courseId',authenticateUser, (req, res) => {
  // logic to purchase a course
  const courseID=parseInt(req.params.courseId);
  const purchased=req.user.purchasedCourses;
  purchased.forEach((ele)=>{
    if(ele===courseID){
      res.json({message:"Course already purchased"});
    }
  })
const course=COURSES.find((ele)=>{
return ele.id===courseID && ele.published===true;
})
console.log(course);
if(course){
  req.user.purchasedCourses.push(courseID);
  res.json({message:"Course Purchased Successfully"});
}
else{
  res.json({message:"Course not found or not available"});
}
});

app.get('/users/purchasedCourses',authenticateUser, (req, res) => {
  // logic to view purchased courses
  const purchasedIDs=req.user.purchasedCourses;
  const purchased=[];
  for(let i=0;i<purchasedIDs.length;i++){
    COURSES.forEach((ele)=>{
      if(ele.id===purchasedIDs[i]){
        purchased.push(ele);
      }
    })
  }
res.json({purchased});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
