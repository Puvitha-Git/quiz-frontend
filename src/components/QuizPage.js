import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quiz/${domain}`);
        setQuizzes(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quizzes");
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [domain]);

  const handleOptionChange = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = async () => {
    const calculatedScore = quizzes.reduce(
      (acc, quiz, index) => acc + (answers[index] === quiz.correctAnswer ? 1 : 0),
      0
    );
    setScore(calculatedScore);

    // Submit leaderboard
    const payload = {
      username: user?.name,
      email: user?.email,
      domain,
      score: calculatedScore,
      date: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/api/leaderboard", payload);
      alert("Score submitted successfully!");
      navigate("/leaderboard"+`/${domain}`);
    } catch (err) {
      console.error("Leaderboard submit error:", err);
      alert("Failed to submit score");
    }
  };

  if (loading) return <h2>Loading quizzes...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="quiz-container">
  <h2>{domain} Quiz</h2>

  {quizzes.map((quiz, index) => (
    <div key={quiz._id || index} className="quiz-card">
      <h4>{index + 1}. {quiz.question}</h4>
      <ul className="options-list">
        {quiz.options.map((opt, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value={opt}
                checked={answers[index] === opt}
                onChange={() => handleOptionChange(index, opt)}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  ))}

  {score === null ? (
    <button className="submit-btn" onClick={handleSubmit}>
      Submit Quiz
    </button>
  ) : (
    <p className="score-text">Your score: {score} / {quizzes.length}</p>
  )}
</div>

  );
}

export default QuizPage;
