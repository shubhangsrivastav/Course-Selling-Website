const express = require('express');
const app = express();
const jwt=require("jsonwebtoken");
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let secretKey="shubhang";
let id=0;
const generateJwt=(user)=>{
  const payload={username:user.username};
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
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const user=req.body;
  const admin=ADMINS.find((ele)=>{
    return ele.username===user.username && ele.password===user.password;
  });
  if(admin){
    res.status(403).json({message:"Admin already exists"});
  }
  else{
    const token=generateJwt(user);
    ADMINS.push(user);
    res.json({message:"Admin successfully created",token :token});
  
  }


});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const user=req.headers;
  const admin=ADMINS.find((ele)=>{
    return ele.username===user.username && ele.password===user.password;
  });
  if(admin){
    const token=generateJwt(user);
    res.status(201).json({message:"Logged in successfully",token:token});
  }
  else{
    res.json({message:"Authentification failed"});
  }
});

app.post('/admin/courses',authenticateJwt, (req, res) => {
  // logic to create a course
let course=req.body;
course.id=++id;
COURSES.push(course);
res.json({message:"Course created successfully",couseId:id});
});

app.put('/admin/courses/:courseId',authenticateJwt, (req, res) => {
  // logic to edit a course
  let courseid=parseInt(req.params.courseId);
  let updatedCourse=req.body;
  updatedCourse.id=courseid;

  const course=COURSES.find((ele)=>{
    return ele.id===courseid;
  })
if(course){
  COURSES=COURSES.map((ele)=>{
    if(ele.id===courseid){
      return updatedCourse;
    }
    else{
      return ele;
    }
  })
res.json({message:"Course updated successfully"});
}
else{
  res.json({message:"Course not found"});
}
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
res.json({course:COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user=req.body;
  const found=USERS.find((ele)=>{
    return ele.username===user.username && ele.password===user.password;
  });
  if(found){
    res.json({message:"User already exists"});
  }
  USERS.push(user);
  const token=generateJwt(user);
  res.json({message:"User successfully created",token:token});
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const {username,password}=req.headers;
  const user={
    username:username,
    password:password
  }
  const found=USERS.find((ele)=>{
    return ele.username===username && ele.password===password;
  });

  if(found){
    const token=generateJwt(user);
    res.json({message:"Logged in successfully",token:token});
  }
else{
  res.json({message:"User not found"});
}
});

app.get('/users/courses',authenticateJwt, (req, res) => {
  // logic to list all courses
  let published=[];
  published=COURSES.filter((ele)=>{
    return ele.published===true;
  });
res.json({published:published});
});

app.post('/users/courses/:courseId',authenticateJwt, (req, res) => {
  // logic to purchase a course
  const courseid=parseInt(req.params.courseId);
  const course=COURSES.find((ele)=>{
    return ele.id===courseid && ele.published===true;
  });
  if(course){
    let username=req.user.username;
   USERS=USERS.map((ele)=>{
    if(ele.username===username){
      let update=ele;
      if(!update.purchased){
      update.purchased=[];
      update.purchased.push(courseid);
    }
    let found=update.purchased.find((ele)=>{
      return ele===courseid;
    })
    if(!found){
    update.purchased.push(courseid);}
    return update;
  }
    else{
      return ele;
    }
   })
    res.json({message:"Course purchased successfully"});
  }
else{
  res.json({message:"Course not found"});
}
});

app.get('/users/purchasedCourses',authenticateJwt, (req, res) => {
  // logic to view purchased courses
const username=req.user.username;
const user=USERS.find((ele)=>{
  return ele.username===username;
})
const purchasedIds=user.purchased;
let purchasedCourses=[];
for(let i=0;i<purchasedIds.length;i++){
  COURSES.forEach((ele)=>{
    if(ele.id===purchasedIds[i]){
      purchasedCourses.push(ele);
    }
  })
}
res.json({purchasedCourses:purchasedCourses});

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
