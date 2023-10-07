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
const {username,password}=req.body;

const admin=ADMINS.find((element)=>{
return element.username===username && element.password===password ;
})

if(admin){
  next();
}
else{
  res.status(403).json({message:"Admin authentication failed"});
}
};
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
let username=req.body.username;
let password=req.body.password;
for(let i=0;i<ADMINS.length;i++){
  if(username===ADMINS[i].username && password===ADMINS[i].password){
    res.status(403).send("Admin already exists");
  }
}
ADMINS.push({username:username,
password:password});
res.status(201).send("Admin created successfully")
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
  // logic to log in admin
 res.json({message:"Logged in successfully"});
   
});

app.post('/admin/courses', authenticateAdmin,(req, res) => {
  // logic to create a course
  const {title,description,price,imageLink,published}=req.body;
 
  const course={
    title:title,
    description:description,
    price:price,
    imageLink:imageLink,
    published:published,
    ID:id++
  }
  COURSES.push(course);
res.json({message:"Course Created Successfully",
courseID:id})
});
1696673585308
app.put('/admin/courses',authenticateAdmin, (req, res) => {
  // logic to edit a course
 
  const {courseid,title,description,price,imageLink,published}=req.body;
 let flag=0;
  COURSES=COURSES.map((ele)=>{
    if(ele.ID===courseid){
    return ( { title:title,
      description:description,
      price:price,
      imageLink:imageLink,
      published:published,
        })
      flag=1;
      }
  else{
    return ele;
  }
})
if(flag)
res.json({message:"Course updated successfully"});    
 else{
  res.status(404).json("Course not found");
 }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
