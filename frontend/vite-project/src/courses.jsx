import { useEffect } from "react"
import React,{useState} from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function Courses(){
  const type=localStorage.getItem("type");
const [course,setCourse]=useState([]);
    useEffect(()=>{
 if(type==="admin"){
      let callback1=(resp)=>{
    setCourse(resp.data.course);
    console.log(resp.data);
   }
     axios.get("http://localhost:3000/admin/courses",{
    headers:{
      "Authorization" : "Bearer "+localStorage.getItem("token")
    }
   }).then(callback1)
 }
 else{
  let callback1=(resp)=>{
    setCourse(resp.data.published);
    console.log(resp.data);
   }
     axios.get("http://localhost:3000/users/courses",{
    headers:{
      "Authorization" : "Bearer "+localStorage.getItem("token")
    }
   }).then(callback1)
 }
       
},[])
if(type==="admin"){
return<>
<GrayTopper title="Courses"></GrayTopper>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
{course.map((ele)=>{
    return <Course course={ele} />
})}
</div>
</>
}
return <>
<GrayTopper title="Courses"></GrayTopper>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
{course.map((ele)=>{
    return <Course2 course={ele} />
})}
</div>
</>
}
function GrayTopper(props){
  return <div style={{height:200,background:"#212121",top:0,width:"100vw",zIndex:0,marginBottom:10}}>
  <div style={{height:200,display:"flex",justifyContent:"center",flexDirection:"column"}}>
  <div>
    <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign="center">{props.title}</Typography>
  </div>
  
  </div>
  </div>
  }

function Course(props){
  const navigate=useNavigate();
  return <Card style={{minHeight:200,
    width:300,
    margin:20,
    padding:10,
    display: 'flex',
    flexDirection:"column",
   alignItems:"center"
    
  }}>
 <img src={props.course.image} style={{maxWidth:'100%',height:200}}/>
 <Typography variant="h4" align="center">{props.course.title}</Typography>
 <Typography variant="subtitle1" align="center">{props.course.description}</Typography>
 <Typography variant="subtitle2" align="center">₹{props.course.price}</Typography>
 <div style={{display:"flex",justifyContent:"space-between"}}>
 <Button  variant="contained" style={{marginTop:20 , marginRight:10}} onClick={
  ()=>{
    navigate("/course/"+props.course.id);
  }
 }>Edit</Button>
  <Button  style={{marginTop:20}} variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
 </div>
  </Card>
}
function Course2(props){
  const navigate=useNavigate();
  return <Card style={{minHeight:200,
    width:300,
    margin:20,
    padding:10,
    display: 'flex',
    flexDirection:"column",
   alignItems:"center"
    
  }}>
 <img src={props.course.image} style={{maxWidth:'100%',height:200}}/>
 <Typography variant="h4" align="center">{props.course.title}</Typography>
 <Typography variant="subtitle1" align="center">{props.course.description}</Typography>
 <Typography variant="subtitle2" align="center">₹{props.course.price}</Typography>
 <Button  style={{marginTop:20}} onClick={
  ()=>{
    navigate("/courseuser/"+props.course.id);
  }
 }>View</Button>
  </Card>
}
export default Courses