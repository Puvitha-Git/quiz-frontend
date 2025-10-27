import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/api/auth/login", { emailOrPhone, password });

      // ✅ store token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ navigate after storage
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email or Phone"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleLogin}>Login</button>

      <button
        type="button"
        style={{ marginTop: "10px", background: "#2196F3" }}
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}

export default Login;
