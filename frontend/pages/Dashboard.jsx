import { useLocation, useNavigate } from 'react-router-dom'
import SalesDashboard from './SalesDashboard';
import MechanicDashboard from './MechanicDashboard';
import BillingDashboard from './BillingDashboard';
import React, { useState } from 'react';
import AddCustomer from './menus/AddCustomer';
import AddVehicle from './menus/AddVehicle';
import ProcessSale from './menus/ProcessSale';
import Query from './menus/Query';
import ServiceVehicle from './menus/ServiceVehicle';
import VehicleInventory from './menus/VehicleInventory';
import AddBillingData from './menus/AddBillingData';

function Dashboard() {
    const location = useLocation();
    const user = location.state.user;
    const navigate = useNavigate();
    const usr = { 
        id: user[0],
        fname: user[1], 
        lname: user[2], 
        phone: user[3], 
        email: user[4], 
        address: user[5], 
        role: user[6]
    }

    function Logout() {
        navigate("/login")
    }

    const [doingSomething, changeState] = useState("");
    
    return (
        <div className={"dashboard"}>
            <h1>Dashboard</h1>
            <div class="line" />
            
                { doingSomething === "" && (
                    <>
                        <h2>Welcome, {usr.fname}!</h2>
                        <button onClick={() => changeState("AddCustomer")}>Add New Customer</button> <br />
                        <button onClick={() => changeState("AddVehicle")}>Add New Vehicle</button> <br />
                        <button onClick={() => changeState("VehicleInventory")}>Check Vehicle Inventory</button>
                        { usr.role === "mechanic" && <MechanicDashboard changeState = {changeState}/> }
                        { usr.role === "salesperson" && <SalesDashboard changeState = {changeState}/> }
                        { usr.role === "billing" && <BillingDashboard changeState = {changeState}/> }
                        <button onClick={() => changeState("Query")}>View Data</button>
                    </>
                )}

            { doingSomething === "AddCustomer" && <AddCustomer /> }
            { doingSomething === "AddVehicle"  && <AddVehicle /> }
            { doingSomething === "VehicleInventory" && <VehicleInventory /> }
            { doingSomething === "ProcessSale" && <ProcessSale /> }
            { doingSomething === "AddBillingData" && <AddBillingData /> }
            { doingSomething === "ServiceVehicle" && <ServiceVehicle propUsr={usr}/> }
            { doingSomething === "Query" && <Query propUsr={usr}/> }
            
            { doingSomething !== "" && 
                <button onClick={() => changeState("")} className='back'>Back</button> 
            } <br />
            
            { doingSomething === "" && <button className='logout' onClick={Logout}>Log Out</button> }
        </div>
    )
}

export default Dashboard