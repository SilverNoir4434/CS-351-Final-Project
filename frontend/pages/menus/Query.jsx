import React, { useState, useEffect } from 'react';
import api from '../../src/api';

function Query({ propUsr }) {
    const url = 'http://localhost:8000/sql_query'
    const [results, setResults] = useState([]);

    async function getView() {
        if (propUsr.role === "mechanic") {
        const res = await api.get(url, {
            params: {
                query: "SELECT * FROM [Mechanic_View];"
            }
        });
        setResults(res.data.results);
    } else if (propUsr.role === "billing") {
        const res = await api.get(url, {
            params: {
                query: "SELECT * FROM [Billing_View];"
            }
        });
        setResults(res.data.results);
    } else if (propUsr.role === "salesperson") {
        const res = await api.get(url, {
            params: {
                query: "SELECT * FROM [Salesperson_View];"
            }
        });
        setResults(res.data.results);
    }
    }

    useEffect(() => {
        getView();
    }, []);

    return (
        <div className='query'>
        {propUsr.role === "mechanic" && 
            <>
            <h2>Results from Mechanic Query:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Mileage on Arrival</th>
                            <th>Mileage on Departure</th>
                            <th>Final Estimate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) =>(
                            <tr key={index}>
                                {row.map((cell, i) => (
                                    <td key={i}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        }
        {propUsr.role === "billing" && 
            <>
                <h2>Results from Billing Query:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Billing Date</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) =>(
                            <tr key={index}>
                                {row.map((cell, i) => (
                                    <td key={i}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        }
        {propUsr.role === "salesperson" && 
            <>
                <h2>Results from Salesperson Query:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date Sold</th>
                            <th>Temp Tag Num</th>
                            <th>Inventory Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row, index) =>(
                            <tr key={index}>
                                {row.map((cell, i) => (
                                    <td key={i}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        }
        </div>
    )
}

export default Query