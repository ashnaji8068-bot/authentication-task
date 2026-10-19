import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard(){
    const { user, isLoading, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }
    if (isLoading) {
        return <p>Loading dashboard...</p>;
    }
    if (!user) {
        return null;
    }

    return (
        <div>

            <h1>Dashboard</h1>

            <div>
                
                <h2>{user.fullName}</h2>
                <p>@{user.username}</p>
                <p>{user.email}</p>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;