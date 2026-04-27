import React, { useState } from 'react';
import api from '../../src/api';

function AddBillingData() {
    const [err, setErr] = useState("")
    const url = 'http://localhost:8000/sql_query'
    const [formData, setFormData] = useState({
        billing_id: "",
        date: "",
        payment_method: "",
        employee: "",
        service_id: "",
        sale_id: "",
    });


    return (
        <div className = "menu">
            <h3>Add Billing Data:</h3>
            <form onSubmit={submit}>
                <p>Billing ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, billing_id: e.target.value })} />
                <p>Date (ie. MM/DD/YYYY):</p>
                <input type="text" onChange={e => setFormData({ ...formData, date: e.target.value })} />
                <p>Payment Method:</p>
                <input type="text" onChange={e => setFormData({ ...formData, payment_method: e.target.value })} />
                <p>Employee:</p>
                <input type="text" onChange={e => setFormData({ ...formData, employee: e.target.value })} />
                <p>Service ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, service_id: e.target.value })} />
                <p>Sale ID:</p>
                <input type="text" onChange={e => setFormData({ ...formData, sale_id: e.target.value })} />
                <p className="error">{err}</p>
                <input type="submit" value="Submit" className="submit"></input>
            </form>
        </div>
    )

    async function submit(e) {
        setErr("");
        e.preventDefault();
        let results;
        let empID;
        let emp_name = formData.employee.split(" ");
        if (Object.values(formData).some(value => value === "")) {
            setErr("Please fill in all fields before submitting!");
            return;
        }

        if (isNaN(formData.billing_id)) {
            setErr("BillingID must be a number!");
            return;
        } else if (isNaN(formData.service_id)) {
            setErr("ServiceID must be a number!");
            return;
        } else if (isNaN(formData.sale_id)) {
            setErr("SaleID must be a number!");
            return;
        } else if (emp_name[1] === undefined) {
            setErr("Please provide the customer's full name!");
            return;
        }

        try {
            let empRes = await api.get(url, {
                params: {
                    query: `SELECT emp_id FROM EMPLOYEE WHERE 
                    f_name = '${emp_name[0]}' AND l_name = '${emp_name[1]}';`
                }
            });
            if (empRes.data === null) {
                setErr("Employee cannot be found! Please make sure you input the correct name.");
                return;
            }
            let empData = empRes.data.results[0];
            empID = empData[0];
        } catch(e) {
            console.log(e);
        }

        try {
            results = await api.get(url, {
            params: {
                query: `INSERT INTO Billing VALUES (
                ${formData.billing_id},
                '${formData.date}',
                '${formData.payment_method}',
                ${empID},
                ${formData.service_id},
                ${formData.sale_id}
                )`
            }
        })
        } catch(e) {
            setErr("Customer already exists! If you weren't expecting this, try a different ID number.")
        }
    }
}

export default AddBillingData