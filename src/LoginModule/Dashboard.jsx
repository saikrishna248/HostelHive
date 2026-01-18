import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

//Redux implementation 1
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const [summary, setSummary] = useState(null);

    //Redux implementation 2
    const { isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    // 🔐 Protect route
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/Login");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return;

        api.get("Dashboard/summary")
            .then(response => {
                console.log("Dashboard Data:", response.data);
                setSummary(response.data);
            })
            .catch(error => {
                console.error("Dashboard Error:", error);
            });
    }, [isAuthenticated]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {!summary && <p>Loading dashboard...</p>}

            {summary && (
                <div className="bg-white shadow p-6 rounded w-80">
                    <p><strong>Total Rooms:</strong> {summary.totalRooms}</p>
                    <p><strong>Available Rooms:</strong> {summary.availableRooms}</p>
                    <p><strong>Occupied Rooms:</strong> {summary.occupiedRooms}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
