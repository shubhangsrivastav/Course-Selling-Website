import {Grid} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function AdminLanding(){

    return <div>
    <Grid container style={{padding: "5vw"}}>
        <Grid item xs={12} md={6} lg={6}>
            <div style={{marginTop: 100}}>
                <Typography variant={"h2"}>
                    CourseVista Admin
                </Typography>
                <Typography variant={"h5"}>
                    A place to learn, earn and grow
                </Typography>
                
               
            </div>
            <div>
            </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
            <img src={"src/photo/class.jpeg"} width={"100%"} />
        </Grid>
    </Grid>
</div>
}
export default AdminLanding