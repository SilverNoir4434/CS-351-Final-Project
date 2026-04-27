import React, { useState, useEffect } from 'react';
import api from '../../src/api';

function VehicleInventory() {
    const url = 'http://localhost:8000/sql_query'
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    console.log(search.toString);
    const filter = results.filter(row =>
        search === String(row[0]) || search === ""
    );


    async function getView() {
        const res = await api.get(url, {
            params: {
                query: "SELECT * FROM Vehicle;"
            }
        });
        setResults(res.data.results);
    }

    useEffect(() => {
        getView();
    }, []);

    return (
        <div className='query'>
            <h2>Vehicles:</h2>
            <input type="text" placeholder='filter by VehicleID' onChange={e => setSearch(e.target.value)}/>
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>VIN</th>
                            <th>Vehicle Status</th>
                            <th>Inventory ID</th>
                            <th>Sale ID</th>
                            <th>Service ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.map((row, index) =>(
                            <tr key={index}>
                                {row.map((cell, i) => (
                                    <td key={i}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}

export default VehicleInventory