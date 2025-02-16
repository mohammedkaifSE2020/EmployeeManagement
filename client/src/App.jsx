import Header from "./components/Header"
import {BrowserRouter} from "react-router-dom"
import AppRoute from "./components/AppRoute"

function App() {
  
  return (
    <div className=" w-11/12 h-11/12 m-auto rounded-xl pt-40  bg-slate-100">
      <BrowserRouter>
          <Header/>
          <AppRoute/>
      </BrowserRouter>
    </div>
  )
}

export default App
