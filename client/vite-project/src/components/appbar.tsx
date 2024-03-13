import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React,{useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import {  userloading } from '../store/selector/userloading';
import { useremail } from '../store/selector/useremail';
import { userState } from '../store/atom/user';


function Appbar(){

  const userEmail=useRecoilValue(useremail);
  const userLoading=useRecoilValue(userloading);
  const type=localStorage.getItem("type");
  const setState=useSetRecoilState(userState);

  const navigate=useNavigate();
  
 
 console.log(userEmail);
  if(userEmail){  
    if(type=="admin"){
  return <div style={{display:'flex',
    justifyContent:"space-between",
    margin:10}}>
       <div>
       <Typography variant={"h6"}> CourseVista</Typography>
       </div>
       <div style={{display:"flex"}}>
       <div><Button variant="text" size="large" style={{marginRight:10}} onClick={()=>{
navigate("/courses");
      }}>Courses</Button></div>
       <div><Button variant="text" size="large" style={{marginRight:10}} onClick={()=>{
navigate("/addcourses");
      }}>Add Course</Button></div>
        
        
       <Avatar sx={{ bgcolor: deepPurple[500], marginRight:5}}>{userEmail[0].toUpperCase()}</Avatar>
      <div><Button variant="contained" size="large" onClick={()=>{
localStorage.setItem("token",undefined);
setState({
  isLoading: false,
  userEmail: null
})
navigate("/");
      }}>Logout</Button></div>
        </div>
        </div>
}
return   <div style={{display:'flex',
justifyContent:"space-between",
margin:10}}>
   <div>
   <Typography variant={"h6"}> CourseVista</Typography>
   </div>
   <div style={{display:"flex"}}>
   <div><Button variant="outlined" size="large" onClick={()=>{
navigate("/courses");
  }} style={{marginRight:10}}>Courses</Button></div>
   <div><Button variant="outlined" size="large" onClick={()=>{
navigate("/purchased");
  }} style={{marginRight:10}}>My Course</Button></div>
    
    
   <Avatar sx={{ bgcolor: deepPurple[500], marginRight:5}}>{userEmail[0].toUpperCase()}</Avatar>
  <div><Button variant="contained" size="large" onClick={()=>{
localStorage.setItem("token",undefined);
setState({
  isLoading: false,
  userEmail: null
})
navigate("/");
  }}>Logout</Button></div>
    </div>
    </div>
  }
return <div style={{display:'flex',
    justifyContent:"space-between",
    }}>
       <div>
       <Typography variant={"h6"}> CourseVista</Typography>
       </div>
       <div style={{display:"flex"}}>
      <div style={{marginRight:10}}><Button variant="contained" size="large" onClick={()=>{
       navigate("/signin");
      }} >Signin</Button></div>
      <div style={{marginRight:10}}><Button variant="contained" size="large" onClick={()=>{
       navigate("/signup");
      }}>Signup</Button></div>
        </div>
    </div>

}   
        
      
      
export default Appbar