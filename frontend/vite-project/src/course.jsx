import { useEffect } from "react";
import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import {Card ,Grid}from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

function Course(){
    const {courseid}=useParams();
    const [course,setCourse]=useState();
    useEffect(()=>{
       let callback1=(res)=>{
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
    <UpdateCard course={course} setcourse={setCourse}></UpdateCard>

  </Grid>
  <Grid item lg={4} md={12} sm={12}>
    <CourseCard course={course}></CourseCard>
  </Grid>
</Grid>
</>

}
function GrayTopper(props){
return <div style={{height:250,background:"#212121",top:0,width:"100vw",zIndex:0,marginBottom:-150}}>
<div style={{height:250,display:"flex",justifyContent:"center",flexDirection:"column"}}>
<div>
  <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign="center">{props.title}</Typography>
</div>

</div>
</div>
}
function CourseCard(props){
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
 <Typography variant="subtitle1" align="center">{currCourse.description}</Typography>
 <Typography variant="subtitle2" align="center">₹{currCourse.price}</Typography>
  </Card>
}
function UpdateCard(props){

  let currCourse=props.course;
  let courseid=currCourse.id;
  let setCourse=props.setcourse;

  
  const [courseTitle,setCourseTitle]=useState(currCourse.title);
    const [courseDescription,setCourseDescription]=useState(currCourse.description);
    const [coursePrice,setCoursePrice]=useState(currCourse.price);
    const [coursePublished,setCoursePublished]=useState(currCourse.published);
    const [courseImage,setCourseImage]=useState(currCourse.image);
    const [courseOrganiser,setCourseOrganiser]=useState(currCourse.organiser);
   
let changeTitle=(event)=>{
setCourseTitle(event.target.value);
}
let changeDescription=(event)=>{
setCourseDescription(event.target.value);
}
let changePrice=(event)=>{
setCoursePrice(event.target.value);
}
let changePublished=(event)=>{
setCoursePublished(event.target.value);
}
let changeImage=(event)=>{
  setCourseImage(event.target.value);
}
let changeOrganiser=(event)=>{
  setCourseOrganiser(event.target.value);
}
return (
<div style={{display:"flex",justifyContent:"start"}}>
    
    <Card   variant={"outlined"} style={{
       
        width:300, 
        margin:80,
        padding:20}}>
            <Typography variant="h6" align="center" style={{padding:10}}>Update Course</Typography>
            <TextField value={courseTitle} fullWidth={true} id="outlined-basic" label="Title" variant="outlined" onChange={changeTitle} />
       <br />
       <br />
       <TextField value={courseDescription} fullWidth={true} id="outlined-basic" label="Description" variant="outlined" onChange={changeDescription} />
       <br />
       <br />
       <TextField value={coursePrice} fullWidth={true} id="outlined-basic" label="Price" variant="outlined" onChange={changePrice} />
       <br />
       <br />
       <TextField value={coursePublished} fullWidth={true} id="outlined-basic" label="Published" variant="outlined" onChange={changePublished} />
       <br />
       <br />
       <TextField value={courseImage} fullWidth={true} id="outlined-basic" label="Image" variant="outlined" onChange={changeImage} />
       <br />
       <br />
       <TextField  value={courseOrganiser} fullWidth={true} id="outlined-basic" label="Organiser" variant="outlined" onChange={changeOrganiser} />
       <br />
       <br />
       <Button variant="contained" size="large" onClick={()=>{
         
     let callback1=(res)=>{
      console.log(res.data);
      let updatedcourse={
        'title': courseTitle, 'description': courseDescription, 'price': coursePrice, 'published': coursePublished ,
        'image':courseImage,'id':courseid
      };
        
         setCourse(updatedcourse);
       }
      axios.put("http://localhost:3000/admin/courses/"+courseid,{
        'title': courseTitle, 'description': courseDescription, 'price': coursePrice, 'published': coursePublished ,
         'image':courseImage
      },{
        headers:{
          "Authorization" : "Bearer "+localStorage.getItem("token")
        }
      }).then(callback1);
       
       }}>Update Course</Button>
   
       </Card>
</div>
)
}

export default Course