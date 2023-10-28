import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from "./pages/home"
import Login from './pages/login'
import Reg from "./pages/reg"
import About from './pages/about'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/login' exact element={<Login/>}></Route>
        <Route path='/registration' exact element={<Reg/>}></Route>
        <Route path='/about' exact element={<About/>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
