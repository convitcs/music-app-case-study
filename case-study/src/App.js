import "./App.css";
import HomePage from "./components/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./components/LogInPage";
import Register from "./components/RegisterPage";
import Uploader from "./components/HomePage/AudioList/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Register />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login"    element={<Login    />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
    // <Uploader></Uploader>
  )
}

export default App;
