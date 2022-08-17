import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Emails from './pages/Emails';
import Register from "./pages/Register";
import Messages from "./pages/Messages";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/emails" element={<Emails/>}/>
                <Route exact path="/emails/:id/messages" element={<Messages/>}/>
            </Routes>
        </Router>
    );
}

export default App;
