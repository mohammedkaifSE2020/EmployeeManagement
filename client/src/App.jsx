import Header from "./components/Header"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Employeelist from "./pages/EmployeeList"
import Create from "./pages/Create"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Update from "./pages/Update"
import Logout from "./pages/Logout"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  
  return (
    <div className=" w-11/12 h-11/12 m-auto rounded-xl  bg-slate-100">
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/home" element = {<Home/>}></Route>
            <Route path="/signup" element = {<Signup/>}></Route>
            <Route path="/login" element = {<Login/>}></Route>
            <Route path="/" element = {<Home/>}></Route>
            <Route element = {<PrivateRoute/>}>
              <Route path="/employeelist" element = {<Employeelist/>}></Route>
              <Route path="/create" element = {<Create/>}></Route>
              <Route path="/update/:id" element = {<Update/>}></Route>
              <Route path="/logout" element = {<Logout/>}></Route>
            </Route>
          </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
