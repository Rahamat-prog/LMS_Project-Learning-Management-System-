import './App.css';
import AboutUs from './Pages/AboutUs';
import HomePage from './Pages/HomePage';
import {Route, Routes} from 'react-router-dom'
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import CourseList from './Pages/Course/CourseList';
import Contact from './Pages/Contact';
import Denied from './Pages/Denied';
import CourseDescription from './Pages/Course/CourseDescription';
import CreateCourse from './Pages/Course/CreateCourse';
import RequireAuth from './components/Auth/RequreAuth';

function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={ <HomePage /> }></Route>
        <Route path='/about' element={ <AboutUs /> }></Route>
        <Route path='*' element={<NotFound />} > </Route>
        < Route path= '/signup' element= {<Signup />} /> 
        < Route path= '/login' element= {<Login />} /> 
        < Route path= '/courses' element= {<CourseList />} /> 
        < Route path= '/contact' element= {<Contact />} />    
        < Route path= '/denied' element= {<Denied />} />    
        < Route path= '/course/description' element= {<CourseDescription />} />

         <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
