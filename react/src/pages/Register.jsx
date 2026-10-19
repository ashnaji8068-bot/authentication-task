import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
    const[userName,setUsername]=useState("");
    const[fullName,setFullName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("")



    async function handleRegister(event){
        event.preventDefault();
        setError("")
        if(userName.trim().length<3){
            return setError("Username is required to be at least 3 characters")
        }else if(fullName.trim().length<3){
            return setError("Fullname is required to be at least 3 characters")
        }else if(!email.includes("@") || !email.includes(".com")){
            return setError("Email is required to be a valid email address ")   
        }else if(password.trim().length<6){
            return setError("Password is required to be at least 6 characters")
        }
        try {
    const response = await api.get("/users");
    const users = response.data;

    const usernameExists = users.some(
        (user) =>user.username?.toLowerCase() === userName.trim().toLowerCase()
    );

    const emailExists = users.some(
        (user) =>user.email?.toLowerCase() === email.trim().toLowerCase()
    );

    if (usernameExists) {
        return setError(
            "Username already exists. Please choose a different username."
        );
    }

    if (emailExists) {
        return setError(
            "Email already exists. Please choose a different email."
        );
    }

    
    const registerResponse = await api.post("/users", {
        username: userName.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        password: password,
        createdAt: new Date().toISOString()
    });

    console.log("Registered user:", registerResponse.data);
    alert("Registration completed successfully!");

} catch (error) {
    console.error("Registration failed:", error);
    setError("An error occurred! Please try again later.");
}

    }
    


    return(
        
    <div>

        <form onSubmit={handleRegister}>

            <h1>Register</h1>
            <div>
                <label>Username</label>
                
                <input
                type="text"
                placeholder="Enter your username eg: John007"
                value={userName}
                onChange={(e)=>setUsername(e.target.value)}
                />

            </div>

            <div>
                <label>Fullname</label>
                <input
                    type="text"
                    placeholder="Enter your full name eg: John Doe"
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                />

            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            {error &&<p style={{color:"red"}}>{error}</p>}

            <button 
             type="submit">
                Register
            </button>
            <p>
                Already have an account? <Link to="/login">Login here</Link> 
            </p>

        </form>

    </div>
    )
}
export default Register