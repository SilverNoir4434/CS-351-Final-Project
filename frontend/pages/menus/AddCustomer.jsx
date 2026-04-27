import React, { useState } from 'react';
import api from '../../src/api';

function AddCustomer() {
    const [err, setErr] = useState("")
    const url = 'http://localhost:8000/sql_query'
    const [formData, setFormData] = useState({
        custID: "",
        fname: "",
        lname: "",
        phone: "",
        email: "",
        address: "",
        role: "Purchase"
    });


    return (
        <div className = "menu">
            <h3>Add Customer:</h3>
            <form onSubmit={submit}>
                <p>Customer ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, custID: e.target.value })} />
                <p>First Name:</p>
                <input type="text" onChange={e => setFormData({ ...formData, fname: e.target.value })} />
                <p>Last Name:</p>
                <input type="text" onChange={e => setFormData({ ...formData, lname: e.target.value })} />
                <p>Phone Number:</p>
                <input type="text" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <p>Email:</p>
                <input type="text" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <p>Address:</p>
                <input type="text" onChange={e => setFormData({ ...formData, address: e.target.value })} />
                <p>Role:</p>
                <select onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="purchase">Purchase</option>
                    <option value="service">Service</option>
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

        if (isNaN(formData.custID)) {
            setErr("CustomerID must be a number!");
            return;
        }

        try {
            results = await api.get(url, {
            params: {
                query: `INSERT INTO CUSTOMER VALUES (
                ${formData.custID},
                '${formData.fname}',
                '${formData.lname}',
                '${formData.phone}',
                '${formData.email}',
                '${formData.address}',
                '${formData.role}',
                NULL,
                NULL
                )`
            }
        })
        } catch(e) {
            setErr("Customer already exists! If you weren't expecting this, try a different ID number.")
        }
    }
}

export default AddCustomer