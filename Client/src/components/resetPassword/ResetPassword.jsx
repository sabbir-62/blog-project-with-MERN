
import { toast } from 'react-toastify';
import Styles from "./resetPassword.module.css"
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useEffect, useState } from 'react';



/*----------Reset Password----------*/
const ResetPassword = () => {
    const [state, setState] = useState({
        password: "",
        confirmPassword: "",
        token: "",
        id: ""
    })

    // state change with new password and compare them
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    //get token and id from url
    const location = useLocation()
    const verifyToken = () => {
        const {token, id} = queryString.parse(location.search)
        setState({
            token,
            id
        })
    }
    
    useEffect(() => {
        verifyToken()
    }, [])


    const navigate = useNavigate()


    const [loading, setLoading] = useState(false);
    // Sent data into backend using fetch
    const handleClick = async(e) => {
        e.preventDefault()
        setLoading(true);
        const {token, id, password, confirmPassword} = state;
        const registrationUrl = 'http://localhost:8500/api/v1/reset-password';

        if(password !== confirmPassword){
            toast.error("Password and Confirm Password does not match!")
        }

        else{
            try{
                fetch(registrationUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        token, id, password
                    })
                })
               .then((response) => response.json())
               .then((data) => {
                    if(data.success){
                        navigate('/login')
                        toast.success(data.message);
                    }
                    else{
                        toast.error(data.message)
                    }
               })
            }
           catch(error){
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
            }
            finally{
                setLoading(false)
            }
        }
    
    }

    const loginPage = () => {
        navigate('/login')
    }


    // return jsx
    return (
        <div className={Styles.resetForm}>
            <h1 className={Styles.resetHeading}>Reset Password</h1>
            <input type="password" className={Styles.resetInputField} placeholder="Enter New Password"  onChange={(e)=>setValues("password", e.target.value)}/>
            <input type="password" className={Styles.resetInputField} placeholder="Confirm Password"  onChange={(e)=>setValues("confirmPassword", e.target.value)}/>
            <div className={Styles.resetButtons}>
                <button className={`btn ${Styles.resetBtn}`} onClick={handleClick} >Submit</button>
                <button className={`btn ${Styles.resetBtn}`} onClick={loginPage} >Cancel</button>
            </div>
        </div>
    );
};

export default ResetPassword;