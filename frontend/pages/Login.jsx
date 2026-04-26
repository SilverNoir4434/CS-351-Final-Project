import { useNavigate } from 'react-router-dom'
import api from '../src/api.js'
import React, { useEffect, useState } from 'react'

function Login() {
    const [userID, setUserID] = useState("");
    const url = 'http://localhost:8000/sql_query'
    const [err, setErr] = useState("")
    const navigate = useNavigate();

    function setID(e) {
        setUserID(e.target.value);
    }

    async function submit(e) {
        setErr("");
        e.preventDefault();
        let results;
        if (userID == "") {
            setErr("Please input a UserID.");
            return;
        }
        results = await api.get(url, {
            params: {
                query: `SELECT * FROM EMPLOYEE WHERE EMP_ID = ${userID}`
            }
        })

        if (results?.data == null) {
            setErr("UserID invalid! Please check that you are using the correct ID.");
            return;
        } else {
            let data = results.data.results[0];
            console.log(data);
            navigate("/dashboard", { state: { user: data } });
        }
    }

    return (
        <div className={"content"}>
            <h1>ACME Car Dealership</h1>
            <h2>Please enter user ID.</h2>

            <form onSubmit={submit}>
                <input type={"text"} placeholder={"UserID"} onChange={setID}/> <br />
                <input type={"submit"} value={"Submit"}/>
            </form>

            <p className={"error"}>{err}</p>
        </div>
    )
}

export default Login