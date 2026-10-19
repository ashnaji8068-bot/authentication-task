import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
    const[showPassword,setShowpassword]=useState(false);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate= useNavigate();
    const[error,setError]=useState("")
    const { login } = useAuth();
    
async function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
        return setError("Please enter your email and password.");
    }

    try {
        await login(email, password);
        navigate("/dashboard");
    } catch (error) {
        console.error("Login failed:", error);
        setError(error.message || "Unable to log in. Please try again.");
    }
}



    return(
        <div>

            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <div>
                    
                    <label>Email </label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            

                <div>
                    <label>Password</label>
                    <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button
                    type="button"
                    onClick={()=>setShowpassword(!showPassword)}>
                        {showPassword ? "Hide" : "Show"} Password
                    </button>
                </div>
                {error &&<p style={{color:"red"}}>{error}</p>}

                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register here</Link> 
                </p>

            </form>

        </div>
    )
}

export default Login