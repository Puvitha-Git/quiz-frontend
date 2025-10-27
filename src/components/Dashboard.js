import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const domains = ["Java", "Python", "C", "JavaScript", "Networking"];

  const handleStartQuiz = (domain) => {
    navigate(`/quiz/${domain}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
  <h2>Welcome, {user?.name}</h2>
  <h3>Select a domain to start quiz:</h3>

  <div className="dashboard-buttons">
    {domains.map((domain) => (
      <button key={domain} onClick={() => handleStartQuiz(domain)}>
        {domain} Quiz
      </button>
    ))}
  </div>

  <button onClick={handleLogout} style={{ marginTop: "30px" }}>
    Logout
  </button>
</div>

  );
}

export default Dashboard;
