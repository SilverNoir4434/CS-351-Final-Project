import React, { useState } from 'react';
import api from '../../src/api';

function ServiceVehicle({ propUsr }) {
    const [err, setErr] = useState("");
    const url = 'http://localhost:8000/sql_query'
    const [formData, setFormData] = useState({
        service_id: "",
        mileage_arrival: "",
        mileage_depart: "",
        final_estimate: "",
        vehicleID: "",
        customer: ""
    });

    return (
    <div className = "menu">
            <h3>Record Service:</h3>
            <form onSubmit={submit}>
                <p>Service ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, service_id: e.target.value })} />
                <p>Mileage on Arrival:</p>
                <input type="text" onChange={e => setFormData({ ...formData, mileage_arrival: e.target.value })} />
                <p>Mileage on Departure:</p>
                <input type="text" onChange={e => setFormData({ ...formData, mileage_depart: e.target.value })} />
                <p>Final Estimate:</p>
                <input type="text" onChange={e => setFormData({ ...formData, final_estimate: e.target.value })} />
                <p>Vehicle ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, vehicleID: e.target.value })} />
                <p>Customer Name:</p>
                <input type="text" onChange={e => setFormData({ ...formData, customer: e.target.value })} />
                <p className="error">{err}</p>
                <input type="submit" value="Submit" className="submit"></input>
            </form>
        </div>
    )
    
    async function submit(e) {
        setErr("");
        e.preventDefault();
        let results;
        let customerID;
        let cust_name = formData.customer.split(" ");
        if (Object.values(formData).some(value => value === "")) {
            setErr("Please fill in all fields before submitting!");
            return;
        }

        if (isNaN(formData.service_id)) {
            setErr("ServiceID must be a number!");
            return;
        } else if (isNaN(formData.mileage_arrival) || isNaN(formData.mileage_depart)) {
            setErr("Mileage must be a number!");
            return;
        } else if (isNaN(formData.final_estimate)) {
            setErr("Final Estimate must be a number!");
            return;
        } else if (cust_name[1] === undefined) {
            setErr("Please provide the customer's full name!");
            return;
        }

        try {
            let custRes = await api.get(url, {
                params: {
                    query: `SELECT cust_id FROM CUSTOMER WHERE 
                    f_name = '${cust_name[0]}' AND l_name = '${cust_name[1]}';`
                }
            });
            if (custRes.data === null) {
                setErr("Customer cannot be found! Please make sure you input the correct name.");
                return;
            }
            let custData = custRes.data.results[0];
            customerID = custData[0];
        } catch(e) {
            console.log(e);
        }

        try {
            results = await api.get(url, {
            params: {
                query: `INSERT INTO Service VALUES (
                ${formData.service_id},
                ${formData.mileage_arrival},
                ${formData.mileage_depart},
                ${formData.final_estimate},
                ${propUsr.id},
                ${customerID},
                ${formData.vehicleID},
                NULL
                )`
            }
        })
        } catch(e) {
            setErr("Sale already exists! If you weren't expecting this, try a different ID number.")
        }
    }
}


export default ServiceVehicle