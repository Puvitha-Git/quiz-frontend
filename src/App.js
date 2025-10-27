import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import QuizPage from "./components/QuizPage";
import Login from "./components/Login"; // Your existing login
import Register from "./components/Register"; // Your existing register

import LeaderboardPage from "./components/LeaderboardPage" 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:domain" element={<QuizPage />} />
        <Route path='/leaderboard/:domain' element={<LeaderboardPage/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
