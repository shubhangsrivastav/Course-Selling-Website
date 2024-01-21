import { useEffect } from "react";
import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import {Card ,Grid}from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios,{ AxiosResponse } from "axios";
import { Courses } from "../store/atom/course";


function CourseUser(){
    const {courseid}=useParams();
    const [course,setCourse]=useState<Courses|undefined>();
    useEffect(()=>{
       let callback1=(res:AxiosResponse)=>{
setCourse(res.data);
   }
   axios.get("http://localhost:3000/admin/courses/"+courseid,{
    headers:{
      "Authorization" : "Bearer "+localStorage.getItem("token")
    }
   }).then(callback1);
         
},[])



if(!course){
    return <>
    <CircularProgress />
    
    </>
}
return <>
<GrayTopper title={course.title}></GrayTopper>
<Grid container>
  <Grid item lg={8} md={12} sm={12}>
    <BodyCard course={course}/>

  </Grid>
  <Grid item lg={4} md={12} sm={12}>
    <CourseCard course={course}></CourseCard>
  </Grid>
</Grid>
</>

}
interface GrayTopperProps{
  title:string
}

function GrayTopper(props:GrayTopperProps){
return <div style={{height:250,background:"#212121",top:0,width:"100vw",zIndex:0,marginBottom:-150}}>
<div style={{height:250,display:"flex",justifyContent:"center",flexDirection:"column"}}>
<div>
  <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign="center">{props.title}</Typography>
</div>

</div>
</div>
}
interface CourseCardProps{
  course:Courses
}
function CourseCard(props:CourseCardProps){
let currCourse=props.course;
return <Card style={{minHeight:200,
    width:300,
    margin:20,
    padding:10,
    display: 'flex',
    flexDirection:"column",
   alignItems:"center"
    
  }}>
 <img src={currCourse.image} style={{maxWidth:'100%',height:200}}/>
 <Typography variant="h4" align="center">{currCourse.title}</Typography>
 <Typography variant="subtitle2" align="center">₹{currCourse.price}</Typography>
 <Button  variant="contained" onClick={async()=>{

   const resp= await axios.post("http://localhost:3000/users/courses/"+currCourse._id,{},{
    headers:{
     "Authorization" : "Bearer "+localStorage.getItem("token")
    }})
    console.log(resp.data);
    alert(`Congratulations ! Your have successfully purchased ${currCourse.title} course`);
 }}
 >Buy Now</Button>
  </Card>
}
function BodyCard(props:CourseCardProps){
    return <>
    <div style={{marginTop:175 , display:"flex" ,flexDirection:"column"}}>
     
<Typography variant="h3" style={{marginLeft:100}} >Overview</Typography>
<Typography variant="subtitle1" style={{marginLeft:100}} ><b>Validity:23 months</b></Typography>
<Typography variant="h5" style={{marginLeft:100,marginTop:20}} ><b>Description</b></Typography>
<Typography variant="h4" style={{marginLeft:100,marginTop:10}} >Learn by contributing to Real World Project</Typography>
<Typography variant="h6" style={{marginLeft:100,marginTop:10}} >{props.course.description}</Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:10}} >The course is led by <b>{props.course.organiser}</b>  where we go through an intense <b>8-10 weeks</b> of learning the  <b>{props.course.title}</b> in depth, and contributing to one big codebase.</Typography>
<Typography variant="h5" style={{marginLeft:100,marginTop:20}} ><b>Fee Breakup</b></Typography>
<Typography variant="h6" style={{marginLeft:100,marginTop:10}} >Early bird price of <b>₹{props.course.price}/${Math.ceil(Number(props.course.price)/83.18)}</b></Typography>
<Typography variant="h5" style={{marginLeft:100,marginTop:20}} ><b>Name of the Organiser</b></Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:10}} > {props.course.organiser}</Typography>
<Typography variant="h5" style={{marginLeft:100,marginTop:20}} ><b>FAQs</b></Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:10}} ><b>What will be the language of communication</b></Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:5}} > English</Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:10}} ><b>What will be the timings of the classes</b></Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:5}} > Live classes will happen on Saturday and Sunday 7PM IST onwards

</Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:10}} ><b>What if I miss a class</b></Typography>
<Typography variant="subtitle1" style={{marginLeft:100,marginTop:5}} > You will get a recording after the class ends, although we strongly suggest you attend the class</Typography>
    </div>
   
    </>
}
export default CourseUser