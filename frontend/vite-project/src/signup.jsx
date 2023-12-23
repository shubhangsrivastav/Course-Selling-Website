import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import React,{useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { userState } from '../store/atom/user';
import { useSetRecoilState } from 'recoil';

function Signup(props){
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const type=localStorage.getItem("type");
    const setState=useSetRecoilState(userState);


    const navigate=useNavigate();
    function changeUsername(event){
      setUsername(event.target.value);
    }
    function changePassword(event){
      setPassword(event.target.value);
    }
    return <>
 <GrayTopper></GrayTopper>     
    <div style={{display:"flex",justifyContent:"center",marginTop:100}}>
    
    <Card   variant={"outlined"} style={{
       
        width:400,
        
        padding:20}}>
            <TextField fullWidth={true} id="outlined-basic" label="Email" variant="outlined" onChange={changeUsername} />
       <br />
       <br />
       <TextField  fullWidth={true} id="outlined-basic" label="Password" variant="outlined" onChange={changePassword} />
       <br />
       <br />
       <Button variant="contained" size="large" onClick={async()=>{
     
     const resp= await axios.post(`http://localhost:3000/${type}/signup`,{
        "username":username,
        "password":password },
        {
          headers:{
            "username":username,
          "password":password
          }
        }
      )
      localStorage.setItem("token",resp.data.token);
      navigate("/courses");
      if(resp.data.token){
        setState({
         userEmail: username,
         isLoading: false
     })}
       }}>Signup</Button>
   
       </Card>
</div>
</>
}
function GrayTopper(){
  return <div style={{height:200,background:"#212121",top:0,width:"100vw",zIndex:0,marginBottom:-150,marginTop:10}}>
  <div style={{height:200,display:"flex",justifyContent:"center",flexDirection:"column"}}>
  <div>
    <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign="center">Signup Page</Typography>
  </div>
  
  </div>
  </div>
  }
export default Signup