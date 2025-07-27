import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import SideBar from './components/common/SideBar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './Pages/NotificationPage'
import ProfilePage from './Pages/ProfilePage'

import { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const {data: authUser , isLoading, error} = useQuery({
    queryKey:["authUser"],
    queryFn : async ()=>{
      try {
        const res = await fetch("/api/auth/check", {
        method: "GET",
        headers : {
          "Content-Type" : "application/json"
        }
      })
      const data = await res.json();
      
      if (data.error) return null;
      if(!res.ok){
        throw new Error(error.message);
      }  
      return data;
      } catch (error) {
        throw new Error(error.message);
      }
      

    },
    retry: false
  })
   {isLoading && <div className='h-screen flex justify-center items-center'>
    <LoadingSpinner size='lg'></LoadingSpinner>
   </div>}
  return (<div className='flex' data-theme = "black">
    <Toaster/>
    {authUser && <SideBar></SideBar>}
    <Routes>
    <Route path='/' element= { !authUser ? <Navigate to="/login"></Navigate> : <HomePage></HomePage>}></Route>
    <Route path='/login' element= {authUser ? <Navigate to="/"></Navigate> :<LoginPage></LoginPage>}></Route>
    <Route path='/signup' element= {authUser ? <Navigate to="/"></Navigate> :<SignupPage></SignupPage>}></Route>
    <Route path='/notification' element= {!authUser ? <Navigate to="/login"></Navigate> :<NotificationPage></NotificationPage>}></Route>
    <Route path='/profile/:userName' element={!authUser ? <Navigate to="/login"></Navigate> : <ProfilePage></ProfilePage>}></Route>
  </Routes>
  {authUser && <RightPanel></RightPanel>}
  
    
  </div>)
}

export default App
