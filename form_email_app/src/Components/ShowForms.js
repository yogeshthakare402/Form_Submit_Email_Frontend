import React, { useEffect, useState } from 'react';
import './Form.css';
import {useNavigate} from 'react-router-dom';

function ShowForms() {
    const [fetchedData, setFetchedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/emailformpost',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((result) => setFetchedData(result.data))
    }, [])

    const fomPage = ()=>{
        navigate("/")
    }

    return (
        <div id='showData'>
            <div id='fillForm'>
            <h2>User Data</h2>
            <button id='fillbtn' onClick={fomPage}>Fill form</button>
            </div>
            
        <table >
            <thead>
            <tr className='userData'>
                <th>Name</th>
                <th>Date Of Birth</th>
                <th>Phone Number</th>
                <th>Email Id</th>
            </tr>
            </thead>
            <tbody>
            {fetchedData && fetchedData.map((data, i) => {
                return <tr key={i} className='userData'>
                    <td>{data.name}</td>
                    <td>{data.dob}</td>
                    <td>{data.mobNumber}</td>
                    <td>{data.email}</td>
                    </tr>
            })}
            </tbody>
        </table>
        </div>
    )
}

export default ShowForms