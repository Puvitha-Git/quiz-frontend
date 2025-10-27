import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function LeaderboardPage() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leaderboard/${domain}`);
        setScores(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLeaderboard();
  }, [domain]);

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>{domain} Leaderboard🏆</h2>
      <ul>
        {scores.map((entry, i) => (
          <li key={i}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default LeaderboardPage;
