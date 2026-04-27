import React, { useState } from 'react';
import api from '../../src/api';

function AddVehicle() {
    const [err, setErr] = useState("")
    const url = 'http://localhost:8000/sql_query'
    const [formData, setFormData] = useState({
        vehicle_id: "",
        model: "",
        year: "",
        make: "",
        vin: "",
        vehicle_status: "Inventory"
    });

    return (
        <div className = "menu">
            <h3>Add Vehicle:</h3>
            <form onSubmit={submit}>
                <p>Vehicle ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, vehicle_id: e.target.value })} />
                <p>Model:</p>
                <input type="text" onChange={e => setFormData({ ...formData, model: e.target.value })} />
                <p>Year:</p>
                <input type="text" onChange={e => setFormData({ ...formData, year: e.target.value })} />
                <p>Make:</p>
                <input type="text" onChange={e => setFormData({ ...formData, make: e.target.value })} />
                <p>VIN:</p>
                <input type="text" onChange={e => setFormData({ ...formData, vin: e.target.value })} />
                <p>Vehicle Status:</p>
                <select onChange={e => setFormData({ ...formData, vehicle_status: e.target.value })}>
                    <option value="inventory">Inventory</option>
                    <option value="sold">Sold</option>
                    <option value="leased">Leased</option>
                    <option value="in_service">In Service</option>
                </select> <br />
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

        if (isNaN(formData.vehicle_id)) {
            setErr("VehicleID must be a number!");
            return;
        }

        try {
            results = await api.get(url, {
            params: {
                query: `INSERT INTO VEHICLE VALUES (
                ${formData.vehicle_id},
                '${formData.model}',
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
            setErr("Vehicle already exists! If you weren't expecting this, try a different ID number.")
        }
    }
}

export default AddVehicle