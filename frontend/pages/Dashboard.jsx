import { useLocation } from 'react-router-dom'

function Dashboard() {
    const location = useLocation();
    const user = location.state.user;
    const usr = { 
        fname: user[1], 
        lname: user[2], 
        phone: user[3], 
        email: user[4], 
        address: user[5], 
        role: user[6]
    }
    
    return (
        <div className={"content"}>
            <h1>Welcome, {usr.fname}!</h1>

            { usr.role === "mechanic" && <MechanicDashboard />}
            { usr.role === "salesperson" && <SalesDashboard />}
            { usr.role === "billing" && <BillingDashboard />}
        </div>
    )
}

export default Dashboard