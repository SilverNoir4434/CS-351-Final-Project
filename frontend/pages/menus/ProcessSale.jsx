import React, { useState } from 'react';
import api from '../../src/api';

function ProcessSale() {
    const [err, setErr] = useState("")
    const url = 'http://localhost:8000/sql_query'
    const [formData, setFormData] = useState({
        sale_id: "",
        date_sold: "",
        temp_tag_num: "",
        cust_name: "",
        vehicle: "",
    });

    return (
        <div className = "menu">
            <h3>Process Sale:</h3>
            <form onSubmit={submit}>
                <p>Sale ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, sale_id: e.target.value })} />
                <p>Temp Tag:</p>
                <input type="text" onChange={e => setFormData({ ...formData, temp_tag_num: e.target.value })} />
                <p>Customer Name:</p>
                <input type="text" onChange={e => setFormData({ ...formData, cust_name: e.target.value })} />
                <p>Vehicle ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, vehicle: e.target.value })} />
                <p className="error">{err}</p>
                <input type="submit" value="Submit" className="submit"></input>
            </form>
        </div>
    )

    async function submit(e) {
        setErr("");
        e.preventDefault();
        let results;
        if (Object.values(formData).some(value => value === "")) {
            setErr("Please fill in all fields before submitting!");
            return;
        }

        if (isNaN(formData.sale_id)) {
            setErr("SaleID must be a number!");
            return;
        } else if (isNaN(formData.temp_tag_num)) {
            setErr("Temp Tag must be a number!");
            return;
        } else if (isNaN(formData.vehicle)) {
            setErr("VehicleID must be a number!");
            return;
        }

        try {
            const date = new Date();
            const today = date.getFullYear + "" + date.getMonth + "" + date.getDay
            results = await api.get(url, {
            params: {
                query: `INSERT INTO Sale VALUES (
                ${formData.sale_id},
                ,
                '${formData.year}',
                '${formData.make}',
                '${formData.vin}',
                '${formData.vehicle_status}',
                NULL,
                NULL,
                NULL
                )`
            }
        })
        } catch(e) {
            setErr("Sale already exists! If you weren't expecting this, try a different ID number.")
        }
    }
}

export default ProcessSale