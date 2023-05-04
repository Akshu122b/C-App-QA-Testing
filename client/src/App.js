import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import PrivateRoute from "./PrivateRoute";
import Modal from 'react-modal';
import Dashboard from "./component/Dashboard";
import Calendar from "./component/Calendar";


;


Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">  


      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
         

        </Route>
      </Routes>
    </div>
  );
}

export default App;
