import React, { useState } from 'react';
import './Form.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import ShowForms from './ShowForms';

function Form() {
    const [data, setData] = useState({
        name: '',
        dob: '',
        email: '',
        mobNumber: ''
    })
    const saveData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();
    const postData = (e) => {
        e.preventDefault();
        console.log(data);
        // const { name, dob, email, mobNumber } = data;
        let checkAge = calculateAge(data.dob);
        if (checkAge >= 18) {
            axios.post('http://localhost:8080/api/v1/emailformpost', data)
            .then((res)=>alert(res.note))
                .then(navigate("/showdata"))
                .catch((err) => console.log(err))
        } else {
            alert("Not Qualified age is below 18")
        }
    }
    function calculateAge(birthday) {
        //milliseconds in a year 1000*24*60*60*365.5 = 31556736000; 
        let today = new Date();
        //birthay has 'Dec 25 1998'
        let dob = new Date(birthday);
        //difference in milliseconds
        let diff = today.getTime() - dob.getTime();
        //convert milliseconds into years
        let years = Math.floor(diff / 31556736000);
        //1 day has 86400000 milliseconds
        let days_diff = Math.floor((diff % 31556736000) / 86400000);
        //1 month has 30 days
        let months = Math.floor(days_diff / 30.4167);
        let days = Math.floor(days_diff % 30.4167);

        console.log(`${years} years ${months} months ${days} days`);
        return years
    }
    return (
        <div id='inputForm'>
            <form onSubmit={(e) => postData(e)}>
                <div className='data'>
                    <label htmlFor="name">Name :-</label>
                    <input type="text" name="name" id="name" value={data.name} onChange={(e) => saveData(e)} required />
                </div>
                <div className='data'>
                    <label htmlFor="dob">Date Of Birth :-</label>
                    <input type="date" name="dob" id="dob" value={data.dob} onChange={(e) => saveData(e)} required />
                </div>
                <div className='data'>
                    <label htmlFor="email">Email Id :-</label>
                    <input type="email" name="email" id="email" value={data.email} onChange={(e) => saveData(e)} required />
                </div>
                <div className='data'>
                    <label htmlFor="mobNumber">Phone Number :-</label>
                    <input type="text" name="mobNumber" id="mobNumber" value={data.mobNumber} onChange={(e) => saveData(e)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form