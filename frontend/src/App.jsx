import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'

function App() {
  return (<div>
  <Routes>
    <Route path='/' element= {<HomePage></HomePage>}></Route>
    <Route path='/login' element= {<LoginPage></LoginPage>}></Route>
    <Route path='/signup' element= {<SignupPage></SignupPage>}></Route>
  </Routes>
  </div>)
}

export default App
