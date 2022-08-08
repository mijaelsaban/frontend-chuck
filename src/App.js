import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Emails from './pages/Emails';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/emails" element={<Emails/>}/>
            </Routes>
        </Router>
    );
}

export default App;
