import {Card}from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect,useState } from 'react';
import axios, { Axios, AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Courses } from '../store/atom/course';

function PurchasedCourse(){
const [course,setCourse]=useState([]);
useEffect(()=>{
    const callback=(resp:AxiosResponse)=>{
        setCourse(resp.data.purchasedCourses);
        console.log(resp.data.purchasedCourses);
    }
axios.get("http://localhost:3000/users/purchasedCourses",{
    headers:{
        "Authorization" : "Bearer "+localStorage.getItem("token")
       }
}).then(callback);
},[])
if(!course){
    return <>
    <CircularProgress />
    
    </>
}
return<>
<GrayTopper ></GrayTopper>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
{course.map((ele)=>{
    return <Course course={ele} />
})}
</div>
</>
}
function GrayTopper(){
    return <div style={{height:200,background:"#212121",top:0,width:"100vw",zIndex:0,marginBottom:10}}>
    <div style={{height:200,display:"flex",justifyContent:"center",flexDirection:"column"}}>
    <div>
      <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign="center">My Courses</Typography>
    </div>
    
    </div>
    </div>
    }
    interface CourseCardProps{
        course:Courses
    }
    function Course(props:CourseCardProps){
    
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
       
       <Button  style={{marginTop:20}} 
       >Start Learning</Button>
        </Card>
      }
export default PurchasedCourse