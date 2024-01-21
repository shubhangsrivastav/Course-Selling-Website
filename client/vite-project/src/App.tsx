import Signup from "./components/signup"
import Appbar from "./components/appbar"
import Signin from "./components/signin"
import Addcourses from "./components/addcourses"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom" 
import AdminCourses from "./components/courses"
import Course from "./components/course"
import Landing from "./components/Landing"
import UserLanding from "./components/userlanding"
import AdminLanding from "./components/adminlanding"
import CourseUser from "./components/courseuser"
import PurchasedCourse from "./components/purchasedcourse"
import {RecoilRoot,useSetRecoilState} from "recoil"
import { userState } from "./store/atom/user"
import { useEffect } from "react"
import axios from "axios"


function App() {
   

  return (
    <div style={{
      width: "100vw",
    height: "100vh",
    backgroundColor: "#eeeeee"}} >
   <RecoilRoot>
 
   <Router>
   <Appbar />
   <InitUser />
      <Routes>
        <Route path ="/" element={<Landing />} />
        <Route path ="/userlanding" element={<UserLanding />} />
        <Route path ="/adminlanding" element={<AdminLanding />} />
        <Route path ="/course/:courseid" element={<Course />} />
        <Route path ="/signin" element={<Signin />} />
        <Route path ="/signup" element={<Signup />} />  
        <Route path ="/courses" element={<AdminCourses />} />  
        <Route path="/addcourses" element={<Addcourses/>}/>
        <Route path="/courseuser/:courseid" element={<CourseUser/>}/>
        <Route path="/purchased" element={<PurchasedCourse/>}/>
     
      </Routes>
    </Router>
    </RecoilRoot>
        </div>
  )
}
function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get(`http://localhost:3000/admin/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
            console.log(response.data.username)  
            setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}
export default App
