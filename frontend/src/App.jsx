import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import SideBar from './components/common/SideBar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './Pages/NotificationPage'
import ProfilePage from './Pages/ProfilePage'

import { Toaster } from "react-hot-toast";

function App() {
  return (<div className='flex' data-theme = "black">
    <Toaster/>
    <SideBar></SideBar>
    <Routes>
    <Route path='/' element= {<HomePage></HomePage>}></Route>
    <Route path='/login' element= {<LoginPage></LoginPage>}></Route>
    <Route path='/signup' element= {<SignupPage></SignupPage>}></Route>
    <Route path='/notification' element= {<NotificationPage></NotificationPage>}></Route>
    <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
  </Routes>
  <RightPanel></RightPanel>
    
  </div>)
}

export default App
